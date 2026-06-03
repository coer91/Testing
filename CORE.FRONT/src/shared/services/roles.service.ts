import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";   
import { HTTP } from "hwmx-angular/tools";
import { IOption, IPatch } from "hwmx-angular/interfaces";

@Injectable({ providedIn: 'root' })
export class RolesService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxCore}/api/Roles`; 

    /** HTTP GET */
    public GetRoleById = (roleId: number) => HTTP.GET<IOption>({
        url: `${this.controller}/GetRoleById/${roleId}` 
    });  


    /** HTTP GET */
    public async GetRoleList(onlyActive: boolean): Promise<IOption[]> {
        const response = await HTTP.GET<IOption[]>({
            url: `${this.controller}/GetRoleList`,
            queryParams: [
                { param: 'onlyActive', value: onlyActive }
            ]             
        });

        if(response.ok) {            
            return response.data;
        }         

        else {
            console.error(response.message);
            this.alert.Danger('GetRoleList', 'Error', 'bug');
            return [];
        }
    }  


    /** HTTP POST */
    public CreateRole = (role: IOption) => HTTP.POST<IOption>({
        url: `${this.controller}/CreateRole`,
        body: role
    }); 


    /** HTTP PUT */
    public UpdateRole = (role: IOption) => HTTP.PUT<IOption>({
        url: `${this.controller}/UpdateRole`,
        body: role 
    }); 


    /** HTTP PATCH */
    public PatchRole = (roleId: number, patch: IPatch[]) => HTTP.PATCH<IOption>({
        url: `${this.controller}/PatchRole/${roleId}`,
        body: patch 
    }); 

    
    /** HTTP DELETE */
    public DeleteRole = (roleId: number) => HTTP.DELETE<void>({
        url: `${this.controller}/DeleteRole/${roleId}`
    }); 
}