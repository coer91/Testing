import { Component } from '@angular/core';
import { CONTROL_VALUE } from 'hwmx-angular/tools';
import { WIATextBox } from '../wia-textbox/wia-textbox.component';

@Component({
    selector: 'wia-datebox',
    templateUrl: '../wia-textbox/wia-textbox.component.html', 
    styleUrl: '../wia-textbox/wia-textbox.component.scss', 
    providers: [CONTROL_VALUE(WIADateBox)],
    standalone: false
})
export class WIADateBox extends WIATextBox {   

    
}