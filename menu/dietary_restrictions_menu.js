"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure_dietary = void 0;
var list_1 = require("../lib/list");
var save_config_1 = require("../data/save_config");
var RoR_1 = require("../RoR");
var menu_global_functions_1 = require("./menu_global_functions");
var menu_memory_1 = require("./menu_memory");
/**
 * A subsubmenu of the configurations menu, where the user can configure
 * dietary restrictions by adding or removing them.
 */
function configure_dietary() {
    // Helper function that prompts the user to enter a valid
    // dietary restriction and returns the input as well as
    // information of its existance in currently active dietary restrictions.
    function select_valid_dietary() {
        var valid = RoR_1.valid_dietary_restrictions;
        (0, menu_global_functions_1.print_bold)("Valid alternatives: ");
        (0, menu_global_functions_1.print_alternatives)(valid);
        var input = (0, menu_global_functions_1.check_input)(valid, "Choose dietary restriction of the above: ");
        var is_already_in_arr = config.dietary_restrictions.includes(input);
        return (0, list_1.pair)(is_already_in_arr, input);
    }
    // Helper function that adds a dietary restriction
    // if it is valid and not already active.
    function add_diet() {
        var diet_pair = select_valid_dietary();
        if (!diet_pair[0]) {
            config = (0, save_config_1.add_to_dietary_restrictions)(diet_pair[1], config);
            (0, menu_global_functions_1.print_bold)("Dietary restriction successfully added!\n");
        }
        else {
            (0, menu_global_functions_1.print_bold)("Dietary restriction not added; it is already active.\n");
        }
    }
    // Helper function that removes a dietary restriction
    // if it is valid and active.
    function remove_diet() {
        var diet_pair = select_valid_dietary();
        if (diet_pair[0]) {
            config = (0, save_config_1.remove_from_dietary_restrictions)(diet_pair[1], config);
            (0, menu_global_functions_1.print_bold)("Dietary restriction successfully removed!\n");
        }
        else {
            (0, menu_global_functions_1.print_bold)("Dietary restriction not removed; it is not active.\n");
        }
    }
    var config = (0, save_config_1.load_configuration)();
    var print_menu = ['"a" = add dietary restriction',
        '"r" = remove dietary restriction',
        '"v" = view active dietary restrictions',
        '"b" = back to configurations menu'];
    var valid_inputs = ["a", "r", "v", "b"];
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
    if (user_input === "a") {
        add_diet();
    }
    else if (user_input === "r") {
        remove_diet();
    }
    else if (user_input === "v") {
        if (config.dietary_restrictions.length === 0) {
            (0, menu_global_functions_1.print_bold)("You have no active dietary restrictions.\n");
        }
        else {
            (0, menu_global_functions_1.print_bold)("Active dietary restrictions: ");
            (0, menu_global_functions_1.print_alternatives)(config.dietary_restrictions);
            console.log();
        }
    }
    else if (user_input === "b") {
        (0, menu_memory_1.oblivion)(2);
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.configure_dietary = configure_dietary;
