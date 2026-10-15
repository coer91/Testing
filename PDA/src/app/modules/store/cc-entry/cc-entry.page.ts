import { CC_ENTRY_DETAIL_DTO, CC_ENTRY_DTO, CcEntryService } from './cc-entry.service';
import { Component, computed, inject, signal, viewChild } from '@angular/core';   
import { DataSessionService, MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { WIAModal } from 'hwmx-angular/components'; 
import { Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'cc-entry-page',
    templateUrl: './cc-entry.page.html', 
    standalone: false
})
export class CcEntryPage extends PagePDA {  
 
    constructor() { super('MM_IN0202') }  

    //Services    
    private service = inject(CcEntryService); 
    private masterService = inject(MasterService); 
    private dataSessionService = inject(DataSessionService);  

    //Elements
    protected readonly modal = viewChild.required<WIAModal>('modal');

    //Variables 
    private readonly PAGE_CODE = '[MM_IN0202]CC Entry';
    protected readonly detail      = signal<CC_ENTRY_DETAIL_DTO | null>(null);   
    protected readonly dataSource  = signal<CC_ENTRY_DETAIL_DTO[]>([]);   
    protected readonly detailList  = signal<CC_ENTRY_DTO[]>([]);     


    /** */
    protected override async StartPage() { 
        this.isLoadingSession = true;
        const DATA_SESSION = await this.dataSessionService.GetLastDataSession(this.PAGE_CODE);

        if(DATA_SESSION.length > 0) {
            const operation = DATA_SESSION[0].OPERATION;
            await this.OnScanCode(operation);
            
            for(const item of DATA_SESSION) { 
                const lot = JSON.parse(item.DETAIL_JSON);
                this.LoadCheck(lot); 
            } 
        }

        this.isLoadingSession = false;
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
            this.detailList.set([ ...(this.detail()?.DETAIL || []) ]);
        }        

