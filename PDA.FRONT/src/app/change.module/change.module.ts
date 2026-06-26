//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared';  

//Pages
import { InspectionReturnPage } from './inspection-return/inspection-return.page';
import { VendorReturnPage     } from './vendor-return/vendor-return.page';
 
const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_RT0201', InspectionReturnPage, 'MM_RT0201'),
        ROUTER_PAGE('MM_RT0101', VendorReturnPage    , 'MM_RT0101'),
    ]
}];  

@NgModule({
    declarations: [   
        InspectionReturnPage,
        VendorReturnPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChangeModule { }