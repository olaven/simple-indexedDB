/**
 * The interface I want: 
 * 
 
    Open a database.
    Create an object store in the database. 
    Start a transaction and make a request to do some database operation, like adding or retrieving data.
    Wait for the operation to complete by listening to the right kind of DOM event.
    Do something with the results (which can be found on the request object).

    As indicated previously, onupgradeneeded is the only place
     where you can alter the structure of the database. 
     In it, you can create and delete object stores and build 
     and remove indices.
 */

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

import { createDatabase } from './creation/database'; 


/**
 * creation
 */
export const create = {
    /**
     * Create a databse 
     */
    database: (name: string) => {
        createDatabase(name)
    }, 
    /**
     * Creates and object store 
     */
    store: (name: string) => {

    }, 
    /**
     * Create an index to search by 
     */
    index: () => {

    }
}