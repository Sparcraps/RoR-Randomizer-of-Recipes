import {
    type Pair
} from "./lib/list";

/**
 * Tag data type for record type checking.
 */
export type TaggedRecord = {
    tag: string
}

/**
 * Ingredient data type; the main data type of RoR.
 * Contains all ingredient data.
 */
export type Ingredient = {
    tag: "ingredient",
    name: string,
    category: IngredientCategory, // e.g. vegetable, fruit
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
export type IngredientCategory = {
    tag: "ingredientcategory",
    name: string,
    cooking_methods: Array<string>
}

/**
 * Kitchenware data type.
 * Has an inventory of ingredients currently contained in the kitchenware.
 */
export type KitchenWare = {
    tag: "kitchenware",
    name: string,
    inventory: Array<Ingredient>
}

/**
 * Check whether the input is of type Ingredient.
 * @param input argument to check the type of
 * @returns Returns true if the type of the input is Ingredient, and false otherwise.
 */
export function is_ingredient(input: TaggedRecord): input is Ingredient {
    return input.tag === "ingredient";
}
/**
 * Check whether the input is of type IngredientCategory.
 * @param input argument to check the type of
 * @returns Returns true if the type of the input is IngredientCategory, and false otherwise.
 */
export function is_ingredient_category(input: TaggedRecord): input is IngredientCategory {
    return input.tag === "ingredientcategory";
}
/**
 * Check whether the input is of type KitchenWare.
 * @param input argument to check the type of
 * @returns Returns true if the type of the input is KitchenWare, and false otherwise.
 */
export function is_kitchenware(input: TaggedRecord): input is KitchenWare {
    return input.tag === "kitchenware";
}

/**
 * Fetch the name of an Ingredient.
 * @param ingredient Ingredient to check
 * @returns Returns a string containing the name of ingredient.
 */
export function get_ingredient_name(ingredient: Ingredient): string {
    return ingredient.name;
}
/**
 * Fetch the allergies of an Ingredient.
 * @param ingredient Ingredient to check
 * @returns Returns an Array containing the allergies that ingredient tests positive for.
 */
export function get_ingredient_allergies(ingredient: Ingredient): Array<string> {
    return ingredient.allergies;
}
/**
 * Fetch the history of an Ingredient.
 * @param ingredient Ingredient to check
 * @returns Returns an Array containing the processing that ingredient has been through.
 */
export function get_ingredient_history(ingredient: Ingredient): Array<string> {
    return ingredient.history;
}
/**
 * Fetch the measurement of an Ingredient.
 * @param ingredient Ingredient to check
 * @returns Returns a string containing the unit of measure used for ingredient.
 */
export function get_ingredient_measurement(ingredient: Ingredient): string {
    return ingredient.measurement;
}
/**
 * Fetch the kcal per measurement of an Ingredient.
 * @param ingredient Ingredient to check
 * @returns Returns the kcal per measurement for ingredient.
 */
export function get_ingredient_kcal(ingredient: Ingredient): number {
    return ingredient.kcal_per_measurement;
}
/**
 * Fetch the lower and upper kcal limit of an Ingredient.
 * @param ingredient Ingredient to check
 * @returns Returns a Pair whose head is the lower kcal limit and tail is the upper kcal limit.
 */
export function get_ingredient_kcal_range(ingredient: Ingredient): Pair<number, number> {
    return ingredient.range;
}
/**
 * Fetch the name of an IngredientCategory.
 * @param ingredient Ingredient to check
 * @returns Returns a string containing the name of the category.
 */
export function get_category_name(ingredient: Ingredient): string {
    return ingredient.category.name;
}
/**
 * Fetch an Ingredients associated cooking methods based on its category.
 * @param ingredient Ingredient to check
 * @returns Returns an Array containing the cooking methods as strings.
 */
export function get_ingredient_cooking_methods(ingredient: Ingredient): Array<string> {
    return ingredient.category.cooking_methods;
}
/**
 * Fetch the inventory of a KitchenWare.
 * @param kitchenware KitchenWare to check
 * @returns an Array of the Ingredients that are currently in kitchenware's inventory.
 */
export function get_kitchenware_inventory(kitchenware: KitchenWare): Array<Ingredient> {
    return kitchenware.inventory;
}

/**
 * Create an IngredientCategory from a name.
 * @param name the name of the IngredientCategory to be created
 * @returns an IngredientCategory with an empty cooking_methods Array.
 */
export function new_category(name: string): IngredientCategory {
    return { tag: "ingredientcategory", name: name, cooking_methods: [] }
}
/**
 * Create a KitchenWare from a name.
 * @param name the name of the KitchenWare to be created
 * @returns a KitchenWare with an empty inventory.
 */
export function new_kitchenware(name: string): KitchenWare {
    return { tag: "kitchenware", name: name, inventory: [] }
}

/**
 * Add a string to an Ingredients history.
 * @param ingredient Ingredient whose history is being altered
 * @param str string to be added to history
 * @returns Returns ingredient with updated history.
 */
export function add_to_ingredient_history(ingredient: Ingredient, str: string): Ingredient {
    get_ingredient_history(ingredient).push(str);
    return ingredient;
}
/**
 * Add an Ingredient to an existing KitchenWare's inventory.
 * @param ingredient Ingredient that is being added
 * @param kitchenware Kitchenware to add ingredient to
 * @returns Returns kitchenware with updated inventory.
 */
export function add_ingredient_to_kitchenware(ingredient: Ingredient, kitchenware: KitchenWare): KitchenWare {
    kitchenware.inventory.push(ingredient);
    return kitchenware;
}
// Not sure if this is going to be used:
// function add_cooking_method_to_ingredient(ingredient: Ingredient, cooking_method: string): Ingredient {
//     ingredient.category.cooking_methods.push(cooking_method);
//     return ingredient;
// }

/**
 * Check whether an Ingredient is vegetarian.
 * @param ingredient ingredient to be checked
 * @returns true if ingredient is vegetarian, false otherwise.
 */
export function is_vegetarian(ingredient: Ingredient): boolean {
    return get_ingredient_allergies(ingredient).includes("meat");
}
/**
 * Check whether an Ingredient is vegan.
 * @param ingredient ingredient to be checked
 * @returns true if ingredient is vegan, false otherwise.
 */
export function is_vegan(ingredient: Ingredient): boolean {
    const allergies = get_ingredient_allergies(ingredient);
    return !(allergies.includes("meat")) &&
           !(allergies.includes("egg")) &&
           !(allergies.includes("dairy"));
}
/**
 * Check whether an Ingredient is lactose_friendly.
 * @param ingredient ingredient to be checked
 * @returns true if ingredient is lactose_friendly, false otherwise.
 */
export function is_lactose_friendly(ingredient: Ingredient): boolean {
    return get_ingredient_allergies(ingredient).includes("dairy");
}






export function randomize_cooking_instruction(ingredient: Ingredient): string {
    const method_arr: Array<string> = get_ingredient_cooking_methods(ingredient);
    const len: number = method_arr.length;
    const index = Math.floor(Math.random() * len);
    const randomized = method_arr[index];
    return randomized; 
}


