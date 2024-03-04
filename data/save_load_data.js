"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace_ingredient = exports.replace_kitchenware = exports.replace_category = exports.delete_ingredient = exports.delete_kitchenware = exports.delete_category = exports.save_new_ingredient = exports.save_new_kitchenware = exports.save_new_category = exports.save_data = exports.load_data = void 0;
var basics_1 = require("../basics");
var fs = require('fs');
var filepath = __dirname + "/ror_data.json";
/**
 * Creates an empty SaveSata object
 * @returns new SaveData object
 */
function new_save_data() {
    return { categories: [], kitchenware: [], ingredients: [] };
}
/**
 * Reads and returns save data.
 * @returns {SaveData} - Save data object with categories, ingredients and
 * kitchenware.
 */
function load_data() {
    if (fs.existsSync(filepath)) {
        var json_data = fs.readFileSync(filepath);
        var data = JSON.parse(json_data);
        return data;
    }
    else {
        return new_save_data();
    }
}
exports.load_data = load_data;
/**
 * Saves a savedata object to ror_data.json.
 * Note: overwrites existing save data.
 * @param {SaveData} data - Save data to save.
 * @modifies ror_data.json
 */
function save_data(data) {
    var json_data = JSON.stringify(data, null, 4);
    fs.writeFileSync(filepath, json_data);
}
exports.save_data = save_data;
/**
 * Saves any amount of new categories to ror_data.json without removing
 * the file's contents.
 * @param {...Category} new_cats - Optional amount of new categories
 * to save.
 * @modifies ror_data.json
 * @returns {SaveData} - The updated save data.
 */
function save_new_category() {
    var new_cats = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        new_cats[_i] = arguments[_i];
    }
    var data = load_data();
    var cats = data.categories;
    new_cats.forEach(function (cat) {
        cat.name = cat.name.toLowerCase().trim();
        var existing_index = (0, basics_1.find_by_name)(cat.name, cats);
        if (!(existing_index === -1)) {
            console.error(new Error("Category with name " + cat.name + " already exists."));
        }
        else {
            cats.push(cat);
            data.ingredients.push([]);
        }
    });
    save_data(data);
    return data;
}
exports.save_new_category = save_new_category;
/**
 * Saves any amount of new kitchenware to ror_data.json without removing
 * the file's contents.
 * @param {...KitchenWare} new_cats - Optional amount of new kitchenware
 * to save.
 * @modifies ror_data.json
 * @returns {SaveData} - The updated save data.
 */
function save_new_kitchenware() {
    var new_kitch = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        new_kitch[_i] = arguments[_i];
    }
    var data = load_data();
    var saved_kw = data.kitchenware;
    new_kitch.forEach(function (kw) {
        kw.name = kw.name.toLowerCase().trim();
        var existing_index = (0, basics_1.find_by_name)(kw.name, saved_kw);
        if (!(existing_index === -1)) {
            console.error(new Error("Kitchenware with name " + kw.name + " already exists."));
        }
        else {
            saved_kw.push(kw);
        }
    });
    save_data(data);
    return data;
}
exports.save_new_kitchenware = save_new_kitchenware;
/**
 * Saves any amount of new ingredients to ror_data.json without removing
 * the file's contents.
 * @param {...Ingredient} new_ingredients - Optional amount of new ingredients
 * to save.
 * @modifies ror_data.json
 * @returns {SaveData} - The updated save data.
 */
