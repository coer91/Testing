//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 

//Pages
import { EngineReturnPage          } from './engine-return/engine-return.page';
import { MovementEngineConsPage    } from './movement-engine-cons/movement-engine-cons.page';
import { ReceivingRecyclePartsPage } from './receiving-recycle-parts/receiving-recycle-parts.page';
 
const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_RC0301', EngineReturnPage         , 'MM_RC0301'),
        ROUTER_PAGE('MM_RC0201', MovementEngineConsPage   , 'MM_RC0201'),
        ROUTER_PAGE('MM_RC0101', ReceivingRecyclePartsPage, 'MM_RC0101'),
    ]
}];  

@NgModule({
    declarations: [   
        EngineReturnPage,
        MovementEngineConsPage,
        ReceivingRecyclePartsPage
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecycleModule { }