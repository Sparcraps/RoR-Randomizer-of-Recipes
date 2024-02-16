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

export type KitchenWare = {
    tag: "kitchenware",
    name: string,
    inventory: Array<Ingredient>
}



export function is_ingredient(input: TaggedRecord): input is Ingredient {
    return input.tag === "ingredient";    
}
export function get_ingredient_name(ingredient: Ingredient): string {
    return ingredient.name;
}
export function get_ingredient_calories(ingredient: Ingredient): number {
    return ingredient.kcal_per_measurement;
}
export function get_ingredient_cooking_methods(ingredient: Ingredient): Array<string> {
    return ingredient.ingredient_type.cooking_methods;
}
export function get_ingredient_type(ingredient: Ingredient): IngredientCategory {
    return ingredient.ingredient_type;
}
// export function get_ingredient_nutrition_type(ingredient: Ingredient): Array<string> {
//     return ingredient.nutrition_type;
// }

export function is_vegetarian(ingredient: Ingredient): boolean {
    return ingredient.allergies.includes("meat");
}
export function is_vegan(ingredient: Ingredient): boolean {
    return ingredient.ingredient_type.name !== "meat" &&
           ingredient.ingredient_type.name !== "egg" &&
           ingredient.ingredient_type.name !== "dairy";
}
export function is_lactose_friendly(ingredient: Ingredient): boolean {
    return ingredient.ingredient_type.name !== "dairy";
}

export function randomize_cooking_instruction(ingredient: Ingredient): string {
    const method_arr: Array<string> = get_ingredient_cooking_methods(ingredient);
    const len: number = method_arr.length;
    const index = Math.floor(Math.random() * len);
    const randomized = method_arr[index];
    return randomized; 
}

