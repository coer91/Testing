import { Component, input, computed, signal, output, EffectRef, effect, OnDestroy } from '@angular/core';
import { IFileboxPanelType } from 'hwmx-angular/interfaces';
import { CoerAlert, Converter, Files, Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'wia-filebox-panel',
    templateUrl: './wia-filebox-panel.html', 
    styleUrl: './wia-filebox-panel.scss', 
    standalone: false
})
export class WIAFileBoxPanel implements OnDestroy { 

    //Variables   
    private effectRef$!: EffectRef;
    protected readonly fileArray = signal<File[]>([]); 
    protected readonly _isDragging = signal<boolean>(false);
    protected readonly _isLoading = signal<boolean>(false);
    protected _htmlElement: HTMLElement | null = null;
    protected isBooleanFalse = Tools.IsBooleanFalse;  

    //Input  
    public readonly id          = input.required<string>(); 
    public readonly alert       = input.required<CoerAlert>();  
    public readonly value       = input.required<File | File[] | string | null>();
    public readonly panelType   = input.required<IFileboxPanelType | null>();
    public readonly isLoading   = input.required<boolean>();
    public readonly isReadonly  = input.required<boolean>();
    public readonly isInvisible = input.required<boolean>();

    //Outputs 
    protected readonly onAddFiles    = output<File[]>();
    protected readonly onDeleteFiles = output<File[]>();
    protected readonly onLoadFiles   = output<File[]>();
    protected readonly onSaveFiles   = output<File[]>();


    constructor() {
        this.effectRef$ = effect(() => this.ToFileArray(this.value()));
    }


    //OnDestroy
    ngOnDestroy() {  
        this.effectRef$?.destroy(); 
    } 


    //computed
    protected _contentType = computed<string[]>(() => {
        const contentType: string[] = [];

        //Use images
        if(this.panelType()?.acceptsImages) {
            for(const item of Files.IMAGE_EXTENSIONS.values()) {
                contentType.push(item);
            } 
        }

        //Use excel
        if(this.panelType()?.acceptsExcel) {
            for(const item of Files.EXCEL_EXTENSIONS.values()) {
                contentType.push(item);
            } 
        }

        //Use word
        if(this.panelType()?.acceptsWord) {
            for(const item of Files.WORD_EXTENSIONS.values()) {
                contentType.push(item);
            } 
        }

        //Use power point
        if(this.panelType()?.acceptsPowerPoint) {
            for(const item of Files.POWERPOINT_EXTENSIONS.values()) {
                contentType.push(item);
            } 
        }

        //Use PDF
        if(this.panelType()?.acceptsPDF || contentType.length > 0) {
            for(const item of Files.PDF_EXTENSIONS.values()) {
                contentType.push(item);
            } 
        }

        return contentType;  
    });


    //computed
    protected _hasValue = computed<boolean>(() => {
        return this.fileArray().length > 0;  
    });  

    
    //computed
    protected _bodyHeight = computed<string>(() => { 
        if(Tools.IsOnlyWhiteSpace(this.panelType()?.height)) {
            const height = 60;
            const filesCounter = Tools.IsNull(this.panelType()?.multiple) ? 1 : this.panelType()?.multiple!;  

            if([0, 1].includes(filesCounter)) {
                return `${height}px`;
            }

            if([2,3,4,5].includes(filesCounter)) {
                return `${height * filesCounter}px`;
            }

            else return `${height * 5}px`;
        }

        return this.panelType()!.height!; 
    });


    //computed
    protected _bodyMaxHeight = computed<string>(() => { 
        return Tools.IsOnlyWhiteSpace(this.panelType()?.maxHeight) ? '335px' : this.panelType()!.maxHeight!;
    });


    //computed
    protected _required = computed<number>(() => { 
        if(Tools.IsNotNull(this.panelType()?.required)) {
            return this.panelType()!.required! <= 1 ? 1 : this.panelType()!.required!;
        }

        return 0;
    });


    //computed
    protected _filesAllowed = computed<number>(() => {
        if(this._required() > 0) {
            return this._required();
        }

        const filesCounter = Tools.IsNull(this.panelType()?.multiple) ? 1 : this.panelType()?.multiple!;
        return [0, 1].includes(filesCounter) ? 1 : filesCounter;
    });  


    //computed
    protected _multiple = computed<boolean>(() => { 
        return Tools.IsNotNull(this.panelType()?.multiple)
            && (this.panelType()!.multiple! > 1 || this.panelType()!.multiple! < 0);
    });


    //computed
    protected _fileArray = computed<any[]>(() => {
        return this.fileArray().map(item => ({
            Icon: this.GetIcon(item.type),
            Name: item.name,
            Type: item.type,
            Size: Converter.BytesToMB(item.size),
            File: item
        }));  
    });


    //computed
    public size = computed<number>(() => { 
        return Converter.BytesToMB(this.fileArray().reduce((data, item) => data += item.size, 0));
    }); 


