import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'to-holding-page',
    templateUrl: './to-holding.page.html', 
    standalone: false
})
export class ToHoldingPage extends PagePDA {  
 
    constructor() { super('MM_OT0304') }  
}