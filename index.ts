
const getOpenDB = (databaseName: string,
    callback: (open: IDBOpenDBRequest) => void) => {
    try {
        var indexedDB = window.indexedDB // || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        if (!indexedDB) throw "indexedDB is not supported";
        // opening (creating) database 
        const open = indexedDB.open(databaseName)
        callback(open);
    } catch (error) {
        console.error(error);
    }
}

const getDatabaseTransaction = (databaseName: string,
    storeName: string, callback: (store: IDBObjectStore) => any) => {
    getOpenDB(databaseName, open => {
        open.onsuccess = (request) => {
            const db = open.result;
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);

            callback(store);
        }
    })
}

/**
 * 
 * @param databaseName name of database to create 
 * @param storeName name of store to create
 */
export const createStore = (databaseName: string,
    storeName: string) => {
    getOpenDB(databaseName, openedDB => {
        openedDB.onupgradeneeded = () => {
            const db = openedDB.result;
            db.createObjectStore(storeName);
        }
    });
}

/**
 * Put data (replace or add) into database 
 * @param databaseName name of database 
 * @param storeName name of store 
 * @param data data to put 
 * @param key key to replace
 * @param callback callback requests the result 
 */
export const put = (databaseName: string,
    storeName: string, data: any, key: string, callback: (result: any) => any) => {
    getDatabaseTransaction(databaseName, storeName, (store) => {
        if (!data[key]) throw "invalid keyProperty. Has to be available on object, ie. 'id' -> addedData.id"

        let addRequest = store.put(data, data[key]);
        addRequest.onsuccess = () => {
            if (callback) callback(addRequest.result);
        }
    });
}

/**
 * Remove data from database 
 * @param key key to remove 
 * @param storeName store to remove from
 * @param databaseName name of database 
 * @param callback callback, result as response
 */
export const remove = (key: any, storeName: string,
    databaseName: string, callback: (result: any) => any) => {
    getDatabaseTransaction(databaseName, storeName, (store) => {
        //store.remove(key)
        let removeRequest = store.delete(key);
        removeRequest.onsuccess = () => {
            callback(removeRequest.result);
        }
    });
}

/**
 * Get data from store 
 * @param key key to get from
 * @param storeName store to get from 
 * @param databaseName database to get from 
 */
export const get = (key : any, storeName : string, databaseName : string) => {
    getDatabaseTransaction(databaseName, storeName, (store) => {
        let getRequest = store.get(key); 
        getRequest.onsuccess = () => {
            return getRequest.result; 
        }
    }); 
}

/**
 * Get all data from store 
 * @param storeName store to get from 
 * @param databaseName database to get from 
 */
export const getAll = (storeName: string, databaseName: string) => {
    getDatabaseTransaction(databaseName, storeName, (store) => {
        let getRequest = store.getAll(); 
        getRequest.onsuccess = () => {
            return getRequest.result;
        }
    });
}

/**
 * Type definition for getAll(), as 
 * the method is missing from the 
 * standard type definition
 */
interface IDBObjectStore {
    get(key : any): IDBRequest; 
    getAll(): IDBRequest;
    put(data : any, key : any): IDBRequest; 
    delete(key : string): IDBRequest; 
}
