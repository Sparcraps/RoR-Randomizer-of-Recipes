import {
    load_ingredients, save_ingredients, save_new_ingredient, delete_ingredient
} from "../save_load_data";

import {
    new_ingredient, IngredientCategory
} from "../ingredients";

describe("testing functions to save and load data", () => {
    test("save_ingredients and load_ingredients work", () => {
        const ingredient_arr = load_ingredients();
        save_ingredients(ingredient_arr);
        expect(load_ingredients()).toStrictEqual(ingredient_arr);
    })

    test("save_new_ingredient gives error when ingredient name already exists", () => {
        const ingredient_arr = load_ingredients();
        if (!(ingredient_arr.length === 0)) {
            const console_spy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});

            const i = ingredient_arr[0];
            save_new_ingredient(i);
            expect(console_spy).toHaveBeenCalledWith(
                new Error("Ingredient with name " + i.name + " already exists.")
                );
        }
    })

    test("delete_ingredient gives error wgen ingredient doesn't exist", () => {
        const console_spy = jest.spyOn(console, 'error')
            .mockImplementation(() => {});

        const no_name = "61723801837814017480956710847514859078419"
        delete_ingredient(no_name);
        expect(console_spy).toHaveBeenCalledWith(
            new Error(
                "There is no saved ingredient with the name " + no_name + "."
                ));
    })

    test("save_new_ingredient and delete_ingredient works on test ingredients", () => {
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

        let saved = save_new_ingredient(ti1, ti2);
        expect(saved).toContainEqual(ti1);
        expect(saved).toContainEqual(ti2);

        saved = save_new_ingredient(ti3);
        expect(load_ingredients()).toContainEqual(ti3);

        saved = delete_ingredient(ti1.name, ti2.name, ti3.name);
        expect(saved).toStrictEqual([]);
    });
});