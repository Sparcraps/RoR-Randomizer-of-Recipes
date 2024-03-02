import {
    SaveData, delete_ingredient, load_data
} from "../data/save_load_data";

import {
    check_input, print_alternatives, print_bold
} from "./menu_global_functions";

import {
    oblivion
} from "./menu_memory";

import {
    prompt
} from "./main_menu";

/**
 * A submenu of the ingredients menu, where the user can remove
 * an existing ingredient.
 */
export function remove_ingredient(): void {
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

    let data: SaveData = load_data();
    let print_menu = [
        '"s" = search for ingredient by name',
        '"l" = display a list of existing ingredients before searching ' +
        'for ingredient by name',
        '"b" = back to ingredient menu'];
    let valid_inputs = ["s", "l", "b"];
    
    print_alternatives(print_menu);
    let user_input = check_input(valid_inputs, "Choose an alternative: ");

    if (user_input === "s") {
        search_and_delete();
    } else if (user_input === "l") {
        print_all_ingredients();
        search_and_delete();
    } else if (user_input === "b") {
        oblivion();
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
