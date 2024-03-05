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
exports.edit_ingredient_wrapper = exports.select_range = exports.select_kcal = exports.select_measurement = exports.select_allergies = exports.select_category = exports.select_name = exports.configure_ingredients = void 0;
var RoR_1 = require("../../RoR");
var basics_1 = require("../../basics");
var save_load_data_1 = require("../../data/save_load_data");
var list_1 = require("../../lib/list");
var stack_1 = require("../../lib/stack");
var add_ingredient_menu_1 = require("./add_ingredient_menu");
var category_menu_1 = require("./category_menu");
var edit_ingredient_menu_1 = require("./edit_ingredient_menu");
var menu_global_functions_1 = require("../menu_global_functions");
var menu_memory_1 = require("../menu_memory");
/**
 * A submenu of the configuration menu, where the user can configure
 * the ingredients used for recipe generation, by adding, editing or removing
 * them.
 */
function configure_ingredients() {
    // Helper function that prompts the user for an ingredient name,
    // searches for it in the data and removes it from the data if found.
    function search_and_delete() {
        var data = (0, save_load_data_1.get_data)();
        var input = (0, RoR_1.prompt)("Enter the name of the ingredient you wish to remove, or press " +
            "enter to go back without removing an ingredient: ").trim().toLowerCase();
        if (input !== "") {
            try {
                data = (0, save_load_data_1.delete_ingredient)(input);
                (0, menu_global_functions_1.print_bold)("\nIngredient removed from data!");
            }
            catch (error) {
                console.log();
                console.error(error.message);
            }
        }
        else { }
        console.log();
    }
    // Helper function that returns an ingredient object by name
    function find_ingredient() {
        var data = (0, save_load_data_1.get_data)();
        var input = (0, RoR_1.prompt)("Enter the name of the ingredient you wish to edit, or press " +
            "enter to go back: ").trim().toLowerCase();
        if (input !== "") {
            for (var i = 0; i < data.ingredients.length; i++) {
                var j = (0, basics_1.find_by_name)(input, data.ingredients[i]);
                if (j !== -1) {
                    console.log();
                    return data.ingredients[i][j];
                }
                else { }
            }
        }
        else { }
        console.log();
    }
    // Helper function that prints the name of all 
    // currently registered ingredients.
    function print_all_ingredients() {
        var data = (0, save_load_data_1.get_data)();
        var ingr = data.ingredients;
        (0, menu_global_functions_1.print_bold)("Currently registered ingredients: ");
        for (var i = 0; i < ingr.length; i++) {
            for (var j = 0; j < ingr[i].length; j++) {
                console.log("- " + ingr[i][j].name);
            }
        }
        console.log();
    }
    var valid_inputs = ["a", "e", "r", "l", "b"];
    var print_menu = ['"a" = add ingredient',
        '"e" = edit existing ingredient',
        '"r" = remove ingredient',
        '"l" = display a list of all existing ingredients',
        '"b" = back to configurations menu'];
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
    if (user_input === "a") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(add_ingredient_menu_1.add_ingredient, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "e") {
        var ingredient = find_ingredient();
        if (ingredient !== undefined) {
            var name_1 = ingredient.name;
            (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(edit_ingredient_wrapper(ingredient, name_1), (0, menu_memory_1.get_menu_memory)()));
        }
        else {
            (0, menu_global_functions_1.print_bold)("There is no ingredient with that name!");
            console.log();
        }
    }
    else if (user_input === "r") {
        search_and_delete();
    }
    else if (user_input === "l") {
        print_all_ingredients();
    }
    else if (user_input === "b") {
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.configure_ingredients = configure_ingredients;
/**
 * Helper function that prompts the user to select a name for an ingredient.
 * @param ingredient - The ingredient to select name for
 * @param is_editing - Determines whether the current name should be
 * printed before prompting the user or not (false by default)
 * @returns the updated ingredient.
 */
function select_name(ingredient, is_editing) {
    if (is_editing === void 0) { is_editing = false; }
    // helper function used to avoid duplicate ingredient names
    function is_name_taken(ingredient_name) {
        var name_taken;
        if (is_editing) {
            return name_taken = (0, save_load_data_1.is_ingredient_in_data)(ingredient_name) &&
                ingredient_name !== ingredient.name;
        }
        else {
            return name_taken = (0, save_load_data_1.is_ingredient_in_data)(ingredient_name);
        }
    }
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Current ingredient name: " + ingredient.name);
        console.log();
    }
    else { }
    var name = (0, RoR_1.prompt)("Enter new ingredient name: ").trim().toLowerCase();
    var name_taken = is_name_taken(name);
    console.log();
    while (name === "" || name_taken) {
        (0, menu_global_functions_1.print_bold)("Ingredient name cannot be empty, only contain whitespace or " +
            "is already taken by another ingredient.");
        name = (0, RoR_1.prompt)("Enter new ingredient name: ").trim().toLowerCase();
        name_taken = is_name_taken(name);
    }
    ingredient.name = name;
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Ingredient category updated!");
        console.log();
    }
    else { }
    return ingredient;
}
exports.select_name = select_name;
/**
* Helper function that prompts the user to select a category for an ingredient.
* @param ingredient - The ingredient to select category for
* @param is_editing - Determines whether the current category should be
* printed before prompting the user or not (false by default)
* @returns the updated ingredient.
*/
function select_category(ingredient, is_editing) {
    if (is_editing === void 0) { is_editing = false; }
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Current ingredient category: " + ingredient.category);
        console.log();
    }
    else { }
    var category_names = (0, category_menu_1.print_all_categories)("Valid ingredient categories: ");
    var user_input = (0, menu_global_functions_1.check_input)(category_names, "Choose which category the new ingredient belongs to: ");
    ingredient.category = user_input;
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Ingredient category updated!");
        console.log();
    }
    else { }
    return ingredient;
}
exports.select_category = select_category;
/**
* Helper function that prompts the user to select the dietary restrictions
* that apply to an ingredient.
* @param ingredient - The ingredient to select dietary restrictions for
* @param is_editing - Determines whether the current dietary restrictions
* should be printed before prompting the user or not (false by default)
* @returns the updated ingredient.
*/
function select_allergies(ingredient, is_editing) {
    if (is_editing === void 0) { is_editing = false; }
    if (is_editing) {
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
        "ingredient, or press enter if no dietary restrictions apply: ");
    while (user_input !== "") {
        var index = valid_dietary_not_active.indexOf(user_input);
        if (index !== -1) {
            allergy_array.push(user_input);
            valid_dietary_not_active.splice(index, 1);
            (0, menu_global_functions_1.print_bold)("Dietary restriction added!");
            console.log();
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
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Ingredient dietary restrictions updated!");
        console.log();
    }
    else { }
    return ingredient;
}
exports.select_allergies = select_allergies;
/**
* Helper function that prompts the user to select the unit of measurement for
* an ingredient.
* @param ingredient - The ingredient to select the unit of measurement for
* @param is_editing - Determines whether the current unit of measurement
* should be printed before prompting the user or not (false by default)
* @returns the updated ingredient.
*/
function select_measurement(ingredient, is_editing) {
    if (is_editing === void 0) { is_editing = false; }
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Current ingredient measurement: " + ingredient.measurement);
        console.log();
    }
    else { }
    ingredient.measurement = (0, RoR_1.prompt)('Enter unit of measurement either as amount in the format of a ' +
        'float number, or as a float followed by a string, e.g. "0.5 dl": ').trim().toLowerCase();
    console.log();
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Ingredient unit of measurement updated!");
        console.log();
    }
    else { }
    return ingredient;
}
exports.select_measurement = select_measurement;
/**
* Helper function that prompts the user to select the kcal per measurement for
* an ingredient.
* @param ingredient - The ingredient to select the kcal per measurement for
* @param is_editing - Determines whether the current kcal per measurement
* should be printed before prompting the user or not (false by default)
* @returns the updated ingredient.
*/
function select_kcal(ingredient, is_editing) {
    if (is_editing === void 0) { is_editing = false; }
    if (is_editing) {
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
            if (is_editing) {
                (0, menu_global_functions_1.print_bold)("Ingredient kcal per measurement updated!");
                console.log();
            }
            else { }
            return ingredient;
        }
    }
}
exports.select_kcal = select_kcal;
/**
* Helper function that prompts the user to select the range in which
* an ingredient's amount can be randomized, based on the ingredients
* unit of measurement.
* @param ingredient - The ingredient to select the amount range for
* @param is_editing - Determines whether the current amount range
* should be printed before prompting the user or not (false by default)
* @returns the updated ingredient.
*/
function select_range(ingredient, is_editing) {
    if (is_editing === void 0) { is_editing = false; }
    if (is_editing) {
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
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Ingredient amount range updated!");
        console.log();
    }
    else { }
    return ingredient;
}
exports.select_range = select_range;
/**
 * Wrap the edit_ingredient function so that it's parameters are snapshotted
 * and can be added to the stack.
 * @param ingredient - Ingredient that is being edited
 * @param old_name - Name of the ingredient before it gets edited
 * @returns the function edit_ingredient with fixated parameters
 */
function edit_ingredient_wrapper(ingredient, old_name) {
    return function () {
        (0, edit_ingredient_menu_1.edit_ingredient)(ingredient, old_name);
    };
}
exports.edit_ingredient_wrapper = edit_ingredient_wrapper;
