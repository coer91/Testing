import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { ILotInformationChecked } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools"; 


@Injectable({ providedIn: 'root' })
export class CcEntryService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Store/CcEntry`; 
 
    /** HTTP GET */
    public GetCCStockIn = async (barcode: string) => { 
        const response = await HTTP.GET<ILotInformationChecked[]>({
            url: `${this.controller}/GetCCStockIn/${barcode}` 
        }); 
        
        if(!response.ok) {  
            if(response.status < 500) {
                this.alert.Warning(response.message, barcode, 'barcode'); 
            }   

            else {
                this.alert.Danger('GetCCStockIn', 'Error', 'bug'); 
                console.error(response.message);
            }

            return [];
        }  

        if(response.data.length <= 0)
            this.alert.Warning('No Data', barcode, 'barcode');    

        return response.data.map(item => ({ ...item, QtyChecked: 0 }));
    } 


    /** HTTP POST */
    public SetCCStockIn = async (barcode: string) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetCCStockIn/${barcode}`,
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, barcode, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetCCStockIn', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
} 