import { 
    type Stack, empty as empty_stack, is_empty as is_stack_empty, push, top, pop
} from "./../lib/stack";

let menu_memory: Stack<Function> = empty_stack();

export function get_menu_memory(): Stack<Function> {
    return menu_memory;
}

export function set_menu_memory(stack: Stack<Function>): Stack<Function> {
    menu_memory = stack;
    return menu_memory;
}
