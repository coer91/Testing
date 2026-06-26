import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'material-output-page',
    templateUrl: './material-output.page.html', 
    standalone: false
})
export class MaterialOutputPage extends PagePDA {  
 
    constructor() { super('MM_DM0402') }  
}