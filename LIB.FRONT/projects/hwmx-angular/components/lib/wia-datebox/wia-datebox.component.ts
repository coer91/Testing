import { Component, computed, input, signal } from '@angular/core';
import { CONTROL_VALUE, Dates, Tools } from 'hwmx-angular/tools';
import { WIATextBox } from '../wia-textbox/wia-textbox.component';

@Component({
    selector: 'wia-datebox',
    templateUrl: '../wia-textbox/wia-textbox.component.html', 
    styleUrl: '../wia-textbox/wia-textbox.component.scss', 
    providers: [CONTROL_VALUE(WIADateBox)],
    standalone: false
})
export class WIADateBox extends WIATextBox {   

    protected override readonly _value = signal<Date | null>(null);

    //Inputs
    public readonly type = input<'date' | 'time' | 'datetime' | 'month' | 'week'>('date');
    public readonly min  = input<string | Date | null>(null);
    public readonly max  = input<string | Date | null>(null); 


    protected override _SetValue(value: any): void {
        if(Tools.IsOnlyWhiteSpace(value)) {
            value = null;
        } 

        if(Tools.IsNotNull(value)) {
            switch(this.type()) {
                default: {
                    value = Dates.IsValidDate(value) 
                        ? Dates.ToDate(value) 
                        : null;                     
                    break;
                }
            }
        } 

        super._SetValue(value);
    }

    
    //Computed
    protected override _inputType = computed<'text' | 'password' | 'number' | 'date' | 'time' | 'datetime-local' | 'month' | 'week'>(() => { 
        switch(this.type()) {
            case 'time'    : return 'time';
            case 'datetime': return 'datetime-local';
            case 'month'   : return 'month';
            case 'week'    : return 'week';
            default        : return 'date';
        }
    });


    //Computed
    protected override _ValueByComponent = computed<string | null>(() => {
        if(Tools.IsOnlyWhiteSpace(this._value())) return null;
        

        switch(this.type()) {
            // case 'time'    : return 'time';
            // case 'datetime': return 'datetime-local';
            // case 'month'   : return 'month';
            // case 'week'    : return 'week';
            default: {
                if(Dates.IsValidDate(this._value()!)) {
                    return Dates.ToFormatDB(this._value()!).substring(0, 10);
                }                  
            }
        }


        return null;
    }); 


    //Computed
    protected override _min = computed<string | null>(() => { 
        
        return '2026-10-13';
    });



    //Computed
    protected override _max = computed<string | null>(() => { 
        
        return '2026-10-15';
    });



}