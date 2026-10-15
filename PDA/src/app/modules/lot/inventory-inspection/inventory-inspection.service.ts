import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { HTTP } from "hwmx-angular/tools";
 

@Injectable({ providedIn: 'root' })
export class InventoryInspectionService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Lot/InventoryInspection`; 
 
    /** HTTP GET */
    public GetInspectionNumberList = async (storageCode: string) => { 
        const response = await HTTP.GET<INSPECTION_DTO[]>({
            url: `${this.controller}/GetInspectionNumberList/${storageCode}`
        }); 
        
        if(response.ok) {
            return response.data;
        }

        else {     
            this.alert.Danger('GetInspectionNumberList', 'Error', 'bug'); 
            console.error(response.message);
            return []; 
        }   
    } 


    /** HTTP POST */
    public CreateInspectionNumber = async (storageCode: string) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/CreateInspectionNumber/${storageCode}`,
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, storageCode, 'barcode'); 
            }
    
            else {
                this.alert.Danger('CreateInspectionNumber', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 


    /** HTTP POST */
    public MoveLot = async (lotNumber: string, storageCode: string) => { 
        const response = await HTTP.POST<string>({
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
    public SetInspectionLot = async (storageCode: string, inspection: string, lotList: string[]) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetInspectionLot/${storageCode}/${inspection}`,
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


export interface INSPECTION_DTO {
    INSPECTION_NUMBER: string;
    STORAGE_CODE:      string; 
    INPUT_USER:        string; 
    INSPECTION_DATE:   string;
} 