import {
    Ingredient, find_ingredient
} from "./ingredients"

const fs = require('fs');
const filepath = __dirname + "/ingredient_data.json"

/**
 * Reads and returns saved ingredients in array.
 * @returns {Array<Ingredient>} - Array of the saved ingredients.
 */
export function load_ingredients(): Array<Ingredient> {
    const json_ingredients = fs.readFileSync(filepath);
    const ingredient_arr = JSON.parse(json_ingredients);
    return ingredient_arr;
}

/**
 * Saves an array of ingredients to ingredient_data.json.
 * Note: overwrites the file's data
 * @param {Array<Ingredient>} ingredient_arr - The array of ingredients to save.
 */
export function save_ingredients(ingredient_arr: Array<Ingredient>): void {
    const json_ingredients = JSON.stringify(ingredient_arr, null, 4);
    fs.writeFileSync(filepath, json_ingredients);
}

/**
 * Saves any amount of new ingredients to ingredient_data.json without removing
 * the file's contents.
 * @param {...Ingredient} new_ingredients - Optional amount of new ingredients
 * to save.
 * @returns {Array<Ingredient>} - The updated ingredient save data.
 */
export function save_new_ingredient(
    ...new_ingredients: Array<Ingredient>
    ): Array<Ingredient> {
    const ingredient_arr = load_ingredients();

    new_ingredients.forEach(i => {
        const index = find_ingredient(i.name, ingredient_arr);
        if (!(index === -1)) {
            console.error(
                new Error("Ingredient with name " + i.name + " already exists.")
                );
        } else {
            ingredient_arr.push(i);
        }
    })
    
    save_ingredients(ingredient_arr);
    return ingredient_arr;
}

/**
 * Deletes an ingredient with the specified name from ingredient_data.json and
 * returns the updated ingredient array.
 * @param {...string} names - The sames of the ingredients to delete.
 * @returns {Array<Ingredient>} - Updated array of ingredients.
 */
export function delete_ingredient(...names: Array<string>): Array<Ingredient> {
    const ingredient_arr = load_ingredients();
    const updated_arr: Array<Ingredient> = [];

    for (let i = 0; i < ingredient_arr.length; i++) {
        const ingredient = ingredient_arr[i];

        if (!(names.includes(ingredient.name))) {
            updated_arr.push(ingredient);
        } else {
            const name_index = names.indexOf(ingredient.name);
            names.splice(name_index, 1);
        }

        if (names.length === 0) {
            break;
        }
    }
    
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        console.error(
            new Error(
                "There is no saved ingredient with the name " + name + "."
                ));
    }

    save_ingredients(updated_arr);
    return updated_arr;
}
