import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'receiving-cvj-pallet-page',
    templateUrl: './receiving-cvj-pallet.page.html', 
    standalone: false
})
export class ReceivingCVJPalletPage extends PagePDA {  
 
    constructor() { super('MM_OT0802') }  
}