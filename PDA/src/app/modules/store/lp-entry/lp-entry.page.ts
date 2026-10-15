import { Component, computed, inject, signal } from '@angular/core';  
import { LP_ENTRY_DTO, LpEntryService } from './lp-entry.service';   
import { PagePDA, Scanner } from '@appShared/tools';   
import { TRANSLATORY } from './lp-entry.translatory';

@Component({
    selector: 'lp-entry-page',
    templateUrl: './lp-entry.page.html', 
    standalone: false
})
export class LpEntryPage extends PagePDA {  

    constructor() { super('MM_IN0101') }  
    protected override readonly TRANSLATORY = new TRANSLATORY(this.language()); 

    //Services 
    private readonly service = inject(LpEntryService);  
 
    //Variables        
    protected readonly dataSource = signal<LP_ENTRY_DTO[]>([]); 


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
            const response = await this.service.GetLpEntry(scanner); 
            
            if(response.length > 0) {   
                this.dataSource.set(response);
                this.transaction.set(scanner);    
            }
        }

        else this.translatory.alert.InvalidCode(scanner);
    }


    /** */
    protected async Check(scanner: string) {
        const parsedCode = Scanner.Decode(scanner);
         
        if(parsedCode.Message == 'OK') {
            if (parsedCode.Category.equals("IM")) {
                this.TRANSLATORY.alert.PickingOrder(parsedCode.LotNumber);  
                return;
            }
            
            const DATA_SOURCE = [...this.dataSource()];
            const DATA = DATA_SOURCE.find(x => x.LOT_NUMBER.equals(parsedCode.LotNumber));

            if(DATA) {
                if(DATA.SCANNED) {
                    this.translatory.alert.LotAlreadyScanned(parsedCode.LotNumber);
                }

                else {
                    DATA.SCANNED = true; 
                    this.dataSource.set([...DATA_SOURCE]); 
                }
            }

            else this.translatory.alert.LotNotInOrder(parsedCode.LotNumber); 
        }
   
        else this.alert.Warning(parsedCode.Message, parsedCode.LotNumber, 'barcode');
    } 


    /** */
    protected async Save() {
        const aswer = await this.translatory.confirm.SaveTransaction(this.transaction(), this.dataSource().length); 
         
        if(aswer) {
            this.isLoading.set(true); 
            
            const response = await this.service.SetLpEntry(this.transaction());
    
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
            const quantity = this.dataSource().length;
            const response = await this.translatory.confirm.CancelTransaction(this.transaction(), quantity);
            if(!response) return; 
        }

        this.transaction.set(''); 
        this.dataSource.set([]); 
    }   


    /** */
    protected counter = computed<string>(() => {  
        return this.transaction().isNotOnlyWhiteSpace() ? `
            <h4 class="width-100 text-align-right color-gray"> 
                ${this.dataSource().filter(item => item.SCANNED).length} / ${this.dataSource().length}
                <i class="iw-barcode font-size-20px"></i>  
            </h4>
        ` : ''; 
    }); 


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().every(x => x.SCANNED)
            && this.dataSource().length > 0;
    }); 
}