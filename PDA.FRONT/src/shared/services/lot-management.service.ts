import { Injectable } from "@angular/core";
import { appSettings } from "@appSettings"; 
import {  HTTP } from "hwmx-angular/tools"; 

@Injectable({ providedIn: 'root' })
export class LotManagementService extends HTTP {
 
    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Lot/LotManagement`;


    /** HTTP POST */
    public Join = async (paperType: string, printer: string, lotNumberList: string[]) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/Join`,
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
                this.alert.Danger('Join', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
 

    /** HTTP POST */
    public Split = async (lotNumber: string, qty: number, paperType: string, printer: string) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/Split`,
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
                this.alert.Danger('Split', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
}