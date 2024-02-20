import {
    Ingredient, find_ingredient
} from "./ingredients"

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