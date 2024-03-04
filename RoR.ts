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

/**
 * Print the ASCII-art of RoR that is shown on startup and initialize
 * the program by adding the main menu to the top of the menu memory.
 * Also contains the main loop which runs until the menu memory is empty.
 */
export function RoR_start(): void {
    function kill_RoR(): void {
        print_bold("Goodbye :)");
    }
    
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

if (require.main === module) {
    RoR_start();
}
