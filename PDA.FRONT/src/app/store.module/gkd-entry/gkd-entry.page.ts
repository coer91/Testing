import { Component, computed, inject, signal } from '@angular/core';    
import { ILotInformationAone } from '@appShared/interfaces';
import { PagePDA, Scanner } from '@appShared/tools';
import { GkdEntryService } from './gkd-entry.service';
import { Tools } from 'hwmx-angular/tools'; 

@Component({
    selector: 'gkd-entry-page',
    templateUrl: './gkd-entry.page.html', 
    standalone: false
})
export class GkdEntryPage extends PagePDA {  
 
    constructor() { super('MM_IN0301') } 

    //Services 
    private service = inject(GkdEntryService); 

    //Variables    
    protected isAoneIn = signal<boolean>(false);        
    protected readonly dataSource = signal<ILotInformationAone[]>([]);   


    /**  */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);     
        
        if(Tools.IsOnlyWhiteSpace(this.transaction())) {
            await this.GetDataSource(scanner);
        }

        else {
            this.Check(scanner);
        } 
 
        this.isLoading.set(false);
    } 


    /** */
    protected async GetDataSource(scanner: string) {
        this.dataSource.set([]);
        const parsedCode = Scanner.Decode(scanner);
        
        if(parsedCode.Message.equals('OK')) {
            if(parsedCode.Category.equals("IM")) {
                const response = await this.service.GetKDLotInfo(parsedCode.LotNumber);
        
                if(response.length > 0) {
                    const { VBELG, LotNumber } = response[0]; 
                        
                    if(LotNumber.equals('NG')) { 
                        if(await this.alert.WarningConfirm(`<b>${parsedCode.LotNumber}</b><br>not exits.<br>Are you sure continue?`)) {
                            const lot: ILotInformationAone[] = [{
                                VBELG:          VBELG, 
                                LotNumber:      parsedCode.LotNumber,
                                PartNumber:     parsedCode.PartNumber,  
                                EoNumber:       parsedCode.EoNumber,
                                Qty:            Number(parsedCode.Qty),
                                Unit:           parsedCode.Unit,  
                                VendorCode:     parsedCode.VendorCode,  
                                ProductionDate: parsedCode.ProductionDate,      
                                Status:         2, 
                            }];
                            
                            this.isAoneIn.set(true);
                            this.transaction.set(parsedCode.LotNumber);
                            this.dataSource.set([...lot]);
                        }
                    }
        
                    else {
                        this.transaction.set(VBELG);
                        this.dataSource.set([...response]); 
                        this.Check(parsedCode.LotNumber);                                
                    }
                }  
            }

            else this.alert.Warning('This picking ticket is not KD', parsedCode.LotNumber, 'barcode'); 
        } 

        else this.alert.Warning(parsedCode.Message, scanner, 'barcode');    
    }


    /** */
    protected Check(scanner: string) {
        if(Scanner.IsEncoded(scanner)) {  
            const parsedCode = Scanner.Decode(scanner); 

            if(parsedCode.Message.equals('OK')) {
                scanner = parsedCode.LotNumber;

                if(!parsedCode.Category.equals("IM")) {
                    this.alert.Warning('This picking ticket is not <b>KD</b>', parsedCode.LotNumber, 'barcode'); 
                    return;
                }
            } 
        }  

        //SCAN ROW
        const DATA_SOURCE = [...this.dataSource()];
        const index = DATA_SOURCE.findIndex(x => x.LotNumber.equals(scanner));
        
        if(index >= 0) { 
            if(DATA_SOURCE[index].Status >= 1) {
                this.translatory.alert.LotAlreadyScanned(scanner);
            }

            else {
                DATA_SOURCE[index].Status = 1; 
                this.dataSource.set([...DATA_SOURCE]); 
            }
        }

        else this.translatory.alert.LotNotInOrder(scanner);
    }  


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0
            && (this.dataSource().every(x => x.Status > 0) || this.isAoneIn());
    }); 


    /** */
    protected async Save() { 
        const aswer = await this.alert.SuccessConfirm(`Confirm transaction<br>#<b>${this.transaction()}</b><br>${this.dataSource().length} Lots?`, 'save');
         
        if(aswer) {
            this.isLoading.set(true); 
           
            if(this.showSaveButton()) {                                 
                const response = this.isAoneIn() 
                    ? await this.service.SetKdStockAoneIn(this.transaction())
                    : await this.service.SetKdStockIn(this.dataSource());
    
                if(response.isNotOnlyWhiteSpace()) {
                    this.alert.Success(response, this.transaction(), 'save');
                    this.Cancel(false);
                }   
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

        this.isAoneIn.set(false);
        this.transaction.set(''); 
        this.dataSource.set([]); 
    }


    /** */
    protected indicator = computed(() => 
       `${this.dataSource().filter(item => item.Status > 0).length} / ${ this.dataSource().length }`
    );
}