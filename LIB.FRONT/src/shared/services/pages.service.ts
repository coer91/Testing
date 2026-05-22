import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { IPage } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";
import { IPatch } from "hwmx-angular/interfaces";

@Injectable({ providedIn: 'root' })
export class PagesService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxCore}/api/ProjectsPages`;  

    /** HTTP GET */
    public async GetPageById(pageId: number) {
        const response = await HTTP.GET<IPage>({
            url: `${this.controller}/GetPageById/${pageId}`
        });
    
        if(response.ok) {            
            return response.data;
        }         
    
        else {
            console.error(response.message);
            this.alert.Danger('GetPageById', 'Error', 'bug');
            return null;
        }
    }
 

    /** HTTP GET */
    public async GetPageList(projectId: number, moduleId: number, submoduleId: number, onlyActive: boolean = true) {
        const response = await HTTP.GET<IPage[]>({
            url: `${this.controller}/GetPageList/${projectId}`,
            queryParams: [
                { param: 'moduleId'   , value: moduleId  },
                { param: 'submoduleId', value: submoduleId },
                { param: 'onlyActive' , value: onlyActive  }
            ] 
        });
    
        if(response.ok) {            
            return response.data;
        }         
    
        else {
            console.error(response.message);
            this.alert.Danger('GetPageList', 'Error', 'bug');
            return [];
        }
    } 


    /** HTTP POST */
    public async CreatePage(module: IPage) {
        const response = await HTTP.POST<IPage>({
            url: `${this.controller}/CreatePage`,
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
                this.alert.Danger('CreatePage', 'Error', 'bug');
            }
            
            return null;
        }
    } 


    /** HTTP PUT */
    public async UpdatePage(module: IPage) {
        const response = await HTTP.PUT<IPage>({
            url: `${this.controller}/UpdatePage`,
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
                this.alert.Danger('UpdatePage', 'Error', 'bug');
            }
            
            return null;
        }
    }  


    /** HTTP PATCH */
    public async PatchPage(pageId: number, patch: IPatch[]) {
        const response = await HTTP.PATCH<IPage>({
            url: `${this.controller}/PatchPage/${pageId}`,
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
                this.alert.Danger('PatchPage', 'Error', 'bug');
            }
            
            return null;
        }
    } 


    /** HTTP DELETE */
    public async DeletePage(pageId: number) {
        const response = await HTTP.DELETE<boolean>({
            url: `${this.controller}/DeletePage/${pageId}`
        });
    
        if(response.ok) return true; 
    
        else {
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('DeletePage', 'Error', 'bug');
            }
            
            return false;
        }
    }
}