function save_new_ingredient() {
    var new_ingredients = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        new_ingredients[_i] = arguments[_i];
    }
    var data = load_data();
    // Inserts an ingredient into the save data.
    function insert_ingredient(i) {
        var ingredient_data = data.ingredients;
        var category_data = data.categories;
        var cat = i.category;
        var index = (0, basics_1.find_by_name)(cat, category_data);
        if (index === -1) {
            console.error(new Error("Category with name " + cat + "doesn't exist."));
        }
        else {
            ingredient_data[index].push(i);
        }
        return;
    }
    // Checks if ingredient with the name of ingredient exists in save data.
    function is_ingredient_in_data(i) {
        var ingredient_data = data.ingredients;
        var cat_amount = ingredient_data.length;
        var found = false;
        for (var cat_i = 0; cat_i < cat_amount; cat_i++) {
            var ingredient_arr = ingredient_data[cat_i];
            var index = (0, basics_1.find_by_name)(i.name, ingredient_arr);
            if (!(index === -1)) {
                found = true;
                break;
            }
            else { }
        }
        return found;
    }
    new_ingredients.forEach(function (i) {
        i.name = i.name.toLowerCase().trim();
        var is_existing_name = is_ingredient_in_data(i);
        if (is_existing_name) {
            console.error(new Error("Ingredient with name " + i.name + " already exists."));
        }
        else {
            insert_ingredient(i);
        }
    });
    save_data(data);
    return data;
}
exports.save_new_ingredient = save_new_ingredient;
/**
 * Deletes categories with the specified names from ror_data.json and
 * returns the updated save data.
 * @param {...string} names - The sames of the categories to delete.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
function delete_category() {
    var names = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        names[_i] = arguments[_i];
    }
    var data = load_data();
    var cats = data.categories;
    var updated_cats = [];
    var ingredient_data = data.ingredients;
    var updated_ingredients = [];
    var l = cats.length;
    for (var i = 0; i < l; i++) {
        var cat = cats[i];
        if (!(names.includes(cat.name))) {
            updated_cats.push(cat);
            updated_ingredients.push(ingredient_data[i]);
        }
        else {
            var name_index = names.indexOf(cat.name);
            names.splice(name_index, 1);
        }
    }
    for (var i = 0; i < names.length; i++) {
        var name_1 = names[i];
        console.error(new Error("There is no saved category with the name " + name_1 + "."));
    }
    data.ingredients = updated_ingredients;
    data.categories = updated_cats;
    save_data(data);
    return data;
}
exports.delete_category = delete_category;
/**
 * Deletes kitchenware with the specified names from ror_data.json and
 * returns the updated save data.
 * @param {...string} names - The sames of the kitchenware to delete.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
function delete_kitchenware() {
    var names = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        names[_i] = arguments[_i];
    }
    var data = load_data();
    var saved_kw = data.kitchenware;
    var updated_kw = [];
    var l = saved_kw.length;
    for (var i = 0; i < l; i++) {
        var kw = saved_kw[i];
        if (!(names.includes(kw.name))) {
            updated_kw.push(kw);
        }
        else {
            var name_index = names.indexOf(kw.name);
            names.splice(name_index, 1);
        }
    }
    for (var i = 0; i < names.length; i++) {
        var name_2 = names[i];
        console.error(new Error("There is no saved kitchenware with the name " + name_2 + "."));
    }
    data.kitchenware = updated_kw;
    save_data(data);
    return data;
}
exports.delete_kitchenware = delete_kitchenware;
/**
 * Deletes ingredients with the specified name from ror_data.json and
 * returns the updated save data.
 * @param {...string} names - The names of the ingredients to delete.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
function delete_ingredient() {
    var names = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        names[_i] = arguments[_i];
    }
    var data = load_data();
    var ingredient_data = data.ingredients;
    var updated_ingredients = [];
    // Returns array without ingredients with names in names array.
    function delete_from_arr(arr) {
        if (names.length === 0) {
            return arr;
        }
        else {
            var updated_arr = [];
            var l = arr.length;
            for (var i = 0; i < l; i++) {
                var ingredient = arr[i];
                if (!(names.includes(ingredient.name))) {
                    updated_arr.push(ingredient);
                }
                else {
                    var name_index = names.indexOf(ingredient.name);
                    names.splice(name_index, 1);
                }
            }
            return updated_arr;
        }
    }
    ingredient_data.forEach(function (arr) {
        updated_ingredients.push(delete_from_arr(arr));
    });
    for (var i = 0; i < names.length; i++) {
        var name_3 = names[i];
        throw new Error("There is no saved ingredient with the name " + name_3 + ".");
    }
    data.ingredients = updated_ingredients;
    save_data(data);
    return data;
}
exports.delete_ingredient = delete_ingredient;
/**
 * Replaces categories with the same name as input categories in
 * ror_data.json and returns the updated save data.
 * @param {...Category} new_cats - The categories to update with.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
function replace_category() {
    var new_cats = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        new_cats[_i] = arguments[_i];
    }
    var name_arr = [];
    new_cats.forEach(function (cat) {
        name_arr.push(cat.name); // for use by delete_category
    });
    try {
        delete_category.apply(void 0, name_arr);
        var data = save_new_category.apply(void 0, new_cats);
        return data;
    }
    catch (err) {
        throw err;
    }
}
exports.replace_category = replace_category;
/**
 * Replaces kitchenware with the same name as input kitchenware in
 * ror_data.json and returns the updated save data.
 * @param {...KitchenWare} new_kitch - The kitchenware to update with.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
function replace_kitchenware() {
    var new_kitch = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        new_kitch[_i] = arguments[_i];
    }
    var name_arr = [];
    new_kitch.forEach(function (kw) {
        name_arr.push(kw.name); // for use by delete_kitchenware
    });
    try {
        delete_kitchenware.apply(void 0, name_arr);
        var data = save_new_kitchenware.apply(void 0, new_kitch);
        return data;
    }
    catch (err) {
        throw err;
    }
}
exports.replace_kitchenware = replace_kitchenware;
/**
 * Replaces ingredients with the same name as input ingredients in
 * ror_data.json and returns the updated save data.
 * @param {...Ingredient} new_ingredients - The ingredients to update with.
 * @modifies ror_data.json
 * @returns {SaveData} - Updated save data.
 */
function replace_ingredient() {
    var new_ingredients = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        new_ingredients[_i] = arguments[_i];
    }
    var name_arr = [];
    for (var i = 0; i < new_ingredients.length; i++) {
        var cat = new_ingredients[i].category;
        if ((0, basics_1.find_by_name)(cat, load_data().categories) === -1) { // if the category for the new ingredient doesn't exist,
            new_ingredients.splice(i, 1); //save_new_ingredient would not work.
            console.error(new Error("Category with name " + cat + "doesn't exist."));
        }
        else {
            name_arr.push(new_ingredients[i].name); // for use by delete_ingredient
        }
    }
    try {
        delete_ingredient.apply(void 0, name_arr);
        var data = save_new_ingredient.apply(void 0, new_ingredients);
        return data;
    }
    catch (err) {
        throw err;
    }
}
exports.replace_ingredient = replace_ingredient;
