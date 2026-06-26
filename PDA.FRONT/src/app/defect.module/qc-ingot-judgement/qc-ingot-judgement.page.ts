import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'qc-ingot-judgement-page',
    templateUrl: './qc-ingot-judgement.page.html', 
    standalone: false
})
export class QCIngotJudgementPage extends PagePDA {  
 
    constructor() { super('MM_DM0701') }  
}