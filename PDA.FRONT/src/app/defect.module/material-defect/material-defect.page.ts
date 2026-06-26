import { Component } from '@angular/core';    
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'material-defect-page',
    templateUrl: './material-defect.page.html', 
    standalone: false
})
export class MaterialDefectPage extends PagePDA {  
 
    constructor() { super('MM_DM0201') }  
}