    //computed
    protected _showHeaderDetail = computed<boolean>(() => {  
        return (this._required() > 0) || (
            this.fileArray().length > 1 
            && (this._filesAllowed() > 1) || (this._filesAllowed() < 0)
        )
    });


    //computed
    protected _showAddButton = computed<boolean>(() => {  
        return !Tools.IsBooleanFalse(this.panelType()?.showAddButton)
            && !this.isLoading()
            && !this._isLoading()
            && !this.isReadonly()
            && !this.isInvisible()
            && (
                this._filesAllowed() < 0 || 
                (this.fileArray().length < this._filesAllowed())
            ) 
            
    });  


    //computed
    protected _showSaveButton = computed<boolean>(() => { 
        return Tools.IsBooleanTrue(this.panelType()?.showSaveButton)
            && !this.isLoading()
            && !this._isLoading()
            && !this.isReadonly()
            && !this.isInvisible() 
            && this.fileArray().length > 0
            && (
                this._required() <= 0 ||
                (this.fileArray().length >= this._required())
            )
    }); 


    //computed
    protected _showDeleteButton = computed<boolean>(() => { 
        return !Tools.IsBooleanFalse(this.panelType()?.showDeleteButton)
            && !this.isLoading()
            && !this._isLoading()
            && !this.isReadonly()
            && !this.isInvisible()
    });


    //computed
    protected _download = computed<boolean>(() => { 
        return !Tools.IsBooleanFalse(this.panelType()?.downloadFiles)
            && !this.isLoading()
            && !this._isLoading() 
            && !this.isInvisible()
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
        const fileArray = (event.dataTransfer?.files || []) as File[];  
        this.AddFiles(fileArray);
    }


    /** */
    protected async SelectedFile(inputFile: any) { 
        this._isLoading.set(true);
        const fileArray = [...inputFile.files] as any as File[];  
        await this.AddFiles(fileArray);
        inputFile.value = null;
        inputFile.files = null; 
    }


    /** */
    private async AddFiles(fileArray: File[]) {   
        this._isLoading.set(true);     
        const files = [...this.fileArray(), ...fileArray];
        this.onAddFiles.emit([...files]);
        this.LoadFiles(files);
    } 


    /** */
    protected DeleteFile(index: number) { 
        this._isLoading.set(true);
        const fileArray = [...this.fileArray()];
        const fileDeleted = fileArray.splice(index, 1);
        this.onDeleteFiles.emit([...fileDeleted]);
        this.LoadFiles([...fileArray]);   
    } 


    /** */
    private async LoadFiles(fileArray: File[]) {         
        if(!this.isLoading() && !this.isReadonly() && !this.isInvisible()) { 
            
            let FILE_LIST: File[] = [];

            for(const file of fileArray) {
                if(this._contentType().includes(file.type)) {
                    FILE_LIST.push(file); 
                }
            }  
            
            if([0, 1].includes(this._filesAllowed())) {
                FILE_LIST = [...FILE_LIST.slice(0, 1)];
            }

            else if(this._filesAllowed() > 1) {
                FILE_LIST = [...FILE_LIST.slice(0, this._filesAllowed())];
            }

            //Remove Duplicates
            var { array } = FILE_LIST.reduce((data: any, item: File) => {
                if(!Tools.HasProperty(data, 'array')) {
                    data['array'] = [];
                }

                if(!data['array'].some((x: any) => x.name == item.name)) {
                    data['array'].push(item);
                }

                return data;
            }, {});  

            //Emit event
            this.onLoadFiles.emit(array || []);
        } 

        this._isLoading.set(false);
    } 


    /** */
    protected GetIcon(imageType: string) {
        if(Array.from(Files.IMAGE_EXTENSIONS.values()).includes(imageType)) return 'iw-file-image color-sky'; 
        if(Array.from(Files.EXCEL_EXTENSIONS.values()).includes(imageType)) return 'iw-file-excel color-green'; 
        if(Array.from(Files.WORD_EXTENSIONS.values()).includes(imageType)) return 'iw-file-word color-blue'; 
        if(Array.from(Files.POWERPOINT_EXTENSIONS.values()).includes(imageType)) return 'iw-file-powerpoint color-orange'; 
        if(Array.from(Files.PDF_EXTENSIONS.values()).includes(imageType)) return 'iw-file-pdf color-red'; 
        return 'iw-file';
    }


    /** */
    private async ToFileArray(value: File | File[] | string | null) {
        let fileArray: File[] = [];

        if(Tools.IsOnlyWhiteSpace(value)) {
            fileArray = [];
        }

        else if(Tools.IsArray(value)) {
            fileArray = [...(value as File[])]; 
        }

        else if(Tools.IsString(value)) { 
            fileArray = [];
        }

        else { 
            fileArray = [(value as File)]; 
        }  

        this.fileArray.set([...fileArray]);
    } 


    /** */
    protected async DownloadFile(file: File) {
        if(this._download()) {
            Files.DownloadFile(file);
        }
    }
}