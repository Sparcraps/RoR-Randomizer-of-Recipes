import {
    Recipe, generate_recipe, print_recipe
} from "../RoR";

import {
    push
} from "../lib/stack";

import {
    Configuration, load_configuration
} from "../save_config";

import {
    load_recipes, save_new_recipe
} from "../save_recipe";

import {
    portion_size
} from "./main_menu";

import {
    check_input, print_alternatives, wait_for_keypress
} from "./menu_global_functions";

import {
    get_menu_memory, set_menu_memory, oblivion
} from "./menu_memory";

/**
 * The submenu of main menu, responsible for recipe generation.
 */
export function recipimize(): void {
    //in case a generated recipe is saved, the menu alternatives need to be adjusted
    function recipimize_saved(): void {
        print_menu = ['"r" = randomize new recipe', '"b" = back to main menu'];
        valid_inputs = ["r", "b"];

        print_alternatives(print_menu);
        let user_input = check_input(valid_inputs, "Choose an alternative: ");

        if (user_input === "r") {
            oblivion();
            set_menu_memory(push(recipimize, get_menu_memory()));
        } else if (user_input === "b") {
            oblivion();
        }
    }
    
    let config: Configuration = load_configuration();
    let recipes: Array<Recipe> = load_recipes();
    const portion_amount: number = config.portion_amount;
    const restrictions: Array<string> = config.dietary_restrictions;

    let print_menu = ['"r" = randomize new recipe',
                      '"s" = save recipe',
                      '"b" = back to main menu'];
    let valid_inputs = ["r", "s", "b"];

    const recipe: Recipe = generate_recipe(portion_size,
                                           portion_amount,
                                           restrictions);
    print_recipe(recipe);
    wait_for_keypress();

    print_alternatives(print_menu);
    let user_input = check_input(valid_inputs, "Choose an alternative: ");
    
    if (user_input === "r") {
        return;
    } else if (user_input === "s") {
        recipes = save_new_recipe(recipe);
        console.log("Recipe " + recipe.name + " saved!\n");
        oblivion();
        set_menu_memory(push(recipimize_saved, get_menu_memory()));
    } else if (user_input === "b") {
        oblivion();
    }
}