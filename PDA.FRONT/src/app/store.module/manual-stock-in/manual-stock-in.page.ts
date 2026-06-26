import { Component, computed, inject, signal } from '@angular/core';   
import { ManualStockInService } from './manual-stock-in.service';
import { PagePDA, Scanner } from '@appShared/tools'; 

@Component({
    selector: 'manual-stock-in-page',
    templateUrl: './manual-stock-in.page.html', 
    standalone: false
})
export class ManualStockInPage extends PagePDA {  
 
    constructor() { super('MM_IN0801') }  

    //Inject  
    private manualStockInService = inject(ManualStockInService); 

    //Variables       
    protected readonly dataSource = signal<any[]>([]);  

    /**  */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);   

        await this.GetDataSource(scanner);

         
        this.isLoading.set(false);
    }


    /** First Scan */
    protected async GetDataSource(scanner: string) { 
        const parsedCode = Scanner.Decode(scanner);   

        if(parsedCode.message.equals('Ok')) {
            if(!this.dataSource().some(x => x.LOTNO.equals(parsedCode.lotNumber))) {
                this.dataSource.update(data => [...data, 
                    {
                        LOTNO:     parsedCode.lotNumber,
                        PART_NO:   parsedCode.partNumber,
                        QTY:       parsedCode.qty,
                        UNIT:      parsedCode.unit,
                        PROD_DATE: parsedCode.prodDate,
                        EO_NO:     parsedCode.eoNumber,
                        VD_CD:     parsedCode.vendorCode,
                        WH_CD:     parsedCode.warehouse,
                        MODEL:     parsedCode.model,
                        SCAN:      true
                    }
                ]);
            }
        }

        else this.alert.Warning(parsedCode.message, scanner, 'barcode');    
    }


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.dataSource().length > 0 
    }); 


    /** */
    protected async Save() { 
        const aswer = await this.alert.SuccessConfirm(`Confirm transaction <br>${this.dataSource().length} Lots?`, 'save');
         
        if(aswer) {
            this.isLoading.set(true); 
           
            for(const item of this.dataSource()) {
                const { LOTNO, PART_NO, QTY, UNIT, PROD_DATE, EO_NO, VD_CD, WH_CD, MODEL } = item; 
                await this.manualStockInService.SetManualIn(LOTNO, PART_NO, QTY, UNIT, PROD_DATE, EO_NO, VD_CD, WH_CD, MODEL);
            }
            
            this.Cancel(false);
            this.alert.Success();
            this.isLoading.set(false);
        }
    } 


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const response = await this.alert.WarningConfirm(`Cancel transaction ?`);
            if(!response) return; 
        }

        this.transaction.set(''); 
        this.dataSource.set([]); 
    }
}