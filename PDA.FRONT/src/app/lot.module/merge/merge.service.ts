import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { ILotInformation } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools"; 


@Injectable({ providedIn: 'root' })
export class MergeService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Lot/Merge`;  

    /** HTTP POST */
    public MergeLot = async (paperType: string, printer: string, lotNumberList: ILotInformation[]) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/MergeLot`,
            responseType: 'text',
            body: lotNumberList,
            queryParams: [
                { param: 'paperType', value: paperType },
                { param: 'printer',   value: printer   }, 
            ]
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, '', 'barcode'); 
            }
    
            else {
                this.alert.Danger('MergeLot', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
} 