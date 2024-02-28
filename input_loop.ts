import * as PromptSync from "prompt-sync";
import { 
    Stack, empty, is_empty, push, top, pop, display_stack
} from "./lib/stack";

import { type Recipe, generate_recipe, print_recipe } from "./RoR";
import { Pair } from "./lib/list";
import { save_configuration } from "./save_options";
import { save_new_recipe } from "./save_recipe";

/**
 * Pauses program until any key is pressed on windows, otherwise until enter
 * is pressed.
 */
function wait_for_keypress(): void {
    if (process.platform === "win32") {
        const { spawnSync } = require('node:child_process');
        let pause_str = "pause";
        spawnSync("pause", {shell: true, stdio: [0, 1, 2]}); 
    } else {
        prompt("Press enter to continue.");
    }
    console.log();
}

export function RoR_start(): void {
    console.log("----------------------------------------");
    console.log("Welcome to Randomizer of Recipes, aka");
    console.log("____       ____   ");
    console.log("|  _ \\ ___ |  _ \\ ");
    console.log("| |_) / _ \\| |_) |");
    console.log("|  _ < (_) |  _ < ");
    console.log("|_| \\_\\___/|_| \\_\\");
    console.log("----------------------------------------");
    console.log();
    
    menu_memory = push(main_menu, menu_memory);
    while (!is_empty(menu_memory)) {
        top(menu_memory)();
    }
    kill_RoR();
}

function main_menu(): void {
    let user_input: string | null;
    const print_menu: Array<string> = ['"h" = help', '"r" = randomize recipe',
                                       '"q" = quit"', '"s" = saved recipes',
                                       '"c" = configure"'];
    const valid_inputs: Array<string> = ["h", "r", "q", "s", "c"];
    
    print_alternatives(print_menu);
    user_input = check_input(valid_inputs, "Choose an alternative: ");

    while (!valid_inputs.includes(user_input)) {
        print_bold("Invalid input. Try again");
    }
    if (user_input === "h") {
        print_help();
    } else if (user_input === "r") {
        menu_memory = push(recipimize, menu_memory);
    } else if (user_input === "q") {
        oblivion();
    } else if (user_input === "s") {
        // saved_recipes();
    } else if (user_input === "c") {
        menu_memory = push(configure, menu_memory);
    }
    else {}
}

function recipimize(): void {
    let user_input: string | null;
    let print_menu: Array<string> = ['"r" = randomize new recipe',
                                       '"s" = save recipe',
                                       '"b" = back to main menu"'];
    let valid_inputs: Array<string> = ["r", "s", "b"];

    const recipe: Recipe = generate_recipe(portion_size, portion_amount, restrictions);
    print_recipe(recipe);

    wait_for_keypress();

    print_alternatives(print_menu);
    user_input = check_input(valid_inputs, "Choose an alternative: ");
    
    if (user_input === "r") {
        return;
    } else if (user_input === "s") {
        save_new_recipe(recipe);
    } else if (user_input === "b") {
        oblivion();
    }
}

