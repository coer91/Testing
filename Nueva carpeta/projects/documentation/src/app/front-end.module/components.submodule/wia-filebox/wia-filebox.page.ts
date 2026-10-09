import { Component, signal } from '@angular/core';  
import { Page } from 'hwmx-angular/tools'; 

@Component({
    selector: 'wia-filebox-page',
    templateUrl: './wia-filebox.page.html',  
    standalone: false
})
export class WIAFileBoxPage extends Page {  

    constructor() { super('coer-filebox') }

    protected filePhoto = signal<File | string>('');
    protected fileArray = signal<File[]>([]);
}