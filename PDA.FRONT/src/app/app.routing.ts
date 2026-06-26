import { NgModule     } from '@angular/core';   
import { Routes       } from '@angular/router';
import { ROUTES_WIA   } from 'hwmx-angular/core'; 
import { ROUTER_PAGE  } from 'hwmx-angular/core';
import { SharedModule } from '../shared/shared.module';

//Pages
import { ScannerPage } from './scanner/scanner.page';

export const ROUTES = ([    
    {
        path: 'change',
        loadChildren: () => import('./change.module/change.module').then(module => module.ChangeModule)
    },
    {
        path: 'defect',
        loadChildren: () => import('./defect.module/defect.module').then(module => module.DefectModule)
    },
    {
        path: 'delivery',
        loadChildren: () => import('./delivery.module/delivery.module').then(module => module.DeliveryModule)
    },
    {
        path: 'location',
        loadChildren: () => import('./location.module/location.module').then(module => module.LocationModule)
    },
    {
        path: 'lot',
        loadChildren: () => import('./lot.module/lot.module').then(module => module.LotModule)
    },
    {
        path: 'product',
        loadChildren: () => import('./product.module/product.module').then(module => module.ProductModule)
    },
    {
        path: 'recycle',
        loadChildren: () => import('./recycle.module/recycle.module').then(module => module.RecycleModule)
    },
    {
        path: 'shortage',
        loadChildren: () => import('./shortage.module/shortage.module').then(module => module.ShortageModule)
    },
    {
        path: 'store',
        loadChildren: () => import('./store.module/store.module').then(module => module.StoreModule)
    },
    ROUTER_PAGE('scanner', ScannerPage)  
] as Routes).concat(ROUTES_WIA); 


@NgModule({ 
    declarations: [
        ScannerPage
    ],
    imports: [SharedModule],
    exports: [SharedModule]
})
export class AppModule { }