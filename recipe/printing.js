"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refer_to_ingredient = exports.print_recipe = void 0;
var en_inflectors_1 = require("en-inflectors");
var list_1 = require("../lib/list");
var menu_global_functions_1 = require("../menu/menu_global_functions");
function print_recipe(recipe) {
    console.log("-----------------------------------");
    (0, menu_global_functions_1.print_bold)(recipe.name);
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
            ingredient_and_ingredients(step.ingredient_names) + " " +
            stringify_kitchenware(step.kitchenware, step.is_kw_active, step.cooking_method));
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
function stringify_kitchenware(kw, exists, cm) {
    var str = kw.name;
    var vowels = ["e", "u", "i", "o", "a"];
    if (exists) {
        str = "the " + str;
    }
    else if (vowels.includes(str[0])) {
        str = "an " + str;
    }
    else {
        str = "a " + str;
    }
    if (cm == "add") {
        str = "to " + str;
    }
    else if (kw.name === "cutting board") {
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
 * Returns ingredient name with correct(ish) conjugation depending on if it
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
        var rest = (0, list_1.tail)(num_rest_of_measurement(ingredient.measurement));
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
        var inflect = new en_inflectors_1.Inflectors(name);
        return inflect.toPlural();
    }
    else {
        return name;
    }
}
exports.refer_to_ingredient = refer_to_ingredient;
