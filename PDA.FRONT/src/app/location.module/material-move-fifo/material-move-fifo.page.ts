import { IIssueRequest, ILotFIFO } from '../material-move/material-move.interface';
import { MaterialMoveService } from '../material-move/material-move.service';
import { Component, computed, inject, signal, viewChild } from '@angular/core';   
import { ILotInformation } from '@appShared/interfaces';
import { MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { WIAModal } from 'hwmx-angular/components';
import { Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'material-move-fifo-page',
    templateUrl: './material-move-fifo.page.html', 
    standalone: false
})
export class MaterialMoveFIFOPage extends PagePDA {  
 
    constructor() { super('MM_LM0103') }  

    //Inject   
    private masterService       = inject(MasterService);  
    private materialMoveService = inject(MaterialMoveService);  

    //Elements
    protected readonly modal = viewChild.required<WIAModal>('modal');
    protected readonly modalFIFO = viewChild.required<WIAModal>('modalFIFO');

    //Variables
    protected readonly detail      = signal<IIssueRequest | null>(null);  
    protected readonly dataSource  = signal<IIssueRequest[]>([]); 
    protected readonly fifoList    = signal<ILotFIFO[]>([]); 
    protected readonly lot         = signal<ILotInformation | null>(null);  
    protected readonly storageCode = signal<string>('');  


    /** */
    protected override async OnScanCode(scanner: string) { 
        this.isLoading.set(true);     
                 
        if(Tools.IsOnlyWhiteSpace(this.transaction())) {
            await this.GetDataSource(scanner);
        }

        else {
            await this.CheckLot(scanner);
        }        
 
        this.isLoading.set(false);
    } 


    /** */
    protected async GetDataSource(issueNumber: string) {    
        const response = await this.materialMoveService.GetMaterialByIssue(issueNumber); 
                 
        if(response.length > 0) {  
            this.dataSource.set(response); 
            this.transaction.set(issueNumber);
            this.storageCode.set(response[0].StorageCode);
        } 
    }


    /** Check LotNumber */
    protected async CheckLot(scanner: string) {

        const lotNumber = Scanner.DecodeProperty(scanner, 'lotNumber');         
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

            //Reset Detail
            if(this.detail()) {
                const DETAIL = { ...this.detail()! };

                this.detail.set(null);
                Tools.Sleep().then(() => this.detail.set(DETAIL)); 
            }  
        } 
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

            else if(lot.StorageCode.equals(this.storageCode())) {
                this.alert.Warning("You can't transfer to same storage", lotNumber, 'barcode');
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

            else if(!this.dataSource().some(x => x.PartNumber.equals(lot.PartNumber))) {
                this.alert.Warning(`Part number <b>${lot.PartNumber}</b><br>no exists in this order`, this.transaction(), 'barcode');
                return null;
            }

            const LOT_LIST = (this.dataSource().find(item => item.PartNumber.equals(lot.PartNumber))?.Detail || []) as ILotFIFO[];
            let FIFO_LIST = await this.materialMoveService.GetLotFIFO(lot.PartNumber, lot.LotNumber);
            FIFO_LIST = FIFO_LIST.except(LOT_LIST, 'LotNumber');    
            
            if(FIFO_LIST.length > 0) {
                const FIFO = FIFO_LIST[0];
                
                if(!FIFO.InputDate.equals(lot.InputDate)) {
                    FIFO_LIST = FIFO_LIST.except([lot], 'LotNumber'); 
                    this.fifoList.set(FIFO_LIST);
                    this.lot.set(lot);
                    this.modalFIFO().Open(); 
                    return null; 
                }
            } 
            
            else return null; 
            
            return lot;
        }

        return null;
    } 


    /** */
    protected async Save() { 
        let message = `Confirm transaction<br>`;
        message += `#<b>${this.transaction()}</b><br>`; 
        message += `${this.dataSource().reduce((qty, item) => qty + item.Detail.length, 0)} Lots `;
        message += `to storage <b>${this.storageCode()}</b> ?`;
                
        if(await this.alert.SuccessConfirm(message, 'save')) {
            this.isLoading.set(true); 
           
            const issueNumber = this.transaction();
            const lotNumberList = this.dataSource().flatMap(item => item.Detail.flatMap(x => x.LotNumber));
            const response = await this.materialMoveService.MoveMaterial(issueNumber, lotNumberList);
    
            if(response.ok) this.Cancel(false);                        
            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const response = await this.alert.WarningConfirm(`Cancel transaction #<b>${this.transaction()}</b> ?`);
            if(!response) return; 
        }

        this.lot.set(null);
        this.detail.set(null);
        this.storageCode.set('');
        this.transaction.set(''); 
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