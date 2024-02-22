"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var basics_1 = require("../basics");
var list_1 = require("../lib/list");
describe('testing basic ingredients.ts functions', function () {
    var tagged_record = { tag: "" };
    var test_ingredient_meat = {
        tag: "ingredient",
        name: "beef",
        category: "meat",
        allergies: ["meat"],
        history: ["slice"],
        measurement: "g",
        kcal_per_measurement: 2.5,
        range: (0, list_1.pair)(250, 2500)
    };
    var test_ingredient_vegan = {
        tag: "ingredient",
        name: "water",
        category: "liquid",
        allergies: [],
        history: ["boil"],
        measurement: "ml",
        kcal_per_measurement: 1,
        range: (0, list_1.pair)(10, 100)
    };
    var test_ingredient_lactose = {
        tag: "ingredient",
        name: "milk",
        category: "liquid",
        allergies: ["lactose", "dairy"],
        history: ["boil"],
        measurement: "ml",
        kcal_per_measurement: 1,
        range: (0, list_1.pair)(10, 100)
    };
    var test_category = {
        tag: "category",
        name: "meat",
        cooking_methods: ["fry"]
    };
    var test_kitchenware = {
        tag: "kitchenware",
        name: "frying pan",
        inventory: [test_ingredient_meat]
    };
    var category_data = [test_category];
    test('function is_ingredient works', function () {
        expect((0, basics_1.is_ingredient)(test_ingredient_meat)).toBe(true);
        expect((0, basics_1.is_ingredient)(test_ingredient_vegan)).toBe(true);
        expect((0, basics_1.is_ingredient)(test_category)).toBe(false);
        expect((0, basics_1.is_ingredient)(test_kitchenware)).toBe(false);
    });
    test('function is_ingredient_category works', function () {
        expect((0, basics_1.is_category)(test_ingredient_meat)).toBe(false);
        expect((0, basics_1.is_category)(test_category)).toBe(true);
        expect((0, basics_1.is_category)(test_kitchenware)).toBe(false);
    });
    test('function is_kitchenware works', function () {
        expect((0, basics_1.is_kitchenware)(test_ingredient_meat)).toBe(false);
        expect((0, basics_1.is_kitchenware)(test_category)).toBe(false);
        expect((0, basics_1.is_kitchenware)(test_kitchenware)).toBe(true);
    });
    test('function get_ingredient_name works', function () {
        expect((0, basics_1.get_ingredient_name)(test_ingredient_meat)).toStrictEqual("beef");
    });
    test('function get_ingredient_allergies works', function () {
        expect((0, basics_1.get_ingredient_allergies)(test_ingredient_meat)).toEqual(["meat"]);
    });
    test('function get_ingredient_history works', function () {
        expect((0, basics_1.get_ingredient_history)(test_ingredient_meat)).toEqual(["slice"]);
    });
    test('function get_ingredient_measurement works', function () {
        expect((0, basics_1.get_ingredient_measurement)(test_ingredient_meat)).toStrictEqual("g");
    });
    test('function get_ingredient_kcal works', function () {
        expect((0, basics_1.get_ingredient_kcal)(test_ingredient_meat)).toStrictEqual(2.5);
    });
    test('function get_ingredient_kcal_range works', function () {
        expect((0, basics_1.get_ingredient_kcal_range)(test_ingredient_meat)).toStrictEqual((0, list_1.pair)(250, 2500));
    });
    test('function get_ingredient_category_name works', function () {
        expect((0, basics_1.get_ingredient_category_name)(test_ingredient_meat)).toEqual("meat");
    });
    test('function get_ingredient_category works', function () {
        expect((0, basics_1.get_ingredient_category)(test_ingredient_meat, category_data)).toStrictEqual(test_category);
    });
    test('function get_category_name works', function () {
        expect((0, basics_1.get_category_name)(test_category)).toStrictEqual("meat");
    });
    test('function get_ingredient_cooking_methods works', function () {
        expect((0, basics_1.get_ingredient_cooking_methods)(test_ingredient_meat, category_data)).toStrictEqual(["fry"]);
    });
    test('function get_kitchenware_inventory works', function () {
        expect((0, basics_1.get_kitchenware_inventory)(test_kitchenware)).toStrictEqual([test_ingredient_meat]);
    });
    test('function new_category works', function () {
        var RoR_cat = (0, basics_1.new_category)("The best category ever made", ["qwe"]);
        expect((0, basics_1.is_category)(RoR_cat)).toBe(true);
        expect((0, basics_1.get_category_name)(RoR_cat)).toEqual("The best category ever made");
        expect(RoR_cat.cooking_methods).toEqual(["qwe"]);
    });
    test('function new_kitchenware works', function () {
        var RoR_kit = (0, basics_1.new_kitchenware)("The best kitchenware ever made");
        expect((0, basics_1.is_kitchenware)(RoR_kit)).toBe(true);
        expect((0, basics_1.get_kitchenware_name)(RoR_kit)).toEqual("The best kitchenware ever made");
    });
    test('function add_to_ingredient_history works', function () {
        expect((0, basics_1.get_ingredient_history)((0, basics_1.add_to_ingredient_history)(test_ingredient_meat, "boil"))).toStrictEqual(["slice", "boil"]);
    });
    test('function add_ingredient_to_kitchenware works', function () {
        var new_kit = (0, basics_1.add_ingredient_to_kitchenware)(test_ingredient_meat, test_kitchenware);
        expect((0, basics_1.get_kitchenware_inventory)(new_kit)).toStrictEqual([test_ingredient_meat]);
        new_kit = (0, basics_1.add_ingredient_to_kitchenware)(test_ingredient_vegan, test_kitchenware);
        expect(new_kit).toStrictEqual(test_kitchenware); //checks that they are aliases
        expect((0, basics_1.get_kitchenware_inventory)(new_kit)).toStrictEqual([test_ingredient_meat, test_ingredient_vegan]);
    });
    test('function is_vegan works', function () {
        expect((0, basics_1.is_vegan)(test_ingredient_meat)).toBe(false);
        expect((0, basics_1.is_vegan)(test_ingredient_vegan)).toBe(true);
        expect((0, basics_1.is_vegan)(test_ingredient_lactose)).toBe(false);
    });
    test('function is_vegetarian works', function () {
        expect((0, basics_1.is_vegetarian)(test_ingredient_meat)).toBe(false);
        expect((0, basics_1.is_vegetarian)(test_ingredient_vegan)).toBe(true);
        expect((0, basics_1.is_vegetarian)(test_ingredient_lactose)).toBe(true);
    });
    test('function is_lactose_friendly works', function () {
        expect((0, basics_1.is_lactose_friendly)(test_ingredient_meat)).toBe(true);
        expect((0, basics_1.is_lactose_friendly)(test_ingredient_vegan)).toBe(true);
        expect((0, basics_1.is_lactose_friendly)(test_ingredient_lactose)).toBe(false);
    });
});
