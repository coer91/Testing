import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'scrap-permit-page',
    templateUrl: './scrap-permit.page.html', 
    standalone: false
})
export class ScrapPermitPage extends PagePDA {  
 
    constructor() { super('MM_OT0702') }  
}