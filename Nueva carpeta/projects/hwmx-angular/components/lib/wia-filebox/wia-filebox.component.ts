import { Component, inject, input, output, signal } from '@angular/core';
import { IFileboxPanelType, IFileboxPhotoType } from 'hwmx-angular/interfaces';
import { CoerAlert, CONTROL_VALUE, ControlValue, Tools } from 'hwmx-angular/tools'; 

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

    //Variables
    protected override readonly _value = signal<File | File[] | string | null>(null);

    //Input  
    public readonly type = input<'photo' | 'panel'>('photo'); 
    public readonly photoType = input<IFileboxPhotoType | null>(null);
    public readonly panelType = input<IFileboxPanelType | null>(null); 

    //Outputs
    protected readonly onLoadPhoto   = output<File>();
    protected readonly onDeletePhoto = output<void>();
    protected readonly onAddFiles    = output<File[]>();
    protected readonly onDeleteFiles = output<File[]>();
    protected readonly onLoadFiles   = output<File[]>(); 
    protected readonly onSaveFiles   = output<File[]>();


    /** */
    protected _LoadPhoto(file: File) { 
        if(Tools.IsNotNull(file)) {
            super._SetValue(file);
            this.onLoadPhoto.emit(file); 
        }
    }


    /** */
    protected _DeletePhoto() {
        super._SetValue(null);
        this.onDeletePhoto.emit();
    }


    /** */
    protected _LoadFiles(fileArray: File[]) {
        if(Tools.IsArray(fileArray)) {
            super._SetValue(fileArray);
            this.onLoadFiles.emit(fileArray);
        }
    }
}