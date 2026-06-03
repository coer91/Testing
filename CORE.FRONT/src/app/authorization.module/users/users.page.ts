import { Component, inject, signal } from '@angular/core'; 
import { IUser } from '@appShared/interfaces';
import { UsersService } from '@appShared/services'; 
import { Page, Tools } from 'hwmx-angular/tools'; 

@Component({
    selector: 'users-page',
    templateUrl: './users.page.html',  
    standalone: false
})
export class UsersPage extends Page {   
 
    constructor() { super('Users') }   
    
    //Inject
    private usersService = inject(UsersService);  

    //Variables
    protected readonly path       = '/authorization/users-form'; 
    protected readonly userList   = signal<IUser[]>([]); 
    protected readonly onlyActive = signal<boolean>(true);

    /** MAIN method */
    protected override async StartPage() {  
        this.GetUserList();
    } 


    /** */
    protected async GetUserList() {   
        this.isLoading.set(true);

        const departmentId = null;
        const onlyActive   = this.onlyActive();

        this.SetPageFilters({ departmentId, onlyActive });
        const response = await this.usersService.GetUserList(departmentId, onlyActive);
        
        this.userList.set(response);  
        this.isLoading.set(false);
    } 
}