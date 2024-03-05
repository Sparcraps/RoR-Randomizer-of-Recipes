"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit_kitchenware_wrapper = exports.select_kit_methods = exports.select_kit_name = exports.configure_kitchenware = void 0;
var RoR_1 = require("../../RoR");
var basics_1 = require("../../basics");
var save_load_data_1 = require("../../data/save_load_data");
var stack_1 = require("../../lib/stack");
var menu_global_functions_1 = require("../menu_global_functions");
var menu_memory_1 = require("../menu_memory");
var add_kitchenware_menu_1 = require("./add_kitchenware_menu");
var edit_kitchenware_menu_1 = require("./edit_kitchenware_menu");
/**
 * A submenu of the configuration menu, where the user can configure
 * the kitchenware used for recipe generation, by adding, editing or removing
 * them.
 */
function configure_kitchenware() {
    // Helper function that prompts the user for a kitchenware name,
    // searches for it in the data and removes it from the data if found.
    function search_and_delete() {
        var input = (0, RoR_1.prompt)("Enter the name of the kitchenware you wish to edit, or press " +
            "enter to go back without removing a kitchenware: ").trim().toLowerCase();
        if (input !== "") {
            try {
                (0, save_load_data_1.delete_kitchenware)(input);
                (0, menu_global_functions_1.print_bold)("\nKitchenware removed from data!");
            }
            catch (error) {
                console.log();
                console.error(error.message);
            }
        }
        else { }
        console.log();
    }
    // Helper function that returns a kitchenware object by name
    function find_kitchenware() {
        var data = (0, save_load_data_1.get_data)();
        var input = (0, RoR_1.prompt)("Enter the name of the kitchenware you wish to edit: ").trim().toLowerCase();
        if (input !== "") {
            var index = (0, basics_1.find_by_name)(input, data.kitchenware);
            if (index !== -1) {
                console.log();
                return data.kitchenware[index];
            }
            else { }
        }
    }
    // Helper function that prints the name of all
    // currently registered kitchenware.
    function print_all_kitchenware(bold_print_string) {
        var data = (0, save_load_data_1.get_data)();
        var kitchenware_names = [];
        var kits = data.kitchenware;
        (0, menu_global_functions_1.print_bold)(bold_print_string);
        for (var i = 0; i < kits.length; i++) {
            kitchenware_names[i] = kits[i].name;
            console.log("- " + kits[i].name);
        }
        console.log();
        return kitchenware_names;
    }
    var valid_inputs = ["a", "e", "r", "l", "b"];
    var print_menu = ['"a" = add kitchenware',
        '"e" = edit existing kitchenware',
        '"r" = remove kitchenware',
        '"l" = display a list of all existing kitchenware',
        '"b" = back to configurations menu'];
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
    if (user_input === "a") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(add_kitchenware_menu_1.add_kitchenware, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "e") {
        var kit = find_kitchenware();
        if (kit !== undefined) {
            var name_1 = kit.name;
            (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(edit_kitchenware_wrapper(kit, name_1), (0, menu_memory_1.get_menu_memory)()));
        }
        else {
            (0, menu_global_functions_1.print_bold)("There is no kitchenware with that name!");
            console.log();
        }
    }
    else if (user_input === "r") {
        search_and_delete();
    }
    else if (user_input === "l") {
        print_all_kitchenware("Currently registered kitchenware: ");
    }
    else if (user_input === "b") {
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.configure_kitchenware = configure_kitchenware;
/**
 * Helper function that prompts the user to select a name for a kitchenware.
 * @param kit - The kitchenware to select name for
 * @param is_editing - Determines whether the current name should be
 * printed before prompting the user or not (false by default)
 * @returns the updated kitchenware.
 */
function select_kit_name(kit, is_editing) {
    if (is_editing === void 0) { is_editing = false; }
    // helper function used to avoid duplicate kitchenware names
    function is_name_taken(kitchenware_name) {
        var data = (0, save_load_data_1.get_data)();
        var index = (0, basics_1.find_by_name)(kitchenware_name, data.kitchenware);
        if (is_editing) {
            return !(index === -1 || name === kit.name);
        }
        else {
            return index !== -1;
        }
    }
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Current kitchenware name: " + kit.name);
        console.log();
    }
    else { }
    var name = (0, RoR_1.prompt)("Enter new kitchenware name: ").trim().toLowerCase();
    var name_taken = is_name_taken(name);
    console.log();
    while (name === "" || name_taken) {
        (0, menu_global_functions_1.print_bold)("Kitchenware name cannot be empty, only contain whitespace or " +
            "is already taken by another kitchenware.");
        name = (0, RoR_1.prompt)("Enter new kitchenware name: ").trim().toLowerCase();
        name_taken = is_name_taken(name);
    }
    kit.name = name;
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Kitchenware name updated!");
        console.log();
    }
    else { }
    return kit;
}
exports.select_kit_name = select_kit_name;
/**
* Helper function that prompts the user to select what cooking methods
* a kitchenware can do.
* @param kit - The kitchenware to select cooking methods for
* @param is_editing - Determines whether the current cooking methods should be
* printed before prompting the user or not (false by default)
* @returns the updated kitchenware.
*/
function select_kit_methods(kit, is_editing) {
    if (is_editing === void 0) { is_editing = false; }
    var data = (0, save_load_data_1.get_data)();
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Current kitchenware cooking methods: " +
            kit.cooking_methods);
        console.log();
    }
    else { }
    var method_array = [];
    var user_input = (0, RoR_1.prompt)("Enter a cooking method that the kitchenware can do, " +
        "or press enter to proceed: ");
    while (user_input !== "") {
        var is_already_added = method_array.includes(user_input);
        if (is_already_added) {
            console.log();
            (0, menu_global_functions_1.print_bold)("Cooking method not added; it has already been added " +
                "to the kitchenware");
            user_input = (0, RoR_1.prompt)("Enter a cooking method that the kitchenware can do, " +
                "or press enter to proceed: ");
        }
        else {
            method_array.push(user_input);
            user_input = (0, RoR_1.prompt)("Enter another cooking method that the kitchenware can do, " +
                "or press enter to proceed: ");
        }
    }
    kit.cooking_methods = method_array;
    if (is_editing) {
        (0, menu_global_functions_1.print_bold)("Kitchenware cooking methods updated!");
        console.log();
    }
    else { }
    return kit;
}
exports.select_kit_methods = select_kit_methods;
/**
 * Wrap the edit_kitchenware function so that it's parameters are snapshotted
 * and can be added to the stack.
 * @param kitchenware - Kitchenware that is being edited
 * @param old_name - Name of the kitchenware before it gets edited
 * @returns the function edit_kitchenware with fixated parameters.
 */
function edit_kitchenware_wrapper(kitchenware, old_name) {
    return function () {
        (0, edit_kitchenware_menu_1.edit_kitchenware)(kitchenware, old_name);
    };
}
exports.edit_kitchenware_wrapper = edit_kitchenware_wrapper;
