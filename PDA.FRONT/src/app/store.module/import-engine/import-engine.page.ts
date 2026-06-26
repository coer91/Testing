import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'import-engine-page',
    templateUrl: './import-engine.page.html', 
    standalone: false
})
export class ImportEnginePage extends PagePDA {  
 
    constructor() { super('MM_IN0501') }  
}