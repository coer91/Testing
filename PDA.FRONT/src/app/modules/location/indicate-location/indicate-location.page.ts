import { ILotInformationStatus, RACK_LOCATION_DTO, STORAGE_DTO } from '@appShared/interfaces';
import { Component, computed, inject, signal, viewChild } from '@angular/core';    
import { IndicateLocationService } from './indicate-location.service';
import { TRANSLATORY } from './indicate-location.translatory';
import { PartNumberLocation } from '@appShared/components';
import { MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { Tools } from 'hwmx-angular/tools';
import './indicate-location.translatory';

@Component({
    selector: 'indicate-location-page',
    templateUrl: './indicate-location.page.html', 
    standalone: false
})
export class IndicateLocationPage extends PagePDA {  
 
    constructor() { super('MM_LM0201', TRANSLATORY) } 
    protected override readonly TRANSLATORY = new TRANSLATORY(this.language()); 
    
    //Inject   
    private masterService = inject(MasterService);  
    private service = inject(IndicateLocationService);  

    //elements 
    protected readonly PNLocRef = viewChild.required<PartNumberLocation>('PNLocRef'); 

    //Variables 
    protected readonly storage      = signal<STORAGE_DTO | null>(null);  
    protected readonly storageList  = signal<STORAGE_DTO[]>(this.service.GetStorageList());  
    protected readonly location     = signal<RACK_LOCATION_DTO | null>(null);  
    protected readonly locationList = signal<RACK_LOCATION_DTO[]>([]);  
    protected readonly dataSource   = signal<ILotInformationStatus[]>([]);  
    protected readonly materialList = signal<string[]>([]);   


    protected override async StartPage() {
        const storageList = this.service.GetStorageList();
        this.storageList.set(storageList);
        
        const rack = null;
        const rackType = storageList.map(item => item.STORAGE_CODE).join(';');
        const locationList = await this.masterService.GetLocationList(rack, rackType);
        this.locationList.set(locationList);
        super.StartPage();
    }


    /** */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);  

        if(this.PNLocRef().isOpen()) {
            await this.PNLocRef().GetMaterialLocation(scanner);
        }

        //Get Location
        else if(Tools.IsNull(this.location()) || (this.dataSource().length <= 0 && !Scanner.IsEncoded(scanner) && scanner.length < 10)) {
            await this.GetLocation(scanner);
        }

        //Check
        else {
            await this.Check(scanner);
        } 
    
        this.isLoading.set(false);
    }



    /** */
    protected async GetLocation(scanner: string) { 
        if(!Scanner.IsEncoded(scanner)) {                           
            await this.Cancel(false);
            const rackLocation = this.locationList().find(x => x.LOCATION.equals(scanner)); 
                
            //SET Location
            if(rackLocation) {    
                const storage = this.storageList().find(x => x.STORAGE_CODE.equals(rackLocation.RACK_TYPE));
                    
                if(storage) {
                    const materialByLocation = await this.service.GetMaterialByLocation(rackLocation.LOCATION); 
                    this.materialList.set(materialByLocation);
                    this.storage.set(storage);
                    this.location.set(rackLocation);
                }
        
                else this.alert.Warning(`Location Type <b>${rackLocation.RACK_TYPE}</b> invalid`, scanner, 'fa-solid fa-location-dot');             
            }
    
            else this.alert.Warning(scanner, 'Location not found', 'iw-location');
             
        } 

        else this.translatory.alert.InvalidCode(scanner);
    }  


    /** */
    protected async Check(scanner: string) {
        if(Scanner.IsEncoded(scanner)) {
            const lotNumber = Scanner.DecodeProperty(scanner, 'LotNumber');
            
            if(this.dataSource().some(x => x.LOT_NUMBER.equals(lotNumber))) {
                this.translatory.alert.LotAlreadyScanned(lotNumber);
                return;
            }
                     
            const lot = await this.masterService.GetLotInformation(lotNumber) as ILotInformationStatus;
    
            if(lot) {  
                if(lot.IS_DELETED.equals('Y')) { 
                    this.translatory.alert.LotDeleted(lotNumber);
                    return;
                }
    
                else if(lot.HAS_DEFECT.equals('Y')) {
                    this.translatory.alert.LotWithDefect(lotNumber);
                    return;
                } 
    
                else if(lot.STORAGE_CODE.endsWith('000')) {
                    this.alert.Warning('Cannot locate <b>CY</b> Material', lotNumber, 'barcode');
                    return;
                }

                lot.PART_NUMBER = lot.PART_NUMBER.replaceAll('MTP','');
                lot.PART_NUMBER = lot.PART_NUMBER.replaceAll('TP','');
                if(this.materialList().length > 0 && !this.materialList().includes(lot.PART_NUMBER)) {
                    let message = 'Material';
                    message += `<br><i class="iw-box-fill font-size-30px"></i> <b>${lot.PART_NUMBER}</b>`;
                    message += `<br>doesn' belong here.`;
                    message += `<br>Do you want to add?`;
                    const response = await this.alert.WarningConfirm(message);
                    if(!response) return;
                    else lot.STATUS = 2;
                }
                
                this.dataSource.update(data => [...data, lot]); 
            }  
        } 

        //Get CaseLabel
        else {
            let lotList = await this.service.GetLotListByCaseLabel(scanner) as ILotInformationStatus[];
            
            if(lotList.length > 0) { 
                lotList = lotList.map(item => ({ 
                    ...item, Status: (
                        this.materialList().length <= 0 || this.materialList().includes(item.PART_NUMBER.replaceAll('MTP','').replaceAll('TP','')) ? 0 : 2
                    ) 
                }));

                if(lotList.some(item => item.STATUS == 2)) {
                    const response = await this.alert.WarningConfirm(`Some Materials<br>doesn' belong here.<br>Do you want to add?`);
                    if(!response) return; 
                }

                lotList = lotList.except(this.dataSource(), 'LotNumber');
                this.dataSource.update(data => [...data, ...lotList]);  
            }
    
            else this.translatory.alert.NoDataCaseLabel(scanner);
        }
    } 


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return this.IsNotNull(this.storage())
            && this.IsNotNull(this.location())
            && this.dataSource().length > 0
    }); 


    /** */
    protected async Save() { 
        const aswer = await this.translatory.confirm.SaveLotsInLocation(this.storage()?.STORAGE_NAME, this.location()?.LOCATION, this.dataSource().length);

        if(aswer) {
            this.isLoading.set(true); 

            const storageCode = this.storage()!.STORAGE_CODE;
            const location    = this.location()!.LOCATION;
            const lotList     = this.dataSource().map(item => item.LOT_NUMBER);

            const response = await this.service.SetLotsInLocation(storageCode, location, lotList);
    
            if(response.ok) {
                this.alert.Success(response.data, this.location()?.LOCATION, 'save');
                this.Cancel(false);
            }  
            
            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert && this.dataSource().length > 0) { 
            const storage  = this.storage()?.STORAGE_NAME;
            const location = this.location()?.LOCATION;
            const quantity = this.dataSource().length; 
            if(await this.translatory.confirm.CancelLotsInLocation(storage, location, quantity) == false) return; 
        }                 

        this.location.set(null);
        this.storage.set(null); 
        this.materialList.set([]);
        this.dataSource.set([]);
    } 


    /** */
    protected async ChangeLocation(rackLocation: RACK_LOCATION_DTO) {  
        this.isLoading.set(true);

        if(rackLocation) {
            await this.GetLocation(rackLocation.LOCATION);    
        }
        
        await Tools.Sleep();
        this.isLoading.set(false); 
    }
}