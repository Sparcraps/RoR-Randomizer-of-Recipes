"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var basics_1 = require("./basics");
var list_1 = require("./lib/list");
var save_load_data_1 = require("./save_load_data");
var filter_1 = require("./filter");
var data = (0, save_load_data_1.load_data)();
function new_recipe(portions) {
    return {
        portions: portions,
        ingredient_info: [], steps: [], kcal_per_portion: 0
    };
}
function new_cooking_step(cooking_method, ingredient_names, kitchenware) {
    return { cooking_method: cooking_method, ingredient_names: ingredient_names, kitchenware: kitchenware };
}
function print_recipe(recipe) {
    console.log("Portions: " + recipe.portions);
    console.log("Around " + recipe.kcal_per_portion + " kcal per portion.");
    console.log("-----------------------------------");
    var ingredient_info = recipe.ingredient_info;
    ingredient_info.forEach(function (p) {
        var ingredient = p[0], amount = p[1];
        console.log(stringify_ingredient_info(ingredient, amount));
    });
    console.log("-----------------------------------");
    var steps = recipe.steps;
    steps.forEach(function (step) {
        console.log(step.ingredient_names, ": " + step.cooking_method + in_or_on(step.kitchenware));
    });
    console.log();
}
function stringify_ingredient_info(ingredient, amount) {
    if (ingredient.measurement === "" && amount > 1) {
        return amount + " " + ingredient.name + "s";
    }
    else {
        return amount + " " + ingredient.measurement + " " + ingredient.name;
    }
}
function in_or_on(kw) {
    if (kw.name === "cutting board") {
        return " on " + kw.name;
    }
    else {
        return " in " + kw.name;
    }
}
function generate_recipe(_a, portions, filters) {
    var min_portion = _a[0], max_portion = _a[1];
    // returns ingredient name with s if it should be referred to in plural
    function name_with_s(ingredient, amount) {
        if (ingredient.measurement === "" && amount > 1) {
            return ingredient.name + "s";
        }
        else {
            return ingredient.name;
        }
    }
    // Selects a random category from an array of categories and 
    // returns the category and its ingredient array. Removes both and retries
    // if the ingredient array is empty.
    function randomize_category() {
        var cat_i = Math.floor(Math.random() * category_data.length);
        var cat = category_data[cat_i];
        if (cat.max_ingredients === 0) {
            return randomize_category();
        }
        else {
            cat.max_ingredients = cat.max_ingredients - 1;
        }
        var ingredient_arr = ingredient_data[cat_i];
        if (ingredient_arr.length === 0) {
            category_data.splice(cat_i, 1);
            ingredient_data.splice(cat_i, 1);
            if (ingredient_data.length === 0) { // if all ingredients have already been selected:
                category_data.push.apply(// if all ingredients have already been selected:
                category_data, data.categories); //reloads data by creating a copies fron saved data
                ingredient_data.push.apply(//reloads data by creating a copies fron saved data
                ingredient_data, JSON.parse(JSON.stringify(data.ingredients)));
            }
            return randomize_category();
        }
        else {
            return [cat, ingredient_arr];
        }
    }
    // Returns a random ingredient from an array of ingredients and 
    // removes the ingredient from the array.
    function randomize_ingredient(ingredient_arr) {
        var ingredient_i = Math.floor(Math.random() * ingredient_arr.length);
        var ingredient = ingredient_arr[ingredient_i];
        ingredient_arr.splice(ingredient_i, 1);
        return ingredient;
    }
    // Randomizes amount of an ingredient based on its range attribute, 
    // maximum space left in recipe and the portion amount.
    function randomize_ingredient_amount(ingredient, max_for_recipe, portions) {
        var _a;
        var _b = ingredient.range, min = _b[0], max = _b[1];
        _a = [min * portions, max * portions], min = _a[0], max = _a[1];
        max = Math.min(max, max_for_recipe);
        if (max < min) {
            return 0;
        }
        else if (max === min) {
            return min;
        }
        else {
            var amount = Math.floor(Math.random() * (max - min)) + min;
            return amount;
        }
    }
    // needs to be modified to take dependencies of cooking methods into account.
    function randomize_cooking_method(cat) {
        var methods = cat.cooking_methods;
        var i = Math.floor(Math.random() * methods.length);
        var cooking_method = methods[i];
        return cooking_method;
    }
    // looks for kitchenware with the cooking method in saved kitchenware, 
    // and returns the first one it finds.
    // needs to be updated to choose randomly if multiple kitchenware have the cooking method available
    function get_kitchenware_from_method(cooking_method) {
        for (var i = 0; i < kitchenware_data.length; i++) {
            var kw = kitchenware_data[i];
            if (kw.cooking_methods.includes(cooking_method)) {
                return JSON.parse(JSON.stringify(kw)); // copies kitchenware from save data
            }
        }
        throw new Error("No kitchenware with cooking method " + cooking_method + "exists.");
    }
    // adds a pair of selected cooking method and [ingredient] to 
    // selected_methods array, or if the method already exists adds ingredient 
    // to corresponding array in selected_methods
    function add_method(method, ingredient_name) {
        for (var i = 0; i < selected_methods.length; i++) {
            var p = selected_methods[i];
            if ((0, list_1.head)(p).toString() === method.toString()) { // checks if the method arrays are structurally equal (with same order)
                (0, list_1.tail)(p).push(ingredient_name);
                return;
            }
            else { }
        }
        selected_methods.push((0, list_1.pair)(method, [ingredient_name]));
    }
    // randomizes ingredients and cooking methods for them within kcal range for
    // the recipe.
    function randomize_ingredients_and_methods() {
        var min_kcal = min_portion * portions;
        var max_kcal = max_portion * portions;
        var kcal = 0;
        while (kcal < min_kcal) {
            var _a = randomize_category(), cat = _a[0], ingredient_arr = _a[1]; // get random category with its ingredients
            var ingredient = randomize_ingredient(ingredient_arr); // randomize ingredient in ingredient array
            var kcal_per_measure = ingredient.kcal_per_measurement;
            var max_measures = Math.floor((max_kcal - kcal) / kcal_per_measure); // calculate maximum amount of measurements of ingredient that fits in recipe
            var amount = randomize_ingredient_amount(ingredient, max_measures, portions); // randomize ingredient amount
            if (amount === 0) { // amount can be 0 if max_measures is lower than minimum measures for the ingredient and portion amount.
                continue;
            }
            else {
                add_method(randomize_cooking_method(cat), name_with_s(ingredient, amount));
                recipe.ingredient_info.push((0, list_1.pair)(ingredient, amount));
                kcal += amount * kcal_per_measure;
            }
        }
        recipe.kcal_per_portion = Math.round((kcal / portions) / 100) * 100; // roughly calculates kcal per portion for recipe
    }
    // makes cooking steps from already randomized ingredient info
    function generate_cooking_steps() {
        var cooking_steps = [];
        for (var i = 0; i < selected_methods.length; i++) {
            var _a = selected_methods[i], method = _a[0], ingredients = _a[1];
            var more_ingredients = do_similar_methods(method, cooking_steps);
            ingredients.push.apply(ingredients, more_ingredients);
            add_cooking_step(method, ingredients, cooking_steps);
        }
        return cooking_steps;
    }
    // adds cooking step to steps array, removes first element in method, calls
    // recursively until method is empty.
    function add_cooking_step(method, ingredient_names, steps, kw) {
        var _a, _b;
        if (kw === void 0) { kw = undefined; }
        if (method.length === 0) {
            return;
        }
        else { }
        var current_method = method[0];
        if (kw === undefined || !kw.cooking_methods.includes(current_method)) {
            kw = get_kitchenware_from_method(current_method);
        }
        else { }
        method.shift(); // removes current method from method
        if ((0, basics_1.has_separable_inventory)(kw)) {
            var extra_ingredients = do_separable_method(current_method, kw, steps);
            (_a = kw.inventory).push.apply(_a, extra_ingredients);
        }
        else { }
        (_b = kw.inventory).push.apply(_b, ingredient_names);
        var more_ingredients = do_similar_methods(method, steps); // finds ingredients that use the same method as the rest of method from some point.
        console.log("more: ", more_ingredients);
        steps.push(new_cooking_step(current_method, ingredient_names, kw));
        ingredient_names.push.apply(ingredient_names, more_ingredients);
        return add_cooking_step(method, ingredient_names, steps);
    }
    function do_separable_method(method, kw, steps) {
        var ingredient_names = [];
        for (var i = 0; i < selected_methods.length; i++) {
            var other_method = (0, list_1.head)(selected_methods[i]);
            for (var j = 0; j < other_method.length - 1; j++) {
                var m = other_method[j];
                if (m === method) {
                    var names = (0, list_1.tail)(selected_methods[i]);
                    ingredient_names.push.apply(ingredient_names, names); // adds ingredient for matching method to list
                    var rest_of_method = other_method.splice(0, j + 1); // removes methods up to found method from other method array and saves these in another method
                    rest_of_method.pop(); // removes found method
                    add_cooking_step(rest_of_method, names, steps);
                }
            }
        }
        return ingredient_names;
    }
    // finds methods that contain the input method at the end and adds cooking
    // steps for them. Returns their ingredient names.
    function do_similar_methods(method, steps) {
        var ingredient_names = [];
        for (var i = 0; i < selected_methods.length; i++) {
            var other_method = (0, list_1.head)(selected_methods[i]);
            if (other_method === method) {
                continue;
            }
            else { }
            var copy_method = __spreadArray([], other_method, true);
            for (var j = 0; j < other_method.length; j++) {
                console.log(copy_method);
                if (copy_method.toString() === method.toString()) {
                    var names = (0, list_1.tail)(selected_methods[i]);
                    console.log("names: ", names);
                    console.log(method);
                    ingredient_names.push.apply(ingredient_names, names); // adds ingredient for matching method to list
                    other_method.splice(j, method.length); // removes part of other method that matches method
                    add_cooking_step(other_method, names, steps);
                    break;
                }
                else {
                    copy_method.shift();
                }
            }
        }
        return ingredient_names;
    }
    var recipe = new_recipe(portions);
    var ingredient_data = JSON.parse(JSON.stringify(data.ingredients)); // creates copy of save data
    (0, filter_1.filter_ingredients)(ingredient_data, filters);
    var category_data = JSON.parse(JSON.stringify(data.categories));
    var kitchenware_data = JSON.parse(JSON.stringify(data.kitchenware));
    var selected_methods = [];
    randomize_ingredients_and_methods();
    var steps = generate_cooking_steps();
    recipe.steps = steps;
    return recipe;
}
function start_ror() {
    var recipe = generate_recipe((0, list_1.pair)(400, 700), 4, []);
    print_recipe(recipe);
}
start_ror();
