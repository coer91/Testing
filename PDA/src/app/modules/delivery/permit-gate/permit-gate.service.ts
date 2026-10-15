import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { HTTP } from "hwmx-angular/tools";   

@Injectable({ providedIn: 'root' })
export class PermitGateService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Delivery/PermitGate`; 


    /** HTTP GET */
    public GetGatePermit = async (shippingNumber: string) => { 
        const response = await HTTP.GET<GATE_PERMIT_DTO>({
            url: `${this.controller}/GetGatePermit/${shippingNumber}` 
        }); 
        
        if(!response.ok) {     
            if(response.status < 500) {
                this.alert.Warning(response.message, shippingNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetGatePermit', 'Error', 'bug'); 
                console.error(response.message);
            } 

            return null;
        }  

        return response.data;
    }  
    
    
    /** HTTP GET */
    public GetGatePermitDetail = async (shippingNumber: string) => { 
        const response = await HTTP.GET<GATE_PERMIT_DETAIL_DTO[]>({
            url: `${this.controller}/GetGatePermitDetail/${shippingNumber}` 
        }); 
        
        if(!response.ok) {     
            if(response.status < 500) {
                this.alert.Warning(response.message, shippingNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetGatePermitDetail', 'Error', 'bug'); 
                console.error(response.message);
            } 

            return [];
        }  

        return response.data;
    } 


    /** HTTP POST */
    public SetGatePermit = async (shippingNumber: string, factory: string) => { 
        const response = await HTTP.POST<any>({
            url: `${this.controller}/SetGatePermit/${shippingNumber}/${factory}`, 
            responseType: 'text'
        }); 
        
        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, shippingNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetGatePermit', 'Error', 'bug'); 
                console.error(response.message);
            } 
        }  

        return response;
    } 
} 


export interface GATE_PERMIT_DTO {
    GUBUN:       string;
    SHIP_NO:     string;
    ITEM_CNT:    string;
    SHIP_QTY:    number;
    FACTORY_NM:  string;
    SHIPPING_DT: string;
}


export interface GATE_PERMIT_DETAIL_DTO {
    LOT_NUMBER:  string; 
    QTY:         number;
    UNIT:        string;
    PART_NUMBER: string;
    PART_NAME:   string;
}