import {
    type Recipe, type CookingStep, new_ingredient,
    type Ingredient 
} from './basics'
import {
    type Pair, pair
} from "./lib/list";

/**
 * A function to find the ingredient a recipe has the most of in calories.
 * @param ingredients - an array containing pairs of the ingredients and their amounts in calories.
 * @returns the ingredient the recipe has the most of in calories.
 */
function find_highest_amount(ingredients: Array<Pair<Ingredient, 
                                                     number>>): Ingredient {
    let largest = ingredients[0];
    let current: number = ingredients[0][1];
    let i:number = 0;
    for(;i < ingredients.length ; i = i + 1)
    {
        current = ingredients[i][1];
        if(largest[1] <= current)
        {
            largest = ingredients[i];
        }
    }
    return largest[0];
}
/**
 * A function to find the ingredient a recipe has the second most of in calories.
 * @param ingredients - an array containing pairs of the ingredients and their amounts in calories.
 * @returns the ingredient the recipe has the second most of in calories.
 */
function find_second_highest_amount(ingredients: Array<Pair<Ingredient, 
                                                            number>>): Ingredient {
    let largest = ingredients[0];
    let second_largest = ingredients[0];
    let current: number = ingredients[0][1];
    let i = 0;
    for(;i < ingredients.length; i = i + 1)
    {
        current = ingredients[i][1];
        if(largest[1] < current)
        {
            second_largest = largest;
            largest = ingredients[i]
        }
        if(largest[1] > current && second_largest[1] < current)
        {
            second_largest = ingredients[i];
        }
    }
    return second_largest[0];
}
/**
 * a function to find the last cooking step applied to a ingredient.
 * @param cooking_steps - an array of the cookingsteps in the recipe.
 * @param ingredient - an ingredient to the cookingstep must be applied to.
 * @returns the last cooking step applied to the ingredient.
 */
function find_last_cooking_step(cooking_steps: Array<CookingStep>, 
                                ingredient: Ingredient): CookingStep{
    for(let i = cooking_steps.length - 1; i >= 0; i = i - 1)
    {
        if(cooking_steps[i].ingredient_names.includes(ingredient.name))
        {
            return cooking_steps[i];
        }
    }
    return cooking_steps[cooking_steps.length - 1];
}

/**
 * A function to generate a new name based on the ingredients and cooking steps in a recipe.
 * @param a recipe - consisting of ingredients and the cooking steps applied to them.
 * @returns the name generated as a string.
 */
export function generate_name(recipe: Recipe): string {
    const main_ingr = find_highest_amount(recipe.ingredient_info);
    const secondary_ingr = find_second_highest_amount(recipe.ingredient_info);
    const main_cooking_method = find_last_cooking_step(recipe.steps, 
                                                       main_ingr);
    return main_ingr.name + " and " + 
           secondary_ingr.name + " " + 
           main_cooking_method.cooking_method;
}