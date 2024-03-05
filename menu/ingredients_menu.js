"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEditIngredientWrapper = exports.configure_ingredients = void 0;
var RoR_1 = require("../RoR");
var save_load_data_1 = require("../data/save_load_data");
var stack_1 = require("../lib/stack");
var add_ingredient_menu_1 = require("./add_ingredient_menu");
var edit_ingredient_menu_1 = require("./edit_ingredient_menu");
var menu_global_functions_1 = require("./menu_global_functions");
var menu_memory_1 = require("./menu_memory");
/**
 * A submenu of the configurations menu, where the user can configure
 * the ingredients used for recipe generation, by adding or removing them.
 */
function configure_ingredients() {
    // Helper function that prints the name of all 
    // currently registered ingredients.
    function print_all_ingredients() {
        var ingr = data.ingredients;
        (0, menu_global_functions_1.print_bold)("Currently registered ingredients: ");
        for (var i = 0; i < ingr.length; i++) {
            for (var j = 0; j < ingr[i].length; j++) {
                console.log("- " + ingr[i][j].name);
            }
        }
        console.log();
    }
    // Helper function that prompts the user for an ingredient name,
    // searches for it in the data and removes it from the data if found.
    function search_and_delete() {
        var input = (0, RoR_1.prompt)("Enter search string, or press enter to go back without removing " +
            "an ingredient: ").trim().toLowerCase();
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
    function find_ingredient() {
        var input = (0, RoR_1.prompt)("Enter the name of the ingredient you wish to edit, or press " +
            "enter to go back without removing an ingredient: ").trim().toLowerCase();
        if (input !== "") {
            for (var i = 0; i < data.ingredients.length; i++) {
                for (var j = 0; j < data.ingredients[i].length; j++) {
                    if (data.ingredients[i][j].name === input) {
                        console.log();
                        return data.ingredients[i][j];
                    }
                }
            }
        }
        else { }
        console.log();
    }
    var data = (0, save_load_data_1.load_data)();
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
            (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(createEditIngredientWrapper(ingredient), (0, menu_memory_1.get_menu_memory)()));
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
function createEditIngredientWrapper(ingredient) {
    return function () {
        // Inside this function, you can access the ingredient parameter
        // and call edit_ingredient with the correct value
        (0, edit_ingredient_menu_1.edit_ingredient)(ingredient);
    };
}
exports.createEditIngredientWrapper = createEditIngredientWrapper;
// Then, in the configure_ingredients function, use the wrapper function instead of bind
