const fs = require('fs');
const filepath = __dirname + "/config.json";

type Configuration = {
    portion_amount: number,
    dietary_restrictions: Array<string>
}

function new_configuration() { // configuration object with default settings (in case the file gets deleted...)
    return { portion_amount: 4, dietary_restrictions: [] }
}

/**
 * Reads and returns saved configurations.
 * @returns {Configuration} - Configuration object.
 */
export function load_configuration(): Configuration {
    if (fs.existsSync(filepath)) {
        const json_data = fs.readFileSync(filepath);
        const config = JSON.parse(json_data);
        // if (!is_configuration(config)) {
        //     throw new Error("config.json is not formatted correctly.");
        // }
        return config;
    } else {
        return new_configuration();
    }
}

/**
 * Saves a Configuration object to config.json.
 * Note: overwrites existing save data.
 * @param {SaveData} data - Save data to save.
 * @modifies ror_data.json
 */
export function save_configuration(data: Configuration): void {
    const json_data = JSON.stringify(data, null, 4);
    fs.writeFileSync(filepath, json_data);
}