        this.isLoading.set(false);
    }  
    

    /** */
    protected async GetDataSource(scanner: string) {     
        this.dataSource.set([]);

        if(!Scanner.IsEncoded(scanner)) {
            const response = await this.service.GetCcEntry(scanner); 
            
            if(response.length > 0) {   
                const DATA_SOURCE: CC_ENTRY_DETAIL_DTO[] = [];
                
                const PART_NUMBER_LIST = response.reduce((response: any, item) => {             
                    if (!response[item.PART_NUMBER]) response[item.PART_NUMBER] = [];
                    response[item.PART_NUMBER].push(item);        
                    return response;
                }, {}); 
                        
                for(const partNumber in PART_NUMBER_LIST) { 
                    DATA_SOURCE.push({
                        PART_NUMBER: partNumber,
                        QTY: PART_NUMBER_LIST[partNumber].length,
                        QTY_CHECKED: 0,
                        DETAIL: PART_NUMBER_LIST[partNumber]
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
        const MATERIAL    = DATA_SOURCE.find(item => item.PART_NUMBER.equals(parsedCode.PartNumber)); 
        const LOT         = MATERIAL?.DETAIL.find(item => item.LOT_NUMBER.equals(parsedCode.LotNumber));
        
        if(MATERIAL && LOT) { 
            if(LOT.QTY_CHECKED <= 0) {  
                if(!this.isLoadingSession) { 
                    const LOT_INFORMATION = await this.masterService.GetLotInformation(parsedCode.LotNumber);

                    if(Tools.IsNull(LOT_INFORMATION)) {
                        this.translatory.alert.NoData(parsedCode.LotNumber);
                        return;
                    }

                    if(LOT_INFORMATION!.IS_DELETED.equals('Y')) { 
                        this.translatory.alert.LotDeleted(parsedCode.LotNumber);
                        return;
                    } 

                    else if(LOT_INFORMATION!.HAS_DEFECT.equals('Y')) {
                        this.translatory.alert.LotWithDefect(parsedCode.LotNumber);
                        return;
                    }


                    const SESSION_STATUS = await this.dataSessionService.AddDataSession(this.PAGE_CODE, this.transaction(), parsedCode.LotNumber, JSON.stringify(LOT)); 
                    if(!SESSION_STATUS.equals('OK')) return;
                }

                LOT.QTY_CHECKED = Number(parsedCode.Qty);
                MATERIAL.QTY_CHECKED = MATERIAL.DETAIL.filter(x => x.QTY_CHECKED > 0).length; 
                this.dataSource.set([...DATA_SOURCE]); 
            }

            else this.translatory.alert.LotAlreadyScanned(parsedCode.LotNumber);
        }

        else this.translatory.alert.LotNotInOrder(parsedCode.LotNumber);
    }  


    /** */
    protected async LoadCheck(lot: CC_ENTRY_DTO) {          
        
        const DATA_SOURCE = [...this.dataSource()];
        const MATERIAL    = DATA_SOURCE.find(item => item.PART_NUMBER.equals(lot.PART_NUMBER)); 
        const LOT         = MATERIAL?.DETAIL.find(item => item.LOT_NUMBER.equals(lot.LOT_NUMBER));
        
        if(MATERIAL && LOT) { 
            if(LOT.QTY_CHECKED <= 0) {  
                LOT.QTY_CHECKED = Number(lot.QTY);
                MATERIAL.QTY_CHECKED = MATERIAL.DETAIL.filter(x => x.QTY_CHECKED > 0).length; 
                this.dataSource.set([...DATA_SOURCE]); 
            } 
        }

        else this.translatory.alert.LotNotInOrder(lot.LOT_NUMBER);
    }  


    /** */
    protected async Save() { 
        const qtyLots = this.dataSource().reduce((qty: number, item: CC_ENTRY_DETAIL_DTO) => (qty + item.DETAIL.length), 0);
        const aswer = await this.translatory.confirm.SaveTransaction(this.transaction(), qtyLots); 
         
        if(aswer) {
            this.isLoading.set(true); 
           
            const response = await this.service.SetCcEntry(this.transaction());
    
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
            const qtyLots = this.dataSource().reduce((qty: number, item: CC_ENTRY_DETAIL_DTO) => (qty + item.DETAIL.length), 0);
            const response = await this.translatory.confirm.CancelTransaction(this.transaction(), qtyLots);  
            if(!response) return; 
        }

        this.isLoading.set(true);

        if(this.transaction().isNotOnlyWhiteSpace()) {
            await this.dataSessionService.ClearDataSession(this.PAGE_CODE, this.transaction());
        }

        this.transaction.set('');
        this.detail.set(null);
        this.detailList.set([]);
        this.dataSource.set([]); 

        this.isLoading.set(false);
    } 


    /** */
    protected ShowDetail(stock: CC_ENTRY_DETAIL_DTO) { 
        this.detail.set(stock);
        this.detailList.set([ ...stock.DETAIL ]);
        this.modal().Open();
    }  


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().every(x => x.QTY == x.QTY_CHECKED)
            && this.dataSource().length > 0;
    });    


    /** */
    protected counter = computed(() => {   
        return this.transaction().isNotOnlyWhiteSpace() ? `
            <h4 class="width-100 text-align-right color-gray"> 
                ${this.dataSource().reduce((qty, item) => qty += item.QTY_CHECKED, 0)} / 
                ${this.dataSource().reduce((qty, item) => qty += item.QTY, 0)}
                <i class="iw-barcode font-size-20px"></i>  
            </h4>
        `.cleanUpBlanks() : ''; 
    }); 


    /** */
    protected counterDetail = computed(() => {
        return this.transaction().isNotOnlyWhiteSpace() && this.IsNotNull(this.detail()) ? `
            <h4 class="width-100 text-align-right color-gray"> 
                ${this.detailList().filter((item: any) => item.QTY_CHECKED > 0).length} / ${this.detailList().length}
                <i class="iw-barcode font-size-20px"></i>  
            </h4>
        ` : ''; 
    });
}