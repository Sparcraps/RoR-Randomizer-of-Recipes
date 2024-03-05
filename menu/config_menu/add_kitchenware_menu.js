"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_kitchenware = void 0;
var basics_1 = require("../../basics");
var menu_global_functions_1 = require("../menu_global_functions");
var save_load_data_1 = require("../../data/save_load_data");
var menu_memory_1 = require("../menu_memory");
var stack_1 = require("../../lib/stack");
var kitchenware_menu_1 = require("./kitchenware_menu");
/**
 * A submenu of the kitchenware menu, where the user adds a new kitchenware.
 */
function add_kitchenware() {
    var new_kit = (0, basics_1.empty_kitchenware)();
    new_kit = (0, kitchenware_menu_1.select_kit_name)(new_kit);
    var temp = (0, kitchenware_menu_1.select_kit_methods)(new_kit);
    if (temp !== undefined) {
        new_kit = temp;
    }
    else { }
    (0, save_load_data_1.save_new_kitchenware)(new_kit);
    var keys = Object.keys(new_kit);
    var values = Object.values(new_kit);
    (0, menu_global_functions_1.print_bold)("Data for the new kitchenware: ");
    for (var i = 0; i < values.length; i++) {
        console.log(keys[i] + ":", values[i]);
    }
    var valid_inputs = ["y", "n"];
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Are you happy with the kitchenware data? (y/n): ");
    if (user_input === "y") {
        (0, menu_memory_1.oblivion)();
    }
    else if (user_input === "n") {
        var name_1 = new_kit.name;
        (0, menu_memory_1.oblivion)();
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)((0, kitchenware_menu_1.edit_kitchenware_wrapper)(new_kit, name_1), (0, menu_memory_1.get_menu_memory)()));
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.add_kitchenware = add_kitchenware;
