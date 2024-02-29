"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipimize = void 0;
var RoR_1 = require("../RoR");
var stack_1 = require("../lib/stack");
var save_config_1 = require("../save_config");
var save_recipe_1 = require("../save_recipe");
var main_menu_1 = require("./main_menu");
var menu_global_functions_1 = require("./menu_global_functions");
var menu_memory_1 = require("./menu_memory");
/**
 * A submenu of the main menu, responsible for recipe generation.
 */
function recipimize() {
    // An adjusted recipimize menu in the case where a generated recipe
    // is saved, to make sure that the same recipe can't be saved twice.
    function recipimize_saved() {
        print_menu = ['"r" = randomize new recipe', '"b" = back to main menu'];
        valid_inputs = ["r", "b"];
        (0, menu_global_functions_1.print_alternatives)(print_menu);
        var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
        if (user_input === "r") {
            (0, menu_memory_1.oblivion)();
            (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(recipimize, (0, menu_memory_1.get_menu_memory)()));
        }
        else if (user_input === "b") {
            (0, menu_memory_1.oblivion)();
        }
    }
    var config = (0, save_config_1.load_configuration)();
    var recipes = (0, save_recipe_1.load_recipes)();
    var portion_amount = config.portion_amount;
    var restrictions = config.dietary_restrictions;
    var print_menu = ['"r" = randomize new recipe',
        '"s" = save recipe',
        '"b" = back to main menu'];
    var valid_inputs = ["r", "s", "b"];
    var recipe = (0, RoR_1.generate_recipe)(main_menu_1.portion_size, portion_amount, restrictions);
    (0, RoR_1.print_recipe)(recipe);
    (0, menu_global_functions_1.wait_for_keypress)();
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
    if (user_input === "r") {
        return;
    }
    else if (user_input === "s") {
        recipes = (0, save_recipe_1.save_new_recipe)(recipe);
        console.log("Recipe: '" + recipe.name + "' saved!\n");
        (0, menu_memory_1.oblivion)();
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(recipimize_saved, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "b") {
        (0, menu_memory_1.oblivion)();
    }
}
exports.recipimize = recipimize;
