"use strict";
/**
 * Pattern of indexedDB : https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
 * - create a
 *  - database
 *  - store
 * - get a transaction, do operations, and pass a callback when done.
 *
 * I think I want the following API:
 *
 * create.database(name : string) // can be set to auto-increment?
 * create.store(name : string)
 * add.one(key : any, value : any)
 * add.several([key : any, value : any][])
 * delete.one(key : any)
 * delete.several([key : any][])
 * replace.one(key : any, value : any)
 * replace.several([key : any, value : any][])
 * get.one(key : any) // get the value with the specified key
 * get.all() : any[] // should this return key as well?
 */
exports.__esModule = true;
exports.create = {
    /**
     * Create a database with specified name.
     * Throws error if already existing
     */
    database: function (name) {
        console.log(exports.create.store("something"));
        throw "not implemented";
    },
    store: function (name) {
        throw "not implemented";
    }
};
exports.add = {
    one: function (key, value) {
        throw "not implemented";
    },
    several: function (pairs) {
        throw "not implemented";
    }
};
exports.replace = {
    one: function (key, value) {
        throw "not implemented";
    },
    several: function (pairs) {
        throw "not implemented";
    }
};
exports.get = {
    one: function (key) {
        throw "not implemented";
    },
    several: function (keys) {
        throw "not implemented";
    }
};
