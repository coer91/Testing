import { Component, signal } from '@angular/core';   
import { PagePDA } from '@appShared/tools';
import { IOption } from 'hwmx-angular/interfaces';


@Component({
    selector: 'vendor-return-page',
    templateUrl: './vendor-return.page.html', 
    standalone: false
})
export class VendorReturnPage extends PagePDA {  
 
    constructor() { super('MM_RT0101') } 



    //Variables 
    protected readonly scanner = signal<string>(''); 
    protected readonly dataSource = signal<any[]>([{name:'Lesliegit'}]);  
    protected readonly select = signal<IOption | null>(null);  

}