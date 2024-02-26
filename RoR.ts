import {
    type Ingredient, type Category, type KitchenWare, new_category, 
    new_ingredient, new_kitchenware
} from "./basics";
import { Pair, head, pair, tail } from "./lib/list";

import {
    type Queue, empty as qempty, enqueue, head as qhead, dequeue, display_queue
} from "./lib/queue_array";

import {
    save_data, load_data, save_new_category, save_new_ingredient
} from "./save_load_data";

let data = load_data();

type CookingStep = {
    ingredient_names: Array<string>, // array of ingredient names
    cooking_method: string,
    kitchenware: KitchenWare
};

type Recipe = {
    portions: number,
    kcal_per_portion: number,
    ingredient_info: Array<Pair<Ingredient, number>>,
    steps: Array<CookingStep>,
};

function new_recipe(portions: number): Recipe {
    return {
        portions, ingredient_info: [], steps: [], kcal_per_portion: 0
    }
}

function new_cooking_step(cooking_method: string, ingredient_names: Array<string>, kitchenware: KitchenWare): CookingStep {
    return {cooking_method, ingredient_names, kitchenware};
}

function print_recipe(recipe: Recipe): void {
    console.log("Portions: " + recipe.portions);
    console.log("Around " + recipe.kcal_per_portion + " kcal per portion.")
    const ingredient_info = recipe.ingredient_info;
    ingredient_info.forEach(p => {
        const [ingredient, amount] = p
        console.log(amount + " " + stringify_ingredient(ingredient, amount));
    })

    console.log();
}

function stringify_ingredient(ingredient: Ingredient, amount: number): string {
    if (ingredient.measurement === "" && amount > 1) {
        return ingredient.name + "s";
    } else {
        return ingredient.name;
    }
}

