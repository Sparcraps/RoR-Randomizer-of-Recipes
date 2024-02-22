import {
    type Ingredient, type Category, type KitchenWare, randomize_cooking_instruction
} from "./ingredients";

import {
    type Queue, empty, enqueue, head as qhead, dequeue, display_queue
} from "./lib/queue_array";

import {
    save_data, load_data
} from "./save_load_data"

const data = load_data();

let ingredient_data: Array<Array<Ingredient>> = data.ingredients;
let category_data: Array<Category> = data.categories;
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

