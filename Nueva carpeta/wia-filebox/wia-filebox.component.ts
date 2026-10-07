import { Component, inject, input, output } from '@angular/core';
import { IFileImage } from 'hwmx-angular/interfaces';
import { CoerAlert, CONTROL_VALUE, ControlValue } from 'hwmx-angular/tools'; 

@Component({
    selector: 'wia-filebox',
    templateUrl: './wia-filebox.component.html', 
    styleUrl: './wia-filebox.component.scss',
    providers: [CONTROL_VALUE(WIAFileBox)],
    standalone: false
})
export class WIAFileBox extends ControlValue { 

    //Services
    protected readonly alert = inject(CoerAlert);


    //Input  
    public readonly type = input<'photo'>('photo'); 
    public readonly photoType = input<IFileImage | null>(null); 

    //Outputs
    protected readonly onLoadPhoto = output<File>();
    protected readonly onDeletePhoto = output<void>();
}