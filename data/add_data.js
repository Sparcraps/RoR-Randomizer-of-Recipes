"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var save_load_data_1 = require("./save_load_data");
var basics_1 = require("../basics");
var list_1 = require("../lib/list");
var vegetable = (0, basics_1.new_category)("vegetable", [
    ["chop", "add stock to", "simmer"], ["chop", "fry"], ["fry"],
    ["chop", "bake"], ["chop", "bake", "add stock to", "simmer"], ["bake"],
    ["chop", "stir fry"], ["chop"], ["chop", "add"]
], 5);
var root_vegetable = (0, basics_1.new_category)("root vegetable", [
    ["chop", "boil"], ["chop", "add stock to", "simmer"],
    ["chop", "fry", "add stock to", "simmer"], ["chop", "marinate", "fry"],
    ["chop", "bake"], ["chop", "boil", "mash"]
], 2);
var meat = (0, basics_1.new_category)("meat", [
    ["pound", "fry"], ["marinate", "fry"], ["slice", "marinate", "fry"],
    ["fry"], ["slice", "fry"], ["boil"], ["slice", "add stock to", "simmer"],
    ["slice", "marinate", "add stock to", "simmer"]
], 1);
var spice = (0, basics_1.new_category)("spice", [["add"]], 5);
var carbohydrate = (0, basics_1.new_category)("carbohydrate", [["boil"], ["boil", "fry"]], 1);
var broccoli = (0, basics_1.new_ingredient)("vegetable", "broccoli", [], "50g", 17, (0, list_1.pair)(1, 4));
var celery = (0, basics_1.new_ingredient)("vegetable", "celery rib", [], "0.5", 7, (0, list_1.pair)(1, 2));
var yellow_onion = (0, basics_1.new_ingredient)("vegetable", "yellow onion", [], "0.5", 46, (0, list_1.pair)(1, 2));
var red_onion = (0, basics_1.new_ingredient)("vegetable", "red onion", [], "0.5", 46, (0, list_1.pair)(1, 2));
var paprika = (0, basics_1.new_ingredient)("vegetable", "paprika", [], "0.5", 31, (0, list_1.pair)(1, 2));
var asparagus = (0, basics_1.new_ingredient)("vegetable", "asparagus", [], "", 3, (0, list_1.pair)(1, 4));
var cabbage = (0, basics_1.new_ingredient)("vegetable", "cabbage", [], "g", 0.24, (0, list_1.pair)(50, 150));
var aubergine = (0, basics_1.new_ingredient)("vegetable", "aubergine", [], "0.25", 61, (0, list_1.pair)(1, 2));
var garlic_clove = (0, basics_1.new_ingredient)("vegetable", "garlic clove", [], "0.5", 4, (0, list_1.pair)(1, 2));
var tomato = (0, basics_1.new_ingredient)("vegetable", "tomato", [], "0.5", 22, (0, list_1.pair)(1, 2));
var shallot = (0, basics_1.new_ingredient)("vegetable", "shallot", [], "", 31, (0, list_1.pair)(1, 2));
var spaghetti = (0, basics_1.new_ingredient)("carbohydrate", "spaghetti", ["gluten"], "50 g", 78, (0, list_1.pair)(1, 3));
var noodles = (0, basics_1.new_ingredient)("carbohydrate", "noodles", [], "50 g", 69, (0, list_1.pair)(1, 3));
var white_rice = (0, basics_1.new_ingredient)("carbohydrate", "white rice", [], "50 g", 65, (0, list_1.pair)(1, 3));
var brown_rice = (0, basics_1.new_ingredient)("carbohydrate", "brown rice", [], "50 g", 55, (0, list_1.pair)(1, 3));
var carrot = (0, basics_1.new_ingredient)("root vegetable", "carrot", [], "0.5", 30, (0, list_1.pair)(1, 3));
var potato = (0, basics_1.new_ingredient)("root vegetable", "potato", [], "0.5", 85, (0, list_1.pair)(1, 3));
var parsnip = (0, basics_1.new_ingredient)("root vegetable", "parsnip", [], "0.5", 105, (0, list_1.pair)(1, 3));
var sweet_potato = (0, basics_1.new_ingredient)("root vegetable", "sweet potato", [], "0.5", 112, (0, list_1.pair)(1, 2));
var chicken_breast = (0, basics_1.new_ingredient)("meat", "chicken breast", ["meat"], "", 164, (0, list_1.pair)(1, 1));
var chicken_thigh = (0, basics_1.new_ingredient)("meat", "chicken thigh", ["meat"], "", 62, (0, list_1.pair)(1, 2));
var pork_cutlet = (0, basics_1.new_ingredient)("meat", "pork cutlet", ["meat"], "", 218, (0, list_1.pair)(1, 2));
var pork_belly = (0, basics_1.new_ingredient)("meat", "pork belly", ["meat"], "50 g", 177, (0, list_1.pair)(1, 2));
var sausage = (0, basics_1.new_ingredient)("meat", "sausage", ["meat"], "", 210, (0, list_1.pair)(1, 1));
var minced_meat = (0, basics_1.new_ingredient)("meat", "minced meat", ["meat"], "50 g", 120, (0, list_1.pair)(1, 3));
var steak = (0, basics_1.new_ingredient)("meat", "steak", ["meat"], "", 160, (0, list_1.pair)(1, 1));
var salmon_filet = (0, basics_1.new_ingredient)("meat", "salmon filet", ["meat"], "", 83, (0, list_1.pair)(1, 2));
var cod_filet = (0, basics_1.new_ingredient)("meat", "cod filet", ["meat"], "", 50, (0, list_1.pair)(1, 2));
var shrimp = (0, basics_1.new_ingredient)("meat", "shrimp", ["meat"], "50 g", 100, (0, list_1.pair)(1, 3));
var tarragon = (0, basics_1.new_ingredient)("spice", "tarragon", [], "1 tsp", 10, (0, list_1.pair)(1, 2));
var oregano = (0, basics_1.new_ingredient)("spice", "oregano", [], "1 tsp", 6, (0, list_1.pair)(1, 2));
var sage = (0, basics_1.new_ingredient)("spice", "sage", [], "1 tsp", 2, (0, list_1.pair)(1, 2));
var basil = (0, basics_1.new_ingredient)("spice", "basil", [], "1 tsp", 1, (0, list_1.pair)(1, 2));
var rosemary = (0, basics_1.new_ingredient)("spice", "rosemary", [], "1 tsp", 4, (0, list_1.pair)(1, 2));
var mint = (0, basics_1.new_ingredient)("spice", "mint", [], "1 tsp", 4, (0, list_1.pair)(1, 2));
var ginger_powder = (0, basics_1.new_ingredient)("spice", "ginger powder", [], "1 tsp", 6, (0, list_1.pair)(1, 2));
var thyme = (0, basics_1.new_ingredient)("spice", "thyme", [], " tsp", 6, (0, list_1.pair)(1, 2));
var paprika_powder = (0, basics_1.new_ingredient)("spice", "paprika powder", [], "1 tsp", 7, (0, list_1.pair)(1, 2));
var cardamom = (0, basics_1.new_ingredient)("spice", "cardamom", [], "1 tsp", 7, (0, list_1.pair)(1, 2));
var coriander = (0, basics_1.new_ingredient)("spice", "coriander", [], "1 tsp", 8, (0, list_1.pair)(1, 2));
var anise_powder = (0, basics_1.new_ingredient)("spice", "anise powder", [], "1 tsp", 10, (0, list_1.pair)(1, 2));
var cinnamon = (0, basics_1.new_ingredient)("spice", "cinnamon", [], "1 tsp", 6, (0, list_1.pair)(1, 2));
var cloves = (0, basics_1.new_ingredient)("spice", "cloves", [], "1 tsp", 7, (0, list_1.pair)(1, 2));
var onion_powder = (0, basics_1.new_ingredient)("spice", "onion powder", [], "1 tsp", 9, (0, list_1.pair)(1, 2));
var garlic_powder = (0, basics_1.new_ingredient)("spice", "garlic powder", [], "1 tsp", 9, (0, list_1.pair)(1, 2));
var turmeric = (0, basics_1.new_ingredient)("spice", "turmeric", [], "1 tsp", 9, (0, list_1.pair)(1, 2));
var chili_flakes = (0, basics_1.new_ingredient)("spice", "chili flakes", [], "1 tsp", 15, (0, list_1.pair)(1, 2));
var pot = (0, basics_1.new_kitchenware)("pot", ["boil", "reduce", "mash", "saute", "add", "simmer"]);
var cutting_board = (0, basics_1.new_kitchenware)("cutting board", ["chop", "slice", "pound"]);
var frying_pan = (0, basics_1.new_kitchenware)("frying pan", ["fry", "simmer", "add", "stir fry"]);
var oven = (0, basics_1.new_kitchenware)("oven", ["bake", "add"]);
var bowl = (0, basics_1.new_kitchenware)("bowl", ["marinate"]);
(0, save_load_data_1.load_data)();
(0, save_load_data_1.save_new_category)(vegetable, root_vegetable, meat, spice, carbohydrate);
(0, save_load_data_1.save_new_ingredient)(broccoli, celery, yellow_onion, red_onion, paprika, asparagus, spaghetti, white_rice, brown_rice, carrot, potato, parsnip, sweet_potato, chicken_breast, chicken_thigh, pork_cutlet, minced_meat, steak, cabbage, aubergine, garlic_clove, tomato, pork_belly, sausage, salmon_filet, cod_filet, shrimp, tarragon, oregano, sage, basil, rosemary, mint, ginger_powder, thyme, paprika_powder, cardamom, coriander, anise_powder, cinnamon, cloves, onion_powder, garlic_powder, turmeric, chili_flakes, noodles, shallot);
(0, save_load_data_1.save_new_kitchenware)(pot, cutting_board, frying_pan, oven, bowl);
// const data = load_data();
// const cats = data.categories;
// const cat_i = find_by_name("root vegetable", cats);
// cats[cat_i] = root_vegetable;
// save_data(data);
