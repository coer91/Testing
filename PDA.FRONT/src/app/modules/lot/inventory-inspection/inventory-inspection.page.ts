import { INSPECTION_DTO, InventoryInspectionService } from './inventory-inspection.service';
import { Component, computed, inject, signal, viewChild } from '@angular/core';   
import { LOT_INFORMATION_DTO, STORAGE_DTO } from '@appShared/interfaces';
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
    protected readonly storageRef = viewChild.required<WIASelectBox<STORAGE_DTO>>('storageRef');
    protected readonly inspectionNumRef = viewChild.required<WIASelectBox<INSPECTION_DTO>>('inspectionNumRef');

    //Variables
    protected readonly storage = signal<STORAGE_DTO | null>(null);
    protected readonly storageList = signal<STORAGE_DTO[]>([]);
    protected readonly inspectionNumber = signal<INSPECTION_DTO | null>(null);
    protected readonly inspectionNumberList = signal<INSPECTION_DTO[]>([]);
    protected readonly dataSource = signal<LOT_INFORMATION_DTO[]>([]);

    /** */
    protected override async StartPage() {  
        const factory = '';
        const storageType = 'C;F';
        const response = await this.masterService.GetStorageList(factory, storageType);
        this.storageList.set(response); 

        const STORAGE = this.storageList().find(x => true) || null;
        this.storage.set(STORAGE);  

        await this.GetInspNumberList();
        Tools.Sleep().then(() => super.StartPage()); 
    } 


    /** */
    protected async GetInspNumberList() { 
        this.isLoading.set(true);
        this.inspectionNumber.set(null);
        this.inspectionNumberList.set([]);
        this.dataSource.set([]);

        if(this.storage()) {
            const storageCode = this.storage()!.STORAGE_CODE;
            const response = await this.service.GetInspectionNumberList(storageCode);
            this.inspectionNumberList.set(response); 

            if(this.inspectionNumberList().length > 0) {
                this.inspectionNumber.set(this.inspectionNumberList()[0]);
            }
        }       
        
        this.isLoading.set(false);
    }


    /** */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true); 

        if(Tools.IsNull(this.storage())){
            this.alert.Warning('Select a location'); 
            Tools.Sleep().then(() => this.storageRef().Focus());
        }

        else if(Tools.IsNull(this.inspectionNumber())){
            this.alert.Warning('Inspection number not selected'); 
            Tools.Sleep().then(() => this.inspectionNumRef().Focus());
        }
            
        else {
            if(Scanner.IsEncoded(scanner)) {                
                await this.Check(scanner);
            }   
            
            else if(['A100', 'V100'].includes(this.storage()!.STORAGE_CODE)) {
                await this.GetCaseLabel(scanner);
            }  
        }
 
        this.isLoading.set(false);
    }


    /** */
    protected async GetCaseLabel(caseLabel: string) {        
        const storageCode = this.storage()?.STORAGE_CODE;
        const response = await this.masterService.GetCaseLabel(caseLabel, storageCode);

        if(response.length > 0) { 
            const DATA_SOURCE = response
                .map(item => ({
                    LOT_NUMBER:  item.LOT_NUMBER,
                    PART_NUMBER: item.PART_NUMBER,
                    EO_NUMBER :  item.EO_NUMBER,
                    QTY:         item.QTY
                }))
                .except(this.dataSource(), 'LotNumber') as LOT_INFORMATION_DTO[];

            this.dataSource.update(data => [...data, ...DATA_SOURCE]);
        }

        else this.alert.Warning('No data for this Case Label', caseLabel, 'barcode');
    }


    /** Second Scan */
    protected async Check(lotNumber: string) {
        lotNumber = Scanner.DecodeProperty(lotNumber, 'LotNumber');

        if(!this.dataSource().find(x => x.LOT_NUMBER.equals(lotNumber))) {
            const lot = await this.GetLot(lotNumber); 

            if(lot) {
                if(!lot.STORAGE_CODE.equals(this.storage()!.STORAGE_CODE)) {
                    const message = `lot <b>${lot.LOT_NUMBER}</b><br>is in <b>${lot.STORAGE_CODE}</b>.<br>Do you want to move<br>to <b>${this.storage()!.STORAGE_CODE}</b> ?`;
                    const answer = await this.alert.WarningConfirm(message);                
                    if(!answer) return; 

                    const response = await this.service.MoveLot(lot.LOT_NUMBER, this.storage()!.STORAGE_CODE); 
                    if(!response.ok) return;
                } 

                this.dataSource.update(data => [
                    ...data, 
                    {
                        LOT_NUMBER:  lot.LOT_NUMBER,
                        PART_NUMBER: lot.PART_NUMBER,
                        EO_NUMBER :  lot.EO_NUMBER,
                        QTY:         lot.QTY
                    } as LOT_INFORMATION_DTO
                ]);
            }
        }

        else this.translatory.alert.LotAlreadyScanned(lotNumber);
    }


    /** */
    protected async GetLot(lotNumber: string) {
        const response = await this.masterService.GetLotInformation(lotNumber);

        if(response) { 
            if(response.IS_DELETED.equals('Y')) { 
                this.translatory.alert.LotDeleted(lotNumber); 
                return null;
            }

            else if(response.HAS_DEFECT.equals('Y')) { 
                this.translatory.alert.LotWithDefect(lotNumber);
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
        const aswer = await this.alert.SuccessConfirm(`Confirm transaction<br>#<b>${this.inspectionNumber()?.INSPECTION_NUMBER}</b><br>${this.dataSource().length} Lots?`, 'save');
         
        if(aswer) {
            this.isLoading.set(true); 

            const storageCode = this.storage()!.STORAGE_CODE;
            const inspection  = this.inspectionNumber()!.INSPECTION_NUMBER;
            const lotList     = this.dataSource().map(item => item.LOT_NUMBER);

            const response = await this.service.SetInspectionLot(storageCode, inspection, lotList);
    
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
            const response = await this.alert.WarningConfirm(`Cancel transaction<br>#<b>${this.inspectionNumber()?.INSPECTION_NUMBER}</b> ?`);
            if(!response) return; 
        }
         
        this.dataSource.set([]);         
        if(this.inspectionNumberList().length > 0) {
            this.inspectionNumber.set(this.inspectionNumberList()[0]);
        }
    }


    /** */
    protected async CreateInspectionNumber() {
        const { STORAGE_CODE, STORAGE_NAME } = this.storage()!;

        const answer = await this.alert.InformationConfirm(`Create<br>new inspection number<br>for ${STORAGE_NAME} ?`);
         
        if(answer) {
            this.isLoading.set(true);

            const response = await this.service.CreateInspectionNumber(STORAGE_CODE);

            if(response.ok) {
                await this.GetInspNumberList();
                this.alert.Information('Inspection number created', response.data);
            }

            this.isLoading.set(false);
        }
    }


    /** */
    protected counter = computed<string>(() => {  
        return this.showSaveButton() ? `
            <h4 class="width-100 text-align-right color-gray"> 
                ${this.dataSource().length}
                <i class="iw-barcode font-size-20px"></i>  
            </h4>
        ` : ''; 
    }); 
}