import {
    type SaveData, save_new_category, save_new_ingredient, save_new_kitchenware
} from "./save_load_data"
import {
    new_ingredient, new_category, type Category, type Ingredient, new_kitchenware
} from "./basics"
import {
    type Pair, pair
} from "./lib/list"


// const vegetable = new_category("vegetable", [["chop", "boil"],["boil"], ["chop", "fry"], ["fry"], ["chop", "bake"], ["bake"], ["grill"], ["chop", "grill"]], 10);
// const root_vegetable = new_category("root_vegetable", [["chop", "boil"],["boil"], ["chop", "fry"], ["chop", "bake"], ["bake"], ["grill"], ["chop", "grill"], ["boil", "mash"]], 3);
// const liquid = new_category("liquid", [["add"], ["reduce"]], 2)
// const meat = new_category("meat", [["grill"], ["slice", "grill"], ["pound", "fry"], ["fry"], ["slice", "fry"], ["boil"], ["slice", "boil"]], 4);
// const spice = new_category("spice", [["add"]], 10);
// const carbohydrate = new_category("carbohydrate", [["boil"], ["boil", "fry"]], 3)

// const broccoli = new_ingredient("vegetable", "broccoli", [], "g", 0.51, pair(50, 300));
// const celery = new_ingredient("vegetable", "celery", [], "", 9, pair(1, 2));
// const yellow_onion = new_ingredient("vegetable", "yellow_onion", [], "", 46, pair(1, 2));
// const red_onion = new_ingredient("vegetable", "red onion", [], "", 46, pair(1, 2));
// const cucumber = new_ingredient("vegetable", "cucumber", [], "", 45, pair(1, 2));
// const avocado = new_ingredient("vegetable", "avocado", [], "", 240, pair(1, 2));
// const paprika = new_ingredient("vegetable", "paprika", [], "", 31, pair(1, 2));
// const asparagus = new_ingredient("vegetable", "asparagus", [], "", 3, pair(2, 6));

// const spaghetti = new_ingredient("carbohydrate", "spaghetti", ["gluten"], "g", 0.3, pair(50, 150));
// const white_rice = new_ingredient("carbohydrate", "white_rice", [], "g", 1.3, pair(50, 150));
// const brown_rice = new_ingredient("carbohydrate", "brown_rice", [], "g", 1.1, pair(50, 150));

// const carrot = new_ingredient("root_vegetable", "carrot", [], "", 30, pair(1, 3));
// const potato = new_ingredient("root_vegetable", "potato", [], "", 85, pair(1, 3));
// const parsnip = new_ingredient("root_vegetable", "parsnip", [], "", 105, pair(1, 3));
// const sweet_potato = new_ingredient("root_vegetable", "sweet_potato", [], "", 112, pair(1, 3));

// const water = new_ingredient("liquid", "water", [], "ml", 0, pair(200, 600));
// const stock = new_ingredient("liquid", "stock", [], "ml", 0, pair(200, 600));

// const chicken_breast = new_ingredient("meat", "chicken breast", ["meat"], "", 164, pair(1, 2));
// const chicken_thigh = new_ingredient("meat", "chicken thigh", ["meat"], "", 62, pair(1, 3));
// const pork_cutlet = new_ingredient("meat", "pork_cutlet", ["meat"], "", 218, pair(1, 2));
// const minced_meat = new_ingredient("meat", "minced_meat", ["meat"], "g", 2.4, pair(50, 200));
// const steak = new_ingredient("meat", "steak", ["meat"], "g", 160, pair(1, 2));

const pot = new_kitchenware("pot", ["boil", "reduce", "mash", "saute", "add"]);
const cutting_board = new_kitchenware("cutting board", ["chop", "slice", "pound"]);
const frying_pan = new_kitchenware("frying pan", ["fry", "simmer", "add"]);
const oven  = new_kitchenware("oven", ["bake", "grill", "add"]);
const bowl = new_kitchenware("bowl", ["marinate"]);

// save_new_category(vegetable, root_vegetable, liquid, meat, spice, carbohydrate);

// save_new_ingredient(
//     broccoli, celery, yellow_onion, red_onion, cucumber, avocado, paprika,
//     asparagus, spaghetti, white_rice, brown_rice, carrot, potato, parsnip,
//     sweet_potato, water, stock, chicken_breast, chicken_thigh, pork_cutlet,
//     minced_meat, steak
//     );

save_new_kitchenware(pot, cutting_board, frying_pan, oven, bowl);