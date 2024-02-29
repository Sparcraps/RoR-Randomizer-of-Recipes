"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove_from_dietary_restrictions = exports.add_to_dietary_restrictions = exports.change_portion_amount = exports.save_configuration = exports.load_configuration = void 0;
var fs = require('fs');
var filepath = __dirname + "/config.json";
function new_configuration() {
    return { portion_amount: 4, dietary_restrictions: [] };
}
/**
 * Read and return saved configurations.
 * @returns {Configuration} - Configuration object.
 */
function load_configuration() {
    if (fs.existsSync(filepath)) {
        var json_data = fs.readFileSync(filepath);
        var config = JSON.parse(json_data);
        // if (!is_configuration(config)) {
        //     throw new Error("config.json is not formatted correctly.");
        // }
        return config;
    }
    else {
        return new_configuration();
    }
}
exports.load_configuration = load_configuration;
/**
 * Save a Configuration object to config.json.
 * Note: overwrites existing save data.
 * @param {SaveData} data - Save data to save.
 * @modifies ror_data.json
 */
function save_configuration(data) {
    var json_data = JSON.stringify(data, null, 4);
    fs.writeFileSync(filepath, json_data);
}
exports.save_configuration = save_configuration;
function change_portion_amount(new_amount, config) {
    config.portion_amount = new_amount;
    save_configuration(config);
    return config;
}
exports.change_portion_amount = change_portion_amount;
/**
 * Add a dietary restriction to a Configuration object
 * and saves the resulting Array to config.json.
 * @param diet_input - Dietary restriction to add
 * @param config - Configuration object that the dietary restriction is added to
 * @modifies config by adding diet_input to the end of it
 * @returns the updated Configuration.
 */
function add_to_dietary_restrictions(diet_input, config) {
    var rest = config.dietary_restrictions;
    diet_input = diet_input.toLowerCase();
    if (!rest.includes(diet_input)) {
        rest.push(diet_input);
        save_configuration(config);
        // console.log("Dietary restriction successfully added!")
    }
    else {
        console.log("Dietary restriction not added; it is already active.");
    }
    return config;
}
exports.add_to_dietary_restrictions = add_to_dietary_restrictions;
/**
 * Search and remove a dietary restriction from a Configuration object
 * and saves the resulting Array to config.json,
 * or do nothing if the dietary restriction is not found.
 * @param diet_input - Dietary restriction to add
 * @param config - Configuration object that the dietary restriction is added to
 * @modifies config.json and config
 * @returns the updated Configuration.
 */
function remove_from_dietary_restrictions(diet_input, config) {
    var rest = config.dietary_restrictions;
    diet_input = diet_input.toLowerCase();
    var i = rest.indexOf(diet_input);
    if (i !== -1) {
        rest.splice(i, 1);
        save_configuration(config);
        // console.log("Dietary restriction successfully removed!")
    }
    else {
        console.log("Dietary restriction not removed; it is currently not active.");
    }
    return config;
}
exports.remove_from_dietary_restrictions = remove_from_dietary_restrictions;
