import {
    type Configuration, add_to_dietary_restrictions, load_configuration,
    remove_from_dietary_restrictions
} from "../../data/save_config";

import {
    check_input, print_alternatives, print_bold
} from "../menu_global_functions";

import { oblivion } from "../menu_memory";

import { prompt } from "../../RoR";

/**
 * A subsubmenu of the configurations menu, where the user can configure
 * dietary restrictions by adding or removing them.
 */
export function configure_dietary(): void {
    // Helper function that adds a dietary restriction
    // if it is valid and not already active.
    function add_diet(): void {
        let restriction = prompt(
            "Choose dietary restriction to add: "
        );
        restriction = restriction === null 
            ? "" 
            : restriction.trim().toLowerCase();

        const is_existing = config.dietary_restrictions.includes(restriction);
        if (!is_existing) {
            config = add_to_dietary_restrictions(restriction, config);
            print_bold("Dietary restriction successfully added!\n");
        } else {
            print_bold(
                "Dietary restriction not added; it is already active.\n"
                );
        }
    }

    // Helper function that removes a dietary restriction
    // if it is valid and active.
    function remove_diet(): void {
        let restriction= prompt(
            "Choose dietary restriction to remove: "
        );
        restriction = restriction === null 
            ? "" 
            : restriction.trim().toLowerCase();

        const is_existing = config.dietary_restrictions.includes(restriction);
        if (is_existing) {
            config = remove_from_dietary_restrictions(restriction, config);
            print_bold("Dietary restriction successfully removed!\n");
        } else {
            print_bold("Dietary restriction not removed; it is not active.\n");
        }
    }

    let config: Configuration = load_configuration();
    let print_menu = ['"a" = add dietary restriction',
                      '"r" = remove dietary restriction',
                      '"v" = view active dietary restrictions',
                      '"b" = back to configurations menu'];
    let valid_inputs = ["a", "r", "v", "b"];

    print_alternatives(print_menu);
    let user_input = check_input(valid_inputs, "Choose an alternative: ");
    
    if (user_input === "a") {
        add_diet();
    } else if (user_input === "r") {
        remove_diet();
    } else if (user_input === "v") {
        if (config.dietary_restrictions.length === 0) {
            print_bold("You have no active dietary restrictions.\n");
        } else {
            print_bold("Active dietary restrictions: ");
            print_alternatives(config.dietary_restrictions);
            console.log();
        }
    } else if (user_input === "b") {
        oblivion(2);
    } else {
        throw new Error("Invalid user_input has escaped.");
    }
}
