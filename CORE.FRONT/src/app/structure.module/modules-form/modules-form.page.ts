import { ModulesService, ProjectsService } from '@appShared/services';
import { Component, computed, inject, signal, viewChild } from '@angular/core';    
import { WIAForm, WIATextBox } from 'hwmx-angular/components';
import { FormBuilder, Validators } from '@angular/forms';
import { IModule, IMenuItem } from '@appShared/interfaces';
import { IOption, IPatch } from 'hwmx-angular/interfaces';
import { Page, Tools } from 'hwmx-angular/tools'; 

@Component({
    selector: 'modules-form-page',
    templateUrl: './modules-form.page.html',  
    standalone: false
})
export class ModulesFormPage extends Page {   
 
    constructor() { super('New') }   

    //Services 
    private formBuilder     = inject(FormBuilder);
    private projectsService = inject(ProjectsService);
    private modulesService  = inject(ModulesService);
    
    //Elements
    protected formRef = viewChild.required<WIAForm>('formRef');
    protected nameRef = viewChild.required<WIATextBox>('nameRef');

    //Variables
    protected readonly pathPages      = '/structure/pages-form';
    protected readonly pathSubmodules = '/structure/submodules-form';
    protected readonly module         = signal<IModule | null>(null);
    protected readonly projectList    = signal<IOption[]>([]);
    protected readonly menuTypeList   = signal<IOption[]>([]); 

    //RouterParams
    protected moduleId = computed<number>(() => this.module()?.Id || Number(this.GetParam('moduleId') || '0'));

    //Form
    protected formGroup = this.formBuilder.group({
        English:       ['',    [Validators.required]],
        Spanish:       ['',    []],
        Korean:        ['',    []], 
        Project:       ['',    [Validators.required]],
        MenuType:      ['',    [Validators.required]],
        Icon:          ['',    []],
        ShowIndicator: [true,  []],
        ShowIndex:     [false, []], 
    }); 

    /** */
    protected override async StartPage() {
        this.isUpdating.set(this.moduleId() > 0); 
       
        this.projectList.set(await this.projectsService.GetProjectList()); 
        this.menuTypeList.set(await this.projectsService.GetMenuTypeList()); 

        if(this.isUpdating()) {  
            await this.GetModuleById();            
        }

        else {
            this.isLoading.set(false);
            Tools.Sleep().then(() => this.nameRef().Focus()); 
        } 
    }  


    /** Get Module */
    protected async GetModuleById() { 
        this.isLoading.set(true);

        const module = await this.modulesService.GetModuleById(this.moduleId()); 

        if(module) { 
            this.module.set(module);
            this.SetPageName(module.Name, module.Id);   
            this.SetResponsePage(module);      
            this.isUpdating.set(true);

            //Fill Form
            this.formRef().Reset({
                English:       module.Translatory.English,
                Spanish:       module.Translatory.Spanish,
                Korean:        module.Translatory.Korean,
                Project:       this.projectList().find(x => x.Id == module.ProjectId),
                MenuType:      this.menuTypeList().find(x => x.Id == module.MenuTypeId),
                Icon:          module.Icon,
                ShowIndicator: module.ShowIndicator,
                ShowIndex:     module.ShowIndex,
            });
        } 

        Tools.Sleep().then(() => this.isLoading.set(false));  
    } 


    //Computed
    protected itemList = computed<IMenuItem[]>(() => {
        if(this.module()) { 
            const pages = this.module()!.Pages.map<IMenuItem>(item => ({
                Id:       `page-${item.Id}`,
                Icon:     item.Icon,
                Item:     item.Name,
                Type:     'Page',
                Path:     `${this.pathPages}/${item.Id}`,
                Sequence: item.Sequence
            }));

            const submodules = this.module()!.Submodules.map<IMenuItem>(item => ({
                Id:       `Submodule-${item.Id}`,
                Icon:     item.Icon,
                Item:     item.Name,
                Type:     'Submodule',
                Path:     `${this.pathSubmodules}/${item.Id}`,
                Sequence: item.Sequence
            }));  
            
            return [...pages, ...submodules].sortDesc('Sequence');
        }

        return [];
    });


    /** */
    protected async Patch(value: boolean, path: '/ShowIndex' | '/ShowIndicator') {   
        if(!this.isUpdating() || this.isLoading()) return;

        this.isLoading.set(true); 
                
        const patch: IPatch[] = [{ path, op: 'replace', value }];         
        const response = await this.modulesService.PatchModule(this.moduleId(), patch)

        if(response) {
            this.alert.Success(`Module has been updated`);
        }

        this.isLoading.set(false);
    }


    /** */
    protected async Save() {
        this.isLoading.set(true);

        const FORM = this.formRef().GetValue() as any; 

        let module: IModule = {
            Id:            this.moduleId(),
            Name:          FORM.English,
            Icon:          FORM.Icon,
            ProjectId:     FORM.Project.Id,
            Project:       FORM.Project.Name,
            MenuTypeId:    FORM.MenuType.Id,
            MenuType:      FORM.MenuType.Name,
            ShowIndicator: FORM.ShowIndicator,
            ShowIndex:     FORM.ShowIndex,
            Sequence:      0,
            Pages:         [],
            Submodules:    [], 
            Translatory:   {
                Id:      this.module()?.Translatory?.Id || 0,
                English: FORM.English,
                Spanish: FORM.Spanish,
                Korean:  FORM.Korean
            }
        }
                
        //UPDATE          
        if(this.isUpdating()) {
            const response = await this.modulesService.UpdateModule(module);  
            if(response) this.alert.Success('The <b>Module</b> has been updated', response.Name); 
        }

        //CREATE 
        else {
            const response = await this.modulesService.CreateModule(module); 

            if(response) {
                this.module.set(response);
                this.alert.Success('The <b>Module</b> has been created', response.Name);
            }  
        }
        
        await this.GetModuleById(); 
    }


    /** */
    protected async Delete() {      
        this.isLoading.set(true);  
        
        const answer = await this.alert.DangerConfirm(`Delete ${this.module()?.Name} Module?`, 'delete');
    
        if(answer) {       
            this.isLoading.set(true);
            const response = await this.modulesService.DeleteModule(this.moduleId());
    
            if(response) {
                this.alert.Success(`${this.module()?.Name} has been deleted`, 'Module Deleted', 'delete');
                this.GoToSource();
            } 
        }
        
        this.isLoading.set(false); 
    }
}

