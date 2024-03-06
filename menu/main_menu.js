"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main_menu = void 0;
var stack_1 = require("../lib/stack");
var menu_memory_1 = require("./menu_memory");
var menu_global_functions_1 = require("./menu_global_functions");
var recipimize_menu_1 = require("./recipimize_menu");
var saved_recipes_menu_1 = require("./saved_recipes_menu");
var configurations_menu_1 = require("./config_menu/configurations_menu");
/**
 * The main menu of RoR. Gives access to all content of the program
 * by its submenus where the user selects how to advance through
 * printed alternatives.
 */
function main_menu() {
    var user_input;
    var print_menu = ['"h" = help', '"r" = randomize recipe',
        '"s" = saved recipes', '"c" = configure',
        '"q" = quit'];
    var valid_inputs = ["h", "r", "q", "s", "c"];
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
    if (user_input === "h") {
        print_help();
    }
    else if (user_input === "r") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(recipimize_menu_1.recipimize, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "s") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(saved_recipes_menu_1.saved_recipes, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "c") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(configurations_menu_1.configure, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "q") {
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
    // Prints explanations of all alternatives in the main menu
    function print_help() {
        (0, menu_global_functions_1.print_bold)("randomize recipe: ");
        console.log("The main feature of RoR.");
        console.log("Generates a randomized recipe based on the current configurations.");
        console.log("The ingredients picked out for the recipe, their quantities " +
            "and cooking methods will all be randomized,");
        console.log("until the requested number of portions has been met.\n");
        (0, menu_global_functions_1.print_bold)("quit: ");
        console.log("Terminates the program session.");
        console.log("All configurations and saved recipes carry over to " +
            "the next time RoR is run.\n");
        (0, menu_global_functions_1.print_bold)("saved recipes: ");
        console.log("View a menu of all previously saved recipes.");
        console.log("The saved recipes can be viewed or deleted\n");
        (0, menu_global_functions_1.print_bold)("configure: ");
        console.log("View a menu of recipe generation configurations.");
        console.log("Number of portions, active dietary restrictions " +
            "and ingredient, category and kitchenware data can be adjusted.\n");
    }
}
exports.main_menu = main_menu;
