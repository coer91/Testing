import { Component, computed, inject, signal, viewChild } from '@angular/core';    
import { IHttpResponse, IInputChange, IOption, IPatch } from 'hwmx-angular/interfaces';
import { ProjectsService, RolesPagesService, RolesService } from '@appShared/services';
import { WIAForm, WIAModal, WIASelectBox, WIATextBox } from 'hwmx-angular/components';
import { RolesFormAddPageModal } from './roles-form-addPageModal';
import { FormBuilder, Validators } from '@angular/forms';
import { IRolePage } from '@appShared/interfaces';
import { Page, Tools } from 'hwmx-angular/tools';  

@Component({
    selector: 'roles-form-page',
    templateUrl: './roles-form.page.html',  
    standalone: false
})
export class RolesFormPage extends Page {   
 
    constructor() { super('new') }  

    //Injections
    private rolesServices      = inject(RolesService);
    private rolesPagesServices = inject(RolesPagesService); 
    private projectsService    = inject(ProjectsService);
    private formBuilder        = inject(FormBuilder);

    //Elements
    protected formRef         = viewChild.required<WIAForm>('formRef');
    protected modalAddPageRef = viewChild.required<RolesFormAddPageModal>('modalAddPageRef'); 
    protected modalRef        = viewChild.required<WIAModal>('modalRef');   
    protected nameRef         = viewChild.required<WIATextBox>('nameRef'); 
    protected projectRef      = viewChild.required<WIASelectBox<IOption>>('projectRef'); 
    
    //Variables 
    protected readonly project     = signal<IOption | null>(null);
    protected readonly projectList = signal<IOption[]>([]);
    protected readonly pageList    = signal<IRolePage[]>([]); 
    protected readonly role        = signal<IOption | null>(null);
   
    //RouterParams
    protected roleId = computed<number>(() => this.role()?.Id || Number(this.GetParam('roleId') || '0'));
    
    //Form
    protected formGroup = this.formBuilder.group({
        name:     ['',    [Validators.required]],
        isActive: [false, []],
        about:    ['',    []],
    });
    
     
    /** Main */
    protected override async StartPage() {  
        this.isUpdating.set(this.roleId() > 0); 
        
        //Load Catalogs
        await this.GetProjectList();

        if(this.isUpdating()) { 
            await this.GetRoleById();
            await this.GetAssignedPageList();  

            if(Tools.IsNull(this.project())) {
                await Tools.Sleep();
                this.projectRef().Focus();
            }
        }

        else {
            this.isLoading.set(false);
            await Tools.Sleep();
            this.nameRef().Focus();
        } 
    }


    /** Get Project Catalog */
    protected async GetProjectList() { 
        const projectList = await this.projectsService.GetProjectList();
        this.projectList.set(projectList);  

        //Get Filters
        await Tools.Sleep();
        const option = this.filters();
        if(option) this.project.set(option);   
    } 


    /** Get Role */
    protected async GetRoleById() { 
        this.isLoading.set(true);

        const response = await this.rolesServices.GetRoleById(this.roleId());

        if(response.ok) { 
            this.SetPageName(response.data.Name);
            this.role.set(response.data);

            //Fill Form
            this.formRef()?.Reset({
                name:     response.data.Name,
                isActive: response.data.IsActive,
                about:    response.data.About
            });
        }

        else {
            this.alert.Danger('GetRoleById', 'Error', 'bug');
            console.error(response.message);
        }

        this.isLoading.set(false);
    } 


    /** Get Assigned Pages */
    protected async GetAssignedPageList() { 
        this.isLoading.set(true);

        const response = await this.rolesPagesServices.GetRolePageList(this.roleId());

        if(response.ok) { 
            this.pageList.set(response.data);
            
            if(this.project()) {
                await this.modalAddPageRef().GetAvailablePageList(this.project(), response.data);
            }  
        }

        else {
            this.alert.Danger('GetAssignedPageList', 'Error', 'bug');
            console.error(response.message);
        }

        this.isLoading.set(false);
    } 


    /** */
    protected pageListProject = computed(() => this.pageList().filter(x => x.ProjectId == this.project()?.Id));


    /** */
    protected get isActive(): boolean {
        return !this.isUpdating() 
            || (this.isUpdating() && this.formRef().GetControlValue('isActive', false)); 
    }  


    /** */
    protected async UpdateProject(project: IOption | null) {
        this.isLoading.set(true); 
        this.SetPageFilters(project);
        this.project.set(project);
        await this.modalAddPageRef().GetAvailablePageList(project, this.pageList());
        await Tools.Sleep(100);
        this.isLoading.set(false);
    }


