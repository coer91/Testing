import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'lamp-turn-on-list-page',
    templateUrl: './lamp-turn-on-list.page.html', 
    standalone: false
})
export class LampTurnOnListPage extends PagePDA {  
 
    constructor() { super('MM_SM0301') }  
}