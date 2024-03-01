import { Recipe } from "./recipe_generation";
import { Ingredient, KitchenWare } from "../basics";
import { Pair, pair } from "../lib/list";
import { print_bold } from "../menu/menu_global_functions";

export function print_recipe(recipe: Recipe): void {
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
            stringify_kitchenware(step.kitchenware, step.is_kw_existing)
            );
        step_nr += 1;
    })
    console.log( step_nr + ". " + "Finally, add salt and pepper to taste! :-)");
    console.log("-----------------------------------");
}

function up_first(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
}

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

function stringify_kitchenware(kw: KitchenWare, exists: boolean): string {
    let str = kw.name;
    const vowels = ["e", "u", "i", "o", "a"];
    if (exists) {
        str = "the " + str;
    } else if (vowels.includes(str[0])) {
        str = "an " + str;
    } else {
        str = "a " + str;
    }

    if (kw.name === "cutting board") {
        str = "on " + str;
    } else {
        str = "in " + str;
    }

    return str;
}

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
        const [num, rest] = num_rest_of_measurement(ingredient.measurement);
        if (rest === "") {
            return true;
        } else {
            return false;
        }
    }
    const name = ingredient.name;
    const s_u_i_o = ["s", "u", "i", "o"];
    
    if (is_pcs || is_plural()) {
        const last_char = name[name.length - 1]
        if (s_u_i_o.includes(last_char)) {
            return name + "es";
        } else if (last_char === "y") {
            return name.slice(0, -1) + "ies";
        } else {
            return name + "s";
        }
    } else {
        return name;
    }
}