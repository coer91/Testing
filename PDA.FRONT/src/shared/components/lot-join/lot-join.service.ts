import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { ILotInformation } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools"; 


@Injectable({ providedIn: 'root' })
export class LotJoinService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Lot/LotJoin`;  

    /** HTTP POST */
    public JoinLot = async (paperType: string, printer: string, lotNumberList: ILotInformation[]) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/JoinLot`,
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
                this.alert.Danger('JoinLot', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
} 