import {
    type Pair
} from "./lib/list";

/**
 * Tag data type for record type checking.
 */
export type TaggedRecord = {
    tag: string
};

export type NamedRecord = {
    name: string
};

/**
 * Ingredient data type; the main data type of RoR.
 * Contains all ingredient data.
 */
export type Ingredient = {
    tag: "ingredient",
    name: string,
    category: string, // e.g. vegetable, fruit
    allergies: Array<string>,
    measurement: string,
    kcal_per_measurement: number, // to determine portion size
    range: Pair<number, number> // (lower measurement limit, upper measurement limit)
    // nutrition_type: Array<string>, // e.g. vitamin A, protein, fat, carbs
};

/**
 * Ingredient category data type.
 * Contains the available cooking methods of ingredients.
 */
export type Category = {
    tag: "category",
    name: string,
    cooking_methods: Array<Array<string>>,
    max_ingredients: number
};

/**
 * Kitchenware data type.
 * Has an inventory of ingredients currently contained in the kitchenware.
 */
export type KitchenWare = {
    tag: "kitchenware",
    name: string,
    inventory: Array<string>
    cooking_methods: Array<string>
};

/**
 * Check whether the input is of type Ingredient.
 * @param input - argument to check the type of
 * @returns Returns true if the type of the input is Ingredient, and false otherwise.
 */
export function is_ingredient(input: TaggedRecord): input is Ingredient {
    return input.tag === "ingredient";
}

/**
 * Check whether the input is of type Category.
 * @param input - argument to check the type of
 * @returns Returns true if the type of the input is Category, and false otherwise.
 */
export function is_category(input: TaggedRecord): input is Category {
    return input.tag === "category";
}

/**
 * Check whether the input is of type KitchenWare.
 * @param input - argument to check the type of
 * @returns Returns true if the type of the input is KitchenWare, and false otherwise.
 */
export function is_kitchenware(input: TaggedRecord): input is KitchenWare {
    return input.tag === "kitchenware";
}

/**
 * Fetch the name of an Ingredient.
 * @param ingredient - Ingredient to check
 * @returns Returns a string containing the name of ingredient.
 */
export function get_ingredient_name(ingredient: Ingredient): string {
    return ingredient.name;
}

/**
 * Fetch the allergies of an Ingredient.
 * @param ingredient - Ingredient to check
 * @returns Returns an Array containing the allergies that ingredient tests positive for.
 */
export function get_ingredient_allergies(ingredient: Ingredient): Array<string> {
    return ingredient.allergies;
}

/**
 * Fetch the measurement of an Ingredient.
 * @param ingredient - Ingredient to check
 * @returns Returns a string containing the unit of measure used for ingredient.
 */
export function get_ingredient_measurement(ingredient: Ingredient): string {
    return ingredient.measurement;
}

/**
 * Fetch the kcal per measurement of an Ingredient.
 * @param ingredient - Ingredient to check
 * @returns Returns the kcal per measurement for ingredient.
 */
export function get_ingredient_kcal(ingredient: Ingredient): number {
    return ingredient.kcal_per_measurement;
}

/**
 * Fetch the lower and upper kcal limit of an Ingredient.
 * @param ingredient - Ingredient to check
 * @returns Returns a Pair whose head is the lower kcal limit and tail is the upper kcal limit.
 */
export function get_ingredient_kcal_range(ingredient: Ingredient): Pair<number, number> {
    return ingredient.range;
}

/**
 * Fetch the name of a Category from an Ingredient object.
 * @param ingredient - Ingredient to check
 * @returns Returns a string containing the name of the category.
 */
export function get_ingredient_category_name(ingredient: Ingredient): string {
    return ingredient.category;
}

/**
 * Fetch the Category object from Category name.
 * @param ingredient - Ingredient which category is being checked
 * @param category_data - An Array that contains all category data
 * @returns Returns a Category object if one can be found, and undefind otherwise.
 */
export function get_ingredient_category(ingredient: Ingredient, category_data: Array<Category>): Category {
    const cat = ingredient.category;
    for (let i = 0; i < category_data.length; i++) {
        if (category_data[i].name === cat) {
            return category_data[i];
        } else {}
    }

    throw new Error("Error finding category");
}

