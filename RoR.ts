import * as PromptSync from "prompt-sync";

import {
    type Pair
} from "./lib/list";

import {
    is_empty as is_stack_empty, push, top
} from "./lib/stack";

import {
    main_menu
} from "./menu/main_menu";

import {
    print_bold
} from "./menu/menu_global_functions";

import {
    get_menu_memory, set_menu_memory
} from "./menu/menu_memory";
import { load_data, save_data } from "./data/save_load_data";

/**
 * Print the ASCII-art of RoR that is shown on startup and initialize
 * the program by adding the main menu to the top of the menu memory.
 * Also contains the main loop which runs until the menu memory is empty.
 */
export function RoR_start(): void {
    function kill_RoR(): void {
        print_bold("Goodbye :)");
    }

    load_data();
    
    console.log("----------------------------------------");
    console.log("Welcome to Randomizer of Recipes, aka");
    console.log("____       ____   ");
    console.log("|  _ \\ ___ |  _ \\ ");
    console.log("| |_) / _ \\| |_) |");
    console.log("|  _ < (_) |  _ < ");
    console.log("|_| \\_\\___/|_| \\_\\");
    console.log("----------------------------------------\n");
    
    set_menu_memory(push(main_menu, get_menu_memory()));
    while (!is_stack_empty(get_menu_memory())) {
        top(get_menu_memory()!)();
    }

    kill_RoR();
}

// global constants
export const prompt: PromptSync.Prompt = PromptSync({ sigint: true });
export const print_bold_text: boolean = true;
export const portion_size: Pair<number, number> = [400, 700];
export const valid_dietary_restrictions: Array<string> = [
    "meat", "gluten", "dairy", "eggs", "nuts", "fish"
];

if (require.main === module) {
    RoR_start();
};
