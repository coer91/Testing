import { Injectable } from "@angular/core"; 
import { appSettings } from "@appSettings";  
import { IModule } from "@appShared/interfaces";
import { HTTP } from "hwmx-angular/tools";
import { IMenu } from "hwmx-angular/interfaces";

@Injectable({ providedIn: 'root' })
export class SidenavService extends HTTP {

    private readonly controller = `${appSettings.webAPI.hwmxCore}/api/Navigation`;  


    /** HTTP GET */
    public async GetNavigationByProject(projectId: number): Promise<IMenu[]> {
        const response = await HTTP.GET<IMenu[]>({
            url: `${this.controller}/GetNavigationByProject/${projectId}` 
        });

        if(response.ok) {            
            return response.data;
        }         

        else {
            console.error(response.message);
            this.alert.Danger('GetNavigationByProject', 'Error', 'bug');
            return [];
        }
    }  


    /** HTTP PUT */
    public async UpdateLevel1(projectId: number, navigation: IMenu[]): Promise<boolean> {
        const response = await HTTP.PUT<void>({
            url: `${this.controller}/UpdateLevel1/${projectId}`, 
            body: navigation
        });

        if(response.ok) return true; 

        else {
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('UpdateLevel1', 'Error', 'bug');
            }
            
            return false;
        }
    } 


    /** HTTP PUT */
    public async UpdateLevel2(projectId: number, moduleId: number, navigation: IMenu[]): Promise<boolean> {
        const response = await HTTP.PUT<void>({
            url: `${this.controller}/UpdateLevel2/${projectId}/${moduleId}`, 
            body: navigation
        });

        if(response.ok) return true;        

        else {
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('UpdateLevel2', 'Error', 'bug');
            }
            
            return false;
        }
    } 


    /** HTTP PUT */
    public async UpdateLevel3(projectId: number, moduleId: number, submoduleId: number, navigation: IMenu[]): Promise<boolean> {
        const response = await HTTP.PUT<void>({
            url: `${this.controller}/UpdateLevel3/${projectId}/${moduleId}/${submoduleId}`, 
            body: navigation
        });

        if(response.ok) return true;       

        else {
            if(response.status < 500) {
                this.alert.Warning(response.message);
            }

            else {
                console.error(response.message);
                this.alert.Danger('UpdateLevel3', 'Error', 'bug');
            }
            
            return false;
        }
    } 
}