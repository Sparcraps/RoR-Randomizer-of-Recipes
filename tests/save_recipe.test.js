"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var save_recipe_1 = require("../save_recipe");
var RoR_1 = require("../RoR");
var basics_1 = require("../basics");
describe("testing functions for saving and loading recipes", function () {
    test("save_recipe and load_recipe work", function () {
        var saved = (0, save_recipe_1.load_recipes)();
        (0, save_recipe_1.save_recipes)(saved);
        expect((0, save_recipe_1.load_recipes)()).toStrictEqual(saved);
    });
    test("saving and deleting test recipes works", function () {
        var r = (0, RoR_1.new_recipe)(3);
        r.name = "test recipe";
        (0, save_recipe_1.save_new_recipe)(r);
        expect((0, save_recipe_1.load_recipes)()).toContainEqual(r);
        var saved = (0, save_recipe_1.delete_recipe)(r.name);
        var i = (0, basics_1.find_by_name)(r.name, saved);
        expect(i).toBe(-1);
    });
    test("saving two recipes with same name adds 2 to second name", function () {
        var r1 = (0, RoR_1.new_recipe)(3);
        r1.name = "test recipe";
        var r2 = (0, RoR_1.new_recipe)(3);
        r2.name = "test recipe";
        var saved = (0, save_recipe_1.save_new_recipe)(r1, r2);
        var i1 = (0, basics_1.find_by_name)(r1.name, saved);
        var i2 = i1 + 1;
        expect(i1).toBe(saved.length - 2);
        expect(saved[i2].name).toBe("test recipe 2");
        (0, save_recipe_1.delete_recipe)("test recipe", "test recipe 2");
    });
});
