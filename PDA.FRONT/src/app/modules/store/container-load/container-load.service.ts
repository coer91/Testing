import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { HTTP } from "hwmx-angular/tools";  
 
@Injectable({ providedIn: 'root' })
export class ContainerService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Store/Container`;   


    /** GET */
    public GetContainerLoad = async (orderNumber: string) =>  {
        const response = await HTTP.GET<CONTAINER_DTO[]>({
            url: `${this.controller}/GetContainerLoad/${orderNumber}`
        }); 
        
        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, orderNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetContainerLoad', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
    
    
    /** GET */
    public GetContainerDownload = async (orderNumber: string) =>  {
        const response = await HTTP.GET<CONTAINER_DTO[]>({
            url: `${this.controller}/GetContainerDownload/${orderNumber}`
        }); 
        
        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, orderNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetContainerDownload', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    }    


    /** POST */
    public SetContainerLoad = async (orderNumber: string, caseLabelList: string[]) =>  {
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetContainerLoad/${orderNumber}`,
            responseType: 'text',
            body: caseLabelList
        }); 
        
        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, orderNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetContainerLoad', 'Error', 'bug'); 
                console.error(response.message);
            }

            return '';
        }  

        return response.data;
    } 


    /** POST */
    public SetContainerDownload = async (orderNumber: string, caseLabelList: string[]) =>  {
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetContainerDownload/${orderNumber}`,
            responseType: 'text',
            body: caseLabelList
        }); 
        
        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, orderNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetContainerDownload', 'Error', 'bug'); 
                console.error(response.message);
            }

            return '';
        }  

        return response.data;
    } 


    /** POST */
    public CheckOrder = async (orderNumber: string, caseLabel: string) =>  {
        const response = await HTTP.POST<string>({
            url: `${this.controller}/CheckOrder`,
            queryParams: [
                { param: 'orderNumber', value: orderNumber },
                { param: 'caseLabel'  , value: caseLabel   }
            ]
        }); 
        
        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, caseLabel, 'barcode'); 
            }
    
            else {
                this.alert.Danger('CheckOrder', 'Error', 'bug'); 
                console.error(response.message);
            }

            return false;
        }  

        return true;
    } 
}  


export interface CONTAINER_DTO {
    CASE_LABEL_ID: string;
    TYPE:          string; 
    STATUS:        number; 
}