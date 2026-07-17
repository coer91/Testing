import { Component, computed, inject, signal } from '@angular/core'; 
import { ILotInformationScaned } from '@appShared/interfaces';
import { LpEntryService } from './lp-entry.service';   
import { PagePDA, Scanner } from '@appShared/tools';   

@Component({
    selector: 'lp-entry-page',
    templateUrl: './lp-entry.page.html', 
    standalone: false
})
export class LpEntryPage extends PagePDA {  

    constructor() { super('MM_IN0101') }  

    //Services 
    private readonly service = inject(LpEntryService);  
 
    //Variables        
    protected readonly dataSource = signal<ILotInformationScaned[]>([]); 


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
    protected async GetDataSource(scanner: string) {     
        this.dataSource.set([]);

        if(!Scanner.IsEncoded(scanner)) {
            const response = await this.service.GetLPStockIn(scanner); 
            
            if(response.length > 0) {   
                this.dataSource.set(response);
                this.transaction.set(scanner);    
            }
        }

        else this.alert.Warning(scanner, 'Invalid Code', 'barcode'); 
    }


    /** */
    protected async Check(scanner: string) {
        const parsedCode = Scanner.Decode(scanner);
         
        if(parsedCode.Message == 'OK') {
            if (parsedCode.Category.equals("IM")) {
                this.alert.Warning('This picking ticket is <b>KD</b>', parsedCode.LotNumber, 'barcode');   
                return;
            }
            
            const DATA_SOURCE = [...this.dataSource()];
            const DATA = DATA_SOURCE.find(x => x.LotNumber.equals(parsedCode.LotNumber));

            if(DATA) {
                if(DATA.Scaned) {
                    this.translatory.alert.LotAlreadyScanned(parsedCode.LotNumber);
                }

                else {
                    DATA.Scaned = true; 
                    this.dataSource.set([...DATA_SOURCE]); 
                }
            }

            else this.translatory.alert.LotNotInOrder(parsedCode.LotNumber); 
        }
   
        else this.alert.Warning(parsedCode.Message, parsedCode.LotNumber, 'barcode');
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
            
            const response = await this.service.SetLPStockIn(this.transaction());
    
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


    /** */
    protected indicator = computed(() => 
        `${this.dataSource().filter(item => item.Scaned).length} / ${this.dataSource().length}`
    );
}