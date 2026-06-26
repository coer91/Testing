import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { HTTP } from "hwmx-angular/tools";  


@Injectable({ providedIn: 'root' })
export class ManualStockInService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Store/ManualStockIn`;    


    /** HTTP POST */
    public SetManualIn = async (lotNumber: string, partNumber: string, qty: string, unit: string, prodDate: string, eoNumber: string, vendorCode: string, warehouse: string, model: string) =>  {
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetManualIn`,
            responseType: 'text',
            queryParams: [
                { param: 'lotNumber' , value: lotNumber  },
                { param: 'partNumber', value: partNumber },
                { param: 'qty'       , value: qty        },
                { param: 'unit'      , value: unit       },
                { param: 'prodDate'  , value: prodDate   },
                { param: 'eoNumber'  , value: eoNumber   },
                { param: 'vendorCode', value: vendorCode },
                { param: 'warehouse' , value: warehouse  },
                { param: 'model'     , value: model      }
            ]
        });  

        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, lotNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('SetManualIn', 'Error', 'bug'); 
                console.error(response.message);
            }
        } 

        return response.data;
    } 
}  