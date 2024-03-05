"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var save_load_data_1 = require("../data/save_load_data");
var basics_1 = require("../basics");
describe("testing functions to save and load data", function () {
    test("save_data, load_data, set_data and get_data work", function () {
        (0, save_load_data_1.load_data)();
        var data = (0, save_load_data_1.get_data)();
        (0, save_load_data_1.set_data)(data);
        (0, save_load_data_1.save_data)();
        (0, save_load_data_1.load_data)();
        expect((0, save_load_data_1.get_data)()).toStrictEqual(data);
    });
    test("save_new_ingredient gives error when ingredient name already exists", function () {
        (0, save_load_data_1.load_data)();
        var data = (0, save_load_data_1.get_data)();
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
        (0, save_load_data_1.load_data)();
        var data = (0, save_load_data_1.get_data)();
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
        try {
            (0, save_load_data_1.delete_ingredient)(no_name);
        }
        catch (err) {
            console.error(err);
        }
        expect(console_spy).toHaveBeenCalledWith(new Error("There is no saved ingredient with the name " + no_name + "."));
    });
    test("delete_category gives error when category doesn't exist", function () {
        var console_spy = jest.spyOn(console, 'error')
            .mockImplementation(function () { });
        var no_name = "61723801837814017480956710847514859078419";
        (0, save_load_data_1.delete_category)(no_name);
        expect(console_spy).toHaveBeenCalledWith(new Error("There is no saved category with the name " + no_name + "."));
    });
    test("functions to save, delete and replace" +
        " work on test ingredients and test category", function () {
        var test_category = (0, basics_1.new_category)("test category", [["chop"], ["boil"]], 10);
        var test_category2 = (0, basics_1.new_category)("test category", [["crush"], ["fry"]], 3);
        var ti1 = (0, basics_1.new_ingredient)("test category", "test ingredient", ["cat"], "liters", 100, [50, 500]);
        var ti2 = (0, basics_1.new_ingredient)("test category", "test ingredient 2", ["dog"], "liters", 100, [50, 300]);
        var ti3 = (0, basics_1.new_ingredient)("test category", "test ingredient 3", ["snake"], "liters", 100, [20, 300]);
        var saved = (0, save_load_data_1.save_new_category)(test_category);
        var cat_data = saved.categories;
        expect(cat_data).toContainEqual(test_category);
        saved = (0, save_load_data_1.save_new_ingredient)(ti1, ti2);
        var ingredient_data = saved.ingredients;
        var index = ingredient_data.length - 1;
        var test_arr = ingredient_data[index];
        expect(test_arr).toContainEqual(ti1);
        expect(test_arr).toContainEqual(ti2);
        saved = (0, save_load_data_1.save_new_ingredient)(ti3);
        ingredient_data = saved.ingredients;
        test_arr = ingredient_data[index];
        expect(test_arr).toContainEqual(ti3);
        saved = (0, save_load_data_1.delete_ingredient)(ti2.name);
        ingredient_data = saved.ingredients;
        test_arr = ingredient_data[index];
        expect(test_arr.some(function (e) { return e.name === "test ingredient 2"; })).toBe(false);
        expect(test_arr).toContainEqual(ti1);
        expect(test_arr).toContainEqual(ti3);
        var ti4 = (0, basics_1.new_ingredient)("test category", "test ingredient", ["air"], "liters", 100, [800, 900]);
        saved = (0, save_load_data_1.replace_ingredient)(ti1.name, ti4);
        ingredient_data = saved.ingredients;
        test_arr = ingredient_data[index];
        expect(test_arr).toContainEqual(ti4);
        expect(test_arr).toContainEqual(ti3);
        saved = (0, save_load_data_1.replace_category)(test_category.name, test_category2);
        cat_data = saved.categories;
        expect(cat_data).toContainEqual(test_category2);
        saved = (0, save_load_data_1.delete_category)("test category");
        var cats = saved.categories;
        ingredient_data = saved.ingredients;
        expect(cats.length).toBe(index);
        expect(ingredient_data.length).toBe(index);
    });
    test("save_new_kitchenware, replace_kitchenware" +
        " and delete_kitchenware work on test kitchenware", function () {
        var name = "test kitchenware";
        var test_kit = (0, basics_1.new_kitchenware)(name, ["fry"]);
        var test_kit2 = (0, basics_1.new_kitchenware)(name, ["chop"]);
        var saved = (0, save_load_data_1.save_new_kitchenware)(test_kit);
        expect(saved.kitchenware).toContainEqual(test_kit);
        saved = (0, save_load_data_1.replace_kitchenware)(test_kit.name, test_kit2);
        expect(saved.kitchenware).toContainEqual(test_kit2);
        saved = (0, save_load_data_1.delete_kitchenware)(name);
        expect(saved.kitchenware.some(function (e) { return e.name === name; })).toBe(false);
    });
});
