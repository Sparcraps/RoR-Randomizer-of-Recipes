"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_name = void 0;
/**
 * A function to find the ingredient a recipe has the most of in calories.
 * @param ingredients - an array containing pairs of the ingredients and their amounts in calories.
 * @returns the ingredient the recipe has the most of in calories.
 */
function find_highest_amount(ingredients) {
    var largest = ingredients[0];
    var current = ingredients[0][1];
    var i = 0;
    for (; i < ingredients.length; i = i + 1) {
        current = ingredients[i][1];
        if (largest[1] <= current) {
            largest = ingredients[i];
        }
    }
    return largest[0];
}
/**
 * A function to find the ingredient a recipe has the second most of in calories.
 * @param ingredients - an array containing pairs of the ingredients and their amounts in calories.
 * @returns the ingredient the recipe has the second most of in calories.
 */
function find_second_highest_amount(ingredients) {
    var largest = ingredients[0];
    var second_largest = ingredients[0];
    var current = ingredients[0][1];
    var i = 0;
    for (; i < ingredients.length; i = i + 1) {
        current = ingredients[i][1];
        if (largest[1] < current) {
            second_largest = largest;
            largest = ingredients[i];
        }
        if (largest[1] > current && second_largest[1] < current) {
            second_largest = ingredients[i];
        }
    }
    return second_largest[0];
}
/**
 * a function to find the last cooking step applied to a ingredient.
 * @param cooking_steps - an array of the cookingsteps in the recipe.
 * @param ingredient - an ingredient to the cookingstep must be applied to.
 * @returns the last cooking step applied to the ingredient.
 */
function find_last_cooking_step(cooking_steps, ingredient) {
    for (var i = cooking_steps.length - 1; i >= 0; i = i - 1) {
        if (cooking_steps[i].ingredient_names.includes(ingredient.name)) {
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
    var main_ingr = find_highest_amount(recipe.ingredient_info);
    var secondary_ingr = find_second_highest_amount(recipe.ingredient_info);
    var main_cooking_method = find_last_cooking_step(recipe.steps, main_ingr);
    return main_ingr.name + " and " +
        secondary_ingr.name + " " +
        main_cooking_method.cooking_method;
}
exports.generate_name = generate_name;
