import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { HTTP } from "hwmx-angular/tools";   

@Injectable({ providedIn: 'root' })
export class SendingEngineService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Delivery/SendingEngine`; 


    /** HTTP GET */
    public GetOrderList = async () => { 
        const response = await HTTP.GET<GLOVIS_ORDER_DTO[]>({
            url: `${this.controller}/GetOrderList` 
        }); 
        
        if(!response.ok) {     
            if(response.status < 500) {
                this.alert.Warning(response.message, null, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetOrder', 'Error', 'bug'); 
                console.error(response.message);
            }  

            return [];
        }  

        return response.data;
    }   
    
    
    /** HTTP GET */
    public GetEngineByOrder = async (orderNumber:string, engineCode: string) => { 
        const response = await HTTP.GET<ENGINE_DTO>({
            url: `${this.controller}/GetEngineByOrder/${orderNumber}/${engineCode}` 
        }); 
        
        if(!response.ok) {     
            if(response.status < 500) {
                this.alert.Warning(response.message, engineCode, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetEngineByOrder', 'Error', 'bug'); 
                console.error(response.message);
            } 
            
            return null;
        }  

        return response.data;
    } 


    /** HTTP POST */
    public SetGlovisOrder = async (orderNumber: string) => { 
        const response = await HTTP.POST<any>({
            url: `${this.controller}/SetGlovisOrder/${orderNumber}`, 
            responseType: 'text'
        }); 
        
        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, orderNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetGlovisOrder', 'Error', 'bug'); 
                console.error(response.message);
            } 
        }  

        return response;
    }  
} 


export interface GLOVIS_ORDER_DTO {
    ORDER_NUMBER: string;
    ORDER_STATUS: string; 
    TO_STORAGE_CODE: string;
    SENT_QTY: number;
    RECV_QTY: number;
}
 

export interface ENGINE_DTO {
    SERIAL_NUMBER: string;
    ENGINE_NUMBER: string;
    ENGINE_TYPE: string;
    MIP_CODE: string;
    IMPORT: string;
}