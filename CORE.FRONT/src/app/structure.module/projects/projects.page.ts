import { Component, inject, signal } from '@angular/core';    
import { ProjectsService } from '@appShared/services';
import { IOption } from 'hwmx-angular/interfaces';
import { Page } from 'hwmx-angular/tools';

@Component({
    selector: 'projects-page',
    templateUrl: './projects.page.html',  
    standalone: false
})
export class ProjectsPage extends Page {   

    constructor() { super('Projects') }   

    //Inject
    private projectsService = inject(ProjectsService);

    //Variables
    protected readonly projectList = signal<IOption[]>([]);
     

    /** MAIN method */
    protected override async StartPage() { 
        this.projectList.set(await this.projectsService.GetProjectList()); 
    } 
}