import { Component, signal } from '@angular/core';    
import { Page } from 'hwmx-angular/tools';

@Component({
    selector: 'coer-tab-page',
    templateUrl: './coer-tab.page.html', 
    standalone: false
})
export class CoerTabPage extends Page {  
    
    protected readonly dataSource = signal<any[]>([]);
     

    constructor() { 
        super('coer-tab');


        setTimeout(() => {
            for(let i = 1; i <= 10; i++) { 
                this.dataSource.update(x => x.concat([
                    { 
                        Id: i, 
                        Name: `item ${i}`,  
                        Pption: null
                    }
                ]));
            }

            this.isLoading.set(!this.isLoading());
        }, 1000)
     } 
}