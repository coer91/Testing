import { Component, inject, signal, viewChild } from '@angular/core';    
import { FormBuilder, Validators } from '@angular/forms';
import { WIAForm } from 'hwmx-angular/components';
import { IOption } from 'hwmx-angular/interfaces';
import { Page, Tools } from 'hwmx-angular/tools';
 
@Component({
    selector: 'coer-form-page',
    templateUrl: './coer-form.page.html', 
    standalone: false
})
export class CoerFormPage extends Page {  

    constructor() { super('Form') }
     
    //Injects
    private readonly formBuilder = inject(FormBuilder);

    //Elements
    protected form = viewChild.required<WIAForm>('form');

    //Variables
    protected readonly projectList  = signal<IOption[]>([]); 
    protected readonly menuTypeList = signal<IOption[]>([]); 
 
    //Form
    protected group = this.formBuilder.group({
        module:   ['',   [Validators.required, Validators.minLength(2)]],
        project:  [null, [Validators.required]], 
        menuType: [null, [Validators.required]], 
        icon:     [null, []], 
    }); 


    /** MAIN method */
    protected override async StartPage() { 

        this.isLoading.set(false);  
    }  
}