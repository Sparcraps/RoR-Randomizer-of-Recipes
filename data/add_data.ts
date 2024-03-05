import {
    save_new_category, save_new_ingredient, save_new_kitchenware, load_data
} from "./save_load_data"

import {
    new_ingredient, new_category, new_kitchenware,
} from "../basics"

import {
    pair
} from "../lib/list"


const vegetable = new_category("vegetable", [
    ["chop", "add stock to", "simmer"], ["chop", "fry"], ["fry"],
    ["chop", "bake"], ["chop", "bake", "add stock to", "simmer"], ["bake"],
    ["chop", "stir fry"], ["chop"], ["chop", "add"]
], 5);
const root_vegetable = new_category("root vegetable", [
    ["chop", "boil"], ["chop", "add stock to", "simmer"],
    ["chop", "fry", "add stock to", "simmer"], ["chop", "marinate", "fry"],
    ["chop", "bake"], ["chop", "boil", "mash"]
], 2);
const meat = new_category("meat", [
    ["pound", "fry"], ["marinate", "fry"], ["slice", "marinate", "fry"],
    ["fry"], ["slice", "fry"], ["slice", "add stock to", "simmer"],
    ["slice", "marinate", "add stock to", "simmer"]
], 1);
const spice = new_category("spice", [["add"]], 5);
const carbohydrate = new_category(
    "carbohydrate", [["boil"], ["boil", "fry"]], 1
)

const broccoli = new_ingredient(
    "vegetable", "broccoli", [], "50g", 17, pair(1, 4)
);
const celery = new_ingredient(
    "vegetable", "celery rib", [], "0.5", 7, pair(1, 2)
);
const yellow_onion = new_ingredient(
    "vegetable", "yellow onion", [], "0.5", 46, pair(1, 2)
);
const red_onion = new_ingredient(
    "vegetable", "red onion", [], "0.5", 46, pair(1, 2)
);
const paprika = new_ingredient(
    "vegetable", "paprika", [], "0.5", 31, pair(1, 2)
);
const asparagus = new_ingredient(
    "vegetable", "asparagus", [], "", 3, pair(1, 4)
);
const cabbage = new_ingredient(
    "vegetable", "cabbage", [], "50g", 0.24, pair(1, 3)
);
const aubergine = new_ingredient(
    "vegetable", "aubergine", [], "0.25", 61, pair(1, 2)
);
const garlic_clove = new_ingredient(
    "vegetable", "garlic clove", [], "0.5", 4, pair(1, 2)
);
const tomato = new_ingredient(
    "vegetable", "tomato", [], "0.5", 22, pair(1, 2)
);
const shallot = new_ingredient(
    "vegetable", "shallot", [], "", 31, pair(1, 2)
);

const spaghetti = new_ingredient(
    "carbohydrate", "spaghetti", ["gluten"], "50 g", 78, pair(1, 3)
);
const noodles = new_ingredient(
    "carbohydrate", "noodles", [], "50 g", 69, pair(1, 3)
);
const white_rice = new_ingredient(
    "carbohydrate", "white rice", [], "50 g", 65, pair(1, 3)
);
const brown_rice = new_ingredient(
    "carbohydrate", "brown rice", [], "50 g", 55, pair(1, 3)
);

const carrot = new_ingredient(
    "root vegetable", "carrot", [], "0.5", 30, pair(1, 3)
);
const potato = new_ingredient(
    "root vegetable", "potato", [], "0.5", 85, pair(1, 3)
);
const parsnip = new_ingredient(
    "root vegetable", "parsnip", [], "0.5", 105, pair(1, 3)
);
const sweet_potato = new_ingredient(
    "root vegetable", "sweet potato", [], "0.5", 112, pair(1, 2)
);

