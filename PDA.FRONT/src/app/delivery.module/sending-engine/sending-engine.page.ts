import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'sending-engine-page',
    templateUrl: './sending-engine.page.html', 
    standalone: false
})
export class SendingEnginePage extends PagePDA {  
 
    constructor() { super('MM_OT0901') }  
}