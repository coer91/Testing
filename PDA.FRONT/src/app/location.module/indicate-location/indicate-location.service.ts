import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { ILotInformation, IStore } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";
 

@Injectable({ providedIn: 'root' })
export class IndicateLocationService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Location/IndicateLocation`; 
 
    /** HTTP GET */
    public GetStorageList = (): IStore[] => { 
        return [
            { Code: 'CL', Name: 'CASE RACK' , Factory: '', Type: '' },
            { Code: 'FL', Name: 'FLOOR RACK', Factory: '', Type: '' },
        ] 
    }   


    /** HTTP GET */
    public GetLotListByCaseLabel = async (caseLabel: string) => { 
        const response = await HTTP.GET<ILotInformation[]>({
            url: `${this.controller}/GetLotListByCaseLabel/${caseLabel}` 
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, caseLabel, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetLotListByCaseLabel', 'Error', 'bug'); 
                console.error(response.message);
            }

            return [];
        }  

        return response.data;
    } 


    /** HTTP GET */
    public GetMaterialByLocation = async (location: string) => { 
        const response = await HTTP.GET<string[]>({
            url: `${this.controller}/GetMaterialByLocation/${location}` 
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, location, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetMaterialByLocation', 'Error', 'bug'); 
                console.error(response.message);
            }

            return [];
        }  

        return response.data;
    }  


    /** HTTP PUT */
    public SetLotsInLocation = async (storageCode: string, location: string, lotNumberList: string[]) => { 
        const response = await HTTP.PUT<string>({
            url: `${this.controller}/SetLotsInLocation/${storageCode}/${location}`,
            body: lotNumberList,
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, location, 'save'); 
            }
    
            else {
                this.alert.Danger('SetLotsInLocation', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 


    /** HTTP PUT */
    public async SetInventoryCell(location: string, lotLocationList: string[]) {
        const response = await HTTP.PUT<string>({
            url: `${this.controller}/SetInventoryCell/${location}`,
            body: lotLocationList,
            responseType: 'text'
        });

        if(response.ok) {
            return response.data;
        }

        else {
            console.error(response.message);
            this.alert.Danger('SetInventoryCell', 'Error', 'bug');
            return '';
        }
    }
}  