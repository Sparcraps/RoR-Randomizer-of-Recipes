import {
    push
} from "../lib/stack";

import {
    add_ingredient
} from "./add_ingredient_menu";

import {
    check_input, print_alternatives
} from "./menu_global_functions";

import {
    get_menu_memory, oblivion, set_menu_memory
} from "./menu_memory";

import {
    remove_ingredient
} from "./remove_ingredient_menu";

/**
 * A submenu of the configurations menu, where the user can configure
 * the ingredients used for recipe generation, by adding or removing them.
 */
export function configure_ingredients(): void {
    let valid_inputs = ["a", "r", "b"];
    let print_menu = ['"a" = add ingredient',
                      '"r" = remove ingredient',
                      '"b" = back to configurations menu'];

    print_alternatives(print_menu);
    let user_input = check_input(valid_inputs, "Choose an alternative: ");

    if (user_input === "a") {
        set_menu_memory(push(add_ingredient, get_menu_memory()));
    } else if (user_input === "r") {
        set_menu_memory(push(remove_ingredient, get_menu_memory()));
    } else if (user_input === "b") {
        oblivion();
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
