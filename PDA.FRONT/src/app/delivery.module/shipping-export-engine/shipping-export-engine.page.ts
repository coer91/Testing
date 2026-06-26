import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'shipping-export-engine-page',
    templateUrl: './shipping-export-engine.page.html', 
    standalone: false
})
export class ShippingExportEnginePage extends PagePDA {  
 
    constructor() { super('MM_OT0601') }  
}