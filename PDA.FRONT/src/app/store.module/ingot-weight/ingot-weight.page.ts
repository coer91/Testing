import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'ingot-weight-page',
    templateUrl: './ingot-weight.page.html', 
    standalone: false
})
export class IngotWeightPage extends PagePDA {  
 
    constructor() { super('MM_IN0401') }  
}