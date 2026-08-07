import { Component, computed, inject, signal, viewChild } from '@angular/core';    
import { FormBuilder, Validators } from '@angular/forms';
import { IMenuItem, IModule, ISubmodule } from '@appShared/interfaces';
import { ModulesService, ProjectsService, SubmodulesService } from '@appShared/services';
import { WIAForm, WIASelectBox, WIATextBox } from 'hwmx-angular/components';
import { IOption, IPatch } from 'hwmx-angular/interfaces';
import { Page, Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'submodules-form-page',
    templateUrl: './submodules-form.page.html',  
    standalone: false
})
export class SubmodulesFormPage extends Page {   
 
    constructor() { super('New') }    

    //Services 
    private formBuilder       = inject(FormBuilder);
    private projectsService   = inject(ProjectsService);
    private modulesService    = inject(ModulesService);
    private submodulesService = inject(SubmodulesService);

    //Elements
    protected formRef   = viewChild.required<WIAForm>('formRef');
    protected nameRef   = viewChild.required<WIATextBox>('nameRef');
    protected moduleRef = viewChild.required<WIASelectBox<IModule>>('moduleRef');

    //Variables
    protected readonly pathPages    = '/structure/pages-form'; 
    protected readonly submodule    = signal<ISubmodule | null>(null);
    protected readonly projectList  = signal<IOption[]>([]);
    protected readonly moduleList   = signal<IModule[]>([]);
    protected readonly menuTypeList = signal<IOption[]>([]); 

    //RouterParams
    protected submoduleId = computed<number>(() => this.submodule()?.Id || Number(this.GetParam('submoduleId') || '0'));

    //Form
    protected formGroup = this.formBuilder.group({
        English:       ['',    [Validators.required]],
        Spanish:       ['',    []],
        Korean:        ['',    []], 
        Project:       ['',    [Validators.required]], 
        Module:        ['',    [Validators.required]],
        MenuType:      ['',    [Validators.required]],
        Icon:          ['',    []],
        ShowIndicator: [true,  []], 
        ShowIndex:     [false, []], 
    }); 


    //Computed
    protected itemList = computed<IMenuItem[]>(() => {
        if(this.submodule()) { 
            const pages = this.submodule()!.Pages.map<IMenuItem>(item => ({
                Id:       `page-${item.Id}`,
                Icon:     item.Icon,
                Item:     item.Name,
                Type:     'Page',
                Path:     `${this.pathPages}/${item.Id}`,
                Sequence: item.Sequence
            })); 
            
            return [...pages].sortDesc('Sequence');
        }

        return [];
    });


    /** MAIN method */
    protected override async StartPage() {
        this.isUpdating.set(this.submoduleId() > 0); 

        //Load Catalogs 
        this.projectList.set(await this.projectsService.GetProjectList()); 
        this.menuTypeList.set(await this.projectsService.GetMenuTypeList()); 

        if(this.isUpdating()) {  
            await this.GetSubmoduleById();            
        }

        else {
            this.isLoading.set(false);
            await Tools.Sleep();
            this.nameRef().Focus();
        } 
    } 
    

    /** Get Module */
    protected async GetSubmoduleById() { 
        this.isLoading.set(true);

        const submodule = await this.submodulesService.GetSubmoduleById(this.submoduleId()); 

        if(submodule) { 
            this.submodule.set(submodule);
            this.SetPageName(submodule.Name, submodule.Id);   
            this.SetResponsePage(submodule);      
            this.isUpdating.set(true);
 
            this.moduleList.set(await this.modulesService.GetModuleList(submodule.ProjectId));
            await Tools.Sleep()

            //Fill Form
            this.formRef().Reset({
                English:       submodule.Translatory.English,
                Spanish:       submodule.Translatory.Spanish,
                Korean:        submodule.Translatory.Korean,
                Project:       this.projectList().find(x => x.Id == submodule.ProjectId),
                Module:        this.moduleList().find(x => x.Id == submodule.ModuleId),
                MenuType:      this.menuTypeList().find(x => x.Id == submodule.MenuTypeId),
                Icon:          submodule.Icon,
                ShowIndicator: submodule.ShowIndicator,
                ShowIndex:     submodule.ShowIndex,
            }); 
        } 

        this.isLoading.set(false);
    } 


    /** */
    protected async Patch(value: boolean, path: '/ShowIndex' | '/ShowIndicator') {   
        if(!this.isUpdating() || this.isLoading()) return;

        this.isLoading.set(true); 
                
        const patch: IPatch[] = [{ path, op: 'replace', value }];         
        const response = await this.submodulesService.PatchSubmodule(this.submoduleId(), patch)

        if(response) {
            this.alert.Success(`Indicator updated`);
        }

        this.isLoading.set(false);
    }


    /** */
    protected async Save() {
        this.isLoading.set(true);

        const FORM = this.formRef().GetValue() as any; 

        let module: ISubmodule = {
            Id:            this.submoduleId(),
            Name:          FORM.English,
            Icon:          FORM.Icon,   
            ProjectId:     FORM.Project.Id,
            Project:       FORM.Project.Name,          
            ModuleId:      FORM.Module.Id,
            Module:        FORM.Module.Name,
            MenuTypeId:    FORM.MenuType.Id,
            MenuType:      FORM.MenuType.Name,
            ShowIndicator: FORM.ShowIndicator,
            ShowIndex:     FORM.ShowIndex,
            Sequence:      0,
            Pages:         [], 
            Translatory:   {
                Id:      this.submodule()?.Translatory?.Id || 0,
                English: FORM.English,
                Spanish: FORM.Spanish,
                Korean:  FORM.Korean
            }
        }
                
        //UPDATE          
        if(this.isUpdating()) {
            const response = await this.submodulesService.UpdateSubmodule(module);  
            
            if(response) {
                this.alert.Success('The <b>Submodule</b> has been updated', response.Name); 
                await this.GetSubmoduleById();
            }
        }

        //CREATE 
        else {
            const response = await this.submodulesService.CreateSubmodule(module); 

            if(response) {
                this.submodule.set(response);
                this.alert.Success('The <b>Submodule</b> has been created', response.Name);
                await this.GetSubmoduleById();
            }  
        } 

        this.isLoading.set(false);
    }


    /** */
    protected async Delete() {      
        this.isLoading.set(true);  
        
        const answer = await this.alert.DangerConfirm(`Delete ${this.submodule()?.Name} Submodule?`, 'delete');
    
        if(answer) {       
            this.isLoading.set(true);
            const response = await this.submodulesService.DeleteSubmodule(this.submoduleId());
    
            if(response) {
                this.alert.Success(`${this.submodule()?.Name} has been deleted`, 'Submodule Deleted', 'delete');
                this.GoToSource();
            } 
        }
        
        this.isLoading.set(false); 
    }


    /** */
    protected async GetModuleList() { 
        this.isLoading.set(true);   
          
        this.formRef().SetControlValue('Module', null);
        this.moduleList.set([]);
         

        const projectId = this.formRef().GetControlValue<IOption>('Project')?.Id || 0;

        if(projectId > 0) {             
            const moduleList = await this.modulesService.GetModuleList(projectId);
            this.moduleList.set(moduleList);
                        
            this.isLoading.set(false);
            await Tools.Sleep();
            this.moduleRef().Focus();
        } 

        this.isLoading.set(false); 
    } 
}