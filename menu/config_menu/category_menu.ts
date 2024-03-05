import { prompt } from "../../RoR";

import { type Category, type Method, find_by_name } from "../../basics";

import {
    type SaveData, delete_category, get_data
} from "../../data/save_load_data";

import { push } from "../../lib/stack";

import { get_doable_cooking_methods } from "../../recipe/filters";

import { add_category } from "./add_category_menu";

import { edit_category } from "./edit_category_menu";

import {
    check_input, integer_prompt, print_alternatives, print_bold
} from "../menu_global_functions";

import { get_menu_memory, oblivion, set_menu_memory } from "../menu_memory";

/**
 * A submenu of the configuration menu, where the user can configure
 * the categories used for recipe generation, by adding, editing or removing
 * them.
 */
export function configure_categories(): void {
    // Helper function that prompts the user for a category name,
    // searches for it in the data and removes it from the data if found.
    function search_and_delete(): void {
        let input = prompt(
            "Enter the name of the category you wish to edit, or press " +
            "enter to go back without removing a category: "
            ).trim().toLowerCase();
        if (input !== "") {
            try {
                delete_category(input);
                print_bold("\nCategory removed from data!");
            } catch (error) {
                console.log();
                console.error(error.message);
            }
        } else {}
        console.log();
    }

    // Helper function that returns category object by name
    function find_category(): Category | undefined {
        let data: SaveData = get_data();
        let input = prompt(
            "Enter the name of the category you wish to edit: "
            ).trim().toLowerCase();
            if (input !== "") {
                let index = find_by_name(input, data.categories)
                if (index !== -1) {
                    console.log();
                    return data.categories[index];
                } else {}
        }
    }

    let valid_inputs = ["a", "e", "r", "l", "b"];
    let print_menu = ['"a" = add category',
                      '"e" = edit existing category',
                      '"r" = remove category',
                      '"l" = display a list of all existing categories',
                      '"b" = back to configurations menu'];

    print_alternatives(print_menu);
    let user_input = check_input(valid_inputs, "Choose an alternative: ");

    if (user_input === "a") {
        set_menu_memory(push(add_category, get_menu_memory()));
    } else if (user_input === "e") {
        const cat = find_category();
        if (cat !== undefined) {
            const name = cat.name;
            set_menu_memory(push(edit_category_wrapper(cat, name),
                                 get_menu_memory()));
        } else {
            print_bold("There is no category with that name!");
            console.log();
        }
    } else if (user_input === "r") {
        search_and_delete();
    } else if (user_input === "l") {
        print_all_categories("Currently registered categories: ");
    } else if (user_input === "b") {
        oblivion();
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}

// Helper function that prints the name of all 
// currently registered categories.
export function print_all_categories(bold_print_string: string): Array<string> {
    let data: SaveData = get_data();
    const category_names: Array<string> = [];
    const cats: Array<Category> = data.categories;

    print_bold(bold_print_string);
    for (let i = 0; i < cats.length; i++) {
        category_names[i] = cats[i].name;
    }
    print_alternatives(category_names);
    console.log();
    return category_names;
}

/**
 * Helper function that prompts the user to select a name for a category.
 * @param cat - The category to select name for
 * @returns the updated category.
 */
export function select_cat_name(cat: Category,
                                is_editing: boolean = false): Category {
    // helper function used to avoid duplicate category names
    function is_name_taken(category_name: string): boolean {
        let data: SaveData = get_data();
        const index = find_by_name(category_name, data.categories);

        if (is_editing) {
            return !(index === -1 || name === cat.name);
        } else {
            return index !== -1;
        }
    }

    if (is_editing) {
        print_bold("Current category name: " + cat.name);
        console.log();
    } else {}

    let name = prompt("Enter new category name: ").trim().toLowerCase();
    var name_taken = is_name_taken(name);
    console.log();

    while (name === "" || name_taken) {
        print_bold(
            "Category name cannot be empty, only contain whitespace or " + 
            "is already taken by another category."
            );
        name = prompt("Enter new category name: ").trim().toLowerCase();
        name_taken = is_name_taken(name)
    }

    cat.name = name;
    if (is_editing) {
        print_bold("Category name updated!");
        console.log();
    } else {}
    return cat;
}

/**
* Helper function that prompts the user to select the applicable cooking methods
* for a category.
* @param cat - The category to select cooking methods for
* @param is_editing - Determines whether the current cooking methods should be
* printed before prompting the user or not (false by default)
* @returns the updated category.
*/
export function select_cat_methods(
    cat: Category, is_editing: boolean = false
): Category | undefined {
    let data: SaveData = get_data();
    if (is_editing) {
        print_bold("Current category cooking methods: " + cat.cooking_methods);
        console.log();
    } else {}
    
    const method_array: Array<Method> = [];
    const valid_methods_not_active: Array<string> = [...Array.from(
        get_doable_cooking_methods(data.kitchenware)
    )];

    if (valid_methods_not_active.length === 0) { // To avoid assigning cooking methods to Categories when no valid cooking methods can be fetched from Kitchenwares.
        console.log("Add cooking methods to kitchenware before adding " +
        "a category");
        return;
    } else {}

    valid_methods_not_active.push("");
    print_bold("Valid cooking methods: ");
    print_alternatives(valid_methods_not_active);
    let user_input = check_input(
        valid_methods_not_active,
        "Enter a cooking method that applies to the category. " +
        "If the cooking methods depend on each other, enter them in " + 
        "the order should be carried out, or press enter to proceed: "
    );

    while (user_input !== "") {
        let is_valid = valid_methods_not_active.includes(user_input);

        if (!is_valid) {
            print_bold("Could not find any kitchenware with this " +
            "cooking method. Try again");
            console.log();
        } else {
            const inner_array: Method = [];
            inner_array.push(user_input);
            console.log();

            user_input = check_input(
                valid_methods_not_active,
                "Enter a cooking method that depends on " +
                "the cooking method you just added, " + 
                "or press enter to proceed: "
            );
            while (user_input !== "") {
                is_valid = valid_methods_not_active.includes(user_input);
                if (!is_valid) {
                    print_bold("Could not find any kitchenware with this " +
                    "cooking method. Try again");
                    console.log();
                } else {
                    inner_array.push(user_input);
                    console.log();
                }
                user_input = check_input(
                    valid_methods_not_active,
                    "Enter a cooking method that depends on " +
                    "the cooking method you just added, " + 
                    "or press enter to proceed: "
                );
            }
    
            method_array.push(inner_array);
            print_bold("Cooking method added to category!");
            user_input = "temp"; // to not exit both while loops at the same time

            user_input = check_input(
                valid_methods_not_active,
                "Enter another cooking method that applies to the new " +
                "ingredient, or press enter if no more cooking methods apply: "
            );
        }
    }

    cat.cooking_methods = method_array;
    if (is_editing) {
        print_bold("Category cooking methods updated!");
        console.log();
    } else {}
    return cat;
}

/**
* Helper function that prompts the user to select the max amount of ingredients
* from a category that can be generated in one recipe.
* @param cat - The category to select max amount for
* @param is_editing - Determines whether the current dietary restrictions
* should be printed before prompting the user or not (false by default)
* @returns the updated ingredient.
*/
export function select_cat_max(cat: Category,
                               is_editing: boolean = false): Category {
    if (is_editing) {
        print_bold("Current category max amount: " +
        cat.max_ingredients.toString());
        console.log();
    } else {}

    while (true) {
        let int_input = integer_prompt(
        "Enter the amount of kcal per measurement (rounded to " +
        "nearest integer) for the new ingredient: "
        );
        if (int_input < 0 ) {
        print_bold("category max amount cannot be negative!");
        } else {
            console.log();
            cat.max_ingredients = int_input;

            if (is_editing) {
            print_bold("Category max amount updated!");
            console.log();
            } else {}
            return cat;
        }
    }
}

/**
 * Wrap the edit_category function so that it's parameters are snapshotted 
 * and can be added to the stack.
 * @param category - Category that is being edited
 * @param old_name - The name of the category before it gets edited
 * @returns the function edit_category with fixated parameters.
 */
export function edit_category_wrapper(category: Category,
                                      old_name: string): Function {
    return function() {
        edit_category(category, old_name);
    };
}
