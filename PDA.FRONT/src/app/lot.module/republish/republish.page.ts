import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'republish-page',
    templateUrl: './republish.page.html', 
    standalone: false
})
export class RepublishPage extends PagePDA {  
 
    constructor() { super('MM_LT0101') }  
}