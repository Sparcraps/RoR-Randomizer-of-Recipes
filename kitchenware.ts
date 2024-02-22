/**
 * Kitchenware data type.
 * Has an inventory of ingredients currently contained in the kitchenware.
 */
export type KitchenWare = {
    tag: "kitchenware",
    name: string,
    inventory: Array<Ingredient>
};