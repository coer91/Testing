import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { IRolePage } from "@appShared/interfaces";
import { IPatch } from "hwmx-angular/interfaces";
import { HTTP } from "hwmx-angular/tools"; 

@Injectable({ providedIn: 'root' })
export class RolesPagesService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxCore}/api/RolesPages`; 
    
    
    /** HTTP GET */
    public async GetRolePageListByRoleId(projectId: number, roleId: number): Promise<IRolePage[]> {
        const response = await HTTP.GET<IRolePage[]>({
            url: `${this.controller}/GetRolePageListByRoleId/${projectId}/${roleId}`        
        });

        if(!response.ok) {            
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('GetRolePageListByRoleId', 'Error', 'bug');
            }

            return [];
        }         

        return response.data;
    } 


    /** HTTP GET */
    public async GetRolePageListByPageId(pageId: number): Promise<IRolePage[]> {
        const response = await HTTP.GET<IRolePage[]>({
            url: `${this.controller}/GetRolePageListByPageId/${pageId}`             
        });

        if(!response.ok) {            
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('GetRolePageListByPageId', 'Error', 'bug');
            }

            return [];
        }         

        return response.data;
    }  
 

    /** HTTP POST */
    public async AddPageListByRole(roleId: number, pageIdList: number[]) {
        const response = await HTTP.POST<IRolePage[]>({
            url: `${this.controller}/AddPageListByRole/${roleId}`, 
            body: pageIdList            
        });

        if(!response.ok) {            
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('AddPageListByRole', 'Error', 'bug');
            } 
        }         

        return response;
    }   


    /** HTTP POST */
    public async AddRoleListByPage(pageId: number, roleIdList: number[]) {
        const response = await HTTP.POST<IRolePage[]>({
            url: `${this.controller}/AddRoleListByPage/${pageId}`, 
            body: roleIdList            
        });

        if(!response.ok) {            
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('AddRoleListByPage', 'Error', 'bug');
            }
        }         

        return response;
    }  


    /** HTTP PUT */
    public UpdateRolePage = (rolePage: IRolePage) => HTTP.PUT<IRolePage>({
        url: `${this.controller}/UpdateRolePage`,
        body: rolePage
    }); 


    /** HTTP PATCH */
    public PatchRolePage = (rolePageId: number, patch: IPatch[]) => HTTP.PATCH<IRolePage>({
        url: `${this.controller}/PatchRolePage/${rolePageId}`,
        body: patch
    });  


    /** HTTP POST */
    public async DeleteRolePage(rolePageId: number) {
        const response = await HTTP.DELETE<void>({
            url: `${this.controller}/DeleteRolePage/${rolePageId}`       
        });

        if(!response.ok) {            
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('DeleteRolePage', 'Error', 'bug');
            }
        }         

        return response;
    } 
}