import { InventoryInspectionService } from './inventory-inspection.service';
import { Component, computed, inject, signal, viewChild } from '@angular/core';   
import { ILotInformation, IInspectionNumber, IStore } from '@appShared/interfaces';
import { WIASelectBox } from 'hwmx-angular/components';
import { MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'inventory-inspection-page',
    templateUrl: './inventory-inspection.page.html', 
    standalone: false
})
export class InventoryInspectionPage extends PagePDA {  
 
    constructor() { super('MM_LT0401') }   

    //Inject   
    private masterService = inject(MasterService);  
    private service = inject(InventoryInspectionService);  

    //elements
    protected readonly storageRef = viewChild.required<WIASelectBox<IStore>>('storageRef');
    protected readonly inspectionNumRef = viewChild.required<WIASelectBox<IInspectionNumber>>('inspectionNumRef');

    //Variables
    protected readonly storage = signal<IStore | null>(null);
    protected readonly storageList = signal<IStore[]>([]);
    protected readonly inspectionNumber = signal<IInspectionNumber | null>(null);
    protected readonly inspectionNumberList = signal<IInspectionNumber[]>([]);
    protected readonly dataSource = signal<ILotInformation[]>([]);

    /** */
    protected override async StartPage() {  
        const factory = '';
        const storageType = 'C,F';
        const response = await this.masterService.GetStorageList(factory, storageType);
        this.storageList.set(response); 

        const STORAGE = this.storageList().find(x => true) || null;
        this.storage.set(STORAGE);  

        await this.GetInspNumberList();
        super.StartPage(); 
    } 


    /** */
    protected async GetInspNumberList() { 
        this.isLoading.set(true);
        this.inspectionNumber.set(null);
        this.inspectionNumberList.set([]);
        this.dataSource.set([]);

        if(this.storage()) {
            const storageCode = this.storage()!.Code;
            const response = await this.service.GetInspNumberList(storageCode);
            this.inspectionNumberList.set(response); 

            if(this.inspectionNumberList().length > 0) {
                this.inspectionNumber.set(this.inspectionNumberList()[0]);
            }
        }       
        
        this.isLoading.set(false);
    }


    /** */
    protected override async OnScanCode(scanner: string) {
        // this.isLoading.set(true); 

        // if(Tools.IsNull(this.storage())){
        //     this.alert.Warning('Select a location'); 
        //     Tools.Sleep().then(() => this.storageRef().Focus());
        // }

        // else if(Tools.IsNull(this.inspectionNumber())){
        //     this.alert.Warning('Inspection number not selected'); 
        //     Tools.Sleep().then(() => this.inspectionNumRef().Focus());
        // }
            
        // else {
        //     const parsedCode = Scanner.Decode(scanner);           
        //     if(parsedCode.lotNumber.isOnlyWhiteSpace() && ['A100', 'V100'].includes(this.storage()!.Code)) {
        //         await this.GetCaseLabel(scanner);
        //     }   
            
        //     else {
        //         await this.Check(scanner);
        //     }  
        // }
 
        // this.isLoading.set(false);
    }


    /** */
    protected async GetCaseLabel(caseLabel: string) {        
        // const storageCode = this.storage()?.Code;
        // const response = await this.masterService.GetCaseLabel(caseLabel, storageCode);

        // if(response.length > 0) { 
        //     const DATA_SOURCE = response
        //         .map(item => ({
        //             LotNumber:  item.LotNumber,
        //             PartNumber: item.PartNumber,
        //             EoNumber :  item.EoNumber,
        //             Qty:        item.Qty
        //         }))
        //         .except(this.dataSource(), 'LotNumber');

        //     this.dataSource.update(data => [...data, ...DATA_SOURCE]);
        // }

        // else this.alert.Warning('No data for this Case Label', caseLabel, 'barcode');
    }


    /** Second Scan */
    protected async Check(lotNumber: string) {
        // lotNumber = Scanner.DecodeProperty(lotNumber, 'lotNumber');

        // if(!this.dataSource().find(x => x.LotNumber.equals(lotNumber))) {
        //     const lot = await this.GetLot(lotNumber); 

        //     if(lot) {
        //         if(!lot.StorageCode.equals(this.storage()!.Code)) {
        //             const message = `lot <b>${lot.LotNumber}</b><br>is in <b>${lot.StorageCode}</b>.<br>Do you want to move<br>to <b>${this.storage()!.Code}</b> ?`;
        //             const answer = await this.alert.WarningConfirm(message);                
        //             if(!answer) return; 

        //             const response = await this.service.MoveLot(lot.LotNumber, this.storage()!.Code); 
        //             if(!response.ok) return;
        //         } 

        //         this.dataSource.update(data => [
        //             ...data, 
        //             {
        //                 LotNumber:  lot.LotNumber,
        //                 PartNumber: lot.PartNumber,
        //                 EoNumber :  lot.EoNumber,
        //                 Qty:        lot.Qty
        //             }
        //         ]);
        //     }
        // }
    }


    /** */
    protected async GetLot(lotNumber: string) {
        const response = await this.masterService.GetLotInformation(lotNumber);

        if(response) { 
            if(response.HasDefect) {
                this.alert.Warning('This lot has defects', lotNumber, 'barcode');
                return null;
            } 

            else if(response.IsDeleted) { 
                this.alert.Warning('This lot has been deleted', lotNumber, 'barcode');
                return null;
            }
        }  

        return response;
    } 


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotOnlyWhiteSpace(this.storage())
            && this.IsNotOnlyWhiteSpace(this.inspectionNumber())
            && this.dataSource().length > 0 
    }); 


    /** */
    protected async Save() { 
        const aswer = await this.alert.SuccessConfirm(`Confirm transaction<br>#<b>${this.inspectionNumber()?.InspectionNumber}</b><br>${this.dataSource().length} Lots?`, 'save');
         
        if(aswer) {
            this.isLoading.set(true); 

            const storageCode = this.storage()!.Code;
            const inspection  = this.inspectionNumber()!.InspectionNumber;
            const lotList     = this.dataSource().map(item => item.LotNumber);

            const response = await this.service.SetInspection(storageCode, inspection, lotList);
    
            if(response.ok) {
                this.alert.Success(response.data, inspection, 'save');
                this.Cancel(false);
            }  
            
            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const response = await this.alert.WarningConfirm(`Cancel transaction<br>#<b>${this.inspectionNumber()?.InspectionNumber}</b> ?`);
            if(!response) return; 
        }
         
        this.dataSource.set([]);         
        if(this.inspectionNumberList().length > 0) {
            this.inspectionNumber.set(this.inspectionNumberList()[0]);
        }
    }
}