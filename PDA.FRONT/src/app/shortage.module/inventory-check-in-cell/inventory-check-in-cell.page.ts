import { InventoryCheckInCellService } from './inventory-check-in-cell.service';
import { Component, computed, inject, signal, viewChild } from '@angular/core';    
import { IDataSourceLocation, ILocation } from '@appShared/interfaces';
import { MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools';
import { WIASelectBox } from 'hwmx-angular/components';
import { Tools } from 'hwmx-angular/tools'; 

@Component({
    selector: 'inventory-check-in-cell-page',
    templateUrl: './inventory-check-in-cell.page.html', 
    standalone: false
})
export class InventoryCheckInCellPage extends PagePDA {  
 
    constructor() { super('MM_SM0401') } 

    //Inject    
    private masterService = inject(MasterService); 
    private inventoryCheckInCellService = inject(InventoryCheckInCellService);
    
    //Elements
    protected locationRef = viewChild.required<WIASelectBox<ILocation>>('locationRef');

    //Variables 
    protected readonly rackLocation = signal<ILocation | null>(null); 
    protected readonly dataSource   = signal<IDataSourceLocation[]>([]);      


    /** On Scann Code */
    protected override async OnScanCode(scanner: string) {    
        this.isLoading.set(true); 
         
        if(this.rackLocation()) {
            if(Scanner.IsEncoded(scanner)) {  
                await this.Check(scanner);
            }

            else {
                this.ConfirmCaseLotLocation(scanner); 
            }  
        }
        
        else await this.GetDataSource(scanner);
        
        this.isLoading.set(false);
    }


    /** */
    protected async GetDataSource(scanner: string) {
        this.dataSource.set([]);         
        this.rackLocation.set(null);
        const rackLocation = await this.masterService.GetLocation(scanner);

        if(rackLocation) {
            this.rackLocation.set(rackLocation); 
            
            const response = await this.masterService.GetLotByLocation(scanner);                 
            this.dataSource.set(response.map(item => ({ ...item, Status: 0 })));  

            if(response.length <= 0) {
                this.alert.Warning('No Data', scanner, 'barcode');
            }
        }  
    }


    /** */
    protected async Check(scanner: string) {    
        const parsedCode = Scanner.Decode(scanner);  
                
        //Validate Lot
        const response = await this.masterService.GetLotInformation(parsedCode.lotNumber);
        
        if(Tools.IsNull(response)) {
            this.alert.Warning('Lot not found', parsedCode.lotNumber, 'barcode');  
            return;
        }

        else if(response!.HasDefect) {
            this.alert.Warning('This Lot has defect', parsedCode.lotNumber, 'barcode'); 
            return;
        }

        else if(response!.IsDeleted) {
            this.alert.Warning('This Lot is deleted', parsedCode.lotNumber, 'barcode'); 
            return;
        }

        const DATA_SOURCE = [...this.dataSource()];        
        const item = DATA_SOURCE.find(x => x.LotNumber.equals(parsedCode.lotNumber));                    
            
        if(item && [0,1,2].includes(item.Status)) {
            if([0,1].includes(item.Status)) item.Status = 1;          
        }

        else {
            DATA_SOURCE.push({
                LotNumber:  response!.LotNumber,
                PartNumber: response!.PartNumber,
                Qty:        response!.Qty,
                EoNumber:   response!.EoNumber,
                Location:   this.rackLocation()!.Location,
                Status:  2
            });
        } 

        this.dataSource.set(DATA_SOURCE);
    }


    /** */
    protected async ConfirmCaseLotLocation(scanner: string) {   
        const lotLocationListCase = await this.inventoryCheckInCellService.GetCaseLotInfo(scanner);

        if(lotLocationListCase.length > 0) {
            const DATA_SOURCE = [...this.dataSource()];

            for(const caseLot of lotLocationListCase) {
                const item = DATA_SOURCE.find(x => x.LotNumber.equals(caseLot.LotNumber));                    
                
                if(item && [0,1,2].includes(item.Status)) {
                    if([0,1].includes(item.Status)) item.Status = 1;                       
                }
    
                else {
                    DATA_SOURCE.push({
                        LotNumber:  caseLot.LotNumber,
                        PartNumber: caseLot.PartNumber,
                        EoNumber:   caseLot.EoNumber, 
                        Qty:        caseLot.Qty,
                        Location:   this.rackLocation()!.Location,
                        Status:     2
                    });
                }
            }
    
            this.dataSource.set(DATA_SOURCE);
        }

        else this.alert.Warning('Not found', scanner, 'barcode');
    } 


    /** */
    protected showSaveButton = computed<boolean>(() => {
        return Tools.IsNotNull(this.rackLocation());
    });  


    /** */
    protected async Save() { 
        const answer = await this.alert.SuccessConfirm(`Confirm transaction<br>#<b>${this.rackLocation()?.Location}</b><br>${this.dataSource().filter(x => x.Status > 0).length} Lots?`, 'save');

        if(answer) {
            this.isLoading.set(true);
    
            if(this.rackLocation()) {
                const location = this.rackLocation()!.Location;
                const lotLocationList = this.dataSource().map(item => `${item.LotNumber};${item.Status}`);        
                const response = await this.inventoryCheckInCellService.SetInventoryCell(location, lotLocationList);
                
                if(Tools.IsNotOnlyWhiteSpace(response)) {
                    this.alert.Success(response, location, 'save');
                    this.Cancel(false);
                }
            }
    
    
            this.isLoading.set(false);
        }
    } 


    /** */
    protected async Cancel(showAlert: boolean) {   
        if(showAlert) {
            const response = await this.alert.WarningConfirm(`Cancel transaction<br>#<b>${this.rackLocation()?.Location}</b> ?`);
            if(!response) return; 
        }         
         
        this.isLoading.set(true);

        this.rackLocation.set(null);
        this.transaction.set(''); 
        this.dataSource.set([]);

        await Tools.Sleep();
        this.isLoading.set(false); 
    } 
}