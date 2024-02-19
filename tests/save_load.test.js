"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var save_load_data_1 = require("../save_load_data");
var ingredients_1 = require("../ingredients");
describe("testing functions to save and load data", function () {
    test("save_new_ingredient and delete_ingredient works on test ingredients", function () {
        var test_category = {
            tag: "ingredientcategory",
            cooking_methods: ["chop", "boil"],
            name: "test category"
        };
        var ti1 = (0, ingredients_1.new_ingredient)(test_category, "test ingredient", ["cat"], "liters", 100, [50, 500]);
        var ti2 = (0, ingredients_1.new_ingredient)(test_category, "test ingredient 2", ["dog"], "liters", 100, [50, 300]);
        var ti3 = (0, ingredients_1.new_ingredient)(test_category, "test ingredient 3", ["snake"], "liters", 100, [20, 300]);
        var saved = (0, save_load_data_1.save_new_ingredient)(ti1, ti2);
        expect(saved).toContainEqual(ti1);
        expect(saved).toContainEqual(ti2);
        saved = (0, save_load_data_1.save_new_ingredient)(ti3);
        expect((0, save_load_data_1.load_ingredients)()).toContainEqual(ti3);
        saved = (0, save_load_data_1.delete_ingredient)(ti1.name, ti2.name, ti3.name);
        expect(saved).toStrictEqual([]);
    });
    test("save_ingredients and load_ingredients work", function () {
        var ingredient_arr = (0, save_load_data_1.load_ingredients)();
        (0, save_load_data_1.save_ingredients)(ingredient_arr);
        expect((0, save_load_data_1.load_ingredients)()).toStrictEqual(ingredient_arr);
    });
    test("save_new_ingredient gives error when ingredient name already exists", function () {
        var ingredient_arr = (0, save_load_data_1.load_ingredients)();
        if (!(ingredient_arr.length === 0)) {
            var console_spy = jest
                .spyOn(console, 'error')
                .mockImplementation(function () { });
            var i = ingredient_arr[0];
            (0, save_load_data_1.save_new_ingredient)(i);
            expect(console_spy).toHaveBeenCalledWith(new Error("Ingredient with name " + i.name + " already exists."));
        }
    });
    test("delete_ingredient gives error wgen ingredient exists", function () {
        var console_spy = jest.spyOn(console, 'error')
            .mockImplementation(function () { });
        var no_name = "61723801837814017480956710847514859078419";
        (0, save_load_data_1.delete_ingredient)(no_name);
        expect(console_spy).toHaveBeenCalledWith(new Error("There is no saved ingredient with the name " + no_name + "."));
    });
});
