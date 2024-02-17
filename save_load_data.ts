import {
    Ingredient, IngredientCategory
} from "./ingredients"
import { Pair } from "./lib/list"

function new_ingredient(ingredient_type: IngredientCategory, 
                        name: string,
                        allergies: Array<string>, 
                        measurement: string, 
                        kcal_per_measurement: number, 
                        range: Pair<number, number>): Ingredient {
    const ingredient: Ingredient = {
        name, ingredient_type, allergies, measurement, 
        kcal_per_measurement, range, tag: "ingredient", history = []
    }
    const json_ingredient = JSON.stringify(ingredient);
    const filename = "./ingredient_data.json";

    require('fs').writeFile(filename, json_ingredient, (error: Error) => {
        if (error) {
            throw error;
        }
    });

    return ingredient;

}