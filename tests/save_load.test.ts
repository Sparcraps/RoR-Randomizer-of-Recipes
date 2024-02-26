import {
    load_data, save_data, save_new_ingredient, delete_ingredient,
    save_new_category, delete_category, save_new_kitchenware, delete_kitchenware
} from "../save_load_data";

import {
    new_ingredient, Category, new_category, new_kitchenware
} from "../basics";

describe("testing functions to save and load data", () => {
    test("save_data and load_data work", () => {
        const data = load_data();
        save_data(data);
        expect(load_data()).toStrictEqual(data);
    })

    test("save_new_ingredient gives error when ingredient name already exists", () => {
        const data = load_data()
        const ingredient_data = data.ingredients;
        if (!(ingredient_data.length === 0)) {
            const console_spy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});

            const i = ingredient_data[0][0];
            save_new_ingredient(i);
            expect(console_spy).toHaveBeenCalledWith(
                new Error("Ingredient with name " + i.name + " already exists.")
                );
        } else {}
    })

    test("save_new_category gives error when category name already exists", () => {
        const data = load_data()
        const cats = data.categories;
        if (!(cats.length === 0)) {
            const console_spy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});

            const cat = cats[0];
            save_new_category(cat);
            expect(console_spy).toHaveBeenCalledWith(
                new Error("Category with name " + cat.name + " already exists.")
                );
        } else {}
    })

    test("delete_ingredient gives error when ingredient doesn't exist", () => {
        const console_spy = jest.spyOn(console, 'error')
            .mockImplementation(() => {});

        const no_name = "61723801837814017480956710847514859078419"
        delete_ingredient(no_name);
        expect(console_spy).toHaveBeenCalledWith(
            new Error(
                "There is no saved ingredient with the name " + no_name + "."
                ));
    })

    test("delete_category gives error when category doesn't exist", () => {
        const console_spy = jest.spyOn(console, 'error')
            .mockImplementation(() => {});

        const no_name = "61723801837814017480956710847514859078419"
        delete_category(no_name);
        expect(console_spy).toHaveBeenCalledWith(
            new Error(
                "There is no saved category with the name " + no_name + "."
                ));
    })

    test("functions to save and delete work on test ingredients and test category", () => {
        const test_category = new_category("test category", [["chop"], ["boil"]], 10); 

        const ti1 = new_ingredient("test category", "test ingredient", 
                                    ["cat"], "liters", 100, [50, 500]);
        const ti2 = new_ingredient("test category", "test ingredient 2",
                                    ["dog"], "liters", 100, [50, 300]);
        const ti3 = new_ingredient("test category", "test ingredient 3", 
                                    ["snake"], "liters", 100, [20, 300]);

        save_new_category(test_category);
        let saved = save_new_ingredient(ti1, ti2);
        let ingredient_data = saved.ingredients;
        const index = ingredient_data.length - 1
        let test_arr = ingredient_data[index];
        expect(test_arr).toContainEqual(ti1);
        expect(test_arr).toContainEqual(ti2);

        saved = save_new_ingredient(ti3);
        ingredient_data = saved.ingredients;
        test_arr = ingredient_data[index];
        expect(test_arr).toContainEqual(ti3);

        saved = delete_ingredient(ti2.name);
        ingredient_data = saved.ingredients;

        test_arr = ingredient_data[index];
        expect(test_arr.some(e => e.name === "test ingredient 2")).toBe(false);
        expect(test_arr).toContainEqual(ti1);
        expect(test_arr).toContainEqual(ti3);

        saved = delete_category("test category");
        const cats = saved.categories;
        ingredient_data = saved.ingredients;
        expect(cats.length).toBe(index);
        expect(ingredient_data.length).toBe(index);
    });

    test("save_new_kitchenware and delete_kitchenware works on test kitchenware", () => {
        const name = "test kitchenware";
        const test_kit = new_kitchenware(name, ["fry"]);
        let saved = save_new_kitchenware(test_kit);
        expect(saved.kitchenware).toContainEqual(test_kit);

        saved = delete_kitchenware(name);
        expect(saved.kitchenware.some(e => e.name === name)).toBe(false);
    });
});
