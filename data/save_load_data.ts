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
 * Reads and returns save data.
 * @returns {SaveData} - Save data object with categories, ingredients and
 * kitchenware.
 */
export function load_data(): SaveData {
    if (fs.existsSync(filepath)) {
        const json_data = fs.readFileSync(filepath);
        const data = JSON.parse(json_data);
        return data;
    } else {
        return new_save_data();
    }
}

/**
 * Saves a savedata object to ror_data.json.
 * Note: overwrites existing save data.
 * @param {SaveData} data - Save data to save.
 * @modifies ror_data.json
 */
export function save_data(data: SaveData): void {
    const json_data = JSON.stringify(data, null, 4);
    fs.writeFileSync(filepath, json_data);
}

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
    const data = load_data();
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
    
    save_data(data);
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
    const data = load_data();
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
    
    save_data(data);
    return data;
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
        i.name = i.name.toLowerCase().trim();
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
 * @modifies ror_data.json
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
 * Deletes kitchenware with the specified names from ror_data.json and
 * returns the updated save data.
 * @param {...string} names - The sames of the kitchenware to delete.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
export function delete_kitchenware(...names: Array<string>): SaveData {
    const data = load_data();
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
    save_data(data);
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
    const data = load_data();
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
    save_data(data);
    return data;
}

/**
 * Replaces categories with the same name as input categories in 
 * ror_data.json and returns the updated save data.
 * @param {...Category} new_cats - The categories to update with.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
export function replace_category(
    ...new_cats: Array<Category>
): SaveData {
    const name_arr: Array<string> = [];
    new_cats.forEach(cat => {
        name_arr.push(cat.name); // for use by delete_category
    });

    try {
        delete_category(...name_arr);
        const data = save_new_category(...new_cats);
        return data;
    } catch (err) {
        throw err;
    } 
}

/**
 * Replaces kitchenware with the same name as input kitchenware in 
 * ror_data.json and returns the updated save data.
 * @param {...KitchenWare} new_kitch - The kitchenware to update with.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
export function replace_kitchenware(
    ...new_kitch: Array<KitchenWarey>
): SaveData {
    const name_arr: Array<string> = [];
    new_kitch.forEach(kw => {
        name_arr.push(kw.name); // for use by delete_kitchenware
    });

    try {
        delete_kitchenware(...name_arr);
        const data = save_new_kitchenware(...new_kitch);
        return data;
    } catch (err) {
        throw err;
    } 
}

/**
 * Replaces ingredients with the same name as input ingredients in 
 * ror_data.json and returns the updated save data.
 * @param {...Ingredient} new_ingredients - The ingredients to update with.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
export function replace_ingredient(
    ...new_ingredients: Array<Ingredient>
): SaveData {
    const name_arr: Array<string> = [];
    for (let i = 0; i < new_ingredients.length; i++) {
        const cat = new_ingredients[i].category;
        if (find_by_name(cat, load_data().categories) === -1) { // if the category for the new ingredient doesn't exist,
            new_ingredients.splice(i, 1);                       //save_new_ingredient would not work.
            console.error(                                             
                new Error("Category with name " + cat + "doesn't exist.")
            );                                                         
        } else {
            name_arr.push(new_ingredients[i].name); // for use by delete_ingredient
        }
    }        
                    
    try {
        delete_ingredient(...name_arr);
        const data = save_new_ingredient(...new_ingredients);
        return data;
    } catch (err) {
        throw err;
    } 
}