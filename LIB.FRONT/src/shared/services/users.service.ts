import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";   
import { HTTP } from "hwmx-angular/tools";
import { IPatch } from "hwmx-angular/interfaces";
import { IUser } from "@appShared/interfaces";

@Injectable({ providedIn: 'root' })
export class UsersService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxCore}/api/Users`; 

    /** HTTP GET */
    public GetUserById = (user: string) => HTTP.GET<IUser>({
        url: `${this.controller}/GetUserById/${user}` 
    });


    /** HTTP GET */
    public GetUserList = (onlyActive: boolean) => HTTP.GET<IUser[]>({
        url: `${this.controller}/GetUserList`,
        queryParams: [
            { param: 'onlyActive', value: onlyActive }
        ] 
    }); 

    /** HTTP POST */
    public CreateUser = (user: IUser) => HTTP.POST<IUser>({
        url: `${this.controller}/CreateUser`,
        body: user
    }); 

    /** HTTP PUT */
    public UpdateUser = (user: IUser) => HTTP.PUT<IUser>({
        url: `${this.controller}/UpdateUser`,
        body: user 
    }); 

    /** HTTP PATCH */
    public PatchUser = (user: string, patch: IPatch[]) => HTTP.PATCH<IUser>({
        url: `${this.controller}/PatchUser/${user}`,
        body: patch 
    });  
}