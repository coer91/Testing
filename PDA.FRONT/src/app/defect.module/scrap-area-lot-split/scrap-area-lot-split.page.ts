import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'scrap-area-lot-split-page',
    templateUrl: './scrap-area-lot-split.page.html',  
    standalone: false
})
export class ScrapAreaLotSplitPage extends PagePDA {  
 
    constructor() { super('MM_DM0501') }  
}