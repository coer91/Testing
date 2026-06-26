import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'pallet-location-page',
    templateUrl: './pallet-location.page.html', 
    standalone: false
})
export class PalletLocationPage extends PagePDA {  
 
    constructor() { super('MM_LM0901') }  
}