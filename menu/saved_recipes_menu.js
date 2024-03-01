"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saved_recipes = void 0;
var printing_1 = require("../recipe/printing");
var save_recipe_1 = require("../data/save_recipe");
var menu_global_functions_1 = require("./menu_global_functions");
var menu_memory_1 = require("./menu_memory");
/**
 * A submenu of the main menu, responsible fetching saved recipes so that
 * the user can view and delete them.
 */
function saved_recipes() {
    // Helper function that prints the current saved recipes and lets the user
    // select one of them.
    function choose_recipe() {
        (0, menu_global_functions_1.print_bold)("Your saved recipes:");
        for (var i = 0; i < recipes.length; i++) {
            var current_name = recipes[i].name;
            console.log(i + 1, current_name);
        }
        var int;
        var true_index;
        while (true) {
            int = (0, menu_global_functions_1.integer_prompt)("Enter the number corresponding to " +
                "the recipe you want to choose: ");
            true_index = int - 1;
            if (!(true_index < 0 || true_index >= recipes.length)) {
                // to ensure no index out of range
                return recipes[true_index];
            }
            else {
                console.log("Invalid number entered. Please try again.");
            }
        }
    }
    var recipes = (0, save_recipe_1.load_recipes)();
    var print_menu = ['"v" = view saved recipe',
        '"d" = delete saved recipe',
        '"b" = back to main menu'];
    var valid_inputs = ["v", "d", "b"];
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
    if (user_input === "v") {
        if (recipes.length === 0) {
            console.log("You have no saved recipes.\n");
        }
        else {
            var selected_recipe = choose_recipe();
            (0, printing_1.print_recipe)(selected_recipe);
            (0, menu_global_functions_1.wait_for_keypress)();
        }
    }
    else if (user_input === "d") {
        if (recipes.length === 0) {
            console.log("You have no saved recipes.\n");
        }
        else {
            var selected_recipe = choose_recipe();
            var name_1 = selected_recipe.name;
            recipes = (0, save_recipe_1.delete_recipe)(name_1);
            console.log("Recipe " + name_1 + " deleted!\n");
        }
    }
    else if (user_input === "b") {
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Error: invalid user_input has escaped.");
    }
}
exports.saved_recipes = saved_recipes;