    /** */
    protected async PatchRole(path: 'isActive' | 'about', value: boolean | string) {   
        if(!this.isUpdating() || this.isLoading()) return;

        this.isLoading.set(true); 

        const roleId = this.roleId();                
        const patch: IPatch[] = [{ path: `/${path}`, op: 'replace', value }];         
        const response = await this.rolesServices.PatchRole(roleId, patch);

        if(response.ok) {  
            let message = 'The <b>Rol</b> has been updated';
            let icon    = 'fa-solid fa-circle-check';

            if(path.equals('isActive')) {
                message = `The <b>Rol</b> has been ${value ? 'Activated' : 'Disabled'}`;
                if(!value) icon = 'fa-solid fa-circle-minus';
            }

            this.alert.Success(message, this.role()?.Name, icon);
        }

        else {
            this.alert.Danger('PatchRole', 'Error', 'bug');
            console.error(response.message);
        }

        this.isLoading.set(false);
    }
    
    
    /** */
    protected async PatchPermission(event: IInputChange<IRolePage>) { 
        if(!this.isUpdating() || this.isLoading()) return; 
        
        this.isLoading.set(true); 
        const { after, property, value } = event;
        const patch: IPatch[] = [{ path: `/${property}`, op: 'replace', value }]; 
         
        if(after) {
            const response = await this.rolesPagesServices.PatchRolePage(after.Id, patch); 
    
            if(response.ok) {
                const DATA_SOURCE = [...this.pageList()];
                const INDEX = DATA_SOURCE.findIndex(x => x.Id == after.Id);
                if(INDEX >= 0) (DATA_SOURCE as any[])[INDEX][property!] = value;
                this.pageList.set(DATA_SOURCE);

                let message = `${value ? '<b>Enabled</b> for ' : '<b>Disabled</b> for '}`;
                switch(property){
                    case 'canCreate': message += 'create '; break;
                    case 'canUpdate': message += 'update '; break;
                    case 'canDelete': message += 'delete '; break;
                }
                message += `in <u>${after.Page} page</u>`;

                this.alert.CloseAllAlerts();
                this.alert.Success(message, this.role()?.Name);
            }
    
            else {
                this.alert.Danger('PatchPermission', 'Error', 'bug');
                console.error(response.message);
                await this.GetAssignedPageList();
            } 
        }

        this.isLoading.set(false);
    }


    /** */
    protected async Cancel() {
        this.isLoading.set(true);

        if(this.isUpdating()) {
            await this.GetRoleById();
            await this.GetAssignedPageList();
        }

        else {
            this.formRef().Reset({});
            this.isLoading.set(false);
        }
    } 


    /** */
    protected async Save() {
        this.isLoading.set(true);

        const FORM = this.formRef().GetValue() as any; 

        let role: IOption = {
            Id:       this.roleId(),
            Name:     FORM.name,
            About:    FORM.about,
            IsActive: FORM.isActive
        } 
        
        //UPDATE ROLE
        let response: IHttpResponse<IOption>;
        if(this.isUpdating()) {
            response = await this.rolesServices.UpdateRole(role); 

            if(response.ok) {
                this.role.set(response.data);
                this.SetPageName(response.data.Name);
                this.SetResponsePage(response.data);
                
                this.alert.Success('The <b>Rol</b> has been updated', this.role()?.Name);
            }

            else {
                this.alert.Danger('UpdateRole', 'Error', 'bug');
                console.error(response.message);
            }
        }

        //CREATE ROLE
        else {
            response = await this.rolesServices.CreateRole(role); 

            if(response.ok) {
                this.role.set(response.data);                
                this.SetPageName(response.data.Name, response.data.Id);
                this.SetResponsePage(response.data);

                this.formRef()?.Reset({
                    name:     response.data.Name,
                    isActive: response.data.IsActive,
                    about:    response.data.About
                });

                this.alert.Success('The <b>Rol</b> has been created', response.data.Name);
                this.isUpdating.set(true);
            }

            else {
                this.alert.Danger('CreateRole', 'Error', 'bug');
                console.error(response.message);
            }
        }

        this.isLoading.set(false);
    }


    /** */
    protected async DeleteRole() {
        const roleId = this.role()?.Id || 0;

        if(roleId > 0) {
            const answer = await this.alert.DangerConfirm(`Delete ${this.role()?.Name} Role?`, 'delete');
    
            if(answer) {       
                this.isLoading.set(true);
                const response = await this.rolesServices.DeleteRole(roleId);
        
                if(response.ok) {
                    this.alert.Success(`${this.role()?.Name} role has been deleted`, 'Deleted', 'delete');
                    this.GoToSource();
                }
        
                else {
                    if(response.status < 500) this.alert.Warning(response.message);
                    else this.alert.Danger(`DeleteRole`, 'Error', 'bug');
                    console.error(response.message);
                    this.isLoading.set(false);
                }  
            }
        }
    } 


    /** */
    protected async DeletePage(rolePage: IRolePage) {
        const answer = await this.alert.DangerConfirm(`Delete ${rolePage.Page} page?`, 'delete');

        if(answer) {
            this.isLoading.set(true);

            const rolePageId = rolePage.Id;
            const response = await this.rolesPagesServices.DeleteRolePage(rolePageId);

            if(response.ok) {
                const DATA_SOURCE = [...this.pageList()];
                const INDEX = DATA_SOURCE.findIndex(x => x.Id == rolePageId);
                if(INDEX >= 0) DATA_SOURCE.splice(INDEX, 1);
                this.pageList.set(DATA_SOURCE);
                await this.modalAddPageRef().GetAvailablePageList(this.project(), DATA_SOURCE);
                this.alert.Success(`${rolePage.Page} page has been removed`, 'Removed', 'delete');  
            }

            else {
                this.alert.Danger('DeletePage', 'Error', 'bug');
                console.error(response.message);
                await this.GetAssignedPageList(); 
            } 

            this.isLoading.set(false);
        }
    }   
}