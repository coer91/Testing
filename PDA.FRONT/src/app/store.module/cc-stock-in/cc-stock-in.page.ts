import { Component, computed, inject, signal, viewChild } from '@angular/core';   
import { CcStockInService } from './cc-stock-in.service';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { MasterService } from '@appShared/services';
import { IDataSourceQty, IStore } from '@appShared/interfaces'; 
import { WIAModal } from 'hwmx-angular/components';

@Component({
    selector: 'cc-stock-in-page',
    templateUrl: './cc-stock-in.page.html', 
    standalone: false
})
export class CCStockInPage extends PagePDA {  
 
    constructor() { super('MM_IN0202') }  

    //Inject   
    private masterService    = inject(MasterService);  
    private ccStockInService = inject(CcStockInService);  

    //Elements
    protected readonly modal = viewChild.required<WIAModal>('modal');

    //Variables         
    protected readonly dataSource  = signal<IDataSourceQty[]>([]);  
    protected readonly storageList = signal<IStore[]>([]); 
    protected readonly detailList  = signal<any[]>([]);  
    protected readonly detail      = signal<IDataSourceQty | null>(null);  


    /** */
    protected override async StartPage() {
        this.storageList.set(await this.masterService.GetStorageList());
        super.StartPage(); 
    }


    /** */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);  
                 
        if(this.transaction().isOnlyWhiteSpace()) {
            await this.GetDataSource(scanner);
        }

        else {
            await this.Check(scanner);
            if(this.detail()) this.detailList.set([ ...this.detail()!.Detail ]);
        }        

        this.isLoading.set(false);
    }

    
    /** */
    protected indicator = computed(() => {
        return `${this.dataSource().filter(item => item.QtyChecked > 0).length} / ${ this.dataSource().length }`;
    });


    /** */
    protected indicatorByMaterial = computed(() => {
        return `${this.detailList().filter(item => item.SCAN > 0).length} / ${ this.detailList().length }`;
    }); 


    /** */
    protected dataSourceGrouped = computed<IDataSourceQty[]>(() => { 
        const PART_NUMBER = this.dataSource().reduce((response: any, item) => {             
            if (!response[item.PartNumber]) {
                response[item.PartNumber] = [];
            }
            
            response[item.PartNumber].push(item);        
            return response;
        }, {}); 

        const response: any[] = [];

        for(const partNumber in PART_NUMBER) { 
            response.push({
                PartNumber: partNumber,
                Qty: PART_NUMBER[partNumber].reduce(
                    (Qty: number, item: IDataSourceQty) => Qty + Number(item.Qty), 0
                ),
                QtyChecked: PART_NUMBER[partNumber].reduce(
                    (QtyChecked: number, item: IDataSourceQty) => QtyChecked + Number(item.QtyChecked), 0
                ),
                Detail: PART_NUMBER[partNumber]
            });
        } 

        return response;
    }); 


    /** First Scan */
    protected async GetDataSource(scanner: string) {           
        this.dataSource.set([]);

        if(!Scanner.IsEncoded(scanner)) {
            const response = await this.ccStockInService.GetCCStockIn(scanner); 
            
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
        if(parsedCode.message != 'OK') {
            this.alert.Warning(parsedCode.message, scanner, 'barcode');
            return;
        }         

        const { partNumber, lotNumber, qty } = parsedCode
        
        const DATA_SOURCE = [...this.dataSource()];
        const LOT = DATA_SOURCE.find(item => item.LotNumber.equals(lotNumber) && item.PartNumber.equals(partNumber));
        
        if(LOT) {
            LOT.QtyChecked = Number(qty);
            this.dataSource.set([...DATA_SOURCE]); 
        }

        else this.alert.Warning('Lot is not in the order', lotNumber, 'barcode');
    } 


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0
            && this.dataSource().every(x => x.Qty == x.QtyChecked);
    });  


    /** */
    protected async Save() { 
        const aswer = await this.alert.SuccessConfirm(`Confirm transaction<br>#<b>${this.transaction()}</b><br>${this.dataSource().length} Lots?`, 'save');
         
        if(aswer) {
            this.isLoading.set(true); 
           
            const response = await this.ccStockInService.SetCCStockIn(this.transaction());
    
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
        this.detail.set(null);
        this.detailList.set([]);
        this.dataSource.set([]); 
    } 


    /** */
    protected ShowDetail(stock: IDataSourceQty) { 
        this.detail.set(stock);
        this.detailList.set([ ...stock.Detail ]);
        this.modal().Open();
    }  
}