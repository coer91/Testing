import { Component, viewChild } from '@angular/core';   
import { LotSplit } from '@appShared/components';
import { PagePDA } from '@appShared/tools';  

@Component({
    selector: 'lot-split-page',
    templateUrl: './lot-split.page.html', 
    standalone: false
})
export class LotSplitPage extends PagePDA {  
 
    constructor() { super('MM_LT0201') }     
    
    //Elements
    protected lotSplitRef = viewChild.required<LotSplit>('lotSplitRef'); 

    /** On Scann Code */
    protected override async OnScanCode(scanner: string) { 
        this.lotSplitRef().OnScanCode(scanner);
    } 
}