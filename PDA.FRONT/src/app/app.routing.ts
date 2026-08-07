import { NgModule     } from '@angular/core';   
import { Routes       } from '@angular/router';
import { ROUTES_WIA   } from 'hwmx-angular/core'; 
import { ROUTER_PAGE  } from 'hwmx-angular/core';
import { SharedModule } from '../shared/shared.module';

//Pages
import { ScannerPage } from './pages/scanner/scanner.page';

export const ROUTES = ([   
    {
        path: 'delivery',
        loadChildren: () => import('./modules/delivery/delivery.module').then(module => module.DeliveryModule)
    },
    {
        path: 'location',
        loadChildren: () => import('./modules/location/location.module').then(module => module.LocationModule)
    },
    {
        path: 'lot',
        loadChildren: () => import('./modules/lot/lot.module').then(module => module.LotModule)
    },
    {
        path: 'shortage',
        loadChildren: () => import('./modules/shortage/shortage.module').then(module => module.ShortageModule)
    },
    {
        path: 'store',
        loadChildren: () => import('./modules/store/store.module').then(module => module.StoreModule)
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