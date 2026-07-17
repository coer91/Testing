import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { IOption } from "hwmx-angular/interfaces";
import { HTTP } from "hwmx-angular/tools";

@Injectable({ providedIn: 'root' })
export class ProjectsService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxCore}/api/Projects`;  

    
    /** HTTP GET */
    public async GetMenuTypeList() {
        const response = await HTTP.GET<IOption[]>({
            url: `${this.controller}/GetMenuTypeList` 
        });

        if(response.ok) {            
            return response.data;
        } 
        

        else {
            console.error(response.message);
            this.alert.Danger('GetProjectList', 'Error', 'bug');
            return [];
        }
    }
 
    
    /** HTTP GET */
    public async GetProjectList() {
        const response = await HTTP.GET<IOption[]>({
            url: `${this.controller}/GetProjectList` 
        });

        if(response.ok) {            
            return response.data;
        } 
        

        else {
            console.error(response.message);
            this.alert.Danger('GetProjectList', 'Error', 'bug');
            return [];
        }
    } 
}