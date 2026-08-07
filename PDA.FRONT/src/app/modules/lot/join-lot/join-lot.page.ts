import { Component, viewChild } from '@angular/core';   
import { JoinLot } from '@appShared/components';
import { PagePDA } from '@appShared/tools';  

@Component({
    selector: 'join-lot-page',
    templateUrl: './join-lot.page.html', 
    standalone: false
})
export class JoinLotPage extends PagePDA {  
 
    constructor() { super('MM_LT0301') }   

    //Elements
    protected lotJoinRef = viewChild.required<JoinLot>('lotJoinRef'); 

    /** */
    protected override async OnScanCode(scanner: string) { 
        this.lotJoinRef().OnScanCode(scanner);
    } 
}