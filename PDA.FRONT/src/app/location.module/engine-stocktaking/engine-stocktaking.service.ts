import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { IPallet } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";  


@Injectable({ providedIn: 'root' })
export class EngineStocktakingService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Location/EngineStocktaking`;  

    /** HTTP GET */
    public GetPallet3C = async (palletCode: string) => { 
        const response = await HTTP.GET<IPallet[]>({
            url: `${this.controller}/GetPallet3C/${palletCode}`
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, palletCode, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetPallet3C', 'Error', 'bug'); 
                console.error(response.message);
            }

            return [];
        }  

        return response.data;
    } 


    /** HTTP POST */
    public SetStocktaking = async (lotNumberList: string[]) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetStocktaking`,
            responseType: 'text',
            body: lotNumberList
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, '', 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetStocktaking', 'Error', 'bug'); 
                console.error(response.message);
            } 
        }  

        return response;
    } 
} 