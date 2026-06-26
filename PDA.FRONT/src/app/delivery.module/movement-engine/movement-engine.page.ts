import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'movement-engine-page',
    templateUrl: './movement-engine.page.html', 
    standalone: false
})
export class MovementEnginePage extends PagePDA {  
 
    constructor() { super('MM_OT0501') }  
}