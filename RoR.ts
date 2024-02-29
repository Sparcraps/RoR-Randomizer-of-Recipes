import {
    type Ingredient, type Category, type KitchenWare, new_category, 
    new_ingredient, new_kitchenware, has_separable_inventory
} from "./basics";

import {
    RoR_start, print_bold
} from "./input_loop";

import {
    type Pair, head, pair, tail
} from "./lib/list";

import {
    type Queue, empty as qempty, enqueue, head as qhead, dequeue, display_queue
} from "./lib/queue_array";

import {
    save_data, load_data, save_new_category, save_new_ingredient,
    delete_category
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
    is_kw_existing: boolean
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

function new_cooking_step(
    cooking_method: string, ingredient_names: Array<string>,
    kitchenware: KitchenWare,
    is_kw_existing: boolean
    ): CookingStep {
    return {
        cooking_method, ingredient_names, kitchenware, is_kw_existing
    };
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
    let step_nr = 1;
    steps.forEach(step => {
        console.log(
            step_nr + ". " + up_first(step.cooking_method) + " the " +
            ingredient_and_ingredients(step.ingredient_names) + " " +
            stringify_kitchenware(step.kitchenware, step.is_kw_existing)
            );
        step_nr += 1;
    })
    console.log( step_nr + ". " + "Finally, add salt and pepper to taste! :-)");
    console.log("-----------------------------------");
}

function up_first(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
}

function num_rest_of_measurement(measurement: string): Pair<number, string> {
    measurement = measurement.trim().toLowerCase().replace("e", "ε"); // replaces e since parseFloat interprets e as exponent (assumes no measurement includes ε)
    const num = parseFloat(measurement);
    if (isNaN(num)) {
        return [1, measurement];
    } else {
        const length_of_num = num.toString().length;
        const rest = measurement.slice(length_of_num);
        return pair(num, rest.replace("ε", "e"));
    }
}

function stringify_ingredient_info(
    ingredient: Ingredient, amount: number
    ): string {
    const measurement = ingredient.measurement;
    const [num, rest] = num_rest_of_measurement(measurement);
    amount = num * amount;
    if (rest === "" && amount > 1) {
        return amount + " " +
            refer_to_ingredient(ingredient, amount, true);
    } else {
        return amount + rest + " of " + ingredient.name;
    }
}

function stringify_kitchenware(kw: KitchenWare, exists: boolean): string {
    let str = kw.name;
    const vowels = ["e", "u", "i", "o", "a"];
    if (exists) {
        str = "the " + str;
    } else if (vowels.includes(str[0])) {
        str = "an " + str;
    } else {
        str = "a " + str;
    }

    if (kw.name === "cutting board") {
        str = "on " + str;
    } else {
        str = "in " + str;
    }

    return str;
}

function ingredient_and_ingredients(ingredients: Array<string>): string {
    let ingredient_str = ingredients[0];
    const i_amount = ingredients.length;
    if (i_amount > 1) {
        let i = 1;
        for (i; i < i_amount - 1; i++) {
            ingredient_str += ", " + ingredients[i];
        }
        ingredient_str += " and " + ingredients[i];
    } else {}
    return ingredient_str;
}

/**
 * returns ingredient name with correct(ish) conjugation depending on if it
 * should be referred to in plural or not
 * @param {Ingredient} ingredient - ingredient to name.
 * @param {number} amount - amount of the ingredient.
 * @param {boolean} [is_pcs = false] - true if it is already known that 
 * the ingredient is measured in pcs, false as default.
 * @returns A string with conjugated ingredient name
 */
function refer_to_ingredient(
    ingredient: Ingredient, amount: number, is_pcs: boolean = false
    ): string {
    // returns true if ingredient should be referred to in plural,
    // false otherwise.
    function is_plural(): boolean {
        const [num, rest] = num_rest_of_measurement(ingredient.measurement);
        if (rest === "") {
            return true;
        } else {
            return false;
        }
    }
    const name = ingredient.name;
    const s_u_i_o = ["s", "u", "i", "o"];
    
    if (is_pcs || is_plural()) {
        const last_char = name[name.length - 1]
        if (s_u_i_o.includes(last_char)) {
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

export function generate_recipe(
    [min_portion, max_portion]: Pair<number, number>,
    portions: number, filters: Array<string>
    ): Recipe {
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
                ingredient_data.push(
                    ...JSON.parse(JSON.stringify(data.ingredients))
                    ); 
            }
            return randomize_category();
        } else {
            return [cat, ingredient_arr];
        }
    }

    // Returns a random ingredient from an array of ingredients and 
    // removes the ingredient from the array.
    function randomize_ingredient(arr: Array<Ingredient>): Ingredient {
        const ingredient_i =  Math.floor(Math.random() * arr.length);
        const ingredient = arr[ingredient_i];
        arr.splice(ingredient_i, 1);
        return ingredient;
    }

    // Randomizes amount of an ingredient based on its range attribute, 
    // maximum space left in recipe and the portion amount.
    function randomize_ingredient_amount(
        ingredient: Ingredient, max_for_recipe: number, portions: number
        ): number {
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
    // kitchenware, then looks in saved kitchenware, and returns the first one it finds
    // in a pair with a boolean for whether of not the kitchenware was already active.
    // needs to be updated to choose randomly if multiple kitchenware have the cooking method available
    function get_kitchenware_from_method(cooking_method: string): Pair<KitchenWare, boolean> {
        for (let i = 0; i < active_kitchenware.length; i++) {
            const kw = active_kitchenware[i];
            if (kw.cooking_methods.includes(cooking_method)) {
                return pair(kw, true);
            }
        }

        for (let i = 0; i < kitchenware_data.length; i++) {
            const kw = kitchenware_data[i];
            if (kw.cooking_methods.includes(cooking_method)) {
                const copy_kw = JSON.parse(JSON.stringify(kw)); // copies kitchenware if it's from save data
                active_kitchenware.push(copy_kw);
                return pair(copy_kw, false);
            }
        }

        throw new Error("No kitchenware with cooking method " + cooking_method + "exists.");
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
            const max_measures = Math.floor(  // calculate maximum amount of measurements of ingredient that fits in recipe
                (max_kcal - kcal) / kcal_per_measure
                );
            let amount = randomize_ingredient_amount(
                ingredient,max_measures, portions
                );

            if (amount === 0) { // amount can be 0 if max_measures is lower than minimum measures for the ingredient and portion amount.
                continue;
            } else {
                const method = randomize_cooking_method(cat);
                add_method(method, refer_to_ingredient(ingredient, amount));
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
            if (!(method.length === 0)) {
                const more_ingredients = do_similar_methods(method, cooking_steps);
                ingredients.push(...more_ingredients);
                add_cooking_step(method, ingredients, cooking_steps);
            } else {}
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
        method.shift(); // removes current method from method

        let kw_exists = true;
        if (kw === undefined || !kw.cooking_methods.includes(current_method)) {
            [kw, kw_exists] = get_kitchenware_from_method(current_method);
        } else {}

        let extra_i: Array<string> = [];
        if (has_separable_inventory(kw)) {
            extra_i = do_separable_method(current_method);
        } else {}

        const current_step = new_cooking_step(
            current_method, [...ingredient_names, ...extra_i], kw, kw_exists
            );
        steps.push(current_step);

        const more_ingredients = do_similar_methods(method, steps); // finds ingredients that use the same method as the rest of method from some point.
        ingredient_names.push(...more_ingredients);

        return add_cooking_step(method, ingredient_names, steps);
    }

    // for separable kitchenware, finds all ingredients with same cooking method
    // first in method array and returns ingredient names for method step.
    function do_separable_method(method: string): Array<string> {
        const ingredient_names: Array<string> = [];
        for (let i = 0; i < selected_methods.length; i++) {
            const other_method = head(selected_methods[i]);
            const m = other_method[0];
            if (m === method) {
                const names = tail(selected_methods[i]);
                ingredient_names.push(...names); // adds ingredient for matching method to list
                other_method.shift(); // removes method from other_method
            }
        }
        return ingredient_names;
    }

    // finds methods that contain the input method at the end and adds cooking
    // steps for the earlier parts of their methods. 
    // Returns their ingredient names.
    function do_similar_methods(
        method: Array<string>, steps: Array<CookingStep>
        ): Array<string> {
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

    // returns set of all methods that exist in kitchenware data
    function get_doable_cooking_methods(): Set<string> {
        const methods: Set<string> = new Set();
        kitchenware_data.forEach(kw => {
            const kw_methods = kw.cooking_methods;
            kw_methods.forEach(method => methods.add(method));
        });
        return methods;
    }

    // removes all cooking methods with steps that are not doable from
    // category data.
    function filter_cooking_methods(valid_methods: Set<string>): void {
        function is_valid_method(method: Array<string>): boolean {
            let is_valid = true;
            for (let i = 0; i < method.length; i++) {
                const m = method[i];
                if (!valid_methods.has(m)) {
                    is_valid = false
                    break;
                } else {}
            }
            return is_valid;
        }

        for (let i = 0; i < category_data.length; i++ ) {
            const cat = category_data[i];
            cat.cooking_methods = cat.cooking_methods.filter(
                    method => is_valid_method(method)
                );
        }
    }

    const recipe = new_recipe(portions);
    const ingredient_data: Array<Array<Ingredient>> =
        JSON.parse(JSON.stringify(data.ingredients)); // creates copy of save data
    const category_data: Array<Category> =
        JSON.parse(JSON.stringify(data.categories));
    const kitchenware_data: Array<KitchenWare> =
        JSON.parse(JSON.stringify(data.kitchenware));

    filter_ingredients(ingredient_data, filters);
    filter_cooking_methods(get_doable_cooking_methods());
    const active_kitchenware: Array<KitchenWare> = [];
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
