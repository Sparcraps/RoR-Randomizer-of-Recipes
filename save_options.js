"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save_configuration = exports.load_configuration = void 0;
var fs = require('fs');
var filepath = __dirname + "/config.json";
function new_configuration() {
    return { portion_amount: 4, dietary_restrictions: [] };
}
/**
 * Reads and returns saved configurations.
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
 * Saves a Configuration object to config.json.
 * Note: overwrites existing save data.
 * @param {SaveData} data - Save data to save.
 * @modifies ror_data.json
 */
function save_configuration(data) {
    var json_data = JSON.stringify(data, null, 4);
    fs.writeFileSync(filepath, json_data);
}
exports.save_configuration = save_configuration;
