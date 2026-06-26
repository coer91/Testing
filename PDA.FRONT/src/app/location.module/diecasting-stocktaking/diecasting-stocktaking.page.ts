import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'diecasting-stocktaking-page',
    templateUrl: './diecasting-stocktaking.page.html', 
    standalone: false
})
export class DiecastingStocktakingPage extends PagePDA {  
 
    constructor() { super('MM_LM1001') }  
}