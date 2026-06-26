import { Component, inject, signal } from '@angular/core';     
import { ActivatedRoute } from '@angular/router';
import { ProjectsService, SidenavService } from '@appShared/services';
import { ICallbackItem, IMenu, IOption } from 'hwmx-angular/interfaces';
import { Page, Tools } from 'hwmx-angular/tools'; 

@Component({
    selector: 'sidenav-page',
    templateUrl: './sidenav.page.html',  
    standalone: false
})
export class SidenavPage extends Page {   
 
    constructor() { super('Sidenav') }   
    
    //Inject
    private projectsService  = inject(ProjectsService);
    protected sidenavService = inject(SidenavService); 

    private readonly activatedRouteXXX = inject(ActivatedRoute); 

    //Variables    
    protected module      = signal<IMenu | null>(null);
    protected submodule   = signal<IMenu | null>(null);
    protected project     = signal<IOption | null>(null);
    protected projectList = signal<IOption[]>([]);
    protected level1      = signal<IMenu[]>([]);
    protected level2      = signal<IMenu[]>([]);
    protected level3      = signal<IMenu[]>([]);

    /** MAIN method */
    protected override async StartPage() {
        this.projectList.set(await this.projectsService.GetProjectList()); 

        const { projectId, moduleId, submoduleId } = this.filters(); 
        const project = this.projectList().find(x => x.Id == projectId) || null; 
            
        if(project) {
            this.project.set(project);
            await this.GetLevel1();

            const module = this.level1().find(x => x.Id == moduleId) || null;
           
            if(module) { 
                await this.GetLevel2(module);

                const submodule = this.level2().find(x => x.Id == submoduleId) || null;

                if(submodule) {
                    await this.GetLevel3(submodule);
                }
            } 
        }
             
        await Tools.Sleep(1000);

        this.isLoading.set(false);
 
        const activeKey = this.activatedRouteXXX.snapshot.data['activeKey'] as string;
        console.log(activeKey)   
    }  


    //
    protected navigateButton = (item: ICallbackItem<IMenu>): boolean => {
        return Tools.IsOnlyWhiteSpace(item.row.Path)
            && Tools.IsNotNull(item.row.Items);
    }


    /** */
    protected async GetLevel1() {
        this.level3.set([]);
        this.level2.set([]);
        this.level1.set([]);

        this.module.set(null);
        this.submodule.set(null);

        if(this.project()) {
            const projectId  = this.project()?.Id || 0;
            const datasource = await this.sidenavService.GetNavigationByProject(projectId); 
            
            await Tools.Sleep();
            this.level1.set(datasource);
            this.SetPageFilters({ projectId });
        }
    }  


    /** */
    protected async GetLevel2(module: IMenu) {
        this.level3.set([]);
        this.level2.set([]); 

        this.submodule.set(null);
        this.module.set(module);

        await Tools.Sleep();
        this.level2.set(module?.Items || []); 

        const { projectId } = this.filters(); 
        this.SetPageFilters({ projectId, moduleId: module.Id });
    } 


    /** */
    protected async GetLevel3(submodule: IMenu) { 
        this.submodule.set(submodule); 
        this.level3.set(submodule?.Items || []); 

        const { projectId, moduleId } = this.filters(); 
        this.SetPageFilters({ projectId, moduleId, submoduleId: submodule.Id });
    } 


    /** */
    protected async UpdateLevel1() {
        this.isLoading.set(true);

        let sequence = 0;
        const projectId  = this.project()?.Id || 0;
        const navigation = [...this.level1()].map(item => ({ ...item, Sequence: ++sequence }));
         
        const response = await this.sidenavService.UpdateLevel1(projectId, navigation); 
        if(response) this.alert.Success('Lv1 Updated'); 

        this.isLoading.set(false);
    }


    /** */
    protected async UpdateLevel2() {
        this.isLoading.set(true);

        let sequence = 0;
        const projectId  = this.project()?.Id || 0;
        const moduleId   = this.module()?.Id  || 0;
        const navigation = [...this.level2()].map(item => ({ ...item, Sequence: ++sequence }));
        
        const response = await this.sidenavService.UpdateLevel2(projectId, moduleId, navigation); 
        if(response) this.alert.Success('Lv2 Updated'); 

        this.isLoading.set(false);
    }


    /** */
    protected async UpdateLevel3() {
        this.isLoading.set(true);

        let sequence = 0;
        const projectId   = this.project()?.Id   || 0;
        const moduleId    = this.module()?.Id    || 0;
        const submoduleId = this.submodule()?.Id || 0;
        const navigation  = [...this.level3()].map(item => ({ ...item, Sequence: ++sequence }));
         
        const response = await this.sidenavService.UpdateLevel3(projectId, moduleId, submoduleId, navigation); 
        if(response) this.alert.Success('Lv3 Updated'); 

        this.isLoading.set(false);
    }
}