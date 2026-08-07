import { Component, inject, input, output, signal, viewChild } from '@angular/core';   
import { Section, Tools, Translatory } from 'hwmx-angular/tools';
import { FormBuilder, Validators } from '@angular/forms';
import { LOT_INFORMATION_DTO, PRINTER_DTO } from '@appShared/interfaces'; 
import { LotManagementService, MasterService } from '@appShared/services';
import { WIAForm } from 'hwmx-angular/components'; 
import { Scanner } from '@appShared/tools'; 

@Component({
    selector: 'split-lot',
    templateUrl: './split-lot.component.html', 
    standalone: false
})
export class SplitLot extends Section {    

    //Inject   
    private masterService = inject(MasterService);  
    private service       = inject(LotManagementService);
    private formBuilder   = inject(FormBuilder);

    //Elements
    protected formRef     = viewChild.required<WIAForm>('formRef'); 
    protected modalSplit  = viewChild.required<WIAForm>('formRef'); 

    //Variables 
    protected printerList = signal<PRINTER_DTO[]>([]);
    protected lot         = signal<LOT_INFORMATION_DTO | null>(null);

    //Inputs   
    public readonly translatory  = input.required<Translatory>();
    public readonly useContainer = input<boolean>(true);   
    public readonly showGoBackButton = input<boolean>(false);   

    //Outputs
    protected readonly onSlit = output<string>();
    protected readonly onBack = output<void>();
    
    //Form 
    protected formGroup = this.formBuilder.group({
        LOT_NUMBER:  [''  , []],
        PART_NUMBER: [''  , []],
        EO_NUMBER:   [''  , []],
        PART_NAME:   [''  , []],
        QTY:         [''  , []],
        UNIT:        [''  , []],
        VENDOR:      [''  , []],
        STORAGE:     [''  , []],
        Divisions:   [1   , [Validators.min(1)]],
        PaperType:   [{ Label: '4P' }, [Validators.required]],
        PRINTER:     [null, [Validators.required]]                
    }); 
    
    
    /** */
    protected override async StartSection() {
        this.isLoading.set(true);
        const printerList = await this.masterService.GetPrinterList();
        this.printerList.set(printerList);
        const Printer = printerList.find(x => x.PRINTER_NAME.equals('CANOPYY')); 
        
        await Tools.Sleep();
        this.formRef().SetControlValue('PRINTER', Printer); 
        this.isLoading.set(false);
    }


    /** */
    public async OnScanCode(scanner: string) {        
        const lotNumber = Scanner.DecodeProperty(scanner, 'LotNumber');   
       
        if(Tools.IsNotNull(this.lot())) {
            if(this.lot()?.LOT_NUMBER.equals(lotNumber)) return;
            await this.Cancel();
        }

        this.isLoading.set(true);  
        this.onLoading.emit(true);          

        const lot = await this.masterService.GetLotInformation(lotNumber);

        if(lot) { 
            this.alert.CloseAllAlerts();

            if(lot.IS_DELETED.equals('Y')) {  
                this.translatory().alert.LotDeleted(lotNumber); 
                this.isLoading.set(false);  
                this.onLoading.emit(false); 
                return;
            }

            else if(lot.HAS_DEFECT.equals('Y')) {
                this.translatory().alert.LotWithDefect(lotNumber); 
                this.isLoading.set(false);  
                this.onLoading.emit(false); 
                return;
            } 

            this.lot.set(lot); 
            const PrinterName = this.formRef().GetControlValue<PRINTER_DTO>('PRINTER')?.PRINTER_NAME;
            const PaperType   = this.formRef().GetControlValue<any>('PaperType');
             
            this.formRef().Reset({
                LOT_NUMBER:  lot.LOT_NUMBER,  
                PART_NUMBER: lot.PART_NUMBER,
                EO_NUMBER:   lot.EO_NUMBER,
                PART_NAME:   lot.PART_NAME, 
                QTY:         lot.QTY, 
                UNIT:        lot.UNIT,
                VENDOR:      `${lot.VENDOR_CODE} - ${lot.VENDOR}`,
                STORAGE:     `${lot.STORAGE_CODE} - ${lot.STORAGE}`,
                PRINTER:     PrinterName,
                PaperType:   PaperType,
                Divisions:   1
            });
        }

        else this.Cancel();       
        this.isLoading.set(false);
        this.onLoading.emit(false);
    }  


    /** */
    public async Cancel() {
        this.lot.set(null);
        const PRINTER   = this.formRef().GetControlValue<PRINTER_DTO>('PRINTER')?.PRINTER_NAME; 
        const PaperType = this.formRef().GetControlValue<any>('PaperType');     
        this.formRef().Reset({ Divisions: 0, PRINTER, PaperType }); 
    } 


    /** */
    protected async Save() {   
        if(this.formRef().IsValid()) {
            this.isLoading.set(true);
            this.onLoading.emit(true);

            const { LOT_NUMBER, Divisions, PaperType, PRINTER } = this.formRef().GetValue<any>();  

            let message = `<div>`;
            message += 'Split lot';
            message += `<br>#<b>${LOT_NUMBER}</b><br>`;
            message += `<div style='text-align:left; border-top:1px solid lightgray; margin-top:5px; padding-top:5px;'>`;
            message += `<b>Printer:</b> ${PRINTER.PRINTER_NAME}<br>`;
            message += `<b>Divisions:</b> ${Divisions} ${PaperType.Label}`; 
            message += `</div>`;
            message += `</div>`;     
             
            if(await this.alert.WarningConfirm(message, 'bi bi-arrows-expand-vertical')) {
                const response = await this.service.Split(LOT_NUMBER, Divisions, PaperType.Value, PRINTER.PRINTER_NAME);

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
        return this.showGoBackButton() && this.IsOnlyWhiteSpace(this.lot()) 
            ? 'fa-cart-flatbed fa-solid font-size-20px' : 'cancel'; 
    }


    /** */
    protected colorLeft = () => { 
        return this.showGoBackButton() && this.IsOnlyWhiteSpace(this.lot()) 
            ? 'primary' : 'danger'; 
    }


    /** */
    protected ActionLeft() {
        if(this.showGoBackButton() && this.IsOnlyWhiteSpace(this.lot())) {
            this.onBack.emit();
        } 

        else this.Cancel();
    }
}