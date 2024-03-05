"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
var stack_1 = require("../../lib/stack");
var save_config_1 = require("../../data/save_config");
var menu_global_functions_1 = require("../menu_global_functions");
var menu_memory_1 = require("../menu_memory");
var dietary_prompt_menu_1 = require("./dietary_prompt_menu");
var ingredients_menu_1 = require("./ingredients_menu");
var category_menu_1 = require("./category_menu");
var kitchenware_menu_1 = require("./kitchenware_menu");
/**
 * A submenu of the main menu, where the user can select
 * what they want to configure.
 */
function configure() {
    // A submenu of the configurations menu where the user
    // can change the portion size.
    function configure_portion() {
        valid_inputs = ["y", "n"];
        (0, menu_global_functions_1.print_bold)("Current portion amount: " + config.portion_amount.toString());
        user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Do you wish to change the portion amount? (y/n): ");
        if (user_input === "y") {
            var input_int = (0, menu_global_functions_1.integer_prompt)("Enter new portion amount: ");
            config = (0, save_config_1.change_portion_amount)(input_int, config);
            (0, menu_global_functions_1.print_bold)("\nNew amount registered.\n");
            (0, menu_memory_1.oblivion)();
        }
        else if (user_input === "n") {
            (0, menu_memory_1.oblivion)();
        }
        else {
            throw new Error("Invalid user_input has escaped.");
        }
    }
    var config = (0, save_config_1.load_configuration)();
    var print_menu = ['"p" = portion amount',
        '"d" = dietary restrictions',
        '"i" = ingredient data',
        '"c" = category data',
        '"k" = kitchenware data',
        '"b" = back to main menu'];
    var valid_inputs = ["p", "d", "i", "c", "k", "b"];
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose what you want to configure: ");
    if (user_input === "p") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(configure_portion, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "d") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(dietary_prompt_menu_1.dietary_prompt, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "i") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(ingredients_menu_1.configure_ingredients, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "i") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(category_menu_1.configure_categories, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "k") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(kitchenware_menu_1.configure_kitchenware, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "b") {
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.configure = configure;
