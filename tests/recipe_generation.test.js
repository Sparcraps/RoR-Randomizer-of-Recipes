"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var save_load_data_1 = require("../data/save_load_data");
var list_1 = require("../lib/list");
var recipe_generation_1 = require("../recipe/recipe_generation");
describe("Testing generate_recipe", function () {
    test("Generating a recipe works as intended (with filters)", function () {
        (0, save_load_data_1.load_data)();
        var recipe = (0, recipe_generation_1.generate_recipe)((0, list_1.pair)(400, 700), 4, ["meat", "root vegetable"]);
        expect(recipe.tag).toBe("recipe");
        var ingredient_info = recipe.ingredient_info;
        expect(ingredient_info.some(function (p) { return (0, list_1.head)(p).allergies.includes("meat"); })).toBe(false);
        expect(ingredient_info.some(function (p) { return (0, list_1.head)(p).allergies.includes("root vegetable"); })).toBe(false);
        ingredient_info.forEach(function (p) {
            var _a;
            var _b = (0, list_1.head)(p).range, lower = _b[0], upper = _b[1];
            _a = [lower * 4, upper * 4], lower = _a[0], upper = _a[1];
            expect((0, list_1.tail)(p)).toBeGreaterThanOrEqual(lower);
            expect((0, list_1.tail)(p)).toBeLessThanOrEqual(upper);
        });
        var kcal = recipe.kcal_per_portion;
        expect(kcal).toBeGreaterThanOrEqual(400);
        expect(kcal).toBeLessThanOrEqual(700);
        expect(recipe.portions).toBe(4);
        expect(recipe.steps.length === 0).toBe(false);
    });
});
