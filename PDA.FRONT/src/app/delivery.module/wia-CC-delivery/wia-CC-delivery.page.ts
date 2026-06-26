import { Component } from '@angular/core';    
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'wia-CC-delivery-page',
    templateUrl: './wia-CC-delivery.page.html', 
    standalone: false
})
export class WiaCCDeliveryPage extends PagePDA {  
 
    constructor() { super('MM_OT0001') }  
}