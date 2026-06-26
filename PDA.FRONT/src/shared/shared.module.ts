import { NgModule } from '@angular/core';  
import { HWMXModule } from 'hwmx-angular';  

//Components
import { PartNumberLocation } from './components/partnumber-location/partnumber-location.component';
 
@NgModule({
    declarations: [
        PartNumberLocation
    ],
    imports: [HWMXModule], 
    exports: [
        HWMXModule, 
        PartNumberLocation
    ]
})
export class SharedModule { }