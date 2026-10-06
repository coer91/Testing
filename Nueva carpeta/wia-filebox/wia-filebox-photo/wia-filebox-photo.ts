import { Component, input, computed, signal, output, AfterViewInit, OnDestroy } from '@angular/core';
import { CoerAlert, Files, HTMLElements, Tools } from 'hwmx-angular/tools';
import { IFileImage } from 'hwmx-angular/interfaces';

@Component({
    selector: 'wia-filebox-photo',
    templateUrl: './wia-filebox-photo.html', 
    styleUrl: './wia-filebox-photo.scss', 
    standalone: false
})
export class WIAFileBoxPhoto implements AfterViewInit, OnDestroy { 

    //Variables
    protected readonly _base64 = signal<string>(''); 
    protected readonly _extensions = `${Array.from(Files.IMAGE_EXTENSIONS.values())}`; 
    protected readonly _isHoverElement = signal<boolean>(false);
    protected _htmlElement: HTMLElement | null = null;
    protected isOnlyWhiteSpace = Tools.IsOnlyWhiteSpace;
    protected isNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected isBooleanFalse = Tools.IsBooleanFalse;

    //Input  
    public readonly id = input.required<string>(); 
    public readonly alert = input.required<CoerAlert>();  
    public readonly photoType = input<IFileImage | null>(null);
    
    //Outputs
    protected readonly onLoadPhoto = output<File>();
    protected readonly onDeletePhoto = output<void>();


    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep();  
        this._htmlElement = HTMLElements.SelectElementById(this.id() + 'figure-image') as HTMLElement;
        this._htmlElement?.addEventListener('mouseenter', this._onMouseEnter);    
        this._htmlElement?.addEventListener('mouseleave', this._onMouseLeave);  
    }


    //OnDestroy
    ngOnDestroy() {  
        this._htmlElement?.removeEventListener('mouseenter', this._onMouseEnter);    
        this._htmlElement?.removeEventListener('mouseleave', this._onMouseLeave); 
    } 


    //Function
    protected _onMouseEnter = () => this._isHoverElement.set(true);  

    //Function
    protected _onMouseLeave = () => this._isHoverElement.set(false);


    //computed
    protected _photoType = computed<'no-user' | 'no-image'>(() => {
        return Tools.IsNotOnlyWhiteSpace(this.photoType()?.type) 
            ? this.photoType()!.type! 
            : 'no-image'
    });


    //computed
    protected _photoBase64 = computed<string>(() => {
        return Tools.IsOnlyWhiteSpace(this._base64()) 
            ? `/hwmx-angular/images/${this._photoType()}.png`
            : this._base64()
    });


    //computed
    protected _width = computed<string>(() => {
        return Tools.IsNotOnlyWhiteSpace(this.photoType()?.size) 
            ? this.photoType()!.size! 
            : '100px'
    }); 


    /** */
    protected async SelectedFile(inputFile: any) { 
        const [file] = inputFile.files;  
        
        if(file) {
            const base64 = await Files.ToBase64(file);             
            
            if(Tools.IsNotOnlyWhiteSpace(base64)) {
                this._base64.set(base64);
                this.onLoadPhoto.emit(file); 
            }

            else {
                this.alert().Warning('Error loading Photo');
                console.warn('Error loading base64');
            }
        } 

        inputFile.value = null;
        inputFile.files = null; 
    }


    /** */
    protected async DeletePhoto(event: Event) {
        event.stopPropagation();  

        if(!Tools.IsBooleanFalse(this.photoType()?.alertOnDelete)) {
            const answer = await this.alert().WarningConfirm('Remove image ?');    
            if(!answer) return;            
        }
        
        this._base64.set('');
        this.onDeletePhoto.emit();
    }
}