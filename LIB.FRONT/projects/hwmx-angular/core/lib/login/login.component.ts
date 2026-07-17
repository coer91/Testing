import { AfterViewInit, Component, computed, inject, output, signal, viewChild } from '@angular/core';  
import { environmentSIGNAL, isLoadingSIGNAL } from 'hwmx-angular/signals';
import { Dates, Tools } from 'hwmx-angular/tools';
import { ILogin } from 'hwmx-angular/interfaces'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WIAButton, WIAForm, WIASecretBox, WIATextBox } from 'hwmx-angular/components';
declare const appSettings: any;

@Component({
    selector: 'login',
    templateUrl: './login.component.html', 
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginPage implements AfterViewInit { 

    //Inject
    protected formBulder = inject(FormBuilder);

    //Elements
    protected readonly _form          = viewChild.required<WIAForm>('form');
    protected readonly _inputUser     = viewChild.required<WIATextBox>('userRef');
    protected readonly _inputPassword = viewChild.required<WIASecretBox>('passwordRef');
    protected readonly _loginButton   = viewChild.required<WIAButton>('loginRef');

    //Variables
    protected readonly version    = '0.0.0'; 
    protected readonly title      = appSettings?.appInfo?.title || '';
    protected readonly isLoading  = isLoadingSIGNAL; 
    protected readonly background = ''; 
    protected readonly view       = signal<'LOGIN' | 'RECOVERY'>('LOGIN');  

    //form
    protected formGroup: FormGroup = this.formBulder.group({
        user:     ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]], 
    });

    //Outputs 
    protected readonly onLogin = output<ILogin>();
    protected readonly onRecoveryPassword = output<string>();


    constructor() {
        if(Tools.IsNotOnlyWhiteSpace(appSettings?.appInfo?.version)) this.version = appSettings?.appInfo?.version; 
        if(Tools.IsNotOnlyWhiteSpace(appSettings?.background?.login)) this.background = appSettings?.background?.login; 
    }


    async ngAfterViewInit() {
        await Tools.Sleep();
        if(this._form().GetControlValue<string>('user', '').length < 6) this.FocusUser();
        else this.FocusPassword(); 
    } 


    //Computed
    protected _icon = computed(() => { 
        switch(environmentSIGNAL().info) {           
            case 'DEVELOPMENT': return 'iw-developer-fill';
            case 'STAGING'    : return 'iw-quality-fill'; 
        }  

        return '';
    });


    //Computed
        protected _version = computed(() => environmentSIGNAL().info === 'PRODUCTION' ? this.version : environmentSIGNAL().info);
    
    
        //Computed
        protected _copy = computed(() => `${appSettings?.appInfo?.company} © ${Dates.GetCurrentDate().getFullYear()}`);


    //Function
    protected _Toggle(): void {
        if(this.view() === 'LOGIN') this.Show('RECOVERY');
        else this.Show('LOGIN');
    }


    //Function
    protected _Click(): void {
        this.isLoading.set(true);
        const { user, password } = this._form().GetValue<any>(); 

        if(this.view() === 'LOGIN') {
            this.onLogin.emit({ User: user, Password: password });
        }

        else {
            this.onRecoveryPassword.emit(user);
        }
    }


    //Function
    protected _ShowButton = () => {
        return (this.view() === 'LOGIN' && this._form().IsValid())
            || (this.view() === 'RECOVERY' && this._form().IsValidControl('user'))
    }
      


    /** */
    public Show(view: 'LOGIN' | 'RECOVERY') {
        this.view.set(view);  
        
        Tools.Sleep().then(_ => {    
            if(view === 'RECOVERY') {    
                if(this._form().IsValidControl('user')) this._loginButton().Focus();       
                else this.FocusUser(); 
            }
    
            else if (view === 'LOGIN') { 
                if(this._form().IsValidControl('user')) this.FocusPassword(true);       
                else this.FocusUser();
            } 
        });
    }


    /** */
    public FocusUser(): void { 
        Tools.Sleep(200).then(() => this._inputUser().Focus());
    }


    /** */
    public FocusPassword(select: boolean = false): void {  
        Tools.Sleep(200).then(() => this._inputPassword().Focus(select));
    }


    /** */
    public SetUser(user: string): void { 
        this._form().SetControlValue('user', user);
    } 
}