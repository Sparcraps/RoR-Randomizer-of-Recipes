"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove_ingredient = void 0;
var save_load_data_1 = require("../data/save_load_data");
var menu_global_functions_1 = require("./menu_global_functions");
var menu_memory_1 = require("./menu_memory");
var main_menu_1 = require("./main_menu");
/**
 * A submenu of the ingredients menu, where the user can remove
 * an existing ingredient.
 */
function remove_ingredient() {
    // Helper function that prompts the user for an ingredient name,
    // searches for it in the data and removes it from the data if found.
    function search_and_delete() {
        var input = (0, main_menu_1.prompt)("Enter search string, or press enter to go back without removing " +
            "an ingredient: ").trim().toLowerCase();
        if (input !== "") {
            try {
                data = (0, save_load_data_1.delete_ingredient)(input);
                (0, menu_global_functions_1.print_bold)("\nIngredient deleted!\n");
            }
            catch (error) {
                console.log();
                console.error(error.message);
                console.log();
            }
        }
        else { }
    }
    // Helper function that prints the name of all 
    // currently registered ingredients.
    function print_all_ingredients() {
        var ingr = data.ingredients;
        (0, menu_global_functions_1.print_bold)("Currently registered ingredients: ");
        for (var i = 0; i < ingr.length; i++) {
            for (var j = 0; j < ingr[i].length; j++) {
                console.log("- " + ingr[i][j].name);
            }
        }
        console.log();
    }
    var data = (0, save_load_data_1.load_data)();
    var print_menu = [
        '"s" = search for ingredient by name',
        '"l" = display a list of existing ingredients before searching ' +
            'for ingredient by name',
        '"b" = back to ingredient menu'
    ];
    var valid_inputs = ["s", "l", "b"];
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
    if (user_input === "s") {
        search_and_delete();
    }
    else if (user_input === "l") {
        print_all_ingredients();
        search_and_delete();
    }
    else if (user_input === "b") {
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Invalid user_input has escaped.");
    }
}
exports.remove_ingredient = remove_ingredient;
