import { Component, inject, input, output, signal, viewChild } from '@angular/core';   
import { Section, Tools, Translatory } from 'hwmx-angular/tools';
import { FormBuilder, Validators } from '@angular/forms';
import { ILotInformation } from '@appShared/interfaces';
import { LotSplitService } from './lot-split.service';
import { MasterService } from '@appShared/services';
import { WIAForm } from 'hwmx-angular/components';
import { IOption } from 'hwmx-angular/interfaces';
import { Scanner } from '@appShared/tools'; 

@Component({
    selector: 'lot-split',
    templateUrl: './lot-split.component.html', 
    standalone: false
})
export class LotSplit extends Section {    

    //Inject   
    private masterService = inject(MasterService);  
    private splitService  = inject(LotSplitService);  
    private formBuilder   = inject(FormBuilder);

    //Elements
    protected formRef     = viewChild.required<WIAForm>('formRef'); 
    protected modalSplit  = viewChild.required<WIAForm>('formRef');
    protected lotSplitRef = viewChild.required<LotSplit>('lotSplitRef');

    //Variables 
    protected printerList = signal<IOption[]>([]);
    protected lot         = signal<ILotInformation | null>(null);

    //Inputs   
    public readonly translatory  = input.required<Translatory>();
    public readonly useContainer = input<boolean>(true);   
    public readonly showGoBackButton = input<boolean>(false);   

    //Outputs
    protected readonly onSlit = output<string>();
    protected readonly onBack = output<void>();
    
    //Form 
    protected formGroup = this.formBuilder.group({
        LotNumber:      [''  , []],
        PartNumber:     [''  , []],
        EoNumber:       [''  , []],
        PartName:       [''  , []],
        Qty:            [''  , []],
        Unit:           [''  , []],
        Vendor:         [''  , []],
        Storage:        [''  , []],
        Divisions:      [1   , [Validators.min(1)]],
        PaperType:      [{ Label: '4P' }, [Validators.required]],
        Printer:        [null, [Validators.required]]                
    }); 
    
    
    /** */
    protected override async StartSection() {
        this.isLoading.set(true);
        const printerList = await this.masterService.GetPrinterList();
        this.printerList.set(printerList);
        const Printer = printerList.find(x => x.Name.equals('WH_UNPACKING')); 
        
        await Tools.Sleep();
        this.formRef().SetControlValue('Printer', Printer); 
        this.isLoading.set(false);
    }


    /** */
    public async OnScanCode(scanner: string) {        
        const lotNumber = Scanner.DecodeProperty(scanner, 'LotNumber');   
       
        if(Tools.IsNotNull(this.lot())) {
            if(this.lot()?.LotNumber.equals(lotNumber)) return;
            await this.Cancel();
        }

        this.isLoading.set(true);  
        this.onLoading.emit(true);          

        const lot = await this.masterService.GetLotInformation(lotNumber);

        if(lot) {
            this.lot.set(lot); 
    
            if(lot.IsDeleted) { 
                this.translatory().alert.LotDeleted(lotNumber); 
                return;
            }

            else if(lot.HasDefect) {
                this.translatory().alert.LotWithDefect(lotNumber); 
                return;
            } 

            const PrinterName = this.formRef().GetControlValue<IOption>('Printer')?.Name;
            const PaperType   = this.formRef().GetControlValue<any>('PaperType');
             
            this.formRef().Reset({
                LotNumber:  lot.LotNumber,  
                PartNumber: lot.PartNumber,
                EoNumber:   lot.EoNumber,
                PartName:   lot.PartName, 
                Qty:        lot.Qty, 
                Unit:       lot.Unit,
                Vendor:     `${lot.VendorCode} - ${lot.Vendor}`,
                Storage:    `${lot.StorageCode} - ${lot.Storage}`,
                Printer:    PrinterName,
                PaperType:  PaperType,
                Divisions:  1
            });
        }

        else this.Cancel();       
        this.isLoading.set(false);
        this.onLoading.emit(false);
    }  


    /** */
    public async Cancel() {
        this.lot.set(null);
        const Printer   = this.formRef().GetControlValue<IOption>('Printer')?.Name; 
        const PaperType = this.formRef().GetControlValue<any>('PaperType');     
        this.formRef().Reset({ Divisions: 0, Printer, PaperType }); 
    } 


    /** */
    protected async Save() {   
        if(this.formRef().IsValid()) {
            this.isLoading.set(true);
            this.onLoading.emit(true);

            const { LotNumber, Divisions, PaperType, Printer } = this.formRef().GetValue<any>();  

            let message = `<div>`;
            message += 'Split lot';
            message += `<br>#<b>${LotNumber}</b><br>`;
            message += `<div style='text-align:left; border-top:1px solid lightgray; margin-top:5px; padding-top:5px;'>`;
            message += `<b>Printer:</b> ${Printer.Name}<br>`;
            message += `<b>Divisions:</b> ${Divisions} ${PaperType.Label}`; 
            message += `</div>`;
            message += `</div>`;     
             
            if(await this.alert.WarningConfirm(message, 'bi bi-arrows-expand-vertical')) {
                const response = await this.splitService.SplitLot(LotNumber, Divisions, PaperType.Value, Printer.Name);

                if(response.ok) {
                    await this.alert.Success(`New lot has been created`, response.data);
                    this.onSlit.emit(response.data);
                    this.Cancel();
                }
            } 

            this.isLoading.set(false);
            this.onLoading.emit(false);
        }  
    } 


    /** */
    protected showPrintButton = () => { 
        return this.IsNotOnlyWhiteSpace(this.lot()) 
            && this.formRef().IsValid();
    } 


    /** */
    protected iconLeft = () => { 
        if(this.showGoBackButton()) {
            return this.IsNotOnlyWhiteSpace(this.lot()) ? 'cancel' : 'fa-cart-flatbed fa-solid font-size-20px';
        } 

        else return 'cancel';
    }


    /** */
    protected colorLeft = () => { 
        if(this.showGoBackButton()) {
            return this.IsNotOnlyWhiteSpace(this.lot()) ? 'danger' : 'primary';
        } 

        else return 'danger';
    }


    protected ActionLeft() {
        if(this.showGoBackButton() && this.IsOnlyWhiteSpace(this.lot())) {
            this.onBack.emit();
        } 

        else this.Cancel();
    }
}