function generate_recipe([min_portion, max_portion]: Pair<number, number>, portions: number, filters: Array<string>): Recipe {
    // Selects a random category from an array of categories and 
    // returns the category and its ingredient array. Removes both and retries
    // if the ingredient array is empty.
    function randomize_category(): Pair<Category, Array<Ingredient>> {
        const cat_i = Math.floor(Math.random() * category_data.length);
        const cat = category_data[cat_i];
        const ingredient_arr = ingredient_data[cat_i];
        if (ingredient_arr.length === 0) {
            category_data.splice(cat_i, 1);
            ingredient_data.splice(cat_i, 1);
            if (ingredient_data.length === 0) { // if all ingredients have already been selected:
                category_data.push(...data.categories); //reloads data by creating a copies fron saved data
                ingredient_data.push(...JSON.parse(JSON.stringify(data.ingredients))); 
            }
            return randomize_category();
        } else {
            return [cat, ingredient_arr];
        }
    }

    // Returns a random ingredient from an array of ingredients and 
    // removes the ingredient from the array.
    function randomize_ingredient(ingredient_arr: Array<Ingredient>): Ingredient {
        const ingredient_i =  Math.floor(Math.random() * ingredient_arr.length);
        const ingredient = ingredient_arr[ingredient_i];
        ingredient_arr.splice(ingredient_i, 1);
        return ingredient;
    }

    // Randomizes amount of an ingredient based on its range attribute, 
    // maximum space left in recipe and the portion amount.
    function randomize_ingredient_amount(ingredient: Ingredient, max_for_recipe: number, portions: number): number {
        let [min, max] = ingredient.range;
        [min, max] = [min * portions, max * portions];
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
    function randomize_cooking_method(cat: Category): Array<string> {
        const methods = cat.cooking_methods;
        const i = Math.floor(Math.random() * methods.length);
        const cooking_method = methods[i];
        return cooking_method;
    }

    // first looks for kitchenware with the cooking method in the active
    // kitchenware, then looks in saved kitchenware, and returns the first one it finds.
    // needs to be updated to choose randomly if multiple kitchenware have the cooking method available
    function get_kitchenware_from_method(cooking_method: string): KitchenWare {
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

    // adds a pair of selected cooking method and [ingredient] to 
    // selected_methods array, or if the method already exists adds ingredient 
    // to corresponding array in selected_methods
    function add_method(method: Array<string>, ingredient: Ingredient): void {
        for (let i = 0; i < selected_methods.length; i++) {
            const p = selected_methods[i];
            if (head(p).toString() === method.toString()) { // checks if the method arrays are structurally equal (with same order)
                tail(p).push(ingredient.name);
                return;
            } else {}
        }

        selected_methods.push(pair(method, [ingredient.name]))
    }
 
    // randomizes ingredients and cooking methods for them within kcal range for
    // the recipe.
    function randomize_ingredients_and_methods() {
        const min_kcal = min_portion * portions;
        const max_kcal = max_portion * portions;
        let kcal = 0;

        while (kcal < min_kcal) {
            const [cat, ingredient_arr] = randomize_category(); // get random category with its ingredients

            const ingredient = randomize_ingredient(ingredient_arr); // randomize ingredient in ingredient array
            const kcal_per_measure = ingredient.kcal_per_measurement;
            const max_measures = Math.floor((max_kcal - kcal) / kcal_per_measure); // calculate maximum amount of measurements of ingredient that fits in recipe
            let amount = randomize_ingredient_amount(ingredient, max_measures, portions); // randomize ingredient amount

            if (amount === 0) { // amount can be 0 if max_measures is lower than minimum measures for the ingredient and portion amount.
                continue;
            } else {
                add_method(randomize_cooking_method(cat), ingredient);
                recipe.ingredient_info.push(pair(ingredient, amount));
                kcal += amount * kcal_per_measure;
            }
        }

        recipe.kcal_per_portion = Math.round((kcal / portions) / 100) * 100; // roughly calculates kcal per portion for recipe
    }

    // makes cooking steps from already randomized ingredient info
    function generate_cooking_steps() {
        const cooking_steps: Array<CookingStep> = [];

        // selected_methods.forEach(p => {
        //     const [method, ingredient_names] = p;
        //     while (method.length !== 0) {
        //         const kw = get_kitchenware_from_method(method[0]);
        //         kw.inventory.push(...ingredient_names);
        //         if (active_kw.includes(kw)) { // if the kitchenware is already active, there is a cooking step using it.
        //             const step = find_cooking_step(method[0], kw, cooking_steps);
        //             if (step === undefined) {
        //                 step = new_cooking_step(method[0], )
        //             } else {
        //                 step.ingredient_names.push(...ingredient_names);
        //             }
        //         } else {
        //             active_kw.push(kw);
        //         }
        //     }
        // })
    }

    // // Finds first occurence of a cooking step, with the specified method and 
    // // for the specified KitchenWare object, in an array.
    // function find_cooking_step(method: string, kw: KitchenWare, arr: Array<CookingStep>): undefined | CookingStep {
    //     const l = arr.length;
    //     for (let i = 0; i < arr.length; i++) {
    //         const step = arr[i];
    //         if (step.cooking_method === method) {
    //             return step;
    //         } else {}
    //     }
    //     return undefined;
    // }

    function add_cooking_step(step: CookingStep, steps: Array<CookingStep>): void {

    }

    const recipe = new_recipe(portions);
    const ingredient_data = JSON.parse(JSON.stringify(data.ingredients)); // creates copy of save data
    // ingredient_data = filter_ingredients(ingredient_data, filters); // future function
    const category_data = JSON.parse(JSON.stringify(data.categories));
    const kitchenware_data = JSON.parse(JSON.stringify(data.kitchenware));
    const selected_methods: Array<Pair<Array<string>, Array<string>>> = [];
    const active_kw: Array<KitchenWare> = [];

    randomize_ingredients_and_methods();
    // generate_cooking_steps();
    return recipe;
}

function start_ror(): void {
    const recipe = generate_recipe(pair(1000, 1500), 4, []);
    print_recipe(recipe);
}

// save_new_category(new_category("a category", ["cook", "taste"], 10));
// // (new_kitchenware("cooker", ["cook", "taste"]));
// const i1 = new_ingredient("a category", "tasty ingredient", [], "", 134, [1, 3]);
// const i2 = new_ingredient("a category", "delicious ingredient", [], "", 98, [2, 5]);
// const i3 = new_ingredient("a category", "odd ingredient", [], "", 400, [1, 2]);
// data = save_new_ingredient(i1, i2, i3);
start_ror();