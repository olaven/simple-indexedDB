import { pair } from "../../pair";

/**
 * Methods for adding items to database 
 */
export default interface Add {

    /**
     * Add the specified item to the database 
     * @param key the key of item 
     * @param value item to be added 
     * @throws error if config is not specified
     * @returns true if successful, false if not
     */
    one : (key : any, value : any) => boolean; 

    /**
     * Add several items to the database 
     * @param pairs {key, value}-pairs to add 
     * @throws error if config is not specified 
     * @returns true if successful, false if not
     */
    several : (pairs : pair[]) => boolean;  
    
    /**
     * Specify the config of the add. 
     * This way, data will be added to 
     * the correct store, in the correct 
     * database
     * @param database name of database 
     * @param store name of store 
     * @returns true if successful, false if not 
     */
    setConfig : (name : string, store : string) => boolean; 
}