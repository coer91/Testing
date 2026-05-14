import { Component, viewChild } from '@angular/core';   
import { WIAModal } from 'hwmx-angular/components';
import { Page } from 'hwmx-angular/tools';

@Component({
    selector: 'coer-modal-page',
    templateUrl: './coer-modal.page.html', 
    standalone: false
})
export class CoerModalPage extends Page {  

    protected readonly modal = viewChild<WIAModal>('modal');

    //Variables 

    constructor() { 
        super('coer-modal')
    }
}