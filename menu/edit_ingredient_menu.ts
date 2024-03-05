import {
    Ingredient
} from "../basics";

import {
    replace_ingredient
} from "../data/save_load_data";

import {
    select_allergies, select_category, select_kcal, select_measurement,
    select_range
} from "./add_ingredient_menu";

import {
    check_input, print_alternatives, print_bold
} from "./menu_global_functions";

import {
    oblivion
} from "./menu_memory";

/**
 * A subsubmenu of the ingredients menu, where the user can edit existing
 * or newly created ingredient data.
 * @param ingredient - The ingredient that is being 
 */
export function edit_ingredient(ingredient: Ingredient): void {
    let print_menu = [
        '"c" = change ingredient categories',
        '"d" = change ingredient dietary restrictions',
        '"m" = change ingredient measurement',
        '"k" = change ingredient kcal per measurement',
        '"r" = change ingredient amount range',
        '"b" = save ingredient and go back to ingredient menu'
    ];
    let valid_inputs = ["c", "d", "m", "k", "r", "b"];

    print_bold("Ingredient being edited: " + ingredient.name);
    console.log();
    print_alternatives(print_menu);
    let user_input = check_input(
        valid_inputs, "Choose what ingredient data you want to adjust: "
        );

    if (user_input === "c") {
        ingredient = select_category(ingredient, true);
    } else if (user_input === "d") {
        ingredient = select_allergies(ingredient, true);
    } else if (user_input === "m") {
        ingredient = select_measurement(ingredient, true);
    }  else if (user_input === "k") {
        ingredient = select_kcal(ingredient, true);
    } else if (user_input === "r") {
        ingredient = select_range(ingredient, true);
    } else if (user_input === "b") {
        replace_ingredient(ingredient);
        oblivion();
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
