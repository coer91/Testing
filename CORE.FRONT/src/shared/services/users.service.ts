import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";   
import { HTTP } from "hwmx-angular/tools";
import { IPatch } from "hwmx-angular/interfaces";
import { IUser, IUserRole } from "@appShared/interfaces";

@Injectable({ providedIn: 'root' })
export class UsersService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxCore}/api/Users`; 
    private readonly usersRolesController = `${appSettings.webAPI.hwmxCore}/api/UsersRoles`; 
    private readonly usersImagesController = `${appSettings.webAPI.hwmxCore}/api/UsersImage`; 
 

    /** HTTP GET */
    public async GetUser(user: string) {
        const response = await HTTP.GET<IUser>({
            url: `${this.controller}/GetUser/${user}` 
        });

        if(!response.ok) {            
            console.error(response.message);
            this.alert.Danger('GetUser', 'Error', 'bug');
        }   

        return response;
    }


    /** HTTP GET */
    public async GetUserList(departmentId: string | null, onlyActive: boolean) {
        const response = await HTTP.GET<IUser[]>({
            url: `${this.controller}/GetUserList`,
            queryParams: [
                { param: 'departmentId', value: departmentId },
                { param: 'onlyActive',   value: onlyActive   }
            ] 
        });

        if(response.ok) {            
            return response.data;
        }  

        else {
            console.error(response.message);
            this.alert.Danger('GetUserList', 'Error', 'bug');
            return [];
        }
    } 


    /** HTTP PUT */
    public async CreateUser(user: string) {
        const response = await HTTP.POST<IUser>({
            url: `${this.controller}/CreateUser/${user}`
        });

        if(!response.ok) {
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('CreateUser', 'Error', 'bug');
            } 
        }
        
        return response; 
    }
   

    /** HTTP PUT */
    public async UpdateUser(user: IUser) {
        const response = await HTTP.PUT<IUser>({
            url: `${this.controller}/UpdateUser`,
            body: user  
        });

        if(!response.ok) {
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('UpdateUser', 'Error', 'bug');
            } 
        }
        
        return response; 
    }


    /** HTTP PATCH */
    public async PatchUser(user: string, patch: IPatch[]) {
        const response = await HTTP.POST<IUser>({
            url: `${this.controller}/PatchUser/${user}`,
            body: patch  
        });

        if(!response.ok) {
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('PatchUser', 'Error', 'bug');
            } 
        }
        
        return response; 
    }
    
    
    /** HTTP POST */
    public async CreateUserRole(userId: number, roleId: number) {
        const response = await HTTP.POST<IUserRole>({
            url: `${this.usersRolesController}/CreateUserRole/${userId}/${roleId}` 
        });

        if(response.ok) return true;
        
        else {
            console.error(response.message);
            this.alert.Danger('CreateUserRole', 'Error', 'bug');
            return false;
        }
    }


    /** HTTP POST */
    public async CreateUserRoleList(userId: number, roleList: number[]) {
        const response = await HTTP.POST<IUserRole[]>({
            url: `${this.usersRolesController}/CreateUserRoleList/${userId}`,
            body:  roleList
        });

        if(response.ok) {
            return response.data;
        }
        
        else {
            console.error(response.message);
            this.alert.Danger('CreateUserRoleList', 'Error', 'bug');
            return [];
        }
    }
    

    /** HTTP DELETE */
    public async DeleteUserRole(userId: number, roleId: number) {
        const response = await HTTP.DELETE<void>({
            url: `${this.usersRolesController}/DeleteUserRole/${userId}/${roleId}` 
        });

        if(response.ok) return true;
        
        else {
            console.error(response.message);
            this.alert.Danger('DeleteUserRole', 'Error', 'bug');
            return false;
        }
    }


    /** HTTP GET */
    public async GetUserImage(user: string) {
        const response = await HTTP.GET<string>({
            url: `${this.usersImagesController}/GetUserImage/${user}`,
            responseType: 'text'
        });

        if(!response.ok) {     
            if(response.status >= 500) {
                console.error(response.message);
                this.alert.Danger('GetUserImage', 'Error', 'bug');
            }       

            return '';
        }   

        return response.data;
    }


    /** HTTP POST */
    public async UploadUserImage(user: string, userPhoto: File) {
        const formData = new FormData();
        formData.append('fileCollection', userPhoto);

        const response = await HTTP.POST<string>({
            url: `${this.usersImagesController}/UploadUserImage/${user}`,
            body: formData,
            isFormFileCollection: true,
            responseType: 'text'
        });

        if(!response.ok) {            
            if(response.status >= 500) {
                this.alert.Warning(response.message);
            }       
            
            else {
                console.error(response.message);
                this.alert.Danger('UploadUserImage', 'Error', 'bug');
            }
        }   

        return response;
    }


    /** HTTP DELETE */
    public async DeleteUserImage(user: string) {
        const response = await HTTP.DELETE<string>({
            url: `${this.usersImagesController}/DeleteUserImage/${user}`,
            responseType: 'text'
        });

        if(!response.ok) {  
            if(response.status >= 500) {
                this.alert.Warning(response.message);
            }       
            
            else {
                console.error(response.message);
                this.alert.Danger('DeleteUserImage', 'Error', 'bug');
            }
        }   

        return response;
    }
}