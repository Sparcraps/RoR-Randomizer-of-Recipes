"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_recipe = exports.save_new_recipe = exports.save_recipes = exports.load_recipes = void 0;
var basics_1 = require("./basics");
var fs = require('fs');
var filepath = __dirname + "/saved_recipes.json";
/**
 * Reads and returns saved recipes.
 * @returns {Array<Recipe>} - Array of recipe objects.
 */
function load_recipes() {
    if (fs.existsSync(filepath)) {
        var json_data = fs.readFileSync(filepath);
        var arr = JSON.parse(json_data);
        return arr;
    }
    else {
        return [];
    }
}
exports.load_recipes = load_recipes;
/**
 * Saves an array of recipes to saved_recipes.json.
 * Note: overwrites existing save data.
 * @param {Array<Recipe>} arr - Recipe data to save.
 * @modifies saved_recipes.json
 */
function save_recipes(arr) {
    var json_data = JSON.stringify(arr, null, 4);
    fs.writeFileSync(filepath, json_data);
}
exports.save_recipes = save_recipes;
/**
 * Saves any amount of new recipes to saved_recipes.json without removing
 * the file's contents.
 * @param {...Recipe} recipes - Optional amount of new recipes to save.
 * @modifies saved_recipes.json
 * @returns {Array<Recipe>} - The updated saved recipe array.
 */
function save_new_recipe() {
    var recipes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        recipes[_i] = arguments[_i];
    }
    var arr = load_recipes();
    recipes.forEach(function (recipe) {
        var i = (0, basics_1.find_by_name)(recipe.name, arr);
        if (i !== -1) {
            var nr = 2;
            var new_name = "";
            while (i !== -1) {
                new_name = recipe.name + " " + nr.toString();
                i = (0, basics_1.find_by_name)(new_name, arr);
                nr += 1;
            }
            recipe.name = new_name;
        }
        else { }
        arr.push(recipe);
    });
    save_recipes(arr);
    return arr;
}
exports.save_new_recipe = save_new_recipe;
/**
 * Deletes any amount of recipes from saved_recipes.json.
 * @param {...string} recipes - Optional amount of names of recipes to delete.
 * @modifies saved_recipes.json
 * @returns {Array<Recipe>} - The updated saved recipe array.
 */
function delete_recipe() {
    var recipes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        recipes[_i] = arguments[_i];
    }
    var arr = load_recipes();
    recipes.forEach(function (name) {
        var i = (0, basics_1.find_by_name)(name, arr);
        if (i === -1) {
            console.error(new Error("There is no saved recipe with name " + name));
        }
        else {
            arr.splice(i, 1);
        }
    });
    save_recipes(arr);
    return arr;
}
exports.delete_recipe = delete_recipe;
