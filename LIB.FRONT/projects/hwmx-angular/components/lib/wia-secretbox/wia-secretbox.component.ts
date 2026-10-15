import { Component, computed, effect, EffectRef, input } from '@angular/core';
import { WIATextBox } from '../wia-textbox/wia-textbox.component';
import { CONTROL_VALUE } from 'hwmx-angular/tools';

@Component({
    selector: 'wia-secretbox',
    templateUrl: '../wia-textbox/wia-textbox.component.html', 
    styleUrl: '../wia-textbox/wia-textbox.component.scss', 
    providers: [CONTROL_VALUE(WIASecretBox)],
    standalone: false
})
export class WIASecretBox extends WIATextBox {   

    //Variables
    protected effectRef!: EffectRef;

    //Input   
    public override maxLength = input<number | string>(20);
    public showSecret         = input<boolean>(true);
    
    
    constructor() {
        super();

        this.effectRef = effect(() => {
            this._isSecretComponent.set(this.showSecret());
        });
    }


    protected override Destructor() {
        super.Destructor();
        this.effectRef?.destroy();
    }


    //Computed
    protected override _inputType = computed<'text' | 'password' | 'number'>(() => {
        if(this._showSecretClosed()) return 'password'; 
        return 'text';
    });
}