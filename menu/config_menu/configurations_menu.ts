import { push } from "../../lib/stack";

import {
    type Configuration, change_portion_amount, load_configuration
} from "../../data/save_config";

import {
    check_input, integer_prompt, print_alternatives, print_bold
} from "../menu_global_functions";

import { get_menu_memory, set_menu_memory, oblivion } from "../menu_memory";

import { dietary_prompt } from "./dietary_prompt_menu";

import { configure_ingredients } from "./ingredients_menu";

import { configure_categories } from "./category_menu";

import { configure_kitchenware } from "./kitchenware_menu";

/**
 * A submenu of the main menu, where the user can select
 * what they want to configure.
 */
export function configure(): void {
    // A submenu of the configurations menu where the user
    // can change the portion size.
    function configure_portion(): void {            
        valid_inputs = ["y", "n"];

        print_bold(
            "Current portion amount: " + config.portion_amount.toString()
            );
        user_input = check_input(
            valid_inputs, "Do you wish to change the portion amount? (y/n): "
            );

        if (user_input === "y") {
            const input_int = integer_prompt("Enter new portion amount: ")
            config = change_portion_amount(input_int, config);
            print_bold("\nNew amount registered.\n");
            oblivion();
        } else if (user_input === "n") {
            oblivion();
        } else {
            throw new Error("Invalid user_input has escaped.");
        }
    }

    let config: Configuration = load_configuration();
    let print_menu = ['"p" = portion amount',
                      '"d" = dietary restrictions',
                      '"i" = ingredient data',
                      '"c" = category data',
                      '"k" = kitchenware data',
                      '"b" = back to main menu'];
    let valid_inputs = ["p", "d", "i", "c", "k", "b"];

    print_alternatives(print_menu);
    let user_input = check_input(valid_inputs,
                                 "Choose what you want to configure: ");

    if (user_input === "p") {
        set_menu_memory(push(configure_portion, get_menu_memory()));
    } else if (user_input === "d") {
        set_menu_memory(push(dietary_prompt, get_menu_memory()));
    } else if (user_input === "i") {
        set_menu_memory(push(configure_ingredients, get_menu_memory()));
    } else if (user_input === "c") {
        set_menu_memory(push(configure_categories, get_menu_memory()));
    } else if (user_input === "k") {
        set_menu_memory(push(configure_kitchenware, get_menu_memory()));
    } else if (user_input === "b") {
        oblivion();
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
