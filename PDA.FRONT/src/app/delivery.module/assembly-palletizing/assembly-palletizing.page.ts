import { Component } from '@angular/core';    
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'assembly-palletizing-page',
    templateUrl: './assembly-palletizing.page.html', 
    standalone: false
})
export class AssemblyPalletizingPage extends PagePDA {  
 
    constructor() { super('MM_OT0301') }  
}