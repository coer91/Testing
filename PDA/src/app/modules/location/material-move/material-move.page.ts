import { Component, computed, inject, input, signal, viewChild } from '@angular/core';    
import { MATERIAL_ISSUE_DTO, MoveMaterialService } from './material-move.service';
import { LOT_INFORMATION_DTO } from '@appShared/interfaces';
import { TRANSLATORY } from './material-move.translatory';
import { MaterialFIFO } from '@appShared/components';
import { PagePDA, Scanner } from '@appShared/tools';  
import { MasterService } from '@appShared/services';
import { WIAModal } from 'hwmx-angular/components';
import { Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'material-move-page',
    templateUrl: './material-move.page.html', 
    standalone: false
})
export class MaterialMovePage extends PagePDA {  
 
    constructor() { super('MM_LM0102') }   
    protected override readonly TRANSLATORY = new TRANSLATORY(this.language()); 

    //Elements
    protected readonly materialFIFO = viewChild.required<MaterialFIFO>('materialFIFO');
    protected readonly modal = viewChild.required<WIAModal>('modal');

    //Services 
    private readonly masterService = inject(MasterService); 
    private readonly service = inject(MoveMaterialService); 

    //Inputs
    public readonly useFIFO = input<boolean>(false); 

    //Variables     
    protected readonly storageCode = signal<string>('');   
    protected readonly dataSource  = signal<MATERIAL_ISSUE_DTO[]>([]); 
    protected readonly detail      = signal<MATERIAL_ISSUE_DTO | null>(null);  
     
