import { ILotInformationAone } from "@appShared/interfaces";
import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { HTTP } from "hwmx-angular/tools";  

@Injectable({ providedIn: 'root' })
export class GkdEntryService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Store/GkdEntry`;   

    /** GET */
    public GetKDLotInfo = async (barcode: string) =>  {
        const response = await HTTP.GET<ILotInformationAone[]>({
            url: `${this.controller}/GetKDLotInfo/${barcode}`
        }); 
        
        if(!response.ok) {  
            if(response.status < 500) {
                this.alert.Warning(response.message, barcode, 'barcode'); 
            } 

            else {  
                this.alert.Danger('GetKDLotInfo', 'Error', 'bug'); 
                console.error(response.message); 
            }
            
            return [];
        }  

        if(response.data.length <= 0)
            this.alert.Warning('No Data', barcode, 'barcode'); 

        return response.data.map(item => ({ ...item, Status: 0 }));
    }  


    /** HTTP POST */
    public SetKdStockIn = async (lotList: any[]) =>  {
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetKdStockIn`,
            responseType: 'text', 
            body: lotList
        });  

        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, null, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetKdStockIn', 'Error', 'bug'); 
                console.error(response.message);
            }
        } 

        return response.data;
    }


    /** HTTP POST */
    public SetKdStockAoneIn = async (vbelg: string) =>  {
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetKdStockAoneIn/${vbelg}`,
            responseType: 'text' 
        }); 

        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, vbelg, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetKdStockAoneIn', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response.data;
    } 
}  