import * as PromptSync from "prompt-sync";

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

function RoR_start(): void {
    console.log("----------------------------------------");
    console.log("Welcome to Randomizer of Recipes, aka");
    console.log("____       ____   ");
    console.log("|  _ \\ ___ |  _ \\ ");
    console.log("| |_) / _ \\| |_) |");
    console.log("|  _ < (_) |  _ < ");
    console.log("|_| \\_\\___/|_| \\_\\");
    console.log("----------------------------------------");
    main_menu();
}

function main_menu(): void {
    let user_input: string | null;

    console.log("");
    console.log('"h" = help');
    console.log('"r" = randomize recipe');
    console.log('"q" = quit"');
    console.log('"s" = saved recipes');
    console.log('"c = configure"');
    user_input = prompt("Choose an alternative: ");
    console.log("");

    if (user_input === "h") {
        print_help();
    } else if (user_input === "r") {
        // generate_recipe();
    } else if (user_input === "q") {
        kill_RoR();
    } else if (user_input === "s") {
        // saved_recipes();
    } else if (user_input === "c") {
        configure();
    } else {
        console.log("Invalid input. Try again")
        main_menu();
    }
}

function print_help(): void {
    console.log("randomize recipe: ");
    console.log("The main feature of RoR.");
    console.log("Generates a randomized recipe based on the current configurations.");
    console.log("The ingredients picked out for the recipe, their quantities and cooking methods will all be randomized,")
    console.log("until the requested number of portions has been met.\n")

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

function kill_RoR(): void {
    console.log("");
    console.log("Goodbye :)");
}

function configure(): void {
    let user_input: string | null;
    console.log("");
    console.log('"p" = configure portion amount');
    console.log('"d" = configure dietary restrictions / allergies');
    console.log('"a" = add ingredient data"');
    console.log('"b" = back to main menu');
    user_input = prompt("Choose an alternative: ");

    function configure_portion_amount(): void {
        // print current portion amount from Settings object
        let change_portion_amount = prompt("Do you wish to change portion amount? (y/n)");
        
        if (change_portion_amount === "y") {
            integer_prompt("Enter new portion amount: ", "New amount registered.", save_settings()); // future function: save new portion amount in Settings object
            configure();
        } else if (change_portion_amount === "n") {
            configure();
        } else {
            console.log("Invalid input. Try again");
            configure_portion_amount();
        }
    }

    if (user_input === "p") {
        configure_portion_amount();

    } else if (user_input === "d") {
        console.log("Active dietary restrictions: ")
        // print active dietary restrictions from Settings object
        let portion_amount_input: string | null = prompt("Enter portion amount: ");


    } else if (user_input === "a") {

    } else if (user_input === "p") {

    } else if (user_input === "b") {

    } else {
        console.log("Invalid input. Try again")
        configure();
    }
    

    console.log("");
    main_menu();
}

function integer_prompt(prompt_text: string, success_text = "", fun: Function) {
    let new_portion_amount: string | null = prompt(prompt_text);
    let parsed: number = parseInt(new_portion_amount);

    if (isNaN(parsed)) {
        console.log("Invalid input. Please enter a valid number.");
        integer_prompt(prompt_text, success_text, fun);
    } else {
        fun(parsed);
        if (success_text !== "") {
            console.log(success_text);
        } else {}
    }
}


RoR_start();
