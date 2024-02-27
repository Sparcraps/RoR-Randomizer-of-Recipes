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
    for (var categoryindex = 0; categoryindex < ingredients.length; categoryindex++) {
        for (var ingredientindex = ingredients[categoryindex].length - 1; ingredientindex >= 0; ingredientindex = ingredientindex - 1) {
            var ingredientallergy = ingredients[categoryindex][ingredientindex].allergies;
            for (var userallergyindex = 0; userallergyindex < allergies.length; userallergyindex++) {
                if (ingredientallergy.includes(allergies[userallergyindex])) {
                    ingredients[categoryindex].splice(ingredientindex, 1);
                }
            }
        }
    }
    return ingredients;
}
exports.filter_ingredients = filter_ingredients;
