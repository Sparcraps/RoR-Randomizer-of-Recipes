import {
    type Ingredient, type Category, type KitchenWare, new_category, 
    new_ingredient, new_kitchenware, has_separable_inventory
} from "./basics";
import { RoR_start, print_bold } from "./input_loop";
import { Pair, head, pair, tail } from "./lib/list";

import {
    type Queue, empty as qempty, enqueue, head as qhead, dequeue, display_queue
} from "./lib/queue_array";

import {
    save_data, load_data, save_new_category, save_new_ingredient, delete_category
} from "./save_load_data";

import {
    filter_ingredients
} from "./filter";
import { generate_name } from "./generate_name";

let data = load_data();

type CookingStep = {
    ingredient_names: Array<string>, // array of ingredient names
    cooking_method: string,
    kitchenware: KitchenWare
};

export type Recipe = {
    tag: "recipe",
    name: string,
    portions: number,
    kcal_per_portion: number,
    ingredient_info: Array<Pair<Ingredient, number>>,
    steps: Array<CookingStep>,
};

export function new_recipe(portions: number): Recipe {
    return {
        tag: "recipe", name: "", portions,
        ingredient_info: [], steps: [], kcal_per_portion: 0
    }
}

function new_cooking_step(cooking_method: string, ingredient_names: Array<string>, kitchenware: KitchenWare): CookingStep {
    return {cooking_method, ingredient_names, kitchenware};
}

export function print_recipe(recipe: Recipe): void {
    console.log("-----------------------------------");
    print_bold(recipe.name);
    console.log("-----------------------------------");
    console.log("Portions: " + recipe.portions);
    console.log("Around " + recipe.kcal_per_portion + " kcal per portion.");
    console.log();
    const ingredient_info = recipe.ingredient_info;
    ingredient_info.forEach(p => {
        const [ingredient, amount] = p
        console.log(stringify_ingredient_info(ingredient, amount));
    })
    console.log("-----------------------------------");
    const steps = recipe.steps;
    steps.forEach(step => {
        console.log(step.ingredient_names, ": " + step.cooking_method + in_or_on(step.kitchenware));
    })
    console.log("Add salt and pepper to taste.");
    console.log("-----------------------------------");
}

function stringify_ingredient_info(ingredient: Ingredient, amount: number): string {
    if (ingredient.measurement === "" && amount > 1) {
        return amount + " " + refer_to_ingredient(ingredient, amount);
    } else {
        return amount + ingredient.measurement + " of " + ingredient.name;
    }
}

function in_or_on(kw: KitchenWare): string {
    if (kw.name === "cutting board") {
        return " on " + kw.name;
    } else {
        return " in " + kw.name;
    }
}


/**
 * returns ingredient name with correct(ish) conjugation depending on if it
 *  should be referred to in plural or not
 * @param ingredient - ingredient to name.
 * @param amount - amount of the ingredient.
 * @returns A string with conjugated ingredient name
 */
function refer_to_ingredient(ingredient: Ingredient, amount: number): string {
    const name = ingredient.name;
    const u_i_o = ["u", "i", "o"];
    if (ingredient.measurement === "" && amount > 1) {
        const last_char = name[name.length - 1]
        if (last_char === "s" || u_i_o.includes(last_char)) {
            return name + "es";
        } else if (last_char === "y") {
            return name.slice(0, -1) + "ies";
        } else {
            return name + "s";
        }
    } else {
        return name;
    }
}

