import { Ingredient } from "../basics";
import { Pair, head, pair, tail } from "../lib/list";
import { get_data } from "../data/save_load_data";
import { CookingStep, generate_cooking_steps } from "./cooking_steps";
import { generate_name } from "./generate_name";
import { randomize_ingredients_and_methods } from "./ingredients_methods";
import { print_recipe } from "./printing";

/**
 * Recipe data type.
 * contains an array of ingredients and their calorie amounts
 * and the cooking steps.
 */
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

export function generate_recipe(
    min_max_kcal: Pair<number, number>,
    portions: number, filters: Array<string>,
): Recipe {
    if (tail(min_max_kcal) <= head(min_max_kcal)) {
        throw new Error(
            "Max kcal per portion needs to be larger than min kcal per portion"
        );
    } else {}

    const recipe = new_recipe(portions);

    const selected_methods = randomize_ingredients_and_methods(
        min_max_kcal, recipe, filters
    );

    const steps = generate_cooking_steps(selected_methods);
    recipe.steps = steps;
    try{
        recipe.name = generate_name(recipe);
    } catch (err) {
        console.error(err);
    }
    return recipe;
}

if (require.main === module) {
    const recipe = generate_recipe(pair(900, 700), 4, []);
    print_recipe(recipe);
}
