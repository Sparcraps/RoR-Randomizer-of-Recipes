"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var save_load_data_1 = require("../save_load_data");
var ingredients_1 = require("../ingredients");
describe("testing functions to save and load data", function () {
    test("save_data and load_data work", function () {
        var data = (0, save_load_data_1.load_data)();
        (0, save_load_data_1.save_data)(data);
        expect((0, save_load_data_1.load_data)()).toStrictEqual(data);
    });
    test("save_new_ingredient gives error when ingredient name already exists", function () {
        var data = (0, save_load_data_1.load_data)();
        var ingredient_data = data.ingredients;
        if (!(ingredient_data.length === 0)) {
            var console_spy = jest
                .spyOn(console, 'error')
                .mockImplementation(function () { });
            var i = ingredient_data[0][0];
            (0, save_load_data_1.save_new_ingredient)(i);
            expect(console_spy).toHaveBeenCalledWith(new Error("Ingredient with name " + i.name + " already exists."));
        }
        else { }
    });
    test("save_new_category gives error when category name already exists", function () {
        var data = (0, save_load_data_1.load_data)();
        var cats = data.categories;
        if (!(cats.length === 0)) {
            var console_spy = jest
                .spyOn(console, 'error')
                .mockImplementation(function () { });
            var cat = cats[0];
            (0, save_load_data_1.save_new_category)(cat);
            expect(console_spy).toHaveBeenCalledWith(new Error("Category with name " + cat.name + " already exists."));
        }
        else { }
    });
    test("delete_ingredient gives error when ingredient doesn't exist", function () {
        var console_spy = jest.spyOn(console, 'error')
            .mockImplementation(function () { });
        var no_name = "61723801837814017480956710847514859078419";
        (0, save_load_data_1.delete_ingredient)(no_name);
        expect(console_spy).toHaveBeenCalledWith(new Error("There is no saved ingredient with the name " + no_name + "."));
    });
    test("delete_category gives error when category doesn't exist", function () {
        var console_spy = jest.spyOn(console, 'error')
            .mockImplementation(function () { });
        var no_name = "61723801837814017480956710847514859078419";
        (0, save_load_data_1.delete_category)(no_name);
        expect(console_spy).toHaveBeenCalledWith(new Error("There is no saved category with the name " + no_name + "."));
    });
    test("save_new_ingredient and delete_ingredient works on test ingredients", function () {
        var test_category = {
            tag: "category",
            cooking_methods: ["chop", "boil"],
            name: "test category"
        };
        var ti1 = (0, ingredients_1.new_ingredient)("test category", "test ingredient", ["cat"], "liters", 100, [50, 500]);
        var ti2 = (0, ingredients_1.new_ingredient)("test category", "test ingredient 2", ["dog"], "liters", 100, [50, 300]);
        var ti3 = (0, ingredients_1.new_ingredient)("test category", "test ingredient 3", ["snake"], "liters", 100, [20, 300]);
        (0, save_load_data_1.save_new_category)(test_category);
        var saved = (0, save_load_data_1.save_new_ingredient)(ti1, ti2);
        var ingredient_data = saved.ingredients;
        var index = ingredient_data.length - 1;
        var test_arr = ingredient_data[index];
        expect(test_arr).toContainEqual(ti1);
        expect(test_arr).toContainEqual(ti2);
        saved = (0, save_load_data_1.save_new_ingredient)(ti3);
        ingredient_data = saved.ingredients;
        test_arr = ingredient_data[ingredient_data.length - 1];
        expect(test_arr).toContainEqual(ti3);
        saved = (0, save_load_data_1.delete_category)("test category");
        var cats = saved.categories;
        ingredient_data = saved.ingredients;
        expect(cats.length).toBe(index);
        expect(ingredient_data.length).toBe(index);
    });
});