export function generate_recipe([min_portion, max_portion]: Pair<number, number>, portions: number, filters: Array<string>): Recipe {
    // Selects a random category from an array of categories and 
    // returns the category and its ingredient array. Removes both and retries
    // if the ingredient array is empty.
    function randomize_category(): Pair<Category, Array<Ingredient>> {
        const cat_i = Math.floor(Math.random() * category_data.length);
        const cat = category_data[cat_i];
        if (cat.max_ingredients === 0) {
            return randomize_category();
        } else {
            cat.max_ingredients = cat.max_ingredients - 1;
        }
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

    // looks for kitchenware with the cooking method in saved kitchenware, 
    // and returns the first one it finds.
    // needs to be updated to choose randomly if multiple kitchenware have the cooking method available
    function get_kitchenware_from_method(cooking_method: string): KitchenWare {
        for (let i = 0; i < kitchenware_data.length; i++) {
            const kw = kitchenware_data[i];
            if (kw.cooking_methods.includes(cooking_method)) {
                return JSON.parse(JSON.stringify(kw)); // copies kitchenware from save data
            }
        }

        throw new Error(
            "No kitchenware with cooking method " + cooking_method + "exists.");
    }

    // adds a pair of selected cooking method and [ingredient] to 
    // selected_methods array, or if the method already exists adds ingredient 
    // to corresponding array in selected_methods
    function add_method(method: Array<string>, ingredient_name: string): void {
        for (let i = 0; i < selected_methods.length; i++) {
            const p = selected_methods[i];
            if (head(p).toString() === method.toString()) { // checks if the method arrays are structurally equal (with same order)
                tail(p).push(ingredient_name);
                return;
            } else {}
        }

        selected_methods.push(pair(method, [ingredient_name]))
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
                add_method(randomize_cooking_method(cat), refer_to_ingredient(ingredient, amount));
                recipe.ingredient_info.push(pair(ingredient, amount));
                kcal += amount * kcal_per_measure;
            }
        }

        recipe.kcal_per_portion = Math.round((kcal / portions) / 100) * 100; // roughly calculates kcal per portion for recipe
    }

    // makes cooking steps from already randomized ingredient info
    function generate_cooking_steps(): Array<CookingStep> {
        const cooking_steps: Array<CookingStep> = [];
        for (let i = 0; i < selected_methods.length; i++) {
            const [method, ingredients] = selected_methods[i];
            const more_ingredients = do_similar_methods(method, cooking_steps);
            ingredients.push(...more_ingredients);
            add_cooking_step(method, ingredients, cooking_steps);
        }
        return cooking_steps;
    }

    // adds cooking step to steps array, removes first element in method, calls
    // recursively until method is empty.
    function add_cooking_step(
        method: Array<string>, ingredient_names: Array<string>, 
        steps: Array<CookingStep>, kw: KitchenWare | undefined = undefined
        ): void {
        if (method.length === 0) {
            return;
        } else {}

        const current_method = method[0];
        if (kw === undefined || !kw.cooking_methods.includes(current_method)) {
            kw = get_kitchenware_from_method(current_method);
        } else {}
        method.shift(); // removes current method from method
        if (has_separable_inventory(kw)) {
            const extra_ingredients = do_separable_method(current_method, kw, steps);
            kw.inventory.push(...extra_ingredients);
        } else {}
        kw.inventory.push(...ingredient_names);
        const more_ingredients = do_similar_methods(method, steps); // finds ingredients that use the same method as the rest of method from some point.
        steps.push(new_cooking_step(current_method, ingredient_names, kw));
        ingredient_names.push(...more_ingredients);
        return add_cooking_step(method, ingredient_names, steps);
    }

    function do_separable_method(method: string, kw: KitchenWare, steps): Array<string> {
        const ingredient_names: Array<string> = []
        for (let i = 0; i < selected_methods.length; i++) {
            const other_method = head(selected_methods[i]);
            for (let j = 0; j < other_method.length - 1; j++) {
                const m = other_method[j];
                if (m === method) {
                    const names = tail(selected_methods[i]);
                    ingredient_names.push(...names); // adds ingredient for matching method to list
                    const rest_of_method = other_method.splice(0, j + 1); // removes methods up to found method from other method array and saves these in another method
                    rest_of_method.pop(); // removes found method
                    add_cooking_step(rest_of_method, names, steps);
                }
            }
        }
        return ingredient_names;
    }

    // finds methods that contain the input method at the end and adds cooking
    // steps for them. Returns their ingredient names.
    function do_similar_methods(method: Array<string>, steps: Array<CookingStep>): Array<string> {
        const ingredient_names: Array<string> = [];
        for (let i = 0; i < selected_methods.length; i++) {
            const other_method = head(selected_methods[i]);
            if (other_method === method) {
                continue;
            } else {}
            const copy_method = [...other_method];
            for (let j = 0; j < other_method.length; j++) {
                if (copy_method.toString() === method.toString()) {
                    const names = tail(selected_methods[i])
                    ingredient_names.push(...names); // adds ingredient for matching method to list
                    other_method.splice(j, method.length); // removes part of other method that matches method
                    add_cooking_step(other_method, names, steps);
                    break;
                } else {
                    copy_method.shift();
                }
            }
        }
        return ingredient_names;
    }

    const recipe = new_recipe(portions);
    const ingredient_data = JSON.parse(JSON.stringify(data.ingredients)); // creates copy of save data
    filter_ingredients(ingredient_data, filters);
    const category_data = JSON.parse(JSON.stringify(data.categories));
    const kitchenware_data = JSON.parse(JSON.stringify(data.kitchenware));
    const selected_methods: Array<Pair<Array<string>, Array<string>>> = [];

    randomize_ingredients_and_methods();
    const steps = generate_cooking_steps();
    recipe.steps = steps;
    try{
        recipe.name = generate_name(recipe);
    } catch (err) {
        console.error(err);
    }
    return recipe;
}

/**
 * Calls generate_recipe, and then print_recipe with the generated recipe.
 */
function recipe_randomization(): void {
    // for testing purposes
    const recipe = generate_recipe(pair(400, 700), 4, []);
    print_recipe(recipe);
}

if (require.main === module) {
    recipe_randomization();
}
