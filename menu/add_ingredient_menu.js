"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add_ingredient = void 0;
var main_menu_1 = require("./main_menu");
var basics_1 = require("../basics");
var menu_global_functions_1 = require("./menu_global_functions");
var save_load_data_1 = require("../data/save_load_data");
var menu_memory_1 = require("./menu_memory");
var stack_1 = require("../lib/stack");
var list_1 = require("../lib/list");
/**
 * A submenu of the ingredients menu, where the user adds a new ingredient.
 */
function add_ingredient() {
    // Helper function that prompts the user to select a name for
    // an ingredient and then returns the updated ingredient.
    function select_name(ingredient, print_contents) {
        if (print_contents === void 0) { print_contents = false; }
        if (print_contents) {
            console.log("Current ingredient name: " + ingredient.name);
        }
        else { }
        var name = (0, main_menu_1.prompt)("Enter new ingredient name: ").trim().toLowerCase();
        console.log();
        while (name === "") {
            console.log("Ingredient name cannot be empty or only contain whitespace.");
            name = (0, main_menu_1.prompt)("Enter new ingredient name: ").trim().toLowerCase();
        }
        ingredient.name = name;
        return ingredient;
    }
    // Helper function that prompts the user to select a category for
    // an ingredient and then returns the updated ingredient.
    function select_category(ingredient, print_contents) {
        if (print_contents === void 0) { print_contents = false; }
        if (print_contents) {
            console.log("Current ingredient category: " + ingredient.category);
        }
        else { }
        (0, menu_global_functions_1.print_bold)("Valid ingredient categories: ");
        var category_names = [];
        var cats = data.categories;
        for (var i = 0; i < cats.length; i++) {
            category_names[i] = cats[i].name;
        }
        (0, menu_global_functions_1.print_alternatives)(category_names);
        user_input = (0, menu_global_functions_1.check_input)(category_names, "Choose which category the new ingredient belongs to: ");
        ingredient.category = user_input;
        return ingredient;
    }
    // Helper function that prompts the user to select the dietary restrictions
    // that apply to an ingredient and then returns the updated ingredient.
    function select_allergies(ingredient, print_contents) {
        if (print_contents === void 0) { print_contents = false; }
        if (print_contents) {
            console.log("Current ingredient dietary restrictions: ");
            (0, menu_global_functions_1.print_alternatives)(ingredient.allergies);
        }
        else { }
        var allergy_array = [];
        var valid_dietary_not_active = __spreadArray([], main_menu_1.valid_dietary_restrictions, true);
        valid_dietary_not_active.push("");
        (0, menu_global_functions_1.print_bold)("Valid dietary restrictions: ");
        (0, menu_global_functions_1.print_alternatives)(main_menu_1.valid_dietary_restrictions);
        user_input = (0, menu_global_functions_1.check_input)(valid_dietary_not_active, "Enter a dietary restriction of the above that applies to the " +
            "new ingredient, or press enter if no dietary restrictions apply: ");
        while (user_input !== "") {
            allergy_array.push(user_input);
            var index = valid_dietary_not_active.indexOf(user_input);
            if (index !== -1) {
                valid_dietary_not_active.splice(index, 1);
            }
            else {
                throw new Error("Error: could not find active dietary restriction");
            }
            (0, menu_global_functions_1.print_bold)("Valid dietary restrictions that have not yet been added: ");
            (0, menu_global_functions_1.print_alternatives)(valid_dietary_not_active);
            user_input = (0, menu_global_functions_1.check_input)(valid_dietary_not_active, "Enter another dietary restriction that applies to the new " +
                "ingredient, or press enter if no more dietary restrictions " +
                "apply: ");
        }
        ingredient.allergies = allergy_array;
        return ingredient;
    }
    // Helper function that prompts the user to select the unit of measurement
    // for an ingredient and then returns the updated ingredient.
    function select_measurement(ingredient, print_contents) {
        if (print_contents === void 0) { print_contents = false; }
        if (print_contents) {
            console.log("Current ingredient measurement: " + ingredient.measurement);
        }
        else { }
        ingredient.measurement = (0, main_menu_1.prompt)('Enter unit of measurement either as amount in the format of a ' +
            'float number, or as a float followed by a string, e.g. "0.5dl": ').trim().toLowerCase();
        return ingredient;
    }
    // Helper function that prompts the user to select the kcal per measurement
    // for an ingredient and then returns the updated ingredient.
    function select_kcal(ingredient, print_contents) {
        if (print_contents === void 0) { print_contents = false; }
        if (print_contents) {
            console.log("Current ingredient kcal per measurement: " +
                ingredient.kcal_per_measurement.toString());
        }
        else { }
        ingredient.kcal_per_measurement = (0, menu_global_functions_1.integer_prompt)("Enter the amount of kcal per measurement (rounded to nearest " +
            "integer) for the new ingredient: ");
        return ingredient;
    }
    // Helper function that prompts the user to select the range in which
    // an ingredients amount can be randomized, based on the ingredients
    // unit of measurement, and then returns the updated ingredient.
    function select_range(ingredient, print_contents) {
        if (print_contents === void 0) { print_contents = false; }
        if (print_contents) {
            console.log("Current ingredient amount range: " +
                ingredient.range[0].toString() +
                " - " +
                ingredient.range[1].toString());
        }
        else { }
        var lower_range = (0, menu_global_functions_1.integer_prompt)("Enter the lower limit for the amount able to be randomized of " +
            "the new ingredient, measured in the ingredients measurement: ");
        while (lower_range < 0) {
            console.log("the lower limit cannot be negative");
            lower_range = (0, menu_global_functions_1.integer_prompt)("Please choose a new lower limit: ");
        }
        var upper_range = (0, menu_global_functions_1.integer_prompt)("Enter the upper limit for the amount able to be randomized of " +
            "the new ingredient, measured in the ingredients measurement: ");
        while (upper_range < lower_range) {
            console.log("the upper limit cannot be lower than the lower limit");
            upper_range = (0, menu_global_functions_1.integer_prompt)("Please choose a new upper limit: ");
        }
        ingredient.range = (0, list_1.pair)(lower_range, upper_range);
        return ingredient;
    }
    var new_ingredient = (0, basics_1.empty_ingredient)();
    new_ingredient = select_name(new_ingredient);
    new_ingredient = select_category(new_ingredient);
    new_ingredient = select_allergies(new_ingredient);
    new_ingredient = select_measurement(new_ingredient);
    new_ingredient = select_kcal(new_ingredient);
    new_ingredient = select_range(new_ingredient);
    var keys = Object.keys(new_ingredient);
    var values = Object.values(new_ingredient);
    (0, menu_global_functions_1.print_bold)("Data for the new ingredient: ");
    (0, menu_global_functions_1.print_alternatives)(keys);
    for (var i = 0; i < values.length; i++) {
        console.log(values[i]);
    }
    var data = (0, save_load_data_1.load_data)();
    var print_menu;
    var valid_inputs = ["y", "n"];
    var user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Are you happy with the ingredient data? (y/n): ");
    if (user_input === "y") {
        (0, save_load_data_1.save_new_ingredient)(new_ingredient);
        (0, menu_memory_1.oblivion)();
    }
    else if (user_input === "n") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(ingredient_adjustments, (0, menu_memory_1.get_menu_memory)()));
    }
    else {
        throw new Error("Error: invalid user_input has escaped.");
    }
    // A subsubmenu of the ingredients menu, where the user ends up if they
    // wish to edit any of the ingredient data of a newly created ingredient, 
    // before confirming to create the ingredient.
    function ingredient_adjustments() {
        print_menu = [
            '"n" = change ingredient name',
            '"c" = change ingredient categories',
            '"d" = change ingredient dietary restrictions',
            '"m" = change ingredient measurement',
            '"k" = change ingredient kcal per measurement',
            '"r" = change ingredient amount range',
            '"b" = save ingredient and go back to ingredient menu'
        ];
        valid_inputs = ["n", "c", "d", "m", "k", "r", "b"];
        (0, menu_global_functions_1.print_alternatives)(print_menu);
        user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose what ingredient data you want to adjust: ");
        if (user_input === "n") {
            new_ingredient = select_name(new_ingredient, true);
        }
        else if (user_input === "c") {
            new_ingredient = select_category(new_ingredient, true);
        }
        else if (user_input === "d") {
            new_ingredient = select_allergies(new_ingredient, true);
        }
        else if (user_input === "m") {
            new_ingredient = select_measurement(new_ingredient, true);
        }
        else if (user_input === "k") {
            new_ingredient = select_kcal(new_ingredient, true);
        }
        else if (user_input === "r") {
            new_ingredient = select_range(new_ingredient, true);
        }
        else if (user_input === "b") {
            (0, save_load_data_1.save_new_ingredient)(new_ingredient);
            (0, menu_memory_1.oblivion)(2);
        }
        else {
            throw new Error("Error: invalid user_input has escaped.");
        }
    }
}
exports.add_ingredient = add_ingredient;
