"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait_for_keypress = exports.integer_prompt = exports.check_input = exports.print_bold = exports.print_alternatives = void 0;
var main_menu_1 = require("./main_menu");
/**
 * Helper function that prints the alternatives the user can choose for
 * the different menus.
 * @param alternatives - An Array where each element is a string containing
 * an alternative the user can choose
 */
function print_alternatives(alternatives) {
    if (alternatives.length === 0) { // to not print empty space
        return;
    }
    else {
        for (var i = 0; i < alternatives.length; i++) {
            console.log(alternatives[i]);
        }
    }
}
exports.print_alternatives = print_alternatives;
/**
 * Helper function that prints the input string in bold font if the global
 * constant print_bold_text is set to true, and otherwise prints it as usual.
 * @param print_str - The string that is being printed
 */
function print_bold(print_str) {
    if (main_menu_1.print_bold_text) {
        console.log('\x1b[1m' + print_str + '\x1b[0m');
    }
    else {
        console.log(print_str);
    }
    return;
}
exports.print_bold = print_bold;
/**
 * Helper function that checks if the user input is in a string Array of
 * valid alternatives, and otherwise prompts the user again.
 * @param valid - An Array containing valid alternatives as strings
 * @param question - The question to prompt the user with
 * @returns the valid prompted string, without whitespace
 * and converted to lowercase.
 */
function check_input(valid, question) {
    var user_input = null;
    console.log();
    while (true) {
        user_input = (0, main_menu_1.prompt)(question).trim();
        if (user_input !== null) {
            user_input = user_input.toLowerCase();
            if (valid.includes(user_input)) {
                console.log();
                return user_input;
            }
            else { }
        }
        else { }
        console.log();
        print_bold("Invalid input. Try again");
    }
}
exports.check_input = check_input;
/**
 * Helper function that checks if the input is an integer and if so, returns it.
 * If not, the user is prompted again.
 * @param prompt_text - The string to prompt the user with
 * @returns the valid prompted integer.
 */
function integer_prompt(prompt_text) {
    var input;
    var parsed = NaN;
    while (true) {
        input = (0, main_menu_1.prompt)(prompt_text).trim();
        if (input !== null) {
            parsed = parseInt(input);
            if (!isNaN(parsed)) {
                return parsed;
            }
            else { }
        }
        else { }
        print_bold("Invalid input. Please enter a valid number.");
    }
}
exports.integer_prompt = integer_prompt;
/**
 * Helper function that pauses program until any key is pressed on Windows OS.
 * On other OS, pauses the program until enter is pressed.
 */
function wait_for_keypress() {
    if (process.platform === "win32") {
        var spawnSync = require('node:child_process').spawnSync;
        spawnSync("pause", { shell: true, stdio: [0, 1, 2] });
    }
    else {
        (0, main_menu_1.prompt)("Press enter to continue.");
    }
    console.log();
}
exports.wait_for_keypress = wait_for_keypress;
