import DatabaseAccessor from "./interfaces/databaseAccessor";
import { Config } from '../config'; 

export const getDBInstance = 
    (config : Config, callback : (database : IDBDatabase) => void) => 
{
    // separate out 
    let request = window.indexedDB.open(config.database);

    request.onerror = (error) => {
        throw "error when requesting database: " + error;
    }

    request.onsuccess = () => {
        callback(request.result); 
    }
}


export const checkIndexedDBAvailability = (databaseAccessor : DatabaseAccessor) => 
{
    if (databaseAccessor.getConfig() == null) {
        throw "Config is not set."
    }
}