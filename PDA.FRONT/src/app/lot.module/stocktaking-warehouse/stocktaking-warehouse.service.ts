import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { IInspectionNumber } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";
 

@Injectable({ providedIn: 'root' })
export class StocktakingWarehouseService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Lot/StocktakingWarehouse`; 
 
    /** HTTP GET */
    public GetInspNumberList = async (storageCode: string) => { 
        const response = await HTTP.GET<IInspectionNumber[]>({
            url: `${this.controller}/GetInspNumberList`,
            queryParams: [
                { param: 'storageCode', value: storageCode }
            ] 
        }); 
        
        if(response.ok) {
            return response.data;
        }

        else {     
            this.alert.Danger('GetInspNumberList', 'Error', 'bug'); 
            console.error(response.message);
            return []; 
        }   
    } 


    /** HTTP PUT */
    public MoveLot = async (lotNumber: string, storageCode: string) => { 
        const response = await HTTP.PUT<string>({
            url: `${this.controller}/MoveLot/${lotNumber}/${storageCode}`,
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, lotNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('MoveLot', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 


    /** HTTP POST */
    public SetInspection = async (storageCode: string, inspection: string, lotList: string[]) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetInspection/${storageCode}/${inspection}`,
            body: lotList,
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, inspection, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetInspection', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
} 