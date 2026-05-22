import { Component } from '@angular/core'; 
import { Page } from 'hwmx-angular/tools'; 

@Component({
    selector: 'users-form-page',
    templateUrl: './users-form.page.html',  
    standalone: false
})
export class UsersFormPage extends Page {   
 
    constructor() { super('New') }    

    /** MAIN method */
    protected override async StartPage() {  
        
    } 
}