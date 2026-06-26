import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'make-up-trolly-page',
    templateUrl: './make-up-trolly.page.html', 
    standalone: false
})
export class MakeUpTrollyPage extends PagePDA {  
 
    constructor() { super('MM_LM0401') }  
}