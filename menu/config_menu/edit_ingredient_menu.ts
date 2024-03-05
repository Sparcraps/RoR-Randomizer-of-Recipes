import { type Ingredient } from "../../basics";

import { replace_ingredient } from "../../data/save_load_data";

import {
    select_allergies, select_category, select_kcal, select_measurement,
    select_name, select_range
} from "./ingredients_menu";

import {
    check_input, print_alternatives, print_bold
} from "../menu_global_functions";

import { oblivion } from "../menu_memory";

/**
 * A subsubmenu of the ingredient menu, where the user can edit existing
 * or newly created ingredient data.
 * @param ingredient - The ingredient that is being 
 * @param old_name - The name that the ingredient had before being edited
 */
export function edit_ingredient(ingredient: Ingredient,
                                old_name: string): void {
    let print_menu = [
        '"n" = change ingredient name',
        '"c" = change ingredient categories',
        '"d" = change ingredient dietary restrictions',
        '"m" = change ingredient measurement',
        '"k" = change ingredient kcal per measurement',
        '"r" = change ingredient amount range',
        '"b" = save ingredient and go back to ingredient menu'
    ];
    let valid_inputs = ["n", "c", "d", "m", "k", "r", "b"];

    print_bold("Ingredient being edited: " + ingredient.name);
    console.log();
    print_alternatives(print_menu);
    let user_input = check_input(
        valid_inputs, "Choose what ingredient data you want to adjust: "
        );

    if (user_input === "n") {
        ingredient = select_name(ingredient, true);
    } else if (user_input === "c") {
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
        replace_ingredient(old_name, ingredient);
        oblivion();
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
