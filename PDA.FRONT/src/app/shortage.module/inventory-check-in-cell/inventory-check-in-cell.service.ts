import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { ILotInformation } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";

@Injectable({ providedIn: 'root' })
export class InventoryCheckInCellService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Shortage/InventoryCheckInCell`;  
    

    /** HTTP GET */
    public async GetCaseLotInfo(caseLabelId: string) {
        const response = await HTTP.GET<ILotInformation[]>({
            url: `${this.controller}/GetCaseLotInfo/${caseLabelId}` 
        });

        if(response.ok) {
            return response.data;
        }

        else {
            console.error(response.message);
            this.alert.Danger('GetCaseLabelLotInfo', 'Error', 'bug');
            return [];
        }
    } 


    /** HTTP POST */
    public async SetInventoryCell(location: string, lotLocationList: string[]) {
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetInventoryCellMulti/${location}`,
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