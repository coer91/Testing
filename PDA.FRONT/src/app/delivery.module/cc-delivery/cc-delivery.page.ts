import { Component, computed, inject, signal, viewChild } from '@angular/core';    
import { CCDeliveryService, IDataSource } from './cc-delivery.service';
import { ILotInformation } from '@appShared/interfaces';
import { WIAModal, WIASelectBox } from 'hwmx-angular/components';
import { PagePDA, Scanner } from '@appShared/tools';
import { Tools } from 'hwmx-angular/tools'; 
import { ICallbackItem } from 'hwmx-angular/interfaces';

@Component({
    selector: 'cc-delivery-page',
    templateUrl: './cc-delivery.page.html', 
    standalone: false
})
export class CCDeliveryPage extends PagePDA {  
 
    constructor() { super('MM_OT0001') }  

    //Inject     
    private service = inject(CCDeliveryService); 

    //elements 
    protected readonly modal = viewChild.required<WIAModal>('modal');
    protected readonly deliveryNumberRef = viewChild.required<WIASelectBox<any>>('deliveryNumberRef');

    //Variables
    protected readonly delivery     = signal<string | null>(null); 
    protected readonly deliveryList = signal<string[]>([]);  
    protected readonly dataSource   = signal<IDataSource[]>([]);
    protected readonly detail       = signal<any>(null);   


    /** */
    protected override async StartPage() {         
        const response = await this.service.GetGlovisDeliveryNumberList();
        
        this.deliveryList.set(response);
        
        if(response.length > 0) {
            this.delivery.set(response[0]);
        }

        super.StartPage(); 
    }


    /** */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true); 

        if(Tools.IsNull(this.delivery())){
            this.alert.Warning('Select a delivery number'); 
            Tools.Sleep().then(() => this.deliveryNumberRef().Focus());
        } 
            
        else {
            await this.CheckLot(scanner);            
        }
    
        this.isLoading.set(false);
    }


    /** Check LotNumber */
    protected async CheckLot(scanner: string) {        

        const lotInformation =  await this.GetLot(scanner);
     
        if(lotInformation) {  
            const DATA_SOURCE = [...this.dataSource()];
            let MATERIAL = DATA_SOURCE.find(item => item.PartNumber.equals(lotInformation.PartNumber)); 

            //Add Lot By Material
            if(Tools.IsNull(MATERIAL)) {
                DATA_SOURCE.push({ PartNumber: lotInformation.PartNumber, Qty: 0, Detail: [] });
                MATERIAL = DATA_SOURCE.find(item => item.PartNumber.equals(lotInformation.PartNumber)); 
            }   
            
            MATERIAL!.Detail.push(lotInformation);
            MATERIAL!.Qty = MATERIAL!.Detail.reduce((qty: number, lot: ILotInformation) => (qty + lot.Qty), 0);
            this.dataSource.set(DATA_SOURCE);

            //Reset Detail
            if(this.detail()) {
                const DETAIL = { ...this.detail() } as any;

                this.detail.set(null);
                Tools.Sleep().then(() => this.detail.set(DETAIL)); 
            }  
        } 
    }


    /** */
    protected async GetLot(scanner: string): Promise<ILotInformation | null> {     
        const lotNumber = Scanner.DecodeProperty(scanner, 'lotNumber');        
        
        //Is Scanned
        if(this.dataSource().some(item => item.Detail.some((itemDetail: any) => itemDetail.LotNumber.equals(lotNumber)))) {
            return null;
        }   

        return await this.service.GetLotInfoCC(lotNumber)  
    }


    /** */
    protected async Save() { 
        let message = `Confirm transaction<br>`;
        message += `<b>#${this.delivery()}</b><br>`;
        message += `${this.dataSource().reduce((qty, lot) => (qty + lot.Detail.length), 0) } Lots ?`;
        const aswer = await this.alert.SuccessConfirm(message, 'save');
         
        if(aswer) {
            this.isLoading.set(true); 

            const deliveryNumber = this.delivery() || ''; 
            const lotNumberList = this.dataSource().flatMap(item => item.Detail.flatMap(itemDetail => itemDetail.LotNumber));

            const response = await this.service.DeliveryOrder(deliveryNumber, lotNumberList);
    
            if(response.ok) {
                this.alert.Success(response.data, null, 'save');
                
                this.delivery.set(null);
                const deliveryNumberList = await this.service.GetGlovisDeliveryNumberList();
                this.deliveryList.set(deliveryNumberList); 
                this.Cancel(false);
            }  
            


            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) { 
            const response = await this.alert.WarningConfirm(`Cancel transaction<br><b>#${this.delivery()}</b> ?`);
            if(!response) return; 
        }
         
        this.detail.set(null);
        this.dataSource.set([]);  

        if(Tools.IsOnlyWhiteSpace(this.delivery()) && this.deliveryList().length > 0) {
            this.delivery.set(this.deliveryList()[0]);
        }      
    } 


    /** */
    protected async RemoveLot(lot: ILotInformation) {
        const { LotNumber, PartNumber } = lot;
        
        if(await this.alert.WarningConfirm(`Remove lot<br>#<b>${LotNumber}</b> ?`)) {            
            const DATA_SOURCE = [...this.dataSource()];
            const MATERIAL    = DATA_SOURCE.find(item => item.PartNumber.equals(PartNumber));
            
            if(MATERIAL) {
                let index = MATERIAL.Detail.findIndex((item: any) => item.LotNumber.equals(LotNumber));
                
                if(index >= 0) {
                    MATERIAL.Detail.splice(index, 1);
                    MATERIAL.Qty = MATERIAL.Detail.reduce((qty: number, lot: ILotInformation) => qty + lot.Qty, 0);
                    
                    if(MATERIAL.Detail.length <= 0) {
                        index = DATA_SOURCE.findIndex(item => item.PartNumber.equals(PartNumber));
                        if(index >= 0) DATA_SOURCE.splice(index, 1);
                        this.modal().Close();
                    }

                    this.dataSource.set(DATA_SOURCE); 
                }

                this.detail.set(null);    
                Tools.Sleep().then(() => this.detail.set(MATERIAL)); 
            } 
        }        
    }


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.delivery()) 
            && this.dataSource().length > 0 
    }); 


    /** */
    protected indicator = computed(() => 
        `${this.dataSource().filter(item => item.Qty == item.Qty).length} / ${this.dataSource().length}`
    );


    /** */
    protected template = (item: ICallbackItem<IDataSource>) => `${item.row.Detail.length}`;
}