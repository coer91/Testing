//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { SharedModule } from '@appShared'; 
import { ROUTER_PAGE } from 'hwmx-angular/core';

//Pages
import { InventoryCheckInCellPage } from './inventory-check-in-cell/inventory-check-in-cell.page';
import { LampTurnOnListPage       } from './lamp-turn-on-list/lamp-turn-on-list.page';
import { ShortageListPage         } from './shortage-list/shortage-list.page';
import { TraceLOTLocationPage     } from './trace-lot-location/trace-lot-location.page';

const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_SM0401', InventoryCheckInCellPage, 'MM_SM0401'),
        ROUTER_PAGE('MM_SM0301', LampTurnOnListPage      , 'MM_SM0301'),
        ROUTER_PAGE('MM_SM0101', ShortageListPage        , 'MM_SM0101'),
        ROUTER_PAGE('MM_SM0201', TraceLOTLocationPage    , 'MM_SM0201'),
    ]
}];  

@NgModule({
    declarations: [   
        InventoryCheckInCellPage,
        LampTurnOnListPage,
        ShortageListPage, 
        TraceLOTLocationPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShortageModule { }