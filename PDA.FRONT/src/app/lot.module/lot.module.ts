import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 
import { NgModule } from '@angular/core'; 

//Pages
import { LotInformationPage       } from './lot-information/lot-information.page';
import { LotJoinPage              } from './lot-join/lot-join.page';
import { LotSplitPage             } from './lot-split/lot-split.page';
import { InventoryInspectionPage  } from './inventory-inspection/inventory-inspection.page';

const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_LT0601', LotInformationPage     , 'MM_LT0601'),
        ROUTER_PAGE('MM_LT0301', LotJoinPage            , 'MM_LT0301'),
        ROUTER_PAGE('MM_LT0201', LotSplitPage           , 'MM_LT0201'),
        ROUTER_PAGE('MM_LT0401', InventoryInspectionPage, 'MM_LT0401'),
    ]
}];  

@NgModule({
    declarations: [   
        LotInformationPage,          
        LotJoinPage,              
        LotSplitPage,              
        InventoryInspectionPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LotModule { }