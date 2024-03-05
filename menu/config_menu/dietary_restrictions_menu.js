"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure_dietary = void 0;
var save_config_1 = require("../../data/save_config");
var menu_global_functions_1 = require("../menu_global_functions");
var menu_memory_1 = require("../menu_memory");
var RoR_1 = require("../../RoR");
/**
 * A subsubmenu of the configurations menu, where the user can configure
 * dietary restrictions by adding or removing them.
 */
function configure_dietary() {
    // Helper function that adds a dietary restriction
    // if it is valid and not already active.
    function add_diet() {
        var restriction = (0, RoR_1.prompt)("Choose dietary restriction to add: ");
        restriction = restriction === null
            ? ""
            : restriction.trim().toLowerCase();
        var is_existing = config.dietary_restrictions.includes(restriction);
        if (!is_existing) {
            config = (0, save_config_1.add_to_dietary_restrictions)(restriction, config);
            (0, menu_global_functions_1.print_bold)("Dietary restriction successfully added!\n");
        }
        else {
            (0, menu_global_functions_1.print_bold)("Dietary restriction not added; it is already active.\n");
        }
    }
    // Helper function that removes a dietary restriction
    // if it is valid and active.
    function remove_diet() {
        var restriction = (0, RoR_1.prompt)("Choose dietary restriction to remove: ");
        restriction = restriction === null
            ? ""
            : restriction.trim().toLowerCase();
        var is_existing = config.dietary_restrictions.includes(restriction);
        if (is_existing) {
            config = (0, save_config_1.remove_from_dietary_restrictions)(restriction, config);
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
