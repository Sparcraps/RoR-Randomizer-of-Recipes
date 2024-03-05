import {
    delete_recipe,
    load_recipes, save_new_recipe, save_recipes
} from "../data/save_recipe"

import { new_recipe } from "../recipe/recipe_generation"
import { find_by_name } from "../basics";

describe("testing functions for saving and loading recipes", () => {
    test("save_recipe and load_recipe work", () => {
        const saved = load_recipes();
        save_recipes(saved);
        expect(load_recipes()).toStrictEqual(saved);
    })

    test("saving and deleting test recipes works", () => {
        const r = new_recipe(3);
        r.name = "test recipe";

        save_new_recipe(r);
        expect(load_recipes()).toContainEqual(r);

        const saved = delete_recipe(r.name);
        const i = find_by_name(r.name, saved);
        expect(i).toBe(-1);
    })

    test("saving two recipes with same name adds 2 to second name", () => {
        const r1 = new_recipe(3);
        r1.name = "test recipe";
        const r2 = new_recipe(3);
        r2.name = "test recipe";

        const saved = save_new_recipe(r1, r2);
        const i1 = find_by_name(r1.name, saved);
        const i2 = i1 + 1;
        expect(i1).toBe(saved.length - 2);
        expect(saved[i2].name).toBe("test recipe 2");

        delete_recipe("test recipe", "test recipe 2");
    })
})