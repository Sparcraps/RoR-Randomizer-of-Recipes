"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomize_ingredients_and_methods = void 0;
var list_1 = require("../lib/list");
var save_load_data_1 = require("../data/save_load_data");
var filters_1 = require("./filters");
var printing_1 = require("./printing");
/**
 * Randomizes, within kcal range for the recipe,
 * ingredients with amounts and cooking methods for them, and returns
 * the cooking methods and ingredient names.
 * @param {Pair<number>} - a pair of the minimum and maximum amounts of calories
 * per portion for the recipe.
 * @param recipe - empty recipe to randomize for.
 * @modifies recipe
 * @returns {Array<Pair<Method, Array<name>>>} an array of pairs of Method and
 * arrays of ingredient names for which the method should be applied.
 */
function randomize_ingredients_and_methods(_a, recipe, filters) {
    var min_portion = _a[0], max_portion = _a[1];
    var data = (0, save_load_data_1.get_data)();
    var ingredient_data = JSON.parse(JSON.stringify(data.ingredients)); // creates copy of save data
    var cat_data = JSON.parse(JSON.stringify(data.categories));
    (0, filters_1.filter_ingredients)(ingredient_data, filters);
    (0, filters_1.filter_cooking_methods)(data.kitchenware, cat_data);
    var min_kcal = min_portion * recipe.portions;
    var max_kcal = max_portion * recipe.portions;
    var kcal = 0;
    var selected_methods = [];
    // Selects a random category from an array of categories and 
    // returns the category and its ingredient array. Removes both and retries
    // if the ingredient array is empty.
    function randomize_category() {
        var cat_i = Math.floor(Math.random() * cat_data.length);
        var cat = cat_data[cat_i];
        if (cat.max_ingredients === 0) {
            return randomize_category();
        }
        else {
            cat.max_ingredients = cat.max_ingredients - 1;
        }
        var ingredient_arr = ingredient_data[cat_i];
        if (ingredient_arr.length === 0) {
            cat_data.splice(cat_i, 1);
            ingredient_data.splice(cat_i, 1);
            if (ingredient_data.length === 0) { // if all ingredients have already been selected:
                cat_data.push.apply(// if all ingredients have already been selected:
                cat_data, data.categories); //reloads data by creating a copies fron saved data
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
    // picks a random cooking method from a Category object
    function randomize_cooking_method(cat) {
        var methods = cat.cooking_methods;
        var i = Math.floor(Math.random() * methods.length);
        var cooking_method = methods[i];
        return cooking_method;
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
    var method_add = [];
    while (kcal < min_kcal) {
        var _b = randomize_category(), cat = _b[0], ingredient_arr = _b[1]; // get random category with its ingredients
        var ingredient = randomize_ingredient(ingredient_arr); // randomize ingredient in ingredient array
        var kcal_per_measure = ingredient.kcal_per_measurement;
        var max_measures = Math.floor(// calculate maximum amount of measurements of ingredient that fits in recipe
        (max_kcal - kcal) / kcal_per_measure);
        var amount = randomize_ingredient_amount(ingredient, max_measures, recipe.portions);
        if (amount === 0) { // amount can be 0 if max_measures is lower than minimum measures for the ingredient and portion amount.
            continue;
        }
        else {
            var method = randomize_cooking_method(cat);
            if (method[0] === "add") {
                method_add.push((0, list_1.pair)(method, (0, printing_1.refer_to_ingredient)(ingredient, amount)));
            }
            else {
                add_method(method, (0, printing_1.refer_to_ingredient)(ingredient, amount));
            }
            recipe.ingredient_info.push((0, list_1.pair)(ingredient, amount));
            kcal += amount * kcal_per_measure;
        }
    }
    for (var i = 0; i < method_add.length; i = i + 1) // adds all methods using "add"
     {
        var current_method = method_add[i];
        add_method(current_method[0], current_method[1]);
    }
    recipe.kcal_per_portion = Math.round((kcal / recipe.portions) / 100) * 100; // roughly calculates kcal per portion for recipe
    return selected_methods;
}
exports.randomize_ingredients_and_methods = randomize_ingredients_and_methods;
