const fs = require('fs');
const filepath = __dirname + "/config.json";

export type Configuration = {
    portion_amount: number,
    dietary_restrictions: Array<string>
}

function new_configuration() { // configuration object with default settings (in case the file gets deleted...)
    return { portion_amount: 4, dietary_restrictions: [] }
}

/**
 * Read and return saved configurations.
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
 * Save a Configuration object to config.json.
 * Note: overwrites existing save data.
 * @param {SaveData} data - Save data to save.
 * @modifies ror_data.json
 */
export function save_configuration(data: Configuration): void {
    const json_data = JSON.stringify(data, null, 4);
    fs.writeFileSync(filepath, json_data);
}

export function change_portion_amount(new_amount: number, config: Configuration): Configuration {
    config.portion_amount = new_amount;
    save_configuration(config);
    return config;
}

/**
 * Add a dietary restriction to a Configuration object
 * and saves the resulting Array to config.json.
 * @param diet_input - Dietary restriction to add
 * @param config - Configuration object that the dietary restriction is added to
 * @modifies config by adding diet_input to the end of it
 * @returns the updated Configuration.
 */
export function add_to_dietary_restrictions(diet_input: string, config: Configuration): Configuration {
    const rest = config.dietary_restrictions;
    diet_input = diet_input.toLowerCase()

    if (!rest.includes(diet_input)) {
        rest.push(diet_input);
        save_configuration(config);
        // console.log("Dietary restriction successfully added!")
    } else {
        console.log("Dietary restriction not added; it is already active.")
    }

    return config;
}

/**
 * Search and remove a dietary restriction from a Configuration object
 * and saves the resulting Array to config.json,
 * or do nothing if the dietary restriction is not found.
 * @param diet_input - Dietary restriction to add
 * @param config - Configuration object that the dietary restriction is added to
 * @modifies config.json and config
 * @returns the updated Configuration.
 */
export function remove_from_dietary_restrictions(diet_input: string, config: Configuration): Configuration {
    const rest = config.dietary_restrictions;
    diet_input = diet_input.toLowerCase();
    const i = rest.indexOf(diet_input);

    if (i !== -1) {
        rest.splice(i, 1);
        save_configuration(config);
        // console.log("Dietary restriction successfully removed!")
    } else {
        console.log("Dietary restriction not removed; it is currently not active.")
    }

    return config;
}
