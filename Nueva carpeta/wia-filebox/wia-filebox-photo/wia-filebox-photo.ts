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
    protected readonly _contentType = `${Array.from(Files.IMAGE_EXTENSIONS.values())}`; 
    protected readonly _isHoverElement = signal<boolean>(false);
    protected readonly _isDragging = signal<boolean>(false);
    protected _htmlElement: HTMLElement | null = null;
    protected isOnlyWhiteSpace = Tools.IsOnlyWhiteSpace;
    protected isNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    protected isBooleanFalse = Tools.IsBooleanFalse;

    //Input  
    public readonly id          = input.required<string>(); 
    public readonly alert       = input.required<CoerAlert>();  
    public readonly photoType   = input.required<IFileImage | null>();
    public readonly isLoading   = input.required<boolean>();
    public readonly isReadonly  = input.required<boolean>();
    public readonly isInvisible = input.required<boolean>(); 
    
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
        if(this.isLoading()) 
            return `/hwmx-angular/images/loading.gif`;

        if(this._isDragging() && Tools.IsOnlyWhiteSpace(this.photoType()?.value))
            return `/hwmx-angular/images/drop-files.png`;

        return Tools.IsOnlyWhiteSpace(this.photoType()?.value) 
            ? `/hwmx-angular/images/${this._photoType()}.png`
            : this.photoType()!.value!
    });


    //computed
    protected _hasPhoto = computed<boolean>(() => {
        return Tools.IsNotOnlyWhiteSpace(this.photoType()?.value);  
    });


    //computed
    protected _showDelteButton = computed<boolean>(() => {
        return  !this.isBooleanFalse(this.photoType()?.showDelete);  
    });


    //computed
    protected _showButtonContainer = computed<boolean>(() => {
        return this._isHoverElement() 
            && this._hasPhoto() 
            && !this.isLoading() 
            && !this.isReadonly() 
            && !this.isInvisible()
            && (
                this._showDelteButton()
            );  
    });


    //computed
    protected _width = computed<string>(() => {
        return Tools.IsNotOnlyWhiteSpace(this.photoType()?.size) 
            ? this.photoType()!.size! 
            : '100px'
    });  


    /** */
    protected _DragOver(event: DragEvent) {
        event.preventDefault();
        this._isDragging.set(true);
    }


    /** */
    protected _DragLeave(event: DragEvent) {
        event.preventDefault();
        this._isDragging.set(false);
    }


    /** */
    protected _Drop(event: DragEvent) {
        event.preventDefault();
        this._isDragging.set(false);
        const [file] = event.dataTransfer?.files || [];  
        this.LoadPhoto(file);
    }


    /** */
    protected async SelectedFile(inputFile: any) { 
        const [file] = inputFile.files;  
        await this.LoadPhoto(file);
        inputFile.value = null;
        inputFile.files = null; 
    }


    /** */
    private async LoadPhoto(file: File | null = null) {
        if(file && !this.isLoading() && !this.isReadonly() && !this.isInvisible()) {
            if(!this._contentType.includes(file.type)) {
                this.alert().Warning("This file isn't a image");
                console.warn(`File type: ${file.type}`)
                return;
            }
             
            const base64 = await Files.ToBase64(file);             
            
            if(Tools.IsNotOnlyWhiteSpace(base64)) {               
                this.onLoadPhoto.emit(file); 
            }

            else {
                this.alert().Warning('Error loading Photo');
                console.warn('Error loading base64');
            }
        } 
    } 


    /** */
    protected async DeletePhoto(event: Event) {
        event.stopPropagation();  

        if(!Tools.IsBooleanFalse(this.photoType()?.alertOnDelete) && this._hasPhoto()) {
            const answer = await this.alert().WarningConfirm('Remove image ?');    
            if(!answer) return;            
        } 

        this.onDeletePhoto.emit();
    }
}