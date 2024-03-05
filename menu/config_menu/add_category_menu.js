"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_category = void 0;
var basics_1 = require("../../basics");
var menu_global_functions_1 = require("../menu_global_functions");
var save_load_data_1 = require("../../data/save_load_data");
var menu_memory_1 = require("../menu_memory");
var stack_1 = require("../../lib/stack");
var category_menu_1 = require("./category_menu");
/**
 * A submenu of the category menu, where the user adds a new category.
 */
function add_category() {
    var new_cat = (0, basics_1.empty_category)();
    new_cat = (0, category_menu_1.select_cat_name)(new_cat);
    var temp = (0, category_menu_1.select_cat_methods)(new_cat);
    if (temp !== undefined) {
        new_cat = temp;
    }
    else { }
    new_cat = (0, category_menu_1.select_cat_max)(new_cat);
    (0, save_load_data_1.save_new_category)(new_cat);
    var keys = Object.keys(new_cat);
    var values = Object.values(new_cat);
    (0, menu_global_functions_1.print_bold)("Data for the new category: ");
    for (var i = 0; i < values.length; i++) {
        console.log(keys[i] + ":", values[i]);
    }
    var valid_inputs = ["y", "n"];
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Are you happy with the category data? (y/n): ");
    if (user_input === "y") {
        (0, menu_memory_1.oblivion)();
    }
    else if (user_input === "n") {
        var name_1 = new_cat.name;
        (0, menu_memory_1.oblivion)();
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)((0, category_menu_1.edit_category_wrapper)(new_cat, name_1), (0, menu_memory_1.get_menu_memory)()));
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.add_category = add_category;
