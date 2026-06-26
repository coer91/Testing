import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'pallet-move-page',
    templateUrl: './pallet-move.page.html', 
    standalone: false
})
export class PalletMovePage extends PagePDA {  
 
    constructor() { super('MM_LM0501') }  
}