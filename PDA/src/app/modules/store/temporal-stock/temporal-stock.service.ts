import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { HTTP } from "hwmx-angular/tools"; 


@Injectable({ providedIn: 'root' })
export class TemporalStockService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Store/TemporalStock`;
    
    
    /** HTTP POST */
    public GetTemporalStock = async (operation: string) => { 
        const response = await HTTP.GET<TEMPORAL_STOCK_DTO[]>({
            url: `${this.controller}/GetTemporalStock/${operation}` 
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, operation, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetTemporalStock', 'Error', 'bug'); 
                console.error(response.message);
            }
            
            return [];
        }  

        return response.data;
    }


    /** HTTP POST */
    public SetTemporalStock = async (operation: string, lot: TEMPORAL_STOCK_DTO) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetTemporalStock/${operation}`,
            body: lot,
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, operation, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetTemporalStock', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 


    /** HTTP DELETE */
    public DeleteTemporalStock = async (operation: string, barcode: string) => { 
        const response = await HTTP.DELETE<string>({
            url: `${this.controller}/DeleteTemporalStock/${operation}`, 
            queryParams: [{ param: 'barcode', value: barcode }],
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, operation, 'barcode'); 
            }
    
            else {
                this.alert.Danger('DeleteTemporalStock', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 


    /** HTTP DELETE */
    public ClearTemporalStock = async (operation: string) => { 
        const response = await HTTP.DELETE<string>({
            url: `${this.controller}/ClearTemporalStock/${operation}`, 
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, operation, 'barcode'); 
            }
    
            else {
                this.alert.Danger('ClearTemporalStock', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
} 


export interface TEMPORAL_STOCK_DTO {
    BARCODE: string;
    LOT_NUMBER: string | null;
    PART_NUMBER: string | null;
    EO_NUMBER: string | null;
    QTY: number;
    UNIT: string | null;
    STORAGE_CODE: string | null;
    VENDOR_CODE: string | null;
    PRODUCTION_DATE: string | null;
    ERP_CODE: string | null;
    DELIVERY_SLIP: string | null;
    DELIVERY_ITEM: string | null;
    CATEGORY: string | null;
    MODEL: string | null;
    CORP: string | null;
    SHIP: string | null;
    CONTAINER: string | null;
}  