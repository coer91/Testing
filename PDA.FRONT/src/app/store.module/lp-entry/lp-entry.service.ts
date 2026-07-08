import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { IDataSourceScaned } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools"; 

@Injectable({ providedIn: 'root' })
export class LpEntryService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Store/LpEntry`;  


    /** HTTP GET */
    public GetLPStockIn = async (vbelg: string) => { 
        const response = await HTTP.GET<IDataSourceScaned[]>({
            url: `${this.controller}/GetLPStockIn/${vbelg}` 
        }); 
        
        if(!response.ok) {     
            this.alert.Danger('GetLPStockIn', 'Error', 'bug'); 
            console.error(response.message); 
            return [];
        }  

        return response.data.map(item => ({ ...item, Scaned: false }));
    }  


    /** HTTP POST */ 
    public SetLPStockIn = async (vbelg: string) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetLPStockIn/${vbelg}`,
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, vbelg, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetCCStockIn', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
} 