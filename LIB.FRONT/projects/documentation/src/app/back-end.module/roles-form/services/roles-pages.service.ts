import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";   
import { IPatch } from "hwmx-angular/interfaces";
import { HTTP } from "hwmx-angular/tools"; 
import { IRolePage } from "../interfaces";

@Injectable({ providedIn: 'root' })
export class RolesPagesService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxCore}/api/RolesPages`; 

    /** HTTP GET */
    public GetRolePageById = (rolePageId: number) => HTTP.GET<IRolePage>({
        url: `${this.controller}/GetRolePageById/${rolePageId}` 
    });


    /** HTTP GET */
    public GetRolePageList = (roleId: number) => HTTP.GET<IRolePage[]>({
        url: `${this.controller}/GetRolePageList/${roleId}` 
    });  


    /** HTTP POST */
    public CreateRolePageList = (roleId: number, rolePageList: number[]) => HTTP.POST<IRolePage>({
        url: `${this.controller}/CreateRolePageList/${roleId}`,
        body: rolePageList
    }); 


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


    /** HTTP DELETE */
    public DeleteRolePage = (rolePageId: number) => HTTP.DELETE<void>({
        url: `${this.controller}/DeleteRolePage/${rolePageId}` 
    }); 
}