"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./lib/list");
var queue_array_1 = require("./lib/queue_array");
var save_load_data_1 = require("./save_load_data");
var data = (0, save_load_data_1.load_data)();
function new_recipe(portions) {
    return {
        portions: portions,
        ingredient_info: [], steps: (0, queue_array_1.empty)(),
        kitchenware: [], kcal_per_portion: 0
    };
}
function new_cooking_step(cooking_method, ingredients, kitchenware) {
    return { cooking_method: cooking_method, ingredients: ingredients, kitchenware: kitchenware };
}
function print_recipe(recipe) {
    console.log("Portions: " + recipe.portions);
    console.log("Around " + recipe.kcal_per_portion + "kcal per portion.");
    var ingredient_info = recipe.ingredient_info;
    ingredient_info.forEach(function (i) {
        console.log(i[1] + " " + i[0].name);
    });
    // const kw = get_kitchenware_from_method(method, recipe, kitchenware_data);
    // kw.inventory.push(ingredient);
    // if (!recipe.kitchenware.includes(kw)) {
    //     recipe.kitchenware.push(kw);
    // } else {}
    console.log();
}
function generate_recipe(_a, portions, filters) {
    var min_portion = _a[0], max_portion = _a[1];
    // Selects a random category from an array of categories and 
    // returns the category and its ingredient array. Removes both and retries
    // if the ingredient array is empty.
    function randomize_category() {
        var cat_i = Math.floor(Math.random() * category_data.length);
        var cat = category_data[cat_i];
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
    // first looks for kitchenware with the cooking method in the recipe's active
    // kitchenware, then looks in saved kitchenware, and returns the first one it finds.
    // needs to be updated to choose randomly if multiple kitchenware have the cooking method available
    function get_kitchenware_from_method(cooking_method) {
        var active_kw = recipe.kitchenware;
        for (var i = 0; i < active_kw.length; i++) {
            var kw = active_kw[i];
            if (kw.cooking_methods.includes(cooking_method)) {
                return kw;
            }
        }
        for (var i = 0; i < kitchenware_data.length; i++) {
            var kw = kitchenware_data[i];
            if (kw.cooking_methods.includes(cooking_method)) {
                return JSON.parse(JSON.stringify(kw)); // copies kitchenware if it's from save data
            }
        }
        throw new Error("No kitchenware with cooking method " + cooking_method + "exists.");
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
            if (amount === 0) {
                continue;
            }
            else {
                var method = randomize_cooking_method(cat);
                recipe.ingredient_info.push([ingredient, amount, method]);
            }
            kcal += amount * kcal_per_measure;
        }
        recipe.kcal_per_portion = Math.round((kcal / portions) / 100) * 100; // roughly calculates kcal per portion for recipe
    }
    var recipe = new_recipe(portions);
    var ingredient_data = JSON.parse(JSON.stringify(data.ingredients)); // creates copy of save data
    // filter_ingredients(ingredient_data, filters); // future function
    var category_data = JSON.parse(JSON.stringify(data.categories));
    var kitchenware_data = [];
    randomize_ingredients_and_methods();
    return recipe;
}
function start_ror() {
    var recipe = generate_recipe((0, list_1.pair)(1000, 1500), 4, []);
    print_recipe(recipe);
}
// save_new_category(new_category("a category", ["cook", "taste"], 10));
// // (new_kitchenware("cooker", ["cook", "taste"]));
// const i1 = new_ingredient("a category", "tasty ingredient", [], "", 134, [1, 3]);
// const i2 = new_ingredient("a category", "delicious ingredient", [], "", 98, [2, 5]);
// const i3 = new_ingredient("a category", "odd ingredient", [], "", 400, [1, 2]);
// data = save_new_ingredient(i1, i2, i3);
start_ror();
