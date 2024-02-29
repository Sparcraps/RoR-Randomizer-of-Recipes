"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oblivion = exports.set_menu_memory = exports.get_menu_memory = void 0;
var stack_1 = require("./../lib/stack");
var menu_memory = (0, stack_1.empty)();
function get_menu_memory() {
    return menu_memory;
}
exports.get_menu_memory = get_menu_memory;
function set_menu_memory(stack) {
    menu_memory = stack;
    return menu_memory;
}
exports.set_menu_memory = set_menu_memory;
/**
 *
 * @param repeat
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
