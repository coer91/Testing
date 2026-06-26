import { Component, computed, inject, signal } from '@angular/core';   
import { KDStockInService, IKDLotInfo } from '../kd-stock-in/kd-stock-in.service';
import { PagePDA, Scanner } from '@appShared/tools';
import { Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'gkd-stock-in-page',
    templateUrl: './gkd-stock-in.page.html', 
    standalone: false
})
export class GDKStockInPage extends PagePDA {  
 
    constructor() { super('MM_IN0301') } 

    //Inject 
    private kdStockInService = inject(KDStockInService); 

    //Variables       
    protected readonly dataSource = signal<IKDLotInfo[]>([]);   


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
    protected indicator = computed(() => {
        return `${this.dataSource().filter(item => item.Status > 0).length} / ${ this.dataSource().length }`;
    });


    /** First Scan */
    protected async GetDataSource(scanner: string) {
        this.dataSource.set([]);
        const parsedCode = Scanner.Decode(scanner);
        
        if(parsedCode.message.equals('OK')) {
            if(parsedCode.category.equals("IM")) {
                const response = await this.kdStockInService.GetKDLotInfo(parsedCode.lotNumber);
        
                if(response.length > 0) {
                    const { VBELG, LotNumber } = response[0]; 
                        
                    if(LotNumber.equals('NG')) { 
                        if(await this.alert.WarningConfirm(`<b>${parsedCode.lotNumber}</b><br>not exits.<br>Are you sure continue?`)) {
                            const lot: IKDLotInfo[] = [{
                                LotNumber:      parsedCode.lotNumber,
                                PartNumber:     parsedCode.partNumber,
                                EoNumber:       parsedCode.eoNumber,
                                Qty:            Number(parsedCode.qty),
                                Unit:           parsedCode.unit,
                                VBELG:          scanner,
                                EBELN:          parsedCode.deliverySlip, 
                                EBELP:          parsedCode.deliveryItem, 
                                VendorCode:     parsedCode.vendorCode,
                                WH_CD:          parsedCode.warehouse, 
                                MODEL:          parsedCode.model,     
                                ProductionDate: parsedCode.prodDate,
                                Status:         2, 
                            }];
                            
                            this.transaction.set(parsedCode.lotNumber);
                            this.dataSource.set([...lot]);
                        }
                    }
        
                    else {
                        this.transaction.set(VBELG);
                        this.dataSource.set([...response]); 
                        this.Check(parsedCode.lotNumber);                                
                    }
                }   
                
                else this.alert.Warning('No Data', parsedCode.lotNumber, 'barcode');
            }

            else this.alert.Warning('This picking ticket is not KD', parsedCode.lotNumber, 'barcode'); 
        } 

        else this.alert.Warning(parsedCode.message, scanner, 'barcode');    
    }


    /** Second Scan */
    protected Check(scanner: string) {
        if(Scanner.IsEncoded(scanner)) {  
            const parsedCode = Scanner.Decode(scanner); 

            if(parsedCode.message.equals('OK')) {
                scanner = parsedCode.lotNumber;

                if(!parsedCode.category.equals("IM")) {
                    this.alert.Warning('This picking ticket is not KD', parsedCode.lotNumber, 'barcode'); 
                    return;
                }
            } 
        }  

        //SCAN ROW
        const DATA_SOURCE = [...this.dataSource()];
        const index = DATA_SOURCE.findIndex(x => x.LotNumber.equals(scanner));
        
        if(index >= 0) { 
            DATA_SOURCE[index].Status = 1; 
            this.dataSource.set([...DATA_SOURCE]); 
        }

        else this.alert.Warning('Not Found', scanner, 'barcode');   
    } 


    /** */
    protected isAoneIn = computed<boolean>(() => { 
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0 
            && this.dataSource()[0].LotNumber.equals('NG'); 
    }); 


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
                const lotNumber      = this.dataSource().map(item => item.LotNumber).join(';');
                const partNumber     = this.dataSource().map(item => item.PartNumber).join(';');
                const eoNumber       = this.dataSource().map(item => item.EoNumber).join(';');
                const qty            = this.dataSource().map(item => item.Qty).join(';');
                const unit           = this.dataSource().map(item => item.Unit).join(';');
                const vdCd           = this.dataSource().map(item => item.VendorCode).join(';');
                const whCd           = this.dataSource().map(item => item.WH_CD).join(';');
                const model          = this.dataSource().map(item => item.MODEL).join(';');
                const productionDate = this.dataSource().map(item => item.ProductionDate).join(';');
                                
                const response = this.isAoneIn() 
                    ? await this.kdStockInService.SetKdStockAoneIn(this.transaction())
                    : await this.kdStockInService.SetKdStockIn(lotNumber, partNumber, qty, unit, productionDate, eoNumber, vdCd, whCd, model);
    
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

        this.transaction.set(''); 
        this.dataSource.set([]); 
    }
}