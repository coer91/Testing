import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools';
import { Page } from 'hwmx-angular/tools';

@Component({
    selector: 'ingot-location-page',
    templateUrl: './ingot-location.page.html', 
    standalone: false
})
export class IngotLocationPage extends PagePDA {  
 
    constructor() { super('MM_LM0203') }  
}