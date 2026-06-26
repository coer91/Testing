import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'inspection-return-page',
    templateUrl: './inspection-return.page.html', 
    standalone: false
})
export class InspectionReturnPage extends PagePDA {  
 
    constructor() { super('MM_RT0201') }  
}