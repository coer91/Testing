import { Component, inject, signal, viewChild } from '@angular/core';    
import { ModulesService, ProjectsService } from '@appShared/services';
import { WIASelectBox } from 'hwmx-angular/components';
import { IOption } from 'hwmx-angular/interfaces';
import { Page, Tools } from 'hwmx-angular/tools'; 
import { IModule } from '@appShared/interfaces';

@Component({
    selector: 'modules-page',
    templateUrl: './modules.page.html',  
    standalone: false
})
export class ModulesPage extends Page {   
 
    constructor() { super('Modules') }   
    
    //Services
    private projectsService = inject(ProjectsService);
    private modulesService  = inject(ModulesService);

    //Elements
    protected projectRef = viewChild.required<WIASelectBox<IOption>>('projectRef');

    //Variables
    protected readonly path        = '/structure/modules-form';
    protected readonly project     = signal<IOption | null>(null);
    protected readonly projectList = signal<IOption[]>([]);
    protected readonly datasource  = signal<IModule[]>([]);


    /** */
    protected override async StartPage() {
        const projectList = await this.projectsService.GetProjectList();
        this.projectList.set(projectList); 
        
        const project = projectList.find(x => x.Id == this.filters()?.projectId);

        if(project) { 
            this.project.set(project);
            await this.GetModuleList();
        }

        else {
            this.isLoading.set(false);
            Tools.Sleep().then(() => this.projectRef().Focus()); 
        }
    } 


    /** */
    protected async GetModuleList() { 
        this.isLoading.set(true);  
        this.datasource.set([]);

        const projectId = this.project()?.Id || 0;
        this.SetPageFilters({ projectId });

        if(projectId > 0) {             
            this.datasource.set(await this.modulesService.GetModuleList(projectId)); 
        } 
 
        Tools.Sleep().then(() => this.isLoading.set(false)); 
    } 
}