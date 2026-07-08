import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 
import { NgModule } from '@angular/core'; 

//Pages
import { CCDeliveryPage } from './cc-delivery/cc-delivery.page';
 
const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_OT0001', CCDeliveryPage, 'MM_OT0001'),
    ]
}];  

@NgModule({
    declarations: [   
       CCDeliveryPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliveryModule { }