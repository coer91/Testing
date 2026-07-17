import { Component, inject, signal } from '@angular/core';   
import { ILotInformation } from '@appShared/interfaces';
import { MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { IOption, IRadio } from 'hwmx-angular/interfaces';
import { Tools } from 'hwmx-angular/tools';
import { MergeService } from './merge.service';

@Component({
    selector: 'merge-page',
    templateUrl: './merge.page.html', 
    standalone: false
})
export class MergePage extends PagePDA {  
 
    constructor() { super('MM_LT0301') }  

    //Inject   
    private masterService = inject(MasterService);  
    private mergeService  = inject(MergeService);   

    //Variables 
    protected partNumber  = signal<string>('');
    protected storageCode = signal<string>('');
    protected storage     = signal<string>('');
    protected printer     = signal<IOption | null>(null);
    protected paperType   = signal<IRadio<string> | null>(null);
    protected printerList = signal<IOption[]>([]);
    protected dataSource  = signal<ILotInformation[]>([]);

    /** */
    protected override async StartPage() {
        const printerList = await this.masterService.GetPrinterList();
        this.printerList.set(printerList);
        
        const printer = printerList.find(x => x.Name.equals('WH_UNPACKING')) || null; 
        this.printer.set(printer);

        this.paperType.set({ Label: '4P', Value: '4' });
                 
        super.StartPage();
    }


    /** */
    protected override async OnScanCode(scanner: string) {
                           
        // const lotNumber = Scanner.DecodeProperty(scanner, 'lotNumber');
        // if(lotNumber.isOnlyWhiteSpace() || this.dataSource().some(x => x.LotNumber.equals(lotNumber))) return; 

        // this.isLoading.set(true);
        // const response = await this.masterService.GetLotInformation(lotNumber);
               
        // if(response) { 
        //     if(response.HasDefect) {
        //         this.alert.Warning('This lot has defects', lotNumber, 'barcode');
        //     } 

        //     else if(response.IsDeleted) { 
        //         this.alert.Warning('This lot has been deleted', lotNumber, 'barcode');
        //     } 

        //     else if(Tools.IsOnlyWhiteSpace(response.PartNumber)) {
        //         this.alert.Warning('PartNumber is null', lotNumber, 'barcode');
        //     } 

        //     else if(Tools.IsOnlyWhiteSpace(response.StorageCode)) { 
        //         this.alert.Warning('StorageCode is null', lotNumber, 'barcode');
        //     }

        //     else {
        //         if(this.dataSource().length <= 0) {
        //             this.storage.set(response.Storage);
        //             this.storageCode.set(response.StorageCode);
        //             this.partNumber.set(response.PartNumber); 
        //             await Tools.Sleep();
        //         }
    
        //         if(!this.storageCode().equals(response.StorageCode)) {
        //             this.alert.Warning(`StorageCode <b>${response.StorageCode}</b>not match with <b>${this.storageCode()}</b>`, lotNumber, 'barcode');
        //         }
    
        //         else if(!this.partNumber().equals(response.PartNumber)) {
        //             this.alert.Warning(`PartNumber <b>${response.PartNumber}</b><br>not match with <b>${this.partNumber()}</b>`, lotNumber, 'barcode');
        //         }
    
        //         else {
        //             this.dataSource.update(data => [...data, response]);
        //         } 
        //     }

        // } 

        // this.isLoading.set(false);
    } 


    /** */
    protected showSaveButton = () => { 
        return this.dataSource().length > 0
            && Tools.IsNotNull(this.printer())
            && this.IsNotNull(this.paperType());
    }  


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const response = await this.alert.WarningConfirm(`Cancel transaction<br>${this.dataSource().length} lots ?`);
            if(!response) return; 
        } 

        this.storage.set('');
        this.storageCode.set('');
        this.partNumber.set('');
        this.dataSource.set([]);
    } 


    /** */
    protected async Save() {   
        
        this.isLoading.set(true);
        const lotNumberList = this.dataSource(); 
        const paperType = this.paperType()!.Value; 
        const printer   = this.printer()!.Name;    
         
        if(await this.alert.WarningConfirm(`Confirm transaction<br>${this.dataSource().length} lots ?`)) {
            const response = await this.mergeService.MergeLot(paperType, printer, lotNumberList);

            if(response.ok) {
                await this.alert.Success(response.data);
                this.Cancel(false);
            }
        } 

        this.isLoading.set(false);
    } 
}