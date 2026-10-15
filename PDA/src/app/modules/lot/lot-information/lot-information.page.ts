import { Component, inject, viewChild } from '@angular/core';   
import { MasterService } from '@appShared/services';
import { PagePDA, Scanner } from '@appShared/tools'; 
import { WIAForm } from 'hwmx-angular/components'; 
import { FormBuilder } from '@angular/forms';
import { Dates, Tools } from 'hwmx-angular/tools';

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


    /** */
    protected override async OnScanCode(scanner: string) {        
        try {
            this.isLoading.set(true);                          
            const lotNumber = Scanner.DecodeProperty(scanner, 'LotNumber');
            const response = await this.masterService.GetLotInformation(lotNumber);
             
            if(response) this.from().Reset({
                LOT_NUMBER:      response?.LOT_NUMBER,  
                PART_NUMBER:     response?.PART_NUMBER,
                EO_NUMBER:       response?.EO_NUMBER,
                PART_NAME:       response?.PART_NAME, 
                QTY:             response?.QTY, 
                UNIT:            response?.UNIT,
                VENDOR:          `${response?.VENDOR_CODE} - ${response?.VENDOR}`,
                STORAGE:         `${response?.STORAGE_CODE} - ${response?.STORAGE}`,
                LOCATION:        response?.LOCATION,
                PRODUCTION_DATE: Tools.IsNotOnlyWhiteSpace(response?.PRODUCTION_DATE) ? Dates.FromYYYYMMDD(response?.PRODUCTION_DATE)?.toFormatDate('MDY') : response?.PRODUCTION_DATE,
                HAS_DEFECT:      response?.HAS_DEFECT?.equals('Y') ? 'YES' : 'NO',
                IS_DELETED:      response?.IS_DELETED?.equals('Y') ? 'YES' : 'NO',
                CASE_LABEL_ID:   response?.CASE_LABEL_ID 
            });
    
            else this.from().Reset();             
        } 
        
        catch (error: any) {
            console.log(error);
            this.alert.Danger('Error', null, 'bug');
        }

        finally {
            this.isLoading.set(false); 
        }
    }
}