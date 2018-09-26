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
/**
 * Should add optional type checking to store-keys 
 */

import { Promise } from 'es6-promise'


import { pair } from "./src/pair";



export const create = {
    /**
     * Create a database with specified name. 
     * Throws error if already existing
     * @param name name of the database
     */
    database : (name : string) => {
        throw "not implemented";
    }, 
    /**
    * Create a store in the database
    * @param name name of the store
    * @param database database where store should be added
    */
    store(name : string, database : string){
        throw "not implemented"
    }
}

export const add : AddInterface = {
    one : (key : any, value : any[]) => {
        throw "not implemented";
    }, 
    several : (pairs : pair[]) => {
        throw "not implemented";
    }
}

export const replace = {
    one : (key : any, value : any[]) => {
        throw "not implemented";
    }, 
    several : (pairs : pair[]) => {
        throw "not implemented";
    }
}

export const get = {
    one : (key : string) => {
        throw "not implemented";
    }, 
    several : (keys : pair[]) => {
        throw "not implemented";
    }
}