import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'engine-wip-stocktaking-page',
    templateUrl: './engine-wip-stocktaking.page.html', 
    standalone: false
})
export class EngineWipStocktakingPage extends PagePDA {  
 
    constructor() { super('MM_LM1101') }  
}