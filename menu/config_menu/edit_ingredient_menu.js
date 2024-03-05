"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit_ingredient = void 0;
var save_load_data_1 = require("../../data/save_load_data");
var ingredients_menu_1 = require("./ingredients_menu");
var menu_global_functions_1 = require("../menu_global_functions");
var menu_memory_1 = require("../menu_memory");
/**
 * A subsubmenu of the ingredient menu, where the user can edit existing
 * or newly created ingredient data.
 * @param ingredient - The ingredient that is being
 * @param old_name - The name that the ingredient had before being edited
 */
function edit_ingredient(ingredient, old_name) {
    var print_menu = [
        '"n" = change ingredient name',
        '"c" = change ingredient categories',
        '"d" = change ingredient dietary restrictions',
        '"m" = change ingredient measurement',
        '"k" = change ingredient kcal per measurement',
        '"r" = change ingredient amount range',
        '"b" = save ingredient and go back to ingredient menu'
    ];
    var valid_inputs = ["n", "c", "d", "m", "k", "r", "b"];
    (0, menu_global_functions_1.print_bold)("Ingredient being edited: " + ingredient.name);
    console.log();
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose what ingredient data you want to adjust: ");
    if (user_input === "n") {
        ingredient = (0, ingredients_menu_1.select_name)(ingredient, true);
    }
    else if (user_input === "c") {
        ingredient = (0, ingredients_menu_1.select_category)(ingredient, true);
    }
    else if (user_input === "d") {
        ingredient = (0, ingredients_menu_1.select_allergies)(ingredient, true);
    }
    else if (user_input === "m") {
        ingredient = (0, ingredients_menu_1.select_measurement)(ingredient, true);
    }
    else if (user_input === "k") {
        ingredient = (0, ingredients_menu_1.select_kcal)(ingredient, true);
    }
    else if (user_input === "r") {
        ingredient = (0, ingredients_menu_1.select_range)(ingredient, true);
    }
    else if (user_input === "b") {
        (0, save_load_data_1.replace_ingredient)(old_name, ingredient);
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.edit_ingredient = edit_ingredient;
