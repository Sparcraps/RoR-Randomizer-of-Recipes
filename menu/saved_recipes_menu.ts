import { type Recipe } from "../recipe/recipe_generation";

import { print_recipe } from "../recipe/printing";

import { delete_recipe, load_recipes } from "../data/save_recipe";

import {
    check_input, integer_prompt, print_alternatives, print_bold,
    wait_for_keypress
} from "./menu_global_functions";

import { oblivion } from "./menu_memory";

/**
 * A submenu of the main menu, responsible for fetching saved recipes so that
 * the user can view and delete them.
 */
export function saved_recipes(): void {
    // Helper function that prints the current saved recipes and lets the user
    // select one of them.
    function choose_recipe(): Recipe {
        print_bold("Your saved recipes:");
        for (let i = 0; i < recipes.length; i++) {
            let current_name: string = recipes[i].name;
            console.log(i + 1, current_name);
        }
        console.log();

        let int: number;
        let true_index: number;

        while (true) {
            int = integer_prompt("Enter the number corresponding to " +
            "the recipe you want to choose: ");
            true_index = int - 1;

            if (!(true_index < 0 || true_index >= recipes.length)) {
                // to ensure no index out of range
                return recipes[true_index];
            } else {
                print_bold("Invalid number entered. Please try again.\n");
            }
        }
    }

    let recipes: Array<Recipe> = load_recipes();
    let print_menu = ['"v" = view saved recipe',
                      '"d" = delete saved recipe',
                      '"b" = back to main menu'];
    let valid_inputs = ["v", "d", "b"];

    print_alternatives(print_menu);
    let user_input = check_input(valid_inputs, "Choose an alternative: ");

    if (user_input === "v") {
        if (recipes.length === 0) {
            print_bold("You have no saved recipes.\n")
        } else {
            const selected_recipe = choose_recipe();
            print_recipe(selected_recipe);
            wait_for_keypress();
        }
    } else if (user_input === "d") {
        if (recipes.length === 0) {
            print_bold("You have no saved recipes.\n")
        } else {
            const selected_recipe = choose_recipe();
            const name = selected_recipe.name;
            recipes = delete_recipe(name);
            print_bold("Recipe " + name + " deleted!\n");
        }
    } else if (user_input === "b") {
        oblivion();
    } else {
        throw new Error("invalid user_input has escaped.");
    }
}
