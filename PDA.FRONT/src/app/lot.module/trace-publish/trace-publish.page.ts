import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'trace-publish-page',
    templateUrl: './trace-publish.page.html', 
    standalone: false
})
export class TracePublishPage extends PagePDA {  
 
    constructor() { super('MM_LT0501') }  
}