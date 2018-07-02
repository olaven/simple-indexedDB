export declare const createStore: (databaseName: string, storeName: string) => void;
export declare const put: (databaseName: string, storeName: string, data: any, keyProperty: string, callback: (result: any) => any) => void;
export declare const remove: (key: any, storeName: string, databaseName: string, callback: (result: any) => any) => void;
