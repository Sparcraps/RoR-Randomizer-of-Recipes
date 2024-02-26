import { 
    SaveData 
} from "./save_load_data";
import {
    new_ingredient, new_category, type Category, type Ingredient
} from "./basics"
import {
    type Pair, pair
} from "./lib/list"

/*
const vegetable = new_category("vegetable", [["chop", "boil"],["boil"], ["chop", "fry"], ["fry"], ["chop", "bake"], ["bake"], ["grill"], ["chop, grill"]], 10);
const root_vegetable = new_category("root_vegetable", [["chop", "boil"],["boil"], ["chop", "fry"], ["chop", "bake"], ["bake"], ["grill"], ["chop, grill"], ["boil", "mash"]], 3);
const liquid = new_category("liquid", [["boil"], ["reduce"]], 2)
const meat = new_category("meat", [["grill"], ["slice", "grill"], ["pound", "fry"], ["fry"], ["slice, fry"], ["boil"], ["slice", "boil"]], 4);
const spice = new_category("spice", [["add"]], 10);
const carbohydrate = new_category("carbohydrate", [["boil"], ["boil", "fry"]], 3)
*/
const broccoli = new_ingredient("vegetable", "broccoli", [], "g", 51, pair(50, 400));
const celery = new_ingredient("vegetable", "celery", [], "", 9, pair(1, 4));
const onion = new_ingredient("vegetable", "onion", [], "", 46, pair(1, 4));
const red_onion = new_ingredient("vegetable", "red onion", [], "", 46, pair(1, 4));
const cucumber = new_ingredient("vegetable", "cucumber", [], "", 45, pair(1, 2));

const carrot = new_ingredient("root_vegetable", "carrot", [], "", 30, pair(1, 4));
const potato = new_ingredient("root_vegetable", "potato", [], "", 85, pair(1, 4));

const water = new_ingredient("liquid", "water", [], "ml", 0, pair(200, 600));
const stock = new_ingredient("liquid", "stock", [], "ml", 0, pair(200, 600));

const chicken_breast = new_ingredient("meat", "chicken breast", ["meat"], "", 164, pair(1, 2));
const chicken_thigh = new_ingredient("meat", "chicken thigh", ["meat"], "", 62, pair(1, 4));
const pork_cutlet = new_ingredient("meat", "pork_cutlet", ["meat"], "", 218, pair(1, 2));

const ingredienttest = [[broccoli, celery, onion, red_onion, cucumber], [carrot, potato], [water, stock], [chicken_breast, chicken_thigh, pork_cutlet]];

const allergies = ["meat"];


function filter_allergies(save_data: Array<Array<Ingredient>>, allergies: Array<string>): Array<Array<Ingredient>>{
    const ingredients = save_data;
    let is_done: boolean = false;
    for(let categoryindex = 0; categoryindex < ingredients.length; categoryindex ++)
    {
        ingredients[categoryindex].filter((ingredient) => ingredient.allergies[0] === allergies[0])
        for(let ingredientindex = 0; ingredientindex < ingredients[categoryindex].length; ingredientindex ++)
        {
            const ingredientallergy = ingredients[categoryindex][ingredientindex].allergies;
            for(let allergyindex = 0; allergyindex < ingredientallergy.length; allergyindex ++)
            {
                if(is_done == true)
                {
                    is_done = false;
                    break;
                }
                for(let userallergyindex = 0; userallergyindex < allergies.length; userallergyindex ++)
                {
                    if(ingredientallergy[allergyindex] == allergies[userallergyindex])
                    {
                        ingredients[categoryindex] = ingredients[categoryindex].splice(ingredientindex, 1);
                        is_done = true;
                        break;
                    }
                    else
                    {
                        continue;
                    }
                }
            }
        }
    }
    return ingredients;
}

console.log(filter_allergies(ingredienttest, allergies));

