"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print_bold = exports.wait_for_keypress = exports.integer_prompt = exports.check_input = exports.print_alternatives = void 0;
var input_loop_1 = require("./input_loop");
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
//checks if the user input is valid and otherwise prompts the user again
function check_input(valid, question) {
    var user_input = null;
    console.log();
    while (true) {
        user_input = (0, input_loop_1.prompt)(question).trim();
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
//helper function that checks if input is an integer, and otherwise prompts the user again
function integer_prompt(prompt_text) {
    var input;
    var parsed = NaN;
    while (true) {
        input = (0, input_loop_1.prompt)(prompt_text).trim();
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
//Pauses program until any key is pressed on Windows OS,
//otherwise until enter is pressed.
function wait_for_keypress() {
    if (process.platform === "win32") {
        var spawnSync = require('node:child_process').spawnSync;
        spawnSync("pause", { shell: true, stdio: [0, 1, 2] });
    }
    else {
        (0, input_loop_1.prompt)("Press enter to continue.");
    }
    console.log();
}
exports.wait_for_keypress = wait_for_keypress;
function print_bold(print_str) {
    if (input_loop_1.print_bold_text) {
        console.log('\x1b[1m' + print_str + '\x1b[0m');
    }
    else {
        console.log(print_str);
    }
    return;
}
exports.print_bold = print_bold;
