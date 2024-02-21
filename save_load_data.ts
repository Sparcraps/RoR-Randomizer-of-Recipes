import {
    type Ingredient, type Category, type KitchenWare, NamedRecord
} from "./ingredients"

export type SaveData = {
    categories: Array<Category>,
    ingredients: Array<Array<Ingredient>>,
}

const fs = require('fs');
const filepath = __dirname + "/ror_data.json"

/**
 * Returns the index of the specified named object in an array or -1 if 
 * the ingredient is not found.
 * @param {string} name - The name of the object.
 * @param {Array<NamedRecord>} arr - The array to search.
 * @returns {number} - The index of the object in the array or -1 if not
 * found.
 */
export function find_by_name<T>(name: string, arr: Array<NamedRecord>): number {
    const l = arr.length;
    for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];
        if (obj.name === name) {
            return i;
        } else {}
    }
    return -1;
}

/**
 * Reads and returns save data.
 * @returns {SaveData} - Save data object with categories, ingredients and
 * kitchenware.
 */
export function load_data(): SaveData {
    const json_data = fs.readFileSync(filepath);
    const data = JSON.parse(json_data);
    return data;
}

/**
 * Saves a savedata object to ror_data.json.
 * Note: overwrites existing save data.
 * @param {SaveData} data - Save data to save.
 */
export function save_data(data: SaveData): void {
    const json_data = JSON.stringify(data, null, 4);
    fs.writeFileSync(filepath, json_data);
}

/**
 * Saves any amount of new categories to ror_data.json without removing
 * the file's contents.
 * @param {...Category} new_cats - Optional amount of new ingredients
 * to save.
 * @returns {SaveData} - The updated save data.
 */
export function save_new_category(
    ...new_cats: Array<Category>
    ): SaveData {
    const data = load_data();
    const cats = data.categories;

    new_cats.forEach(cat => {
        const existing_index = find_by_name(cat.name, cats);
        if (!(existing_index === -1)) {
            console.error(
                new Error("Category with name " + cat.name + " already exists.")
                );
        } else {
            cats.push(cat);
            data.ingredients.push([]);
        }
    })
    
    save_data(data);
    return data;
}

/**
 * Saves any amount of new ingredients to ror_data.json without removing
 * the file's contents.
 * @param {...Ingredient} new_ingredients - Optional amount of new ingredients
 * to save.
 * @returns {SaveData} - The updated save data.
 */
export function save_new_ingredient(
    ...new_ingredients: Array<Ingredient>
    ): SaveData {
    const data = load_data();

    // Inserts an ingredient into the save data.
    function insert_ingredient(i: Ingredient): void {
        const ingredient_data = data.ingredients;
        const category_data = data.categories;
        const cat = i.category;
        const index = find_by_name(cat, category_data);
        if (index === -1) {
            console.error(
                new Error("Category with name " + cat + "doesn't exist.")
                );
        } else {
            ingredient_data[index].push(i);
        }
        return;
    }

    // Checks if ingredient with the name of ingredient exists in save data.
    function is_ingredient_in_data(i: Ingredient): boolean {
        const ingredient_data = data.ingredients;
        const cat_amount = ingredient_data.length;
        let found = false;
        for (let cat_i = 0; cat_i < cat_amount; cat_i++) {
            const ingredient_arr = ingredient_data[cat_i];
            const index = find_by_name(i.name, ingredient_arr);
            if (!(index === -1)) {
                found = true;
                break;
            } else {}
        }
        return found;
    }

    new_ingredients.forEach(i => {
        const is_existing_name = is_ingredient_in_data(i);
        if (is_existing_name) {
            console.error(
                new Error("Ingredient with name " + i.name + " already exists.")
                );
        } else {
            insert_ingredient(i);
        }
    })
    
    save_data(data);
    return data;
}

/**
 * Deletes categories with the specified names from ror_data.json and
 * returns the updated save data.
 * @param {...string} names - The sames of the categories to delete.
 * @returns {SaveData} - Updated save data.
 */
export function delete_category(...names: Array<string>): SaveData {
    const data = load_data();
    const cats = data.categories;
    const updated_cats: Array<Category> = [];
    const ingredient_data = data.ingredients;
    const updated_ingredients: Array<Array<Ingredient>> = [];

    const l = cats.length;
    for (let i = 0; i < l; i++) {
        const cat = cats[i];

        if (!(names.includes(cat.name))) {
            updated_cats.push(cat);
            updated_ingredients.push(ingredient_data[i]);
        } else {
            const name_index = names.indexOf(cat.name);
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
                "There is no saved category with the name " + name + "."
                ));
    }

    data.ingredients = updated_ingredients;
    data.categories = updated_cats;
    save_data(data);
    return data;
}

/**
 * Deletes ingredients with the specified name from ror_data.json and
 * returns the updated save data.
 * @param {...string} names - The sames of the ingredients to delete.
 * @returns {SaveData} - Updated save data.
 */
export function delete_ingredient(...names: Array<string>): SaveData {
    const data = load_data();
    const ingredient_data = data.ingredients;
    const updated_ingredients: Array<Array<Ingredient>> = [];

    // Returns array without ingredients with names in names array.
    function delete_from_arr(arr: Array<Ingredient>): Array<Ingredient> {
        const updated_arr: Array<Ingredient> = [];
        const l = arr.length;
        for (let i = 0; i < l; i++) {
            const ingredient = arr[i];
    
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
        return updated_arr;
    }

    ingredient_data.forEach(arr => {
        if (names.length === 0) {
            return;
        } else {
            delete_from_arr(arr);
        }
    })
    
    
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        console.error(
            new Error(
                "There is no saved ingredient with the name " + name + "."
                ));
    }

    data.ingredients = updated_ingredients;
    save_data(data);
    return data;
}
