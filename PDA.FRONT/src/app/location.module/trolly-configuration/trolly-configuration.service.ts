import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";   
import { IOrderTrolly } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";   

@Injectable({ providedIn: 'root' })
export class TrollyConfigurationService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Location/TrollyConfiguration`;  

    /** HTTP GET */
    public GetOrderTrolly = async (productionDate: string, sequencePlan: number, trollyGroup: string) => { 
        const response = await HTTP.GET<IOrderTrolly[]>({
            url: `${this.controller}/GetOrderTrolly`,
            queryParams: [
                { param: 'productionDate', value: productionDate     },
                { param: 'sequencePlan'  , value: sequencePlan },
                { param: 'trollyGroup'   , value: trollyGroup  },
            ]
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, `Trolly Group ${trollyGroup}`, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetOrderTrolly', 'Error', 'bug'); 
                console.error(response.message);
            }

            return [];
        }  

        return response.data.map(item => ({ ...item, Detail: [] }));
    }   


    /** HTTP POST */
    public SetOrderTrolly = async (productionDate: string, sequencePlan: number, lotNumberList: string[]) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetOrderTrolly`,
            body: lotNumberList,
            responseType: 'text',
            queryParams: [
                { param: 'productionDate', value: productionDate },
                { param: 'sequencePlan'  , value: sequencePlan   },
            ]
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, 'SetOrderTrolly', 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetOrderTrolly', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
}  