function print_help(): void {
    print_bold("randomize recipe: ");
    console.log("The main feature of RoR.");
    console.log("Generates a randomized recipe based on the current configurations.");
    console.log("The ingredients picked out for the recipe, their quantities and cooking methods will all be randomized,")
    console.log("until the requested number of portions has been met.\n")

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

function kill_RoR(): void {
    print_bold("Goodbye :)");
}

function configure(): void {
    let user_input: string | null;
    let print_menu: Array<string> = ['"p" = portion amount',
                                       '"d" = dietary restrictions',
                                       '"i" = ingredient data"',
                                       '"b" = back to main menu'];
    let valid_inputs: Array<string> = ["p", "d", "i", "b"];

    print_alternatives(print_menu);
    user_input = check_input(valid_inputs, "Choose what you want to configure: ");
    
    if (user_input === "p") {
        menu_memory = push(configure_portion, menu_memory);
    } else if (user_input === "d") {
        menu_memory = push(dietary_prompt, menu_memory);
    } else if (user_input === "i") {
        menu_memory = push(configure_ingredients, menu_memory)
    } else if (user_input === "b") {
        oblivion();
    }

    function configure_portion(): void {
        valid_inputs = ["y", "n"];

        // print current portion amount from Settings object
        user_input = check_input(valid_inputs, "Do you wish to change the portion amount? (y/n): ");

        if (user_input === "y") {
            // integer_prompt("Enter new portion amount: ", "New amount registered.", save_configuration(config)); // uncomment and add parameter to save_configuration

        } else if (user_input === "n") {
            oblivion();
        }
    }

    function dietary_prompt(): void {
        valid_inputs = ["y", "n"];

        console.log("Active dietary restrictions: ")
        // print active dietary restrictions from Settings object using print_alternatives
        user_input = check_input(valid_inputs, "Do you wish to change the active dietary restrictions? (y/n): ");

        if (user_input === "y") {
            menu_memory = push(configure_dietary, menu_memory);
        } else if (user_input === "n") {
            oblivion();
        }

        function configure_dietary(): void {
            valid_inputs = ["a", "r", "b"];
            print_menu = ['"a" = add dietary restriction', '"r" = remove dietary restriction"', '"b" = back to configurations menu'];
    
            print_alternatives(print_menu);
            user_input = check_input(valid_inputs, "Choose an alternative: ");
            
            if (user_input === "a") {

            } else if (user_input === "r") {
    
            } else if (user_input === "b") {
                oblivion();
            }
        }
    }

    function configure_ingredients(): void {
        valid_inputs = ["a", "r", "b"];
        print_menu = ['"a" = add ingredient', '"r" = remove ingredient"', '"b" = back to configurations menu'];

        print_alternatives(print_menu);
        user_input = check_input(valid_inputs, "Choose an alternative: ");
        if (user_input === "a") {

        } else if (user_input === "r") {

        } else if (user_input === "b") {
            oblivion();
        }
        //add
    }
}

function integer_prompt(prompt_text: string, success_text = "", fun: Function) {
    let new_portion_amount: string | null = prompt(prompt_text);
    let parsed: number = parseInt(new_portion_amount);

    while (isNaN(parsed)) {
        console.log("Invalid input. Please enter a valid number.");
        new_portion_amount = prompt(prompt_text);
        parsed = parseInt(new_portion_amount);
    }
    fun(parsed);
    if (success_text !== "") {
        console.log(success_text);
    } else {}
}

function print_alternatives(alternatives: Array<string>): void {
    if (alternatives.length === 0) { // to not print empty space
        return;
    } else {
        for (let i = 0; i < alternatives.length; i++) {
            console.log(alternatives[i]);
        }
    }
}

export function print_bold(print_str: string): void {
    if (print_bold_text) {
        console.log('\x1b[1m' + print_str + '\x1b[0m');
    } else {
        console.log(print_str);
    }
    return;
}

function oblivion<Function>(): undefined {
    if (!is_empty(menu_memory)) {
        menu_memory = pop(menu_memory);
    } else {
        throw new Error("Error removing function from memory stack")
    }
}

function check_input(valid: Array<string>, question: string): string {
    console.log();
    let user_input: string | null = prompt(question);
    if (user_input !== null) {
        user_input = user_input.toLowerCase();
    } else {}
    console.log();

    while (!valid.includes(user_input)) {
        print_bold("Invalid input. Try again");
        user_input = prompt(question);
        if (user_input !== null) {
            user_input = user_input.toLowerCase();
        } else {}
        console.log();
    }
    return user_input;
}

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });
let menu_memory: Stack<Function> = empty();
const print_bold_text: boolean = true;
const portion_size: Pair<number, number> = [400, 700];
const portion_amount: number = 4; //remove
const restrictions: Array<string> = []; //remove

if (require.main === module) {
    RoR_start();
}