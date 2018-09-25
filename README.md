# simple-indexedDB
Api for doing simple and intuitive operations towards indexedDB. 

__The code for this version is on the 1.0-branch. I am currently rewriting the whole project. 

## Installation
``` yarn add simple-indexeddb ```

``` npm install simple-indexeddb ```

``` js
import {createStore, put, remove} from 'simple-indexeddb'; 
```

## Creating the database 
``` js 
    createStore("myDatabase", "myStore");
```

## Adding/Replacing items 
``` js 
    // adding (specifying path to key, 'id')
    put("myDatabase", "myStore", {id : 1, text : "buy milk", done : false}, "id");  

    // replacing (same key!)
    put("myDatabase", "myStore", {id : 1, text : "walk the dog", done : false}, "id"); 
```

## Removing items 
``` js 
        // same key as earlier 
    remove(1, "myStore", "myDatabase"); 
```
