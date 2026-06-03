import { Component, computed, inject, signal, viewChild } from '@angular/core';    
import { FormBuilder, Validators } from '@angular/forms';
import { IModule, IPage, ISubmodule } from '@appShared/interfaces';
import { ModulesService, PagesService, ProjectsService, SubmodulesService } from '@appShared/services';
import { WIAForm, WIASelectBox, WIATextBox } from 'hwmx-angular/components';
import { IOption, IPatch } from 'hwmx-angular/interfaces';
import { Page, Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'pages-form-page',
    templateUrl: './pages-form.page.html',  
    standalone: false
})
export class PagesFormPage extends Page {   
 
    constructor() { super('New') }    

    //Inject 
    private formBuilder       = inject(FormBuilder);
    private projectsService   = inject(ProjectsService);
    private modulesService    = inject(ModulesService);
    private submodulesService = inject(SubmodulesService);
    private pageService       = inject(PagesService);
     
    //Elements
    protected formRef      = viewChild.required<WIAForm>('formRef');
    protected nameRef      = viewChild.required<WIATextBox>('nameRef');
    protected moduleRef    = viewChild.required<WIASelectBox<IModule>>('moduleRef');
    protected submoduleRef = viewChild.required<WIASelectBox<ISubmodule>>('submoduleRef');

    //Variables 
    protected readonly path         = '/authorization/roles-form';
    protected readonly page          = signal<IPage | null>(null);
    protected readonly projectList   = signal<IOption[]>([]);
    protected readonly moduleList    = signal<IModule[]>([]);
    protected readonly submoduleList = signal<ISubmodule[]>([]); 

    //RouterParams
    protected pageId = computed<number>(() => this.page()?.Id || Number(this.GetParam('pageId') || '0'));

    //Form
    protected formGroup = this.formBuilder.group({
        Name:      ['',    [Validators.required]],
        IsActive:  [true,  []], 
        Project:   ['',    [Validators.required]], 
        Module:    ['',    []],
        Submodule: ['',    []],
        Path:      ['',    [Validators.required, Validators.minLength(5)]],
        ActiveKey: ['',    []],
        Icon:      ['',    []],
        ShowIndex: [false, []], 
    }); 


    /** MAIN method */
    protected override async StartPage() {
        this.isUpdating.set(this.pageId() > 0); 

        //Load Catalogs 
        this.projectList.set(await this.projectsService.GetProjectList()); 

        if(this.isUpdating()) {  
            await this.GetPageById();            
        }

        else {
            this.isLoading.set(false);
            await Tools.Sleep();
            this.nameRef().Focus();
        } 
    } 


    /** Get Module */
    protected async GetPageById() { 
        this.isLoading.set(true);

        const response = await this.pageService.GetPageById(this.pageId()); 

        if(response) { 
            this.page.set(response);
            this.SetPageName(response.Name, response.Id);   
            this.SetResponsePage(response);      
            this.isUpdating.set(true);
 
            const projectId   = response.ProjectId   || 0;
            const moduleId    = response.ModuleId    || 0;
            const submoduleId = response.SubmoduleId || 0;

            if(projectId > 0)
                this.moduleList.set(await this.modulesService.GetModuleList(projectId));
            
            if(moduleId > 0)
                this.submoduleList.set(await this.submodulesService.GetSubmoduleList(projectId, moduleId));

            await Tools.Sleep()

            //Fill Form
            this.formRef().Reset({
                Name:      response.Name,
                IsActive:  response.IsActive, 
                Project:   this.projectList().find(x => x.Id == projectId), 
                Module:    this.moduleList().find(x => x.Id == moduleId), 
                Submodule: this.submoduleList().find(x => x.Id == submoduleId),
                Path:      response.Path,
                ActiveKey: response.ActiveKey,
                Icon:      response.Icon,
                ShowIndex: response.ShowIndex,
            }); 
        } 

        this.isLoading.set(false);
    } 


    /** */
    protected async Patch(value: boolean, path: '/IsActive' | '/ShowIndex') {   
        if(!this.isUpdating() || this.isLoading()) return;

        this.isLoading.set(true); 
                
        const patch: IPatch[] = [{ path, op: 'replace', value }];         
        const response = await this.pageService.PatchPage(this.pageId(), patch)

        if(response) {
            this.alert.Success(`The page has been ${value ? 'activated' : 'disabled'}`);
        }

        this.isLoading.set(false);
    }


    /** */
    protected async Delete() {      
        this.isLoading.set(true);  
        
        const answer = await this.alert.DangerConfirm(`Delete ${this.page()?.Name} Page?`, 'delete');
    
        if(answer) {       
            this.isLoading.set(true);
            const response = await this.pageService.DeletePage(this.pageId());
    
            if(response) {
                this.alert.Success(`${this.page()?.Name} has been deleted`, 'Page Deleted', 'delete');
                this.GoToSource();
            } 
        }
        
        this.isLoading.set(false); 
    }


    /** */
    protected async Save() {
        this.isLoading.set(true);

        const FORM = this.formRef().GetValue() as any; 

        let page: IPage = {
            Id:          this.pageId(),
            Name:        FORM.Name,
            Path:        FORM.Path,
            Icon:        FORM.Icon,   
            ProjectId:   FORM.Project.Id,
            Project:     FORM.Project.Name,          
            ModuleId:    FORM.Module?.Id,
            Module:      FORM.Module?.Name,
            SubmoduleId: FORM.Submodule?.Id,
            Submodule:   FORM.Submodule?.Name,
            IsActive:    FORM.IsActive,
            ActiveKey:   FORM.ActiveKey,
            ShowIndex:   FORM.ShowIndex,
            Sequence:    0,
            Roles:       []
        }
                
        //UPDATE          
        if(this.isUpdating()) {
            const response = await this.pageService.UpdatePage(page);  
            
            if(response) {
                this.alert.Success('The <b>Submodule</b> has been updated', response.Name); 
                await this.GetPageById();
            }
        }

        //CREATE 
        else {
            const response = await this.pageService.CreatePage(page); 

            if(response) {
                this.page.set(response);
                this.alert.Success('The <b>Submodule</b> has been created', response.Name);
                await this.GetPageById();
            }  
        } 

        this.isLoading.set(false);
    }


    /** */
    protected async GetModules() {
        this.isLoading.set(true);

        this.formRef().SetControlValue('Module', null);
        this.formRef().SetControlValue('Submodule', null);

        this.moduleList.set([]);
        this.submoduleList.set([]);

        const projectId = this.formRef().GetControlValue<IOption>('Project')?.Id || 0;

        if(projectId > 0) {
            this.moduleList.set(await this.modulesService.GetModuleList(projectId));
        }   
        
        await Tools.Sleep();
        this.isLoading.set(false);
    }


    /** */
    protected async GetSubmodules() { 
        this.isLoading.set(true);

        this.formRef().SetControlValue('Submodule', null); 
        this.submoduleList.set([]);

        const projectId = this.formRef().GetControlValue<IOption>('Project')?.Id || 0;
        const moduleId = this.formRef().GetControlValue<IOption>('Module')?.Id || 0;

        if(moduleId > 0) {
            this.submoduleList.set(await this.submodulesService.GetSubmoduleList(projectId, moduleId)); 
        }    
        
        await Tools.Sleep();
        this.isLoading.set(false);
    }


    //
    protected ShowDelete = computed(() => {
        return !this.isLoading()
            && (this.isUpdating() && Tools.IsBooleanFalse(this.formRef().GetControlValue<boolean>('IsActive', false)))
            && (this.page()?.Roles?.length || 0 <= 0)
    });
}