"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.print_bold = exports.RoR_start = void 0;
var PromptSync = require("prompt-sync");
var stack_1 = require("./lib/stack");
var RoR_1 = require("./RoR");
var save_recipe_1 = require("./save_recipe");
function RoR_start() {
    console.log("----------------------------------------");
    console.log("Welcome to Randomizer of Recipes, aka");
    console.log("____       ____   ");
    console.log("|  _ \\ ___ |  _ \\ ");
    console.log("| |_) / _ \\| |_) |");
    console.log("|  _ < (_) |  _ < ");
    console.log("|_| \\_\\___/|_| \\_\\");
    console.log("----------------------------------------");
    console.log();
    menu_memory = (0, stack_1.push)(main_menu, menu_memory);
    while (!(0, stack_1.is_empty)(menu_memory)) {
        (0, stack_1.top)(menu_memory)();
    }
    kill_RoR();
}
exports.RoR_start = RoR_start;
function main_menu() {
    var user_input;
    var print_menu = ['"h" = help', '"r" = randomize recipe',
        '"q" = quit"', '"s" = saved recipes',
        '"c" = configure"'];
    var valid_inputs = ["h", "r", "q", "s", "c"];
    print_alternatives(print_menu);
    user_input = check_input(valid_inputs, "Choose an alternative: ");
    while (!valid_inputs.includes(user_input)) {
        print_bold("Invalid input. Try again");
    }
    if (user_input === "h") {
        print_help();
    }
    else if (user_input === "r") {
        menu_memory = (0, stack_1.push)(recipimize, menu_memory);
    }
    else if (user_input === "q") {
        oblivion();
    }
    else if (user_input === "s") {
        // saved_recipes();
    }
    else if (user_input === "c") {
        menu_memory = (0, stack_1.push)(configure, menu_memory);
    }
    else { }
}
function recipimize() {
    var user_input;
    var print_menu = ['"r" = randomize new recipe',
        '"s" = save recipe',
        '"b" = back to main menu"'];
    var valid_inputs = ["r", "s", "b"];
    var recipe = (0, RoR_1.generate_recipe)(portion_size, portion_amount, restrictions);
    (0, RoR_1.print_recipe)(recipe);
    //wait for keypress?
    print_alternatives(print_menu);
    user_input = check_input(valid_inputs, "Choose an alternative: ");
    if (user_input === "r") {
        return;
    }
    else if (user_input === "s") {
        (0, save_recipe_1.save_new_recipe)(recipe);
    }
    else if (user_input === "b") {
        oblivion();
    }
}
function print_help() {
    print_bold("randomize recipe: ");
    console.log("The main feature of RoR.");
    console.log("Generates a randomized recipe based on the current configurations.");
    console.log("The ingredients picked out for the recipe, their quantities and cooking methods will all be randomized,");
    console.log("until the requested number of portions has been met.\n");
    print_bold("quit: ");
    console.log("Terminates the program session.");
    console.log("All configurations and saved recipes carry over to the next time RoR is run.\n");
    print_bold("saved recipes: ");
    console.log("View a menu of all previously saved recipes.");
    console.log("The recipes can be selected to have their contents viewed.\n");
    print_bold("configure: ");
    console.log("View a menu of recipe generation configurations.");
    console.log("Number of portions, active dietary restrictions and ingredient data can be adjusted.");
}
function kill_RoR() {
    print_bold("Goodbye :)");
}
function configure() {
    var user_input;
    var print_menu = ['"p" = portion amount',
        '"d" = dietary restrictions',
        '"i" = ingredient data"',
        '"b" = back to main menu'];
    var valid_inputs = ["p", "d", "i", "b"];
    print_alternatives(print_menu);
    user_input = check_input(valid_inputs, "Choose what you want to configure: ");
    if (user_input === "p") {
        menu_memory = (0, stack_1.push)(configure_portion, menu_memory);
    }
    else if (user_input === "d") {
        menu_memory = (0, stack_1.push)(dietary_prompt, menu_memory);
    }
    else if (user_input === "i") {
        menu_memory = (0, stack_1.push)(configure_ingredients, menu_memory);
    }
    else if (user_input === "b") {
        oblivion();
    }
    function configure_portion() {
        valid_inputs = ["y", "n"];
        // print current portion amount from Settings object
        user_input = check_input(valid_inputs, "Do you wish to change the portion amount? (y/n): ");
        if (user_input === "y") {
            // integer_prompt("Enter new portion amount: ", "New amount registered.", save_configuration(config)); // uncomment and add parameter to save_configuration
        }
        else if (user_input === "n") {
            oblivion();
        }
    }
    function dietary_prompt() {
        valid_inputs = ["y", "n"];
        console.log("Active dietary restrictions: ");
        // print active dietary restrictions from Settings object using print_alternatives
        user_input = check_input(valid_inputs, "Do you wish to change the active dietary restrictions? (y/n): ");
        if (user_input === "y") {
            menu_memory = (0, stack_1.push)(configure_dietary, menu_memory);
        }
        else if (user_input === "n") {
            oblivion();
        }
        function configure_dietary() {
            valid_inputs = ["a", "r", "b"];
            print_menu = ['"a" = add dietary restriction', '"r" = remove dietary restriction"', '"b" = back to configurations menu'];
            print_alternatives(print_menu);
            user_input = check_input(valid_inputs, "Choose an alternative: ");
            if (user_input === "a") {
            }
            else if (user_input === "r") {
            }
            else if (user_input === "b") {
                oblivion();
            }
        }
    }
    function configure_ingredients() {
        valid_inputs = ["a", "r", "b"];
        print_menu = ['"a" = add ingredient', '"r" = remove ingredient"', '"b" = back to configurations menu'];
        print_alternatives(print_menu);
        user_input = check_input(valid_inputs, "Choose an alternative: ");
        if (user_input === "a") {
        }
        else if (user_input === "r") {
        }
        else if (user_input === "b") {
            oblivion();
        }
        //add
    }
}
function integer_prompt(prompt_text, success_text, fun) {
    if (success_text === void 0) { success_text = ""; }
    var new_portion_amount = prompt(prompt_text);
    var parsed = parseInt(new_portion_amount);
    while (isNaN(parsed)) {
        console.log("Invalid input. Please enter a valid number.");
        new_portion_amount = prompt(prompt_text);
        parsed = parseInt(new_portion_amount);
    }
    fun(parsed);
    if (success_text !== "") {
        console.log(success_text);
    }
    else { }
}
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
function print_bold(print_str) {
    if (print_bold_text) {
        console.log('\x1b[1m' + print_str + '\x1b[0m');
    }
    else {
        console.log(print_str);
    }
    return;
}
exports.print_bold = print_bold;
function oblivion() {
    if (!(0, stack_1.is_empty)(menu_memory)) {
        menu_memory = (0, stack_1.pop)(menu_memory);
    }
    else {
        throw new Error("Error removing function from memory stack");
    }
}
function check_input(valid, question) {
    console.log();
    var user_input = prompt(question);
    if (user_input !== null) {
        user_input = user_input.toLowerCase();
    }
    else { }
    console.log();
    while (!valid.includes(user_input)) {
        print_bold("Invalid input. Try again");
        user_input = prompt(question);
        if (user_input !== null) {
            user_input = user_input.toLowerCase();
        }
        else { }
        console.log();
    }
    return user_input;
}
var prompt = PromptSync({ sigint: true });
var menu_memory = (0, stack_1.empty)();
var print_bold_text = true;
var portion_size = [400, 700];
var portion_amount = 4; //remove
var restrictions = []; //remove
