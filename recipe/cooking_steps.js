"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_cooking_steps = void 0;
var basics_1 = require("../basics");
var list_1 = require("../lib/list");
var save_load_data_1 = require("../data/save_load_data");
function new_cooking_step(cooking_method, ingredient_names, kitchenware, is_kw_active) {
    return {
        cooking_method: cooking_method,
        ingredient_names: ingredient_names,
        kitchenware: kitchenware,
        is_kw_active: is_kw_active
    };
}
/** Generates cooking steps from already randomized ingredient information.
 * @param selected_methods - Array containing methods and ingredient names.
 * @param kw_data - Array of kitchenware to use in cooking steps generation.
 * @returns an array of CookingStep objects.
*/
function generate_cooking_steps(selected_methods) {
    var data = (0, save_load_data_1.get_data)();
    var cooking_steps = [];
    var retired_kitchenware = [];
    var kw_data = JSON.parse(JSON.stringify(// creates copy of kitchenware data
    data.kitchenware));
    // first looks for kitchenware with the cooking method in saved kitchenware,
    // or if the method is add first looks in retired kitchenware, and
    // returns the first one that can do the method along with a boolean for
    // whether the kitchenware is from retired_kitchenware.
    function get_kitchenware_from_method(cooking_method) {
        var available_kw = [];
        if (cooking_method === "add") {
            for (var i = 0; i < retired_kitchenware.length; i++) {
                var kw = retired_kitchenware[i];
                if (kw.cooking_methods.includes(cooking_method)) {
                    available_kw.push(kw);
                }
            }
            if (available_kw.length > 0) {
                var kw_i = Math.floor(Math.random() * available_kw.length);
                var selected_kw = available_kw[kw_i];
                return (0, list_1.pair)(selected_kw, true);
            }
            else { }
        }
        else { }
        for (var i = 0; i < kw_data.length; i++) {
            var kw = kw_data[i];
            if (kw.cooking_methods.includes(cooking_method)) {
                var copy_kw = JSON.parse(JSON.stringify(kw)); // copies kitchenware if it's from save data
                return (0, list_1.pair)(copy_kw, false);
            }
        }
        if (available_kw.length > 0) {
            var kw_i = Math.floor(Math.random() * available_kw.length);
            var selected_kw = available_kw[kw_i];
            return (0, list_1.pair)(selected_kw, true);
        }
        else {
            throw new Error("No kitchenware with cooking method " +
                cooking_method + "exists.");
        }
    }
    // adds cooking step to steps array, removes first element in method, calls
    // recursively until method is empty.
    function add_cooking_step(method, ingredient_names, steps, kw) {
        var _a;
        if (kw === void 0) { kw = undefined; }
        // adds defined kitchenware from to retired_kitchenware.
        function retire_kitchenware(kitchenware) {
            if (!(kitchenware === undefined)) {
                retired_kitchenware.push(kitchenware);
            }
            else { }
        }
        if (method.length === 0) {
            retire_kitchenware(kw);
            return;
        }
        else { }
        var current_method = method[0];
        method.shift(); // removes current method from method
        var is_active = true;
        if (kw === undefined || !kw.cooking_methods.includes(current_method)) {
            retire_kitchenware(kw);
            _a = get_kitchenware_from_method(current_method), kw = _a[0], is_active = _a[1];
        }
        else { }
        var extra_i = [];
        if ((0, basics_1.has_separable_inventory)(kw)) {
            extra_i = do_separable_method(current_method, steps);
        }
        else { }
        kw.inventory = __spreadArray(__spreadArray([], ingredient_names, true), extra_i, true);
        var current_step = new_cooking_step(current_method, __spreadArray(__spreadArray([], ingredient_names, true), extra_i, true), kw, is_active);
        steps.push(current_step);
        var more_ingredients = do_similar_methods(method, steps); // finds ingredients that use the same method as the rest of method from some point.
        ingredient_names.push.apply(// finds ingredients that use the same method as the rest of method from some point.
        ingredient_names, more_ingredients);
        return add_cooking_step(method, ingredient_names, steps, kw);
    }
    // for separable kitchenware, finds all ingredients with same cooking method
    // first in method array and returns ingredient names for method step.
    function do_separable_method(method, steps) {
        var ingredient_names = [];
        for (var i = 0; i < selected_methods.length; i++) {
            var other_method = (0, list_1.head)(selected_methods[i]);
            var m = other_method[0];
            for (var j = 0; j < other_method.length - 1; j++) {
                var m_1 = other_method[j];
                if (m_1 === method) {
                    var names = (0, list_1.tail)(selected_methods[i]);
                    ingredient_names.push.apply(ingredient_names, names); // adds ingredient for matching method to list
                    var rest_of_method = other_method.splice(0, j + 1); // removes methods up to found method from other method array and saves these in another method
                    rest_of_method.pop(); // removes found method
                    add_cooking_step(rest_of_method, names, steps);
                }
                else { }
            }
        }
        return ingredient_names;
    }
    // finds methods that contain the input method at the end and adds cooking
    // steps for the earlier parts of their methods. 
    // Returns their ingredient names.
    function do_similar_methods(method, steps) {
        var ingredient_names = [];
        for (var i = 0; i < selected_methods.length; i++) {
            var other_method = (0, list_1.head)(selected_methods[i]);
            if (other_method === method) {
                continue;
            }
            else { }
            var copy_method = __spreadArray([], other_method, true);
            for (var j = 0; j < other_method.length; j++) {
                if (copy_method.toString() === method.toString()) {
                    var names = (0, list_1.tail)(selected_methods[i]);
                    ingredient_names.push.apply(ingredient_names, names); // adds ingredient for matching method to list
                    other_method.splice(j, method.length); // removes part of other method that matches method
                    add_cooking_step(other_method, names, steps);
                    break;
                }
                else {
                    copy_method.shift();
                }
            }
        }
        return ingredient_names;
    }
    for (var i = 0; i < selected_methods.length; i++) {
        var _a = selected_methods[i], method = _a[0], ingredients = _a[1];
        if (!(method.length === 0)) {
            var more_ingredients = do_similar_methods(method, cooking_steps);
            ingredients.push.apply(ingredients, more_ingredients);
            add_cooking_step(method, ingredients, cooking_steps);
        }
        else { }
    }
    return cooking_steps;
}
exports.generate_cooking_steps = generate_cooking_steps;
