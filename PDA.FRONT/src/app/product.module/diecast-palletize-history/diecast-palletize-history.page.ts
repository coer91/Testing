import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'diecast-palletize-history-page',
    templateUrl: './diecast-palletize-history.page.html', 
    standalone: false
})
export class DiecastPalletizeHistoryPage extends PagePDA {  
 
    constructor() { super('MM_PM0205') }  
}