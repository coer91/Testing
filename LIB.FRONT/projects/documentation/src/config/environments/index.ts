import { GetAppSettings } from "hwmx-angular/tools";
import { IAppSettings } from "hwmx-angular/interfaces"; 
import { ENVIRONMENT } from "./env.development"; 

interface IAppEnvironment extends IAppSettings { 
    webAPI: {
        hwmxCore: string; 
    }
} 

export const appSettings = GetAppSettings<IAppEnvironment>(ENVIRONMENT);