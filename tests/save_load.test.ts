import {
    load_ingredients, save_ingredients, save_new_ingredient
} from "../save_load_data";

import {
    new_ingredient, IngredientCategory
} from "../ingredients";

describe("testing functions to save and load data", () => {
    test("save_new_ingredient and load_ingredients works on test ingredients", () => { // COMMENT TEST CASE IF THERE IS INGREDIENT DATA IN FILE
        const test_category: IngredientCategory = {
            tag: "ingredientcategory", 
            cooking_methods: ["chop", "boil"],
            name: "test category"
        };

        const ti1 = new_ingredient(test_category, "test ingredient", 
                                    ["cat"], "liters", 100, [50, 500]);
        const ti2 = new_ingredient(test_category, "test ingredient 2",
                                    ["dog"], "liters", 100, [50, 300]);
        const ti3 = new_ingredient(test_category, "test ingredient 3", 
                                    ["snake"], "liters", 100, [20, 300]);

        save_new_ingredient(ti1, ti2);
        expect(load_ingredients()).toStrictEqual([ti1, ti2]);

        save_new_ingredient(ti3);
        expect(load_ingredients()).toStrictEqual([ti1, ti2, ti3]);
    });

    test("save_ingredients and load_ingredients work", () => {
        const ingredient_arr = load_ingredients();
        save_ingredients(ingredient_arr);
        expect(load_ingredients()).toStrictEqual(ingredient_arr);
    })

    test("save_new_ingredient gives error when ingredient name already exists", () => {
        const ingredient_arr = load_ingredients();
        if (!(ingredient_arr.length === 0)) {
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});

            const i = ingredient_arr[0];
            save_new_ingredient(i);
            expect(consoleSpy).toHaveBeenCalledWith(
                new Error("Ingredient with name " + i.name + " already exists.")
                );
        }
    })

});