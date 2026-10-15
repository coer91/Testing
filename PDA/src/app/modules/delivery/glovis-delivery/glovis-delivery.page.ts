import { GLOVIS_DELIVERY_ORDER_DTO, GlovisDeliveryService } from './glovis-delivery.service';
import { LOT_INFORMATION_DTO, LOT_INFORMATION_MATERIAL_DTO } from '@appShared/interfaces';
import { Component, computed, inject, signal, viewChild } from '@angular/core';    
import { WIAModal, WIASelectBox } from 'hwmx-angular/components';
import { PagePDA, Scanner } from '@appShared/tools';
import { Tools } from 'hwmx-angular/tools'; 

@Component({
    selector: 'glovis-delivery-page',
    templateUrl: './glovis-delivery.page.html', 
    standalone: false
})
export class GlobisDeliveryPage extends PagePDA {  
 
    constructor() { super('MM_OT0001') }  

    //Inject     
    private service = inject(GlovisDeliveryService); 

    //elements 
    protected readonly modal = viewChild.required<WIAModal>('modal');
    protected readonly deliveryNumberRef = viewChild.required<WIASelectBox<any>>('deliveryNumberRef');

    //Variables
    protected readonly delivery     = signal<GLOVIS_DELIVERY_ORDER_DTO | null>(null); 
    protected readonly deliveryList = signal<GLOVIS_DELIVERY_ORDER_DTO[]>([]);  
    protected readonly dataSource   = signal<LOT_INFORMATION_MATERIAL_DTO[]>([]);
    protected readonly detail       = signal<LOT_INFORMATION_MATERIAL_DTO | null>(null);   


    /** */
    protected override async StartPage() {   
        await this.GetDeliveryList();       
        super.StartPage(); 
    }


    /** */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true); 

        const lotNumber = Scanner.DecodeProperty(scanner, 'LotNumber'); 

        //Is Scanned
        if(this.dataSource().some(item => item.DETAIL.some(itemDetail => itemDetail.LOT_NUMBER.equals(lotNumber)))) {
            this.translatory.alert.LotAlreadyScanned(lotNumber);
            this.isLoading.set(false);
            return;
        } 

        const lot = await this.service.GetLotInformationGlovis(lotNumber);

        if(lot) {
            const DATA_SOURCE = [...this.dataSource()];
            const MATERIAL = DATA_SOURCE.find(item => item.PART_NUMBER.equals(lot.PART_NUMBER));

            if(Tools.IsNull(MATERIAL)) {
                DATA_SOURCE.push({
                    PART_NUMBER: lot.PART_NUMBER,
                    QTY:         lot.QTY,
                    QTY_CHECKED: 0,
                    DETAIL:      [lot]
                })
            }

            else {
                MATERIAL!.DETAIL.push(lot);
                MATERIAL!.QTY = MATERIAL!.DETAIL.reduce((qty, item) => (qty += item.QTY), 0);
            }

            this.dataSource.set(DATA_SOURCE);
        } 
    
        this.isLoading.set(false);
    } 


    /** */
    protected async Save() { 
        const qtyLots = this.dataSource().reduce((qty, item) => (qty + item.DETAIL.length), 0);
        const aswer = await this.translatory.confirm.SaveTransaction(this.delivery()?.DELIVERY_NUMBER, qtyLots);
         
        if(aswer) {
            this.isLoading.set(true); 

            const deliveryNumber = this.delivery()?.DELIVERY_NUMBER || ''; 
            const lotNumberList = this.dataSource().flatMap(item => item.DETAIL.flatMap(itemDetail => itemDetail.LOT_NUMBER));
            const response = await this.service.DeliveryGlovisOrder(deliveryNumber, lotNumberList);
    
            if(response.ok) {           
                await this.GetDeliveryList();
                await this.Cancel(false);
                this.alert.Success(response.data, null, 'save');                
            }

            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const qtyLots = this.dataSource().reduce((qty, item) => (qty + item.DETAIL.length), 0);
            const response = await this.translatory.confirm.CancelTransaction(this.delivery()?.DELIVERY_NUMBER, qtyLots);  
            if(!response) return; 
        }
        
        this.delivery.set(null);         
        this.detail.set(null); 
        this.dataSource.set([]);   
        
        if(this.deliveryList().length <= 0) {
            await this.GetDeliveryList();
        }
        
        this.delivery.set(this.deliveryList()[0]);         
    } 


    /** */
    protected async RemoveLot(lot: LOT_INFORMATION_DTO) {
        const { LOT_NUMBER, PART_NUMBER } = lot;
        
        if(await this.translatory.confirm.RemoveLot(LOT_NUMBER)) {            
            const DATA_SOURCE = [...this.dataSource()];
            const MATERIAL    = DATA_SOURCE.find(item => item.PART_NUMBER.equals(PART_NUMBER)); 

            if(MATERIAL) {
                MATERIAL.DETAIL = [...MATERIAL.DETAIL].filter(item => !item.LOT_NUMBER.equals(LOT_NUMBER));
                MATERIAL.QTY_CHECKED = MATERIAL.DETAIL.reduce((qty, lot) => qty + lot.QTY, 0);
                this.dataSource.set([...DATA_SOURCE]);  

                this.detail.set(null);    
                Tools.Sleep().then(() => this.detail.set(MATERIAL)); 

                if(MATERIAL.DETAIL.length <= 0) {
                    this.modal().Close();
                }
            } 
        }           
    }  


    /** */
    protected async GetDeliveryList() {
        this.isLoading.set(true);

        const deliveryList = await this.service.GetGlovisDeliveryList();

        if(deliveryList.length <= 0) {
            const deliverNumber = await this.service.GenerateGlovisDelvNum();
            if(deliverNumber) deliveryList.push(deliverNumber);
        }

        this.deliveryList.set(deliveryList);

        if(this.deliveryList().length > 0) {
            this.delivery.set(this.deliveryList()[0]); 
        }

        this.isLoading.set(false);
    }


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.delivery()) 
            && this.dataSource().length > 0 
    });  


    /** */
    protected counter = computed(() => {   
        return this.dataSource().length > 0 ? `
            <h4 class="width-100 text-align-right color-gray"> 
                ${this.dataSource().reduce((qty, item) => (qty + item.DETAIL.length), 0)}
                <i class="iw-barcode font-size-20px"></i>  
            </h4>
        ` : ''; 
    }); 


    /** */
    protected counterDetail = computed(() => {
        return this.dataSource().length > 0 && (this.detail()?.DETAIL.length || 0 > 0) ? `
            <h4 class="width-100 flex-middle-between color-gray">
                <span>
                    ${this.detail()?.DETAIL.reduce((qty, item) => (qty + item.QTY), 0)}
                    ${this.detail()?.DETAIL[0].UNIT}
                </span>

                <span>
                    ${this.detail()?.DETAIL.length || 0} <i class="iw-barcode font-size-20px"></i>                  
                </span>
            </h4>
        ` : ''; 
    });
}