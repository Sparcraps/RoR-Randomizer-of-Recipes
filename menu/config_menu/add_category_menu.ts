import { type Category, empty_category } from "../../basics";

import { check_input, print_bold } from "../menu_global_functions";

import { save_new_category } from "../../data/save_load_data";

import { get_menu_memory, oblivion, set_menu_memory } from "../menu_memory";

import { push } from "../../lib/stack";

import {
    edit_category_wrapper, select_cat_max, select_cat_methods, select_cat_name
} from "./category_menu";

/**
 * A submenu of the category menu, where the user adds a new category.
 */
export function add_category(): void {
    let new_cat: Category = empty_category();
    new_cat = select_cat_name(new_cat);
    const temp = select_cat_methods(new_cat);
    if (temp !== undefined) {
        new_cat = temp;
    } else {}
    new_cat = select_cat_max(new_cat);
    save_new_category(new_cat);

    const keys = Object.keys(new_cat);
    const values = Object.values(new_cat);
    print_bold("Data for the new category: ")
    for (let i = 0; i < values.length; i++) {
        console.log(keys[i] + ":", values[i]);
    }

    let valid_inputs = ["y", "n"];
    let user_input = check_input(
        valid_inputs, "Are you happy with the category data? (y/n): "
    );

    if (user_input === "y") {
        oblivion();
    } else if (user_input === "n") {
        const name = new_cat.name;
        oblivion();
        set_menu_memory(push(edit_category_wrapper(new_cat, name),
                             get_menu_memory()));
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
