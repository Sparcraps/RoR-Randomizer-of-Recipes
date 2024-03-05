"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter_cooking_methods = exports.get_doable_cooking_methods = exports.filter_ingredients = void 0;
/**
 * Function for filtering out ingredients according to allergies.
 * @param ingredients - a 2D array of ingredients to be
 * @param allergies - an array of strings symbolisig allergies
 * @modifies ingredients
 * @returns a 2D array of ingredients with the ingredients with the allergies removed
 */
function filter_ingredients(ingredients, allergies) {
    for (var category_index = 0; category_index < ingredients.length; category_index++) {
        for (var ingredient_index = ingredients[category_index].length - 1; ingredient_index >= 0; ingredient_index = ingredient_index - 1) {
            var ingredient_allergy = ingredients[category_index][ingredient_index].allergies;
            for (var user_allergy_index = 0; user_allergy_index < allergies.length; user_allergy_index++) {
                if (ingredient_allergy.includes(allergies[user_allergy_index])) {
                    ingredients[category_index].splice(ingredient_index, 1);
                }
            }
        }
    }
    return ingredients;
}
exports.filter_ingredients = filter_ingredients;
/**
 * Returns a set of all parts of cooking methods that are available for
 * kitchenware in array.
 * @param kw_data - array of kitchenware to search through.
 * @returns A set of strings representing parts of cooking methods available to
 * the kitchenware.
 */
function get_doable_cooking_methods(kw_data) {
    var methods = new Set();
    kw_data.forEach(function (kw) {
        var kw_methods = kw.cooking_methods;
        kw_methods.forEach(function (method) { return methods.add(method); });
    });
    return methods;
}
exports.get_doable_cooking_methods = get_doable_cooking_methods;
/**
 * Filters method arrays of Category objects by removing all methods with parts
 * that are not available to kitchenware in array.
 * @param kw_data - Array of available kitchenware.
 * @param cat_data - Array of categories whose cooking methods to filter.
 * @modifies cat_data
*/
function filter_cooking_methods(kw_data, cat_data) {
    var valid_methods = get_doable_cooking_methods(kw_data);
    function is_valid_method(method) {
        var is_valid = true;
        for (var i = 0; i < method.length; i++) {
            var m = method[i];
            if (!valid_methods.has(m)) {
                is_valid = false;
                break;
            }
            else { }
        }
        return is_valid;
    }
    for (var i = 0; i < cat_data.length; i++) {
        var cat = cat_data[i];
        cat.cooking_methods = cat.cooking_methods.filter(function (method) { return is_valid_method(method); });
    }
}
exports.filter_cooking_methods = filter_cooking_methods;
