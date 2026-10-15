import { Component, signal, } from '@angular/core';  
import { IFileInfo } from 'hwmx-angular/interfaces';
import { HTTP, Page } from 'hwmx-angular/tools'; 

@Component({
    selector: 'wia-filebox-page',
    templateUrl: './wia-filebox.page.html',  
    standalone: false
})
export class WIAFileBoxPage extends Page {  

    constructor() { super('coer-filebox') }

    protected override readonly isLoading = signal<boolean>(false);
    protected filePhoto = signal<File | string | IFileInfo | IFileInfo[]>('');
    protected fileArray = signal<File[] | IFileInfo | IFileInfo[]>([]);


    protected override StartPage(): void {
        /** HTTP POST */
        HTTP.GET<IFileInfo>({
            url: `https://staging.hyundaiwia.mx:9081/api/UsersImage/GetUserImage/52118400`,
            responseType: 'text'            
        }).then(data => {
            //this.fileArray.set(data.data); 
            this.filePhoto.set(data.data);
            //console.log(data)
        }); 
    }


}