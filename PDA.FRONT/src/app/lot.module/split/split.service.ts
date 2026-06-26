import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { HTTP } from "hwmx-angular/tools"; 


@Injectable({ providedIn: 'root' })
export class SplitService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Lot/Split`;  

    /** HTTP POST */
    public SplitLot = async (lotNumber: string, qty: number, paperType: string, printer: string) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SplitLot`,
            responseType: 'text',
            queryParams: [
                { param: 'lotNumber', value: lotNumber },
                { param: 'qty',       value: qty       },
                { param: 'paperType', value: paperType },
                { param: 'printer',   value: printer   },
            ]
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, lotNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SplitLot', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
} 