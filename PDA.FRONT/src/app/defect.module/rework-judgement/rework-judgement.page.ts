import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'rework-judgement-page',
    templateUrl: './rework-judgement.page.html', 
    standalone: false
})
export class ReworkJudgementPage extends PagePDA {  
 
    constructor() { super('MM_DM0301') }  
}