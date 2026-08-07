import { RouterModule, Routes } from '@angular/router';   
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 
import { NgModule } from '@angular/core'; 

//Pages
import { TrollyConfigurationPage } from './trolly-configuration/trolly-configuration.page'; 
import { IndicateLocationPage    } from './indicate-location/indicate-location.page';
 
const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_LM0201', IndicateLocationPage   , 'MM_LM0201'),
        ROUTER_PAGE('MM_LM0401', TrollyConfigurationPage, 'MM_LM0401'), 
    ]
}];  

@NgModule({
    declarations: [   
        IndicateLocationPage, 
        TrollyConfigurationPage, 
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LocationModule { }