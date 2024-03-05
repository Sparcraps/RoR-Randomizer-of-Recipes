"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit_category = void 0;
var save_load_data_1 = require("../../data/save_load_data");
var category_menu_1 = require("./category_menu");
var menu_global_functions_1 = require("../menu_global_functions");
var menu_memory_1 = require("../menu_memory");
/**
 * A subsubmenu of the category menu, where the user can edit existing
 * or newly created category data.
 * @param category - The Category that is being adjusted
 * @param old_name - The name that the kitchenware had before being edited
 */
function edit_category(cat, old_name) {
    var print_menu = [
        '"n" = change category name',
        '"c" = change category cooking methods',
        '"m" = change category max ingredient amount',
        '"b" = save category and go back to category menu'
    ];
    var valid_inputs = ["n", "c", "m", "b"];
    (0, menu_global_functions_1.print_bold)("Category being edited: " + cat.name);
    console.log();
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose what category data you want to adjust: ");
    if (user_input === "n") {
        cat = (0, category_menu_1.select_cat_name)(cat, true);
    }
    else if (user_input === "c") {
        var temp = (0, category_menu_1.select_cat_methods)(cat, true);
        if (temp !== undefined) {
            cat = temp;
        }
        else { }
    }
    else if (user_input === "m") {
        cat = (0, category_menu_1.select_cat_max)(cat, true);
    }
    else if (user_input === "b") {
        (0, save_load_data_1.replace_category)(old_name, cat);
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.edit_category = edit_category;
