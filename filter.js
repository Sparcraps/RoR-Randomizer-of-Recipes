"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter_ingredients = void 0;
/**
 * Function for filtering out ingredients according to allergies.
 * @param ingredients - a 2D array of ingredients to be
 * @param allergies - an array of strings symbolisig allergies
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
