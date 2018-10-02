import { Add as IAdd } from "../interfaces/add";

import { pair } from '../../pair'; 
import { Config } from "../../config";

import { checkIndexedDBAvailability, getDBInstance } from '../common'; 

export default class Add implements IAdd {

    private config : Config = null; 


    public one = (key: any, value: any) : boolean =>  
    {
        checkIndexedDBAvailability(this); 

        

        return false; 
    }

    several = (pairs: pair[]) : boolean => 
    {
        return false; 
    }

    setConfig = (config : Config) : void => 
    {
        
    }

    getConfig = () : Config => 
    {
        return this.config; 
    }
}