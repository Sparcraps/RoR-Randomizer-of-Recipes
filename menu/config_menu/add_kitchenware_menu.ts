import { type KitchenWare, empty_kitchenware } from "../../basics";

import { check_input, print_bold } from "../menu_global_functions";

import { save_new_kitchenware } from "../../data/save_load_data";

import { get_menu_memory, oblivion, set_menu_memory } from "../menu_memory";

import { push } from "../../lib/stack";

import { edit_kitchenware_wrapper, select_kit_methods, select_kit_name } from "./kitchenware_menu";

/**
 * A submenu of the kitchenware menu, where the user adds a new kitchenware.
 */
export function add_kitchenware(): void {
    let new_kit: KitchenWare = empty_kitchenware();
    new_kit = select_kit_name(new_kit);
    const temp = select_kit_methods(new_kit);
    if (temp !== undefined) {
        new_kit = temp;
    } else {}
    save_new_kitchenware(new_kit);

    const keys = Object.keys(new_kit);
    const values = Object.values(new_kit);
    print_bold("Data for the new kitchenware: ")
    for (let i = 0; i < values.length; i++) {
        console.log(keys[i] + ":", values[i]);
    }

    let valid_inputs = ["y", "n"];
    let user_input = check_input(
        valid_inputs, "Are you happy with the kitchenware data? (y/n): "
    );

    if (user_input === "y") {
        oblivion();
    } else if (user_input === "n") {
        const name = new_kit.name;
        oblivion();
        set_menu_memory(push(edit_kitchenware_wrapper(new_kit, name),
                             get_menu_memory()));
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
