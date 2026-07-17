import { Component } from '@angular/core';     
import { Page, Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'coer-datebox-page',
    templateUrl: './coer-datebox.page.html', 
    standalone: false
})
export class CoerDateBoxPage extends Page {   

    constructor() { 
        super('coer-datebox')   
    } 
}