    /** */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);        
        
        if(this.transaction().isOnlyWhiteSpace()) {
            await this.GetDataSource(scanner);

            if(this.dataSource().length <= 0) {
                this.alert.Warning('No Data for this order', scanner, 'barcode');  
            }           
        }

        else {
            await this.Check(scanner);
        }             
 
        this.isLoading.set(false);
    } 


    /** */
    protected async GetDataSource(scanner: string) { 
        this.dataSource.set([]);
        this.transaction.set('');    
        
        const response = await this.service.GetIssueReq(scanner);
         
        if(response.length > 0) {            
            this.storageCode.set(response[0].STORAGE_CODE);
            this.dataSource.set(response);
            this.transaction.set(scanner); 
        }  
    }


    /** */
    protected async Check(scanner: string) {
        const lotNumber = Scanner.DecodeProperty(scanner, 'LotNumber');
        const lot = await this.GetLot(lotNumber);

        if(lot) {
            const DATA_SOURCE = [...this.dataSource()];
            const MATERIAL = DATA_SOURCE.find(item => item.PART_NUMBER.equals(lot.PART_NUMBER));
            
            if(MATERIAL) {
                MATERIAL.DETAIL.push(lot);
                MATERIAL.QTY_CHECKED = MATERIAL.DETAIL.reduce((qty: number, item: LOT_INFORMATION_DTO) => (qty + item.QTY), 0);
            }

            this.dataSource.set(DATA_SOURCE);
        }
    } 


    /** */
    protected async GetLot(lotNumber: string) {
        if(lotNumber.isOnlyWhiteSpace()) return null;

        if(this.dataSource().some(item => item.DETAIL.some(itemDetail => itemDetail.LOT_NUMBER.equals(lotNumber)))) {
            this.translatory.alert.LotAlreadyScanned(lotNumber);
            return null;
        }

        const lot = await this.masterService.GetLotInformation(lotNumber);

        if(lot) {
            if(lot.IS_DELETED.equals('Y')) { 
                this.translatory.alert.LotDeleted(lotNumber);
                return null;
            } 

            else if(lot.HAS_DEFECT.equals('Y')) {
                this.translatory.alert.LotWithDefect(lotNumber);
                return null;
            }

            if(!this.dataSource().some(item => item.PART_NUMBER.equals(lot.PART_NUMBER))) { 
                this.translatory.alert.MaterialNotInOrder(lot.PART_NUMBER);
                return null;
            }
            
            if([this.storageCode(), 'A000', 'V000', 'A110', 'V110', 'A200', 'V200', 'A300', 'V300'].includes(lot.STORAGE_CODE)) {
                this.translatory.alert.CannotMoveToSameStorage(lot.STORAGE_CODE);
                return null;
            }
            
            else if(lot.HAS_INSPECTION.equals('N')) { 
                this.alert.Warning("Doesn't finished inspection for quality", lotNumber, 'barcode');
                return null;
            }

            else if(lot.HAS_EO.equals('N')) {
                this.alert.Warning('Blocked EO for production control team', lotNumber, 'barcode');
                return null;
            }  

            return lot;
        }

        return null;
    }   


    /** */
    protected async Save() {
        const lotNumberList = this.dataSource().flatMap(item => item.DETAIL.map(item => item.LOT_NUMBER)); 
        const aswer = await this.translatory.confirm.SaveTransaction(this.transaction(), lotNumberList.length); 
         
        if(aswer) {
            this.isLoading.set(true);             
            
            const response = await this.service.MoveMaterialList(this.transaction(), lotNumberList);
    
            if(response.ok) {
                await this.GetDataSource(this.transaction());
                this.alert.Success(response.data, this.transaction(), 'save');                 
            }
            
            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) { 
            const quantity = this.dataSource().reduce((qty, item) => (qty += item.DETAIL.length), 0);

            if(quantity > 0) {
                const response = await this.translatory.confirm.CancelTransaction(this.transaction(), quantity);
                if(!response) return; 
            }
        }

        this.detail.set(null);
        this.storageCode.set('');
        this.transaction.set(''); 
        this.dataSource.set([]); 
    } 


    /** */
    protected async RemoveLot(lot: LOT_INFORMATION_DTO) {
        const { LOT_NUMBER, PART_NUMBER } = lot;
        
        if(await this.translatory.confirm.RemoveLot(LOT_NUMBER)) {            
            const DATA_SOURCE = [...this.dataSource()];
            const MATERIAL    = DATA_SOURCE.find(item => item.PART_NUMBER.equals(PART_NUMBER)); 

            if(MATERIAL) {
                MATERIAL.DETAIL = [...MATERIAL.DETAIL].filter(item => !item.LOT_NUMBER.equals(LOT_NUMBER));
                MATERIAL.QTY_CHECKED = MATERIAL.DETAIL.reduce((qty: number, lot: LOT_INFORMATION_DTO) => qty + lot.QTY, 0);
                this.dataSource.set([...DATA_SOURCE]);  

                if(MATERIAL.DETAIL.length <= 0) {
                    this.modal().Close();
                }

                this.detail.set(null);
                Tools.Sleep().then(() => this.detail.set(MATERIAL)); 
            } 
        }           
    }


    /** */
    protected counter = computed<string>(() => { 
        const qty = this.dataSource().reduce((qty, item) => (qty += item.DETAIL.length), 0);
        return this.transaction().isNotOnlyWhiteSpace() && this.dataSource().length > 0 ? `
            <h4 class="width-100 flex-middle-between color-gray">
                <span> ${this.dataSource()[0].STORAGE} </span>

                <span>
                    ${qty > 0 ? `${qty} <i class="iw-barcode font-size-20px"></i>` : '' }                                   
                </span>
            </h4>
        ` : ''; 
    }); 


    /** */
    protected counterDetail = computed(() => {
        return this.transaction().isNotOnlyWhiteSpace() && this.IsNotNull(this.detail()) ? `
            <h4 class="width-100 flex-middle-between color-gray"> 
                <span>
                    ${this.detail()?.QTY_CHECKED} / ${this.detail()?.QTY}                               
                </span>

                <span>
                    ${this.detail()?.DETAIL.length}
                    <i class="iw-barcode font-size-20px"></i>                
                </span>
            </h4>
        ` : ''; 
    });
 

    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0
            && this.dataSource().some(x => x.QTY_CHECKED > 0);
    }); 


    /** */
    protected showDeleteButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0
            && Tools.IsNotNull(this.detail())
            && (this.detail()!.QTY_CHECKED > this.detail()!.QTY)   
    });
}