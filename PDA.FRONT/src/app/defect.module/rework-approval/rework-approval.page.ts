import { Component } from '@angular/core';    
import { PagePDA } from '@appShared/tools';

@Component({
    selector: 'rework-approval-page',
    templateUrl: './rework-approval.page.html', 
    standalone: false
})
export class ReworkApprovalPage extends PagePDA {  
 
    constructor() { super('MM_DM0302') }  
}