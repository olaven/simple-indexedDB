
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

export const createStore = (databaseName: string,
    storeName: string) => {
    getOpenDB(databaseName, openedDB => {
        openedDB.onupgradeneeded = () => {
            const db = openedDB.result;
            db.createObjectStore(storeName);
        }
    });
}

export const put = (databaseName: string,
    storeName: string, data: any, keyProperty: string, callback: (result: any) => any) => {
    getDatabaseTransaction(databaseName, storeName, (store) => {
        if (!data[keyProperty]) throw "invalid keyProperty. Has to be available on object, ie. 'id' -> addedData.id"

        let addRequest = store.put(data, data[keyProperty]);
        addRequest.onsuccess = () => {
            if (callback) callback(addRequest.result);
        }
    });
}

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

export const get = (key : any, storeName : string, databaseName : string) => {
    getDatabaseTransaction(databaseName, storeName, (store) => {
        let getRequest = store.get(key); 
        getRequest.onsuccess = () => {
            return getRequest.result; 
        }
    }); 
}
