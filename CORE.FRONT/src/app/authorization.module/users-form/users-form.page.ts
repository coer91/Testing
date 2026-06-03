import { Component, computed, inject, signal, viewChild } from '@angular/core'; 
import { IUser } from '@appShared/interfaces';
import { UsersService } from '@appShared/services'; 
import { Page } from 'hwmx-angular/tools'; 
import { UsersFormAddRoles } from './users-form-addRoles';

@Component({
    selector: 'users-form-page',
    templateUrl: './users-form.page.html',  
    standalone: false
})
export class UsersFormPage extends Page {   
 
    constructor() { super('New') }  

    //Injections
    private usersService  = inject(UsersService); 

    //Elements 
    protected addRolesRef = viewChild.required<UsersFormAddRoles>('addRolesRef');

    //Variables
    protected readonly tab  = signal<number>(0);
    protected readonly user = signal<IUser | null>(null);
    
    //RouterParams
    protected userId = computed<string>(() => this.user()?.User || this.GetParam('userId') || '');

    /** MAIN method */
    protected override async StartPage() {  
        await this.GetUser();   
        this.tab.set(this.filters()?.tab || 0);   
    } 


    /** Get User */
    protected async GetUser() { 
        this.isLoading.set(true);

        const response = await this.usersService.GetUser(this.userId());

        if(response.ok) {
            this.SetPageName(response.data.User);
            this.user.set(response.data);
        }  

        this.isLoading.set(false);
    } 
    
    
    /** */
    protected showButton = computed<boolean>(() => {
        switch(this.tab()) { 
            case 1 : return true;
            default: return false;
        } 
    }); 


    /** */
    protected iconButton = computed<string>(() => {
        switch(this.tab()) { 
            case 1 : return 'add';
            default: return '';
        } 
    });


    /** Get User */
    protected async Action() { 
        switch(this.tab()) { 
            case 1 : {
                this.addRolesRef().OpenModal();
            }
        } 
    } 
}