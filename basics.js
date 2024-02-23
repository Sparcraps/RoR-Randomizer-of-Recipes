"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomize_cooking_instruction = exports.new_ingredient = exports.is_lactose_friendly = exports.is_vegan = exports.is_vegetarian = exports.add_ingredient_to_kitchenware = exports.add_to_ingredient_history = exports.new_kitchenware = exports.new_category = exports.get_kitchenware_inventory = exports.get_kitchenware_name = exports.get_ingredient_cooking_methods = exports.get_category_name = exports.get_ingredient_category = exports.get_ingredient_category_name = exports.get_ingredient_kcal_range = exports.get_ingredient_kcal = exports.get_ingredient_measurement = exports.get_ingredient_history = exports.get_ingredient_allergies = exports.get_ingredient_name = exports.is_kitchenware = exports.is_category = exports.is_ingredient = void 0;
/**
 * Check whether the input is of type Ingredient.
 * @param input - argument to check the type of
 * @returns Returns true if the type of the input is Ingredient, and false otherwise.
 */
function is_ingredient(input) {
    return input.tag === "ingredient";
}
exports.is_ingredient = is_ingredient;
/**
 * Check whether the input is of type Category.
 * @param input - argument to check the type of
 * @returns Returns true if the type of the input is Category, and false otherwise.
 */
function is_category(input) {
    return input.tag === "category";
}
exports.is_category = is_category;
/**
 * Check whether the input is of type KitchenWare.
 * @param input - argument to check the type of
 * @returns Returns true if the type of the input is KitchenWare, and false otherwise.
 */
function is_kitchenware(input) {
    return input.tag === "kitchenware";
}
exports.is_kitchenware = is_kitchenware;
/**
 * Fetch the name of an Ingredient.
 * @param ingredient - Ingredient to check
 * @returns Returns a string containing the name of ingredient.
 */
function get_ingredient_name(ingredient) {
    return ingredient.name;
}
exports.get_ingredient_name = get_ingredient_name;
/**
 * Fetch the allergies of an Ingredient.
 * @param ingredient - Ingredient to check
 * @returns Returns an Array containing the allergies that ingredient tests positive for.
 */
function get_ingredient_allergies(ingredient) {
    return ingredient.allergies;
}
exports.get_ingredient_allergies = get_ingredient_allergies;
/**
 * Fetch the history of an Ingredient.
 * @param ingredient - Ingredient to check
 * @returns Returns an Array containing the processing that ingredient has been through.
 */
function get_ingredient_history(ingredient) {
    return ingredient.history;
}
exports.get_ingredient_history = get_ingredient_history;
/**
 * Fetch the measurement of an Ingredient.
 * @param ingredient - Ingredient to check
 * @returns Returns a string containing the unit of measure used for ingredient.
 */
function get_ingredient_measurement(ingredient) {
    return ingredient.measurement;
}
exports.get_ingredient_measurement = get_ingredient_measurement;
/**
 * Fetch the kcal per measurement of an Ingredient.
 * @param ingredient - Ingredient to check
 * @returns Returns the kcal per measurement for ingredient.
 */
function get_ingredient_kcal(ingredient) {
    return ingredient.kcal_per_measurement;
}
exports.get_ingredient_kcal = get_ingredient_kcal;
/**
 * Fetch the lower and upper kcal limit of an Ingredient.
 * @param ingredient - Ingredient to check
 * @returns Returns a Pair whose head is the lower kcal limit and tail is the upper kcal limit.
 */
function get_ingredient_kcal_range(ingredient) {
    return ingredient.range;
}
exports.get_ingredient_kcal_range = get_ingredient_kcal_range;
/**
 * Fetch the name of a Category from an Ingredient object.
 * @param ingredient - Ingredient to check
 * @returns Returns a string containing the name of the category.
 */
function get_ingredient_category_name(ingredient) {
    return ingredient.category;
}
exports.get_ingredient_category_name = get_ingredient_category_name;
/**
 * Fetch the Category object from Category name.
 * @param ingredient - Ingredient which category is being checked
 * @param category_data - An Array that contains all category data
 * @returns Returns a Category object if one can be found, and undefind otherwise.
 */
function get_ingredient_category(ingredient, category_data) {
    var cat = ingredient.category;
    for (var i = 0; i < category_data.length; i++) {
        if (category_data[i].name === cat) {
            return category_data[i];
        }
        else { }
    }
    throw new Error("Error finding category");
}
exports.get_ingredient_category = get_ingredient_category;
/**
 * Fetch the name of a Category.
 * @param ingredient - Ingredient to check
 * @returns Returns a string containing the name of the category.
 */
