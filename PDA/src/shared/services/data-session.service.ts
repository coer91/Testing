import { Injectable } from "@angular/core";
import { appSettings } from "@appSettings";
import {  HTTP } from "hwmx-angular/tools"; 

@Injectable({ providedIn: 'root' })
export class DataSessionService extends HTTP {
 
    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/DataSession`; 


    /** HTTP GET */
    public GetDataSession = async (pageCode: string, operation: string) => {
        const response = await HTTP.GET<DATA_SESSION_DTO[]>({
            url: `${this.controller}/GetDataSession/${pageCode}/${operation}`
        });

        if(!response.ok) {             
            console.error(response.message);
            this.alert.Danger('GetDataSession', 'Error', 'bug');            
            return [];
        } 

        return response.data;
    }


    /** HTTP GET */
    public GetLastDataSession = async (pageCode: string) => {
        const response = await HTTP.GET<DATA_SESSION_DTO[]>({
            url: `${this.controller}/GetLastDataSession/${pageCode}`
        });

        if(!response.ok) {             
            console.error(response.message);
            this.alert.Danger('GetLastDataSession', 'Error', 'bug');            
            return [];
        } 

        return response.data;
    }


    /** HTTP GET */
    public GetDetailDataSession = async (pageCode: string, detail: string) => {
        const response = await HTTP.GET<DATA_SESSION_DTO>({
            url: `${this.controller}/GetDetailDataSession/${pageCode}/${detail}`
        });

        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('GetDetailDataSession', 'Error', 'bug');
            }

            return null;
        } 

        return response.data;
    }


    /** HTTP GET */
    public GetStatusDataSession = async (pageCode: string, detail: string) => {
        const response = await HTTP.GET<string>({
            url: `${this.controller}/GetStatusDataSession/${pageCode}/${detail}`,
            responseType: 'text'
        });

        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('GetStatusDataSession', 'Error', 'bug');
            }       

            return '';
        } 

        return response.data;
    }


    /** HTTP POST */
    public AddDataSession = async (pageCode: string, operation: string, detail: string, json: string) => {
        const response = await HTTP.POST<string>({
            url: `${this.controller}/AddDataSession/${pageCode}/${operation}/${detail}`,
            body: json,
            responseType: 'text'
        });

        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, operation); 
            }

            else {
                console.error(response.message);
                this.alert.Danger('SetDataSession', 'Error', 'bug'); 
            }

            return '';
        } 

        return response.data;
    }


    /** HTTP POST */
    public SetDataSession = async (pageCode: string, operation: string, detailArray: string[], jsonArray: string[]) => {
        const response = await HTTP.POST<string>({
            url: `${this.controller}/SetDataSession/${pageCode}/${operation}`,
            body: [detailArray, jsonArray],
            responseType: 'text'
        });

        if(!response.ok) {             
            if(response.status < 500) {
                this.alert.Warning(response.message, operation); 
            }

            else {
                console.error(response.message);
                this.alert.Danger('SetDataSession', 'Error', 'bug'); 
            }
        } 

        return response;
    }


    /** HTTP DELETE */
    public DeleteDataSession = async (pageCode: string, operation: string, detail: string) => {
        const response = await HTTP.DELETE<string>({
            url: `${this.controller}/DeleteDataSession/${pageCode}/${operation}/${detail}`,
            responseType: 'text'
        });

        if(!response.ok) {     
            if(response.status < 500) {
                this.alert.Warning(response.message, operation);
            }   
            
            else {
                console.error(response.message);
                this.alert.Danger('DeleteDataSession', 'Error', 'bug'); 
            }
        } 

        return response;
    }


    /** HTTP DELETE */
    public ClearDataSession = async (pageCode: string, operation: string) => {
        const response = await HTTP.DELETE<string>({
            url: `${this.controller}/ClearDataSession/${pageCode}/${operation}`,
            responseType: 'text'
        });

        if(!response.ok) {     
            if(response.status < 500) {
                this.alert.Warning(response.message, operation);
            }   
            
            else {
                console.error(response.message);
                this.alert.Danger('ClearDataSession', 'Error', 'bug'); 
            }
        } 

        return response;
    }
}


export interface DATA_SESSION_DTO {
    PAGE_CODE: string;
    OPERATION: string;
    DETAIL: string;
    DETAIL_JSON: string;
    INPUTUSER: string;
    INPUTDATE: string;
}