import { LOT_INFORMATION_DTO } from "@appShared/interfaces";
import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";     
import { HTTP } from "hwmx-angular/tools";   

@Injectable({ providedIn: 'root' })
export class MaterialFIFOService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Location/MoveMaterial`;  
    
    
    /** HTTP GET */
    public GetMaterialFIFO = async (lotNumber: string) => { 
        const response = await HTTP.GET<LOT_INFORMATION_DTO[]>({
            url: `${this.controller}/GetMaterialFIFO/${lotNumber}` 
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, lotNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetMaterialFIFO', 'Error', 'bug'); 
                console.error(response.message);
            } 

            return [];
        }  

        return response.data;
    } 
}