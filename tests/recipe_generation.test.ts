import { load_data } from "../data/save_load_data";
import { head, pair, tail } from "../lib/list";
import { generate_recipe } from "../recipe/recipe_generation";

describe("Testing generate_recipe", () => {
    test("Generating a recipe works as intended (with filters)", () => {
        load_data();
        const recipe = generate_recipe(
            pair(400, 700), 4, ["meat", "root vegetable"]
        );

        expect(recipe.tag).toBe("recipe");

        const ingredient_info = recipe.ingredient_info;
        expect(
            ingredient_info.some(p => head(p).allergies.includes("meat"))
        ).toBe(false);
        expect(
            ingredient_info.some(p => head(p).allergies.includes("root vegetable"))
        ).toBe(false);

        ingredient_info.forEach(p => {
            let [lower, upper] = head(p).range;
            [lower, upper] = [lower * 4, upper * 4]
            expect(tail(p)).toBeGreaterThanOrEqual(lower);
            expect(tail(p)).toBeLessThanOrEqual(upper);
        });

        const kcal = recipe.kcal_per_portion;

        expect(kcal).toBeGreaterThanOrEqual(400);
        expect(kcal).toBeLessThanOrEqual(700);

        expect(recipe.portions).toBe(4);

        expect(recipe.steps.length === 0).toBe(false);
    });
})
