import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'engine-return-page',
    templateUrl: './engine-return.page.html', 
    standalone: false
})
export class EngineReturnPage extends PagePDA {  
 
    constructor() { super('MM_RC0301') }  
}