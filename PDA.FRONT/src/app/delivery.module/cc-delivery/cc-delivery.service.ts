import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { ILotInformation } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";  

/** */
export interface IDataSource { 
    PartNumber: string;
    Qty:        number;  
    Detail:     ILotInformation[];
}

@Injectable({ providedIn: 'root' })
export class CCDeliveryService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Delivery/CCDelivery`; 


    /** HTTP GET */
    public GetLotInfoCC = async (lotNumber: string) => { 
        const response = await HTTP.GET<ILotInformation>({
            url: `${this.controller}/GetLotInfoCC/${lotNumber}` 
        }); 
        
        if(!response.ok) {     
            if(response.status < 500) {
                this.alert.Warning(response.message, lotNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetLotInfoCC', 'Error', 'bug'); 
                console.error(response.message);
            } 

            return null;
        }  

        return response.data;
    }  

 
    /** HTTP GET */
    public GetGlovisDeliveryNumberList = async () => { 
        const response = await HTTP.GET<string[]>({
            url: `${this.controller}/GetGlovisDeliveryNumberList` 
        }); 
        
        if(!response.ok) {     
            this.alert.Danger('GetGlovisDeliveryNumberList', 'Error', 'bug'); 
            console.error(response.message);
            return [];
        }  

        return response.data;
    }   


    /** HTTP POST */
    public DeliveryOrder = async (deliveryNumber: string, lotNumberList: string[]) => { 
        const response = await HTTP.POST<any>({
            url: `${this.controller}/DeliveryOrder/${deliveryNumber}`,
            body:  lotNumberList,
            responseType: 'text'
        }); 
        
        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, deliveryNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('DeliveryOrder', 'Error', 'bug'); 
                console.error(response.message);
            } 
        }  

        return response;
    } 
} 