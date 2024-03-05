"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit_kitchenware = void 0;
var save_load_data_1 = require("../../data/save_load_data");
var kitchenware_menu_1 = require("./kitchenware_menu");
var menu_global_functions_1 = require("../menu_global_functions");
var menu_memory_1 = require("../menu_memory");
/**
 * A subsubmenu of the kitchenware menu, where the user can edit existing
 * or newly created kitchenware data.
 * @param kit - The kitchenware that is being adjusted
 * @param old_name - The name that the kitchenware had before being edited
 */
function edit_kitchenware(kit, old_name) {
    var print_menu = [
        '"n" = change kitchenware name',
        '"c" = change kitchenware cooking methods',
        '"b" = save kitchenware and go back to kitchenware menu'
    ];
    var valid_inputs = ["n", "c", "b"];
    (0, menu_global_functions_1.print_bold)("kitchenware being edited: " + kit.name);
    console.log();
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose what kitchenware data you want to adjust: ");
    if (user_input === "n") {
        kit = (0, kitchenware_menu_1.select_kit_name)(kit, true);
    }
    else if (user_input === "c") {
        var temp = (0, kitchenware_menu_1.select_kit_methods)(kit, true);
        if (temp !== undefined) {
            kit = temp;
        }
        else { }
    }
    else if (user_input === "b") {
        (0, save_load_data_1.replace_kitchenware)(old_name, kit);
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.edit_kitchenware = edit_kitchenware;
