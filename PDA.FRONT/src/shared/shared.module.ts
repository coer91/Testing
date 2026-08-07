import { NgModule } from '@angular/core';  
import { HWMXModule } from 'hwmx-angular';  

//Components
import { JoinLot            } from './components/join-lot/join-lot.component';
import { PartNumberLocation } from './components/partnumber-location/partnumber-location.component';
import { SplitLot           } from './components/split-lot/split-lot.component';
 
@NgModule({
    declarations: [
        PartNumberLocation,
        JoinLot,
        SplitLot
    ],
    imports: [HWMXModule], 
    exports: [
        HWMXModule, 
        PartNumberLocation,
        JoinLot,
        SplitLot
    ]
})
export class SharedModule { }