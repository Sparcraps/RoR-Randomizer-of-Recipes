import { prompt, valid_dietary_restrictions } from "../RoR";

import {
    Category,
    Ingredient, empty_ingredient
} from "../basics";

import {
    check_input, integer_prompt, print_alternatives, print_bold
} from "./menu_global_functions";

import {
    SaveData, load_data, save_new_ingredient
} from "../data/save_load_data";

import {
    get_menu_memory, oblivion, set_menu_memory
} from "./menu_memory";

import {
    push
} from "../lib/stack";

import {
    pair
} from "../lib/list";

/**
 * A submenu of the ingredients menu, where the user adds a new ingredient.
 */
export function add_ingredient(): void {
    // A subsubmenu of the ingredients menu, where the user ends up if they
    // wish to edit any of the ingredient data of a newly created ingredient, 
    // before confirming to create the ingredient.
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
        user_input = check_input(
            valid_inputs, "Choose what ingredient data you want to adjust: "
            );

        if (user_input === "n") {
            new_ingredient = select_name(new_ingredient, true);
        } else if (user_input === "c") {
            new_ingredient = select_category(new_ingredient, true);
        } else if (user_input === "d") {
            new_ingredient = select_allergies(new_ingredient, true);
        } else if (user_input === "m") {
            new_ingredient = select_measurement(new_ingredient, true);
        }  else if (user_input === "k") {
            new_ingredient = select_kcal(new_ingredient, true);
        } else if (user_input === "r") {
            new_ingredient = select_range(new_ingredient, true);
        } else if (user_input === "b") {
            save_new_ingredient(new_ingredient);
            oblivion(2);
        } else {
            throw new Error("Invalid user_input has escaped.");
        }
    }

    // Helper function that prompts the user to select a name for
    // an ingredient and then returns the updated ingredient.
    function select_name(ingredient: Ingredient,
                         print_contents: boolean = false): Ingredient {
        if (print_contents) {
            print_bold("Current ingredient name: " + ingredient.name);
            console.log();
        } else {}
        
        let name = prompt("Enter new ingredient name: ").trim().toLowerCase();
        console.log();
        while (name === "") {
            print_bold(
                "Ingredient name cannot be empty or only contain whitespace."
                );
            name = prompt("Enter new ingredient name: ").trim().toLowerCase();
        }
        ingredient.name = name;
        return ingredient;
    }

    // Helper function that prompts the user to select a category for
    // an ingredient and then returns the updated ingredient.
    function select_category(ingredient: Ingredient,
                             print_contents: boolean = false): Ingredient {
        if (print_contents) {
            print_bold("Current ingredient category: " + ingredient.category);
            console.log();
        } else {}

        print_bold("Valid ingredient categories: ");
        const category_names: Array<string> = [];
        const cats: Array<Category> = data.categories;
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

    // Helper function that prompts the user to select the dietary restrictions
    // that apply to an ingredient and then returns the updated ingredient.
    function select_allergies(ingredient: Ingredient,
                              print_contents: boolean = false): Ingredient {
        if (print_contents) {
            print_bold("Current ingredient dietary restrictions: ");
            print_alternatives(ingredient.allergies);
            console.log();
        } else {}

        const allergy_array: Array<string> = [];
        const valid_dietary_not_active = [...valid_dietary_restrictions];
        valid_dietary_not_active.push("");

        print_bold("Valid dietary restrictions: ");
        print_alternatives(valid_dietary_restrictions);
        user_input = check_input(
            valid_dietary_not_active,
            "Enter a dietary restriction of the above that applies to the " +
            "new ingredient, or press enter if no dietary restrictions apply: "
            );
        while (user_input !== "") {
            allergy_array.push(user_input);
            const index = valid_dietary_not_active.indexOf(user_input);
            if (index !== -1) {
                valid_dietary_not_active.splice(index, 1);
            } else {
                throw new Error(
                    "Could not find active dietary restriction"
                    );
            }

            print_bold(
                "Valid dietary restrictions that have not yet been added: "
                );
            print_alternatives(valid_dietary_not_active);
            user_input = check_input(
                valid_dietary_not_active,
                "Enter another dietary restriction that applies to the new " +
                "ingredient, or press enter if no more dietary restrictions " +
                "apply: "
                );
        }
        ingredient.allergies = allergy_array;
        return ingredient;
    }

    // Helper function that prompts the user to select the unit of measurement
    // for an ingredient and then returns the updated ingredient.
    function select_measurement(ingredient: Ingredient,
                                print_contents: boolean = false): Ingredient {
        if (print_contents) {
            print_bold(
                "Current ingredient measurement: " + ingredient.measurement
                );
            console.log();
        } else {}

        ingredient.measurement = prompt(
            'Enter unit of measurement either as amount in the format of a ' +
            'float number, or as a float followed by a string, e.g. "0.5dl": '
            ).trim().toLowerCase();
        console.log();
        return ingredient;
    }

    // Helper function that prompts the user to select the kcal per measurement
    // for an ingredient and then returns the updated ingredient.
    function select_kcal(ingredient: Ingredient,
                         print_contents: boolean = false): Ingredient {
        if (print_contents) {
            print_bold("Current ingredient kcal per measurement: " +
            ingredient.kcal_per_measurement.toString());
            console.log();
        } else {}

        while (true) {
            let kcal_input = integer_prompt(
                "Enter the amount of kcal per measurement (rounded to " +
                "nearest integer) for the new ingredient: "
                );
                if (kcal_input < 0 ) {
                    print_bold("kcal per measurement cannot be negative!");
                } else {
                    console.log();
                    ingredient.kcal_per_measurement = kcal_input;
                    return ingredient;
                }
        }
    }

    // Helper function that prompts the user to select the range in which
    // an ingredients amount can be randomized, based on the ingredients
    // unit of measurement, and then returns the updated ingredient.
    function select_range(ingredient: Ingredient,
                          print_contents: boolean = false): Ingredient {
        if (print_contents) {
            print_bold(
                "Current ingredient amount range: " +
                ingredient.range[0].toString() +
                " - " +
                ingredient.range[1].toString()
                );
            console.log();
        } else {}

        let lower_range = integer_prompt(
            "Enter the lower limit for the amount able to be randomized of " +
            "the new ingredient, measured in the ingredients measurement: "
            );
        console.log();
        while (lower_range < 0) {
            print_bold("the lower limit cannot be negative\n");
            lower_range = integer_prompt("Please choose a new lower limit: ");
        }
        let upper_range = integer_prompt(
            "Enter the upper limit for the amount able to be randomized of " +
            "the new ingredient, measured in the ingredients measurement: "
            );
        console.log();
        while (upper_range < lower_range) {
            print_bold(
                "the upper limit cannot be lower than the lower limit\n"
                );
            upper_range = integer_prompt("Please choose a new upper limit: ");
        }
        ingredient.range = pair(lower_range, upper_range);
        return ingredient;
    }

    let data: SaveData = load_data();
    let new_ingredient: Ingredient = empty_ingredient();
    new_ingredient = select_name(new_ingredient);
    new_ingredient = select_category(new_ingredient);
    new_ingredient = select_allergies(new_ingredient);
    new_ingredient = select_measurement(new_ingredient);
    new_ingredient = select_kcal(new_ingredient);
    new_ingredient = select_range(new_ingredient);

    const keys = Object.keys(new_ingredient);
    const values = Object.values(new_ingredient);

    print_bold("Data for the new ingredient: ")
    print_alternatives(keys);
    for (let i = 0; i < values.length; i++) {
        console.log(values[i]);
    }

    let print_menu;
    let valid_inputs = ["y", "n"];
    let user_input = check_input(
        valid_inputs, "Are you happy with the ingredient data? (y/n): "
        );

    if (user_input === "y") {
        save_new_ingredient(new_ingredient);
        oblivion();
    } else if (user_input === "n") {
        set_menu_memory(push(ingredient_adjustments, get_menu_memory()));
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
