import { Recipe } from "./recipe_generation";
import { type Method, Ingredient, Category } from "../basics"
import { Pair, head, pair, tail } from "../lib/list";
import { SaveData } from "../data/save_load_data";
import { filter_cooking_methods, filter_ingredients } from "./filters";
import { refer_to_ingredient } from "./printing";

/**
 * Randomizes, within kcal range for the recipe,
 * ingredients with amounts and cooking methods for them, and returns
 * the cooking methods and ingredient names.
 * @param {Pair<number>} - a pair of the minimum and maximum amounts of calories
 * per portion for the recipe.
 * @param recipe - empty recipe to randomize for.
 * @modifies recipe
 * @returns {Array<Pair<Method, Array<name>>>} an array of pairs of Method and
 * arrays of ingredient names for which the method should be applied.
 */
export function randomize_ingredients_and_methods(
    [min_portion, max_portion]: Pair<number, number>,
    recipe: Recipe,
    filters: Array<string>,
    data: SaveData
): Array<Pair<Method, Array<string>>> {
    let ingredient_data: Array<Array<Ingredient>> =
        JSON.parse(JSON.stringify(data.ingredients)); // creates copy of save data
    let cat_data: Array<Category> =
        JSON.parse(JSON.stringify(data.categories));

    filter_ingredients(ingredient_data, filters);
    filter_cooking_methods(data.kitchenware, cat_data);

    const min_kcal = min_portion * recipe.portions;
    const max_kcal = max_portion * recipe.portions;
    let kcal = 0;
    const selected_methods: Array<Pair<Method, Array<string>>> = [];

    // Selects a random category from an array of categories and 
    // returns the category and its ingredient array. Removes both and retries
    // if the ingredient array is empty.
    function randomize_category(): Pair<Category, Array<Ingredient>> {
        const cat_i = Math.floor(Math.random() * cat_data.length);
        const cat = cat_data[cat_i];
        if (cat.max_ingredients === 0) {
            return randomize_category();
        } else {
            cat.max_ingredients = cat.max_ingredients - 1;
        }
        const ingredient_arr = ingredient_data[cat_i];
        if (ingredient_arr.length === 0) {
            cat_data.splice(cat_i, 1);
            ingredient_data.splice(cat_i, 1);
            if (ingredient_data.length === 0) { // if all ingredients have already been selected:
                cat_data.push(...data.categories); //reloads data by creating a copies fron saved data
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

    // picks a random cooking method from a Category object
    function randomize_cooking_method(cat: Category): Array<string> {
        const methods = cat.cooking_methods;
        const i = Math.floor(Math.random() * methods.length);
        const cooking_method = methods[i];
        return cooking_method;
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

    while (kcal < min_kcal) {
        const [cat, ingredient_arr] = randomize_category(); // get random category with its ingredients

        const ingredient = randomize_ingredient(ingredient_arr); // randomize ingredient in ingredient array
        const kcal_per_measure = ingredient.kcal_per_measurement;
        const max_measures = Math.floor(  // calculate maximum amount of measurements of ingredient that fits in recipe
            (max_kcal - kcal) / kcal_per_measure
            );
        let amount = randomize_ingredient_amount(
            ingredient, max_measures, recipe.portions
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

    recipe.kcal_per_portion = Math.round((kcal / recipe.portions) / 100) * 100; // roughly calculates kcal per portion for recipe

    return selected_methods;
}