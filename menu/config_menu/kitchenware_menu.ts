import { prompt } from "../../RoR";

import { type KitchenWare, find_by_name } from "../../basics";

import {
    type SaveData, get_data, delete_kitchenware
} from "../../data/save_load_data";

import { push } from "../../lib/stack";

import {
    check_input, print_alternatives, print_bold
} from "../menu_global_functions";

import { get_menu_memory, oblivion, set_menu_memory } from "../menu_memory";
import { add_kitchenware } from "./add_kitchenware_menu";

/**
 * A submenu of the configuration menu, where the user can configure
 * the kitchenware used for recipe generation, by adding, editing or removing
 * them.
 */
export function configure_kitchenware(): void {
    // Helper function that prompts the user for a kitchenware name,
    // searches for it in the data and removes it from the data if found.
    function search_and_delete(): void {
        let input = prompt(
            "Enter the name of the kitchenware you wish to edit, or press " +
            "enter to go back without removing a kitchenware: "
            ).trim().toLowerCase();
        if (input !== "") {
            try {
                delete_kitchenware(input);
                print_bold("\nKitchenware removed from data!");
            } catch (error) {
                console.log();
                console.error(error.message);
            }
        } else {}
        console.log();
    }

    // Helper function that returns kitchenware object by name
    function find_kitchenware(): KitchenWare | undefined {
        let data: SaveData = get_data();
        let input = prompt(
            "Enter the name of the kitchenware you wish to edit: "
            ).trim().toLowerCase();
            if (input !== "") {
                let index = find_by_name(input, data.kitchenware)
                if (index !== -1) {
                    console.log();
                    return data.kitchenware[index];
                } else {}
        }
    }

    let valid_inputs = ["a", "e", "r", "l", "b"];
    let print_menu = ['"a" = add kitchenware',
                      '"e" = edit existing kitchenware',
                      '"r" = remove kitchenware',
                      '"l" = display a list of all existing kitchenware',
                      '"b" = back to configurations menu'];

    print_alternatives(print_menu);
    let user_input = check_input(valid_inputs, "Choose an alternative: ");

    if (user_input === "a") {
        set_menu_memory(push(add_kitchenware, get_menu_memory()));
    } else if (user_input === "e") {
        const kit = find_kitchenware();
        if (kit !== undefined) {
            const name = kit.name;
            set_menu_memory(push(edit_kitchenware_wrapper(kit, name),
                                 get_menu_memory()));
        } else {
            print_bold("There is no kitchenware with that name!");
            console.log();
        }
    } else if (user_input === "r") {
        search_and_delete();
    } else if (user_input === "l") {
        print_all_kitchenware("Currently registered kitchenware: ");
    } else if (user_input === "b") {
        oblivion();
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}

// Helper function that prints the name of all currently registered kitchenware.
export function print_all_kitchenware(bold_print_string: string): Array<string> {
    let data: SaveData = get_data();
    const kitchenware_names: Array<string> = [];
    const kits: Array<KitchenWare> = data.kitchenware;

    print_bold(bold_print_string);
    for (let i = 0; i < kits.length; i++) {
        kitchenware_names[i] = kits[i].name;
    }
    print_alternatives(kitchenware_names);
    console.log();
    return kitchenware_names;
}

/**
 * Helper function that prompts the user to select a name for a kitchenware.
 * @param cat - The kitchenware to select name for
 * @returns the updated kitchenware.
 */
export function select_kit_name(kit: KitchenWare,
                                is_editing: boolean = false): KitchenWare {
    // helper function used to avoid duplicate kitchenware names
    function is_name_taken(kitchenware_name: string): boolean {
        let data: SaveData = get_data();
        const index = find_by_name(kitchenware_name, data.kitchenware);

        if (is_editing) {
            return !(index === -1 || name === kit.name);
        } else {
            return index !== -1;
        }
    }

    if (is_editing) {
        print_bold("Current kitchenware name: " + kit.name);
        console.log();
    } else {}

    let name = prompt("Enter new kitchenware name: ").trim().toLowerCase();
    var name_taken = is_name_taken(name);
    console.log();

    while (name === "" || name_taken) {
        print_bold(
            "Kitchenware name cannot be empty, only contain whitespace or " + 
            "is already taken by another kitchenware."
            );
        name = prompt("Enter new kitchenware name: ").trim().toLowerCase();
        name_taken = is_name_taken(name);
    }

    kit.name = name;
    if (is_editing) {
        print_bold("Kitchenware name updated!");
        console.log();
    } else {}
    return kit;
}

/**
* Helper function that prompts the user to select the applicable cooking methods
* for a kitchenware.
* @param kit - The kitchenware to select cooking methods for
* @param is_editing - Determines whether the current cooking methods should be
* printed before prompting the user or not (false by default)
* @returns the updated kitchenware.
*/
export function select_kit_methods(
    kit: KitchenWare, is_editing: boolean = false
): KitchenWare | undefined {
    let data: SaveData = get_data();
    if (is_editing) {
        print_bold("Current kitchenware cooking methods: " +
                   kit.cooking_methods);
        console.log();
    } else {}
    
    const method_array: Array<string> = [];

    let user_input = prompt(
        "Enter a cooking method that the kitchenware can do, " + 
        "or press enter to proceed: "
    );

    while (user_input !== "") {
        let is_already_added = method_array.includes(user_input);
        if (is_already_added) {
            print_bold("Cooking method not added; it has already been added " +
            "to the kitchenware");
            console.log();
        } else {
            method_array.push(user_input);
            console.log();
        }

        user_input = prompt(
            "Enter a cooking method that the kitchenware can do, " + 
            "or press enter to proceed: "
        );
    }

    kit.cooking_methods = method_array;
    if (is_editing) {
        print_bold("Kitchenware cooking methods updated!");
        console.log();
    } else {}
    return kit;
}

/**
 * Wrap the edit_kitchenware function so that it's parameters are snapshotted 
 * and can be added to the stack.
 * @param kitchenware - Kitchenware that is being edited
 * @param old_name - The name of the kitchenware before it gets edited
 * @returns the function edit_kitchenware with fixated parameters.
 */
export function edit_kitchenware_wrapper(kitchenware: KitchenWare,
                                      old_name: string): Function {
    return function() {
        edit_kitchenware(kitchenware, old_name);
    };
}
