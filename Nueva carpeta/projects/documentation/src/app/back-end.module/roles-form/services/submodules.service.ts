import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";   
import { HTTP } from "hwmx-angular/tools";
import { IPatch } from "hwmx-angular/interfaces";
import { ISubmodule } from "../interfaces";

@Injectable({ providedIn: 'root' })
export class SubmodulesService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxCore}/api/ProjectsSubmodules`; 
 
    /** HTTP GET */
    public async GetSubmoduleById(submoduleId: number): Promise<ISubmodule | null> {
        const response = await HTTP.GET<ISubmodule>({
            url: `${this.controller}/GetSubmoduleById/${submoduleId}`
        });

        if(response.ok) {            
            return response.data;
        }         

        else {
            console.error(response.message);
            this.alert.Danger('GetSubmoduleById', 'Error', 'bug');
            return null;
        }
    }  


    /** HTTP GET */
    public async GetSubmoduleList(projectId: number, moduleId: number): Promise<ISubmodule[]> {
        const response = await HTTP.GET<ISubmodule[]>({
            url: `${this.controller}/GetSubmoduleList/${projectId}`,
            queryParams: [
                { param: 'moduleId', value: moduleId }
            ]            
        });

        if(response.ok) {            
            return response.data;
        }         

        else {
            console.error(response.message);
            this.alert.Danger('GetSubmoduleList', 'Error', 'bug');
            return [];
        }
    }  


    /** HTTP POST */
    public async CreateSubmodule(submodule: ISubmodule): Promise<ISubmodule | null> {
        const response = await HTTP.POST<ISubmodule>({
            url: `${this.controller}/CreateSubmodule`,
            body: submodule
        });

        if(response.ok) {            
            return response.data;
        }         

        else {
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('CreateSubmodule', 'Error', 'bug');
            }
            
            return null;
        }
    }  


    /** HTTP PUT */
    public async UpdateSubmodule(submodule: ISubmodule): Promise<ISubmodule | null> {
        const response = await HTTP.PUT<ISubmodule>({
            url: `${this.controller}/UpdateSubmodule`,
            body: submodule
        });

        if(response.ok) {            
            return response.data;
        }         

        else {
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('UpdateSubmodule', 'Error', 'bug');
            }

            return null;
        }
    } 


    /** HTTP PATCH */
    public async PatchSubmodule(submoduleId: number, patch: IPatch[]): Promise<ISubmodule | null> {
        const response = await HTTP.PATCH<ISubmodule>({
            url: `${this.controller}/PatchSubmodule/${submoduleId}`,
            body: patch
        });

        if(response.ok) {            
            return response.data;
        }         

        else {
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('PatchSubmodule', 'Error', 'bug');
            }
            
            return null;
        }
    } 


    /** HTTP DELETE */
    public async DeleteSubmodule(submoduleId: number): Promise<boolean> {
        const response = await HTTP.DELETE<void>({
            url: `${this.controller}/DeleteSubmodule/${submoduleId}` 
        });

        if(response.ok) return true;
        
        else {
            console.error(response.message);
            this.alert.Danger('DeleteSubmodule', 'Error', 'bug');
            return false;
        }
    }
}