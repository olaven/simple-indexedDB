export default interface Create {
    /**
     * Create a database with specified name. 
     * Throws error if already existing
     * @param name name of the database
     */
    database: (name: string) => void
    /**
    * Create a store in the database
    * @param name name of the store
    * @param database database where store should be added
    */
    store : (name : string, database : string) => void 
}