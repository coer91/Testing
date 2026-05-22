import { Component, inject, signal, viewChild } from '@angular/core';    
import { IModule, IPage, ISubmodule } from '@appShared/interfaces';
import { ModulesService, PagesService, ProjectsService, SubmodulesService } from '@appShared/services';
import { WIASelectBox } from 'hwmx-angular/components';
import { IOption } from 'hwmx-angular/interfaces';
import { Page, Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'pages-page',
    templateUrl: './pages.page.html',  
    standalone: false
})
export class PagesPage extends Page {   
 
    constructor() { super('Pages') }    

    //Inject
    private projectsService   = inject(ProjectsService);
    private modulesService    = inject(ModulesService);
    private submodulesService = inject(SubmodulesService);
    private pagesService      = inject(PagesService);

    //Elements
    protected projectRef   = viewChild<WIASelectBox<IOption>>('projectRef');
    protected moduleRef    = viewChild<WIASelectBox<IModule>>('moduleRef');
    protected submoduleRef = viewChild<WIASelectBox<ISubmodule>>('submoduleRef');

    //Variables
    protected readonly path          = '/structure/pages-form';
    protected readonly project       = signal<IOption | null>(null);
    protected readonly projectList   = signal<IOption[]>([]);
    protected readonly module        = signal<IModule | null>(null);
    protected readonly moduleList    = signal<IModule[]>([]);
    protected readonly submodule     = signal<ISubmodule | null>(null);
    protected readonly submoduleList = signal<ISubmodule[]>([]);
    protected readonly onlyActive    = signal<boolean>(true);
    protected readonly pageList      = signal<IPage[]>([]);


    /** MAIN method */
    protected override async StartPage() {          
        if(Tools.IsNotNull(this.filters()?.onlyActive)) {
            this.onlyActive.set(this.filters()?.onlyActive);
        }

        const projectList = await this.projectsService.GetProjectList();
        this.projectList.set(projectList); 
        
        const project = projectList.find(x => x.Id == this.filters()?.projectId);

        if(project) { 
            this.project.set(project);
            await this.GetModuleList();
        }

        else {
            this.isLoading.set(false);
            await Tools.Sleep();
            this.projectRef()?.Focus();
        }
    } 


    /** */
    protected async GetModuleList() { 
        this.isLoading.set(true);  

        this.module.set(null);
        this.moduleList.set([]);

        this.submodule.set(null);
        this.submoduleList.set([]);

        this.pageList.set([]);

        const projectId = this.project()?.Id || 0;

        if(projectId > 0) { 
            const moduleList = await this.modulesService.GetModuleList(projectId);            
            this.moduleList.set(moduleList);
            await Tools.Sleep();

            const module = moduleList.find(x => x.Id == this.filters()?.moduleId);

            if(module) {
                this.module.set(module);
                await this.GetSubmoduleList();
                return;
            }

            await this.GetPageList();
            return;             
        } 

        this.isLoading.set(false); 
    }


    /** */
    protected async GetSubmoduleList() { 
        this.isLoading.set(true);   

        this.submodule.set(null);
        this.submoduleList.set([]);
        this.pageList.set([]);
 
        const projectId = this.project()?.Id || 0;
        const moduleId  = this.module()?.Id || 0;
                 
        const submoduleList = await this.submodulesService.GetSubmoduleList(projectId, moduleId);            
        this.submoduleList.set(submoduleList);  
        await Tools.Sleep();

        const submodule = submoduleList.find(x => x.Id == this.filters()?.submoduleId);
        if(submodule) this.submodule.set(submodule);
        
        await this.GetPageList();
    }


    /** */
    protected async GetPageList() { 
        this.isLoading.set(true);   

        this.pageList.set([]);

        const projectId   = this.project()?.Id || 0;
        const moduleId    = this.module()?.Id || 0;
        const submoduleId = this.submodule()?.Id || 0;
        const onlyActive  = this.onlyActive();
        this.SetPageFilters({ projectId, moduleId, submoduleId, onlyActive });

        if(projectId > 0) {            
            const response = await this.pagesService.GetPageList(projectId, moduleId, submoduleId, onlyActive);
            this.pageList.set(response);
        } 

        this.isLoading.set(false); 
    } 
}