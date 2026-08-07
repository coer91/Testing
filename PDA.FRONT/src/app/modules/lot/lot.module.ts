import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 
import { NgModule } from '@angular/core'; 

//Pages
import { LotInformationPage       } from './lot-information/lot-information.page';
import { JoinLotPage              } from './join-lot/join-lot.page';
import { SplitLotPage             } from './split-lot/split-lot.page';
import { InventoryInspectionPage  } from './inventory-inspection/inventory-inspection.page';

const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_LT0601', LotInformationPage     , 'MM_LT0601'),
        ROUTER_PAGE('MM_LT0301', JoinLotPage            , 'MM_LT0301'),
        ROUTER_PAGE('MM_LT0201', SplitLotPage           , 'MM_LT0201'),
        ROUTER_PAGE('MM_LT0401', InventoryInspectionPage, 'MM_LT0401'),
    ]
}];  

@NgModule({
    declarations: [   
        LotInformationPage,          
        JoinLotPage,              
        SplitLotPage,              
        InventoryInspectionPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LotModule { }