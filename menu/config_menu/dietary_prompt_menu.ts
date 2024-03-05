import {
    push
} from "../../lib/stack";

import {
    Configuration, load_configuration
} from "../../data/save_config";

import {
    configure_dietary
} from "./dietary_restrictions_menu";

import {
    check_input, print_alternatives, print_bold
} from "../menu_global_functions";

import {
    get_menu_memory, oblivion, set_menu_memory
} from "../menu_memory";

/**
 * A submenu of the configurations menu, where the user can view
 * the active dietary restrictions and choose whether they
 * want to change them or not.
 */
export function dietary_prompt(): void {
    let config: Configuration = load_configuration();
    let valid_inputs = ["y", "n"];

    print_bold("Active dietary restrictions: ");
    print_alternatives(config.dietary_restrictions);
    let user_input = check_input(
        valid_inputs,
        "Do you wish to change the active dietary restrictions? (y/n): "
        );

    if (user_input === "y") {
        set_menu_memory(push(configure_dietary, get_menu_memory()));
    } else if (user_input === "n") {
        oblivion();
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
