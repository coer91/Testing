import { NgModule } from '@angular/core';  
import { HWMXModule } from 'hwmx-angular';
 
@NgModule({
    imports: [HWMXModule], 
    exports: [HWMXModule]
})
export class SharedModule { }