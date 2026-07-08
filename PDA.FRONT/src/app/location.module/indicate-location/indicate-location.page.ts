import { Component, computed, inject, signal, viewChild } from '@angular/core';    
import { IDataSource, ILocation, IStore } from '@appShared/interfaces';
import { IndicateLocationService } from './indicate-location.service';
import { PartNumberLocation } from '@appShared/components';
import { MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'indicate-location-page',
    templateUrl: './indicate-location.page.html', 
    standalone: false
})
export class IndicateLocationPage extends PagePDA {  
 
    constructor() { super('MM_LM0201') } 
    
    //Inject   
    private masterService = inject(MasterService);  
    private service = inject(IndicateLocationService);  

    //elements 
    protected readonly PNLocRef = viewChild.required<PartNumberLocation>('PNLocRef'); 

    //Variables 
    protected readonly storage     = signal<IStore | null>(null);  
    protected readonly storageList = signal<IStore[]>(this.service.GetStorageList());  
    protected readonly location    = signal<ILocation | null>(null);  
    protected readonly dataSource  = signal<IDataSource[]>([]);  


    /** */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);  

        if(this.PNLocRef().isOpen()) {
            await this.PNLocRef().GetMaterialLocation(scanner);
        }

        else if(Tools.IsNull(this.location())) {
            await this.GetLocation(scanner);
        }

        else {
            await this.Check(scanner);
        } 
    
        this.isLoading.set(false);
    }


    /** */
    protected async GetLocation(scanner: string) {   
        const location = await this.masterService.GetLocation(scanner, false); 

        //SET Location
        if(location) {    
            if(Tools.IsNotNull(this.storage()) && !location.RackType.equals(this.storage()!.Code)) {
                this.alert.Warning(`Location Type must by ${this.storage()!.Code}`, scanner, 'fa-solid fa-location-dot');
                return;
            }            
             
            const storage = this.storageList().find(x => x.Code.equals(location.RackType));
                
            if(storage) {
                this.storage.set(storage);
                this.location.set(location);
            }
    
            else this.alert.Warning(`Location Type ${location.RackType} invalid`, scanner, 'fa-solid fa-location-dot');             
        }

        //Get CaseLabel
        else if(scanner.length >= 10 && Tools.IsNull(this.storage())) {
            const lotNumber = Scanner.DecodeProperty(scanner, 'lotNumber');
            const lotList = await this.service.GetCaseLabelLocation(lotNumber);
            
            if(lotList.length > 0) { 
                this.dataSource.set(lotList);     
                const storage = this.storageList().find(x => x.Code.equals('CL'));
                if(storage) this.storage.set(storage);   
            }

            else this.alert.Warning('No data for this Case Label', lotNumber, 'barcode');
        }

        else this.alert.Warning('Location not found', scanner, 'iw-location');
    } 


    /** */
    protected async Check(scanner: string) {
        const lotNumber = Scanner.DecodeProperty(scanner, 'lotNumber');
        if(this.dataSource().some(x => x.LotNumber.equals(lotNumber))) return;
                 
        const lot = await this.masterService.GetLotInformation(lotNumber);

        if(lot) { 
            if(lot.IsDeleted) { 
                this.alert.Warning('This lot has been deleted', lotNumber, 'barcode');
                return;
            }

            else if(lot.HasDefect) {
                this.alert.Warning('This lot has defects', lotNumber, 'barcode');
                return;
            } 

            else if(lot.StorageCode.endsWith('000')) {
                this.alert.Warning('Cannot locate CY Material', lotNumber, 'barcode');
                return;
            }

            const { Location, PartNumber } = lot; 
            const response = await this.service.PartNumberLocationMatching(Location, PartNumber);            
            
            if(response.ok) {
                this.dataSource.update(data => [
                    ...data, 
                    {
                        LotNumber:  lot.LotNumber,
                        PartNumber: lot.PartNumber,
                        EoNumber :  lot.EoNumber,
                        Qty:        lot.Qty
                    }
                ]);
            }  
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
        const aswer = await this.alert.SuccessConfirm(`Confirm transaction<br><b>${this.storage()?.Name}</b><br>#<b>${this.location()?.Location}</b><br>${this.dataSource().length} Lots?`, 'save');
         
        if(aswer) {
            this.isLoading.set(true); 

            const storageCode = this.storage()!.Code;
            const location    = this.location()!.Location;
            const lotList     = this.dataSource().map(item => item.LotNumber);

            const response = await this.service.SetLotLocation(storageCode, location, lotList);
    
            if(response.ok) {
                this.alert.Success(response.data, this.location()?.Location, 'save');
                this.Cancel(false);
            }  
            
            this.isLoading.set(false);
        }
    }


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            let message = `Cancel transaction<br><b>${this.storage()?.Name}</b>`;
            message += (Tools.IsNotNull(this.location()) ? `<br>#<b>${this.location()?.Location}</b>` : '');
            message += ' ?';
            const response = await this.alert.WarningConfirm(message);
            if(!response) return; 
        }
         
        this.location.set(null);
        this.storage.set(null); 
        this.dataSource.set([]);
    }
}