"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dietary_prompt = void 0;
var stack_1 = require("../../lib/stack");
var save_config_1 = require("../../data/save_config");
var dietary_restrictions_menu_1 = require("./dietary_restrictions_menu");
var menu_global_functions_1 = require("../menu_global_functions");
var menu_memory_1 = require("../menu_memory");
/**
 * A submenu of the configurations menu, where the user can view
 * the active dietary restrictions and choose whether they
 * want to change them or not.
 */
function dietary_prompt() {
    var config = (0, save_config_1.load_configuration)();
    var valid_inputs = ["y", "n"];
    (0, menu_global_functions_1.print_bold)("Active dietary restrictions: ");
    (0, menu_global_functions_1.print_alternatives)(config.dietary_restrictions);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Do you wish to change the active dietary restrictions? (y/n): ");
    if (user_input === "y") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(dietary_restrictions_menu_1.configure_dietary, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "n") {
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.dietary_prompt = dietary_prompt;
