"use strict";
exports.__esModule = true;
var getOpenDB = function (databaseName, callback) {
    try {
        var indexedDB = window.indexedDB; // || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        if (!indexedDB)
            throw "indexedDB is not supported";
        // opening (creating) database 
        var open_1 = indexedDB.open(databaseName);
        callback(open_1);
    }
    catch (error) {
        console.error(error);
    }
};
var getDatabaseTransaction = function (databaseName, storeName, callback) {
    getOpenDB(databaseName, function (open) {
        open.onsuccess = function (request) {
            var db = open.result;
            var transaction = db.transaction(storeName, "readwrite");
            var store = transaction.objectStore(storeName);
            callback(store);
        };
    });
};
/**
 *
 * @param databaseName name of database to create
 * @param storeName name of store to create
 */
exports.createStore = function (databaseName, storeName) {
    getOpenDB(databaseName, function (openedDB) {
        openedDB.onupgradeneeded = function () {
            var db = openedDB.result;
            db.createObjectStore(storeName);
        };
    });
};
/**
 * Put data (replace or add) into database
 * @param databaseName name of database
 * @param storeName name of store
 * @param data data to put
 * @param key key to replace
 * @param callback callback requests the result
 */
exports.put = function (databaseName, storeName, data, key, callback) {
    getDatabaseTransaction(databaseName, storeName, function (store) {
        if (!data[key])
            throw "invalid keyProperty. Has to be available on object, ie. 'id' -> addedData.id";
        var addRequest = store.put(data, data[key]);
        addRequest.onsuccess = function () {
            if (callback)
                callback(addRequest.result);
        };
    });
};
/**
 * Remove data from database
 * @param key key to remove
 * @param storeName store to remove from
 * @param databaseName name of database
 * @param callback callback, result as response
 */
exports.remove = function (key, storeName, databaseName, callback) {
    getDatabaseTransaction(databaseName, storeName, function (store) {
        //store.remove(key)
        var removeRequest = store["delete"](key);
        removeRequest.onsuccess = function () {
            callback(removeRequest.result);
        };
    });
};
/**
 * Get data from store
 * @param key key to get from
 * @param storeName store to get from
 * @param databaseName database to get from
 */
exports.get = function (key, storeName, databaseName) {
    getDatabaseTransaction(databaseName, storeName, function (store) {
        var getRequest = store.get(key);
        getRequest.onsuccess = function () {
            return getRequest.result;
        };
    });
};
/**
 * Get all data from store
 * @param storeName store to get from
 * @param databaseName database to get from
 */
exports.getAll = function (storeName, databaseName) {
    getDatabaseTransaction(databaseName, storeName, function (store) {
        var getRequest = store.getAll();
        getRequest.onsuccess = function () {
            return getRequest.result;
        };
    });
};
