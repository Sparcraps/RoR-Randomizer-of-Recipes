"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portion_size = exports.print_bold_text = exports.prompt = exports.RoR_start = void 0;
var PromptSync = require("prompt-sync");
var stack_1 = require("./lib/stack");
var main_menu_1 = require("./menu/main_menu");
var menu_global_functions_1 = require("./menu/menu_global_functions");
var menu_memory_1 = require("./menu/menu_memory");
var save_load_data_1 = require("./data/save_load_data");
/**
 * Print the ASCII-art of RoR that is shown on startup and initialize
 * the program by adding the main menu to the top of the menu memory.
 * Also contains the main loop which runs until the menu memory is empty.
 */
function RoR_start() {
    function kill_RoR() {
        (0, menu_global_functions_1.print_bold)("Goodbye :)");
    }
    (0, save_load_data_1.load_data)();
    console.log("----------------------------------------");
    console.log("Welcome to Randomizer of Recipes, aka");
    console.log("____       ____   ");
    console.log("|  _ \\ ___ |  _ \\ ");
    console.log("| |_) / _ \\| |_) |");
    console.log("|  _ < (_) |  _ < ");
    console.log("|_| \\_\\___/|_| \\_\\");
    console.log("----------------------------------------\n");
    (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(main_menu_1.main_menu, (0, menu_memory_1.get_menu_memory)()));
    while (!(0, stack_1.is_empty)((0, menu_memory_1.get_menu_memory)())) {
        (0, stack_1.top)((0, menu_memory_1.get_menu_memory)())();
    }
    kill_RoR();
}
exports.RoR_start = RoR_start;
// global constants
exports.prompt = PromptSync({ sigint: true });
exports.print_bold_text = true;
exports.portion_size = [400, 700];
if (require.main === module) {
    RoR_start();
}
;
