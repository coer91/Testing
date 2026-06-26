import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'receiving-dc-pallet-page',
    templateUrl: './receiving-dc-pallet.page.html', 
    standalone: false
})
export class ReceivingDCPalletPage extends PagePDA {  
 
    constructor() { super('MM_OT1001') }  
}