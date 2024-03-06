import { Inflectors } from "en-inflectors";
import { Recipe } from "./recipe_generation";
import { Ingredient, KitchenWare } from "../basics";
import { Pair, pair, tail } from "../lib/list";
import { print_bold } from "../menu/menu_global_functions";

/**
 * Prints a recipe in a readable format! :)
 * @param recipe - Recipe to be printed
 */
export function print_recipe(recipe: Recipe): void {
    // converts the first character in a string to uppercase (if possible)
    function up_first(str: string): string {
        return str[0].toUpperCase() + str.slice(1);
    }
    
    // Creates a nicely printable string from ingredient information
    // for ingredient list.
    function stringify_ingredient_info(
        ingredient: Ingredient, amount: number
        ): string {
        const measurement = ingredient.measurement;
        const [num, rest] = num_rest_of_measurement(measurement);
        amount = num * amount;
        if (rest === "" && amount > 1) {
            return amount + " " +
                refer_to_ingredient(ingredient, amount, true);
        } else {
            return amount + rest + " of " + ingredient.name;
        }
    }
    
    // Creates a nicely printable string from kitchenware with the, an och a
    // followed by kitchenware name.
    function stringify_kitchenware(
        kw: KitchenWare, exists: boolean, cm: string
    ): string {
        let str = kw.name;
        const vowels = ["e", "u", "i", "o", "a"];
        if (exists) {
            str = "the " + str;
        } else if (vowels.includes(str[0])) {
            str = "an " + str;
        } else {
            str = "a " + str;
        }
    
        if (cm == "add") {
            str = "to " + str;
        } else if(kw.name === "cutting board"){
            str = "on " + str;
        } else{
            str = "in " + str;
        }
    
        return str;
    }
    
    // lists ingredient names with commas in between, and "and" before the final
    // ingredient name.
    function ingredient_and_ingredients(ingredients: Array<string>): string {
        let ingredient_str = ingredients[0];
        const i_amount = ingredients.length;
        if (i_amount > 1) {
            let i = 1;
            for (i; i < i_amount - 1; i++) {
                ingredient_str += ", " + ingredients[i];
            }
            ingredient_str += " and " + ingredients[i];
        } else {}
        return ingredient_str;
    }
    
    console.log("-----------------------------------");
    print_bold(recipe.name);
    console.log("-----------------------------------");
    console.log("Portions: " + recipe.portions);
    console.log("Around " + recipe.kcal_per_portion + " kcal per portion.");
    console.log();
    const ingredient_info = recipe.ingredient_info;
    ingredient_info.forEach(p => {
        const [ingredient, amount] = p
        console.log(stringify_ingredient_info(ingredient, amount));
    })
    console.log("-----------------------------------");
    const steps = recipe.steps;
    let step_nr = 1;
    steps.forEach(step => {
        console.log(
            step_nr + ". " + up_first(step.cooking_method) + " the " +
            ingredient_and_ingredients(step.ingredient_names) + " " +
            stringify_kitchenware(step.kitchenware, step.is_kw_active, step.cooking_method)
            );
        step_nr += 1;
    })
    console.log( step_nr + ". " + "Finally, add salt and pepper to taste! :-)");
    console.log("-----------------------------------");
}

/**
 * Separates a measurement string into its amount and its measurement.
 * @param measurement - the measurement string to separate
 * @returns a pair of the amount of the measurement, as a number,
 * and the measurement, as a string
 */
function num_rest_of_measurement(measurement: string): Pair<number, string> {
    measurement = measurement.trim().toLowerCase().replace("e", "ε"); // replaces e since parseFloat interprets e as exponent (assumes no measurement includes ε)
    const num = parseFloat(measurement);
    if (isNaN(num)) {
        return [1, measurement];
    } else {
        const length_of_num = num.toString().length;
        const rest = measurement.slice(length_of_num);
        return pair(num, rest.replace("ε", "e"));
    }
}

/**
 * Returns ingredient name with correct(ish) conjugation depending on if it
 * should be referred to in plural or not
 * @param {Ingredient} ingredient - ingredient to name.
 * @param {number} amount - amount of the ingredient.
 * @param {boolean} [is_pcs = false] - true if it is already known that 
 * the ingredient is measured in pcs, false as default.
 * @returns A string with conjugated ingredient name
 */
export function refer_to_ingredient(
    ingredient: Ingredient, amount: number, is_pcs: boolean = false
): string {
    // returns true if ingredient should be referred to in plural,
    // false otherwise.
    function is_plural(): boolean {
        const rest = tail(num_rest_of_measurement(ingredient.measurement));
        if (rest === "") {
            return true;
        } else {
            return false;
        }
    }
    const name = ingredient.name;
    const s_u_i_o = ["s", "u", "i", "o"];
    
    if(name == "garlic clove") {
        return "garlic cloves";
    } else {
        if (is_pcs || is_plural()) {
            const inflect = new Inflectors(name);
            return inflect.toPlural();
        } else {
            return name;
        }
    }
}