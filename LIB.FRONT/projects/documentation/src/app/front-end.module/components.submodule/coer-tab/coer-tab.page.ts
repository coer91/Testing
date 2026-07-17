import { Component, signal } from '@angular/core';    
import { Page } from 'hwmx-angular/tools';

@Component({
    selector: 'coer-tab-page',
    templateUrl: './coer-tab.page.html', 
    standalone: false
})
export class CoerTabPage extends Page {  
    
     

    constructor() { super('coer-tab') } 
}