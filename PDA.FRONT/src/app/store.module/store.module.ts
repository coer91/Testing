import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 
import { NgModule } from '@angular/core'; 

//Pages
import { CcEntryPage           } from './cc-entry/cc-entry.page';
import { ContainerDownloadPage } from './container-download/container-download.page';
import { ContainerLoadPage     } from './container-load/container-load.page';  
import { GkdEntryPage          } from './gkd-entry/gkd-entry.page';
import { LpEntryPage           } from './lp-entry/lp-entry.page'; 
import { ManualStockInPage     } from './manual-stock-in/manual-stock-in.page';
 
const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_IN0202', CcEntryPage          , 'MM_IN0202'),
        ROUTER_PAGE('MM_IN0601', ContainerDownloadPage, 'MM_IN0601'),
        ROUTER_PAGE('MM_IN0701', ContainerLoadPage    , 'MM_IN0701'), 
        ROUTER_PAGE('MM_IN0301', GkdEntryPage         , 'MM_IN0301'),
        ROUTER_PAGE('MM_IN0101', LpEntryPage          , 'MM_IN0101'),
        ROUTER_PAGE('MM_IN0801', ManualStockInPage    , 'MM_IN0801'),  
    ]
}];  

@NgModule({
    declarations: [   
        CcEntryPage,
        ContainerDownloadPage,
        ContainerLoadPage, 
        GkdEntryPage,
        LpEntryPage,
        ManualStockInPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoreModule { }