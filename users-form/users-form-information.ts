import { Component, computed, inject, input, output, signal } from "@angular/core";
import { UsersService } from "@appShared/services";

import { IUser } from "@appShared/interfaces";
import { Section, Tools } from "hwmx-angular/tools"; 
import { IOption } from "hwmx-angular/interfaces";

@Component({
    selector: 'users-form-information',
    templateUrl: './users-form-information.html',  
    standalone: false
})
export class UsersFormInformation extends Section { 
    
    //Injects  
    private service = inject(UsersService);  

    //Variables 
    protected partner = signal<IOption | null>(null);
        
    //Inputs
    public readonly user        = input.required<IUser>(); 
    public readonly userPhoto   = input.required<string>(); 
    public readonly partnerList = input.required<IOption[]>();

    //Output 
    protected readonly onUpdated = output<IUser>();
    protected readonly onUpdatedPhoto = output<string>();

    /** */
    protected override async StartSection() {
        this.isLoading.set(true);        

        const partner = this.partnerList().find(x => x.Id == this.user().PartnerId) || null;
        this.partner.set(partner);

        Tools.Sleep().then(() => this.isLoading.set(false));
    }


    /** */
    protected _isLoading = computed<boolean>(() => {
        return this.isLoading() || this.isLoadingExternal()
    }); 


    /** */
    protected _hasId = computed<boolean>(() => {
        return (this.user()?.Id || 0) > 0;
    }); 


    /** */
    public async Save() {
        this.onLoading.emit(true);

        const user = { ...this.user() };
        user.PartnerId = this.partner()?.Id   || 0;
        user.Partner   = this.partner()?.Name || '';
                  
        const response = await this.service.UpdateUser(user);

        if(response.ok) {
            this.alert.Success(`User has been updated`);
        }

        Tools.Sleep().then(() => this.onUpdated.emit(user));
    }


    /** */
    public async LoadPhoto(photo: File) {
        if(photo) {
            const response = await this.service.UploadUserImage(this.user().User, photo);
            
            if(response.ok) {   
                this.alert.Success('Photo has been loaded');   
                this.onUpdatedPhoto.emit(response.data);           
            }
        }
    }


    /** */
    public async DeletePhoto() {
        if(true) {
            const response = await this.service.DeleteUserImage(this.user().User);
            
            if(response.ok) {  
                this.alert.Success('Photo has been deleted');      
                this.onUpdatedPhoto.emit('');       
            }
        }
    }
}