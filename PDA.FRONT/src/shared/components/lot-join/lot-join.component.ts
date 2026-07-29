import { Component, inject, input, output, signal } from '@angular/core';   
import { ILotInformation } from '@appShared/interfaces';
import { MasterService } from '@appShared/services';
import { Scanner } from '@appShared/tools'; 
import { IOption, IRadio } from 'hwmx-angular/interfaces';
import { Section, Tools, Translatory } from 'hwmx-angular/tools';
import { LotJoinService } from './lot-join.service';

@Component({
    selector: 'lot-join',
    templateUrl: './lot-join.component.html', 
    standalone: false
})
export class LotJoin extends Section {   

    //Inject   
    private masterService = inject(MasterService);  
    private mergeService  = inject(LotJoinService);   

    //Variables 
    protected readonly partNumber  = signal<string>('');
    protected readonly storageCode = signal<string>('');
    protected readonly storage     = signal<string>('');
    protected readonly printer     = signal<IOption | null>(null);
    protected readonly paperType   = signal<IRadio<string> | null>(null);
    protected readonly printerList = signal<IOption[]>([]);
    protected readonly dataSource  = signal<ILotInformation[]>([]);

    //Inputs 
    public readonly translatory  = input.required<Translatory>();
    public readonly useContainer = input<boolean>(true); 
    public readonly showGoBackButton = input<boolean>(false);

    //Outputs
    protected readonly onJoin = output<ILotInformation[]>();
    protected readonly onBack = output<void>();

    /** */
    protected override async StartSection() {
        const printerList = await this.masterService.GetPrinterList();
        this.printerList.set(printerList);
        
        const printer = printerList.find(x => x.Name.equals('WH_UNPACKING')) || null; 
        this.printer.set(printer);

        this.paperType.set({ Label: '4P', Value: '4' }); 
    }


    /** */
    public async OnScanCode(scanner: string) {                           
        const lotNumber = Scanner.DecodeProperty(scanner, 'LotNumber');
        if(lotNumber.isOnlyWhiteSpace() || this.dataSource().some(x => x.LotNumber.equals(lotNumber))) return; 

        this.isLoading.set(true);
        const response = await this.masterService.GetLotInformation(lotNumber);
               
        if(response) { 
            if(response.IsDeleted) { 
                this.translatory().alert.LotDeleted(lotNumber);
            } 

            else if(response.HasDefect) {
                this.translatory().alert.LotWithDefect(lotNumber);
            } 

            else if(Tools.IsOnlyWhiteSpace(response.PartNumber)) {
                this.alert.Warning('PartNumber is null', lotNumber, 'barcode');
            } 

            else if(Tools.IsOnlyWhiteSpace(response.StorageCode)) { 
                this.alert.Warning('StorageCode is null', lotNumber, 'barcode');
            }

            else {
                if(this.dataSource().length <= 0) {
                    this.storage.set(response.Storage);
                    this.storageCode.set(response.StorageCode);
                    this.partNumber.set(response.PartNumber); 
                    await Tools.Sleep();
                }
    
                if(!this.storageCode().equals(response.StorageCode)) {
                    this.alert.Warning(`StorageCode <b>${response.StorageCode}</b><br>not match with <b>${this.storageCode()}</b>`, lotNumber, 'barcode');
                }
    
                else if(!this.partNumber().equals(response.PartNumber)) {
                    this.alert.Warning(`PartNumber <b>${response.PartNumber}</b><br>not match with <b>${this.partNumber()}</b>`, lotNumber, 'barcode');
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
        if(this.showGoBackButton()) {
            return (this.dataSource().length > 0) ? 'cancel' : 'fa-cart-flatbed fa-solid font-size-20px';
        } 

        else return 'cancel';
    }


    /** */
    protected colorLeft = () => { 
        if(this.showGoBackButton()) {
            return (this.dataSource().length > 0) ? 'danger' : 'primary';
        } 

        else return 'danger';
    }


    protected ActionLeft() {
        if(this.showGoBackButton() && this.dataSource().length <= 0) {
            this.onBack.emit();
        } 

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
        const lotNumberList = [...this.dataSource()]; 
        const paperType = this.paperType()!.Value; 
        const printer   = this.printer()!.Name;    
         
        if(await this.alert.WarningConfirm(`Confirm transaction<br>${this.dataSource().length} lots ?`, 'bi bi-arrows-collapse-vertical')) {
            const response = await this.mergeService.JoinLot(paperType, printer, lotNumberList);

            if(response.ok) {
                await this.alert.Success(response.data);
                this.onJoin.emit(lotNumberList);
                this.Cancel();
            }
        } 

        this.isLoading.set(false);
    } 
}