const chicken_breast = new_ingredient(
    "meat", "chicken breast", ["meat"], "", 164, pair(1, 1)
);
const chicken_thigh = new_ingredient(
    "meat", "chicken thigh", ["meat"], "", 62, pair(1, 2)
);
const pork_cutlet = new_ingredient(
    "meat", "pork cutlet", ["meat"], "", 218, pair(1, 2)
);
const pork_belly = new_ingredient(
    "meat", "pork belly", ["meat"], "50 g", 177, pair(1, 2)
);
const sausage = new_ingredient(
    "meat", "sausage", ["meat"], "", 210, pair(1, 1)
);
const minced_meat = new_ingredient(
    "meat", "minced meat", ["meat"], "50 g", 120, pair(1, 3)
);
const steak = new_ingredient("meat", "steak", ["meat"], "", 160, pair(1, 1));
const salmon_filet = new_ingredient(
    "meat", "salmon filet", ["meat"], "", 83, pair(1, 2)
);
const cod_filet = new_ingredient(
    "meat", "cod filet", ["meat"], "", 50, pair(1, 2)
);
const shrimp = new_ingredient(
    "meat", "shrimp", ["meat"], "50 g", 100, pair(1, 3)
);

const tarragon = new_ingredient(
    "spice", "tarragon", [], "1 tsp", 10, pair(1, 2)
);
const oregano = new_ingredient("spice", "oregano", [], "1 tsp", 6, pair(1, 2));
const sage = new_ingredient("spice", "sage", [], "1 tsp", 2, pair(1, 2));
const basil = new_ingredient("spice", "basil", [], "1 tsp", 1, pair(1, 2));
const rosemary = new_ingredient(
    "spice", "rosemary", [], "1 tsp", 4, pair(1, 2)
);
const mint = new_ingredient("spice", "mint", [], "1 tsp", 4, pair(1, 2));
const ginger_powder = new_ingredient(
    "spice", "ginger powder", [], "1 tsp", 6, pair(1, 2)
);
const thyme = new_ingredient("spice", "thyme", [], " tsp", 6, pair(1, 2));
const paprika_powder = new_ingredient(
    "spice", "paprika powder", [], "1 tsp", 7, pair(1, 2)
);
const cardamom = new_ingredient(
    "spice", "cardamom", [], "1 tsp", 7, pair(1, 2)
);
const coriander = new_ingredient(
    "spice", "coriander", [], "1 tsp", 8, pair(1, 2)
);
const anise_powder = new_ingredient(
    "spice", "anise powder", [], "1 tsp", 10, pair(1, 2)
);
const cinnamon = new_ingredient(
    "spice", "cinnamon", [], "1 tsp", 6, pair(1, 2)
);
const cloves = new_ingredient(
    "spice", "cloves", [], "1 tsp", 7, pair(1, 2)
);
const onion_powder = new_ingredient(
    "spice", "onion powder", [], "1 tsp", 9, pair(1, 2)
);
const garlic_powder = new_ingredient(
    "spice", "garlic powder", [], "1 tsp", 9, pair(1, 2)
);
const turmeric = new_ingredient(
    "spice", "turmeric", [], "1 tsp", 9, pair(1, 2)
);
const chili_flakes = new_ingredient(
    "spice", "chili flakes", [], "1 tsp", 15, pair(1, 2)
);

const pot = new_kitchenware(
    "pot", ["boil", "reduce", "mash", "saute", "add", "simmer", "add stock to"]
);
const cutting_board = new_kitchenware(
    "cutting board", ["chop", "slice", "pound"]
);
const frying_pan = new_kitchenware(
    "frying pan", ["fry", "simmer", "add", "stir fry"]
);
const oven  = new_kitchenware("oven dish", ["bake", "add"]);
const bowl = new_kitchenware("bowl", ["marinate"]);

load_data();

save_new_category(vegetable, root_vegetable, meat, spice, carbohydrate);

save_new_ingredient(
    broccoli, celery, yellow_onion, red_onion, paprika,
    asparagus, spaghetti, white_rice, brown_rice, carrot, potato, parsnip,
    sweet_potato,chicken_breast, chicken_thigh, pork_cutlet,
    minced_meat, steak, cabbage, aubergine, garlic_clove, tomato, pork_belly, 
    sausage, salmon_filet, cod_filet, shrimp, tarragon, oregano, sage, basil,
    rosemary, mint, ginger_powder, thyme, paprika_powder, cardamom, coriander,
    anise_powder, cinnamon, cloves, onion_powder, garlic_powder, turmeric, 
    chili_flakes, noodles, shallot
    );

save_new_kitchenware(pot, cutting_board, frying_pan, oven, bowl);
