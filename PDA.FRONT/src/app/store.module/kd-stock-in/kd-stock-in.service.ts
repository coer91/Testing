import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { IDataSourceStatus } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";

 
export interface IKDLotInfo extends IDataSourceStatus {    
    Unit:       string;
    VBELG:      string;
    EBELN:      string; 
    EBELP:      string; 
    VendorCode: string;
    WH_CD:      string;
    MODEL:      string;
    ProductionDate: string;  
} 


@Injectable({ providedIn: 'root' })
export class KDStockInService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Store/KdStockIn`;   

    /** GET */
    public GetKDLotInfo = async (lotNumber: string) =>  {
        const response = await HTTP.GET<IKDLotInfo[]>({
            url: `${this.controller}/GetKDLotInfo/${lotNumber}`
        }); 
        
        if(!response.ok) {  
            this.alert.Danger('GetKDLotInfo', 'Error', 'bug'); 
            console.error(response.message); 
            return [];
        }  

        return response.data.map(item => ({ ...item, Status: 0 }));
    }  


    /** HTTP POST */
    public SetKdStockIn = async (lotNumber: string, partNumber: string, qty: string, unit: string, productionDate: string, eoNumber: string, vendorCode: string, whCd: string, model: string) =>  {
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetKdStockIn`,
            responseType: 'text',
            queryParams: [
                { param: 'lotNumber' , value: lotNumber      },
                { param: 'partNumber', value: partNumber     },
                { param: 'qty'       , value: qty            },
                { param: 'unit'      , value: unit           },
                { param: 'prodDate'  , value: productionDate },
                { param: 'eoNumber'  , value: eoNumber       },
                { param: 'vendorCode', value: vendorCode     },
                { param: 'whCd'      , value: whCd           },
                { param: 'model'     , value: model          }
            ]
        });  

        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, lotNumber, 'barcode'); 
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