import {
    prompt
} from "../RoR";

import {
    type Ingredient
} from "../basics";

import {
    SaveData, delete_ingredient, load_data
} from "../data/save_load_data";

import {
    push
} from "../lib/stack";

import {
    add_ingredient
} from "./add_ingredient_menu";

import {
    edit_ingredient
} from "./edit_ingredient_menu";

import {
    check_input, print_alternatives, print_bold
} from "./menu_global_functions";

import {
    get_menu_memory, oblivion, set_menu_memory
} from "./menu_memory";

/**
 * A submenu of the configurations menu, where the user can configure
 * the ingredients used for recipe generation, by adding or removing them.
 */
export function configure_ingredients(): void {
    // Helper function that prints the name of all 
    // currently registered ingredients.
    function print_all_ingredients(): void {
        const ingr = data.ingredients;

        print_bold("Currently registered ingredients: ")
        for (let i = 0; i < ingr.length; i++) {
            for (let j = 0; j < ingr[i].length; j++) {
                console.log("- " + ingr[i][j].name);
            }
        }
        console.log();
    }

    // Helper function that prompts the user for an ingredient name,
    // searches for it in the data and removes it from the data if found.
    function search_and_delete(): void {
        let input = prompt(
            "Enter search string, or press enter to go back without removing " +
            "an ingredient: "
            ).trim().toLowerCase();
        if (input !== "") {
            try {
                data = delete_ingredient(input);
                print_bold("\nIngredient removed from data!");
            } catch (error) {
                console.log();
                console.error(error.message);
            }
        } else {}
        console.log();
    }

    function find_ingredient(): Ingredient | undefined {
        let input = prompt(
            "Enter the name of the ingredient you wish to edit, or press " +
            "enter to go back without removing an ingredient: "
            ).trim().toLowerCase();
            if (input !== "") {
                for (let i = 0; i < data.ingredients.length; i++) {
                    for (let j = 0; j < data.ingredients[i].length; j++) {
                        if (data.ingredients[i][j].name === input) {
                            console.log();
                            return data.ingredients[i][j];
                        }
                    }
                }
            } else {}
            console.log();
        }
    
    // Inside this function, you can access the ingredient parameter
    // and call edit_ingredient with the correct value
    function edit_ingredient_wrapper(ingredient: Ingredient): Function {
        return function() {
            edit_ingredient(ingredient);
        };
    }

    let data: SaveData = load_data();
    let valid_inputs = ["a", "e", "r", "l", "b"];
    let print_menu = ['"a" = add ingredient',
                      '"e" = edit existing ingredient',
                      '"r" = remove ingredient',
                      '"l" = display a list of all existing ingredients',
                      '"b" = back to configurations menu'];

    print_alternatives(print_menu);
    let user_input = check_input(valid_inputs, "Choose an alternative: ");

    if (user_input === "a") {
        set_menu_memory(push(add_ingredient, get_menu_memory()));
    } else if (user_input === "e") {
        const ingredient = find_ingredient();
        if (ingredient !== undefined) {
            set_menu_memory(push(edit_ingredient_wrapper(ingredient),
                                 get_menu_memory()));
        } else {
            print_bold("There is no ingredient with that name!");
            console.log();
        }
    } else if (user_input === "r") {
        search_and_delete();
    } else if (user_input === "l") {
        print_all_ingredients();
    } else if (user_input === "b") {
        oblivion();
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
