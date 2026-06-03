import { IAuthService, ILogin, ILoginResponse, IMenu, IUserRole } from 'hwmx-angular/interfaces';
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
    
    private readonly AuthController = `${appSettings.webAPI.hwmxCore}/api/Auth`; 
    private readonly UsersRoleController = `${appSettings.webAPI.hwmxCore}/api/UsersRole`;  
    private readonly NavigationController = `${appSettings.webAPI.hwmxCore}/api/Navigation`; 
    
    protected staticNavigation = NAVIGATION; 

    protected authService: IAuthService = { 
            
        /** HTTP POST */
        Login: (login: ILogin) => HTTP.POST<ILoginResponse>({
            url: `${this.AuthController}/LoginOracle`,
            body: login
        }),
    
    
        /** HTTP POST */
        RecoveryPassword: (userEmail: string) => HTTP.POST<ILogin>({
            url: `${this.AuthController}/RecoveryPasswordEmail/${userEmail}` 
        }),
    
    
        /** HTTP PUT */
        SetPassword: (login: ILogin) => HTTP.PUT<string>({
            url: `${this.AuthController}/SetPassword`,
            body: login,
            responseType: 'text'  
        }),
    
    
        /** HTTP PUT */
        UpdateJWT: () => HTTP.PUT<string>({
            url: `${this.AuthController}/UpdateJWT`,
            responseType: 'text' 
        }),
    
    
        /** HTTP PUT */
        SetUserRoleMain: (userId: number, roleId: number | string) => HTTP.PUT<IUserRole>({
            url: `${this.UsersRoleController}/SetUserRoleMain/${userId}/${roleId}` 
        }),
    
    
        /** HTTP GET */
        GetNavigation: (projectId: number) => HTTP.GET<IMenu[]>({
            url: `${this.NavigationController}/GetNavigationByRole/${projectId}` 
        }),
    }
}