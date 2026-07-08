import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 
import { NgModule } from '@angular/core'; 

//Pages
import { EngineStocktakingPage      } from './engine-stocktaking/engine-stocktaking.page'; 
import { MaterialMovePage           } from './material-move/material-move.page';
import { MaterialMoveFIFOPage       } from './material-move-fifo/material-move-fifo.page';
import { TrollyConfigurationPage    } from './trolly-configuration/trolly-configuration.page'; 
import { IndicateLocationPage       } from './indicate-location/indicate-location.page';
 
const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_LM0601', EngineStocktakingPage     , 'MM_LM0601'),
        ROUTER_PAGE('MM_LM0201', IndicateLocationPage      , 'MM_LM0201'),
        ROUTER_PAGE('MM_LM0102', MaterialMovePage          , 'MM_LM0102'),
        ROUTER_PAGE('MM_LM0103', MaterialMoveFIFOPage      , 'MM_LM0103'),
        ROUTER_PAGE('MM_LM0401', TrollyConfigurationPage   , 'MM_LM0401'), 
    ]
}];  

@NgModule({
    declarations: [   
        EngineStocktakingPage,
        IndicateLocationPage, 
        MaterialMovePage,
        MaterialMoveFIFOPage,
        TrollyConfigurationPage, 
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LocationModule { }