import { NgModule } from '@angular/core';   
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import './extensions/index';  

//Modules    
import * as components from 'hwmx-angular/components';
import * as core       from 'hwmx-angular/core'; 
import * as directives from 'hwmx-angular/directives'; 
import * as pipes      from 'hwmx-angular/pipes'; 
 import * as tools      from 'hwmx-angular/tools';

@NgModule({    
    imports: [  
        CommonModule,
        RouterModule, 
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule, 
        components.ComponentsModule,
        core.CoreModule, 
        directives.DirectivesModule,
        pipes.PipesModule,
        tools.CoerAlert, 
    ], 
    providers: [
        tools.CoerAlert
    ],
    exports: [ 
        CommonModule, 
        RouterModule, 
        RouterOutlet,
        FormsModule,
        ReactiveFormsModule,  
        components.WIAButton,
        components.WIADateBox,
        components.WIAForm, 
        components.WIAGrid,
        components.WIAModal, 
        components.WIANumberBox, 
        components.WIAPageTitle, 
        components.WIASecretBox,
        components.WIASelectBox,
        components.WIASwitch,
        components.WIATab,
        components.WIATextBox,
        core.WiaRoot,
        directives.TemplateRefDirective,  
        pipes.DatePipe,
        pipes.DateTimePipe,
        pipes.CurrencyPipe,
        pipes.HtmlPipe,
        pipes.IndexCollectionPipe,
        pipes.NoImagePipe,
        pipes.NumericFormatPipe,
        pipes.TimePipe, 
        tools.CoerAlert,
    ]
})
export class HWMXModule { }   