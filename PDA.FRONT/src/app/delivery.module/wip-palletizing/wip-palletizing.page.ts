import { Component } from '@angular/core';    
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'wip-palletizing-page',
    templateUrl: './wip-palletizing.page.html', 
    standalone: false
})
export class WIPPalletizingPage extends PagePDA {  
 
    constructor() { super('MM_OT0303') }  
}