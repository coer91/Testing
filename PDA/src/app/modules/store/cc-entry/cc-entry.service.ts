import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { HTTP } from "hwmx-angular/tools"; 


@Injectable({ providedIn: 'root' })
export class CcEntryService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Store/CcEntry`; 
 
    /** HTTP GET */
    public GetCcEntry = async (barcode: string) => { 
        const response = await HTTP.GET<CC_ENTRY_DTO[]>({
            url: `${this.controller}/GetCcEntry/${barcode}` 
        }); 
        
        if(!response.ok) {  
            if(response.status < 500) {
                this.alert.Warning(response.message, barcode, 'barcode'); 
            }   

            else {
                this.alert.Danger('GetCcEntry', 'Error', 'bug'); 
                console.error(response.message);
            }

            return [];
        }  

        if(response.data.length <= 0)
            this.alert.Warning('No Data', barcode, 'barcode');    

        return response.data.map(item => ({ ...item, QTY_CHECKED: 0 }));
    } 


    /** HTTP POST */
    public SetCcEntry = async (barcode: string) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetCcEntry/${barcode}`,
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, barcode, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetCcEntry', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
} 


export interface CC_ENTRY_DTO {
    LOT_NUMBER:      string;
    PART_NUMBER:     string;
    QTY:             number;
    EO_NUMBER:       string;
    DELIVERY_NUMBER: string;
    HAS_EO:          string;
    QTY_CHECKED:     number;
} 


export interface CC_ENTRY_DETAIL_DTO { 
    PART_NUMBER: string;
    QTY:         number; 
    QTY_CHECKED: number; 
    DETAIL:      CC_ENTRY_DTO[];
} 