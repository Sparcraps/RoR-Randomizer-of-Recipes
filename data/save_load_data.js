"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace_ingredient = exports.replace_kitchenware = exports.replace_category = exports.delete_ingredient = exports.delete_kitchenware = exports.delete_category = exports.save_new_ingredient = exports.is_ingredient_in_data = exports.save_new_kitchenware = exports.save_new_category = exports.get_data = exports.set_data = exports.save_data = exports.load_data = void 0;
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
 * Returns functions for saving and loading data in a tuple:
 * Function for loading in data from file
 * Function for saving data to file
 * Function to set data variable to a SaveData object
 * Function to get the data variable.
 * @returns Four-tuple of functions for saving and loading data.
 */
function loader() {
    var data;
    // Reads save data from filepath and sets data to the result
    // If file does not exist, creates new data.
    function load() {
        if (fs.existsSync(filepath)) {
            var json_data = fs.readFileSync(filepath);
            data = JSON.parse(json_data);
        }
        else {
            data = new_save_data();
        }
    }
    /**
     * Saves SaveData object from get_data to ror_data.json.
     * Note: overwrites existing save data.
     * @modifies ror_data.json
     */
    function save() {
        var json_data = JSON.stringify(data, null, 4);
        fs.writeFileSync(filepath, json_data);
    }
    // Changes data variable to new save data
    function set(new_data) {
        data = new_data;
        return;
    }
    // Returns SaveData from data variable
    function get() {
        return data;
    }
    return [load, save, set, get];
}
exports.load_data = (_a = loader(), _a[0]), exports.save_data = _a[1], exports.set_data = _a[2], exports.get_data = _a[3];
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
    var data = (0, exports.get_data)();
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
    (0, exports.set_data)(data);
    (0, exports.save_data)();
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
    var data = (0, exports.get_data)();
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
    (0, exports.set_data)(data);
    (0, exports.save_data)();
    return data;
}
exports.save_new_kitchenware = save_new_kitchenware;
/**
 * Checks if ingredient with name exists in save data.
 * @param name - The name of the ingredient to look for.
 * @returns {boolean} boolean representing whether there is an ingredient with
 * name name in data.
 */
function is_ingredient_in_data(name) {
    var data = (0, exports.get_data)();
    var ingredient_data = data.ingredients;
    var cat_amount = ingredient_data.length;
    var found = false;
    for (var cat_i = 0; cat_i < cat_amount; cat_i++) {
        var ingredient_arr = ingredient_data[cat_i];
        var index = (0, basics_1.find_by_name)(name, ingredient_arr);
        if (!(index === -1)) {
            found = true;
            break;
        }
        else { }
    }
    return found;
}
exports.is_ingredient_in_data = is_ingredient_in_data;
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
    var data = (0, exports.get_data)();
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
    new_ingredients.forEach(function (i) {
        i.name = i.name.toLowerCase().trim();
        var is_existing_name = is_ingredient_in_data(i.name);
        if (is_existing_name) {
            console.error(new Error("Ingredient with name " + i.name + " already exists."));
        }
        else {
            insert_ingredient(i);
        }
    });
    (0, exports.set_data)(data);
    (0, exports.save_data)();
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
    var data = (0, exports.get_data)();
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
        throw new Error("There is no saved category with the name " + name_1 + ".");
    }
    data.ingredients = updated_ingredients;
    data.categories = updated_cats;
    (0, exports.set_data)(data);
    (0, exports.save_data)();
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
    var data = (0, exports.get_data)();
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
    (0, exports.set_data)(data);
    (0, exports.save_data)();
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
    var data = (0, exports.get_data)();
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
    (0, exports.set_data)(data);
    (0, exports.save_data)();
    return data;
}
exports.delete_ingredient = delete_ingredient;
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
function replace_category(old_name, new_cat) {
    try {
        delete_category(old_name);
        var data = save_new_category(new_cat);
        return data;
    }
    catch (err) {
        throw err;
    }
}
exports.replace_category = replace_category;
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
function replace_kitchenware(old_name, new_kw) {
    try {
        delete_kitchenware(old_name);
        var data = save_new_kitchenware(new_kw);
        return data;
    }
    catch (err) {
        throw err;
    }
}
exports.replace_kitchenware = replace_kitchenware;
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
function replace_ingredient(old_ingredient_name, new_ingredient) {
    var data = (0, exports.get_data)();
    var cat = new_ingredient.category;
    var cat_i = (0, basics_1.find_by_name)(cat, data.categories);
    if (cat_i === -1) { // if the category for the new ingredient doesn't exist,        
        throw new Error("Category with name " + cat + "doesn't exist."); //save_new_ingredient would not work.                                                        
    }
    else {
        try {
            delete_ingredient(old_ingredient_name);
            var data_1 = save_new_ingredient(new_ingredient);
            return data_1;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.replace_ingredient = replace_ingredient;
