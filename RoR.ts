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
    ingredients: Array<Ingredient>,
    cooking_method: string,
    kitchenware: KitchenWare
};

type Recipe = {
    portions: number,
    kcal_per_portion: number,
    ingredient_info: Array<[Ingredient, number, Array<string>]>,
    steps: Queue<CookingStep>,
    kitchenware: Array<KitchenWare>
};

function new_recipe(portions: number): Recipe {
    return {
        portions, ingredient_info: [], steps: qempty(),
        kitchenware: [], kcal_per_portion: 0
    }
}

function new_cooking_step(cooking_method: string, ingredients: Array<Ingredient>, kitchenware: KitchenWare): CookingStep {
    return {cooking_method, ingredients, kitchenware};
}

function print_recipe(recipe: Recipe): void {
    console.log("Portions: " + recipe.portions);
    console.log("Around " + recipe.kcal_per_portion + "kcal per portion.")
    const ingredient_info = recipe.ingredient_info;
    ingredient_info.forEach(i => {
        console.log(i[1] + " " + i[0].name);
    })

    // const kw = get_kitchenware_from_method(method, recipe, kitchenware_data);
    // kw.inventory.push(ingredient);
    // if (!recipe.kitchenware.includes(kw)) {
    //     recipe.kitchenware.push(kw);
    // } else {}

    console.log();
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

    // first looks for kitchenware with the cooking method in the recipe's active
    // kitchenware, then looks in saved kitchenware, and returns the first one it finds.
    // needs to be updated to choose randomly if multiple kitchenware have the cooking method available
    function get_kitchenware_from_method(cooking_method: string): KitchenWare {
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

            if (amount === 0) {
                continue;
            } else {
                const method = randomize_cooking_method(cat);
                recipe.ingredient_info.push([ingredient, amount, method]);
            }
            kcal += amount * kcal_per_measure;
        }

        recipe.kcal_per_portion = Math.round((kcal / portions) / 100) * 100; // roughly calculates kcal per portion for recipe
    }

    const recipe = new_recipe(portions);
    const ingredient_data: Array<Array<Ingredient>> = JSON.parse(JSON.stringify(data.ingredients)); // creates copy of save data
    // filter_ingredients(ingredient_data, filters); // future function
    const category_data: Array<Category> = JSON.parse(JSON.stringify(data.categories));
    const kitchenware_data: Array<KitchenWare> = [];

    randomize_ingredients_and_methods();
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