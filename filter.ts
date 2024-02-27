import {
    type Ingredient
} from "./basics"


/**
 * Function for filtering out ingredients according to allergies.
 * @param ingredients - a 2D array of ingredients to be
 * @param allergies - an array of strings symbolisig allergies
 * @returns a 2D array of ingredients with the ingredients with the allergies removed
 */
export function filter_ingredients(
                                 ingredients: Array<Array<Ingredient>>, 
                                 allergies: Array<string>
                                 ): Array<Array<Ingredient>>{
    for(let category_index = 0; 
        category_index < ingredients.length; 
        category_index ++)
    {
        for(let ingredient_index = ingredients[category_index].length - 1;
            ingredient_index >= 0;
            ingredient_index = ingredient_index - 1)
        {
            const ingredient_allergy = ingredients[category_index]
                                                  [ingredient_index].allergies;
            for(let user_allergy_index = 0;
                user_allergy_index < allergies.length; 
                user_allergy_index++)
            {
                if(ingredient_allergy.includes(allergies[user_allergy_index]))
                {
                    ingredients[category_index].splice(ingredient_index, 1);
                }
            }
        }
    }
    return ingredients;
}

