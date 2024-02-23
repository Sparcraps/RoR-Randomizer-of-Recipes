"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("./lib/list");
var queue_array_1 = require("./lib/queue_array");
var save_load_data_1 = require("./save_load_data");
var data = (0, save_load_data_1.load_data)();
function new_recipe(portions) {
    return { portions: portions, ingredients: [], steps: (0, queue_array_1.empty)(), kitchenware: [] };
}
function new_cooking_step(cooking_method, ingredient) {
    return { cooking_method: cooking_method, ingredient: ingredient };
}
function print_recipe(recipe) {
    console.log("Portions: " + recipe.portions);
    var ingredients = recipe.ingredients;
    ingredients.forEach(function (p) {
        console.log((0, list_1.head)(p) + " " + (0, list_1.tail)(p).name);
    });
    // const kw = get_kitchenware_from_method(method, recipe, kitchenware_data);
    // kw.inventory.push(ingredient);
    // if (!recipe.kitchenware.includes(kw)) {
    //     recipe.kitchenware.push(kw);
    // } else {}
}
function generate_recipe(_a, portions, filters) {
    var min_portion = _a[0], max_portion = _a[1];
    // Selects a random category from an array of categories and 
    // returns the category and its index.
    function randomize_category(cats) {
        var cat_i = Math.floor(Math.random() * cats.length);
        var cat = cats[cat_i];
        return [cat_i, cat];
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
    function get_kitchenware_from_method(cooking_method, recipe, kitchenware_data) {
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
    var recipe = new_recipe(portions);
    var ingredient_data = JSON.parse(JSON.stringify(data.ingredients)); // creates copy of save data
    // filter_ingredients(ingredient_data, filters); // future function
    var category_data = JSON.parse(JSON.stringify(data.categories));
    var kitchenware_data = [];
    var min_kcal = min_portion * portions;
    var max_kcal = max_portion * portions;
    var kcal = 0;
    while (kcal < min_kcal) {
        var _b = randomize_category(category_data), i = _b[0], cat = _b[1]; // get random category with its index
        var ingredient_arr = ingredient_data[i]; // get ingredient array for category
        var ingredient = randomize_ingredient(ingredient_arr); // randomize ingredient in ingredient array
        var kcal_per_measure = ingredient.kcal_per_measurement;
        var max_measures = Math.floor((max_kcal - kcal) / kcal_per_measure); // calculate maximum amount of measurements of ingredient that fits in recipe
        var amount = randomize_ingredient_amount(ingredient, max_measures, portions); // randomize ingredient amount
        if (amount === 0) {
            continue;
        }
        else {
            recipe.ingredients.push((0, list_1.pair)(amount, ingredient));
            var method = randomize_cooking_method(cat);
            var step = new_cooking_step(method, ingredient);
            (0, queue_array_1.enqueue)(step, recipe.steps);
        }
        kcal += amount * kcal_per_measure;
    }
    randomize_ingredient;
    return recipe;
}
function start_ror() {
    var recipe = generate_recipe((0, list_1.pair)(400, 700), 4, []);
    print_recipe(recipe);
}
// save_new_category(new_category("a category", ["cook", "taste"], 10));
// // (new_kitchenware("cooker", ["cook", "taste"]));
// const i1 = new_ingredient("a category", "tasty ingredient", [], "", 134, [1, 3]);
// const i2 = new_ingredient("a category", "delicious ingredient", [], "", 98, [2, 5]);
// const i3 = new_ingredient("a category", "odd ingredient", [], "", 400, [1, 2]);
// data = save_new_ingredient(i1, i2, i3);
start_ror();
