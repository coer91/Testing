import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { IDataSource, IStore } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";
 

@Injectable({ providedIn: 'root' })
export class LocationSelectorService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Location/LocationSelector`; 
 
    /** HTTP GET */
    public GetStorageList = (): IStore[] => { 
        return [
            { Code: 'CL', Name: 'CASE RACK' , Factory: '', Type: '' },
            { Code: 'FL', Name: 'FLOOR RACK', Factory: '', Type: '' },
        ] 
    }  


    /** HTTP GET */
    public GetCaseLabelLocation = async (caseLabel: string) => { 
        const response = await HTTP.GET<IDataSource[]>({
            url: `${this.controller}/GetCaseLabelLocation/${caseLabel}` 
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, caseLabel, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetCaseLabelLocation', 'Error', 'bug'); 
                console.error(response.message);
            }

            return [];
        }  

        return response.data;
    } 


    /** HTTP GET */
    public PartNumberLocationMatching = async (location: string, partNumber: string) => { 
        const response = await HTTP.GET<string>({
            url: `${this.controller}/PartNumberLocationMatching/${location}/${partNumber}`,
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, partNumber, 'bi bi-box-seam-fill'); 
            }
    
            else {
                this.alert.Danger('PartNumberLocationMatching', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 


    /** HTTP PUT */
    public SetLotLocation = async (storageCode: string, location: string, lotNumberList: string[]) => { 
        const response = await HTTP.PUT<string>({
            url: `${this.controller}/SetLotLocation/${storageCode}/${location}`,
            body: lotNumberList,
            responseType: 'text'
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, location, 'save'); 
            }
    
            else {
                this.alert.Danger('SetLotLocation', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
} 


