import { KitchenWare, type Ingredient, Category } from "../basics"


/**
 * Function for filtering out ingredients according to allergies.
 * @param ingredients - a 2D array of ingredients to be
 * @param allergies - an array of strings symbolisig allergies
 * @modifies ingredients
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

/**
 * Returns a set of all parts of cooking methods that are available for
 * kitchenware in array.
 * @param kw_data - array of kitchenware to search through.
 * @returns A set of strings representing parts of cooking methods available to
 * the kitchenware.
 */
export function get_doable_cooking_methods(kw_data: Array<KitchenWare>): Set<string> {
    const methods: Set<string> = new Set();
    kw_data.forEach(kw => {
        const kw_methods = kw.cooking_methods;
        kw_methods.forEach(method => methods.add(method));
    });
    return methods;
}

/** 
 * Filters method arrays of Category objects by removing all methods with parts 
 * that are not available to kitchenware in array.
 * @param kw_data - Array of available kitchenware.
 * @param cat_data - Array of categories whose cooking methods to filter.
 * @modifies cat_data
*/
export function filter_cooking_methods(
    kw_data: Array<KitchenWare>,
    cat_data: Array<Category>
): void {
    const valid_methods = get_doable_cooking_methods(kw_data);

    function is_valid_method(method: Array<string>): boolean {
        let is_valid = true;
        for (let i = 0; i < method.length; i++) {
            const m = method[i];
            if (!valid_methods.has(m)) {
                is_valid = false
                break;
            } else {}
        }
        return is_valid;
    }

    for (let i = 0; i < cat_data.length; i++ ) {
        const cat = cat_data[i];
        cat.cooking_methods = cat.cooking_methods.filter(
                method => is_valid_method(method)
            );
    }
}
