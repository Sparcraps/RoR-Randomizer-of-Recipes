"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ingredients_1 = require("./ingredients");
function load_ingredients() {
    var fs = require('fs');
    var filepath = "./ingredient_data.json";
    var json_ingredients = fs.readFileSync(filepath);
    var ingredient_arr = JSON.parse(json_ingredients);
    return ingredient_arr;
}
function save_ingredients(ingredient_arr) {
    var json_ingredients = JSON.stringify(ingredient_arr, null, 2);
    var fs = require('fs');
    var filepath = "./ingredient_data.json";
    fs.writeFileSync(filepath, json_ingredients);
}
function save_new_ingredients(new_ingredients) {
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
var test_category = {
    tag: "ingredientcategory",
    cooking_methods: ["chop", "boil"],
    name: "test category"
};
try {
    save_new_ingredients([
        (0, ingredients_1.new_ingredient)(test_category, "test ingredient", ["cat"], "liters", 100, [50, 500]),
        (0, ingredients_1.new_ingredient)(test_category, "test ingredient 2", ["dog"], "liters", 100, [50, 300])
    ]);
}
catch (err) {
    console.error(err);
}
