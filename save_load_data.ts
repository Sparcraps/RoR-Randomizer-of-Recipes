import {
    Ingredient, find_ingredient, new_ingredient
} from "./ingredients"
import { Pair } from "./lib/list"

const fs = require('fs');
const filepath = __dirname + "/ingredient_data.json"

export function load_ingredients(): Array<Ingredient> {
    const json_ingredients = fs.readFileSync(filepath);
    const ingredient_arr = JSON.parse(json_ingredients);
    return ingredient_arr;
}

export function save_ingredients(ingredient_arr: Array<Ingredient>): void {
    const json_ingredients = JSON.stringify(ingredient_arr, null, 4);
    fs.writeFileSync(filepath, json_ingredients);
}

export function save_new_ingredient(...new_ingredients: Array<Ingredient>): void {
    try {
        const ingredient_arr = load_ingredients();

        new_ingredients.forEach(i => {
            const find = find_ingredient(i.name, ingredient_arr);
            if (!(find === undefined)) {
                throw new Error("Ingredient with name " + i.name + " already exists.");
            } else {}
            ingredient_arr.push(i);
        })
        
        save_ingredients(ingredient_arr);

    } catch (err) {
        console.error(err);
    }

    return;
}