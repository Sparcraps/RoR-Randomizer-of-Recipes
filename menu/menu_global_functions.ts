import {
    prompt, print_bold_text
} from "./input_loop";

import {
    type Stack, is_empty as is_stack_empty, push, pop
} from "../lib/stack";

import {
    set_menu_memory, get_menu_memory
} from "./menu_memory";

//prints the menu alternatives
export function print_alternatives(alternatives: Array<string>): void {
    if (alternatives.length === 0) { // to not print empty space
        return;
    } else {
        for (let i = 0; i < alternatives.length; i++) {
            console.log(alternatives[i]);
        }
    }
}

//removes the last menu function from memory
export function oblivion(repeat: number = 1): undefined {
    let menu_memory = get_menu_memory();

    for (repeat; repeat > 0; repeat--) {
        if (!is_stack_empty(menu_memory)) {
            menu_memory = pop(menu_memory);
        } else {
            throw new Error("Error removing function from memory stack");
        }
    }

    set_menu_memory(menu_memory);
}

//checks if the user input is valid and otherwise prompts the user again
export function check_input(valid: Array<string>, question: string): string {
    console.log();
    let user_input: string | null = prompt(question).trim();
    if (user_input !== null) {
        user_input = user_input.toLowerCase();
    } else {}
    console.log();

    while (!valid.includes(user_input)) {
        print_bold("Invalid input. Try again");
        user_input = prompt(question).trim();
        if (user_input !== null) {
            user_input = user_input.toLowerCase();
        } else {}
        console.log();
    }
    return user_input;
}

//helper function that checks if input is an integer, and otherwise prompts the user again
export function integer_prompt(prompt_text: string): number {
    let new_portion_amount: string | null = prompt(prompt_text).trim();
    let parsed: number = parseInt(new_portion_amount);

    while (isNaN(parsed)) {
        console.log("Invalid input. Please enter a valid number.");
        new_portion_amount = prompt(prompt_text).trim();
        parsed = parseInt(new_portion_amount);
    }
    return parsed;
}

 //Pauses program until any key is pressed on Windows OS,
 //otherwise until enter is pressed.
 export function wait_for_keypress(): void {
    if (process.platform === "win32") {
        const { spawnSync } = require('node:child_process');
        spawnSync("pause", {shell: true, stdio: [0, 1, 2]}); 
    } else {
        prompt("Press enter to continue.");
    }
    console.log();
}

export function print_bold(print_str: string): void {
    if (print_bold_text) {
        console.log('\x1b[1m' + print_str + '\x1b[0m');
    } else {
        console.log(print_str);
    }
    return;
}
