import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'reimpregnation-page',
    templateUrl: './reimpregnation.page.html', 
    standalone: false
})
export class ReimpregnationPage extends PagePDA {  
 
    constructor() { super('MM_DM0601') }  
}