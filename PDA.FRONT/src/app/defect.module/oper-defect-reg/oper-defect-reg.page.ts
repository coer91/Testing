import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'oper-defect-reg-page',
    templateUrl: './oper-defect-reg.page.html', 
    standalone: false
})
export class OperDefectRegPage extends PagePDA {  
 
    constructor() { super('MM_DM0101') }  
}