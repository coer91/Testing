import { ActivatedRouteSnapshot, CanActivateFn, Route, RouterStateSnapshot, Routes } from "@angular/router";
import { isLoadingSIGNAL, navigationKeysSIGNAL, userSIGNAL } from "hwmx-angular/signals";
import { Access, CoerAlert, Tools } from "hwmx-angular/tools";
import { HomePage } from "./home/home.component";
import { MenuPage } from "./menu/menu.component";
import { Type } from "@angular/core";
declare const appSettings: any;  


/** */
export const LoginGuard: CanActivateFn = () => { 
    if(Access.IsLogin()) return true;

    else { 
        if(userSIGNAL()) {
            console.log(`Unathorized by login`);
            new CoerAlert().Danger('Login expired', 'Unathorized', 'iw-hand-stop-fill');
            Access.LogOut(userSIGNAL);
        }   
        
        return false;
    }  
}; 


/** */
export const ActiveKeyGuard: CanActivateFn = async ({ data }: ActivatedRouteSnapshot, { url }: RouterStateSnapshot) => {
    const ACTIVE_KEY = `${data['activeKey'] || ''}`.toUpperCase();

    if(Tools.IsNotOnlyWhiteSpace(ACTIVE_KEY)) {

        let attempts = 60;
        let navigationKeys: string[] = [];
        const showHome = !Tools.IsBooleanFalse(appSettings?.navigation?.showHome);

        do { 
            navigationKeys = Array.from(navigationKeysSIGNAL().values());
            
            if(navigationKeys.length > (showHome ? 1 : 0)) break;
            
            else {
                isLoadingSIGNAL.set(true);
                await Tools.Sleep(1000);
            }
        } while(--attempts > 0);

        isLoadingSIGNAL.set(false);
       
        if(navigationKeys.includes(ACTIVE_KEY)) return true; 

        else { 
            console.log(`Unathorized by path ${url}`);
            new CoerAlert().Danger('You do not have authorization for this section', 'Unathorized', 'iw-hand-stop-fill');        
            
            let redirectTo = String(appSettings?.navigation?.redirectTo || '/home');
            if(!redirectTo.startsWith('/')) redirectTo = `/${redirectTo}`;

            if(document.location.href.includes('#')) {
                document.location.href = `/#${redirectTo}`;
            }

            else document.location.href = `/${redirectTo}`; 
            return false;
        } 
    }

    return true;
};  


/** */
export const ROUTER_PAGE = (path: string, component: Type<any>, routerParams: string[] = [], activeKey: string = ''): Route => {
    const params = routerParams.length > 0 ? `/:${routerParams.join('/')}` : '';

    return { 
        path: `${path}${params}`, 
        component, 
        data: { activeKey },
        canActivate: [LoginGuard, ActiveKeyGuard]
    };
} 


/** */
export const ROUTES_WIA = ([] as Routes)
    .concat([ROUTER_PAGE('menu', MenuPage)])
    .concat(!Tools.IsBooleanFalse(appSettings?.navigation?.showHome) ? [ROUTER_PAGE('home', HomePage)] : [])
    .concat([{ path: '**', redirectTo: (Tools.IsNotOnlyWhiteSpace(appSettings?.navigation?.redirectTo) ? appSettings?.navigation?.redirectTo : 'home') }]);  