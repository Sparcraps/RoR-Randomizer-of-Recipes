import {
    type SaveData, save_new_category, save_new_ingredient, save_new_kitchenware, delete_ingredient, delete_category, load_data, save_data
} from "./save_load_data"
import {
    new_ingredient, new_category, type Category, type Ingredient, new_kitchenware, find_by_name, 
} from "./basics"
import {
    type Pair, pair
} from "./lib/list"


const vegetable = new_category("vegetable", [["chop", "boil"],["boil"], ["chop", "fry"], ["fry"], ["chop", "bake"], ["chop", "bake", "boil"], ["bake"], ["grill"], ["chop", "grill"]], 5);
const root_vegetable = new_category("root vegetable", [["chop", "boil"],["boil"], ["chop", "fry"], ["marinate", "chop", "fry"], ["chop", "marinate", "fry"], ["chop", "bake"], ["chop", "grill"], ["boil", "mash"]], 2);
const liquid = new_category("liquid", [["add"], ["reduce"]], 1)
const meat = new_category("meat", [["grill"], ["slice", "grill"], ["pound", "fry"], ["marinate", "fry"], ["marinate", "slice", "fry"], ["slice", "marinate", "fry"], ["fry"], ["slice", "fry"], ["boil"], ["slice", "boil"]], 3);
const spice = new_category("spice", [["add"]], 5);
const carbohydrate = new_category("carbohydrate", [["boil"], ["boil", "fry"]], 1)
const fruit = new_category("fruit", [["chop", "add"]], 3);

const broccoli = new_ingredient("vegetable", "broccoli", [], "50g", 17, pair(1, 4));
const celery = new_ingredient("vegetable", "celery", [], "0.5", 7, pair(1, 2));
const yellow_onion = new_ingredient("vegetable", "yellow onion", [], "0.5", 46, pair(1, 2));
const red_onion = new_ingredient("vegetable", "red onion", [], "0.5", 46, pair(1, 2));
const paprika = new_ingredient("vegetable", "paprika", [], "0.5", 31, pair(1, 2));
const asparagus = new_ingredient("vegetable", "asparagus", [], "", 3, pair(1, 4));
const cabbage = new_ingredient("vegetable", "cabbage", [], "g", 0.24, pair(50, 150));
const aubergine = new_ingredient("vegetable", "aubergine", [], "0.25", 61, pair(1, 2));
const garlic_clove = new_ingredient("vegetable", "garlic clove", [], "0.5", 4, pair(1, 2));
const tomato = new_ingredient("vegetable", "tomato", [], "0.5", 22, pair(1, 2));
const shallot = new_ingredient("vegetable", "shallot", [], "", 31, pair(1, 2));

const spaghetti = new_ingredient("carbohydrate", "spaghetti", ["gluten"], "50g", 78, pair(1, 3));
const white_rice = new_ingredient("carbohydrate", "white rice", [], "50g", 65, pair(1, 3));
const brown_rice = new_ingredient("carbohydrate", "brown rice", [], "50g", 55, pair(1, 3));

const carrot = new_ingredient("root vegetable", "carrot", [], "0.5", 30, pair(1, 3));
const potato = new_ingredient("root vegetable", "potato", [], "0.5", 85, pair(1, 3));
const parsnip = new_ingredient("root vegetable", "parsnip", [], "0.5", 105, pair(1, 3));
const sweet_potato = new_ingredient("root vegetable", "sweet potato", [], "0.5", 112, pair(1, 2));

const water = new_ingredient("liquid", "water", [], "0.5dl", 0, pair(1, 10));
const stock = new_ingredient("liquid", "stock", [], "0.5dl", 0, pair(1, 10));

