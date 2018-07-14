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
exports.createStore = function (databaseName, storeName) {
    getOpenDB(databaseName, function (openedDB) {
        openedDB.onupgradeneeded = function () {
            var db = openedDB.result;
            db.createObjectStore(storeName);
        };
    });
};
exports.put = function (databaseName, storeName, data, keyProperty, callback) {
    getDatabaseTransaction(databaseName, storeName, function (store) {
        if (!data[keyProperty])
            throw "invalid keyProperty. Has to be available on object, ie. 'id' -> addedData.id";
        var addRequest = store.put(data, data[keyProperty]);
        addRequest.onsuccess = function () {
            if (callback)
                callback(addRequest.result);
        };
    });
};
exports.remove = function (key, storeName, databaseName, callback) {
    getDatabaseTransaction(databaseName, storeName, function (store) {
        //store.remove(key)
        var removeRequest = store["delete"](key);
        removeRequest.onsuccess = function () {
            callback(removeRequest.result);
        };
    });
};
exports.get = function (key, storeName, databaseName) {
    getDatabaseTransaction(databaseName, storeName, function (store) {
        var getRequest = store.get(key);
        getRequest.onsuccess = function () {
            return getRequest.result;
        };
    });
};
