import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";     
import { LOT_INFORMATION_DTO } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";   

@Injectable({ providedIn: 'root' })
export class MoveMaterialService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxPDA}/api/Location/MoveMaterial`;  

    /** HTTP GET */
    public GetIssueReq = async (issueNumber: string) => { 
        const response = await HTTP.GET<MATERIAL_ISSUE_DTO[]>({
            url: `${this.controller}/GetIssueReq/${issueNumber}`
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, issueNumber, 'barcode'); 
            }
    
            else {
                this.alert.Danger('GetIssueReq', 'Error', 'bug'); 
                console.error(response.message);
            }

            return [];
        }   

        return response.data.map(item => ({ ...item, QTY_CHECKED: 0, DETAIL: [] }));
    }  


    /** HTTP POST */
    public MoveMaterialList = async (issueNumber: string, lotNumberList: string[]) => { 
        const response = await HTTP.POST<string>({
            url: `${this.controller}/MoveMaterialList/${issueNumber}`,
            responseType: 'text',
            body: lotNumberList
        }); 
        
        if(!response.ok) {         
            if(response.status < 500) {
                this.alert.Warning(response.message, 'MoveMaterialList', 'barcode'); 
            }
    
            else {
                this.alert.Danger('MoveMaterialList', 'Error', 'bug'); 
                console.error(response.message);
            }
        }  

        return response;
    } 
}  


export interface MATERIAL_ISSUE_DTO {
    ISSUE_NUMBER: string;
    ORDER_NUMBER: number;
    PART_NUMBER:  string;
    STORAGE_CODE: string;
    STORAGE:      string;
    QTY:          number; 
    QTY_CHECKED:  number;
    DETAIL:       LOT_INFORMATION_DTO[];
} 