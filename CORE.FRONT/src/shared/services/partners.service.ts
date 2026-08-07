import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings"; 
import { IOption } from "hwmx-angular/interfaces";
import { HTTP } from "hwmx-angular/tools";

@Injectable({ providedIn: 'root' })
export class PartnersService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxCore}/api/Partners`;  

    
    /** HTTP GET */
    public async GetPartnerById() {
        const response = await HTTP.GET<IOption[]>({
            url: `${this.controller}/GetPartnerById` 
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
 
    
    /** HTTP GET */
    public async GetPartnerList() {
        const response = await HTTP.GET<IOption[]>({
            url: `${this.controller}/GetPartnerList` 
        });

        if(!response.ok) {            
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('GetPartnerList', 'Error', 'bug');
            } 

            return [];
        }  

        return response.data;
    } 
}