import { Component, inject, signal, viewChild } from '@angular/core';     
import { FormBuilder } from '@angular/forms';
import { WIARadio } from 'hwmx-angular/components';
import { IRadio } from 'hwmx-angular/interfaces';
import { Page } from 'hwmx-angular/tools';

@Component({
    selector: 'coer-radio-page',
    templateUrl: './coer-radio.page.html', 
    standalone: false
})
export class CoerRadioPage extends Page {   

    private formBuilder   = inject(FormBuilder);

    radioRef = viewChild<WIARadio<any>>('radioRef'); 


    //Form
    protected formGroup = this.formBuilder.group({ 
        Print: [{ Label: '4P' }],              
    }); 

    constructor() { 
        super('coer-radio')  


        // setTimeout(() => {
        //     this.radioRef()?.Select(x => x.label == 'Escamilla');
        // }, 3000)


        // setTimeout(() => {
        //     this.radioRef()?.Unselect();
        // }, 6000)


        // setTimeout(() => {
        //     this.value.set({ Label: 'Omar', Value: null })
        // }, 9000)


    } 
}