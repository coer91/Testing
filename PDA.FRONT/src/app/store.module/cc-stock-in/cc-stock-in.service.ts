import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { IDataSourceQty } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools"; 


@Injectable({ providedIn: 'root' })
export class CcStockInService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Store/CcStockIn`; 
 
    /** HTTP GET */
    public GetCCStockIn = async (barcode: string) => { 
        const response = await HTTP.GET<IDataSourceQty[]>({
            url: `${this.controller}/GetCCStockIn/${barcode}` 
        }); 
        
        if(!response.ok) {     
            this.alert.Danger('GetCCStockIn', 'Error', 'bug'); 
            console.error(response.message);
            return [];
        }  

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