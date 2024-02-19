"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save_new_ingredient = exports.save_ingredients = exports.load_ingredients = void 0;
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
    try {
        var ingredient_arr_1 = load_ingredients();
        new_ingredients.forEach(function (i) {
            var find = (0, ingredients_1.find_ingredient)(i.name, ingredient_arr_1);
            if (!(find === undefined)) {
                throw new Error("Ingredient with name " + i.name + " already exists.");
            }
            else { }
            ingredient_arr_1.push(i);
        });
        save_ingredients(ingredient_arr_1);
    }
    catch (err) {
        console.error(err);
    }
    return;
}
exports.save_new_ingredient = save_new_ingredient;
