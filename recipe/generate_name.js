"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_name = void 0;
var printing_1 = require("./printing");
var en_inflectors_1 = require("en-inflectors");
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
    return largest;
}
/**
* a function to find the last cooking step applied to a ingredient.
* @param cooking_steps - an array of the cookingsteps in the recipe.
* @param ingredient - an ingredient to the cookingstep must be applied to.
* @returns the last cooking step applied to the ingredient.
*/
function find_last_cooking_step(cooking_steps, ingredient) {
    var ingredientname = (0, printing_1.refer_to_ingredient)(ingredient[0], ingredient[1]);
    for (var i = cooking_steps.length - 1; i >= 0; i = i - 1) {
        if (cooking_steps[i].ingredient_names.includes(ingredientname)) {
            return cooking_steps[i];
        }
    }
    return cooking_steps[cooking_steps.length - 1];
}
var EnglishVerbs = require('english-verbs-helper');
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
    var main_ingr_name = main_ingr[0].name;
    var main_cooking_method = find_last_cooking_step(recipe.steps, main_ingr);
    if (ingredient_info.length === 0) {
        return up_first_all(main_ingr_name) + " " +
            up_first_all(main_cooking_method.cooking_method);
    }
    else {
        var secondary_ingr = find_highest_amount(ingredient_info);
        var secondary_ingr_name = secondary_ingr[0].name;
        if (main_cooking_method.cooking_method == "boil" ||
            main_cooking_method.cooking_method == "add") {
            main_cooking_method = find_last_cooking_step(recipe.steps, secondary_ingr);
        }
        var method_past = new en_inflectors_1.Inflectors(main_cooking_method.cooking_method).toPast();
        return up_first_all(method_past) + " " +
            up_first_all(main_ingr_name) + " with " +
            up_first_all(secondary_ingr_name);
    }
}
exports.generate_name = generate_name;
