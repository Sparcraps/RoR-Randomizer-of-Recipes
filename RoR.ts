import
{ randomize_cooking_instruction,
type Ingredient, }
from "./ingredients";

function print_cooking_instructions(ingredients: Array<Ingredient>): void {
    const len  = ingredients.length;
    for (let i = 0; i < len; i++) {
        const printable = randomize_cooking_instruction(ingredients[i]);
        console.log(printable);
    }
}
