import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'threec-stocktaking-page',
    templateUrl: './threec-stocktaking.page.html', 
    standalone: false
})
export class ThreeCStocktakingPage extends PagePDA {  
 
    constructor() { super('MM_LM0701') }  
}