/**
 * Describes the interface for general operations, 
 * such as: 
 * * adding
 * * removing 
 * * updating
 */

import { pair } from "../../pair";
import { Config } from "../../config";

/**
 * Methods for doing something to the database  
 */
export default interface DatabaseAccessor {

    /**
     * Do database accessing to the specified item to the database
     * @param key the key of item 
     * @param value item to be added 
     * @throws error if config is not specified
     * @returns true if successful, false if not
     */
    one: (key: any, value: any) => boolean;

    /**
     * Do database accessing on several items to the database
     * @param pairs {key, value}-pairs to add 
     * @throws error if config is not specified 
     * @returns true if successful, false if not
     */
    several: (pairs: pair[]) => boolean;

    /**
     * Specify the config of the database accessor .
     * This way, data will be udpated in 
     * the correct store, in the correct 
     * database
     * @param config 
     *       {name of database : string, name of store : string}
     */
    setConfig: (config : Config) => void;

    /**
     * Get the config of the database accessor 
     */
    getConfig: () => Config; 
}