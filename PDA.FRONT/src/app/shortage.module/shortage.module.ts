import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 
import { NgModule } from '@angular/core'; 

//Pages
import { InventoryCheckInCellPage } from './inventory-check-in-cell/inventory-check-in-cell.page';

const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_SM0401', InventoryCheckInCellPage, 'MM_SM0401'),
    ]
}];  

@NgModule({
    declarations: [   
        InventoryCheckInCellPage
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShortageModule { }