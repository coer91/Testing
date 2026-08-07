import { Component, computed, inject, signal, viewChild } from '@angular/core';   
import { TROLLY_ORDER_DTO, TrollyConfigurationService } from './trolly-configuration.service'; 
import { JoinLot, SplitLot } from '@appShared/components';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { MasterService } from '@appShared/services';
import { WIAModal } from 'hwmx-angular/components';
import { Tools } from 'hwmx-angular/tools';
import { LOT_INFORMATION_DTO } from '@appShared/interfaces';

@Component({
    selector: 'trolly-configuration-page',
    templateUrl: './trolly-configuration.page.html', 
    standalone: false
})
export class TrollyConfigurationPage extends PagePDA {  
 
    constructor() { super('MM_LM0401') }   

    //Inject     
    private masterService = inject(MasterService);  
    private service = inject(TrollyConfigurationService);  

    //Elements
    protected readonly modal       = viewChild.required<WIAModal>('modal'); 
    protected readonly splitLotRef = viewChild<SplitLot>('splitLotRef');
    protected readonly joinLotRef  = viewChild<JoinLot>('joinLotRef');

    //Variables           
    protected readonly productionDate = signal<string>('');   
    protected readonly sequencePlan   = signal<number>(0);   
    protected readonly trollyGroup    = signal<string>('');   
    protected readonly detail         = signal<TROLLY_ORDER_DTO | null>(null);
    protected readonly dataSource     = signal<TROLLY_ORDER_DTO[]>([]); 
    protected readonly view           = signal<'trolly' | 'split' | 'join'>('trolly'); 
   

