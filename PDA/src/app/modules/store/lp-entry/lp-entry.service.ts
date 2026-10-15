import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { HTTP } from "hwmx-angular/tools"; 

@Injectable({ providedIn: 'root' })
export class LpEntryService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Store/LpEntry`;  


    /** HTTP GET */
    public GetLpEntry = async (barcode: string) => { 
        const response = await HTTP.GET<LP_ENTRY_DTO[]>({
            url: `${this.controller}/GetLpEntry/${barcode}` 
        }); 
        
        if(!response.ok) {   
            if(response.status < 500) {
                this.alert.Warning(response.message, barcode, 'barcode'); 
            }   

            else {  
                this.alert.Danger('GetLpEntry', 'Error', 'bug'); 
                console.error(response.message); 
            }

            return [];
        }  

        if(response.data.length <= 0)
            this.alert.Warning('No Data', barcode, 'barcode'); 

        return response.data.map(item => ({ ...item, Scaned: false }));
    }  


    /** HTTP POST */ 
    public SetLpEntry = async (vbelg: string) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetLpEntry/${vbelg}`,
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, vbelg, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetLpEntry', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
} 


export interface LP_ENTRY_DTO {
    LOT_NUMBER:  string;
    PART_NUMBER: string;
    QTY:         number;
    EO_NUMBER:   string;
    VBELG:       string;
    SCANNED:     boolean;
}