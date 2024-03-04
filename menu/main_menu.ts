import * as PromptSync from "prompt-sync";

import { 
    push
} from "../lib/stack";

import {
    type Pair
} from "../lib/list";

import {
    get_menu_memory, set_menu_memory, oblivion
} from "./menu_memory";

import {
    print_alternatives, check_input, print_bold
} from "./menu_global_functions";

import {
    recipimize
} from "./recipimize_menu";

import {
    saved_recipes
} from "./saved_recipes_menu";

import {
    configure
} from "./configurations_menu";

/**
 * The main menu of RoR. Gives access to all content of the program
 * by its submenus where the user selects how to advance through
 * printed alternatives.
 */
export function main_menu(): void {
    let user_input: string | null;
    let print_menu: Array<string> = ['"h" = help', '"r" = randomize recipe',
                                     '"s" = saved recipes', '"c" = configure',
                                     '"q" = quit'];
    let valid_inputs: Array<string> = ["h", "r", "q", "s", "c"];
    
    print_alternatives(print_menu);
    user_input = check_input(valid_inputs, "Choose an alternative: ");

    if (user_input === "h") {
        print_help();
    } else if (user_input === "r") {
        set_menu_memory(push(recipimize, get_menu_memory()));
    } else if (user_input === "s") {
        set_menu_memory(push(saved_recipes, get_menu_memory()));
    } else if (user_input === "c") {
        set_menu_memory(push(configure, get_menu_memory()));
    } else if (user_input === "q") {
        oblivion();
    } else {
        throw new Error("Invalid user_input has escaped.");
    }

    // Prints explanations of all alternatives in the main menu
    function print_help(): void {
        print_bold("randomize recipe: ");
        console.log("The main feature of RoR.");
        console.log(
            "Generates a randomized recipe based on the current configurations."
            );
        console.log(
            "The ingredients picked out for the recipe, their quantities " +
            "and cooking methods will all be randomized,"
            );
        console.log("until the requested number of portions has been met.\n");
    
        print_bold("quit: ");
        console.log("Terminates the program session.");
        console.log(
            "All configurations and saved recipes carry over to " +
        "the next time RoR is run.\n"
        );
    
        print_bold("saved recipes: ");
        console.log("View a menu of all previously saved recipes.");
        console.log(
            "The recipes can be selected to have their contents viewed.\n"
        );
    
        print_bold("configure: ");
        console.log("View a menu of recipe generation configurations.");
        console.log(
            "Number of portions, active dietary restrictions " +
            "and ingredient data can be adjusted.\n"
            );
    }
}

// global constants
export const prompt: PromptSync.Prompt = PromptSync({ sigint: true });
export const print_bold_text: boolean = true;
export const portion_size: Pair<number, number> = [400, 700];
export const valid_dietary_restrictions: Array<string> = [
    "meat", "gluten", "dairy", "eggs", "nuts", "fish"
];
