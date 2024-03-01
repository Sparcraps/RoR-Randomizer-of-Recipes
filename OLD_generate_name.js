"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_name = void 0;
var RoR_1 = require("./RoR");
var testrecipe = {
    "portions": 4,
    "ingredient_info": [
        [
            {
                "name": "avocado",
                "category": "fruit",
                "allergies": [],
                "measurement": "0.5",
                "kcal_per_measurement": 120,
                "range": [
                    1,
                    2
                ],
                "tag": "ingredient"
            },
            5
        ],
        [
            {
                "name": "chorizo",
                "category": "meat",
                "allergies": [
                    "meat"
                ],
                "measurement": "",
                "kcal_per_measurement": 200,
                "range": [
                    1,
                    1
                ],
                "tag": "ingredient"
            },
            4
        ],
        [
            {
                "name": "cucumber",
                "category": "fruit",
                "allergies": [],
                "measurement": "0.5",
                "kcal_per_measurement": 17,
                "range": [
                    1,
                    2
                ],
                "tag": "ingredient"
            },
            6
        ],
        [
            {
                "name": "brown rice",
                "category": "carbohydrate",
                "allergies": [],
                "measurement": "50g",
                "kcal_per_measurement": 55,
                "range": [
                    1,
                    3
                ],
                "tag": "ingredient"
            },
            4
        ]
    ],
    "steps": [
        {
            "cooking_method": "chop",
            "ingredient_names": [
                "avocadoes",
                "cucumbers"
            ],
        },
        {
            "cooking_method": "add",
            "ingredient_names": [
                "avocadoes",
                "cucumbers"
            ],
        },
        {
            "cooking_method": "grill",
            "ingredient_names": [
                "chorizoes"
            ],
        },
        {
            "cooking_method": "boil",
            "ingredient_names": [
                "brown rice"
            ]
        }
    ],
    "kcal_per_portion": 400
};
var testrecipe2 = {
    "portions": 4,
    "ingredient_info": [
        [
            {
                "name": "white rice",
                "category": "carbohydrate",
                "allergies": [],
                "measurement": "50g",
                "kcal_per_measurement": 65,
                "range": [
                    1,
                    3
                ],
                "tag": "ingredient"
            },
            7
        ],
        [
            {
                "name": "parsnip",
                "category": "root vegetable",
                "allergies": [],
                "measurement": "",
                "kcal_per_measurement": 105,
                "range": [
                    1,
                    3
                ],
                "tag": "ingredient"
            },
            6
        ],
        [
            {
                "name": "chicken thigh",
                "category": "meat",
                "allergies": [
                    "meat"
                ],
                "measurement": "",
                "kcal_per_measurement": 62,
                "range": [
                    1,
                    3
                ],
                "tag": "ingredient"
            },
            4
        ],
        [
            {
                "name": "cucumber",
                "category": "fruit",
                "allergies": [],
                "measurement": "0.5",
                "kcal_per_measurement": 17,
                "range": [
                    1,
                    2
                ],
                "tag": "ingredient"
            },
            4
        ],
        [
            {
                "name": "sweet potato",
                "category": "root vegetable",
                "allergies": [],
                "measurement": "",
                "kcal_per_measurement": 112,
                "range": [
                    1,
                    3
                ],
                "tag": "ingredient"
            },
            11
        ]
    ],
    "steps": [
        {
            "cooking_method": "boil",
            "ingredient_names": [
                "white rice"
            ],
        },
        {
            "cooking_method": "boil",
            "ingredient_names": [
                "parsnips",
                "sweet potatoes"
            ],
        },
        {
            "cooking_method": "mash",
            "ingredient_names": [
                "parsnips",
                "sweet potatoes"
            ],
        },
        {
            "cooking_method": "slice",
            "ingredient_names": [
                "chicken thighs"
            ],
        },
        {
            "cooking_method": "grill",
            "ingredient_names": [
                "chicken thighs"
            ],
        },
        {
            "cooking_method": "chop",
            "ingredient_names": [
                "cucumbers"
            ],
        },
        {
            "cooking_method": "add",
            "ingredient_names": [
                "cucumbers"
            ],
        }
    ],
    "kcal_per_portion": 700
};
/**
 * A function to find the ingredient a recipe has the most of in calories.
 * @param ingredients - an array containing pairs of the ingredients and their amounts in calories.
 * @returns the ingredient the recipe has the most of in calories.
 */
function find_highest_amount(ingredients) {
    var largest = ingredients[0];
    var current = ingredients[0][1] * ingredients[0][0].kcal_per_measurement;
    for (var i = 0; i < ingredients.length; i = i + 1) {
        current = ingredients[i][1] * ingredients[i][0].kcal_per_measurement;
        if (largest[1] * largest[0].kcal_per_measurement <= current) {
            largest = ingredients[i];
        }
    }
    var index = ingredients.indexOf(largest);
    ingredients.splice(index, 1);
    return largest[0];
}
/**
 * a function to find the last cooking step applied to a ingredient.
 * @param cooking_steps - an array of the cookingsteps in the recipe.
 * @param ingredient - an ingredient to the cookingstep must be applied to.
 * @returns the last cooking step applied to the ingredient.
 */
function find_last_cooking_step(cooking_steps, ingredient) {
    var is_pcs = false;
    if (ingredient.measurement == "") {
        is_pcs = true;
    }
    //let ingredientname = refer_to_ingredient(ingredient, 2);
    for (var i = cooking_steps.length - 1; i >= 0; i = i - 1) {
        if (cooking_steps[i].ingredient_names.includes(ingredient.name)) {
            return cooking_steps[i];
        }
    }
    return cooking_steps[cooking_steps.length - 1];
}
(0, RoR_1.refer_to_ingredient)(testrecipe.ingredient_info[0][0], 0);
/**
 * A function to generate a new name based on the ingredients and cooking steps in a recipe.
 * @param a recipe - consisting of ingredients and the cooking steps applied to them.
 * @returns the name generated as a string.
 */
function generate_name(recipe) {
    // capitalizes first letter of each word in a string
    function up_first_all(str) {
        var words = str.split(" ");
        var new_str = up_first(words[0]);
        if (words.length > 1) {
            var i = 1;
            for (i; i < words.length; i++) {
                new_str += " " + up_first(words[i]);
            }
        }
        else { }
        return new_str;
    }
    // capitalizes first letter of string
    function up_first(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    var ingredient_info = JSON.parse(JSON.stringify(recipe.ingredient_info)); // copies recipe ingredient info
    var main_ingr = find_highest_amount(ingredient_info);
    var main_cooking_method = find_last_cooking_step(recipe.steps, main_ingr);
    if (ingredient_info.length === 0) {
        return up_first_all(main_ingr.name) + " " +
            up_first_all(main_cooking_method.cooking_method);
    }
    else {
        var secondary_ingr = find_highest_amount(ingredient_info);
        if (main_cooking_method.cooking_method == "boil") {
            main_cooking_method = find_last_cooking_step(recipe.steps, secondary_ingr);
        }
        return up_first_all(main_ingr.name) + " and " +
            up_first_all(secondary_ingr.name) + " " +
            up_first_all(main_cooking_method.cooking_method);
    }
}
exports.generate_name = generate_name;
console.log(generate_name(testrecipe2));
