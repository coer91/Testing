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
    public GetRoleList = (onlyActive: boolean) => HTTP.GET<IOption[]>({
        url: `${this.controller}/GetRoleList`,
        queryParams: [
            { param: 'onlyActive', value: onlyActive }
        ] 
    }); 

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