import { Component, computed, inject, signal } from '@angular/core';    
import { PagePDA, Scanner } from '@appShared/tools'; 
import { EngineStocktakingService } from './engine-stocktaking.service';
import { IPallet } from '@appShared/interfaces';

@Component({
    selector: 'engine-stocktaking-page',
    templateUrl: './engine-stocktaking.page.html', 
    standalone: false
})
export class EngineStocktakingPage extends PagePDA {  
 
    constructor() { super('MM_LM0601') }  

    //Inject     
    private engineStocktakingService = inject(EngineStocktakingService);  

    //Variables
    protected readonly dataSource = signal<IPallet[]>([]);  


    /** */
    protected override async OnScanCode(scanner: string) {
        // this.isLoading.set(true);  

        // const lotNumber = Scanner.DecodeProperty(scanner, 'lotNumber');

        // if (lotNumber.length == 14) {
        //     await this.GetDataSource(lotNumber);
        // }

        // else {
        //     await this.Check(scanner);
        // } 
    
        // this.isLoading.set(false);
    }


    /** First Scan */
    protected async GetDataSource(lotNumber: string) {      
        const response = await this.engineStocktakingService.GetPallet3C(lotNumber); 

        if(response.length <= 0) {
            this.alert.Warning(`No data`, lotNumber, 'barcode');
        }

        const DATA_SOURCE = response.except([...this.dataSource()], 'LotNumber'); 
        this.dataSource.update(data => [...data, ...DATA_SOURCE]);
    }


    /** Second Scan */
    protected async Check(lotNumber: string) { 
        if(lotNumber.includes('#')) {
            lotNumber = lotNumber.split('#')[1]; 
        }
        
        lotNumber = lotNumber.trim();
        if(lotNumber.isNotOnlyWhiteSpace() && !this.dataSource().some(x => x.Serial.equals(lotNumber))) {
            this.dataSource.update(data => [...data, { Serial: lotNumber, Pallet: '' }]);
        } 
    }


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.dataSource().length > 0 
    }); 


    /** */
    protected async Save() { 
        const aswer = await this.alert.SuccessConfirm(`Confirm transaction<br>${this.dataSource().length} Lots?`, 'save');
         
        if(aswer) {
            this.isLoading.set(true); 

            const lotNumberList = this.dataSource().map(item => `${item.Serial}/${item.Pallet}`); 

            const response = await this.engineStocktakingService.SetStocktaking(lotNumberList);
    
            if(response.ok) {
                this.alert.Success(response.data, '', 'save');
                this.Cancel(false);
            }  
            
            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const response = await this.alert.WarningConfirm(`Cancel transaction<br>${this.dataSource().length} Lots?`);
            if(!response) return; 
        }
         
        this.dataSource.set([]);     
    }
}