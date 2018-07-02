

/**
 * Returns an opened DB 
 * For normal CRUD-operatins, use other 
 * methods in this library
 * @param {string} databaseName of database 
 * @callback has the opened database as parameter
 * @throws If indexDB is not availble 
 * @throws error opening database
 */
const getOpenDB = (databaseName, callback) => {
    try {
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        if (!indexedDB) throw "indexedDB is not supported";
        // opening (creating) database 
        const open = indexedDB.open(databaseName)
        callback(open);
    } catch (error) {
        console.error(error); 
    } 
} 

/**
 * Creates a transaction specified store, in specified database
 * @param databaseName database to create transaction in 
 * @param storename storeName to get transaction on 
 * @param callback {(store) => {}}actions in transaction
 * @returns {Promise} 
 */
const getDatabaseTransaction = (databaseName, storeName, callback) => {
    getOpenDB(databaseName, openedDB => {
        return new Promise((resolve, reject) => {
            openedDB.onsuccess = (request) => {
                const db = openedDB.result;
                const transaction = db.transaction(storeName, "readwrite");
                const store = transaction.objectStore(storeName);

                callback(store); 
            }
        });
    });  
}

/**
 * Creates an object store
 * @param {string} databaseName of database 
 * @param {string} storeName of the store 
 */
const createStore = (databaseName, storeName) => {
    getOpenDB(databaseName, (openedDB => {
        openedDB.onupgradeneeded = () => {
            const db = openedDB.result; 
            const store = db.createObjectStore(storeName);
        }
    }))
}

/**
 * Add an item to the specified store 
 * @param {any} data the data you wish to add
 * @param {string} databaseName name of the database
 * @param {string} storeName name of the store
 * @param {string} keyProperty path to key in object (ie. 'id')
 * @returns {Promise}
 * @throws "invalid keyProperty. Has to be available on object, ie. 'id' -> addedData.id"
 */
const put = (databaseName, storeName, data, keyProperty) => {
    getDatabaseTransaction(databaseName, storeName, (store) => {
        if (!data[keyProperty]) throw "invalid keyProperty. Has to be available on object, ie. 'id' -> addedData.id"

        let addRequest = store.put(data, data[keyProperty]);
        addRequest.oncomplete = () => {
            resolve(addRequest.result); 
        }
    }); 
}

/**
 * Remove an item from the specified store 
 * @param {any} key of item to remove
 * @param {string} storeName 
 * @param {strgin} databaseName
 */
const remove = (key, storeName, databaseName) => {
    getDatabaseTransaction(databaseName, storeName, (store) => {
        //store.remove(key)
        removeRequest = store.delete(key); 
        removeRequest.oncomplete = () => {
            resolve(removeRequest.result); 
        }
    });
}


/**
 * Module for interacting with IndexedDB 
 * database in browser. 
 * @method add adds item 
 * @method remove removes item
 */
module.exports = {
    createStore : createStore, 
    put    : put, 
    remove : remove
}