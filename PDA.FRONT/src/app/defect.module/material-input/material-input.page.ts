import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'material-input-page',
    templateUrl: './material-input.page.html', 
    standalone: false
})
export class MaterialInputPage extends PagePDA {  
 
    constructor() { super('MM_DM0401') }  
}