//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { SharedModule } from '@appShared'; 
import { ROUTER_PAGE } from 'hwmx-angular/core';

//Pages
import { InformationPage          } from './information/information.page';
import { MergeLabelPage           } from './merge-label/merge-label.page';
import { MergePage                } from './merge/merge.page';
import { RepublishPage            } from './republish/republish.page';
import { StocktakingWarehousePage } from './stocktaking-warehouse/stocktaking-warehouse.page';
import { SplitPage                } from './split/split.page';
import { TracePublishPage         } from './trace-publish/trace-publish.page';

const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_LT0601', InformationPage         , 'MM_LT0601'),
        ROUTER_PAGE('MM_LT0701', MergeLabelPage          , 'MM_LT0701'), 
        ROUTER_PAGE('MM_LT0301', MergePage               , 'MM_LT0301'),
        ROUTER_PAGE('MM_LT0101', RepublishPage           , 'MM_LT0101'),
        ROUTER_PAGE('MM_LT0201', SplitPage               , 'MM_LT0201'),
        ROUTER_PAGE('MM_LT0401', StocktakingWarehousePage, 'MM_LT0401'),
        ROUTER_PAGE('MM_LT0501', TracePublishPage        , 'MM_LT0501'), 
    ]
}];  

@NgModule({
    declarations: [   
        InformationPage,      
        MergeLabelPage,          
        MergePage,            
        RepublishPage,        
        StocktakingWarehousePage,
        SplitPage,            
        TracePublishPage,     
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LotModule { }