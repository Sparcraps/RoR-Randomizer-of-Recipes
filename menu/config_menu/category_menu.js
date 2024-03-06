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
exports.edit_category_wrapper = exports.select_cat_max = exports.select_cat_methods = exports.select_cat_name = exports.print_all_categories = exports.configure_categories = void 0;
var RoR_1 = require("../../RoR");
var basics_1 = require("../../basics");
var save_load_data_1 = require("../../data/save_load_data");
var stack_1 = require("../../lib/stack");
var filters_1 = require("../../recipe/filters");
var add_category_menu_1 = require("./add_category_menu");
var edit_category_menu_1 = require("./edit_category_menu");
var menu_global_functions_1 = require("../menu_global_functions");
var menu_memory_1 = require("../menu_memory");
/**
 * A submenu of the configuration menu, where the user can configure
 * the categories used for recipe generation, by adding, editing or removing
 * them.
 */
function configure_categories() {
    // Helper function that prompts the user for a category name,
    // searches for it in the data and removes it from the data if found.
    function search_and_delete() {
        var input = (0, RoR_1.prompt)("Enter the name of the category you wish to edit, or press " +
            "enter to go back without removing a category: ").trim().toLowerCase();
        if (input !== "") {
            try {
                (0, save_load_data_1.delete_category)(input);
                (0, menu_global_functions_1.print_bold)("\nCategory removed from data!");
            }
            catch (error) {
                console.log();
                console.error(error.message);
            }
        }
        else { }
        console.log();
    }
    // Helper function that returns a category object by name
    function find_category() {
        var data = (0, save_load_data_1.get_data)();
        var input = (0, RoR_1.prompt)("Enter the name of the category you wish to edit: ").trim().toLowerCase();
        if (input !== "") {
            var index = (0, basics_1.find_by_name)(input, data.categories);
            if (index !== -1) {
                console.log();
                return data.categories[index];
            }
            else { }
        }
    }
    var valid_inputs = ["a", "e", "r", "l", "b"];
    var print_menu = ['"a" = add category',
        '"e" = edit existing category',
        '"r" = remove category',
        '"l" = display a list of all existing categories',
        '"b" = back to configurations menu'];
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
    if (user_input === "a") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(add_category_menu_1.add_category, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "e") {
        var cat = find_category();
        if (cat !== undefined) {
            var name_1 = cat.name;
            (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(edit_category_wrapper(cat, name_1), (0, menu_memory_1.get_menu_memory)()));
        }
        else {
            (0, menu_global_functions_1.print_bold)("There is no category with that name!");
            console.log();
        }
    }
    else if (user_input === "r") {
        search_and_delete();
    }
    else if (user_input === "l") {
        print_all_categories("Currently registered categories: ");
    }
    else if (user_input === "b") {
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.configure_categories = configure_categories;
/**
 * Helper function that prints the name of all currently registered categories.
 * @param bold_print_string - Header that is printed in bold font
 * @returns the category names in an Array.
 */
function print_all_categories(bold_print_string) {
    var data = (0, save_load_data_1.get_data)();
    var category_names = [];
    var cats = data.categories;
    (0, menu_global_functions_1.print_bold)(bold_print_string);
    for (var i = 0; i < cats.length; i++) {
        category_names[i] = cats[i].name;
        console.log("- " + cats[i].name);
    }
    console.log();
    return category_names;
}
exports.print_all_categories = print_all_categories;
/**
 * Helper function that prompts the user to select a name for a category.
 * @param cat - The category to select name for
 * @param is_editing - Determines whether the current name should be
 * printed before prompting the user or not (false by default)
 * @returns the updated category.
 */
function select_cat_name(cat, is_editing) {
    if (is_editing === void 0) { is_editing = false; }
    // helper function used to avoid duplicate category names
    function is_name_taken(category_name) {
        var data = (0, save_load_data_1.get_data)();
        var index = (0, basics_1.find_by_name)(category_name, data.categories);
        if (is_editing) {
            return !(index === -1 || name === cat.name);
        }
        else {
            return index !== -1;
        }
    }
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Current category name: " + cat.name);
        console.log();
    }
    else { }
    var name = (0, RoR_1.prompt)("Enter new category name: ").trim().toLowerCase();
    var name_taken = is_name_taken(name);
    console.log();
    while (name === "" || name_taken) {
        (0, menu_global_functions_1.print_bold)("Category name cannot be empty, only contain whitespace or " +
            "is already taken by another category.");
        name = (0, RoR_1.prompt)("Enter new category name: ").trim().toLowerCase();
        name_taken = is_name_taken(name);
    }
    cat.name = name;
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Category name updated!");
        console.log();
    }
    else { }
    return cat;
}
exports.select_cat_name = select_cat_name;
/**
* Helper function that prompts the user to select the applicable cooking methods
* for a category.
* @param cat - The category to select cooking methods for
* @param is_editing - Determines whether the current cooking methods should be
* printed before prompting the user or not (false by default)
* @returns the updated category.
*/
function select_cat_methods(cat, is_editing) {
    if (is_editing === void 0) { is_editing = false; }
    var data = (0, save_load_data_1.get_data)();
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Current category cooking methods: " + cat.cooking_methods);
        console.log();
    }
    else { }
    var method_array = [];
    var valid_methods_not_active = __spreadArray([], Array.from((0, filters_1.get_doable_cooking_methods)(data.kitchenware)), true);
    if (valid_methods_not_active.length === 0) { // To avoid assigning cooking methods to categories when no valid cooking methods can be fetched from kitchenwares.
        console.log("Add cooking methods to kitchenware before adding " +
            "a category");
        return;
    }
    else { }
    valid_methods_not_active.push("");
    (0, menu_global_functions_1.print_bold)("Valid cooking methods: ");
    (0, menu_global_functions_1.print_alternatives)(valid_methods_not_active);
    var user_input = (0, menu_global_functions_1.check_input)(valid_methods_not_active, "Enter a cooking method that applies to the category. " +
        "If the cooking methods depend on each other, enter them in " +
        "the order should be carried out, or press enter to proceed: ");
    while (user_input !== "") {
        var is_valid = valid_methods_not_active.includes(user_input);
        if (!is_valid) {
            (0, menu_global_functions_1.print_bold)("Could not find any kitchenware with this " +
                "cooking method. Try again");
        }
        else {
            var inner_array = [];
            inner_array.push(user_input);
            user_input = (0, menu_global_functions_1.check_input)(valid_methods_not_active, "Enter a cooking method that depends on " +
                "the cooking method you just added, " +
                "or press enter to proceed: ");
            while (user_input !== "") {
                is_valid = valid_methods_not_active.includes(user_input);
                if (!is_valid ||
                    user_input === inner_array[inner_array.length - 1]) {
                    (0, menu_global_functions_1.print_bold)("Either the cooking method does not exist in " +
                        "an existing kitchenware, or the cooking method has " +
                        "already been added.");
                }
                else {
                    inner_array.push(user_input);
                }
                user_input = (0, menu_global_functions_1.check_input)(valid_methods_not_active, "Enter a cooking method that depends on " +
                    "the cooking method you just added, " +
                    "or press enter to proceed: ");
            }
            method_array.push(inner_array);
            (0, menu_global_functions_1.print_bold)("Cooking method added to category!");
            user_input = "temp"; // to not exit both while-loops at the same time
            user_input = (0, menu_global_functions_1.check_input)(valid_methods_not_active, "Enter another cooking method that applies to the new " +
                "ingredient, or press enter if no more cooking methods apply: ");
        }
    }
    cat.cooking_methods = method_array;
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Category cooking methods updated!");
        console.log();
    }
    else { }
    return cat;
}
exports.select_cat_methods = select_cat_methods;
/**
* Helper function that prompts the user to select the max amount of ingredients
* from a category that can be generated in one recipe.
* @param cat - The category to select max amount for
* @param is_editing - Determines whether the current dietary restrictions
* should be printed before prompting the user or not (false by default)
* @returns the updated ingredient.
*/
function select_cat_max(cat, is_editing) {
    if (is_editing === void 0) { is_editing = false; }
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Current category max amount: " +
            cat.max_ingredients.toString());
        console.log();
    }
    else { }
    while (true) {
        var int_input = (0, menu_global_functions_1.integer_prompt)("Enter the amount of kcal per measurement (rounded to " +
            "nearest integer) for the new ingredient: ");
        if (int_input < 0) {
            (0, menu_global_functions_1.print_bold)("category max amount cannot be negative!");
        }
        else {
            console.log();
            cat.max_ingredients = int_input;
            if (is_editing) {
                (0, menu_global_functions_1.print_bold)("Category max amount updated!");
                console.log();
            }
            else { }
            return cat;
        }
    }
}
exports.select_cat_max = select_cat_max;
/**
 * Wrap the edit_category function so that it's parameters are snapshotted
 * and can be added to the stack.
 * @param category - Category that is being edited
 * @param old_name - Name of the category before it gets edited
 * @returns the function edit_category with fixated parameters.
 */
function edit_category_wrapper(category, old_name) {
    return function () {
        category = JSON.parse(JSON.stringify(category));
        (0, edit_category_menu_1.edit_category)(category, old_name);
    };
}
exports.edit_category_wrapper = edit_category_wrapper;
