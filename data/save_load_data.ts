import {
    type Ingredient, type Category, type KitchenWare, find_by_name
} from "../basics"

export type SaveData = {
    categories: Array<Category>,
    kitchenware: Array<KitchenWare>,
    ingredients: Array<Array<Ingredient>>
};

const fs = require('fs');
const filepath = __dirname + "/ror_data.json";

/**
 * Creates an empty SaveSata object
 * @returns new SaveData object
 */
function new_save_data(): SaveData {
    return {categories: [], kitchenware: [], ingredients: []};
}

/**
 * Returns functions for saving and loading data in a tuple:
 * Function for loading in data from file
 * Function for saving data to file
 * Function to set data variable to a SaveData object
 * Function to get the data variable.
 * @returns Four-tuple of functions for saving and loading data.
 */
function loader(): [
    () => void, () => void, (data: SaveData) => void, () => SaveData
] {
    let data: SaveData;

    // Reads save data from filepath and sets data to the result
    // If file does not exist, creates new data.
    function load(): void {
        if (fs.existsSync(filepath)) {
            const json_data = fs.readFileSync(filepath);
            data = JSON.parse(json_data);
        } else {
            data = new_save_data();
        }
    }

    /**
     * Saves SaveData object from get_data to ror_data.json.
     * Note: overwrites existing save data.
     * @modifies ror_data.json
     */
    function save(): void {
        const json_data = JSON.stringify(data, null, 4);
        fs.writeFileSync(filepath, json_data);
    }

    // Changes data variable to new save data
    function set(new_data: SaveData): void {
        data = new_data;
        return;
    }

    // Returns SaveData from data variable
    function get(): SaveData {
        return data;
    }

    return [load, save, set, get];
}

export const [load_data, save_data, set_data, get_data] = loader();

/**
 * Saves any amount of new categories to ror_data.json without removing
 * the file's contents.
 * @param {...Category} new_cats - Optional amount of new categories
 * to save.
 * @modifies ror_data.json
 * @returns {SaveData} - The updated save data.
 */
