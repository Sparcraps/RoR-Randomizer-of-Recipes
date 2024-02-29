import { 
    type Stack, empty as empty_stack, is_empty as is_stack_empty, pop
} from "./../lib/stack";

/**
 * Basic function that fetches the current state of the menu memory.
 * @returns the menu memory.
 */
export function get_menu_memory(): Stack<Function> {
    return menu_memory;
}

/**
 * Basic function that updates the current state of the menu memory
 * and returns it.
 * @param new_memory - The new menu memory that the old should be updated to
 * @returns the updated menu memory.
 */
export function set_menu_memory(new_memory: Stack<Function>): Stack<Function> {
    menu_memory = new_memory;
    return menu_memory;
}

/**
 * Backs the user out in the menu by removing the top of the memory stack and
 * updating the current memory state.
 * @param repeat - The amount of times to go back in the menu
 * @modifies the menu memory by removing the top element of it
 * repeat amount of times.
 */
export function oblivion(repeat: number = 1): undefined {

    for (repeat; repeat > 0; repeat--) {
        if (!is_stack_empty(menu_memory)) {
            menu_memory = pop(menu_memory);
        } else {
            throw new Error("Error removing function from memory stack");
        }
    }

    set_menu_memory(menu_memory);
}

// The menu memory is a stack of functions, where the top of the stack
// is the function referring to the submenu that the user is currently in
let menu_memory: Stack<Function> = empty_stack();
