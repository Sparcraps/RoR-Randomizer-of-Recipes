"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_ingredient = exports.save_new_ingredient = exports.save_ingredients = exports.load_ingredients = void 0;
var ingredients_1 = require("./ingredients");
var fs = require('fs');
var filepath = __dirname + "/ingredient_data.json";
function load_ingredients() {
    var json_ingredients = fs.readFileSync(filepath);
    var ingredient_arr = JSON.parse(json_ingredients);
    return ingredient_arr;
}
exports.load_ingredients = load_ingredients;
function save_ingredients(ingredient_arr) {
    var json_ingredients = JSON.stringify(ingredient_arr, null, 4);
    fs.writeFileSync(filepath, json_ingredients);
}
exports.save_ingredients = save_ingredients;
function save_new_ingredient() {
    var new_ingredients = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        new_ingredients[_i] = arguments[_i];
    }
    var ingredient_arr = load_ingredients();
    new_ingredients.forEach(function (i) {
        var index = (0, ingredients_1.find_ingredient)(i.name, ingredient_arr);
        if (!(index === -1)) {
            console.error(new Error("Ingredient with name " + i.name + " already exists."));
        }
        else {
            ingredient_arr.push(i);
        }
    });
    save_ingredients(ingredient_arr);
    return ingredient_arr;
}
exports.save_new_ingredient = save_new_ingredient;
function delete_ingredient() {
    var names = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        names[_i] = arguments[_i];
    }
    var ingredient_arr = load_ingredients();
    var updated_arr = [];
    for (var i = 0; i < ingredient_arr.length; i++) {
        var ingredient = ingredient_arr[i];
        if (!(names.includes(ingredient.name))) {
            updated_arr.push(ingredient);
        }
        else {
            var name_index = names.indexOf(ingredient.name);
            names.splice(name_index, 1);
        }
        if (names.length === 0) {
            break;
        }
    }
    for (var i = 0; i < names.length; i++) {
        var name_1 = names[i];
        console.error(new Error("There is no saved ingredient with the name " + name_1 + "."));
    }
    save_ingredients(updated_arr);
    return updated_arr;
}
exports.delete_ingredient = delete_ingredient;
