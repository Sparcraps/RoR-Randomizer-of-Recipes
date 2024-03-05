import {
    load_data, save_data, save_new_ingredient, delete_ingredient,
    save_new_category, delete_category, save_new_kitchenware, 
    delete_kitchenware, replace_ingredient, replace_category,
    replace_kitchenware, get_data, set_data
} from "../data/save_load_data";

import {
    new_ingredient, new_category, new_kitchenware
} from "../basics";

describe("testing functions to save and load data", () => {
    test("save_data, load_data, set_data and get_data work", () => {
        load_data();
        const data = get_data();
        set_data(data);
        save_data();
        load_data();
        expect(get_data()).toStrictEqual(data);
    })

    test(
        "save_new_ingredient gives error when ingredient name already exists",
        () => {
        load_data();
        const data = get_data();
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

    test(
        "save_new_category gives error when category name already exists",
        () => {
        load_data();
        const data = get_data();
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
        try {
            delete_ingredient(no_name);
        } catch (err) {
            console.error(err);
        }
        
        expect(console_spy).toHaveBeenCalledWith(
            new Error(
                "There is no saved ingredient with the name " + no_name + "."
                ));
    })

    test("delete_category gives error when category doesn't exist", () => {
        const console_spy = jest.spyOn(console, 'error')
            .mockImplementation(() => {});

        const no_name = "61723801837814017480956710847514859078419"
        try{
            delete_category(no_name);
        } catch(err){
            console.error(err);
        }

        expect(console_spy).toHaveBeenCalledWith(
            new Error(
                "There is no saved category with the name " + no_name + "."
                ));
    })

    test(
        "functions to save, delete and replace" +
        " work on test ingredients and test category",
        () => {
        const test_category = new_category(
            "test category", [["chop"], ["boil"]], 10
        ); 

        const test_category2 = new_category(
            "test category", [["crush"], ["fry"]], 3
        );

        const ti1 = new_ingredient("test category", "test ingredient", 
                                    ["cat"], "liters", 100, [50, 500]);
        const ti2 = new_ingredient("test category", "test ingredient 2",
                                    ["dog"], "liters", 100, [50, 300]);
        const ti3 = new_ingredient("test category", "test ingredient 3", 
                                    ["snake"], "liters", 100, [20, 300]);

        let saved = save_new_category(test_category);
        let cat_data = saved.categories;
        expect(cat_data).toContainEqual(test_category);

        saved = save_new_ingredient(ti1, ti2);
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

        const ti4 = new_ingredient("test category", "test ingredient", 
                                    ["air"], "liters", 100, [800, 900]);

        saved = replace_ingredient(ti1.name, ti4);
        ingredient_data = saved.ingredients;
        test_arr = ingredient_data[index];
        expect(test_arr).toContainEqual(ti4);
        expect(test_arr).toContainEqual(ti3);

        saved = replace_category(test_category.name, test_category2);
        cat_data = saved.categories;
        expect(cat_data).toContainEqual(test_category2);

        saved = delete_category("test category");
        const cats = saved.categories;
        ingredient_data = saved.ingredients;
        expect(cats.length).toBe(index);
        expect(ingredient_data.length).toBe(index);
    });

    test(
        "save_new_kitchenware, replace_kitchenware" + 
        " and delete_kitchenware work on test kitchenware",
        () => {
        const name = "test kitchenware";
        const test_kit = new_kitchenware(name, ["fry"]);
        const test_kit2 = new_kitchenware(name, ["chop"]);

        let saved = save_new_kitchenware(test_kit);
        expect(saved.kitchenware).toContainEqual(test_kit);

        saved = replace_kitchenware(test_kit.name, test_kit2);
        expect(saved.kitchenware).toContainEqual(test_kit2);

        saved = delete_kitchenware(name);
        expect(saved.kitchenware.some(e => e.name === name)).toBe(false);
    });
});
