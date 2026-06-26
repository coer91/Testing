import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'permit-of-gate-page',
    templateUrl: './permit-of-gate.page.html', 
    standalone: false
})
export class PermitOfGatePage extends PagePDA {  
 
    constructor() { super('MM_OT0701') }  
}