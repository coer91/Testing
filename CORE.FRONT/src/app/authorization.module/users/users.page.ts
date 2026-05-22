import { Component } from '@angular/core'; 
import { Page } from 'hwmx-angular/tools'; 

@Component({
    selector: 'users-page',
    templateUrl: './users.page.html',  
    standalone: false
})
export class UsersPage extends Page {   
 
    constructor() { super('Users') }    

    /** MAIN method */
    protected override async StartPage() {  
        
    } 
}