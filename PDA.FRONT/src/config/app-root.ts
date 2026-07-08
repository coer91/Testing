import { IAuthService, ILogin, ILoginResponse, IMenu } from 'hwmx-angular/interfaces';
import { environmentSIGNAL } from 'hwmx-angular/signals';
import { NAVIGATION } from '../app.sidenav';  
import { appSettings } from '@appSettings';
import { Component } from '@angular/core';   
import { AppModule } from '../app/app.routing';
import { HTTP } from 'hwmx-angular/tools';

environmentSIGNAL.set(appSettings.environment); 

@Component({
    selector: 'app-root',
    imports: [AppModule], 
    template: `
        <wia-root 
            [authService]="authService" 
            [staticNavigation]="staticNavigation" 
        ></wia-root>
    `
})
export class AppRoot {   
    
    private readonly AuthController       = `${appSettings.webAPI.hwmxCore}/api/Auth`; 
    private readonly NavigationController = `${appSettings.webAPI.hwmxCore}/api/Navigation`; 
    
    protected staticNavigation = NAVIGATION; 

    protected authService: IAuthService = { 
            
        /** HTTP POST */
        Login: (login: ILogin) => HTTP.POST<ILoginResponse>({
            url: `${this.AuthController}/Login`,
            body: login
        }), 
    
    
        /** HTTP PUT */
        UpdateJWT: () => HTTP.PUT<string>({
            url: `${this.AuthController}/UpdateJWT`,
            responseType: 'text' 
        }), 


        /** HTTP PUT */
        SetLanguage: (languageId: string) => HTTP.PUT<string>({
            url: `${this.AuthController}/SetLanguage/${languageId}`,
            responseType: 'text' 
        }),
    
    
        /** HTTP GET */
        GetNavigation: (projectId: number) => HTTP.GET<IMenu[]>({
            url: `${this.NavigationController}/GetNavigation/${projectId}` 
        }),
    }
}