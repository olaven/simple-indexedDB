export const createDatabase = (name: string): Promise<IDBDatabase>=> {
    const request = indexedDB.open(name)
    
    request.onsuccess = (event) => {
        console.log(event); 
    }
    
    throw "not implemeneted"; 
}