    /**  */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);     

        if(this.view().equals('split')) {
            this.splitLotRef()?.OnScanCode(scanner);
        }

        else if(this.view().equals('join')) {
            this.joinLotRef()?.OnScanCode(scanner);
        }
        
        else if(Tools.IsOnlyWhiteSpace(this.transaction())) {
            await this.GetDataSource(scanner);
        }

        else {
            this.Check(scanner);
        } 
 
        this.isLoading.set(false);
    }


    /** */
    protected async GetDataSource(scanner: string) {          
        
        const orderArray: string[] = scanner.split(' ').filter(x => x.trim().isNotOnlyWhiteSpace());
        
        if(orderArray.length >= 3) {
            let message = '';
            const [productionDate, sequencePlan, trollyGroup] = orderArray;

            //Get productionDate
            if(Tools.IsNotOnlyWhiteSpace(productionDate)) this.productionDate.set(productionDate);            
            else message = 'Production date not provided'; 

            //Get sequencePlan
            if(Tools.IsNotOnlyWhiteSpace(sequencePlan)) this.sequencePlan.set(Number(sequencePlan));
            else message = 'Sequence plan not provided'; 
            
            //Get trollyGroup
            if(Tools.IsNotOnlyWhiteSpace(trollyGroup)) this.trollyGroup.set(trollyGroup);
            else message = 'Trolly group not provided'; 

            if(message.isNotOnlyWhiteSpace()) {
                this.alert.Warning(scanner, message, 'barcode');
                await this.Cancel(false);
                return;
            }            
            
            const response = await this.service.GetTrollyOrder(this.productionDate(), this.sequencePlan(), this.trollyGroup()); 
             
            if(response.length > 0) {
                this.dataSource.set(response);
                this.transaction.set(`${response[0].PRODUCTION_DATE} [Seq: ${sequencePlan} ${trollyGroup}]`); 
            }
        }

        else this.translatory.alert.InvalidCode(scanner);  
    }


    /** Second Scan */
    protected async Check(scanner: string) {        
        const lotNumber = Scanner.DecodeProperty(scanner, 'LotNumber');
        const lot = await this.GetLot(lotNumber);     

        if(lot) {
            const DATA_SOURCE = [...this.dataSource()];
             
            const MATERIAL = DATA_SOURCE.find(item => item.PART_NUMBER.equals(lot.PART_NUMBER));

            //Add Lot By Material
            if(MATERIAL) {
                MATERIAL.DETAIL.push(lot);
                MATERIAL.QTY_CHECKED = MATERIAL.DETAIL.reduce((qty: number, lot: LOT_INFORMATION_DTO) => qty + lot.QTY, 0); 
                this.dataSource.set(DATA_SOURCE); 
            } 

            else {
                this.alert.Warning('This material is not in the order', lot.PART_NUMBER, 'iw-box-fill font-size-30px');
            } 
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

            else if(!['A100', 'V100'].includes(lot.STORAGE_CODE)) {
                this.alert.Warning(`This lot is in <b>${lot.STORAGE_CODE}</b><br>Must be in [A100, V100]`, lotNumber, 'barcode');
                return null;
            }

            else if(lot.HAS_DEFECT.equals('Y')) {
                this.translatory.alert.LotWithDefect(lotNumber);
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
            
            const trollyLot = await this.service.GetLotInTrolly(lotNumber);

            if(trollyLot.ok) { 
                if(Tools.IsNull(trollyLot.data)) {
                    return lot;
                }

                this.alert.Warning("Registered lot", lotNumber, 'barcode');
            } 
        }

        return null;
    }   


    /** */
    protected async Save() { 
        let message = `Confirm transaction<br>`;
        message += `<b>${this.dataSource()[0].PRODUCTION_DATE}</b><br>`; 
        message += `SEQ: ${this.sequencePlan()} ${this.trollyGroup()}<br>`; 
        message += `${this.dataSource().reduce((qty, item) => qty + item.DETAIL.length, 0)} Lots ?`;
                
        if(await this.alert.SuccessConfirm(message, 'save')) {
            this.isLoading.set(true); 
           
            const productionDate = this.productionDate();
            const sequencePlan   = this.sequencePlan();
            const lotNumberList  = this.dataSource().flatMap(item => item.DETAIL.flatMap(x => x.LOT_NUMBER));
            const response       = await this.service.SetOrderTrolly(productionDate, sequencePlan, lotNumberList);
    
            if(response.ok) {
                console.log(response)
                this.alert.Success(response.data);      
                await this.Cancel(false);
            }   

            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const qty = this.dataSource().reduce((qty, item) => qty + item.DETAIL.length, 0);
            const response = await this.translatory.confirm.CancelTransaction(this.transaction(), qty);
            if(!response) return; 
        }
         
        this.transaction.set('');
        this.productionDate.set('');
        this.sequencePlan.set(0);
        this.trollyGroup.set('');
        this.detail.set(null);
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

                this.detail.set(null);    
                Tools.Sleep().then(() => this.detail.set(MATERIAL)); 
            } 
        }           
    } 


    /** */
    protected counter = computed(() => {  
        const counter = this.dataSource().reduce((qty: number, item: TROLLY_ORDER_DTO) => (qty + item.DETAIL.length), 0);
        return this.transaction().isNotOnlyWhiteSpace() && (counter > 0) ? `
            <h4 class="width-100 text-align-right color-gray"> 
                ${counter} <i class="iw-barcode font-size-20px"></i>  
            </h4>
        ` : ''; 
    }); 


    /** */
    protected counterDetail = computed(() => {
        return this.transaction().isNotOnlyWhiteSpace() ? `
            <h4 class="width-100 text-align-right color-gray"> 
                ${this.detail()?.QTY_CHECKED} / ${this.detail()?.QTY} 
                <i class="iw-barcode font-size-20px"></i>  
            </h4>
        ` : ''; 
    });


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0
            && this.dataSource().some(x => x.QTY > 0)
            && this.dataSource().some(x => x.QTY_CHECKED > 0);
    }); 


    /** */
    protected pageTitle = computed<string>(() => {
        switch(this.view()) {
            case 'split': return 'División de Lote';
            case 'join' : return 'Anexionar Lotes';
            default     : return 'Trolly Configuration';
        }
    }); 
}