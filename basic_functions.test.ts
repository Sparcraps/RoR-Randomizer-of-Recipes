import {
    type TaggedRecord, type Ingredient, type IngredientCategory, type KitchenWare, is_ingredient, is_ingredient_category, is_kitchenware,
    get_ingredient_name, get_ingredient_allergies, get_ingredient_history, get_ingredient_measurement, get_ingredient_kcal, get_ingredient_kcal_range,
    get_category_name, get_ingredient_cooking_methods, get_kitchenware_inventory, new_category, new_kitchenware, add_to_ingredient_history, add_ingredient_to_kitchenware,
    is_vegetarian, is_vegan, is_lactose_friendly
} from "./ingredients";

import {
    type Pair, pair
} from "./lib/list";

describe('testing basic ingredients.ts functions', () => {
    let tagged_record: TaggedRecord = { tag: "" };
    let test_category: IngredientCategory = {
        tag: "ingredientcategory",
        name: "meat",
        cooking_methods: ["fry"]
    };
    let test_ingredient: Ingredient = {
        tag: "ingredient",
        name: "beef",
        category: test_category,
        allergies: ["meat"],
        history: ["sliced"],
        measurement: "g",
        kcal_per_measurement: 2.5,
        range: pair(250, 2500)
    };
    let test_kitchenware: KitchenWare = {
        tag: "kitchenware",
        name: "frying pan",
        inventory: []
    };

    test('function is_ingredient works', () => {
        expect(is_ingredient(test_ingredient)).toBe(true);
        expect(is_ingredient(test_category)).toBe(false);
        expect(is_ingredient(test_kitchenware)).toBe(false);
    })
    test('function is_ingredient_category works', () => {
        expect(is_ingredient_category(test_ingredient)).toBe(false);
        expect(is_ingredient_category(test_category)).toBe(true);
        expect(is_ingredient_category(test_kitchenware)).toBe(false);
    })
    test('function is_kitchenware works', () => {
        expect(is_kitchenware(test_ingredient)).toBe(false);
        expect(is_kitchenware(test_category)).toBe(false);
        expect(is_kitchenware(test_kitchenware)).toBe(true);
    })
    test('function get_ingredient_name works', () => {
        expect(get_ingredient_name(test_ingredient)).toStrictEqual("beef");
    })
    test('function get_ingredient_allergies works', () => {
        expect(get_ingredient_allergies(test_ingredient)).toEqual(["meat"]);
    })
    test('function get_ingredient_history works', () => {
        expect(get_ingredient_history(test_ingredient)).toEqual(["sliced"]);
    })
    test('function get_ingredient_measurement works', () => {
        expect(get_ingredient_measurement(test_ingredient)).toStrictEqual("g");
    })
    test('function get_ingredient_kcal works', () => {
        expect(get_ingredient_kcal(test_ingredient)).toStrictEqual(2.5);
    })
    
})