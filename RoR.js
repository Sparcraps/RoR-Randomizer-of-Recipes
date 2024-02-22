"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kitchenware_data = exports.category_data = exports.ingredient_data = void 0;
var ingredients_1 = require("./ingredients");
exports.ingredient_data = [];
exports.category_data = [];
exports.kitchenware_data = [];
function print_cooking_instructions(ingredients) {
    var len = ingredients.length;
    for (var i = 0; i < len; i++) {
        var printable = (0, ingredients_1.randomize_cooking_instruction)(ingredients[i]);
        console.log(printable);
    }
}
