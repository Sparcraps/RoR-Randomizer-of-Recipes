import * as PromptSync from "prompt-sync";

import { 
    type Stack, empty as empty_stack, is_empty as is_stack_empty, push, top, pop
} from "./lib/stack";

import {
    type Recipe, generate_recipe, print_recipe
} from "./RoR";

import {
    pair,
    type Pair
} from "./lib/list";

import {
    type Configuration,
    add_to_dietary_restrictions,
    load_configuration,
    save_configuration,
    remove_from_dietary_restrictions,
    change_portion_amount
} from "./save_config";

import {
    save_new_recipe, load_recipes, delete_recipe
} from "./save_recipe";

import {
    delete_ingredient, load_data, save_new_ingredient, SaveData
} from "./save_load_data";

import {
    empty_ingredient, Ingredient
} from "./basics";

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
                throw new Error("Error removing function from memory stack");
            }
        }
    }
    
    //checks if the user input is valid and otherwise prompts the user again
    function check_input(valid: Array<string>, question: string): string {
        console.log();
        let user_input: string | null = prompt(question).trim();
        if (user_input !== null) {
            user_input = user_input.toLowerCase();
        } else {}
        console.log();
    
        while (!valid.includes(user_input)) {
            print_bold("Invalid input. Try again");
            user_input = prompt(question).trim();
            if (user_input !== null) {
                user_input = user_input.toLowerCase();
            } else {}
            console.log();
        }
        return user_input;
    }

    //helper function that checks if input is an integer, and otherwise prompts the user again
    function integer_prompt(prompt_text: string): number {
        let new_portion_amount: string | null = prompt(prompt_text).trim();
        let parsed: number = parseInt(new_portion_amount);
    
        while (isNaN(parsed)) {
            console.log("Invalid input. Please enter a valid number.");
            new_portion_amount = prompt(prompt_text).trim();
            parsed = parseInt(new_portion_amount);
        }
        return parsed;
    }

     //Pauses program until any key is pressed on Windows OS,
     //otherwise until enter is pressed.
    function wait_for_keypress(): void {
        if (process.platform === "win32") {
            const { spawnSync } = require('node:child_process');
            spawnSync("pause", {shell: true, stdio: [0, 1, 2]}); 
        } else {
            prompt("Press enter to continue.");
        }
        console.log();
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
                menu_memory = push(recipimize, menu_memory);
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
        wait_for_keypress();
    
        print_alternatives(print_menu);
        user_input = check_input(valid_inputs, "Choose an alternative: ");
        
        if (user_input === "r") {
            return;
        } else if (user_input === "s") {
            recipes = save_new_recipe(recipe);
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

    function saved_recipes(): void {
        function choose_recipe(): Recipe {
            print_bold("Your saved recipes:");
            for (let i = 0; i < recipes.length; i++) {
                let current_name: string = recipes[i].name;
                console.log(i, current_name);
            }

            const int = integer_prompt("Enter the number corresponding to the recipe you want to choose: ");
            return recipes[int];
        }

        print_menu = ['"v" = view saved recipe', '"d = delete saved recipe"', '"b" = back to main menu'];
        valid_inputs = ["v", "d", "b"];

        print_alternatives(print_menu);
        user_input = check_input(valid_inputs, "Choose an alternative: ");

        if (user_input === "v") {
            const selected_recipe = choose_recipe();
            print_recipe(selected_recipe);
            wait_for_keypress();
        } else if (user_input === "d") {
            const selected_recipe = choose_recipe();
            const name = selected_recipe.name;
            recipes = delete_recipe(name);
            console.log("Recipe " + name + " deleted!");
        } else if (user_input === "b") {
            oblivion();
        } else {
            throw new Error("Error: invalid user_input has escaped.");
        }
    }

    //submenu for configurations
    function configure(): void {
        //submenu for changing portion size
        function configure_portion(): void {            
            valid_inputs = ["y", "n"];
    
            console.log("Current portion amount: " + config.portion_amount.toString);
            user_input = check_input(valid_inputs, "Do you wish to change the portion amount? (y/n): ");
    
            if (user_input === "y") {
                const input_int = integer_prompt("Enter new portion amount: ")
                config = change_portion_amount(input_int, config);
                console.log("New amount registered.")
            } else if (user_input === "n") {
                oblivion();
            } else {
                throw new Error("Error: invalid user_input has escaped.");
            }
        }

        //submenu for dietary restrictions where active restrictions can be viewed
        function dietary_prompt(): void {
            valid_inputs = ["y", "n"];
    
            print_bold("Active dietary restrictions: ");
            print_alternatives(config.dietary_restrictions);
            user_input = check_input(valid_inputs, "Do you wish to change the active dietary restrictions? (y/n): ");
    
            if (user_input === "y") {
                menu_memory = push(configure_dietary, menu_memory);
            } else if (user_input === "n") {
                oblivion();
            } else {
                throw new Error("Error: invalid user_input has escaped.");
            }
            
            //subsubmenu for dietary restrictions where active restrictions can be changed
            function configure_dietary(): void {
                //prompts the user to enter a valid dietary restriction and returns the
                //input as well as information of its existance in currently active dietary restrictions
                function select_valid_dietary(): Pair<boolean, string> {
                    const valid = valid_dietary_restrictions;

                    print_bold("Valid alternatives: ");
                    print_alternatives(valid);
                    
                    const input = check_input(valid, "Choose dietary restriction of the above: ")
                    if (config.dietary_restrictions.includes(input)) {
                        return pair(true, input);
                    } else {
                        return pair(false, input);
                    }
                }

                print_menu = ['"a" = add dietary restriction', '"r" = remove dietary restriction',
                              '"v" = view active dietary restrictions','"b" = back to configurations menu'];
                valid_inputs = ["a", "r", "v", "b"];
        
                print_alternatives(print_menu);
                user_input = check_input(valid_inputs, "Choose an alternative: ");
                
                if (user_input === "a") {
                    const diet_pair = select_valid_dietary();
                    if (!diet_pair[0]) {
                        config = add_to_dietary_restrictions(diet_pair[1], config);
                        console.log("Dietary restriction successfully added!")
                    } else {
                        console.log("Dietary restriction not added; it is already active.")
                    }
                } else if (user_input === "r") {
                    const diet_pair = select_valid_dietary();
                    if (diet_pair[0]) {
                        config = remove_from_dietary_restrictions(diet_pair[1], config);
                        console.log("Dietary restriction successfully removed!")
                    } else {
                        console.log("Dietary restriction not removed; it is not active.")
                    }
                } else if (user_input === "v") {
                    print_bold("Active dietary restrictions: ");
                    print_alternatives(config.dietary_restrictions);
                } else if (user_input === "b") {
                    oblivion(2);
                } else {
                    throw new Error("Error: invalid user_input has escaped.");
                }
            }
        }
        
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
            menu_memory = push(configure_ingredients, menu_memory);
        } else if (user_input === "b") {
            oblivion();
        } else {
            throw new Error("Error: invalid user_input has escaped.");
        }
    
        //submenu for configuring ingredients
        function configure_ingredients(): void {
            function select_name(ingredient: Ingredient): Ingredient {
                let name = prompt("Enter new ingredient name: ").trim().toLowerCase();
                while (name === "") {
                    console.log("Ingredient name cannot be empty.")
                    name = prompt("Enter new ingredient name: ").trim().toLowerCase();
                }
                ingredient.name = name;
                return ingredient;
            }

            function select_category(ingredient: Ingredient): Ingredient {
                print_bold("Valid ingredient categories: ");
                const category_names: Array<string> = [];
                const cats = data.categories;
                for (let i = 0; i < cats.length; i++) {
                    category_names[i] = cats[i].name;
                }
                print_alternatives(category_names);
                user_input = check_input(
                    category_names,
                    "Choose which category the new ingredient belongs to: "
                    );
                ingredient.category = user_input;
                return ingredient;
            }

            function select_allergies(ingredient: Ingredient): Ingredient {
                print_bold("Valid dietary restrictions");
                print_alternatives(valid_dietary_restrictions);
                const allergy_array: Array<string> = [];

                user_input = check_input(
                    valid_dietary_restrictions,
                    "Enter a dietary restriction of the above that applies to the new ingredient, " +
                    "or press enter if no dietary restrictions apply: ");
                while (user_input !== "") {
                    allergy_array.push(user_input);
                    user_input = check_input(
                        valid_dietary_restrictions,
                        "Enter another dietary restriction that applies to the new ingredient, " +
                        "or press enter if no more dietary restrictions apply: ");
                }
                ingredient.allergies = allergy_array;
                return ingredient;
            }

            function select_measurement(ingredient: Ingredient): Ingredient {
                ingredient.measurement = prompt('Enter unit of measurement either as amount in the format of a float number, or as a float followed by a string, e.g. "0.5dl": ').trim().toLowerCase();
                return ingredient;
            }

            function select_kcal_per_measurement(ingredient: Ingredient): Ingredient {
                ingredient.kcal_per_measurement = integer_prompt("Enter the amount of kcal per measurement (rounded to nearest integer) for the new ingredient: ");
                return ingredient;
            }

            function select_range(ingredient: Ingredient): Ingredient {
                let lower_range = integer_prompt("Enter the lower limit for the amount able to be randomized of the new ingredient, measured in the ingredients measurement: ");
                while (lower_range < 0) {
                    console.log("the lower limit cannot be negative");
                    lower_range = integer_prompt("Please choose a new lower limit: ");
                }
                let upper_range = integer_prompt("Enter the upper limit for the amount able to be randomized of the new ingredient, measured in the ingredients measurement: ");
                while (upper_range < lower_range) {
                    console.log("the upper limit cannot be lower than the lower limit");
                    upper_range = integer_prompt("Please choose a new upper limit: ");
                }
                ingredient.range = pair(lower_range, upper_range);
                return ingredient;
            }

            valid_inputs = ["a", "r", "b"];
            print_menu = ['"a" = add ingredient', '"r" = remove ingredient', '"b" = back to configurations menu'];
    
            print_alternatives(print_menu);
            user_input = check_input(valid_inputs, "Choose an alternative: ");

            if (user_input === "a") {
                let new_ingredient: Ingredient = empty_ingredient();
                new_ingredient = select_name(new_ingredient);
                new_ingredient = select_category(new_ingredient);
                new_ingredient = select_allergies(new_ingredient);
                new_ingredient = select_measurement(new_ingredient);
                new_ingredient = select_kcal_per_measurement(new_ingredient);
                new_ingredient = select_range(new_ingredient);

                menu_memory = push(ingredient_added, menu_memory);

                //submenu for when an ingredient has been added
                function ingredient_added(): void {
                    const keys = Object.keys(new_ingredient);
                    const values = Object.values(new_ingredient);

                    print_bold("Data for the new ingredient: ")
                    print_alternatives(keys);
                    for (let i = 0; i < values.length; i++) {
                        console.log(values[i]);
                    }

                    valid_inputs = ["y", "n"];
                    user_input = check_input(valid_inputs, "Are you happy with the ingredient data? (y/n): ");

                    if (user_input === "y") {
                        save_new_ingredient(new_ingredient);
                        oblivion();
                    } else if (user_input === "n") {
                        menu_memory = push(ingredient_adjustments, menu_memory);                        
                    } else {
                        throw new Error("Error: invalid user_input has escaped.");
                    }
                    
                    function ingredient_adjustments(): void {
                        print_menu = [
                            '"n" = change ingredient name',
                            '"c" = change ingredient categories',
                            '"d" = change ingredient dietary restrictions',
                            '"m" = change ingredient measurement',
                            '"k" = change ingredient kcal per measurement',
                            '"r" = change ingredient amount range',
                            '"b" = save ingredient and go back to ingredient menu'
                        ];
                        valid_inputs = ["n", "c", "d", "m", "k", "r", "b"]

                        print_alternatives(print_menu)
                        user_input = check_input(valid_inputs, "Choose what ingredient data you want to adjust: ")

                        if (user_input === "n") {
                            new_ingredient = select_name(new_ingredient);
                        } else if (user_input === "c") {
                            new_ingredient = select_category(new_ingredient);
                        } else if (user_input === "d") {
                            new_ingredient = select_allergies(new_ingredient);
                        } else if (user_input === "m") {
                            new_ingredient = select_measurement(new_ingredient);
                        }  else if (user_input === "k") {
                            new_ingredient = select_kcal_per_measurement(new_ingredient);
                        } else if (user_input === "r") {
                            new_ingredient = select_range(new_ingredient);
                        } else if (user_input === "b") {
                            save_new_ingredient(new_ingredient);
                            oblivion(2);
                        } else {
                            throw new Error("Error: invalid user_input has escaped.");
                        }
                    }
                }
            } else if (user_input === "r") {
                menu_memory = push(remove_ingredient, menu_memory)

                function remove_ingredient(): void {
                    print_menu = [
                        '"s" = search for ingredient by name',
                        '"l" = select ingredient from a list of all ingredient names',
                        '"b" = back to ingredient menu'];
                    valid_inputs = ["s", "l", "b"];
                    user_input = check_input(valid_inputs, "Choose an alternative: ");

                    if (user_input === "s") {
                        const input = prompt("Enter search string, or press enter to go back without removing an ingredient: ").trim().toLowerCase();
                        if (input !== "") {
                            data = delete_ingredient(input);
                        } else {}
                    } else if (user_input === "l") {
                        const ingr = data.ingredients;

                        print_bold("Currently registered ingredients: ")
                        for (let i = 0; i < ingr.length; i++) {
                            for (let j = 0; j < ingr[i].length; j++) {
                                console.log("- " + ingr[i][j].name);
                            }
                        }

                        let input = check_input(valid_inputs, 'Enter the number corresponding to the ingredient you want to remove, or press enter to go back without removing an ingredient');
                        if (input !== "") {
                            try {
                                data = delete_ingredient(input);
                            } catch { //might have to handle error
                                console.log("There is no ingredient with that name.")
                            }
                        } else {}
                    } else if (user_input === "b") {
                        oblivion();
                    } else {
                        throw new Error("Error: invalid user_input has escaped.");
                    }
                }
            } else if (user_input === "b") {
                oblivion();
            } else {
                throw new Error("Error: invalid user_input has escaped.");
            }
        }
    }

    let user_input: string | null;
    let print_menu: Array<string> = ['"h" = help', '"r" = randomize recipe',
                                     '"s" = saved recipes', '"c" = configure',
                                     '"q" = quit'];
    let valid_inputs: Array<string> = ["h", "r", "q", "s", "c"];
    
    print_alternatives(print_menu);
    user_input = check_input(valid_inputs, "Choose an alternative: ");

    if (user_input === "h") {
        print_help();
    } else if (user_input === "r") {
        menu_memory = push(recipimize, menu_memory);
    } else if (user_input === "s") {
        menu_memory = push(saved_recipes, menu_memory);
    } else if (user_input === "c") {
        menu_memory = push(configure, menu_memory);
    } else if (user_input === "q") {
        oblivion();
    } else {
        throw new Error("Error: invalid user_input has escaped.");
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

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });
let menu_memory: Stack<Function> = empty_stack();
const print_bold_text: boolean = true;
const portion_size: Pair<number, number> = [400, 700];
const valid_dietary_restrictions: Array<string> = ["meat", "gluten", "dairy", "eggs", "nuts", "fish"];

let config: Configuration = load_configuration();
let data: SaveData = load_data();
let recipes: Array<Recipe> = load_recipes();
const portion_amount: number = config.portion_amount;
const restrictions: Array<string> = config.dietary_restrictions;