const chicken_breast = new_ingredient("meat", "chicken breast", ["meat"], "", 164, pair(1, 2));
const chicken_thigh = new_ingredient("meat", "chicken thigh", ["meat"], "", 62, pair(1, 2));
const pork_cutlet = new_ingredient("meat", "pork cutlet", ["meat"], "", 218, pair(1, 2));
const pork_belly = new_ingredient("meat", "pork belly", ["meat"], "50g", 177, pair(1, 2));
const sausage = new_ingredient("meat", "sausage", ["meat"], "", 210, pair(1, 1));
const minced_meat = new_ingredient("meat", "minced meat", ["meat"], "50g", 120, pair(1, 3));
const steak = new_ingredient("meat", "steak", ["meat"], "", 160, pair(1, 1));
const salmon_filet = new_ingredient("meat", "salmon filet", ["meat"], "", 83, pair(1, 2));
const cod_filet = new_ingredient("meat", "cod filet", ["meat"], "", 50, pair(1, 2));
const shrimp = new_ingredient("meat", "shrimp", ["meat"], "50g", 100, pair(1, 3));

const cucumber = new_ingredient("fruit", "cucumber", [], "0.5", 17, pair(1, 2));
const avocado = new_ingredient("fruit", "avocado", [], "0.5", 120, pair(1, 2));

const tarragon = new_ingredient("spice", "tarragon", [], " tsp", 10, pair(1, 2));
const oregano = new_ingredient("spice", "oregano", [], " tsp", 6, pair(1, 2));
const sage = new_ingredient("spice", "sage", [], " tsp", 2, pair(1, 2));
const basil = new_ingredient("spice", "basil", [], " tsp", 1, pair(1, 2));
const rosemary = new_ingredient("spice", "rosemary", [], " tsp", 4, pair(1, 2));
const mint = new_ingredient("spice", "mint", [], " tsp", 4, pair(1, 2));
const ginger_powder = new_ingredient("spice", "ginger powder", [], " tsp", 6, pair(1, 2));
const thyme = new_ingredient("spice", "thyme", [], " tsp", 6, pair(1, 2));
const paprika_powder = new_ingredient("spice", "paprika powder", [], " tsp", 7, pair(1, 2));
const cardamom = new_ingredient("spice", "cardamom", [], " tsp", 7, pair(1, 2));
const coriander = new_ingredient("spice", "coriander", [], " tsp", 8, pair(1, 2));
const anise_powder = new_ingredient("spice", "anise powder", [], " tsp", 10, pair(1, 2));
const cinnamon = new_ingredient("spice", "cinnamon", [], " tsp", 6, pair(1, 2));
const cloves = new_ingredient("spice", "cloves", [], " tsp", 7, pair(1, 2));
const onion_powder = new_ingredient("spice", "onion powder", [], " tsp", 9, pair(1, 2));
const garlic_powder = new_ingredient("spice", "garlic powder", [], " tsp", 9, pair(1, 2));
const turmeric = new_ingredient("spice", "turmeric", [], " tsp", 9, pair(1, 2));
const chili_flakes = new_ingredient("spice", "chili flakes", [], " tsp", 15, pair(1, 2));

const pot = new_kitchenware("pot", ["boil", "reduce", "mash", "saute", "add"]);
const cutting_board = new_kitchenware("cutting board", ["chop", "slice", "pound"]);
const frying_pan = new_kitchenware("frying pan", ["fry", "simmer", "add"]);
const oven  = new_kitchenware("oven", ["bake", "add"]);
const bowl = new_kitchenware("bowl", ["marinate"]);


save_new_category(vegetable, root_vegetable, liquid, meat, spice, carbohydrate, fruit);

save_new_ingredient(
    broccoli, celery, yellow_onion, red_onion, cucumber, avocado, paprika,
    asparagus, spaghetti, white_rice, brown_rice, carrot, potato, parsnip,
    sweet_potato, water, stock, chicken_breast, chicken_thigh, pork_cutlet,
    minced_meat, steak, cabbage, aubergine, garlic_clove, tomato, pork_belly, 
    sausage, salmon_filet, cod_filet, shrimp, tarragon, oregano, sage, basil,
    rosemary, mint, ginger_powder, thyme, paprika_powder, cardamom, coriander,
    anise_powder, cinnamon, cloves, onion_powder, garlic_powder, turmeric, 
    chili_flakes
    );

save_new_kitchenware(pot, cutting_board, frying_pan, oven, bowl);

delete_category("liquid");

// const data = load_data();
// const cats = data.categories;
// const cat_i = find_by_name("root vegetable", cats);
// cats[cat_i] = root_vegetable;
// save_data(data);
