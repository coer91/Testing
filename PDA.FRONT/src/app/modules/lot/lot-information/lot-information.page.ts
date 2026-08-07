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
        LOT_NUMBER:      ['', []],
        PART_NUMBER:     ['', []],
        EO_NUMBER:       ['', []],
        PART_NAME:       ['', []],
        QTY:             ['', []],
        UNIT:            ['', []],
        VENDOR:          ['', []],
        STORAGE:         ['', []],
        LOCATION:        ['', []],
        PRODUCTION_DATE: ['', []],
        HAS_DEFECT:      ['', []],
        IS_DELETED:      ['', []],
        CASE_LABEL_ID:   ['', []],         
    });    


    /** On Scann Code */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);                  
        scanner = Scanner.DecodeProperty(scanner, 'LotNumber');     

        const information = await this.masterService.GetLotInformation(scanner);
         
        if(information) this.from().Reset({
            LOT_NUMBER:      information.LOT_NUMBER,  
            PART_NUMBER:     information.PART_NUMBER,
            EO_NUMBER:       information.EO_NUMBER,
            PART_NAME:       information.PART_NAME, 
            QTY:             information.QTY, 
            UNIT:            information.UNIT,
            VENDOR:          `${information.VENDOR_CODE} - ${information.VENDOR}`,
            STORAGE:         `${information.STORAGE_CODE} - ${information.STORAGE}`,
            LOCATION:        information.LOCATION,
            PRODUCTION_DATE: information.PRODUCTION_DATE,
            HAS_DEFECT:      information.HAS_DEFECT.equals('Y') ? 'YES' : 'NO',
            IS_DELETED:      information.IS_DELETED.equals('Y') ? 'YES' : 'NO',
            CASE_LABEL_ID:   information.CASE_LABEL_ID 
        });

        else this.from().Reset();         
        this.isLoading.set(false);
    }
}