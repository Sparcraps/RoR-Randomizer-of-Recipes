"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var save_load_data_1 = require("../save_load_data");
var ingredients_1 = require("../ingredients");
describe("testing functions to save and load data", function () {
    test("save_new_ingredient and load_ingredients works on test ingredients", function () {
        var test_category = {
            tag: "ingredientcategory",
            cooking_methods: ["chop", "boil"],
            name: "test category"
        };
        var ti1 = (0, ingredients_1.new_ingredient)(test_category, "test ingredient", ["cat"], "liters", 100, [50, 500]);
        var ti2 = (0, ingredients_1.new_ingredient)(test_category, "test ingredient 2", ["dog"], "liters", 100, [50, 300]);
        var ti3 = (0, ingredients_1.new_ingredient)(test_category, "test ingredient 3", ["snake"], "liters", 100, [20, 300]);
        (0, save_load_data_1.save_new_ingredient)(ti1, ti2);
        expect((0, save_load_data_1.load_ingredients)()).toStrictEqual([ti1, ti2]);
        (0, save_load_data_1.save_new_ingredient)(ti3);
        expect((0, save_load_data_1.load_ingredients)()).toStrictEqual([ti1, ti2, ti3]);
    });
    test("save_ingredients and load_ingredients work", function () {
        var ingredient_arr = (0, save_load_data_1.load_ingredients)();
        (0, save_load_data_1.save_ingredients)(ingredient_arr);
        expect((0, save_load_data_1.load_ingredients)()).toStrictEqual(ingredient_arr);
    });
    test("save_new_ingredient gives error when ingredient name already exists", function () {
        var ingredient_arr = (0, save_load_data_1.load_ingredients)();
        if (!(ingredient_arr.length === 0)) {
            var consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation(function () { });
            var i = ingredient_arr[0];
            (0, save_load_data_1.save_new_ingredient)(i);
            expect(consoleSpy).toHaveBeenCalledWith(new Error("Ingredient with name " + i.name + " already exists."));
        }
    });
});
