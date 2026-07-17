import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { HTTP } from "hwmx-angular/tools";
import { IPatch } from "hwmx-angular/interfaces";
import { IModule } from "../interfaces";

@Injectable({ providedIn: 'root' })
export class ModulesService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxCore}/api/ProjectsModules`;  


    /** HTTP GET */
    public async GetModuleById(moduleId: number): Promise<IModule | null> {
        const response = await HTTP.GET<IModule>({
            url: `${this.controller}/GetModuleById/${moduleId}` 
        });

        if(response.ok) {            
            return response.data;
        }         

        else {
            console.error(response.message);
            this.alert.Danger('GetModuleById', 'Error', 'bug');
            return null;
        }
    } 


    /** HTTP GET */
    public async GetModuleList(projectId: number): Promise<IModule[]> {
        const response = await HTTP.GET<IModule[]>({
            url: `${this.controller}/GetModuleList/${projectId}` 
        });

        if(response.ok) {            
            return response.data;
        }         

        else {
            console.error(response.message);
            this.alert.Danger('GetModuleList', 'Error', 'bug');
            return [];
        }
    } 


    /** HTTP POST */
    public async CreateModule(module: IModule): Promise<IModule | null> {
        const response = await HTTP.POST<IModule>({
            url: `${this.controller}/CreateModule`,
            body: module
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
                this.alert.Danger('CreateModule', 'Error', 'bug');
            }
            
            return null;
        }
    } 


    /** HTTP PUT */
    public async UpdateModule(module: IModule): Promise<IModule | null> {
        const response = await HTTP.PUT<IModule>({
            url: `${this.controller}/UpdateModule`,
            body: module
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
                this.alert.Danger('UpdateModule', 'Error', 'bug');
            }
            
            return null;
        }
    }
    
    
    /** HTTP PATCH */
    public async PatchModule(moduleId: number, patch: IPatch[]): Promise<IModule | null> {
        const response = await HTTP.PATCH<IModule>({
            url: `${this.controller}/PatchModule/${moduleId}`,
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
                this.alert.Danger('PatchModule', 'Error', 'bug');
            }
            
            return null;
        }
    }


    /** HTTP DELETE */
    public async DeleteModule(moduleId: number): Promise<boolean> {
        const response = await HTTP.DELETE<void>({
            url: `${this.controller}/DeleteModule/${moduleId}` 
        });

        if(response.ok) return true;
        
        else {
            console.error(response.message);
            this.alert.Danger('DeleteModule', 'Error', 'bug');
            return false;
        }
    }
}