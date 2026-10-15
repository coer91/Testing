import { Component, inject, signal, viewChild } from '@angular/core';    
import { PagePDA } from '@appShared/tools'; 
import { GATE_PERMIT_DETAIL_DTO, PermitGateService } from './permit-gate.service';
import { FormBuilder, Validators } from '@angular/forms';
import { WIAForm } from 'hwmx-angular/components';
import { userSIGNAL } from 'hwmx-angular/signals';

@Component({
    selector: 'permit-gate-page',
    templateUrl: './permit-gate.page.html', 
    standalone: false
})
export class PermitGatePage extends PagePDA {  
 
    constructor() { super('MM_OT0701') } 
     
    //Inject     
    private service = inject(PermitGateService);
    private formBuilder = inject(FormBuilder);

    //Elements
    protected from = viewChild.required<WIAForm>('form'); 

    //Variables
    protected dataSource = signal<GATE_PERMIT_DETAIL_DTO[]>([]);

    //Form
    protected formGroup = this.formBuilder.group({
        GUBUN:       ['', [Validators.required]],
        SHIP_NO:     ['', [Validators.required]],
        ITEM_CNT:    ['', [Validators.required]],
        SHIP_QTY:    ['', [Validators.required]],
        FACTORY_NM:  ['', []],
        SHIPPING_DT: ['', [Validators.required]],         
    }); 
    
    
    /** On Scann Code */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);  
                 
        const response = await this.service.GetGatePermit(scanner); 

        if(response) {
            this.from().Reset({
                GUBUN:       response.GUBUN,  
                SHIP_NO:     response.SHIP_NO,
                ITEM_CNT:    response.ITEM_CNT,
                SHIP_QTY:    response.SHIP_QTY, 
                FACTORY_NM:  response.FACTORY_NM, 
                SHIPPING_DT: response.SHIPPING_DT 
            });

            const detail = await this.service.GetGatePermitDetail(scanner);
            this.dataSource.set(detail);
        }   

        else this.from().Reset();     

        this.isLoading.set(false);
    }   


    /** */
    protected async Save() { 
        if(await this.translatory.confirm.SaveTransaction()) {
            this.isLoading.set(true); 
            const { Factory } = userSIGNAL()!;
            
            const SHIP_NO = this.from().GetControlValue<string>('SHIP_NO');
            const response = await this.service.SetGatePermit(SHIP_NO, Factory); 

            if(response.ok) {
                this.from().Reset();
                this.dataSource.set([]);
                this.alert.Success(response.data);
            }

            this.isLoading.set(false);
        }
    } 


    /** */
    protected get counter() {  
        return this.from().IsValid() ? `
            <h4 class="width-100 flex-middle-between color-gray"> 
                <span>
                    ${this.from().GetControlValue<string>('GUBUN', '')}
                </span>

                <span>
                    ${this.dataSource().length}
                    <i class="iw-box-fill font-size-20px"></i>                  
                </span>
            </h4>
        ` : ''; 
    } 
}