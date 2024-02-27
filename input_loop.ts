import * as PromptSync from "prompt-sync";

import { 
    Stack, empty as empty_stack, is_empty as is_stack_empty, push, top, pop
} from "./lib/stack";

import {
    type Recipe, generate_recipe, print_recipe
} from "./RoR";

import {
    type Pair
} from "./lib/list";

import {
    Configuration,
    load_configuration,
    save_configuration
} from "./save_config";

import {
    save_new_recipe
} from "./save_recipe";

export function RoR_start(): void {
    function kill_RoR(): void {
        print_bold("Goodbye :)");
    }
    
    console.log("----------------------------------------");
    console.log("Welcome to Randomizer of Recipes, aka");
    console.log("____       ____   ");
    console.log("|  _ \\ ___ |  _ \\ ");
    console.log("| |_) / _ \\| |_) |");
    console.log("|  _ < (_) |  _ < ");
    console.log("|_| \\_\\___/|_| \\_\\");
    console.log("----------------------------------------\n");
    
    menu_memory = push(main_menu, menu_memory);
    while (!is_stack_empty(menu_memory)) {
        top(menu_memory)();
    }
    kill_RoR();
}

function main_menu(): void {
    //prints the menu alternatives
    function print_alternatives(alternatives: Array<string>): void {
        if (alternatives.length === 0) { // to not print empty space
            return;
        } else {
            for (let i = 0; i < alternatives.length; i++) {
                console.log(alternatives[i]);
            }
        }
    }
    
    //removes the last menu function from memory
    function oblivion(repeat: number = 1): undefined {
        for (repeat; repeat < 1; repeat--) {
            if (!is_stack_empty(menu_memory)) {
                menu_memory = pop(menu_memory);
            } else {
                throw new Error("Error removing function from memory stack")
            }
        }
    }
    
    //checks if the user input is valid and otherwise prompts the user again
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

    //submenu for randomizing recipes
    function recipimize(): void {
        //in case a recipe is saved, the menu alternatives need to be adjusted
        function recipimize_saved(): void {
            print_menu = ['"r" = randomize new recipe',
                          '"b" = back to main menu'];
            valid_inputs = ["r", "b"];

            print_alternatives(print_menu);
            user_input = check_input(valid_inputs, "Choose an alternative: ");

            if (user_input === "r") {
                oblivion();
                menu_memory = push(recipimize_saved, menu_memory);
            } else if (user_input === "b") {
                oblivion();
            }
        }

        print_menu = ['"r" = randomize new recipe',
                      '"s" = save recipe',
                      '"b" = back to main menu'];
        valid_inputs = ["r", "s", "b"];
    
        const recipe: Recipe = generate_recipe(portion_size, portion_amount, restrictions);
        print_recipe(recipe);
    
        //wait for keypress?
    
        print_alternatives(print_menu);
        user_input = check_input(valid_inputs, "Choose an alternative: ");
        
        if (user_input === "r") {
            return;
        } else if (user_input === "s") {
            save_new_recipe(recipe);
            console.log("Recipe " + recipe.name + " saved!\n");
            oblivion();
            menu_memory = push(recipimize_saved, menu_memory);
        } else if (user_input === "b") {
            oblivion();
        }
    }

    //prints an explanation of all alternatives in the main menu
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
        console.log("Number of portions, active dietary restrictions and ingredient data can be adjusted.\n");
    }

    //submenu for configurations
    function configure(): void {
        print_menu = ['"p" = portion amount',
                      '"d" = dietary restrictions',
                      '"i" = ingredient data',
                      '"b" = back to main menu'];
        valid_inputs = ["p", "d", "i", "b"];
    
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

        //submenu for changing portion size
        function configure_portion(): void {
            //helper function that checks if input is an integer, and otherwise prompts the user again
            function integer_prompt(prompt_text: string): number {
                let new_portion_amount: string | null = prompt(prompt_text);
                let parsed: number = parseInt(new_portion_amount);
            
                while (isNaN(parsed)) {
                    console.log("Invalid input. Please enter a valid number.");
                    new_portion_amount = prompt(prompt_text);
                    parsed = parseInt(new_portion_amount);
                }
                return parsed;
            }
            
            valid_inputs = ["y", "n"];
    
            console.log("Current portion amount: " + config.portion_amount.toString);
            user_input = check_input(valid_inputs, "Do you wish to change the portion amount? (y/n): ");
    
            if (user_input === "y") {
                const input_int = integer_prompt("Enter new portion amount: ")
                config.portion_amount = input_int;
                console.log("New amount registered.")
                save_configuration(config);
            } else if (user_input === "n") {
                oblivion();
            }
        }
    
        //submenu for dietary restrictions where active restrictions can be viewed
        function dietary_prompt(): void {            
            valid_inputs = ["y", "n"];
    
            console.log("Active dietary restrictions: ")
            print_alternatives(config.dietary_restrictions);
            user_input = check_input(valid_inputs, "Do you wish to change the active dietary restrictions? (y/n): ");
    
            if (user_input === "y") {
                menu_memory = push(configure_dietary, menu_memory);
            } else if (user_input === "n") {
                oblivion();
            }
            
            //subsubmenu for dietary restrictions where active restrictions can be changed
            function configure_dietary(): void {
                valid_inputs = ["a", "r", "b"];
                print_menu = ['"a" = add dietary restriction', '"r" = remove dietary restriction', '"b" = back to configurations menu'];
        
                print_alternatives(print_menu);
                user_input = check_input(valid_inputs, "Choose an alternative: ");
                
                if (user_input === "a") {
    
                } else if (user_input === "r") {
        
                } else if (user_input === "b") {
                    oblivion(2);
                }
            }
        }
    
        //submenu for configuring ingredients
        function configure_ingredients(): void {
            valid_inputs = ["a", "r", "b"];
            print_menu = ['"a" = add ingredient', '"r" = remove ingredient', '"b" = back to configurations menu'];
    
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

    let user_input: string | null;
    let print_menu: Array<string> = ['"h" = help', '"r" = randomize recipe',
                                       '"q" = quit', '"s" = saved recipes',
                                       '"c" = configure'];
    let valid_inputs: Array<string> = ["h", "r", "q", "s", "c"];
    
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

export function print_bold(print_str: string): void {
    if (print_bold_text) {
        console.log('\x1b[1m' + print_str + '\x1b[0m');
    } else {
        console.log(print_str);
    }
    return;
}

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });
let menu_memory: Stack<Function> = empty_stack();
const print_bold_text: boolean = true;
const portion_size: Pair<number, number> = [400, 700];

let config = load_configuration();
const portion_amount: number = config.portion_amount;
const restrictions: Array<string> = config.dietary_restrictions;
