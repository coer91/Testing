import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'out-casting-remark-page',
    templateUrl: './out-casting-remark.page.html', 
    standalone: false
})
export class OutCastingRemarkPage extends PagePDA {  
 
    constructor() { super('MM_PM0202') }  
}