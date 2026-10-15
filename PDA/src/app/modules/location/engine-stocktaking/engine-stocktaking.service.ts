import { Injectable } from "@angular/core";
import { appSettings } from "@appSettings";
import { HTTP } from "hwmx-angular/tools";

@Injectable({ providedIn: 'root' })
export class EngineStocktakingService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Location/EngineStocktaking`;

    /** HTTP GET */
    public Get3CPalletInfo = async (barcode: string) => {
        const response = await HTTP.GET<ST_PALLET_DTO[]>({
            url: `${this.controller}/Get3CPalletInfo/${barcode}`
        });

        if (!response.ok) {
            if (response.status < 500) {
                this.alert.Warning(response.message, barcode, 'barcode');
            }

            else {
                this.alert.Danger(response.message, 'Get3CPalletInfo', 'bug');
                console.error(response.message);
            }

            return [];
        }

        if (response.data.length <= 0)
            this.alert.Warning('No Data', barcode, 'barcode');

        return response.data.map(item => ({ ...item, Scaned: false }));
    }

    public SetFinalStocktaking = async (SerialList: string[]) => {
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetFinalStocktaking/`,
            responseType: 'text',
            body: SerialList
        });

        if (!response.ok) {
            if (response.status < 500) {
                this.alert.Warning(response.message, 'SetFinalStocktaking', 'barcode');
            }

            else {
                this.alert.Danger(response.message, 'SetFinalStocktaking', 'bug');
                console.error(response.message);
            }
        }

        return response;
    }
}

export interface ST_PALLET_DTO {
    Serial_No: string;
    Pallet_Code: string;
}