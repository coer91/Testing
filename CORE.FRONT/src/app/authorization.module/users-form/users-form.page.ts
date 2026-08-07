import { Component, computed, inject, signal, viewChild } from '@angular/core'; 
import { PartnersService, UsersService } from '@appShared/services'; 
import { UsersFormInformation } from './users-form-information';
import { UsersFormAddRoles } from './users-form-addRoles';
import { IOption } from 'hwmx-angular/interfaces';
import { IUser } from '@appShared/interfaces';
import { Page } from 'hwmx-angular/tools';  

@Component({
    selector: 'users-form-page',
    templateUrl: './users-form.page.html',  
    standalone: false
})
export class UsersFormPage extends Page {   
 
    constructor() { super('New') }  

    //Injections
    private service = inject(UsersService); 
    private partnersService = inject(PartnersService);

    //Elements 
    protected addRolesRef = viewChild.required<UsersFormAddRoles>('addRolesRef');
    protected informationRef = viewChild.required<UsersFormInformation>('informationRef');

    //Variables
    protected readonly tab  = signal<number>(0);
    protected readonly user = signal<IUser | null>(null);
    protected readonly partnerList = signal<IOption[]>([]);
    
    //RouterParams
    protected userId = computed<string>(() => this.user()?.User || this.GetParam('userId') || '');

    /** MAIN method */
    protected override async StartPage() {  
        this.partnerList.set(await this.partnersService.GetPartnerList()); 

        await this.GetUser();   
        this.tab.set(this.filters()?.tab || 0); 
    } 


    /** Get User */
    protected async GetUser() { 
        this.isLoading.set(true);

        const response = await this.service.GetUser(this.userId());

        if(response.ok) {
            this.SetPageName(response.data.User);            
             
            if(response.data.Id <= 0 && response.data.IsActive && this.canUpdate()) { 
                const userResponse = await this.service.CreateUser(response.data.User);

                if(userResponse.ok) {
                    response.data.Id = userResponse.data.Id;
                }
            }

            this.user.set(response.data);
        }  

        this.isLoading.set(false);
    } 
    
    
    /** */
    protected showButton = computed<boolean>(() => {
        switch(this.tab()) { 
            case 0 : return true;
            case 1 : return true;
            default: return false;
        } 
    }); 


    /** */
    protected iconButton = computed<string>(() => {
        switch(this.tab()) {
            case 0 : return 'save'; 
            case 1 : return 'add';
            default: return '';
        } 
    });


    /** */
    protected colorButton = computed<'success' | 'primary'>(() => {
        switch(this.tab()) {
            case 0 : return 'success'; 
            case 1 : return 'primary';
            default: return 'primary';
        } 
    });


    /** Get User */
    protected async Action() { 
        switch(this.tab()) { 
            case 0 : {
                this.informationRef().Save();
                break;
            }

            case 1 : {
                this.addRolesRef().OpenModal();
                break;
            }
        } 
    } 
}