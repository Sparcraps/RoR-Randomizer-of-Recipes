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
exports.valid_dietary_restrictions = exports.portion_size = exports.print_bold_text = exports.prompt = exports.RoR_start = void 0;
var PromptSync = require("prompt-sync");
var stack_1 = require("../lib/stack");
var list_1 = require("../lib/list");
var save_config_1 = require("../save_config");
var save_recipe_1 = require("../save_recipe");
var save_load_data_1 = require("../save_load_data");
var basics_1 = require("../basics");
var menu_memory_1 = require("./menu_memory");
var menu_global_functions_1 = require("./menu_global_functions");
var recipimize_menu_1 = require("./recipimize_menu");
var saved_recipes_menu_1 = require("./saved_recipes_menu");
function RoR_start() {
    function kill_RoR() {
        (0, menu_global_functions_1.print_bold)("Goodbye :)");
    }
    console.log("----------------------------------------");
    console.log("Welcome to Randomizer of Recipes, aka");
    console.log("____       ____   ");
    console.log("|  _ \\ ___ |  _ \\ ");
    console.log("| |_) / _ \\| |_) |");
    console.log("|  _ < (_) |  _ < ");
    console.log("|_| \\_\\___/|_| \\_\\");
    console.log("----------------------------------------\n");
    (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(main_menu, (0, menu_memory_1.get_menu_memory)()));
    while (!(0, stack_1.is_empty)((0, menu_memory_1.get_menu_memory)())) {
        (0, stack_1.top)((0, menu_memory_1.get_menu_memory)())();
    }
    kill_RoR();
}
exports.RoR_start = RoR_start;
function main_menu() {
    var user_input;
    var print_menu = ['"h" = help', '"r" = randomize recipe',
        '"s" = saved recipes', '"c" = configure',
        '"q" = quit'];
    var valid_inputs = ["h", "r", "q", "s", "c"];
    (0, menu_global_functions_1.print_alternatives)(print_menu);
    user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
    if (user_input === "h") {
        print_help();
    }
    else if (user_input === "r") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(recipimize_menu_1.recipimize, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "s") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(saved_recipes_menu_1.saved_recipes, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "c") {
        (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(configure, (0, menu_memory_1.get_menu_memory)()));
    }
    else if (user_input === "q") {
        (0, menu_memory_1.oblivion)();
    }
    else {
        throw new Error("Error: invalid user_input has escaped.");
    }
    //prints an explanation of all alternatives in the main menu
    function print_help() {
        (0, menu_global_functions_1.print_bold)("randomize recipe: ");
        console.log("The main feature of RoR.");
        console.log("Generates a randomized recipe based on the current configurations.");
        console.log("The ingredients picked out for the recipe, their quantities and cooking methods will all be randomized,");
        console.log("until the requested number of portions has been met.\n");
        (0, menu_global_functions_1.print_bold)("quit: ");
        console.log("Terminates the program session.");
        console.log("All configurations and saved recipes carry over to the next time RoR is run.\n");
        (0, menu_global_functions_1.print_bold)("saved recipes: ");
        console.log("View a menu of all previously saved recipes.");
        console.log("The recipes can be selected to have their contents viewed.\n");
        (0, menu_global_functions_1.print_bold)("configure: ");
        console.log("View a menu of recipe generation configurations.");
        console.log("Number of portions, active dietary restrictions and ingredient data can be adjusted.\n");
    }
    //submenu for configurations
    function configure() {
        //submenu for changing portion size
        function configure_portion() {
            valid_inputs = ["y", "n"];
            console.log("Current portion amount: " + config.portion_amount.toString());
            user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Do you wish to change the portion amount? (y/n): ");
            if (user_input === "y") {
                var input_int = (0, menu_global_functions_1.integer_prompt)("Enter new portion amount: ");
                config = (0, save_config_1.change_portion_amount)(input_int, config);
                console.log("New amount registered.");
            }
            else if (user_input === "n") {
                (0, menu_memory_1.oblivion)();
            }
            else {
                throw new Error("Error: invalid user_input has escaped.");
            }
        }
        //submenu for dietary restrictions where active restrictions can be viewed
        function dietary_prompt() {
            //subsubmenu for dietary restrictions where active restrictions can be changed
            function configure_dietary() {
                //prompts the user to enter a valid dietary restriction and returns the
                //input as well as information of its existance in currently active dietary restrictions
                function select_valid_dietary() {
                    var valid = exports.valid_dietary_restrictions;
                    (0, menu_global_functions_1.print_bold)("Valid alternatives: ");
                    (0, menu_global_functions_1.print_alternatives)(valid);
                    var input = (0, menu_global_functions_1.check_input)(valid, "Choose dietary restriction of the above: ");
                    var is_already_in_arr = config.dietary_restrictions.includes(input);
                    return (0, list_1.pair)(is_already_in_arr, input);
                }
                function add_diet() {
                    var diet_pair = select_valid_dietary();
                    if (!diet_pair[0]) {
                        config = (0, save_config_1.add_to_dietary_restrictions)(diet_pair[1], config);
                        console.log("Dietary restriction successfully added!");
                    }
                    else {
                        console.log("Dietary restriction not added; it is already active.");
                    }
                }
                function remove_diet() {
                    var diet_pair = select_valid_dietary();
                    if (diet_pair[0]) {
                        config = (0, save_config_1.remove_from_dietary_restrictions)(diet_pair[1], config);
                        console.log("Dietary restriction successfully removed!");
                    }
                    else {
                        console.log("Dietary restriction not removed; it is not active.");
                    }
                }
                print_menu = ['"a" = add dietary restriction', '"r" = remove dietary restriction',
                    '"v" = view active dietary restrictions', '"b" = back to configurations menu'];
                valid_inputs = ["a", "r", "v", "b"];
                (0, menu_global_functions_1.print_alternatives)(print_menu);
                user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
                if (user_input === "a") {
                    add_diet();
                }
                else if (user_input === "r") {
                    remove_diet();
                }
                else if (user_input === "v") {
                    view_active_diet();
                }
                else if (user_input === "b") {
                    (0, menu_memory_1.oblivion)(2);
                }
                else {
                    throw new Error("Error: invalid user_input has escaped.");
                }
            }
            function view_active_diet() {
                (0, menu_global_functions_1.print_bold)("Active dietary restrictions: ");
                (0, menu_global_functions_1.print_alternatives)(config.dietary_restrictions);
            }
            valid_inputs = ["y", "n"];
            view_active_diet();
            user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Do you wish to change the active dietary restrictions? (y/n): ");
            if (user_input === "y") {
                (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(configure_dietary, (0, menu_memory_1.get_menu_memory)()));
            }
            else if (user_input === "n") {
                (0, menu_memory_1.oblivion)();
            }
            else {
                throw new Error("Error: invalid user_input has escaped.");
            }
        }
        //submenu for configuring ingredients
        function configure_ingredients() {
            //submenu for adding an ingredient
            function select_name(ingredient, print_contents) {
                if (print_contents === void 0) { print_contents = false; }
                if (print_contents) {
                    console.log("Current ingredient name: " + ingredient.name);
                }
                else { }
                var name = (0, exports.prompt)("Enter new ingredient name: ").trim().toLowerCase();
                console.log();
                while (name === "") {
                    console.log("Ingredient name cannot be empty / only contain whitespace.");
                    name = (0, exports.prompt)("Enter new ingredient name: ").trim().toLowerCase();
                }
                ingredient.name = name;
                return ingredient;
            }
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
            function select_allergies(ingredient, print_contents) {
                if (print_contents === void 0) { print_contents = false; }
                if (print_contents) {
                    console.log("Current ingredient dietary restrictions: ");
                    (0, menu_global_functions_1.print_alternatives)(ingredient.allergies);
                }
                else { }
                var allergy_array = [];
                var valid_dietary_not_active = __spreadArray([], exports.valid_dietary_restrictions, true);
                valid_dietary_not_active.push("");
                (0, menu_global_functions_1.print_bold)("Valid dietary restrictions: ");
                (0, menu_global_functions_1.print_alternatives)(exports.valid_dietary_restrictions);
                user_input = (0, menu_global_functions_1.check_input)(valid_dietary_not_active, "Enter a dietary restriction of the above that applies to the new ingredient, " +
                    "or press enter if no dietary restrictions apply: ");
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
                    user_input = (0, menu_global_functions_1.check_input)(valid_dietary_not_active, "Enter another dietary restriction that applies to the new ingredient, " +
                        "or press enter if no more dietary restrictions apply: ");
                }
                ingredient.allergies = allergy_array;
                return ingredient;
            }
            function select_measurement(ingredient, print_contents) {
                if (print_contents === void 0) { print_contents = false; }
                if (print_contents) {
                    console.log("Current ingredient measurement: " + ingredient.measurement);
                }
                else { }
                ingredient.measurement = (0, exports.prompt)('Enter unit of measurement either as amount in the format of a float number, or as a float followed by a string, e.g. "0.5dl": ').trim().toLowerCase();
                return ingredient;
            }
            function select_kcal_per_measurement(ingredient, print_contents) {
                if (print_contents === void 0) { print_contents = false; }
                if (print_contents) {
                    console.log("Current ingredient kcal per measurement: " + ingredient.kcal_per_measurement.toString());
                }
                else { }
                ingredient.kcal_per_measurement = (0, menu_global_functions_1.integer_prompt)("Enter the amount of kcal per measurement (rounded to nearest integer) for the new ingredient: ");
                return ingredient;
            }
            function select_range(ingredient, print_contents) {
                if (print_contents === void 0) { print_contents = false; }
                if (print_contents) {
                    console.log("Current ingredient amount range: " + ingredient.range[0].toString() + " - " + ingredient.range[1].toString());
                }
                else { }
                var lower_range = (0, menu_global_functions_1.integer_prompt)("Enter the lower limit for the amount able to be randomized of the new ingredient, measured in the ingredients measurement: ");
                while (lower_range < 0) {
                    console.log("the lower limit cannot be negative");
                    lower_range = (0, menu_global_functions_1.integer_prompt)("Please choose a new lower limit: ");
                }
                var upper_range = (0, menu_global_functions_1.integer_prompt)("Enter the upper limit for the amount able to be randomized of the new ingredient, measured in the ingredients measurement: ");
                while (upper_range < lower_range) {
                    console.log("the upper limit cannot be lower than the lower limit");
                    upper_range = (0, menu_global_functions_1.integer_prompt)("Please choose a new upper limit: ");
                }
                ingredient.range = (0, list_1.pair)(lower_range, upper_range);
                return ingredient;
            }
            function add_ingredient_menu() {
                var new_ingredient = (0, basics_1.empty_ingredient)();
                new_ingredient = select_name(new_ingredient);
                new_ingredient = select_category(new_ingredient);
                new_ingredient = select_allergies(new_ingredient);
                new_ingredient = select_measurement(new_ingredient);
                new_ingredient = select_kcal_per_measurement(new_ingredient);
                new_ingredient = select_range(new_ingredient);
                var keys = Object.keys(new_ingredient);
                var values = Object.values(new_ingredient);
                (0, menu_global_functions_1.print_bold)("Data for the new ingredient: ");
                (0, menu_global_functions_1.print_alternatives)(keys);
                for (var i = 0; i < values.length; i++) {
                    console.log(values[i]);
                }
                valid_inputs = ["y", "n"];
                user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Are you happy with the ingredient data? (y/n): ");
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
                //submenu for when adjusting a newly registered ingredient
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
                        new_ingredient = select_name(new_ingredient);
                    }
                    else if (user_input === "c") {
                        new_ingredient = select_category(new_ingredient);
                    }
                    else if (user_input === "d") {
                        new_ingredient = select_allergies(new_ingredient);
                    }
                    else if (user_input === "m") {
                        new_ingredient = select_measurement(new_ingredient);
                    }
                    else if (user_input === "k") {
                        new_ingredient = select_kcal_per_measurement(new_ingredient);
                    }
                    else if (user_input === "r") {
                        new_ingredient = select_range(new_ingredient);
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
            function remove_ingredient_menu() {
                function search_and_delete() {
                    var input = (0, exports.prompt)("Enter search string, or press enter to go back without removing an ingredient: ").trim().toLowerCase();
                    if (input !== "") {
                        try {
                            data = (0, save_load_data_1.delete_ingredient)(input);
                        }
                        catch ( //might have to handle error
                        _a) { //might have to handle error
                            console.log("There is no ingredient with that name.");
                        }
                    }
                    else { }
                }
                function print_all_ingredients() {
                    var ingr = data.ingredients;
                    (0, menu_global_functions_1.print_bold)("Currently registered ingredients: ");
                    for (var i = 0; i < ingr.length; i++) {
                        for (var j = 0; j < ingr[i].length; j++) {
                            console.log("- " + ingr[i][j].name);
                        }
                    }
                }
                print_menu = [
                    '"s" = search for ingredient by name',
                    '"l" = display a list of existing ingredients before searching for ingredient by name',
                    '"b" = back to ingredient menu'
                ];
                valid_inputs = ["s", "l", "b"];
                (0, menu_global_functions_1.print_alternatives)(print_menu);
                user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
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
                    throw new Error("Error: invalid user_input has escaped.");
                }
            }
            valid_inputs = ["a", "r", "b"];
            print_menu = ['"a" = add ingredient', '"r" = remove ingredient', '"b" = back to configurations menu'];
            (0, menu_global_functions_1.print_alternatives)(print_menu);
            user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose an alternative: ");
            if (user_input === "a") {
                (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(add_ingredient_menu, (0, menu_memory_1.get_menu_memory)()));
            }
            else if (user_input === "r") {
                (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(remove_ingredient_menu, (0, menu_memory_1.get_menu_memory)()));
            }
            else if (user_input === "b") {
                (0, menu_memory_1.oblivion)();
            }
            else {
                throw new Error("Error: invalid user_input has escaped.");
            }
        }
        print_menu = ['"p" = portion amount',
            '"d" = dietary restrictions',
            '"i" = ingredient data',
            '"b" = back to main menu'];
        valid_inputs = ["p", "d", "i", "b"];
        (0, menu_global_functions_1.print_alternatives)(print_menu);
        user_input = (0, menu_global_functions_1.check_input)(valid_inputs, "Choose what you want to configure: ");
        if (user_input === "p") {
            (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(configure_portion, (0, menu_memory_1.get_menu_memory)()));
        }
        else if (user_input === "d") {
            (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(dietary_prompt, (0, menu_memory_1.get_menu_memory)()));
        }
        else if (user_input === "i") {
            (0, menu_memory_1.set_menu_memory)((0, stack_1.push)(configure_ingredients, (0, menu_memory_1.get_menu_memory)()));
        }
        else if (user_input === "b") {
            (0, menu_memory_1.oblivion)();
        }
        else {
            throw new Error("Error: invalid user_input has escaped.");
        }
    }
}
exports.prompt = PromptSync({ sigint: true });
exports.print_bold_text = true;
exports.portion_size = [400, 700];
exports.valid_dietary_restrictions = ["meat", "gluten", "dairy", "eggs", "nuts", "fish"];
var config = (0, save_config_1.load_configuration)();
var data = (0, save_load_data_1.load_data)();
var recipes = (0, save_recipe_1.load_recipes)();
if (require.main === module) {
    RoR_start();
}
