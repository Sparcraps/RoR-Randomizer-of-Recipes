import {
    randomize_cooking_instruction, type Ingredient, Category, KitchenWare 
} from "./ingredients";

import {
    type Queue, empty, enqueue, head as qhead, dequeue, display_queue
} from "./lib/queue_array";

let ingredient_data: Array<Ingredient> = [];
let category_data: Array<Category> = [];
let kitchenware_data: Array<KitchenWare> = [];

type CookingStep = {
    ingredients: Array<Ingredient>,
    cooking_method: string
}





function print_cooking_instructions(ingredients: Array<Ingredient>): void {
    const len  = ingredients.length;
    for (let i = 0; i < len; i++) {
        const printable = randomize_cooking_instruction(ingredients[i], category_data);
        console.log(printable);
    }
}

