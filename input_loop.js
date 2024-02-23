"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromptSync = require("prompt-sync");
var prompt = PromptSync({ sigint: true });
function RoR_start() {
    console.log("----------------------------------------");
    console.log("Welcome to Randomizer of Recipes, aka");
    console.log("____       ____   ");
    console.log("|  _ \\ ___ |  _ \\ ");
    console.log("| |_) / _ \\| |_) |");
    console.log("|  _ < (_) |  _ < ");
    console.log("|_| \\_\\___/|_| \\_\\");
    console.log("----------------------------------------\n");
    main_menu();
}
function main_menu() {
    var user_input;
    console.log('"h" = help\n"r" = randomize recipe\n"q" = quit"\n"s" = saved recipes\n"c = configure"');
    user_input = prompt("Choose an alternative: ");
    console.log("");
    if (user_input === "h") {
        print_help();
    }
    else if (user_input === "r") {
        // generate_recipe();
    }
    else if (user_input === "q") {
        kill_RoR();
    }
    else if (user_input === "s") {
        // saved_recipes();
    }
    else if (user_input === "c") {
        configure();
    }
    else {
        console.log("Invalid input. Try again");
        main_menu();
    }
    console.log("");
}
function print_help() {
    console.log("\nrandomize recipe: ");
    console.log("The main feature of RoR.");
    console.log("Generates a randomized recipe based on the current configurations.");
    console.log("The ingredients picked out for the recipe, their quantities and cooking methods will all be randomized,");
    console.log("until the requested number of portions has been met.\n");
    console.log("quit: ");
    console.log("Terminates the program session.");
    console.log("All configurations and saved recipes carry over to the next time RoR is run.\n");
    console.log("saved recipes: ");
    console.log("View a menu of all previously saved recipes.");
    console.log("The recipes can be selected to have their contents viewed.\n");
    console.log("configure: ");
    console.log("View a menu of recipe generation configurations.");
    console.log("Number of portions, active dietary restrictions and ingredient data can be adjusted.\n");
    main_menu();
}
function kill_RoR() {
    console.log("\nGoodbye :)");
}
function configure() {
    main_menu();
}
RoR_start();
