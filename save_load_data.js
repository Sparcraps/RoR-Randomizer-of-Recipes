"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ingredients_1 = require("./ingredients");
// function read_json_to_array<T>(fd: number): Array<T> {
//     const fs = require('fs');
//     let arr = [];
//     fs.read(fd, (err: Error, buff: Buffer) => {
//         if (err) throw err;
//         const data = buff.toString();
//         arr = JSON.parse(data);
//         console.log(arr);
//     });
//     console.log(arr);
//     return arr;
// }
function save_ingredient(ingredient) {
    var json_ingredient = JSON.stringify(ingredient, null, 2);
    var filename = "./ingredient_data.json";
    var fs = require('fs');
    try {
        fs.open(filename, 'r+', function (err, fd) {
            if (err)
                throw err;
            try {
                var ingredient_arr = [];
                // const ingredient_arr: Array<Ingredient> = read_json_to_array(fd);
                // if (!(find_ingredient(ingredient.name, ingredient_arr) === undefined)) {
                //     console.log("hej");
                //     throw new Error("Error: Ingredient with this name already exists.");
                // } else {}
                ingredient_arr.push(ingredient);
                var json_ingredient_arr = JSON.stringify(ingredient_arr, null, 2);
                fs.write(fd, json_ingredient_arr, 0, function (err) {
                    fs.close(fd);
                    if (err)
                        throw err;
                });
            }
            catch (err) {
                fs.close(fd);
                throw err;
            }
        });
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
    save_ingredient((0, ingredients_1.new_ingredient)(test_category, "test ingredient", ["cat"], "liters", 100, [50, 500]));
}
catch (err) {
    console.error(err);
}
