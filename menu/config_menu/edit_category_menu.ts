import { type Category } from "../../basics";

import { replace_category } from "../../data/save_load_data";

import {
    select_cat_name, select_cat_methods, select_cat_max
} from "./category_menu";

import {
    check_input, print_alternatives, print_bold
} from "../menu_global_functions";

import { oblivion } from "../menu_memory";

/**
 * A subsubmenu of the category menu, where the user can edit existing
 * or newly created category data.
 * @param category - The Category that is being adjusted
 */
export function edit_category(cat: Category, old_name: string): void {
    let print_menu = [
        '"n" = change category name',
        '"c" = change category cooking methods',
        '"m" = change category max ingredient amount',
        '"b" = save category and go back to category menu'
    ];
    let valid_inputs = ["n", "c", "m", "b"];

    print_bold("Category being edited: " + cat.name);
    console.log();
    print_alternatives(print_menu);
    let user_input = check_input(
        valid_inputs, "Choose what category data you want to adjust: "
        );

    if (user_input === "n") {
        cat = select_cat_name(cat, true);
    } else if (user_input === "c") {
        const temp = select_cat_methods(cat, true);
        if (temp !== undefined) {
            cat = temp;
        } else {}
    } else if (user_input === "m") {
        cat = select_cat_max(cat, true);
    } else if (user_input === "b") {
        replace_category(old_name, cat);
        oblivion();
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
