import { Component, inject, signal, viewChild } from '@angular/core';    
import { IModule, ISubmodule } from '@appShared/interfaces';
import { ModulesService, ProjectsService, SubmodulesService } from '@appShared/services';
import { WIASelectBox } from 'hwmx-angular/components';
import { IOption } from 'hwmx-angular/interfaces';
import { Page, Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'submodules-page',
    templateUrl: './submodules.page.html',  
    standalone: false
})
export class SubmodulesPage extends Page {   
 
    constructor() { super('Submodules') }    

    //Inject
    private projectsService   = inject(ProjectsService);
    private modulesService    = inject(ModulesService);
    private submodulesService = inject(SubmodulesService);

    //Elements
    protected projectRef = viewChild<WIASelectBox<IOption>>('projectRef');
    protected moduleRef  = viewChild<WIASelectBox<IModule>>('moduleRef');

    //Variables
    protected readonly path        = '/structure/submodules-form';
    protected readonly project     = signal<IOption | null>(null);
    protected readonly projectList = signal<IOption[]>([]);
    protected readonly module      = signal<IModule | null>(null);
    protected readonly moduleList  = signal<IModule[]>([]);
    protected readonly datasource  = signal<ISubmodule[]>([]);


    /** MAIN method */
    protected override async StartPage() {
        const projectList = await this.projectsService.GetProjectList();
        this.projectList.set(projectList); 
        
        const project = projectList.find(x => x.Id == this.filters()?.projectId);

        if(project) { 
            this.project.set(project);
            await this.GetModuleList();
            return;
        }
        
        this.isLoading.set(false);
        await Tools.Sleep();
        this.projectRef()?.Focus();
    }


    /** */
    protected async GetModuleList() { 
        this.isLoading.set(true);   
        
        this.datasource.set([]);
        this.moduleList.set([]);
        this.module.set(null);

        const projectId = this.project()?.Id || 0;

        if(projectId > 0) {             
            const moduleList = await this.modulesService.GetModuleList(projectId);
            this.moduleList.set(moduleList);  

            const module = moduleList.find(x => x.Id == this.filters()?.moduleId) || null;
            this.module.set(module);   

            await this.GetSubmoduleList();
        }  
         
        this.isLoading.set(false); 
    } 


    /** */
    protected async GetSubmoduleList() { 
        this.isLoading.set(true);   
        
        this.datasource.set([]);  
        const projectId = this.project()?.Id || 0;
        const moduleId  = this.module()?.Id  || 0;
        this.SetPageFilters({ projectId, moduleId });          
 
        this.datasource.set(await this.submodulesService.GetSubmoduleList(projectId, moduleId));         
        this.isLoading.set(false); 
    } 
}