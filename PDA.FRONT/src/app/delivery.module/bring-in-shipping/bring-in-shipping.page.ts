import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'bring-in-shipping-page',
    templateUrl: './bring-in-shipping.page.html', 
    standalone: false
})
export class BringInShippingPage extends PagePDA {  
 
    constructor() { super('MM_OT0201') }  
}