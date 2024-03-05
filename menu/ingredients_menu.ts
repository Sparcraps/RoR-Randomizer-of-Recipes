import { prompt, valid_dietary_restrictions } from "../RoR";

import { type Ingredient, find_by_name } from "../basics";

import { SaveData, delete_ingredient, load_data } from "../data/save_load_data";

import { pair } from "../lib/list";

import { push } from "../lib/stack";

import { add_ingredient } from "./add_ingredient_menu";

import { print_all_categories } from "./category_menu";

import { edit_ingredient } from "./edit_ingredient_menu";

import {
    check_input, integer_prompt, print_alternatives, print_bold
} from "./menu_global_functions";

import { get_menu_memory, oblivion, set_menu_memory } from "./menu_memory";

/**
 * A submenu of the configurations menu, where the user can configure
 * the ingredients used for recipe generation, by adding or removing them.
 */
export function configure_ingredients(): void {
    // Helper function that prints the name of all 
    // currently registered ingredients.
    function print_all_ingredients(): void {
        const ingr = data.ingredients;

        print_bold("Currently registered ingredients: ")
        for (let i = 0; i < ingr.length; i++) {
            for (let j = 0; j < ingr[i].length; j++) {
                console.log("- " + ingr[i][j].name);
            }
        }
        console.log();
    }

    // Helper function that prompts the user for an ingredient name,
    // searches for it in the data and removes it from the data if found.
    function search_and_delete(): void {
        let input = prompt(
            "Enter the name of the ingredient you wish to remove, or press " +
            "enter to go back without removing an ingredient: "
            ).trim().toLowerCase();
        if (input !== "") {
            try {
                data = delete_ingredient(input);
                print_bold("\nIngredient removed from data!");
            } catch (error) {
                console.log();
                console.error(error.message);
            }
        } else {}
        console.log();
    }

    // Helper function that returns ingredient object by name
    function find_ingredient(): Ingredient | undefined {
        let input = prompt(
            "Enter the name of the ingredient you wish to edit, or press " +
            "enter to go back: "
            ).trim().toLowerCase();
            if (input !== "") {
                for (let i = 0; i < data.ingredients.length; i++) {
                    let j = find_by_name(input, data.ingredients[i]);
                        if (j !== -1) {
                            console.log();
                            return data.ingredients[i][j];
                        } else {}
                    }
                } else {}
                console.log();
            }

    let data: SaveData = load_data();
    let valid_inputs = ["a", "e", "r", "l", "b"];
    let print_menu = ['"a" = add ingredient',
                      '"e" = edit existing ingredient',
                      '"r" = remove ingredient',
                      '"l" = display a list of all existing ingredients',
                      '"b" = back to configurations menu'];

    print_alternatives(print_menu);
    let user_input = check_input(valid_inputs, "Choose an alternative: ");

    if (user_input === "a") {
        set_menu_memory(push(add_ingredient, get_menu_memory()));
    } else if (user_input === "e") {
        const ingredient = find_ingredient();
        if (ingredient !== undefined) {
            const name = ingredient.name;
            set_menu_memory(push(edit_ingredient_wrapper(ingredient, name),
                                 get_menu_memory()));
        } else {
            print_bold("There is no ingredient with that name!");
            console.log();
        }
    } else if (user_input === "r") {
        search_and_delete();
    } else if (user_input === "l") {
        print_all_ingredients();
    } else if (user_input === "b") {
        oblivion();
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
            return name_taken = is_ingredient_in_data(name);
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
            "is already taken by another ingredient."
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
        "ingredient, or press enter if no dietary restrictions apply: "
    );
    while (user_input !== "") {
        const index = valid_dietary_not_active.indexOf(user_input);
        if (index !== -1) {
            allergy_array.push(user_input);
            valid_dietary_not_active.splice(index, 1);
            print_bold("Dietary restriction added!");
            console.log();
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

/**
 * Wrap the edit_ingredient function so that it's parameters are snapshotted 
 * and can be added to the stack.
 * @param ingredient - Ingredient that is being edited
 * @param old_name - The name of the ingredient before it gets edited
 * @returns the function edit_ingredient with fixated parameters
 */

export function edit_ingredient_wrapper(ingredient: Ingredient,
                                        old_name: string): Function {
    return function() {
        edit_ingredient(ingredient, old_name);
    };
}
