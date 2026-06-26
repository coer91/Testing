import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'etc-out-list-page',
    templateUrl: './etc-out-list.page.html', 
    standalone: false
})
export class ETCOutListPage extends PagePDA {  
 
    constructor() { super('MM_OT0101') } 
}