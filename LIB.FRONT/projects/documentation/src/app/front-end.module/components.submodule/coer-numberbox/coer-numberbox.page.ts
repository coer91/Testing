import { Component, inject, signal } from '@angular/core';     
import { FormBuilder, Validators } from '@angular/forms';
import { Page } from 'hwmx-angular/tools';

@Component({
    selector: 'coer-numberbox-page',
    templateUrl: './coer-numberbox.page.html', 
    standalone: false
})
export class CoerNumberBoxPage extends Page {   

    //private formBuilder = inject(FormBuilder);

    protected numval = signal<number>(0);

      //Form
    // protected formGroup = this.formBuilder.group({ 
    //     Divisions:      [0   , [Validators.min(1)]]                
    // }); 

    constructor() { 
        super('coer-numberbox')  
    } 
}