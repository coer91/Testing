import { TrollyConfigurationService } from './trolly-configuration.service';
import { Component, computed, inject, signal, viewChild } from '@angular/core';   
import { ILotInformation, ITrollyOrder } from '@appShared/interfaces';
import { LotJoin, LotSplit } from '@appShared/components';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { MasterService } from '@appShared/services';
import { WIAModal } from 'hwmx-angular/components';
import { Tools } from 'hwmx-angular/tools';

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
    protected readonly modal         = viewChild.required<WIAModal>('modal'); 
    protected readonly lotSplitRef   = viewChild<LotSplit>('lotSplitRef');
    protected readonly lotJoinRef    = viewChild<LotJoin>('lotJoinRef');

    //Variables           
    protected readonly productionDate   = signal<string>('');   
    protected readonly sequencePlan     = signal<number>(0);   
    protected readonly trollyGroup      = signal<string>('');   
    protected readonly detail           = signal<ITrollyOrder | null>(null);
    protected readonly dataSource       = signal<ITrollyOrder[]>([]); 
    protected readonly view             = signal<'trolly' | 'split' | 'join'>('trolly'); 
   

    /**  */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);     

        if(this.view().equals('split')) {
            this.lotSplitRef()?.OnScanCode(scanner);
        }

        else if(this.view().equals('join')) {
            this.lotJoinRef()?.OnScanCode(scanner);
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
                this.transaction.set(`${response[0].ProductionDate} [Seq: ${sequencePlan} ${trollyGroup}]`); 
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
             
            const MATERIAL = DATA_SOURCE.find(item => item.PartNumber.equals(lot.PartNumber));

            //Add Lot By Material
            if(MATERIAL) {
                MATERIAL.Detail.push(lot);
                MATERIAL.QtyChecked = MATERIAL.Detail.reduce((qty: number, lot: ILotInformation) => qty + lot.Qty, 0); 
                this.dataSource.set(DATA_SOURCE);
            } 

            else {
                this.alert.Warning('This material is not in the order', lot.PartNumber, 'iw-box-fill font-size-30px');
            } 
        }
    } 


    /** */
    protected async GetLot(lotNumber: string) {
        if(lotNumber.isOnlyWhiteSpace()) return null;

        if(this.dataSource().some(item => item.Detail.some(itemDetail => itemDetail.LotNumber.equals(lotNumber)))) {
            this.translatory.alert.LotAlreadyScanned(lotNumber);
            return null;
        }

        const lot = await this.masterService.GetLotInformation(lotNumber);

        if(lot) {
            if(lot.IsDeleted) { 
                this.translatory.alert.LotDeleted(lotNumber);
                return null;
            } 

            else if(['A100', 'V100'].includes(lot.StorageCode)) {
                this.alert.Warning(`Location <b>${lot.StorageCode}</b> is not case rack`, lotNumber, 'barcode');
                return null;
            }

            else if(lot.HasDefect) {
                this.translatory.alert.LotWithDefect(lotNumber);
                return null;
            } 

            else if(!lot.HasInspection) { 
                this.alert.Warning("Doesn't finished inspection for quality", lotNumber, 'barcode');
                return null;
            }

            else if(!lot.HasEO) {
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
        message += `<b>${this.dataSource()[0].ProductionDate}</b><br>`; 
        message += `SEQ: ${this.sequencePlan()} ${this.trollyGroup()}<br>`; 
        message += `${this.dataSource().reduce((qty, item) => qty + item.Detail.length, 0)} Lots ?`;
                
        if(await this.alert.SuccessConfirm(message, 'save')) {
            this.isLoading.set(true); 
           
            const productionDate = this.productionDate();
            const sequencePlan   = this.sequencePlan();
            const lotNumberList  = this.dataSource().flatMap(item => item.Detail.flatMap(x => x.LotNumber));
            const response       = await this.service.SetOrderTrolly(productionDate, sequencePlan, lotNumberList);
    
            if(response.ok) {
                await this.Cancel(false);
                this.alert.Success(response.message);      
            }   

            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const qty = this.dataSource().reduce((qty, item) => qty + item.Detail.length, 0);
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
    protected async RemoveLot(lot: ILotInformation) {
        const { LotNumber, PartNumber } = lot;
        
        if(await this.translatory.confirm.RemoveLot(LotNumber)) {            
            const DATA_SOURCE = [...this.dataSource()];
            const MATERIAL    = DATA_SOURCE.find(item => item.PartNumber.equals(PartNumber));
            
            if(MATERIAL) {
                MATERIAL.Detail = [...MATERIAL.Detail].filter(item => !item.LotNumber.equals(LotNumber));

                const INDEX = MATERIAL.Detail.findIndex(item => item.LotNumber.equals(LotNumber));
                
                if(INDEX >= 0) {
                    MATERIAL.Detail.splice(INDEX, 1);
                    MATERIAL.QtyChecked = MATERIAL.Detail.reduce((qty: number, lot: ILotInformation) => qty + lot.Qty, 0);
                    this.dataSource.set(DATA_SOURCE); 
                }

                this.detail.set(null);    
                Tools.Sleep().then(() => this.detail.set(MATERIAL)); 
            } 
        }           
    } 


    /** */
    protected counter = computed(() => {  
        return this.transaction().isNotOnlyWhiteSpace() ? `
            <h4 class="width-100 text-align-right color-gray"> 
                ${this.dataSource().filter(item => (item.Qty == item.QtyChecked) && (item.QtyChecked > 0)).length} / ${this.dataSource().length} 
                <i class="iw-barcode font-size-20px"></i>  
            </h4>
        ` : ''; 
    }); 


    /** */
    protected counterDetail = computed(() => {
        return this.transaction().isNotOnlyWhiteSpace() ? `
            <h4 class="width-100 text-align-right color-gray"> 
                ${this.detail()?.QtyChecked} / ${this.detail()?.Qty} 
                <i class="iw-barcode font-size-20px"></i>  
            </h4>
        ` : ''; 
    });


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0
            && this.dataSource().some(x => x.Qty > 0)
            && this.dataSource().every(x => x.Qty === x.QtyChecked);
    }); 
}