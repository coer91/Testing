import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'in-casting-remark-page',
    templateUrl: './in-casting-remark.page.html', 
    standalone: false
})
export class InCastingRemarkPage extends PagePDA {  
 
    constructor() { super('MM_PM0201') }  
}