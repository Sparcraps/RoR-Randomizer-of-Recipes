"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var save_load_data_1 = require("./save_load_data");
var basics_1 = require("./basics");
var list_1 = require("./lib/list");
var vegetable = (0, basics_1.new_category)("vegetable", [["chop", "boil"], ["boil"], ["chop", "fry"], ["fry"], ["chop", "bake"], ["bake"], ["grill"], ["chop", "grill"]], 10);
var root_vegetable = (0, basics_1.new_category)("root vegetable", [["chop", "boil"], ["boil"], ["chop", "fry"], ["chop", "bake"], ["chop", "bake", "boil"], ["chop", "grill"], ["boil", "mash"]], 3);
var liquid = (0, basics_1.new_category)("liquid", [["add"], ["reduce"]], 2);
var meat = (0, basics_1.new_category)("meat", [["grill"], ["slice", "grill"], ["pound", "fry"], ["fry"], ["slice", "fry"], ["boil"], ["slice", "boil"]], 4);
var spice = (0, basics_1.new_category)("spice", [["add"]], 10);
var carbohydrate = (0, basics_1.new_category)("carbohydrate", [["boil"], ["boil", "fry"]], 1);
var fruit = (0, basics_1.new_category)("fruit", [["chop", "add"]], 3);
var broccoli = (0, basics_1.new_ingredient)("vegetable", "broccoli", [], "g", 0.51, (0, list_1.pair)(50, 300));
var celery = (0, basics_1.new_ingredient)("vegetable", "celery", [], "", 9, (0, list_1.pair)(1, 2));
var yellow_onion = (0, basics_1.new_ingredient)("vegetable", "yellow onion", [], "", 46, (0, list_1.pair)(1, 2));
var red_onion = (0, basics_1.new_ingredient)("vegetable", "red onion", [], "", 46, (0, list_1.pair)(1, 2));
var paprika = (0, basics_1.new_ingredient)("vegetable", "paprika", [], "", 31, (0, list_1.pair)(1, 2));
var asparagus = (0, basics_1.new_ingredient)("vegetable", "asparagus", [], "", 3, (0, list_1.pair)(2, 6));
var spaghetti = (0, basics_1.new_ingredient)("carbohydrate", "spaghetti", ["gluten"], "g", 0.3, (0, list_1.pair)(50, 150));
var white_rice = (0, basics_1.new_ingredient)("carbohydrate", "white rice", [], "g", 1.3, (0, list_1.pair)(50, 150));
var brown_rice = (0, basics_1.new_ingredient)("carbohydrate", "brown rice", [], "g", 1.1, (0, list_1.pair)(50, 150));
var carrot = (0, basics_1.new_ingredient)("root vegetable", "carrot", [], "", 30, (0, list_1.pair)(1, 3));
var potato = (0, basics_1.new_ingredient)("root vegetable", "potato", [], "", 85, (0, list_1.pair)(1, 3));
var parsnip = (0, basics_1.new_ingredient)("root vegetable", "parsnip", [], "", 105, (0, list_1.pair)(1, 3));
var sweet_potato = (0, basics_1.new_ingredient)("root vegetable", "sweet potato", [], "", 112, (0, list_1.pair)(1, 3));
var water = (0, basics_1.new_ingredient)("liquid", "water", [], "ml", 0, (0, list_1.pair)(200, 600));
var stock = (0, basics_1.new_ingredient)("liquid", "stock", [], "ml", 0, (0, list_1.pair)(200, 600));
var chicken_breast = (0, basics_1.new_ingredient)("meat", "chicken breast", ["meat"], "", 164, (0, list_1.pair)(1, 2));
var chicken_thigh = (0, basics_1.new_ingredient)("meat", "chicken thigh", ["meat"], "", 62, (0, list_1.pair)(1, 3));
var pork_cutlet = (0, basics_1.new_ingredient)("meat", "pork cutlet", ["meat"], "", 218, (0, list_1.pair)(1, 2));
var minced_meat = (0, basics_1.new_ingredient)("meat", "minced meat", ["meat"], "g", 2.4, (0, list_1.pair)(50, 200));
var steak = (0, basics_1.new_ingredient)("meat", "steak", ["meat"], "g", 160, (0, list_1.pair)(1, 2));
var cucumber = (0, basics_1.new_ingredient)("fruit", "cucumber", [], "", 45, (0, list_1.pair)(1, 2));
var avocado = (0, basics_1.new_ingredient)("fruit", "avocado", [], "", 240, (0, list_1.pair)(1, 2));
var pot = (0, basics_1.new_kitchenware)("pot", ["boil", "reduce", "mash", "saute", "add"]);
var cutting_board = (0, basics_1.new_kitchenware)("cutting board", ["chop", "slice", "pound"]);
var frying_pan = (0, basics_1.new_kitchenware)("frying pan", ["fry", "simmer", "add"]);
var oven = (0, basics_1.new_kitchenware)("oven", ["bake", "grill", "add"]);
var bowl = (0, basics_1.new_kitchenware)("bowl", ["marinate"]);
// save_new_category(vegetable, root_vegetable, liquid, meat, spice, carbohydrate, fruit);
// save_new_ingredient(
//     broccoli, celery, yellow_onion, red_onion, cucumber, avocado, paprika,
//     asparagus, spaghetti, white_rice, brown_rice, carrot, potato, parsnip,
//     sweet_potato, water, stock, chicken_breast, chicken_thigh, pork_cutlet,
//     minced_meat, steak
//     );
// save_new_kitchenware(pot, cutting_board, frying_pan, oven, bowl);
(0, save_load_data_1.delete_category)("liquid");
// const data = load_data();
// const cats = data.categories;
// const cat_i = find_by_name("root vegetable", cats);
// cats[cat_i] = root_vegetable;
// save_data(data);
