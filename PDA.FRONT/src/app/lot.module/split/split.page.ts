import { Component, inject, signal, viewChild } from '@angular/core';   
import { FormBuilder, Validators } from '@angular/forms';
import { ILotInformation } from '@appShared/interfaces';
import { MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { WIAForm } from 'hwmx-angular/components';
import { IOption } from 'hwmx-angular/interfaces';
import { Tools } from 'hwmx-angular/tools';
import { SplitService } from './split.service';

@Component({
    selector: 'split-page',
    templateUrl: './split.page.html', 
    standalone: false
})
export class SplitPage extends PagePDA {  
 
    constructor() { super('MM_LT0201') }  

    //Inject   
    private masterService = inject(MasterService);  
    private splitService  = inject(SplitService);  
    private formBuilder   = inject(FormBuilder);

    //Elements
    protected formRef = viewChild.required<WIAForm>('formRef'); 

    //Variables 
    protected printerList = signal<IOption[]>([]);
    protected lot = signal<ILotInformation | null>(null);
    
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
    protected override async StartPage() {
        const printerList = await this.masterService.GetPrinterList();
        this.printerList.set(printerList);
        const Printer = printerList.find(x => x.Name.equals('WH_UNPACKING')); 
        
        await Tools.Sleep();
        this.formRef().SetControlValue('Printer', Printer);
        super.StartPage();
    }


    /** On Scann Code */
    protected override async OnScanCode(scanner: string) {
        const lotNumber = Scanner.DecodeProperty(scanner, 'lotNumber');   
       
        if(Tools.IsNotNull(this.lot())) {
            if(this.lot()?.LotNumber.equals(lotNumber)) return;

            const response = await this.alert.WarningConfirm(`Cancel transaction<br>#<b>${this.lot()!.LotNumber}</b> ?`);            
            if(!response) return; 
            await this.Cancel(false);
        }

        this.isLoading.set(true);            

        const lot = await this.masterService.GetLotInformation(lotNumber);

        if(lot) {
            this.lot.set(lot);

            if(lot.HasDefect) {
                this.alert.Warning('This lot has defects', lotNumber, 'barcode');
                return;
            } 
    
            else if(lot.IsDeleted) { 
                this.alert.Warning('This lot has been deleted', lotNumber, 'barcode');
                return;
            }

            const PrinterName = this.formRef().GetControlValue<IOption>('Printer')?.Name;
            const PaperType = this.formRef().GetControlValue<any>('PaperType');
             
            this.formRef().Reset({
                LotNumber:      lot.LotNumber,  
                PartNumber:     lot.PartNumber,
                EoNumber:       lot.EoNumber,
                PartName:       lot.PartName, 
                Qty:            lot.Qty, 
                Unit:           lot.Unit,
                Vendor:         lot.Vendor,
                Storage:        `${lot.StorageCode} - ${lot.Storage}`,
                Printer:        PrinterName,
                PaperType:      PaperType,
                Divisions:      1
            });
        }

        else this.Cancel(false);       
        this.isLoading.set(false);
    }


    /** */
    protected showPrintButton = () => { 
        return this.IsNotOnlyWhiteSpace(this.lot())
            && this.formRef().IsValid();
    }  


    /** */
    protected async Cancel(showAlert: boolean) {
        if(showAlert) {
            const response = await this.alert.WarningConfirm(`Cancel transaction<br>#<b>${this.lot()!.LotNumber}</b> ?`);
            if(!response) return; 
        } 

        this.lot.set(null);
        const Printer   = this.formRef().GetControlValue<IOption>('Printer')?.Name; 
        const PaperType = this.formRef().GetControlValue<any>('PaperType');     
        this.formRef().Reset({ Divisions: 0, Printer, PaperType });
    } 



    /** */
    protected async Save() {   
        if(this.formRef().IsValid()) {
            this.isLoading.set(true);
            const { LotNumber, Divisions, PaperType, Printer } = this.formRef().GetValue<any>();  

            let message = `<div>`;
            message += 'Confirm transaction';
            message += `<br>#<b>${LotNumber}</b><br>`;
            message += `<div style='text-align:left; border-top:1px solid lightgray; margin-top:5px; padding-top:5px;'>`;
            message += `<b>Printer:</b> ${Printer.Name}<br>`;
            message += `<b>Divisions:</b> ${Divisions} ${PaperType.Label}`; 
            message += `</div>`;
            message += `</div>`;     
             
            if(await this.alert.WarningConfirm(message)) {
                const response = await this.splitService.SplitLot(LotNumber, Divisions, PaperType.Value, Printer.Name);

                if(response.ok) {
                    await this.alert.SuccessOk(`New lot created<br>#<b>${response.data}</b>`);
                    this.Cancel(false);
                }
            } 

            this.isLoading.set(false);
        }  
    } 
}