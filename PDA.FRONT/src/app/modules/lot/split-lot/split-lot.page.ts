import { Component, viewChild } from '@angular/core';   
import { SplitLot } from '@appShared/components';
import { PagePDA } from '@appShared/tools';  

@Component({
    selector: 'split-lot-page',
    templateUrl: './split-lot.page.html', 
    standalone: false
})
export class SplitLotPage extends PagePDA {  
 
    constructor() { super('MM_LT0201') }     
    
    //Elements
    protected lotSplitRef = viewChild.required<SplitLot>('lotSplitRef'); 

    /** */
    protected override async OnScanCode(scanner: string) { 
        this.lotSplitRef().OnScanCode(scanner);
    } 
}