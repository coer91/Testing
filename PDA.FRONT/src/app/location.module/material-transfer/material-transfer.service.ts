import { IIssueRequest, ILotFIFO, IMaterialFIFO } from "./material-transfer.interface";
import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";   
import { HTTP } from "hwmx-angular/tools";

@Injectable({ providedIn: 'root' })
export class MaterialMoveService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Location/MaterialTransfer`; 
 
    /** HTTP GET */
    public GetMaterialByIssue = async (issueNumber: string): Promise<IIssueRequest[]> => { 
        const response = await HTTP.GET<IIssueRequest[]>({
            url: `${this.controller}/GetMaterialByIssue/${issueNumber}` 
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, issueNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetMaterialByIssue', 'Error', 'bug'); 
                console.error(response.message);
            }

            return [];
        }  

        if(response.data.length <= 0) {
            this.alert.Warning("No data", issueNumber, 'barcode'); 
        }

        return response.data.map(item => ({ 
            ...item, 
            QtyChecked: 0, 
            Detail: [] 
        }));
    } 


    /** HTTP GET */
    public GetMaterialFIFO = async (lotNumber: string): Promise<IMaterialFIFO[]> => { 
        const response = await HTTP.GET<IMaterialFIFO[]>({
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


    /** HTTP GET */
    // public GetRealFIFOInfo = async (lotNumber: string): Promise<IMaterialFIFO[]> => { 
    //     const response = await HTTP.GET<IMaterialFIFO[]>({
    //         url: `${this.controller}/GetRealFIFOInfo/${lotNumber}` 
    //     }); 
        
    //     if(!response.ok) {         
    //         if(response.status < 500) {
    //             this.alert.Warning(response.message, lotNumber, 'barcode'); 
    //         }
    
    //         else {
    //             this.alert.Danger('GetRealFIFOInfo', 'Error', 'bug'); 
    //             console.error(response.message);
    //         }

    //         return [];
    //     }   

    //     return response.data;
    // } 


    /** HTTP GET */
    public GetLotFIFO = async (partNumber: string, lotNumber: string): Promise<ILotFIFO[]> => { 
        const response = await HTTP.GET<ILotFIFO[]>({
            url: `${this.controller}/GetLotFIFO/${partNumber}/${lotNumber}` 
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, partNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetLotFIFO', 'Error', 'bug'); 
                console.error(response.message);
            }

            return [];
        }  

        if(response.data.length <= 0) {
            this.alert.Warning(`No FIFO Data`, partNumber, 'barcode');
        }

        return response.data;
    } 


    /** HTTP POST */
    public MoveMaterial = async (issueNumber: string, lotNumberList: string[]) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/MoveMaterial/${issueNumber}`,
            body: lotNumberList,
            responseType: 'text'
        }); 

        if(response.ok) {
            this.alert.Success(response.data, issueNumber, 'save');
        }
        
        else {         
            if(response.status < 500) {
                this.alert.Warning(response.message, issueNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('MoveMaterial', 'Error', 'bug'); 
                console.error(response.message);
            }
        }   

        return response;
    }  
} 