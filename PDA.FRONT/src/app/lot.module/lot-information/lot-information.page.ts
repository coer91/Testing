import { Component, inject, viewChild } from '@angular/core';   
import { MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { WIAForm } from 'hwmx-angular/components'; 
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'lot-information-page',
    templateUrl: './lot-information.page.html', 
    standalone: false
})
export class LotInformationPage extends PagePDA {  
 
    constructor() { super('MM_LT0601') }  

    //Inject 
    private masterService = inject(MasterService);  
    private formBuilder   = inject(FormBuilder);

    //Elements
    protected from = viewChild.required<WIAForm>('form'); 
    
    //Form
    protected formGroup = this.formBuilder.group({
        LotNumber:      ['', []],
        PartNumber:     ['', []],
        EoNumber:       ['', []],
        PartName:       ['', []],
        Qty:            ['', []],
        Unit:           ['', []],
        Vendor:         ['', []],
        Storage:        ['', []],
        Location:       ['', []],
        ProductionDate: ['', []],
        HasDefect:      ['', []],
        IsDeleted:      ['', []],
        CaseLabelId:    ['', []],         
    });    


    /** On Scann Code */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);                  
        scanner = Scanner.DecodeProperty(scanner, 'lotNumber');     

        const information = await this.masterService.GetLotInformation(scanner);
         
        if(information) this.from().Reset({
            LotNumber:      information.LotNumber,  
            PartNumber:     information.PartNumber,
            EoNumber:       information.EoNumber,
            PartName:       information.PartName, 
            Qty:            information.Qty, 
            Unit:           information.Unit,
            Vendor:         information.Vendor,
            Storage:        `${information.StorageCode} - ${information.Storage}`,
            Location:       information.Location,
            ProductionDate: information.ProductionDate,
            HasDefect:      information.HasDefect ? 'YES' : 'NO',
            IsDeleted:      information.IsDeleted ? 'YES' : 'NO',
            CaseLabelId:    information.CaseLabelId 
        });

        else this.from().Reset();         
        this.isLoading.set(false);
    }
}