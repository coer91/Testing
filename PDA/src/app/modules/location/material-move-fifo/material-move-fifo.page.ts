import { PagePDA } from '@appShared/tools';   
import { Component } from '@angular/core';    

@Component({
    selector: 'material-move-fifo-page',
    template: '<material-move-page [useFIFO]="true"></material-move-page>', 
    standalone: false
})
export class MaterialMoveFIFOPage extends PagePDA {  
 
    constructor() { super('MM_LM0103') }        
}