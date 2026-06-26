import { Component } from '@angular/core';    
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'palletizing-page',
    templateUrl: './palletizing.page.html', 
    standalone: false
})
export class PalletizingPage extends PagePDA {  
 
    constructor() { super('MM_OT0302') }  
}