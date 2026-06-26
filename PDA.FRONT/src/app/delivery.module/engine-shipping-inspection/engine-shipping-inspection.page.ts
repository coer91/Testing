import { Component } from '@angular/core';    
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'engine-shipping-inspection-page',
    templateUrl: './engine-shipping-inspection.page.html', 
    standalone: false
})
export class EngineShippingInspectionPage extends PagePDA {  
 
    constructor() { super('MM_OT0401') }  
}