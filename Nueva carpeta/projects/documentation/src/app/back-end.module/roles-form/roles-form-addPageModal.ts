 
import { Component, inject, input, output, signal, viewChild } from '@angular/core';     
import { WIAGrid, WIAModal } from 'hwmx-angular/components';
import { Section, Tools } from 'hwmx-angular/tools'; 
import { IOption } from 'hwmx-angular/interfaces';
import { IPage, IRolePage } from './interfaces';
import { PagesService, RolesPagesService } from './services';

@Component({
    selector: 'roles-form-addPageModal',
    templateUrl: './roles-form-addPageModal.html',  
    standalone: false
})
export class RolesFormAddPageModal extends Section { 
    
    //Injections 
    private pagesService      = inject(PagesService);
    private rolesPagesService = inject(RolesPagesService);

    //Elements
    protected modalRef = viewChild.required<WIAModal>('modalRef');  
    protected gridRef  = viewChild.required<WIAGrid<IPage>>('gridRef'); 

    //Variables
    protected readonly pageList = signal<IPage[]>([]); 

    //Inputs
    public readonly role        = input.required<IOption>();
    public readonly project     = input.required<IOption | null>();
    public readonly projectList = input.required<IOption[]>(); 

    //Output
    protected readonly onPagesAdded = output<void>();

    
    /** */
    public Open(): void { 
        this.modalRef().Open();    
    }


    /** Get Page available list */
    public async GetAvailablePageList(project: IOption | null, pageListAssigned: IRolePage[]) { 
        this.isLoading.set(true);   

        this.pageList.set([]);
        const projectId   = project?.Id || 0;
        const moduleId    = 0;
        const submoduleId = 0;
        const onlyActive  = true; 

        if(projectId > 0) {            
            const response = await this.pagesService.GetPageList(projectId, moduleId, submoduleId, onlyActive);
           
            const EXCEPTION_LIST = pageListAssigned.filter(x => x.ProjectId == this.project()?.Id).map(item => item.PageId);
            const PAGE_ID_LIST   = response.map(item => item.Id).except(EXCEPTION_LIST); 
            const DATA           = response.filter(item => PAGE_ID_LIST.some(x => x == item.Id)); 
            this.pageList.set(DATA); 
        }  

        this.isLoading.set(false); 
    } 


    /** */
    protected async SaveRolePage() {
        this.isLoading.set(true);
        const roleId = this.role().Id;
        const pageIdList = this.gridRef().selectedValue().map(item => item.Id);        
        const response = await this.rolesPagesService.CreateRolePageList(roleId, pageIdList);

        if(response.ok) {
            this.isLoading.set(true);
            this.modalRef().Close();
            this.onPagesAdded.emit();
            await Tools.Sleep();
            this.alert.Success('Pages added');
        }

        else {
            this.alert.Danger('SaveRolePage');
        }

        this.isLoading.set(false);
    }
} 