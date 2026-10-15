import { TEMPORAL_STOCK_DTO, TemporalStockService } from './temporal-stock.service';
import { Component, computed, inject, signal } from '@angular/core';   
import { PagePDA, Scanner } from '@appShared/tools'; 
import { Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'temporal-stock-page',
    templateUrl: './temporal-stock.page.html', 
    standalone: false
})
export class TemporalStockPage extends PagePDA {  
 
    constructor() { super('Temporal Stock') }  

    //Services    
    private service = inject(TemporalStockService);   


    //Variables        
    protected readonly dataSource = signal<TEMPORAL_STOCK_DTO[]>([]); 


    /** */
    protected override async OnScanCode(scanner: string) {
       try {
            this.isLoading.set(true);        
             
            scanner = scanner.trim(); 
            if(this.transaction().isOnlyWhiteSpace()) {
                await this.GetDataSource(scanner); 
            }

            else {
                await this.Check(scanner);
            }              
        
            this.isLoading.set(false);
        }

        catch (message: any) {
            console.error(message);
            this.alert.Danger('Error', null, 'bug');
        }
    } 


    /** */
    protected async GetDataSource(scanner: string) {     
        this.dataSource.set([]);  

        if(Scanner.IsEncoded(scanner)) {
           this.translatory.alert.InvalidCode(scanner); 
        }

        else {
            this.transaction.set(scanner);
    
            const data = await this.service.GetTemporalStock(scanner);
            this.dataSource.set(data);
        }
    }


    /** */
    protected async Check(scanner: string) {
        const parsedCode = Scanner.Decode(scanner);

        if(parsedCode.Message.equals('OK')) {
            const DATA_SOURCE = [...this.dataSource()];
            const DATA = DATA_SOURCE.find(x => x.BARCODE.equals(scanner));
    
            if(DATA) { 
                this.translatory.alert.LotAlreadyScanned(''); 
                return;
            }
    
            else {                 
                const LOT: TEMPORAL_STOCK_DTO = {
                    BARCODE:         scanner,
                    LOT_NUMBER:      parsedCode?.LotNumber,
                    PART_NUMBER:     parsedCode?.PartNumber,
                    EO_NUMBER:       parsedCode?.EoNumber,
                    QTY:             Tools.IsNotOnlyWhiteSpace(parsedCode?.Qty) ? Number(parsedCode?.Qty || 0) : 0,
                    UNIT:            parsedCode?.Unit,
                    STORAGE_CODE:    parsedCode?.StorageCode,
                    VENDOR_CODE:     parsedCode?.VendorCode,
                    PRODUCTION_DATE: parsedCode?.ProductionDate,
                    ERP_CODE:        parsedCode?.erpCode,
                    DELIVERY_SLIP:   parsedCode?.DeliverySlip,
                    DELIVERY_ITEM:   parsedCode?.DeliveryItem,
                    CATEGORY:        parsedCode?.Category,
                    MODEL:           parsedCode?.Model,
                    CORP:            parsedCode?.corp,
                    SHIP:            parsedCode?.ship,
                    CONTAINER:       parsedCode?.container
                };
    
                const response = await this.service.SetTemporalStock(this.transaction(), LOT);
    
                if(response.ok) { 
                    this.dataSource.update(data => [...data, LOT]);
                }
            } 
        }

        else this.translatory.alert.InvalidCode(scanner);
    } 


    /** */
    protected async Cancel() { 
        this.transaction.set(''); 
        this.dataSource.set([]); 
    }   


    /** */
    protected async Remove(lot: TEMPORAL_STOCK_DTO) {
        const answer = await this.alert.WarningConfirm(`Remove lot<br>${lot.LOT_NUMBER}?`, 'delete');

        if(answer && this.transaction().isNotOnlyWhiteSpace()) {
            this.isLoading.set(true);
             
            const response = await this.service.DeleteTemporalStock(this.transaction(), lot.BARCODE);

            if(response.ok) {
                this.dataSource.update(data => [ ...data.filter(item => !item.BARCODE.equals(lot.BARCODE)) ]);
                this.alert.Success(`Lot ${lot.LOT_NUMBER} has been deleted`, 'Deleted', 'delete');
            }             

            this.isLoading.set(false);
        } 
    }


    /** */
    protected counter = computed<string>(() => {  
        return this.transaction().isNotOnlyWhiteSpace() && this.dataSource().length > 0 ? `
            <h4 class="width-100 text-align-right color-gray"> 
                ${this.dataSource().length} <i class="iw-barcode font-size-20px"></i>  
            </h4>
        ` : ''; 
    }); 
}