"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print_bold = exports.wait_for_keypress = exports.integer_prompt = exports.check_input = exports.oblivion = exports.print_alternatives = void 0;
var input_loop_1 = require("./input_loop");
var stack_1 = require("../lib/stack");
var menu_memory_1 = require("./menu_memory");
//prints the menu alternatives
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
//removes the last menu function from memory
function oblivion(repeat) {
    if (repeat === void 0) { repeat = 1; }
    var menu_memory = (0, menu_memory_1.get_menu_memory)();
    for (repeat; repeat > 0; repeat--) {
        if (!(0, stack_1.is_empty)(menu_memory)) {
            menu_memory = (0, stack_1.pop)(menu_memory);
        }
        else {
            throw new Error("Error removing function from memory stack");
        }
    }
    (0, menu_memory_1.set_menu_memory)(menu_memory);
}
exports.oblivion = oblivion;
//checks if the user input is valid and otherwise prompts the user again
function check_input(valid, question) {
    console.log();
    var user_input = (0, input_loop_1.prompt)(question).trim();
    if (user_input !== null) {
        user_input = user_input.toLowerCase();
    }
    else { }
    console.log();
    while (!valid.includes(user_input)) {
        print_bold("Invalid input. Try again");
        user_input = (0, input_loop_1.prompt)(question).trim();
        if (user_input !== null) {
            user_input = user_input.toLowerCase();
        }
        else { }
        console.log();
    }
    return user_input;
}
exports.check_input = check_input;
//helper function that checks if input is an integer, and otherwise prompts the user again
function integer_prompt(prompt_text) {
    var new_portion_amount = (0, input_loop_1.prompt)(prompt_text).trim();
    var parsed = parseInt(new_portion_amount);
    while (isNaN(parsed)) {
        console.log("Invalid input. Please enter a valid number.");
        new_portion_amount = (0, input_loop_1.prompt)(prompt_text).trim();
        parsed = parseInt(new_portion_amount);
    }
    return parsed;
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
