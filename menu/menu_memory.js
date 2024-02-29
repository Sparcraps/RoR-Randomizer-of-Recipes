"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oblivion = exports.set_menu_memory = exports.get_menu_memory = void 0;
var stack_1 = require("./../lib/stack");
/**
 * Basic function that fetches the current state of the menu memory.
 * @returns the menu memory.
 */
function get_menu_memory() {
    return menu_memory;
}
exports.get_menu_memory = get_menu_memory;
/**
 * Basic function that updates the current state of the menu memory
 * and returns it.
 * @param new_memory - The new menu memory that the old should be updated to
 * @returns the updated menu memory.
 */
function set_menu_memory(new_memory) {
    menu_memory = new_memory;
    return menu_memory;
}
exports.set_menu_memory = set_menu_memory;
/**
 * Backs the user out in the menu by removing the top of the memory stack and
 * updating the current memory state.
 * @param repeat - The amount of times to go back in the menu
 * @modifies the menu memory by removing the top element of it
 * repeat amount of times.
 */
function oblivion(repeat) {
    if (repeat === void 0) { repeat = 1; }
    for (repeat; repeat > 0; repeat--) {
        if (!(0, stack_1.is_empty)(menu_memory)) {
            menu_memory = (0, stack_1.pop)(menu_memory);
        }
        else {
            throw new Error("Error removing function from memory stack");
        }
    }
    set_menu_memory(menu_memory);
}
exports.oblivion = oblivion;
// The menu memory is a stack of functions, where the top of the stack
// is the function referring to the submenu that the user is currently in
var menu_memory = (0, stack_1.empty)();
