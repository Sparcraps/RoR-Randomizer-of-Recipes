import {
    prompt, print_bold_text
} from "./main_menu";

/**
 * Helper function that prints the alternatives the user can choose for
 * the different menus.
 * @param alternatives - An Array where each element is a string containing
 * an alternative the user can choose
 */
export function print_alternatives(alternatives: Array<string>): void {
    if (alternatives.length === 0) { // to not print empty space
        return;
    } else {
        for (let i = 0; i < alternatives.length; i++) {
            console.log(alternatives[i]);
        }
    }
}

/**
 * Helper function that prints the input string in bold font if the global
 * constant print_bold_text is set to true, and otherwise prints it as usual.
 * @param print_str - The string that is being printed
 */
export function print_bold(print_str: string): void {
    if (print_bold_text) {
        console.log('\x1b[1m' + print_str + '\x1b[0m');
    } else {
        console.log(print_str);
    }
    return;
}

/**
 * Helper function that checks if the user input is in a string Array of
 * valid alternatives, and otherwise prompts the user again.
 * @param valid - An Array containing valid alternatives as strings
 * @param question - The question to prompt the user with
 * @returns the valid prompted string, without whitespace
 * and converted to lowercase.
 */
export function check_input(valid: Array<string>, question: string): string {
    let user_input: string | null = null;
    console.log();

    while (true) {
        user_input = prompt(question).trim();

        if (user_input !== null) {
            user_input = user_input.toLowerCase();
            if (valid.includes(user_input)) {
                console.log();
                return user_input;
            } else {}
        } else {}
        console.log();
        print_bold("Invalid input. Try again");
    }
}

/**
 * Helper function that checks if the input is an integer and if so, returns it.
 * If not, the user is prompted again.
 * @param prompt_text - The string to prompt the user with
 * @returns the valid prompted integer.
 */
export function integer_prompt(prompt_text: string): number {
    let input: string | null;
    let parsed: number = NaN;

    while (true) {
        input = prompt(prompt_text).trim();

        if (input !== null) {
            parsed = parseInt(input);
            if (!isNaN(parsed)) {
                return parsed;
            } else {}
        } else {}

        print_bold("Invalid input. Please enter a valid number.");
    }
}

/**
 * Helper function that pauses program until any key is pressed on Windows OS.
 * On other OS, pauses the program until enter is pressed.
 */
 export function wait_for_keypress(): void {
    if (process.platform === "win32") {
        const { spawnSync } = require('node:child_process');
        spawnSync("pause", {shell: true, stdio: [0, 1, 2]}); 
    } else {
        prompt("Press enter to continue.");
    }
    console.log();
}
