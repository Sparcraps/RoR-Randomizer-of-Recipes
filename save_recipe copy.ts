import {
    type Recipe
} from "./RoR"

import {
    find_by_name
} from "./basics"

const fs = require('fs');
const filepath = __dirname + "/saved_recipes.json";

/**
 * Reads and returns saved recipes.
 * @returns {Array<Recipe>} - Array of recipe objects.
 */
export function load_recipes(): Array<Recipe> {
    if (fs.existsSync(filepath)) {
        const json_data = fs.readFileSync(filepath);
        const arr = JSON.parse(json_data);
        return arr;
    } else {
        return [];
    }
}

/**
 * Saves an array of recipes to saved_recipes.json.
 * Note: overwrites existing save data.
 * @param {Array<Recipe>} arr - Recipe data to save.
 * @modifies saved_recipes.json
 */
export function save_recipes(arr: Array<Recipe>): void {
    const json_data = JSON.stringify(arr, null, 4);
    fs.writeFileSync(filepath, json_data);
}

/**
 * Saves any amount of new recipes to saved_recipes.json without removing
 * the file's contents.
 * @param {...Recipe} recipes - Optional amount of new recipes to save.
 * @modifies saved_recipes.json
 * @returns {Array<Recipe>} - The updated saved recipe array.
 */
export function save_new_recipe(...recipes: Array<Recipe>): Array<Recipe> {
    const arr = load_recipes();
    recipes.forEach(recipe => {
        let i = find_by_name(recipe.name, arr);
        if (i !== -1) {
            console.log(recipe.name);
            let nr = 2;
            let new_name = "";
            while (i !== -1) {
                new_name = recipe.name + " " + nr.toString();
                console.log(recipe.name, new_name);
                i = find_by_name(new_name, arr);
                nr += 1;
            }
            recipe.name = new_name;
        } else {}
        arr.push(recipe);
    })
    save_recipes(arr);
    return arr;
}

/**
 * Deletes any amount of recipes from saved_recipes.json.
 * @param {...string} recipes - Optional amount of names of recipes to delete.
 * @modifies saved_recipes.json
 * @returns {Array<Recipe>} - The updated saved recipe array.
 */
export function delete_recipe(...recipes: Array<string>): Array<Recipe> {
    const arr = load_recipes();
    recipes.forEach(name => {
        let i = find_by_name(name, arr);
        if (i === -1) {
            console.error(
                new Error("There is no saved recipe with name " + name)
            );
        } else {
            arr.splice(i, 1);
        }
    })
    save_recipes(arr);
    return arr;
}