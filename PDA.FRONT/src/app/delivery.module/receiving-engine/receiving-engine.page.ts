import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'receiving-engine-page',
    templateUrl: './receiving-engine.page.html', 
    standalone: false
})
export class ReceivingEnginePage extends PagePDA {  
 
    constructor() { super('MM_OT0801') }  
}