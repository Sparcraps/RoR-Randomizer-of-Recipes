import {
    type Ingredient, type Category, type KitchenWare, randomize_cooking_instruction, 
    new_category, new_ingredient, new_kitchenware
} from "./basics";
import { Pair, head, pair, tail } from "./lib/list";

import {
    type Queue, empty as qempty, enqueue, head as qhead, dequeue, display_queue
} from "./lib/queue_array";

import {
    save_data, load_data
} from "./save_load_data";

let data = load_data();

type CookingStep = {
    ingredient: Ingredient,
    cooking_method: string
};

type Recipe = {
    portions: number,
    ingredients: Array<Pair<number, Ingredient>>,
    steps: Queue<CookingStep>,
    kitchenware: Array<KitchenWare>
};

function new_recipe(portions: number): Recipe {
    return {portions, ingredients: [], steps: qempty(), kitchenware: []}
}

function new_cooking_step(cooking_method: string, ingredient: Ingredient): CookingStep {
    return {cooking_method, ingredient};
}

function print_recipe(recipe: Recipe): void {
    console.log("Portions: " + recipe.portions);
    const ingredients = recipe.ingredients;
    ingredients.forEach(p => {
        console.log(head(p) + " " + tail(p).name);
    })

    // const kw = get_kitchenware_from_method(method, recipe, kitchenware_data);
    // kw.inventory.push(ingredient);
    // if (!recipe.kitchenware.includes(kw)) {
    //     recipe.kitchenware.push(kw);
    // } else {}
}

function generate_recipe([min_portion, max_portion]: Pair<number, number>, portions: number, filters: Array<string>): Recipe {
    /**
     * Selects a random category from an array of categories and returns the
     * category and its index.
     * @param cats - Array of categories..
     * @returns A pair of the category index and the category.
     */
    function randomize_category(cats: Array<Category>): Pair<number, Category> {
        const cat_i = Math.floor(Math.random() * cats.length);
        const cat = cats[cat_i];
        return [cat_i, cat];
    }

    /**
     * Returns a random ingredient from an array of ingredients and removes the 
     * ingredient from the array.
     * @param ingredient_arr - The ingredient array to randomize from.
     * @modifies ingrediend_arr by removing the selected ingredient.
     * @returns The selected ingredient
     */
    function randomize_ingredient(ingredient_arr: Array<Ingredient>): Ingredient {
        const ingredient_i =  Math.floor(Math.random() * ingredient_arr.length);
        const ingredient = ingredient_arr[ingredient_i];
        ingredient_arr.splice(ingredient_i, 1);
        return ingredient;
    }

    /**
     * Randomizes amount of an ingredient based on its range attribute.
     * @param ingredient - The ingredient.
     * @param max_for_recipe - The maximum measurements of ingredients that still fits in the recipe
     * @returns An number representing an amount of the ingredient's type of 
     * measurement.
     */
    function randomize_ingredient_amount(ingredient: Ingredient, max_for_recipe: number, portions: number): number {
        let [min, max] = ingredient.range;
        max = Math.min(max, max_for_recipe);
        if (max < min) {
            return 0;
        } else if (max === min) {
            return min;
        } else {
            const amount = Math.floor(Math.random() * (max - min)) + min;
            return amount;
        }
    }

    // needs to be modified to take dependencies of cooking methods into account.
    function randomize_cooking_method(cat: Category): string {
        const methods = cat.cooking_methods;
        const i = Math.floor(Math.random() * methods.length);
        const cooking_method = methods[i];
        return cooking_method;
    }

    // first looks for kitchenware with the cooking method in the recipe's active
    // kitchenware, then looks in saved kitchenware, and returns the first one it finds.
    // needs to be updated to choose randomly if multiple kitchenware have the cooking method available
    export function get_kitchenware_from_method(cooking_method: string, recipe: Recipe, kitchenware_data: Array<KitchenWare>): KitchenWare {
        const active_kw = recipe.kitchenware;
        for (let i = 0; i < active_kw.length; i++) {
            const kw = active_kw[i];
            if (kw.cooking_methods.includes(cooking_method)) {
                return kw;
            }
        }

        for (let i = 0; i < kitchenware_data.length; i++) {
            const kw = kitchenware_data[i];
            if (kw.cooking_methods.includes(cooking_method)) {
                return JSON.parse(JSON.stringify(kw)); // copies kitchenware if it's from save data
            }
        }

        throw new Error("No kitchenware with cooking method " + cooking_method + "exists.");
    }
    
    const recipe = new_recipe(portions);
    const ingredient_data: Array<Array<Ingredient>> = JSON.parse(JSON.stringify(data.ingredients)); // creates copy of save data
    // filter_ingredients(ingredient_data, filters); // future function
    const category_data: Array<Category> = JSON.parse(JSON.stringify(data.categories));
    const kitchenware_data: Array<KitchenWare> = [];

    const min_kcal = min_portion * portions;
    const max_kcal = max_portion * portions;
    let kcal = 0;

    while (kcal < min_kcal) {
        const [i, cat] = randomize_category(category_data); // get random category with its index
        const ingredient_arr = ingredient_data[i]; // get ingredient array for category

        const ingredient = randomize_ingredient(ingredient_arr); // randomize ingredient in ingredient array
        const kcal_per_measure = ingredient.kcal_per_measurement;
        const max_measures = Math.floor((max_kcal - kcal) / kcal_per_measure); // calculate maximum amount of measurements of ingredient that fits in recipe
        let amount = randomize_ingredient_amount(ingredient, max_measures, portions); // randomize ingredient amount

        if (amount === 0) {
            continue;
        } else {
            recipe.ingredients.push(pair(amount, ingredient));
            const method = randomize_cooking_method(cat);
            const step = new_cooking_step(method, ingredient);
            
            enqueue(step, recipe.steps);
        }
        kcal += amount * kcal_per_measure;
    }
    randomize_ingredient
    return recipe;
}

function start_ror(): void {
    const recipe = generate_recipe(pair(400, 700), 4, []);
    print_recipe(recipe);
}

new_category("a category", ["cook", "taste"], 10);
new_kitchenware("cooker", ["cook", "taste"]);
new_ingredient("a category", "tasty ingredient", [], "", 134, [1, 3]);
new_ingredient("a category", "delicious ingredient", [], "", 98, [2, 5]);
new_ingredient("a category", "odd ingredient", [], "", 400, [1, 2]);