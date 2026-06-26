import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'sending-cvj-pallet-page',
    templateUrl: './sending-cvj-pallet.page.html', 
    standalone: false
})
export class SendingCVJPalletPage extends PagePDA {  
 
    constructor() { super('MM_OT0902') }  
}