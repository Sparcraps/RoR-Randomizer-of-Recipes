"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomize_cooking_instruction = exports.new_ingredient = exports.find_ingredient = exports.get_ingredient = void 0;
function is_ingredient(input) {
    return input.tag === "ingredient";
}
function get_ingredient_name(ingredient) {
    return ingredient.name;
}
function get_ingredient_calories(ingredient) {
    return ingredient.kcal_per_measurement;
}
function get_ingredient_cooking_methods(ingredient) {
    return ingredient.ingredient_type.cooking_methods;
}
function get_ingredient_type(ingredient) {
    return ingredient.ingredient_type;
}
// export function get_ingredient_nutrition_type(ingredient: Ingredient): Array<string> {
//     return ingredient.nutrition_type;
// }
function is_vegetarian(ingredient) {
    return ingredient.allergies.includes("meat");
}
function is_vegan(ingredient) {
    return ingredient.ingredient_type.name !== "meat" &&
        ingredient.ingredient_type.name !== "egg" &&
        ingredient.ingredient_type.name !== "dairy";
}
function is_lactose_friendly(ingredient) {
    return ingredient.ingredient_type.name !== "dairy";
}
function get_ingredient(name, arr) {
    var l = arr.length;
    for (var i = 0; i < arr.length; i++) {
        var ingredient = arr[i];
        if (ingredient.name === name) {
            return ingredient;
        }
        else { }
    }
    return undefined;
}
exports.get_ingredient = get_ingredient;
function find_ingredient(name, arr) {
    var l = arr.length;
    for (var i = 0; i < arr.length; i++) {
        var ingredient = arr[i];
        if (ingredient.name === name) {
            return i;
        }
        else { }
    }
    return -1;
}
exports.find_ingredient = find_ingredient;
function new_ingredient(ingredient_type, name, allergies, measurement, kcal_per_measurement, range) {
    return {
        name: name,
        ingredient_type: ingredient_type,
        allergies: allergies,
        measurement: measurement,
        kcal_per_measurement: kcal_per_measurement,
        range: range,
        tag: "ingredient", history: []
    };
}
exports.new_ingredient = new_ingredient;
function randomize_cooking_instruction(ingredient) {
    var method_arr = get_ingredient_cooking_methods(ingredient);
    var len = method_arr.length;
    var index = Math.floor(Math.random() * len);
    var randomized = method_arr[index];
    return randomized;
}
exports.randomize_cooking_instruction = randomize_cooking_instruction;
