import { Component, computed, inject, signal } from '@angular/core'; 
import { LPStockInService } from './lp-stock-in.service';   
import { PagePDA, Scanner } from '@appShared/tools';  
import { IDataSourceScaned } from '@appShared/interfaces'; 

@Component({
    selector: 'lp-stock-in-page',
    templateUrl: './lp-stock-in.page.html', 
    standalone: false
})
export class LPStockInPage extends PagePDA {  

    constructor() { super('MM_IN0101') }  

    //Inject 
    private lpStockInService = inject(LPStockInService);  
 
    //Variables        
    protected readonly dataSource = signal<IDataSourceScaned[]>([]); 


    /** */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);        
        
        if(this.transaction().isOnlyWhiteSpace()) {
            await this.GetDataSource(scanner);
        }

        else {
            await this.Check(scanner);
        }             
 
        this.isLoading.set(false);
    }


    /** */
    protected indicator = computed(() => {
        return `${this.dataSource().filter(item => item.Scaned).length} / ${ this.dataSource().length }`;
    });


    /** First Scan */
    protected async GetDataSource(scanner: string) {     
        this.dataSource.set([]);

        if(!Scanner.IsEncoded(scanner)) {
            const response = await this.lpStockInService.GetLPStockIn(scanner); 
            
            if(response.length > 0) {   
                this.dataSource.set(response);
                this.transaction.set(scanner);    
            }
            
            else this.alert.Warning('No Data', scanner, 'barcode'); 
        }

        else this.alert.Warning(scanner, 'Invalid Code', 'barcode'); 
    }


    /** Second Scan */
    protected async Check(scanner: string) {
        const parsedCode = Scanner.Decode(scanner);
        
        if(parsedCode.message == 'OK') {
            if (parsedCode.category.equals("IM")) {
                this.alert.Warning('This picking ticket is KD', parsedCode.lotNumber, 'barcode');   
                return;
            }
            
            const DATA_SOURCE = [...this.dataSource()];
            const DATA = DATA_SOURCE.find(x => x.LotNumber.equals(parsedCode.lotNumber));

            if(DATA) {
                DATA.Scaned = true; 
                this.dataSource.set([...DATA_SOURCE]); 
            }

            else this.alert.Warning('Not Found', parsedCode.lotNumber, 'barcode');    
        }
   
        else this.alert.Warning(parsedCode.message, parsedCode.lotNumber, 'barcode');
    }


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0
            && this.dataSource().every(x => x.Scaned);
    }); 


    /** */
    protected async Save() {
        const aswer = await this.alert.SuccessConfirm(`Confirm transaction<br>#<b>${this.transaction()}</b><br>${this.dataSource().length} Lots?`, 'save');
         
        if(aswer) {
            this.isLoading.set(true); 
            
            const response = await this.lpStockInService.SetLPStockIn(this.transaction());
    
            if(response.ok) {
                this.alert.Success(response.data, this.transaction(), 'save');
                this.Cancel(false);
            }
            
            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const response = await this.alert.WarningConfirm(`Cancel transaction<br>#<b>${this.transaction()}</b> ?`);
            if(!response) return; 
        }

        this.transaction.set(''); 
        this.dataSource.set([]); 
    }   
}