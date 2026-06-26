import { Component } from '@angular/core';   
import { PagePDA } from '@appShared/tools'; 

@Component({
    selector: 'dc-regist-scrap-page',
    templateUrl: './dc-regist-scrap.page.html', 
    standalone: false
})
export class DCRegistScrapPage extends PagePDA {  
 
    constructor() { super('MM_DM9901') }  
}