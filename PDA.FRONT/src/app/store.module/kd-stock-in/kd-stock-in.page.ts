import { Component, computed, signal } from '@angular/core';    
import { PagePDA } from '@appShared/tools';  

@Component({
    selector: 'kd-stock-in-page',
    templateUrl: './kd-stock-in.page.html', 
    standalone: false
})
export class KDStockInPage extends PagePDA {  
 
    constructor() { super('MM_IN0201') }   

    //Variables       
    protected readonly dataSource = signal<any[]>([]);  

    /**  */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);     
         
 
        this.isLoading.set(false);
    }


    /** */
    protected async GetDataSource(scanner: string) { 
         
    }


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0 
    }); 


    /** */
    protected async Save() { 
        const aswer = await this.alert.SuccessConfirm(`Confirm transaction #<b>${this.transaction()}</b><br>${this.dataSource().length} Lots?`, 'save');
         
        if(aswer) {
            this.isLoading.set(true); 
           
            
            
            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const response = await this.alert.WarningConfirm(`Cancel transaction #<b>${this.transaction()}</b> ?`);
            if(!response) return; 
        }

        this.transaction.set(''); 
        this.dataSource.set([]); 
    }
}