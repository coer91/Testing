import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'stocktaking-lineside-page',
    templateUrl: './stocktaking-lineside.page.html', 
    standalone: false
})
export class StocktakingLinesidePage extends PagePDA {  
 
    constructor() { super('MM_LM0801') }  
}