function get_category_name(category) {
    return category.name;
}
exports.get_category_name = get_category_name;
/**
 * Fetch an Ingredients associated cooking methods based on its category.
 * @param ingredient - Ingredient to check
 * @param category_data - An Array that contains all category data
 * @returns Returns an Array containing the cooking methods as strings.
 */
function get_ingredient_cooking_methods(ingredient, category_data) {
    return get_ingredient_category(ingredient, category_data).cooking_methods;
}
exports.get_ingredient_cooking_methods = get_ingredient_cooking_methods;
/**
 * Fetch the name of a KitchenWare.
 * @param kitchenware - KitchenWare to check
 * @returns Returns a string containing the name of the kitchenware.
 */
function get_kitchenware_name(kitchenware) {
    return kitchenware.name;
}
exports.get_kitchenware_name = get_kitchenware_name;
/**
 * Fetch the inventory of a KitchenWare.
 * @param kitchenware - KitchenWare to check
 * @returns an Array of the Ingredients that are currently in kitchenware's inventory.
 */
function get_kitchenware_inventory(kitchenware) {
    return kitchenware.inventory;
}
exports.get_kitchenware_inventory = get_kitchenware_inventory;
/**
 * Create an IngredientCategory from a name and an Array of cooking methods.
 * @param name - the name of the IngredientCategory to be created
 * @param cooking_methods - an Array containing the available cooking methods for the created category
 * @returns an IngredientCategory with an empty cooking_methods Array.
 */
function new_category(name, cooking_methods, max_ingredients) {
    return { tag: "category", name: name, cooking_methods: cooking_methods, max_ingredients: max_ingredients };
}
exports.new_category = new_category;
/**
 * Create a KitchenWare from a name.
 * @param name - the name of the KitchenWare to be created
 * @modifies kitchenware_data by adding the new KitchenWare to the end of it
 * @returns a KitchenWare with an empty inventory.
 */
function new_kitchenware(name, cooking_methods) {
    return { tag: "kitchenware", name: name, inventory: [], cooking_methods: cooking_methods };
}
exports.new_kitchenware = new_kitchenware;
/**
 * Add a string to an Ingredients history.
 * @param ingredient - Ingredient whose history is being altered
 * @param str - string to be added to history
 * @returns Returns ingredient with updated history.
 */
function add_to_ingredient_history(ingredient, str) {
    get_ingredient_history(ingredient).push(str);
    return ingredient;
}
exports.add_to_ingredient_history = add_to_ingredient_history;
/**
 * Add an Ingredient to an existing KitchenWare's inventory.
 * @param ingredient - Ingredient that is being added
 * @param kitchenware - Kitchenware to add ingredient to
 * @returns Returns kitchenware with updated inventory.
 */
function add_ingredient_to_kitchenware(ingredient, kitchenware) {
    kitchenware.inventory.push(ingredient);
    return kitchenware;
}
exports.add_ingredient_to_kitchenware = add_ingredient_to_kitchenware;
/**
 * Check whether an Ingredient is vegetarian.
 * @param ingredient - Ingredient to be checked
 * @returns true if ingredient is vegetarian, false otherwise.
 */
function is_vegetarian(ingredient) {
    return get_ingredient_allergies(ingredient).includes("meat");
}
exports.is_vegetarian = is_vegetarian;
/**
 * Check whether an Ingredient is vegan.
 * @param ingredient - Ingredient to be checked
 * @returns true if ingredient is vegan, false otherwise.
 */
function is_vegan(ingredient) {
    var allergies = get_ingredient_allergies(ingredient);
    return !(allergies.includes("meat")) &&
        !(allergies.includes("egg")) &&
        !(allergies.includes("dairy"));
}
exports.is_vegan = is_vegan;
/**
 * Check whether an Ingredient is lactose_friendly.
 * @param ingredient - Ingredient to be checked
 * @returns true if ingredient is lactose_friendly, false otherwise.
 */
function is_lactose_friendly(ingredient) {
    return get_ingredient_allergies(ingredient).includes("dairy");
}
exports.is_lactose_friendly = is_lactose_friendly;
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
function new_ingredient(category, name, allergies, measurement, kcal_per_measurement, range) {
    return {
        name: name,
        category: category,
        allergies: allergies,
        measurement: measurement,
        kcal_per_measurement: kcal_per_measurement,
        range: range,
        tag: "ingredient", history: []
    };
}
exports.new_ingredient = new_ingredient;
function randomize_cooking_instruction(ingredient, category_data) {
    var method_arr = get_ingredient_cooking_methods(ingredient, category_data);
    var len = method_arr.length;
    var index = Math.floor(Math.random() * len);
    var randomized = method_arr[index];
    return randomized;
}
exports.randomize_cooking_instruction = randomize_cooking_instruction;
