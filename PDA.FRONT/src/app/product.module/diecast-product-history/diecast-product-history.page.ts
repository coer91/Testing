import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'diecast-product-history-page',
    templateUrl: './diecast-product-history.page.html', 
    standalone: false
})
export class DiecastProductHistoryPage extends PagePDA {  
 
    constructor() { super('MM_PM0204') }  
}