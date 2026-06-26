import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'irregular-remark-page',
    templateUrl: './irregular-remark.page.html', 
    standalone: false
})
export class IrregularRemarkPage extends PagePDA {  
 
    constructor() { super('MM_PM0203') }  
}