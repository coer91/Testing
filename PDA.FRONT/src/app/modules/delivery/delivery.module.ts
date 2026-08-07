import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 
import { NgModule } from '@angular/core'; 

//Pages
import { CCDeliveryPage } from './cc-delivery/cc-delivery.page';
import { PermitGatePage } from './permit-gate/permit-gate.page';
 
const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_OT0001', CCDeliveryPage, 'MM_OT0001'),
        ROUTER_PAGE('MM_OT0701', PermitGatePage, 'MM_OT0701'),
    ]
}];  

@NgModule({
    declarations: [   
       CCDeliveryPage,
       PermitGatePage
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliveryModule { }