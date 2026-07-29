import { IndicateLocationService } from '../../location.module/indicate-location/indicate-location.service'; 
import { Component, computed, inject, signal, viewChild } from '@angular/core';    
import { ILotInformationStatus, IRackLocation } from '@appShared/interfaces';
import { WIASelectBox } from 'hwmx-angular/components';
import { MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools';
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
    private service = inject(IndicateLocationService);  
    
    //Elements
    protected locationRef = viewChild.required<WIASelectBox<IRackLocation>>('locationRef');

    //Variables 
    protected readonly rackLocation = signal<IRackLocation | null>(null); 
    protected readonly dataSource   = signal<ILotInformationStatus[]>([]);      


    /** On Scann Code */
    protected override async OnScanCode(scanner: string) {    
        this.isLoading.set(true); 
         
        if(this.rackLocation()) {
            if(Scanner.IsEncoded(scanner)) {  
                await this.Check(scanner);
            }

            else {
                this.CheckCaseLabel(scanner); 
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
            
            const response = await this.masterService.GetLotListByLocation(scanner);      
                       
            this.dataSource.set(response.map(item => ({ ...item, Status: 0 })));  

            if(response.length <= 0) { 
                this.translatory.alert.NoData(scanner);
            }
        }  
    }


    /** */
    protected async Check(scanner: string) {    
        const parsedCode = Scanner.Decode(scanner);  
                
        //Validate Lot
        const response = await this.masterService.GetLotInformation(parsedCode.LotNumber);
        
        if(Tools.IsNull(response)) {
            this.alert.Warning('Lot not found', parsedCode.LotNumber, 'barcode');  
           // this.translatory.alert.
            return;
        }

        else if(response!.IsDeleted) {            
            this.translatory.alert.LotDeleted(parsedCode.LotNumber);
            return;
        }

        else if(response!.HasDefect) { 
            this.translatory.alert.LotWithDefect(parsedCode.LotNumber); 
            return;
        } 

        const DATA_SOURCE = [...this.dataSource()];        
        const item = DATA_SOURCE.find(x => x.LotNumber.equals(parsedCode.LotNumber));                    
            
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
            } as ILotInformationStatus);
        } 

        this.dataSource.set(DATA_SOURCE);
    }


    /** */
    protected async CheckCaseLabel(scanner: string) {   
        const lotList = await this.service.GetLotListByCaseLabel(scanner);

        if(lotList.length > 0) {
            const DATA_SOURCE = [...this.dataSource()];

            for(const caseLot of lotList) {
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
                    } as ILotInformationStatus);
                }
            }
    
            this.dataSource.set(DATA_SOURCE);
        }

        else this.translatory.alert.NoDataCaseLabel(scanner);        
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
                const response = await this.service.SetInventoryCell(location, lotLocationList);
                
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
            const transaction = this.rackLocation()?.Location;
            const quantity = this.dataSource().length;
            const response = await this.translatory.confirm.CancelTransaction(transaction, quantity);
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