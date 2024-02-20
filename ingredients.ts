import {
    Pair
} from "./lib/list";

/**
 * Tag type for record type checking.
 */
type TaggedRecord = {
    tag: string
}

/**
 * Ingredient data type; the main data type of RoR.
 * Contains all ingredient data.
 */
export type Ingredient = {
    tag: "ingredient",
    name: string,
    ingredient_type: IngredientCategory, // e.g. vegetable, fruit
    allergies: Array<string>,
    history: Array<string>,
    measurement: string,
    kcal_per_measurement: number, // to determine portion size
    range: Pair<number, number> // (lower kcal limit, upper kcal limit)
    // nutrition_type: Array<string>, // e.g. vitamin A, protein, fat, carbs
}

/**
 * Ingredient category data type.
 * Contains the available cooking methods of ingredients.
 */
type IngredientCategory = {
    tag: "ingredientcategory",
    name: string,
    cooking_methods: Array<string>
}

/**
 * Kitchenware data type.
 * Has an inventory of ingredients currently contained in the kitchenware.
 */
type KitchenWare = {
    tag: "kitchenware",
    name: string,
    inventory: Array<Ingredient>
}


function is_ingredient(input: TaggedRecord): input is Ingredient {
    return input.tag === "ingredient";
}
function is_ingredient_category(input: TaggedRecord): input is IngredientCategory {
    return input.tag === "ingredientcategory";
}
function is_kitchenware(input: TaggedRecord): input is KitchenWare {
    return input.tag === "kitchenware";
}

function get_ingredient_name(ingredient: Ingredient): string {
    return ingredient.name;
}
function get_ingredient_allergies(ingredient: Ingredient): Array<string> {
    return ingredient.allergies;
}
function get_ingredient_history(ingredient: Ingredient): Array<string> {
    return ingredient.history;
}
function get_ingredient_measurement(ingredient: Ingredient): string {
    return ingredient.measurement;
}
function get_ingredient_kcal(ingredient: Ingredient): number {
    return ingredient.kcal_per_measurement;
}
function get_ingredient_kcal_range(ingredient: Ingredient): Pair<number, number> {
    return ingredient.range;
}
function get_category_name(ingredient: Ingredient): string {
    return ingredient.ingredient_type.name;
}
function get_ingredient_cooking_methods(ingredient: Ingredient): Array<string> {
    return ingredient.ingredient_type.cooking_methods;
}
function get_kitchenware_inventory(kitchenware: KitchenWare): Array<Ingredient> {
    return kitchenware.inventory;
}

function create_category(name: string): IngredientCategory {
    return { tag: "ingredientcategory", name: name, cooking_methods: [] }
}
function create_kitchenware(name: string): KitchenWare {
    return { tag: "kitchenware", name: name, inventory: [] }
}

function add_to_ingredient_history(ingredient: Ingredient, str: string): Ingredient {
    get_ingredient_history(ingredient).push(str);
    return ingredient;
}
function add_ingredient_to_kitchenware(ingredient: Ingredient, kitchenware: KitchenWare): KitchenWare {
    kitchenware.inventory.push(ingredient);
    return kitchenware;
}
// Not sure if this is going to be used:
// function add_cooking_method_to_ingredient(ingredient: Ingredient, cooking_method: string): Ingredient {
//     ingredient.ingredient_type.cooking_methods.push(cooking_method);
//     return ingredient;
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






export function randomize_cooking_instruction(ingredient: Ingredient): string {
    const method_arr: Array<string> = get_ingredient_cooking_methods(ingredient);
    const len: number = method_arr.length;
    const index = Math.floor(Math.random() * len);
    const randomized = method_arr[index];
    return randomized; 
}


