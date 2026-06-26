//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 

//Pages
import { CCStockInPage         } from './cc-stock-in/cc-stock-in.page';
import { ContainerDownloadPage } from './container-download/container-download.page';
import { ContainerLoadPage     } from './container-load/container-load.page';
import { GDKStockInPage        } from './gdk-stock-in/gkd-stock-in.page';
import { ImportEnginePage      } from './import-engine/import-engine.page';
import { IngotWeightPage       } from './ingot-weight/ingot-weight.page';
import { KDStockInPage         } from './kd-stock-in/kd-stock-in.page';
import { LPStockInPage         } from './lp-stock-in/lp-stock-in.page'; 
import { ManualStockInPage     } from './manual-stock-in/manual-stock-in.page';
 
const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_IN0202', CCStockInPage        , 'MM_IN0202'),
        ROUTER_PAGE('MM_IN0601', ContainerDownloadPage, 'MM_IN0601'),
        ROUTER_PAGE('MM_IN0701', ContainerLoadPage    , 'MM_IN0701'),
        ROUTER_PAGE('MM_IN0301', GDKStockInPage       , 'MM_IN0301'),
        ROUTER_PAGE('MM_IN0401', IngotWeightPage      , 'MM_IN0401'),
        ROUTER_PAGE('MM_IN0501', ImportEnginePage     , 'MM_IN0501'),
        ROUTER_PAGE('MM_IN0201', KDStockInPage        , 'MM_IN0201'),
        ROUTER_PAGE('MM_IN0101', LPStockInPage        , 'MM_IN0101'),
        ROUTER_PAGE('MM_IN0801', ManualStockInPage    , 'MM_IN0801'),  
    ]
}];  

@NgModule({
    declarations: [   
        CCStockInPage,
        ContainerDownloadPage,
        ContainerLoadPage,
        GDKStockInPage,
        ImportEnginePage,
        IngotWeightPage,
        KDStockInPage,
        LPStockInPage,
        ManualStockInPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoreModule { }