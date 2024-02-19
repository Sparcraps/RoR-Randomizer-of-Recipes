import {
    Ingredient, IngredientCategory, new_ingredient, find_ingredient
} from "./ingredients"
import { Pair } from "./lib/list"

function load_ingredients(): Array<Ingredient> {
    const fs = require('fs');
    const filepath = "./ingredient_data.json"
    const json_ingredients = fs.readFileSync(filepath);
    const ingredient_arr = JSON.parse(json_ingredients);
    return ingredient_arr;
}

function save_ingredients(ingredient_arr: Array<Ingredient>): void {
    const json_ingredients = JSON.stringify(ingredient_arr, null, 2);
    const fs = require('fs');
    const filepath = "./ingredient_data.json"
    fs.writeFileSync(filepath, json_ingredients);
}

function save_new_ingredients(new_ingredients: Array<Ingredient>): void {
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

const test_category: IngredientCategory = {
    tag: "ingredientcategory", 
    cooking_methods: ["chop", "boil"],
    name: "test category"
};

try {
    save_new_ingredients([
        new_ingredient(test_category, "test ingredient", ["cat"], "liters", 100, [50, 500]),
        new_ingredient(test_category, "test ingredient 2", ["dog"], "liters", 100, [50, 300])
    ]);
} catch (err) {
    console.error(err);
}