import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'movement-engine-cons-page',
    templateUrl: './movement-engine-cons.page.html', 
    standalone: false
})
export class MovementEngineConsPage extends PagePDA {  
 
    constructor() { super('MM_RC0201') }  
}