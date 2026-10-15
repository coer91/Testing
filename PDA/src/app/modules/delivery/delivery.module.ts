import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 
import { NgModule } from '@angular/core'; 

//Pages
import { GlobisDeliveryPage } from './glovis-delivery/glovis-delivery.page';
import { PermitGatePage     } from './permit-gate/permit-gate.page';
import { SendingEnginePage  } from './sending-engine/sending-engine.page';
 
const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_OT0001', GlobisDeliveryPage, 'MM_OT0001'),
        ROUTER_PAGE('MM_OT0701', PermitGatePage    , 'MM_OT0701'),
        ROUTER_PAGE('MM_OT0901', SendingEnginePage , 'MM_OT0901'),
    ]
}];  

@NgModule({
    declarations: [   
       GlobisDeliveryPage,
       PermitGatePage,
       SendingEnginePage
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliveryModule { }  