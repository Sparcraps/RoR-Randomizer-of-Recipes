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
exports.generate_recipe = exports.generate_name = exports.refer_to_ingredient = exports.print_recipe = exports.new_recipe = void 0;
var basics_1 = require("./basics");
var input_loop_1 = require("./input_loop");
var list_1 = require("./lib/list");
var save_load_data_1 = require("./save_load_data");
var filter_1 = require("./filter");
var save_recipe_1 = require("./save_recipe");
var data = (0, save_load_data_1.load_data)();
function new_recipe(portions) {
    return {
        tag: "recipe", name: "",
        portions: portions,
        ingredient_info: [], steps: [], kcal_per_portion: 0
    };
}
exports.new_recipe = new_recipe;
function new_cooking_step(cooking_method, ingredient_names, kitchenware) {
    return { cooking_method: cooking_method, ingredient_names: ingredient_names, kitchenware: kitchenware };
}
function print_recipe(recipe) {
    console.log("-----------------------------------");
    (0, input_loop_1.print_bold)(recipe.name);
    console.log("-----------------------------------");
    console.log("Portions: " + recipe.portions);
    console.log("Around " + recipe.kcal_per_portion + " kcal per portion.");
    console.log();
    var ingredient_info = recipe.ingredient_info;
    ingredient_info.forEach(function (p) {
        var ingredient = p[0], amount = p[1];
        console.log(stringify_ingredient_info(ingredient, amount));
    });
    console.log("-----------------------------------");
    var steps = recipe.steps;
    var step_nr = 1;
    steps.forEach(function (step) {
        console.log(step_nr + ". " + up_first(step.cooking_method) + " the " +
            ingredient_and_ingredients(step.ingredient_names) +
            " " + stringify_kitchenware(step.kitchenware));
        step_nr += 1;
    });
    console.log(step_nr + ". " + "Finally, add salt and pepper to taste! :-)");
    console.log("-----------------------------------");
}
exports.print_recipe = print_recipe;
function up_first(str) {
    return str[0].toUpperCase() + str.slice(1);
}
function num_rest_of_measurement(measurement) {
    measurement = measurement.trim().toLowerCase().replace("e", "ε"); // replaces e since parseFloat interprets e as exponent (assumes no measurement includes ε)
    var num = parseFloat(measurement);
    if (isNaN(num)) {
        return [1, measurement];
    }
    else {
        var length_of_num = num.toString().length;
        var rest = measurement.slice(length_of_num);
        return (0, list_1.pair)(num, rest.replace("ε", "e"));
    }
}
function stringify_ingredient_info(ingredient, amount) {
    var measurement = ingredient.measurement;
    var _a = num_rest_of_measurement(measurement), num = _a[0], rest = _a[1];
    amount = num * amount;
    if (rest === "" && amount > 1) {
        return amount + " " +
            refer_to_ingredient(ingredient, amount, true);
    }
    else {
        return amount + rest + " of " + ingredient.name;
    }
}
function stringify_kitchenware(kw) {
    var str = kw.name;
    var vowels = ["e", "u", "i", "o", "a"];
    if (vowels.includes(str[0])) {
        str = "an " + str;
    }
    else {
        str = "a " + str;
    }
    if (kw.name === "cutting board") {
        str = "on " + str;
    }
    else {
        str = "in " + str;
    }
    return str;
}
function ingredient_and_ingredients(ingredients) {
    var ingredient_str = ingredients[0];
    var i_amount = ingredients.length;
    if (i_amount > 1) {
        var i = 1;
        for (i; i < i_amount - 1; i++) {
            ingredient_str += ", " + ingredients[i];
        }
        ingredient_str += " and " + ingredients[i];
    }
    else { }
    return ingredient_str;
}
/**
 * returns ingredient name with correct(ish) conjugation depending on if it
 * should be referred to in plural or not
 * @param {Ingredient} ingredient - ingredient to name.
 * @param {number} amount - amount of the ingredient.
 * @param {boolean} [is_pcs = false] - true if it is already known that
 * the ingredient is measured in pcs, false as default.
 * @returns A string with conjugated ingredient name
 */
function refer_to_ingredient(ingredient, amount, is_pcs) {
    if (is_pcs === void 0) { is_pcs = false; }
    // returns true if ingredient should be referred to in plural,
    // false otherwise.
    function is_plural() {
        var _a = num_rest_of_measurement(ingredient.measurement), num = _a[0], rest = _a[1];
        if (rest === "") {
            return true;
        }
        else {
            return false;
        }
    }
    var name = ingredient.name;
    var s_u_i_o = ["s", "u", "i", "o"];
    if (is_pcs || is_plural()) {
        var last_char = name[name.length - 1];
        if (s_u_i_o.includes(last_char)) {
            return name + "es";
        }
        else if (last_char === "y") {
            return name.slice(0, -1) + "ies";
        }
        else {
            return name + "s";
        }
    }
    else {
        return name;
    }
}
exports.refer_to_ingredient = refer_to_ingredient;
/**
 * A function to find the ingredient a recipe has the most of in calories.
 * @param ingredients - an array containing pairs of the ingredients and their amounts in calories.
 * @returns the ingredient the recipe has the most of in calories.
 */
function find_highest_amount(ingredients) {
    var largest = ingredients[0];
    var current = ingredients[0][1] * ingredients[0][0].kcal_per_measurement;
    for (var i = 0; i < ingredients.length; i = i + 1) {
        current = ingredients[i][1] * ingredients[i][0].kcal_per_measurement;
        if (largest[1] * largest[0].kcal_per_measurement <= current) {
            largest = ingredients[i];
        }
    }
    var index = ingredients.indexOf(largest);
    ingredients.splice(index, 1);
    return largest[0];
}
/**
* a function to find the last cooking step applied to a ingredient.
* @param cooking_steps - an array of the cookingsteps in the recipe.
* @param ingredient - an ingredient to the cookingstep must be applied to.
* @returns the last cooking step applied to the ingredient.
*/
function find_last_cooking_step(cooking_steps, ingredient) {
    var is_pcs = false;
    if (ingredient.measurement == "") {
        is_pcs = true;
    }
    var ingredientname = refer_to_ingredient(ingredient, 2, is_pcs);
    for (var i = cooking_steps.length - 1; i >= 0; i = i - 1) {
        if (cooking_steps[i].ingredient_names.includes(ingredientname)) {
            return cooking_steps[i];
        }
    }
    return cooking_steps[cooking_steps.length - 1];
}
/**
* A function to generate a new name based on the ingredients and cooking steps in a recipe.
* @param a recipe - consisting of ingredients and the cooking steps applied to them.
* @returns the name generated as a string.
*/
function generate_name(recipe) {
    // capitalizes first letter of each word in a string
    function up_first_all(str) {
        var words = str.split(" ");
        var new_str = up_first(words[0]);
        if (words.length > 1) {
            var i = 1;
            for (i; i < words.length; i++) {
                new_str += " " + up_first(words[i]);
            }
        }
        else { }
        return new_str;
    }
    // capitalizes first letter of string
    function up_first(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    var ingredient_info = JSON.parse(JSON.stringify(recipe.ingredient_info)); // copies recipe ingredient info
    var main_ingr = find_highest_amount(ingredient_info);
    var main_cooking_method = find_last_cooking_step(recipe.steps, main_ingr);
    if (ingredient_info.length === 0) {
        return up_first_all(main_ingr.name) + " " +
            up_first_all(main_cooking_method.cooking_method);
    }
    else {
        var secondary_ingr = find_highest_amount(ingredient_info);
        if (main_cooking_method.cooking_method == "boil") {
            main_cooking_method = find_last_cooking_step(recipe.steps, secondary_ingr);
        }
        return up_first_all(main_ingr.name) + " and " +
            up_first_all(secondary_ingr.name) + " " +
            up_first_all(main_cooking_method.cooking_method);
    }
}
exports.generate_name = generate_name;
function generate_recipe(_a, portions, filters) {
    var min_portion = _a[0], max_portion = _a[1];
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
    function randomize_ingredient(arr) {
        var ingredient_i = Math.floor(Math.random() * arr.length);
        var ingredient = arr[ingredient_i];
        arr.splice(ingredient_i, 1);
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
            var max_measures = Math.floor(// calculate maximum amount of measurements of ingredient that fits in recipe
            (max_kcal - kcal) / kcal_per_measure);
            var amount = randomize_ingredient_amount(ingredient, max_measures, portions);
            if (amount === 0) { // amount can be 0 if max_measures is lower than minimum measures for the ingredient and portion amount.
                continue;
            }
            else {
                var method = randomize_cooking_method(cat);
                add_method(method, refer_to_ingredient(ingredient, amount));
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
            var extra_i = do_separable_method(current_method, kw, steps);
            (_a = kw.inventory).push.apply(_a, extra_i);
        }
        else { }
        (_b = kw.inventory).push.apply(_b, ingredient_names);
        var more_ingredients = do_similar_methods(method, steps); // finds ingredients that use the same method as the rest of method from some point.
        steps.push(new_cooking_step(current_method, ingredient_names, kw));
        ingredient_names.push.apply(ingredient_names, more_ingredients);
        return add_cooking_step(method, ingredient_names, steps);
    }
    // for separable kitchenware, finds all ingredients with same cooking method
    // somewhere in method array. Executes the methods earlier in method array
    // and returns ingredient names for method step.
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
                if (copy_method.toString() === method.toString()) {
                    var names = (0, list_1.tail)(selected_methods[i]);
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
    try {
        recipe.name = generate_name(recipe);
    }
    catch (err) {
        console.error(err);
    }
    return recipe;
}
exports.generate_recipe = generate_recipe;
/**
 * Calls generate_recipe, and then print_recipe with the generated recipe.
 */
function recipe_randomization() {
    // for testing purposes
    var recipe = generate_recipe((0, list_1.pair)(400, 700), 4, []);
    print_recipe(recipe);
    (0, save_recipe_1.save_new_recipe)(recipe);
}
if (require.main === module) {
    recipe_randomization();
}
