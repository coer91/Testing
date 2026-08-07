import {  LOT_INFORMATION_DTO, RACK_LOCATION_DTO, STORAGE_DTO, PRINTER_DTO } from "@appShared/interfaces";
import { Injectable } from "@angular/core";
import { appSettings } from "@appSettings";
import {  HTTP } from "hwmx-angular/tools"; 

@Injectable({ providedIn: 'root' })
export class MasterService extends HTTP {
 
    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Master`;


    /** HTTP GET */
    public GetLotInformation = async (lotNumber: string) => {
        const response = await HTTP.GET<LOT_INFORMATION_DTO>({
            url: `${this.controller}/GetLotInformation/${lotNumber}`
        });

        if(response.ok) {
            return response.data;
        }

        else {
            if(response.status < 500) {
                this.alert.CloseAllAlerts();
                this.alert.Warning(response.message, lotNumber, 'barcode');
            }

            else {
                console.error(response.message);
                this.alert.Danger('GetLotInformation', 'Error', 'bug');
            }

            return null;
        }
    }


    /** HTTP GET */
    public GetCaseLabel = async (caseLabel: string, storageCode: string = '') => {
        const response = await HTTP.GET<LOT_INFORMATION_DTO[]>({
            url: `${this.controller}/GetCaseLabel/${caseLabel}`,
            queryParams: [
                { param: 'storageCode', value: storageCode }
            ]
        });

        if(!response.ok) {
            console.error(response.message);
            this.alert.Danger('GetCaseLabel', 'Error', 'bug');
            return [];
        }

        return response.data;
    }


    /** HTTP GET */
    public GetLotListByLocation = async (location: string) => {
        const response = await HTTP.GET<LOT_INFORMATION_DTO[]>({
            url: `${this.controller}/GetLotListByLocation/${location}`
        });

        if(!response.ok) {
            console.error(response.message);
            this.alert.Danger('GetLotListByLocation', 'Error', 'bug');
            return [];
        }

        return response.data;
    }


    /** HTTP GET */
    public GetStorageList = async (factory: string = '', storageType: string = '') => {
        const response = await HTTP.GET<STORAGE_DTO[]>({
            url: `${this.controller}/GetStorageList`,
            queryParams: [
                { param: 'factory',     value: factory     },
                { param: 'storageType', value: storageType }
            ]
        });

        if(!response.ok) {
            console.error(response.message);
            this.alert.Danger('GetStorageList', 'Error', 'bug');
        }

        return response.data;
    }


    /** HTTP GET */
    public GetLocation = async (location: string, showWarning: boolean = true) => {
        const response = await HTTP.GET<RACK_LOCATION_DTO>({
            url: `${this.controller}/GetLocation/${location}`
        });

        if(response.ok) {
            return response.data;
        }

        else {
            if(response.status < 500) {
                if(showWarning) {
                    this.alert.CloseAllAlerts();
                    this.alert.Warning(response.message, location, 'location');
                }
            }

            else {
                console.error(response.message);
                this.alert.Danger('GetLocation', 'Error', 'bug');
            }

            return null;
        }
    } 


    /** HTTP GET */
    public GetLocationList = async (rack: string | null, rackType: string | null) => {
        const response = await HTTP.GET<RACK_LOCATION_DTO[]>({
            url: `${this.controller}/GetLocationList`,
            queryParams: [
                { param: 'rack'    , value: rack     },
                { param: 'rackType', value: rackType }
            ]
        });

        if(!response.ok) {             
            console.error(response.message);
            this.alert.Danger('GetLocationList', 'Error', 'bug');
            
            return [];
        } 

        return response.data;
    }


    /** HTTP GET */
    public GetLocationByMaterial = async (partNumber: string) => {
        const response = await HTTP.GET<any[]>({
            url: `${this.controller}/GetLocationByMaterial/${partNumber}`
        });

        if(!response.ok) {
            if(response.status < 500) {                 
                this.alert.CloseAllAlerts();
                this.alert.Warning(response.message, partNumber, 'material');                 
            }

            else {
                console.error(response.message);
                this.alert.Danger('GetLocationByMaterial', 'Error', 'bug');
            }

            return [];
        } 

        return response.data;
    }


    /** HTTP GET */
    public GetPrinterList = async () => {
        const response = await HTTP.GET<PRINTER_DTO[]>({
            url: `${this.controller}/GetPrinterList`
        });

        if(!response.ok) {             
            console.error(response.message);
            this.alert.Danger('GetPrinterList', 'Error', 'bug');
            
            return [];
        } 

        return response.data;
    }
}