import { type KitchenWare } from "../../basics";

import { replace_kitchenware } from "../../data/save_load_data";

import { select_kit_name, select_kit_methods } from "./kitchenware_menu";

import {
    check_input, print_alternatives, print_bold
} from "../menu_global_functions";

import { oblivion } from "../menu_memory";

/**
 * A subsubmenu of the kitchenware menu, where the user can edit existing
 * or newly created kitchenware data.
 * @param kit - The kitchenware that is being adjusted
 * @param old_name - The name that the kitchenware had before being edited
 */
export function edit_kitchenware(kit: KitchenWare, old_name: string): void {
    let print_menu = [
        '"n" = change kitchenware name',
        '"c" = change kitchenware cooking methods',
        '"b" = save kitchenware and go back to kitchenware menu'
    ];
    let valid_inputs = ["n", "c", "b"];

    print_bold("kitchenware being edited: " + kit.name);
    console.log();
    print_alternatives(print_menu);
    let user_input = check_input(
        valid_inputs, "Choose what kitchenware data you want to adjust: "
        );

    if (user_input === "n") {
        kit = select_kit_name(kit, true);
    } else if (user_input === "c") {
        const temp = select_kit_methods(kit, true);
        if (temp !== undefined) {
            kit = temp;
        } else {}
    } else if (user_input === "b") {
        replace_kitchenware(old_name, kit);
        oblivion();
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
