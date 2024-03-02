"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure_ingredients = void 0;
var stack_1 = require("../lib/stack");
var add_ingredient_menu_1 = require("./add_ingredient_menu");
var menu_global_functions_1 = require("./menu_global_functions");
var menu_memory_1 = require("./menu_memory");
var remove_ingredient_menu_1 = require("./remove_ingredient_menu");
/**
 * A submenu of the configurations menu, where the user can configure
 * the ingredients used for recipe generation, by adding or removing them.
 */
function configure_ingredients() {
    var valid_inputs = ["a", "r", "b"];
    var print_menu = ['"a" = add ingredient',
        '"r" = remove ingredient',
        '"b" = back to configurations menu'];
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
    if (user_input === "a") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(add_ingredient_menu_1.add_ingredient, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "r") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(remove_ingredient_menu_1.remove_ingredient, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "b") {
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.configure_ingredients = configure_ingredients;
