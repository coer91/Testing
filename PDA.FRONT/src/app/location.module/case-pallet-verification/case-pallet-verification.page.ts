import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'case-pallet-verification-page',
    templateUrl: './case-pallet-verification.page.html', 
    standalone: false
})
export class CasePalletVerificationPage extends PagePDA {  
 
    constructor() { super('MM_LM1011') }  
}