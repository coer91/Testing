import { Component, computed, inject, input, output, signal, viewChild } from "@angular/core";
import { RolesService, UsersService } from "@appShared/services";
import { IOption } from "hwmx-angular/interfaces";
import { IUser, IUserRole } from "@appShared/interfaces";
import { Section, Tools } from "hwmx-angular/tools";
import { WIAGrid, WIAModal } from "hwmx-angular/components";

@Component({
    selector: 'users-form-addRoles',
    templateUrl: './users-form-addRoles.html',  
    standalone: false
})
export class UsersFormAddRoles extends Section { 
    
    //Injects
    private rolesServices = inject(RolesService);
    private usersService  = inject(UsersService);

    //Elements
    protected readonly modal = viewChild.required<WIAModal>('modal');
    protected readonly grid  = viewChild.required<WIAGrid<IOption>>('grid');

    //Variables
    protected readonly path     = '/authorization/roles-form'; 
    protected readonly roleList = signal<IOption[]>([]);
    protected readonly roleAvailableList = signal<IOption[]>([]); 
    
    //Inputs
    public readonly user = input.required<IUser>(); 

    //Output
    protected readonly onRoleAdded   = output<IUserRole[]>();
    protected readonly onRoleDeleted = output<IOption>();


    /** */
    protected _isLoading = computed(() => {
        return this.isLoading() || this.isLoadingExternal()
    });


    /** */
    public async OpenModal() {
        this.isLoading.set(true);

        let roleList = this.roleList();

        if(roleList.length <= 0) {
            const onlyActive = false;
            roleList = await this.rolesServices.GetRoleList(onlyActive);
            this.roleList.set(roleList);
        }

        const ROLE_AVAILABLE_LIST = roleList.except(this.user().Roles, 'Name');  
        this.roleAvailableList.set(ROLE_AVAILABLE_LIST); 

        this.modal().Open();
        await Tools.Sleep();
        this.isLoading.set(false);
    }


    /** */
    protected async CloseModal() { 
        this.modal().Close();
        await Tools.Sleep(500);
        this.roleAvailableList.set([]);  
    }


    /** */
    protected async SaveRoles() { 
        const roleList = this.grid().selectedValue();

        let message = `Add ${roleList.length > 1 ? `${roleList.length} roles` : `${roleList[0].Name} role`} ?`;
        const answer = await this.alert.SuccessConfirm(message, 'save');

        if(answer) {
            this.isLoading.set(true);

            const userId = this.user().Id;
            const roleIdList = this.grid().selectedValue().map(x => x.Id);
            const roles = await this.usersService.CreateUserRoleList(userId, roleIdList);

            if(roles.length > 0) {
                message = roleList.length > 1 ? `${roleList.length} roles have been added` : `<b>${roleList[0].Name}</b> role has been added`;
                this.alert.Success(message, '', 'save');
                
                this.CloseModal();
                this.onRoleAdded.emit(roles);
            }

            this.isLoading.set(false);
        }        
    }


    /** */
    protected async DeleteRole(role: IOption) {
        const answer = await this.alert.DangerConfirm(`Delete ${role.Name} ?`, 'delete');
          
        if(answer) {
            this.isLoading.set(true);

            const userId = this.user().Id;
            const roleId = role.Id;
            
            const response = await this.usersService.DeleteUserRole(userId, roleId);

            if(response) {
                this.alert.Success('The role has been deleted', role.Name);
                this.onRoleDeleted.emit(role);
            }

            this.isLoading.set(false);
        }
    } 
}