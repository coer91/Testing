import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'trace-lot-location-page',
    templateUrl: './trace-lot-location.page.html', 
    standalone: false
})
export class TraceLOTLocationPage extends PagePDA {  
 
    constructor() { super('MM_SM0201') }  
}