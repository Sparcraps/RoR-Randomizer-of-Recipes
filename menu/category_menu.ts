import {
    prompt
} from "../RoR";
import { Category, Ingredient, find_by_name } from "../basics";
import { SaveData, delete_category, load_data } from "../data/save_load_data";
import { push } from "../lib/stack";
import { check_input, print_alternatives, print_bold } from "./menu_global_functions";
import { get_menu_memory, oblivion, set_menu_memory } from "./menu_memory";

/**
 * A submenu of the configurations menu, where the user can configure
 * the categories used for recipe generation, by adding or removing them.
 */
export function configure_categories(): void {
    // Helper function that prompts the user for an ingredient name,
    // searches for it in the data and removes it from the data if found.
    function search_and_delete(): void {
        let input = prompt(
            "Enter the name of the category you wish to edit, or press " +
            "enter to go back without removing a category: "
            ).trim().toLowerCase();
        if (input !== "") {
            try {
                data = delete_category(input);
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
    
    // Inside this function, you can access the category parameter
    // and call edit_category with the correct value
    function edit_category_wrapper(category: Category,
                                   old_name: string): Function {
        return function() {
            edit_category(category, old_name);
        };
    }

    let data: SaveData = load_data();
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
// currently registered ingredients.
export function print_all_categories(bold_print_string: string): Array<string> {
    let data: SaveData = load_data();
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