/**
 * Fetch the name of a Category.
 * @param ingredient - Ingredient to check
 * @returns Returns a string containing the name of the category.
 */
export function get_category_name(category: Category): string {
    return category.name;
}

/**
 * Fetch an Ingredients associated cooking methods based on its category.
 * @param ingredient - Ingredient to check
 * @param category_data - An Array that contains all category data
 * @returns Returns an Array containing the cooking methods as strings.
 */
export function get_ingredient_cooking_methods(ingredient: Ingredient, category_data: Array<Category>): Array<Array<string>> {
    return get_ingredient_category(ingredient, category_data).cooking_methods;
}

/**
 * Fetch the name of a KitchenWare.
 * @param kitchenware - KitchenWare to check
 * @returns Returns a string containing the name of the kitchenware.
 */
export function get_kitchenware_name(kitchenware: KitchenWare): string {
    return kitchenware.name;
}

/**
 * Fetch the inventory of a KitchenWare.
 * @param kitchenware - KitchenWare to check
 * @returns an Array of the Ingredients that are currently in kitchenware's inventory.
 */
export function get_kitchenware_inventory(kitchenware: KitchenWare): Array<string> {
    return kitchenware.inventory;
}

/**
 * Create an IngredientCategory from a name and an Array of cooking methods.
 * @param name - the name of the IngredientCategory to be created
 * @param cooking_methods - an Array containing the available cooking methods for the created category
 * @returns an IngredientCategory with an empty cooking_methods Array.
 */
export function new_category(name: string, cooking_methods: Array<Array<string>>,  max_ingredients: number): Category {
    return { tag: "category", name, cooking_methods, max_ingredients }
}

/**
 * Create a KitchenWare from a name.
 * @param name - the name of the KitchenWare to be created
 * @modifies kitchenware_data by adding the new KitchenWare to the end of it
 * @returns a KitchenWare with an empty inventory.
 */
export function new_kitchenware(name: string, cooking_methods: Array<string>): KitchenWare {
    return { tag: "kitchenware", name, inventory: [], cooking_methods };
}

/**
 * Add an Ingredient to an existing KitchenWare's inventory.
 * @param ingredient - Ingredient that is being added
 * @param kitchenware - Kitchenware to add ingredient to
 * @returns Returns kitchenware with updated inventory.
 */
export function add_ingredient_to_kitchenware(ingredient: Ingredient, kitchenware: KitchenWare): KitchenWare {
    kitchenware.inventory.push(ingredient.name);
    return kitchenware;
}

/**
 * Check whether an Ingredient is vegetarian.
 * @param ingredient - Ingredient to be checked
 * @returns true if ingredient is vegetarian, false otherwise.
 */
export function is_vegetarian(ingredient: Ingredient): boolean {
    return get_ingredient_allergies(ingredient).includes("meat");
}

/**
 * Check whether an Ingredient is vegan.
 * @param ingredient - Ingredient to be checked
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
 * @param ingredient - Ingredient to be checked
 * @returns true if ingredient is lactose_friendly, false otherwise.
 */
export function is_lactose_friendly(ingredient: Ingredient): boolean {
    return get_ingredient_allergies(ingredient).includes("dairy");
}

/**
 * Makes a new ingredient object.
 * @param category - The ingredient's category.
 * @param name - The name of the ingredient.
 * @param allergies - Strings describing allergies/dietary
 * restritions which the ingredient matches (for example dairy for milk).
 * @param measurement - The type of measurement to use for the 
 * ingredient.
 * @param kcal_per_measurement - Number describing kcal per measurement
 * (specified in measurement parameter) of the ingredient.
 * @param range - A pair of numbers describing the lower and upper boundaries,
 * in measurements, of the reasonable amount of the ingredient to have in a
 * portion.
 * @returns An ingredient object.
 */
export function new_ingredient(
    category: string,
    name: string,
    allergies: Array<string>,
    measurement: string,
    kcal_per_measurement: number,
    range: Pair<number, number>
    ): Ingredient {
    return {
        name, category, allergies, measurement, 
        kcal_per_measurement, range, tag: "ingredient"
    };
}

function has_separable_inventory(kw: KitchenWare) {
    if (kw.name === "cutting board" || kw.name === "oven") {
        return true;
    } else {
        return false;
    }
}