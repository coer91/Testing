import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';   
import { ROUTES_WIA } from 'hwmx-angular/core'; 
import { SharedModule } from '../shared/shared.module';

export const ROUTES = ([ 
    {
        path: 'back-end',
        loadChildren: () => import('./back-end.module/back-end.module').then(module => module.BackEndModule)
    }, 
    {
        path: 'front-end',
        loadChildren: () => import('./front-end.module/front-end.module').then(module => module.FrontEndModule)
    }, 
] as Routes).concat(ROUTES_WIA); 


@NgModule({ 
    declarations: [],
    imports: [SharedModule],
    exports: [SharedModule]
})
export class AppModule { }