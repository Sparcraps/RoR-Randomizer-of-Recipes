import {
    Pair
} from "./lib/list";

type TaggedRecord = {
    tag: string
}

export type Ingredient = {
    tag: "ingredient",
    name: string,
    ingredient_type: IngredientCategory, // e.g. vegetable, fruit
    allergies: Array<string>,
    history: Array<string>,
    measurement: string,
    kcal_per_measurement: number, // to determine portion size
    range: Pair<number, number> // lower kcal limit, upper kcal limit
    // nutrition_type: Array<string>, // e.g. vitamin A, protein, fat, carbs
}

export type IngredientCategory = {
    tag: "ingredientcategory",
    name: string,
    cooking_methods: Array<string>
}

type KitchenWare = {
    tag: "kitchenware",
    name: string,
    inventory: Array<Ingredient>
}



function is_ingredient(input: TaggedRecord): input is Ingredient {
    return input.tag === "ingredient";    
}
function get_ingredient_name(ingredient: Ingredient): string {
    return ingredient.name;
}
function get_ingredient_calories(ingredient: Ingredient): number {
    return ingredient.kcal_per_measurement;
}
function get_ingredient_cooking_methods(ingredient: Ingredient): Array<string> {
    return ingredient.ingredient_type.cooking_methods;
}
function get_ingredient_type(ingredient: Ingredient): IngredientCategory {
    return ingredient.ingredient_type;
}
// export function get_ingredient_nutrition_type(ingredient: Ingredient): Array<string> {
//     return ingredient.nutrition_type;
// }

function is_vegetarian(ingredient: Ingredient): boolean {
    return ingredient.allergies.includes("meat");
}
function is_vegan(ingredient: Ingredient): boolean {
    return ingredient.ingredient_type.name !== "meat" &&
           ingredient.ingredient_type.name !== "egg" &&
           ingredient.ingredient_type.name !== "dairy";
}
function is_lactose_friendly(ingredient: Ingredient): boolean {
    return ingredient.ingredient_type.name !== "dairy";
}

/**
 * Returns the ingredient with specified name in an array or undefined 
 * if the ingredient is not found.
 * @param {string} name - The name of the ingredient.
 * @param {Array<Ingredient>} arr - The ingredient array to search.
 * @returns {number} - The ingredient with the name in the array or undefined 
 * if not found.
 */
export function get_ingredient(name: string, arr: Array<Ingredient>): Ingredient | undefined {
    const l = arr.length;
    for (let i = 0; i < arr.length; i++) {
        const ingredient = arr[i];
        if (ingredient.name === name) {
            return ingredient;
        } else {}
    }
    return undefined;
}

/**
 * Returns the index of the specified ingredient in an array or -1 if 
 * the ingredient is not found.
 * @param {string} name - The name of the ingredient.
 * @param {Array<Ingredient>} arr - The ingredient array to search.
 * @returns {number} - The index of the ingredient in the array or -1 if not
 * found.
 */
export function find_ingredient(name: string, arr: Array<Ingredient>): number {
    const l = arr.length;
    for (let i = 0; i < arr.length; i++) {
        const ingredient = arr[i];
        if (ingredient.name === name) {
            return i;
        } else {}
    }
    return -1;
}

/**
 * Makes a new ingredient object.
 * @param {IngredientCategory} ingredient_type - The ingredient's category.
 * @param {string} name - The name of the ingredient.
 * @param {Array<string>} allergies - Strings describing allergies/dietary
 * restritions which the ingredient matches (for example dairy for milk).
 * @param {string} measurement - The type of measurement to use for the 
 * ingredient.
 * @param {number} kcal_per_measurement - Number describing kcal per measurement
 * (specified in measurement parameter) of the ingredient.
 * @param {Pair<number>} range - A pair of numbers describing the lower and
 * upper boundaries of the reasonable amount of the ingredient to have in a
 * portion.
 * @returns {Ingredient} - Ingredient object.
 */
export function new_ingredient(ingredient_type: IngredientCategory, 
    name: string,
    allergies: Array<string>, 
    measurement: string, 
    kcal_per_measurement: number, 
    range: Pair<number, number>): Ingredient {
return {
name, ingredient_type, allergies, measurement, 
kcal_per_measurement, range, tag: "ingredient", history: []
};
}




export function randomize_cooking_instruction(ingredient: Ingredient): string {
    const method_arr: Array<string> = get_ingredient_cooking_methods(ingredient);
    const len: number = method_arr.length;
    const index = Math.floor(Math.random() * len);
    const randomized = method_arr[index];
    return randomized; 
}
