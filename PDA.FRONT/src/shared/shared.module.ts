import { NgModule } from '@angular/core';  
import { HWMXModule } from 'hwmx-angular';  

//Components
import { LotJoin            } from './components/lot-join/lot-join.component';
import { PartNumberLocation } from './components/partnumber-location/partnumber-location.component';
import { LotSplit           } from './components/lot-split/lot-split.component';
 
@NgModule({
    declarations: [
        PartNumberLocation,
        LotJoin,
        LotSplit
    ],
    imports: [HWMXModule], 
    exports: [
        HWMXModule, 
        PartNumberLocation,
        LotJoin,
        LotSplit
    ]
})
export class SharedModule { }