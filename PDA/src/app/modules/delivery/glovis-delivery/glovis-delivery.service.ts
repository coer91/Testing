import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { LOT_INFORMATION_DTO } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";   

@Injectable({ providedIn: 'root' })
export class GlovisDeliveryService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Delivery/CCDelivery`; 

    /** HTTP GET */
    public GetGlovisDeliveryList = async () => { 
        const response = await HTTP.GET<GLOVIS_DELIVERY_ORDER_DTO[]>({
            url: `${this.controller}/GetGlovisDeliveryList` 
        }); 
        
        if(!response.ok) {     
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                this.alert.Danger('GetGlovisDeliveryList', 'Error', 'bug'); 
                console.error(response.message);
            }
            return [];
        }  

        return response.data;
    } 


    /** HTTP GET */
    public GetLotInformationGlovis = async (lotNumber: string) => { 
        const response = await HTTP.GET<LOT_INFORMATION_DTO>({
            url: `${this.controller}/GetLotInformationGlovis/${lotNumber}` 
        }); 
        
        if(!response.ok) {     
            if(response.status < 500) {
                this.alert.Warning(response.message, lotNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetLotInformationGlovis', 'Error', 'bug'); 
                console.error(response.message);
            } 

            return null;
        }  

        return response.data;
    }  
    
    
    /** HTTP POST */
    public GenerateGlovisDelvNum = async () => { 
        const response = await HTTP.POST<GLOVIS_DELIVERY_ORDER_DTO>({
            url: `${this.controller}/GenerateGlovisDelvNum`,  
        }); 
        
        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message); 
            }
    
            else {
                this.alert.Danger('GenerateGlovisDelvNum', 'Error', 'bug'); 
                console.error(response.message);
            } 
        }  

        return response.data;
    } 


    /** HTTP POST */
    public DeliveryGlovisOrder = async (deliveryNumber: string, lotNumberList: string[]) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/DeliveryGlovisOrder/${deliveryNumber}`,
            body:  lotNumberList,
            responseType: 'text'
        }); 
        
        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, deliveryNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('DeliveryGlovisOrder', 'Error', 'bug'); 
                console.error(response.message);
            } 
        }  

        return response;
    } 
} 


export interface GLOVIS_DELIVERY_ORDER_DTO {
    DELIVERY_NUMBER: string;
    ORDER_STATUS:    string;
    PRODUCTION_DATE: string;
    INPUT_USER:      string;
} 