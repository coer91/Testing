import { Component, computed, inject, signal, viewChild } from '@angular/core';   
import { ILotInformationChecked, ILotInformationMaterial } from '@appShared/interfaces'; 
import { CcEntryService } from './cc-entry.service';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { WIAModal } from 'hwmx-angular/components'; 

@Component({
    selector: 'cc-entry-page',
    templateUrl: './cc-entry.page.html', 
    standalone: false
})
export class CcEntryPage extends PagePDA {  
 
    constructor() { super('MM_IN0202') }  

    //Services    
    private service = inject(CcEntryService);  

    //Elements
    protected readonly modal = viewChild.required<WIAModal>('modal');

    //Variables         
    protected readonly detail      = signal<ILotInformationMaterial | null>(null);   
    protected readonly dataSource  = signal<ILotInformationMaterial[]>([]);   
    protected readonly detailList  = signal<ILotInformationChecked[]>([]);  


    /** */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);  
                 
        if(this.transaction().isOnlyWhiteSpace()) {
            await this.GetDataSource(scanner);
        }

        else {
            await this.Check(scanner);
            this.detailList.set([ ...(this.detail()?.Detail || []) ]);
        }        

        this.isLoading.set(false);
    }  
    

    /** */
    protected async GetDataSource(scanner: string) {           
        this.dataSource.set([]);

        if(!Scanner.IsEncoded(scanner)) {
            const response = await this.service.GetCCStockIn(scanner); 
            
            if(response.length > 0) {   
                const DATA_SOURCE: ILotInformationMaterial[] = [];
                
                const PART_NUMBER_LIST = response.reduce((response: any, item) => {             
                    if (!response[item.PartNumber]) response[item.PartNumber] = [];
                    response[item.PartNumber].push(item);        
                    return response;
                }, {}); 
                        
                for(const partNumber in PART_NUMBER_LIST) { 
                    DATA_SOURCE.push({
                        PartNumber: partNumber,
                        Qty: PART_NUMBER_LIST[partNumber].reduce(
                            (response: number, item: ILotInformationChecked) => response + Number(item.Qty), 0
                        ),
                        QtyChecked: 0,
                        Detail: PART_NUMBER_LIST[partNumber]
                    });
                } 

                this.dataSource.set(DATA_SOURCE); 
                this.transaction.set(scanner);
            }      
        }

        else this.translatory.alert.InvalidCode(scanner);
    }


    /** */
    protected async Check(scanner: string) {        
        const parsedCode = Scanner.Decode(scanner);
        
        if(parsedCode.Message != 'OK') {
            this.alert.Warning(parsedCode.Message, scanner, 'barcode');
            return;
        }          
        
        const DATA_SOURCE = [...this.dataSource()];
        const MATERIAL    = DATA_SOURCE.find(item => item.PartNumber.equals(parsedCode.PartNumber)); 
        const LOT         = MATERIAL?.Detail.find(item => item.LotNumber.equals(parsedCode.LotNumber));
        
        if(MATERIAL && LOT) {
            if(LOT.QtyChecked <= 0) {                
                LOT.QtyChecked = Number(parsedCode.Qty);
                MATERIAL.QtyChecked += LOT.QtyChecked;
                this.dataSource.set(DATA_SOURCE); 
            }

            else this.translatory.alert.LotAlreadyScanned(parsedCode.LotNumber);
        }

        else this.translatory.alert.LotNotInOrder(parsedCode.LotNumber);
    } 


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0
            && this.dataSource().every(x => x.Qty == x.QtyChecked);
    });  


    /** */
    protected async Save() { 
        const qtyLots = this.dataSource().reduce((qty: number, item: ILotInformationMaterial) => (qty + item.Detail.length), 0);
        const aswer = await this.alert.SuccessConfirm(`Confirm transaction<br>#<b>${this.transaction()}</b><br>${qtyLots} Lots?`, 'save');
         
        if(aswer) {
            this.isLoading.set(true); 
           
            const response = await this.service.SetCCStockIn(this.transaction());
    
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
            const qtyLots = this.dataSource().reduce((qty: number, item: ILotInformationMaterial) => (qty + item.Detail.length), 0);
            const response = await this.alert.WarningConfirm(`Cancel transaction<br>#<b>${this.transaction()}</b><br>${qtyLots} Lots?`);
            if(!response) return; 
        }

        this.transaction.set('');
        this.detail.set(null);
        this.detailList.set([]);
        this.dataSource.set([]); 
    } 


    /** */
    protected ShowDetail(stock: ILotInformationMaterial) { 
        this.detail.set(stock);
        this.detailList.set([ ...stock.Detail ]);
        this.modal().Open();
    }  


    /** */
    protected indicator = computed(() => {
        return `${this.dataSource().filter(item => item.QtyChecked > 0 && item.QtyChecked == item.Qty).length} / ${ this.dataSource().length }`;
    });


    /** */
    protected indicatorByMaterial = computed(() => {
        return `${this.detailList().filter((item: any) => item.QtyChecked > 0).length} / ${ this.detailList().length }`;
    }); 
}