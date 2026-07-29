import { Component, viewChild } from '@angular/core';   
import { LotJoin } from '@appShared/components';
import { PagePDA } from '@appShared/tools';  

@Component({
    selector: 'lot-join-page',
    templateUrl: './lot-join.page.html', 
    standalone: false
})
export class LotJoinPage extends PagePDA {  
 
    constructor() { super('MM_LT0301') }   

    //Elements
    protected lotJoinRef = viewChild.required<LotJoin>('lotJoinRef'); 

    /** On Scann Code */
    protected override async OnScanCode(scanner: string) { 
        this.lotJoinRef().OnScanCode(scanner);
    } 
}