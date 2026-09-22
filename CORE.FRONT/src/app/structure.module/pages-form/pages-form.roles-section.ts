import { Component, inject, input, signal, viewChild } from '@angular/core'; 
import { RolesPagesService, RolesService } from '@appShared/services';
import { WIAGrid, WIAModal } from 'hwmx-angular/components';
import { Section } from 'hwmx-angular/tools';
import { IPage, IRolePage } from '@appShared/interfaces';
import { IInputChange, IOption, IPatch } from 'hwmx-angular/interfaces';

@Component({
    selector: 'pages-form-roles-section',
    templateUrl: './pages-form.roles-section.html',  
    standalone: false
})
export class PagesFormRolesSection extends Section { 
    
    //Services  
    private rolesService      = inject(RolesService);
    private rolesPagesService = inject(RolesPagesService); 

    //Elements
    protected modalRef = viewChild.required<WIAModal>('modalRef');  
    protected gridRef  = viewChild.required<WIAGrid<IOption>>('gridRef'); 

    //Variables 
    protected readonly roleList = signal<IOption[]>([]); 
    protected readonly roleListAvailable = signal<IOption[]>([]); 
    protected readonly rolePageList = signal<IRolePage[]>([]); 

    //Inputs
    public readonly page     = input.required<IPage>();
    public readonly siblings = input.required<(number | HTMLElement)[]>();


    /** */
    protected override async StartSection() {
        const onlyActive = true; 
        const roleList = await this.rolesService.GetRoleList(onlyActive);
        this.roleList.set(roleList);
    }


    /** */
    public async GetRoleList() { 
        this.isLoading.set(true);   

        this.rolePageList.set([]);
        this.roleListAvailable.set([]);
        
        
        const pageId = this.page().Id;       
        
        const rolePageList = await this.rolesPagesService.GetRolePageListByPageId(pageId);
        this.rolePageList.set([...rolePageList]);

        const EXCEPTION_LIST = rolePageList.map(item => item.RoleId);
        const ROLE_ID_LIST   = this.roleList().map(item => item.Id).except(EXCEPTION_LIST); 
        const DATA           = this.roleList().filter(item => ROLE_ID_LIST.some(x => x == item.Id)); 
        this.roleListAvailable.set(DATA);

        this.isLoading.set(false); 
    } 

     
    /** */
    protected async SaveRolePage() {
        this.isLoading.set(true);
        this.onLoading.emit(true);
        
        const pageId = this.page().Id;
        const roleIdList = this.gridRef().selectedValue().map(item => item.Id);        
        
        const response = await this.rolesPagesService.AddRoleListByPage(pageId, roleIdList);

        if(response.ok) { 
            this.modalRef().Close();  
            this.alert.Success('Roles added');
        } 

        await this.GetRoleList();
        this.isLoading.set(false);
        this.onLoading.emit(false);
    }


    /** */
    protected async PatchPermission(event: IInputChange<IRolePage>) { 
        if(this.isLoading()) return;  
        this.isLoading.set(true); 
        
        const { after, property, value } = event;
        const patch: IPatch[] = [{ path: `/${property}`, op: 'replace', value }]; 
         
        if(after) {            
            const response = await this.rolesPagesService.PatchRolePage(after.Id, patch); 
    
            if(response.ok) {
                const DATA_SOURCE = [...this.rolePageList()];
                const INDEX = DATA_SOURCE.findIndex(x => x.Id == after.Id);
                if(INDEX >= 0) (DATA_SOURCE as any[])[INDEX][property!] = value;
                this.rolePageList.set(DATA_SOURCE);

                let message = `${value ? '<b>Enabled</b> for ' : '<b>Disabled</b> for '}`;
                
                switch(property){
                    case 'canCreate': message += 'create '; break;
                    case 'canUpdate': message += 'update '; break;
                    case 'canDelete': message += 'delete '; break;
                }

                message += `in <u>${after.Role} role</u>`;

                this.alert.CloseAllAlerts();
                this.alert.Success(message, this.page()?.Name);
            }
    
            else {
                this.alert.Danger('PatchPermission', 'Error', 'bug');
                console.error(response.message);
                await this.GetRoleList();
            } 
        }

        this.isLoading.set(false);
    }


    /** */
    protected async DeleteRole(rolePage: IRolePage) {
        const answer = await this.alert.DangerConfirm(`Delete ${rolePage.Role} role?`, 'delete');

        if(answer) {
            this.isLoading.set(true);

            const rolePageId = rolePage.Id;
            const response = await this.rolesPagesService.DeleteRolePage(rolePageId);

            if(response.ok) { 
                this.alert.Success(`${rolePage.Role} role has been removed`, 'Removed', 'delete');  
            } 

            await this.GetRoleList(); 
        }
    }
} 