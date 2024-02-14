type TaggedRecord = {
    tag: string
}

export type Ingredient = {
    tag: "ingredient",
    name: string,
    kcal: number,
    cooking_methods: Array<string>,
    ingredient_type: string, // e.g. vegetable, fruit
    nutrition_type: Array<string>, // e.g. vitamin A, protein, fat, carbs

    // dietary restrictions
    vegetarian: boolean,
    vegan: boolean,
    lactose_friendly: boolean,
    gluten_friendly: boolean,
    diabetes_friendly: boolean,
    nut_allergy_friendly: boolean
    
}



export function is_ingredient(input: TaggedRecord): input is Ingredient {
    return input.tag === "ingredient";    
}
export function get_ingredient_name(ingredient: Ingredient): string {
    return ingredient.name;
}
export function get_ingredient_calories(ingredient: Ingredient): number {
    return ingredient.kcal;
}
export function get_ingredient_cooking_methods(ingredient: Ingredient): Array<string> {
    return ingredient.cooking_methods;
}
export function get_ingredient_type(ingredient: Ingredient): string {
    return ingredient.ingredient_type;
}
export function get_ingredient_nutrition_type(ingredient: Ingredient): Array<string> {
    return ingredient.nutrition_type;
}

export function is_vegetarian(ingredient: Ingredient): boolean {
    return ingredient.vegetarian; 
}
export function is_vegan(ingredient: Ingredient): boolean {
    return ingredient.vegan; 
}
export function is_lactose_friendly(ingredient: Ingredient): boolean {
    return ingredient.lactose_friendly; 
}
export function is_gluten_friendly(ingredient: Ingredient): boolean {
    return ingredient.gluten_friendly; 
}
export function is_diabetes_friendly(ingredient: Ingredient): boolean {
    return ingredient.diabetes_friendly; 
}
export function is_nut_allergy_friendly(ingredient: Ingredient): boolean {
    return ingredient.nut_allergy_friendly; 
}

export function randomize_cooking_instruction(ingredient: Ingredient): string {
    const method_arr: Array<string> = get_ingredient_cooking_methods(ingredient);
    const len: number = method_arr.length;
    const index = Math.floor(Math.random() * len);
    const randomized = method_arr[index]
    return randomized; 
}


