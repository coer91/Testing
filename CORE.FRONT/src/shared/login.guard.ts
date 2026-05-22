import { CanActivateFn } from '@angular/router'; 
import { Access } from 'hwmx-angular/tools'; 

export const LoginGuard: CanActivateFn = () => {
    if(Access.IsLogin()) return true;

    else {
        console.log(`Unathorized by login`);
        return false;
    } 
}; 