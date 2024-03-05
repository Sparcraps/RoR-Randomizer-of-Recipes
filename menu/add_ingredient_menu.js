"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.select_range = exports.select_kcal = exports.select_measurement = exports.select_allergies = exports.select_category = exports.select_name = exports.add_ingredient = void 0;
var RoR_1 = require("../RoR");
var basics_1 = require("../basics");
var menu_global_functions_1 = require("./menu_global_functions");
var save_load_data_1 = require("../data/save_load_data");
var menu_memory_1 = require("./menu_memory");
var stack_1 = require("../lib/stack");
var list_1 = require("../lib/list");
var edit_ingredient_menu_1 = require("./edit_ingredient_menu");
/**
 * A submenu of the ingredients menu, where the user adds a new ingredient.
 */
function add_ingredient() {
    var new_ingredient = (0, basics_1.empty_ingredient)();
    new_ingredient = select_name(new_ingredient);
    new_ingredient = select_category(new_ingredient);
    new_ingredient = select_allergies(new_ingredient);
    new_ingredient = select_measurement(new_ingredient);
    new_ingredient = select_kcal(new_ingredient);
    new_ingredient = select_range(new_ingredient);
    (0, save_load_data_1.save_new_ingredient)(new_ingredient);
    var keys = Object.keys(new_ingredient);
    var values = Object.values(new_ingredient);
    (0, menu_global_functions_1.print_bold)("Data for the new ingredient: ");
    (0, menu_global_functions_1.print_alternatives)(keys);
    for (var i = 0; i < values.length; i++) {
        console.log(values[i]);
    }
    var valid_inputs = ["y", "n"];
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Are you happy with the ingredient data? (y/n): ");
    if (user_input === "y") {
        (0, menu_memory_1.oblivion)();
    }
    else if (user_input === "n") {
        (0, menu_memory_1.oblivion)();
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(edit_ingredient_menu_1.edit_ingredient.bind(new_ingredient), (0, menu_memory_1.get_menu_memory)()));
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.add_ingredient = add_ingredient;
// Helper function that prompts the user to select a name for
// an ingredient and then returns the updated ingredient.
function select_name(ingredient, print_contents) {
    if (print_contents === void 0) { print_contents = false; }
    if (print_contents) {
        (0, menu_global_functions_1.print_bold)("Current ingredient name: " + ingredient.name);
        console.log();
    }
    else { }
    var name = (0, RoR_1.prompt)("Enter new ingredient name: ").trim().toLowerCase();
    console.log();
    while (name === "") {
        (0, menu_global_functions_1.print_bold)("Ingredient name cannot be empty or only contain whitespace.");
        name = (0, RoR_1.prompt)("Enter new ingredient name: ").trim().toLowerCase();
    }
    ingredient.name = name;
    return ingredient;
}
exports.select_name = select_name;
// Helper function that prompts the user to select a category for
// an ingredient and then returns the updated ingredient.
function select_category(ingredient, print_contents) {
    if (print_contents === void 0) { print_contents = false; }
    var data = (0, save_load_data_1.load_data)();
    if (print_contents) {
        (0, menu_global_functions_1.print_bold)("Current ingredient category: " + ingredient.category);
        console.log();
    }
    else { }
    (0, menu_global_functions_1.print_bold)("Valid ingredient categories: ");
    var category_names = [];
    var cats = data.categories;
    for (var i = 0; i < cats.length; i++) {
        category_names[i] = cats[i].name;
    }
    (0, menu_global_functions_1.print_alternatives)(category_names);
    var user_input = (0, menu_global_functions_1.check_input)(category_names, "Choose which category the new ingredient belongs to: ");
    ingredient.category = user_input;
    return ingredient;
}
exports.select_category = select_category;
// Helper function that prompts the user to select the dietary restrictions
// that apply to an ingredient and then returns the updated ingredient.
function select_allergies(ingredient, print_contents) {
    if (print_contents === void 0) { print_contents = false; }
    if (print_contents) {
        (0, menu_global_functions_1.print_bold)("Current ingredient dietary restrictions: ");
        (0, menu_global_functions_1.print_alternatives)(ingredient.allergies);
        console.log();
    }
    else { }
    var allergy_array = [];
    var valid_dietary_not_active = __spreadArray([], RoR_1.valid_dietary_restrictions, true);
    valid_dietary_not_active.push("");
    (0, menu_global_functions_1.print_bold)("Valid dietary restrictions: ");
    (0, menu_global_functions_1.print_alternatives)(RoR_1.valid_dietary_restrictions);
    var user_input = (0, menu_global_functions_1.check_input)(valid_dietary_not_active, "Enter a dietary restriction of the above that applies to the " +
        "new ingredient, or press enter if no dietary restrictions apply: ");
    while (user_input !== "") {
        allergy_array.push(user_input);
        var index = valid_dietary_not_active.indexOf(user_input);
        if (index !== -1) {
            valid_dietary_not_active.splice(index, 1);
        }
        else {
            throw new Error("Could not find active dietary restriction");
        }
        (0, menu_global_functions_1.print_bold)("Valid dietary restrictions that have not yet been added: ");
        (0, menu_global_functions_1.print_alternatives)(valid_dietary_not_active);
        user_input = (0, menu_global_functions_1.check_input)(valid_dietary_not_active, "Enter another dietary restriction that applies to the new " +
            "ingredient, or press enter if no more dietary restrictions " +
            "apply: ");
    }
    ingredient.allergies = allergy_array;
    return ingredient;
}
exports.select_allergies = select_allergies;
// Helper function that prompts the user to select the unit of measurement
// for an ingredient and then returns the updated ingredient.
function select_measurement(ingredient, print_contents) {
    if (print_contents === void 0) { print_contents = false; }
    if (print_contents) {
        (0, menu_global_functions_1.print_bold)("Current ingredient measurement: " + ingredient.measurement);
        console.log();
    }
    else { }
    ingredient.measurement = (0, RoR_1.prompt)('Enter unit of measurement either as amount in the format of a ' +
        'float number, or as a float followed by a string, e.g. "0.5 dl": ').trim().toLowerCase();
    console.log();
    return ingredient;
}
exports.select_measurement = select_measurement;
// Helper function that prompts the user to select the kcal per measurement
// for an ingredient and then returns the updated ingredient.
function select_kcal(ingredient, print_contents) {
    if (print_contents === void 0) { print_contents = false; }
    if (print_contents) {
        (0, menu_global_functions_1.print_bold)("Current ingredient kcal per measurement: " +
            ingredient.kcal_per_measurement.toString());
        console.log();
    }
    else { }
    while (true) {
        var kcal_input = (0, menu_global_functions_1.integer_prompt)("Enter the amount of kcal per measurement (rounded to " +
            "nearest integer) for the new ingredient: ");
        if (kcal_input < 0) {
            (0, menu_global_functions_1.print_bold)("kcal per measurement cannot be negative!");
        }
        else {
            console.log();
            ingredient.kcal_per_measurement = kcal_input;
            return ingredient;
        }
    }
}
exports.select_kcal = select_kcal;
// Helper function that prompts the user to select the range in which
// an ingredients amount can be randomized, based on the ingredients
// unit of measurement, and then returns the updated ingredient.
function select_range(ingredient, print_contents) {
    if (print_contents === void 0) { print_contents = false; }
    if (print_contents) {
        (0, menu_global_functions_1.print_bold)("Current ingredient amount range: " +
            ingredient.range[0].toString() +
            " - " +
            ingredient.range[1].toString());
        console.log();
    }
    else { }
    var lower_range = (0, menu_global_functions_1.integer_prompt)("Enter the lower limit for the amount able to be randomized of " +
        "the new ingredient, measured in the ingredients measurement: ");
    console.log();
    while (lower_range < 0) {
        (0, menu_global_functions_1.print_bold)("the lower limit cannot be negative\n");
        lower_range = (0, menu_global_functions_1.integer_prompt)("Please choose a new lower limit: ");
    }
    var upper_range = (0, menu_global_functions_1.integer_prompt)("Enter the upper limit for the amount able to be randomized of " +
        "the new ingredient, measured in the ingredients measurement: ");
    console.log();
    while (upper_range < lower_range) {
        (0, menu_global_functions_1.print_bold)("the upper limit cannot be lower than the lower limit\n");
        upper_range = (0, menu_global_functions_1.integer_prompt)("Please choose a new upper limit: ");
    }
    ingredient.range = (0, list_1.pair)(lower_range, upper_range);
    return ingredient;
}
exports.select_range = select_range;
