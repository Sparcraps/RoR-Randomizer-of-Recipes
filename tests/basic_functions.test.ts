import {
    type TaggedRecord, type Ingredient, type Category, type KitchenWare,
    is_ingredient, is_category, is_kitchenware, get_ingredient_name,
    get_ingredient_allergies, get_ingredient_measurement, get_ingredient_kcal, 
    get_ingredient_kcal_range, get_ingredient_category_name, 
    get_ingredient_category, get_category_name, get_ingredient_cooking_methods, 
    get_kitchenware_name, get_kitchenware_inventory, new_kitchenware, 
    add_ingredient_to_kitchenware, is_vegetarian, is_vegan, is_lactose_friendly, 
    new_category, get_category_max
} from "../basics";

import {
    pair
} from "../lib/list";

describe('testing basic ingredients.ts functions', () => {
    let tagged_record: TaggedRecord = { tag: "" };

    let test_ingredient_meat: Ingredient = {
        tag: "ingredient",
        name: "beef",
        category: "meat",
        allergies: ["meat"],
        measurement: "g",
        kcal_per_measurement: 2.5,
        range: pair(250, 2500)
    };

    const test_ingredient_vegan: Ingredient = {
        tag: "ingredient",
        name: "water",
        category: "liquid",
        allergies: [],
        measurement: "ml",
        kcal_per_measurement: 1,
        range: pair(10, 100)
    };

    const test_ingredient_lactose: Ingredient = {
        tag: "ingredient",
        name: "milk",
        category: "liquid",
        allergies: ["lactose", "dairy"],
        measurement: "ml",
        kcal_per_measurement: 1,
        range: pair(10, 100)
    };
    
    let test_category: Category = {
        tag: "category",
        name: "meat",
        cooking_methods: [["fry"]],
        max_ingredients: 10
    };

    let test_kitchenware: KitchenWare = {
        tag: "kitchenware",
        name: "frying pan",
        cooking_methods: [],
        inventory: ["beef"]
    };

    let category_data: Array<Category> = [test_category];

    test('function is_ingredient works', () => {
        expect(is_ingredient(test_ingredient_meat)).toBe(true);
        expect(is_ingredient(test_ingredient_vegan)).toBe(true);
        expect(is_ingredient(test_category)).toBe(false);
        expect(is_ingredient(test_kitchenware)).toBe(false);
    })

    test('function is_ingredient_category works', () => {
        expect(is_category(test_ingredient_meat)).toBe(false);
        expect(is_category(test_category)).toBe(true);
        expect(is_category(test_kitchenware)).toBe(false);
    })

    test('function is_kitchenware works', () => {
        expect(is_kitchenware(test_ingredient_meat)).toBe(false);
        expect(is_kitchenware(test_category)).toBe(false);
        expect(is_kitchenware(test_kitchenware)).toBe(true);
    })

    test('function get_ingredient_name works', () => {
        expect(get_ingredient_name(test_ingredient_meat)).toStrictEqual("beef");
    })

    test('function get_ingredient_allergies works', () => {
        expect(get_ingredient_allergies(test_ingredient_meat)).toEqual(["meat"]);
    })

    test('function get_ingredient_measurement works', () => {
        expect(get_ingredient_measurement(test_ingredient_meat)).toStrictEqual("g");
    })

    test('function get_ingredient_kcal works', () => {
        expect(get_ingredient_kcal(test_ingredient_meat)).toStrictEqual(2.5);
    })

    test('function get_ingredient_kcal_range works', () => {
        expect(get_ingredient_kcal_range(test_ingredient_meat))
        .toStrictEqual(pair(250, 2500));
    })

    test('function get_ingredient_category_name works', () => {
        expect(get_ingredient_category_name(test_ingredient_meat)).toEqual("meat");
    })

    test('function get_ingredient_category works', () => {
        expect(get_ingredient_category(test_ingredient_meat, category_data))
        .toStrictEqual(test_category);
    })

    test('function get_category_name works', () => {
        expect(get_category_name(test_category)).toStrictEqual("meat");
    })

    test('function get_ingredient_cooking_methods works', () => {
        expect(get_ingredient_cooking_methods(
            test_ingredient_meat, category_data
            )).toStrictEqual(["fry"]);
    })

    test('function get_category_max works', ()=> {
        expect(get_category_max(test_category)).toBe(10);
    })

    test('function get_kitchenware_inventory works', () => {
        expect(get_kitchenware_inventory(test_kitchenware)).toStrictEqual([test_ingredient_meat]);
    })

    test('function new_category works', () => {
        const RoR_cat: Category = new_category("The best category ever made", ["qwe"], 5);
        expect(is_category(RoR_cat)).toBe(true);
        expect(get_category_name(RoR_cat)).toEqual("The best category ever made");
        expect(RoR_cat.cooking_methods).toEqual(["qwe"]);
    }) 

    test('function new_kitchenware works', () => {
        const RoR_kit: KitchenWare = new_kitchenware("The best kitchenware ever made", []);
        expect(is_kitchenware(RoR_kit)).toBe(true);
        expect(get_kitchenware_name(RoR_kit)).toEqual("The best kitchenware ever made");
    })

    test('function add_ingredient_to_kitchenware works', () => {
        let new_kit = add_ingredient_to_kitchenware(test_ingredient_meat, test_kitchenware)
        expect(get_kitchenware_inventory(new_kit)).toStrictEqual([test_ingredient_meat]);

        new_kit = add_ingredient_to_kitchenware(test_ingredient_vegan, test_kitchenware)
        expect(new_kit).toStrictEqual(test_kitchenware); //checks that they are aliases
        expect(get_kitchenware_inventory(new_kit)).toStrictEqual([test_ingredient_meat, test_ingredient_vegan]);
    })

    test('function is_vegan works', () => {
        expect(is_vegan(test_ingredient_meat)).toBe(false);
        expect(is_vegan(test_ingredient_vegan)).toBe(true);
        expect(is_vegan(test_ingredient_lactose)).toBe(false);
    })

    test('function is_vegetarian works', () => {
        expect(is_vegetarian(test_ingredient_meat)).toBe(false);
        expect(is_vegetarian(test_ingredient_vegan)).toBe(true);
        expect(is_vegetarian(test_ingredient_lactose)).toBe(true);

    })

    test('function is_lactose_friendly works', () => {
        expect(is_lactose_friendly(test_ingredient_meat)).toBe(true);
        expect(is_lactose_friendly(test_ingredient_vegan)).toBe(true);
        expect(is_lactose_friendly(test_ingredient_lactose)).toBe(false);
    })
})