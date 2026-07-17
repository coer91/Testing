import { TrollyConfigurationService } from './trolly-configuration.service';
import { Component, computed, inject, signal, viewChild } from '@angular/core';   
import { ILotInformation, IOrderTrolly } from '@appShared/interfaces';
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
    private trollyConfigurationService = inject(TrollyConfigurationService);  

    //Elements
    protected readonly modal = viewChild.required<WIAModal>('modal');

    //Variables         
    protected readonly productionDate = signal<string>('');   
    protected readonly sequencePlan   = signal<number>(0);   
    protected readonly trollyGroup    = signal<string>('');   
    protected readonly detail         = signal<IOrderTrolly | null>(null);
    protected readonly dataSource     = signal<IOrderTrolly[]>([]);  

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


    /** First Scan */
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
            
            const response = await this.trollyConfigurationService.GetOrderTrolly(this.productionDate(), this.sequencePlan(), this.trollyGroup()); 

            if(response.length > 0) {
                this.dataSource.set(response);
                this.transaction.set(`${response[0].ProductionDate} [Seq: ${sequencePlan} ${trollyGroup}]`);
            }
        }

        else this.alert.Warning(scanner, 'Invalid Code', 'barcode');  
    }


    /** Second Scan */
    protected async Check(scanner: string) {        
        // const lotNumber = Scanner.DecodeProperty(scanner, 'lotNumber');
        // const lot = await this.GetLot(lotNumber);     

        // if(lot) {
        //     const DATA_SOURCE = [...this.dataSource()];
        //     const MATERIAL = DATA_SOURCE.find(item => item.PartNumber.equals(lot.PartNumber));

        //     //Add Lot By Material
        //     if(MATERIAL) {
        //         MATERIAL.Detail.push(lot);
        //         MATERIAL.QtyChecked = MATERIAL.Detail.reduce((qty: number, lot: ILotInformation) => qty + lot.Qty, 0); 
        //         this.dataSource.set(DATA_SOURCE);
        //     } 

        //     //Reset Detail
        //     if(this.detail()) {
        //         const DETAIL = { ...this.detail()! };

        //         this.detail.set(null);
        //         Tools.Sleep().then(() => this.detail.set(DETAIL)); 
        //     }  
        // }
    } 


    /** */
    protected async GetLot(lotNumber: string) {
        if(lotNumber.isOnlyWhiteSpace()) return null;

        if(this.dataSource().some(item => item.Detail.some(itemDetail => itemDetail.LotNumber.equals(lotNumber)))) {
            return null;
        }

        const lot = await this.masterService.GetLotInformation(lotNumber);

        if(lot) {
            if(lot.IsDeleted) { 
                this.alert.Warning('This lot has been deleted', lotNumber, 'barcode');
                return null;
            }

            // else if(lot.HasTrolly) {
            //     this.alert.Warning("Registered lot", lotNumber, 'barcode');
            //     return null;
            // }

            else if(['A100', 'V100'].includes(lot.StorageCode)) {
                this.alert.Warning(`Location <b>${lot.StorageCode}</b> is not case rack`, lotNumber, 'barcode');
                return null;
            }

            else if(lot.HasDefect) {
                this.alert.Warning('This lot has defects', lotNumber, 'barcode');
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
            
            return lot;
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
            const response       = await this.trollyConfigurationService.SetOrderTrolly(productionDate, sequencePlan, lotNumberList);
    
            if(response.ok) this.Cancel(false);                        
            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const response = await this.alert.WarningConfirm(`Cancel transaction?`);
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
        
        if(await this.alert.WarningConfirm(`Remove lot<br>#<b>${LotNumber}</b> ?`)) {            
            const DATA_SOURCE = [...this.dataSource()];
            const MATERIAL    = DATA_SOURCE.find(item => item.PartNumber.equals(PartNumber));
            
            if(MATERIAL) {
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
        const qty     = this.dataSource().length;
        const checked = this.dataSource().filter(item => item.Qty == item.QtyChecked).length;

        return qty > 0 ? `
            <h4 class="color-gray width-100 flex-middle-between"> 
                <span>
                    <i class="iw-barcode font-size-20px"></i> ${checked} / ${qty} 
                </span>

                <i class="${checked == qty ? 'iw-check-circle-fill' : ''} color-success font-size-20px"></i>
            </h4>
        ` : ''; 
    });


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.transaction())
            && this.dataSource().length > 0
            && this.dataSource().every(x => x.Qty === x.QtyChecked);
    }); 
}