import {
    print_bold
} from "../menu/menu_global_functions";

/**
 * Configuration data type.
 * Contains data about the user's current configurations.
 */
export type Configuration = {
    portion_amount: number,
    dietary_restrictions: Array<string>
}

/**
 * Creates a new configurations object with default settings.
 * Can be used in case the config.json gets deleted.
 * @returns a Configuration object
 */
function new_configuration(): Configuration {
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

/**
 * Change the portion amounts to generate.
 * @param {number} new_amount - the new portion amount.
 * @param {Configuration} config - the configuration to change.
 * @returns {Configuration} the updated configuration.
 */
export function change_portion_amount(new_amount: number,
                                      config: Configuration): Configuration {
    config.portion_amount = new_amount;
    save_configuration(config);
    return config;
}

/**
 * Add a dietary restriction to a Configuration object
 * and saves the resulting Array to config.json.
 * @param {string} diet_input - Dietary restriction to add
 * @param {Configuration} config - Configuration object that the dietary restriction is added to
 * @modifies config by adding diet_input to the end of it
 * @returns {Configuration} the updated Configuration.
 */
export function add_to_dietary_restrictions(
    diet_input: string, config: Configuration
    ): Configuration {
    const rest = config.dietary_restrictions;
    diet_input = diet_input.toLowerCase()

    if (!rest.includes(diet_input)) {
        rest.push(diet_input);
        save_configuration(config);
    } else {
        print_bold("Dietary restriction not added; it is already active.");
    }

    return config;
}

/**
 * Search and remove a dietary restriction from a Configuration object
 * and saves the resulting Array to config.json,
 * or do nothing if the dietary restriction is not found.
 * @param {string} diet_input - Dietary restriction to add
 * @param {Configuration} config - Configuration object that the dietary restriction is added to
 * @modifies config.json and config
 * @returns {Configuration} the updated Configuration.
 */
export function remove_from_dietary_restrictions(
    diet_input: string, config: Configuration
    ): Configuration {
    const rest = config.dietary_restrictions;
    diet_input = diet_input.toLowerCase();
    const i = rest.indexOf(diet_input);

    if (i !== -1) {
        rest.splice(i, 1);
        save_configuration(config);
    } else {
        print_bold("Dietary restriction not removed; " +
        "it is currently not active.");
    }

    return config;
}

const fs = require('fs');
const filepath = __dirname + "/config.json";
