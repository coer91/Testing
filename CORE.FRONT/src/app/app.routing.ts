import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';   
import { ROUTES_WIA } from 'hwmx-angular/core'; 
import { SharedModule } from '../shared/shared.module';

export const ROUTES = ([  
    {
        path: 'authorization',
        loadChildren: () => import('./authorization.module/authorization.module').then(module => module.AuthorizationModule)
    },
    {
        path: 'structure',
        loadChildren: () => import('./structure.module/structure.module').then(module => module.StructureModule)
    }     
] as Routes).concat(ROUTES_WIA); 


@NgModule({ 
    declarations: [],
    imports: [SharedModule],
    exports: [SharedModule]
})
export class AppModule { }