import { type Ingredient, empty_ingredient } from "../../basics";

import { check_input, print_bold } from "../menu_global_functions";

import { save_new_ingredient } from "../../data/save_load_data";

import { get_menu_memory, oblivion, set_menu_memory } from "../menu_memory";

import { push } from "../../lib/stack";

import {
    edit_ingredient_wrapper, select_allergies, select_category,
    select_kcal, select_measurement, select_name, select_range
} from "./ingredients_menu";

/**
 * A submenu of the ingredients menu, where the user adds a new ingredient.
 */
export function add_ingredient(): void {
    let new_ingredient: Ingredient = empty_ingredient();
    new_ingredient = select_name(new_ingredient);
    new_ingredient = select_category(new_ingredient);
    new_ingredient = select_allergies(new_ingredient);
    new_ingredient = select_measurement(new_ingredient);
    new_ingredient = select_kcal(new_ingredient);
    new_ingredient = select_range(new_ingredient);
    save_new_ingredient(new_ingredient);

    const keys = Object.keys(new_ingredient);
    const values = Object.values(new_ingredient);
    print_bold("Data for the new ingredient: ")
    for (let i = 0; i < values.length; i++) {
        console.log(keys[i] + ":", values[i]);
    }

    let valid_inputs = ["y", "n"];
    let user_input = check_input(
        valid_inputs, "Are you happy with the ingredient data? (y/n): "
    );

    if (user_input === "y") {
        oblivion();
    } else if (user_input === "n") {
        const name = new_ingredient.name;
        oblivion();
        set_menu_memory(push(edit_ingredient_wrapper(new_ingredient, name),
                                 get_menu_memory()));
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