export function save_new_category(
    ...new_cats: Array<Category>
    ): SaveData {
    const data = get_data();
    const cats = data.categories;

    new_cats.forEach(cat => {
        cat.name = cat.name.toLowerCase().trim();
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
    
    set_data(data);
    save_data();
    return data;
}

/**
 * Saves any amount of new kitchenware to ror_data.json without removing
 * the file's contents.
 * @param {...KitchenWare} new_cats - Optional amount of new kitchenware
 * to save.
 * @modifies ror_data.json
 * @returns {SaveData} - The updated save data.
 */
export function save_new_kitchenware(
    ...new_kitch: Array<KitchenWare>
    ): SaveData {
    const data = get_data();
    const saved_kw = data.kitchenware;

    new_kitch.forEach(kw => {
        kw.name = kw.name.toLowerCase().trim();
        const existing_index = find_by_name(kw.name, saved_kw);
        if (!(existing_index === -1)) {
            console.error(
                new Error(
                    "Kitchenware with name " + kw.name + " already exists."
                    ));
        } else {
            saved_kw.push(kw);
        }
    })
    
    set_data(data);
    save_data();
    return data;
}

/**
 * Checks if ingredient with name exists in save data.
 * @param name - The name of the ingredient to look for.
 * @returns {boolean} boolean representing whether there is an ingredient with
 * name name in data.
 */
export function is_ingredient_in_data(name: string): boolean {
    const data = get_data();
    const ingredient_data = data.ingredients;
    const cat_amount = ingredient_data.length;
    let found = false;
    for (let cat_i = 0; cat_i < cat_amount; cat_i++) {
        const ingredient_arr = ingredient_data[cat_i];
        const index = find_by_name(name, ingredient_arr);
        if (!(index === -1)) {
            found = true;
            break;
        } else {}
    }
    return found;
}

/**
 * Saves any amount of new ingredients to ror_data.json without removing
 * the file's contents.
 * @param {...Ingredient} new_ingredients - Optional amount of new ingredients
 * to save.
 * @modifies ror_data.json
 * @returns {SaveData} - The updated save data.
 */
export function save_new_ingredient(
    ...new_ingredients: Array<Ingredient>
    ): SaveData {
    const data = get_data();

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

    new_ingredients.forEach(i => {
        i.name = i.name.toLowerCase().trim();
        const is_existing_name = is_ingredient_in_data(i.name);
        if (is_existing_name) {
            console.error(
                new Error("Ingredient with name " + i.name + " already exists.")
                );
        } else {
            insert_ingredient(i);
        }
    })
    
    set_data(data);
    save_data();
    return data;
}

/**
 * Deletes categories with the specified names from ror_data.json and
 * returns the updated save data.
 * @param {...string} names - The sames of the categories to delete.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
export function delete_category(...names: Array<string>): SaveData {
    const data = get_data();
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
    }
    
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        throw new Error(
            "There is no saved category with the name " + name + "."
        );
    }

    data.ingredients = updated_ingredients;
    data.categories = updated_cats;
    set_data(data);
    save_data();
    return data;
}

/**
 * Deletes kitchenware with the specified names from ror_data.json and
 * returns the updated save data.
 * @param {...string} names - The sames of the kitchenware to delete.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
export function delete_kitchenware(...names: Array<string>): SaveData {
    const data = get_data();
    const saved_kw = data.kitchenware;
    const updated_kw: Array<KitchenWare> = [];

    const l = saved_kw.length;
    for (let i = 0; i < l; i++) {
        const kw = saved_kw[i];

        if (!(names.includes(kw.name))) {
            updated_kw.push(kw);
        } else {
            const name_index = names.indexOf(kw.name);
            names.splice(name_index, 1);
        }
    }
    
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        console.error(
            new Error(
                "There is no saved kitchenware with the name " + name + "."
                ));
    }

    data.kitchenware = updated_kw;
    set_data(data);
    save_data();
    return data;
}

/**
 * Deletes ingredients with the specified name from ror_data.json and
 * returns the updated save data.
 * @param {...string} names - The names of the ingredients to delete.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
export function delete_ingredient(...names: Array<string>): SaveData {
    const data = get_data();
    const ingredient_data = data.ingredients;
    const updated_ingredients: Array<Array<Ingredient>> = [];

    // Returns array without ingredients with names in names array.
    function delete_from_arr(arr: Array<Ingredient>): Array<Ingredient> {
        if (names.length === 0) {
            return arr;
        } else {
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
            }
            return updated_arr;
        }
    }

    ingredient_data.forEach(arr => {
            updated_ingredients.push(delete_from_arr(arr));
    });
    
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        throw new Error(
                "There is no saved ingredient with the name " + name + "."
            );
    }

    data.ingredients = updated_ingredients;
    set_data(data);
    save_data();
    return data;
}

/**
 * Replaces categories, with specified name, with input new category in 
 * ror_data.json and returns the updated save data.
 * @param {string} old_name - The name of the category to replace.
 * @param {Category} new_cat - The category to update with.
 * @precondition - if the name of new_cat is not the same as old_name, it cannot
 * be the same as the name of any saved Category.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
export function replace_category(
    old_name: string,
    new_cat: Category
): SaveData {
    try {
        delete_category(old_name);
        const data = save_new_category(new_cat);
        return data;
    } catch (err) {
        throw err;
    } 
}

/**
 * Replaces kitchenware, with specified name, with input new kitchenware in 
 * ror_data.json and returns the updated save data.
 * @param old_name - The name of the kitchenware to replace.
 * @param {KitchenWare} new_kw - The kitchenware to update with.
 * @precondition - if the name of new_kw is not the same as old_name, it cannot
 * be the same as the name of any saved Kitchenware.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
export function replace_kitchenware(
    old_name: string,
    new_kw: KitchenWare
): SaveData {
    try {
        delete_kitchenware(old_name);
        const data = save_new_kitchenware(new_kw);
        return data;
    } catch (err) {
        throw err;
    } 
}

/**
 * Replaces ingredient, with specified name, with input new ingredient in 
 * ror_data.json and returns the updated save data.
 * @param {string} old_ingredient_name - The name of the ingredient to replace.
 * @param {Ingredient} new_ingredient - The ingredient to update with.
 * @precondition - if the name of new_ingredient is not the same as
 * old_ingredient_name, it cannot be the same as the name of any saved
 * Ingredient.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
export function replace_ingredient(
    old_ingredient_name: string,
    new_ingredient: Ingredient
): SaveData {
    const data = get_data();
    const cat = new_ingredient.category;
    const cat_i = find_by_name(cat, data.categories);
    if (cat_i === -1) { // if the category for the new ingredient doesn't exist,        
        throw new Error("Category with name " + cat + "doesn't exist.") //save_new_ingredient would not work.                                                        
    } else {
        try {
            delete_ingredient(old_ingredient_name);
            const data = save_new_ingredient(new_ingredient);
            return data;
        } catch (err) {
            throw err;
        } 
    }     
}