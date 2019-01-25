var indexedDB: IDBFactory = require("fake-indexeddb");
import { createDatabase } from '../../creation/database'; 

test('should create database', () => {
    createDatabase("testname").then(value => {
        console.log(value); 
        expect(value).not.toBeNull(); 
    }) 
})