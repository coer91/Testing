import { Component, computed, inject, input } from "@angular/core";
import { UsersService } from "@appShared/services";

import { IUser } from "@appShared/interfaces";
import { Section } from "hwmx-angular/tools"; 

@Component({
    selector: 'users-form-information',
    templateUrl: './users-form-information.html',  
    standalone: false
})
export class UsersFormInformation extends Section { 
    
    //Injects 
    private usersService  = inject(UsersService);

    //Elements 

    //Variables 
    
    //Inputs
    public readonly user = input.required<IUser>(); 

    //Output 


    /** */
    protected _isLoading = computed(() => {
        return this.isLoading() || this.isLoadingExternal()
    }); 
}