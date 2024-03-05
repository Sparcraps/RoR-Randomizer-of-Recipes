"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_ingredient = void 0;
var basics_1 = require("../basics");
var menu_global_functions_1 = require("./menu_global_functions");
var save_load_data_1 = require("../data/save_load_data");
var menu_memory_1 = require("./menu_memory");
var stack_1 = require("../lib/stack");
var ingredients_menu_1 = require("./ingredients_menu");
/**
 * A submenu of the ingredients menu, where the user adds a new ingredient.
 */
function add_ingredient() {
    var new_ingredient = (0, basics_1.empty_ingredient)();
    new_ingredient = (0, ingredients_menu_1.select_name)(new_ingredient);
    new_ingredient = (0, ingredients_menu_1.select_category)(new_ingredient);
    new_ingredient = (0, ingredients_menu_1.select_allergies)(new_ingredient);
    new_ingredient = (0, ingredients_menu_1.select_measurement)(new_ingredient);
    new_ingredient = (0, ingredients_menu_1.select_kcal)(new_ingredient);
    new_ingredient = (0, ingredients_menu_1.select_range)(new_ingredient);
    (0, save_load_data_1.save_new_ingredient)(new_ingredient);
    var keys = Object.keys(new_ingredient);
    var values = Object.values(new_ingredient);
    (0, menu_global_functions_1.print_bold)("Data for the new ingredient: ");
    for (var i = 0; i < values.length; i++) {
        console.log(keys[i] + ":", values[i]);
    }
    var valid_inputs = ["y", "n"];
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Are you happy with the ingredient data? (y/n): ");
    if (user_input === "y") {
        (0, menu_memory_1.oblivion)();
    }
    else if (user_input === "n") {
        var name_1 = new_ingredient.name;
        (0, menu_memory_1.oblivion)();
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)((0, ingredients_menu_1.edit_ingredient_wrapper)(new_ingredient, name_1), (0, menu_memory_1.get_menu_memory)()));
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.add_ingredient = add_ingredient;
