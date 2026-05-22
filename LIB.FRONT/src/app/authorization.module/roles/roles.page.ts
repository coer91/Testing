import { Component, inject, signal } from '@angular/core';    
import { RolesService } from '@appShared/services';
import { IOption } from 'hwmx-angular/interfaces';
import { Page, Tools } from 'hwmx-angular/tools'; 

@Component({
    selector: 'roles-page',
    templateUrl: './roles.page.html',  
    standalone: false
})
export class RolesPage extends Page {   
 
    constructor() { super('Roles') }   
    
    //Inject
    private rolesService = inject(RolesService);  

    //Variables
    protected readonly path     = '/authorization/roles-form'; 
    protected readonly roleList = signal<IOption[]>([]); 


    /** MAIN method */
    protected override async StartPage() {  
        this.GetRoleList();
    }


    /** */
    protected async GetRoleList() {  
        this.isLoading.set(true);

        const onlyActive = false;
        this.SetPageFilters({ onlyActive });
        const response = await this.rolesService.GetRoleList(onlyActive);

        if(response.ok) {
            this.roleList.set(response.data);
        } 

        else {
            this.alert.Danger('GetRoleList');
            console.error(response.message);
        }

        this.isLoading.set(false);
    } 
}