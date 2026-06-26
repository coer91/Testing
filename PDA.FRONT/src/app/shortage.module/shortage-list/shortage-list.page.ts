import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'shortage-list-page',
    templateUrl: './shortage-list.page.html', 
    standalone: false
})
export class ShortageListPage extends PagePDA {  
 
    constructor() { super('MM_SM0101') }  
}