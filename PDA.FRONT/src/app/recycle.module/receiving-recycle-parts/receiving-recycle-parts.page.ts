import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'receiving-recycle-parts-page',
    templateUrl: './receiving-recycle-parts.page.html', 
    standalone: false
})
export class ReceivingRecyclePartsPage extends PagePDA {  
 
    constructor() { super('MM_RC0101') }  
}