import {
    prompt, valid_dietary_restrictions
} from "../RoR";

import {
    type Category, type Ingredient, empty_ingredient
} from "../basics";

import {
    check_input, integer_prompt, print_alternatives, print_bold
} from "./menu_global_functions";

import {
    type SaveData, load_data, save_new_ingredient
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

import {
    edit_ingredient
} from "./edit_ingredient_menu";
import { print_all_categories } from "./category_menu";

/**
 * A submenu of the ingredients menu, where the user adds a new ingredient.
 */
export function add_ingredient(): void {
    let new_ingredient: Ingredient = empty_ingredient();
    new_ingredient = select_name(new_ingredient);
    new_ingredient = select_category(new_ingredient);
    new_ingredient = select_allergies(new_ingredient);
    new_ingredient = select_measurement(new_ingredient);
    new_ingredient = select_kcal(new_ingredient);
    new_ingredient = select_range(new_ingredient);
    save_new_ingredient(new_ingredient);

    const keys = Object.keys(new_ingredient);
    const values = Object.values(new_ingredient);

    print_bold("Data for the new ingredient: ")
    for (let i = 0; i < values.length; i++) {
        console.log(keys[i] + ":", values[i]);
    }

    let valid_inputs = ["y", "n"];
    let user_input = check_input(
        valid_inputs, "Are you happy with the ingredient data? (y/n): "
        );

    if (user_input === "y") {
        oblivion();
    } else if (user_input === "n") {
        oblivion();
        set_menu_memory(push(edit_ingredient.bind(new_ingredient),
                             get_menu_memory()));
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}

/**
 * Helper function that prompts the user to select a name for an ingredient.
 * @param ingredient - The ingredient to select name for
 * @returns the updated ingredient.
 */
export function select_name(ingredient: Ingredient,
                            is_editing: boolean = false): Ingredient {
        // helper function used to avoid duplicate ingredient names
        function is_name_taken(ingredient_name: string): boolean {
            let name_taken: boolean;
            if (is_editing) {
                return name_taken = is_ingredient_in_data(name) &&
                                    name !== ingredient.name;
            } else {
                return name_taken = is_ingredient_in_data(name)
            }
        }

    if (is_editing) {
        print_bold("Current ingredient category: " + ingredient.category);
        console.log();
    } else {}

    let name = prompt("Enter new ingredient name: ").trim().toLowerCase();
    var name_taken = is_name_taken(name);
    console.log();

    while (name === "" || name_taken) {
        print_bold(
            "Ingredient name cannot be empty, only contain whitespace or " + 
            "already taken by another ingredient."
            );
        name = prompt("Enter new ingredient name: ").trim().toLowerCase();
        name_taken = is_name_taken(name)
    }

    ingredient.name = name;
    if (is_editing) {
        print_bold("Ingredient category updated!");
        console.log();
    } else {}
    return ingredient;
    }

/**
 * Helper function that prompts the user to select a category for an ingredient.
 * @param ingredient - The ingredient to select category for
 * @param is_editing - Determines whether the current category should be
 * printed before prompting the user (false by default)
 * @returns the updated ingredient.
 */
export function select_category(ingredient: Ingredient,
            is_editing: boolean = false): Ingredient {
    let data: SaveData = load_data();

    if (is_editing) {
        print_bold("Current ingredient category: " + ingredient.category);
        console.log();
    } else {}

    const category_names = print_all_categories(
        "Valid ingredient categories: "
        );
    let user_input = check_input(
        category_names,
        "Choose which category the new ingredient belongs to: "
        );

    ingredient.category = user_input;
    if (is_editing) {
        print_bold("Ingredient category updated!");
        console.log();
    } else {}
    return ingredient;
}

/**
 * Helper function that prompts the user to select the dietary restrictions
 * that apply to an ingredient.
 * @param ingredient - The ingredient to select dietary restrictions for
 * @param is_editing - Determines whether the current dietary restrictions
 * should be printed before prompting the user (false by default)
 * @returns the updated ingredient.
 */

export function select_allergies(ingredient: Ingredient,
             is_editing: boolean = false): Ingredient {
    if (is_editing) {
        print_bold("Current ingredient dietary restrictions: ");
        print_alternatives(ingredient.allergies);
        console.log();
    } else {}

    const allergy_array: Array<string> = [];
    const valid_dietary_not_active = [...valid_dietary_restrictions];
    valid_dietary_not_active.push("");

    print_bold("Valid dietary restrictions: ");
    print_alternatives(valid_dietary_restrictions);
    let user_input = check_input(
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
    if (is_editing) {
        print_bold("Ingredient dietary restrictions updated!");
        console.log();
    } else {}
    return ingredient;
}

/**
 * Helper function that prompts the user to select the unit of measurement for
 * an ingredient.
 * @param ingredient - The ingredient to select the unit of measurement for
 * @param is_editing - Determines whether the current unit of measurement
 * should be printed before prompting the user (false by default)
 * @returns the updated ingredient.
 */
export function select_measurement(ingredient: Ingredient,
               is_editing: boolean = false): Ingredient {
    if (is_editing) {
        print_bold(
            "Current ingredient measurement: " + ingredient.measurement
            );
        console.log();
    } else {}

    ingredient.measurement = prompt(
        'Enter unit of measurement either as amount in the format of a ' +
        'float number, or as a float followed by a string, e.g. "0.5 dl": '
        ).trim().toLowerCase();
    console.log();

    if (is_editing) {
        print_bold("Ingredient unit of measurement updated!");
        console.log();
    } else {}
    return ingredient;
}

/**
 * Helper function that prompts the user to select the kcal per measurement for
 * an ingredient.
 * @param ingredient - The ingredient to select the kcal per measurement for
 * @param is_editing - Determines whether the current kcal per measurement
 * should be printed before prompting the user (false by default)
 * @returns the updated ingredient.
 */
export function select_kcal(ingredient: Ingredient,
        is_editing: boolean = false): Ingredient {
    if (is_editing) {
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

            if (is_editing) {
                print_bold("Ingredient kcal per measurement updated!");
                console.log();
            } else {}
            return ingredient;
        }
    }
}

/**
 * Helper function that prompts the user to select the range in which
 * an ingredient's amount can be randomized, based on the ingredients
 * unit of measurement.
 * @param ingredient - The ingredient to select the amount range for
 * @param is_editing - Determines whether the current amount range
 * should be printed before prompting the user (false by default)
 * @returns the updated ingredient.
 */
export function select_range(ingredient: Ingredient,
         is_editing: boolean = false): Ingredient {
    if (is_editing) {
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

    if (is_editing) {
        print_bold("Ingredient amount range updated!");
        console.log();
    } else {}
    return ingredient;
}
