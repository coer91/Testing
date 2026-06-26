import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'threec-buffer-history-page',
    templateUrl: './threec-buffer-history.page.html',  
    standalone: false
})
export class ThreeCBufferHistoryPage extends PagePDA {  
 
    constructor() { super('MM_PM0101') }  
}