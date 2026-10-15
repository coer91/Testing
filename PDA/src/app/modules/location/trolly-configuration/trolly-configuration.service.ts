import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";    
import { LOT_INFORMATION_DTO } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";   

@Injectable({ providedIn: 'root' })
export class TrollyConfigurationService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Location/TrollyConfiguration`;  

    /** HTTP GET */
    public GetTrollyOrder = async (productionDate: string, sequencePlan: number, trollyGroup: string) => { 
        const response = await HTTP.GET<TROLLY_ORDER_DTO[]>({
            url: `${this.controller}/GetTrollyOrder`,
            queryParams: [
                { param: 'productionDate', value: productionDate },
                { param: 'sequencePlan'  , value: sequencePlan   },
                { param: 'trollyGroup'   , value: trollyGroup    },
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

        return response.data.map(item => ({ ...item, QTY_CHECKED: 0, DETAIL: [] }));
    }
    
    
    /** HTTP GET */
    public GetLotInTrolly = async (lotNumber: string) => { 
        const response = await HTTP.GET<TROLLY_LOT_DTO>({
            url: `${this.controller}/GetLotInTrolly/${lotNumber}` 
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, lotNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetLotInTrolly', 'Error', 'bug'); 
                console.error(response.message);
            } 
        }  

        return response;
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


export interface TROLLY_ORDER_DTO {
    PRODUCTION_DATE: string;
    PLAN_SEQUENCE:   number;
    PART_NUMBER:     string;
    TROLLY_GROUP:    string;
    QTY:         number;
    MAX_QTY:         number;
    QTY_CHECKED:     number;
    DETAIL:          LOT_INFORMATION_DTO[];
}


export interface TROLLY_LOT_DTO {
    LOT_NUMBER:      string;
    PART_NUMBER:     string;
    QTY:             number;
    PRODUCTION_DATE: string;
    PLAN_SEQUENCE:   number;
}