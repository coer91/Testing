import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'merge-label-page',
    templateUrl: './merge-label.page.html', 
    standalone: false
})
export class MergeLabelPage extends PagePDA {  
 
    constructor() { super('MM_LT0701') }  
}