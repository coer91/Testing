import { Component, inject, input, output, signal } from '@angular/core';   
import { LOT_INFORMATION_DTO, PRINTER_DTO } from '@appShared/interfaces';
import { LotManagementService, MasterService } from '@appShared/services';
import { Section, Tools, Translatory } from 'hwmx-angular/tools'; 
import { IRadio } from 'hwmx-angular/interfaces';
import { Scanner } from '@appShared/tools'; 

@Component({
    selector: 'join-lot',
    templateUrl: './join-lot.component.html', 
    standalone: false
})
export class JoinLot extends Section {   

    //Inject   
    private masterService = inject(MasterService);  
    private service       = inject(LotManagementService);   

    //Variables 
    protected readonly partNumber  = signal<string>('');
    protected readonly storageCode = signal<string>('');
    protected readonly storage     = signal<string>('');
    protected readonly printer     = signal<PRINTER_DTO | null>(null);
    protected readonly paperType   = signal<IRadio<string> | null>(null);
    protected readonly printerList = signal<PRINTER_DTO[]>([]);
    protected readonly dataSource  = signal<LOT_INFORMATION_DTO[]>([]);

    //Inputs 
    public readonly translatory  = input.required<Translatory>();
    public readonly useContainer = input<boolean>(true); 
    public readonly showGoBackButton = input<boolean>(false);

    //Outputs
    protected readonly onJoin = output<LOT_INFORMATION_DTO[]>();
    protected readonly onBack = output<void>();

    /** */
    protected override async StartSection() {
        const printerList = await this.masterService.GetPrinterList();
        this.printerList.set(printerList);
        
        const printer = printerList.find(x => x.PRINTER_NAME.equals('CANOPYY')) || null; 
        this.printer.set(printer);

        this.paperType.set({ Label: '4P', Value: '4' }); 
    }


    /** */
    public async OnScanCode(scanner: string) {                           
        const lotNumber = Scanner.DecodeProperty(scanner, 'LotNumber');
        if(lotNumber.isOnlyWhiteSpace() || this.dataSource().some(x => x.LOT_NUMBER.equals(lotNumber))) return; 

        this.isLoading.set(true);
        const response = await this.masterService.GetLotInformation(lotNumber);
               
        if(response) { 
            if(response.IS_DELETED.equals('Y')) { 
                this.translatory().alert.LotDeleted(lotNumber);
            } 

            else if(response.HAS_DEFECT.equals('Y')) {
                this.translatory().alert.LotWithDefect(lotNumber);
            } 

            else if(Tools.IsOnlyWhiteSpace(response.PART_NUMBER)) {
                this.alert.Warning('PartNumber is null', lotNumber, 'barcode');
            } 

            else if(Tools.IsOnlyWhiteSpace(response.STORAGE_CODE)) { 
                this.alert.Warning('StorageCode is null', lotNumber, 'barcode');
            }

            else {
                if(this.dataSource().length <= 0) {
                    this.storage.set(response.STORAGE);
                    this.storageCode.set(response.STORAGE_CODE);
                    this.partNumber.set(response.PART_NUMBER); 
                    await Tools.Sleep();
                }
    
                if(!this.storageCode().equals(response.STORAGE_CODE)) {
                    this.alert.Warning(`StorageCode <b>${response.STORAGE_CODE}</b><br>not match with <b>${this.storageCode()}</b>`, lotNumber, 'barcode');
                }
    
                else if(!this.partNumber().equals(response.PART_NUMBER)) {
                    this.alert.Warning(`PartNumber <b>${response.PART_NUMBER}</b><br>not match with <b>${this.partNumber()}</b>`, lotNumber, 'barcode');
                }
    
                else {
                    this.dataSource.update(data => [...data, response]);
                } 
            }
        } 

        this.isLoading.set(false);
    } 


    /** */
    protected showSaveButton = () => { 
        return this.dataSource().length > 1
            && Tools.IsNotNull(this.printer())
            && this.IsNotNull(this.paperType());
    }  


    /** */
    protected iconLeft = () => { 
        return this.showGoBackButton() && this.dataSource().length <= 0 
            ? 'fa-cart-flatbed fa-solid font-size-20px' : 'cancel'; 
    }


    /** */
    protected colorLeft = () => { 
        return this.showGoBackButton() && this.dataSource().length <= 0 
            ? 'primary' : 'danger'; 
    }


    protected ActionLeft() {
        if(this.showGoBackButton() && this.dataSource().length <= 0) this.onBack.emit();
        else this.Cancel();
    }


    /** */
    public async Cancel() {
        this.storage.set('');
        this.storageCode.set('');
        this.partNumber.set('');
        this.dataSource.set([]); 
    } 


    /** */
    protected async Save() {           
        this.isLoading.set(true);
        const lotNumberList = [...this.dataSource()].map(x => x.LOT_NUMBER); 
        const paperType = this.paperType()!.Value; 
        const printer   = this.printer()!.PRINTER_NAME;    
         
        if(await this.alert.WarningConfirm(`Confirm transaction<br>${this.dataSource().length} lots ?`, 'bi bi-arrows-collapse-vertical')) {
            const response = await this.service.Join(paperType, printer, lotNumberList);

            if(response.ok) {
                await this.alert.Success(response.data);
                this.onJoin.emit([...this.dataSource()]);
                this.Cancel();
            }
        } 

        this.isLoading.set(false);
    } 
}