import { Component } from '@angular/core';    
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'sending-dc-pallet-page',
    templateUrl: './sending-dc-pallet.page.html', 
    standalone: false
})
export class SendingDCPalletPage extends PagePDA {  
 
    constructor() { super('MM_OT1002') }  
}