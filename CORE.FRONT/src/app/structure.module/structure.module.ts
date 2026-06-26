//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';    
import { SharedModule } from '@appShared'; 
import { ROUTER_PAGE } from 'hwmx-angular/core';

//Pages
import { ModulesPage        } from './modules/modules.page';
import { ModulesFormPage    } from './modules-form/modules-form.page';
import { PagesPage          } from './pages/pages.page';
import { PagesFormPage      } from './pages-form/pages-form.page';
import { ProjectsPage       } from './projects/projects.page';
import { SidenavPage        } from './sidenav/sidenav.page';
import { SubmodulesPage     } from './submodules/submodules.page';
import { SubmodulesFormPage } from './submodules-form/submodules-form.page';
  
const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('modules'                     , ModulesPage       , 'Modules-1-Structure'   ), 
        ROUTER_PAGE('modules-form/:moduleId'      , ModulesFormPage   , 'Modules-1-Structure'   ), 
        ROUTER_PAGE('pages'                       , PagesPage         , 'Pages-1-Structure'     ), 
        ROUTER_PAGE('pages-form/:pageId'          , PagesFormPage     , 'Pages-1-Structure'     ), 
        ROUTER_PAGE('projects'                    , ProjectsPage      , 'Projects-1-Structure'  ), 
        ROUTER_PAGE('sidenav'                     , SidenavPage       , 'Sidenav-1-Structure'   ), 
        ROUTER_PAGE('submodules'                  , SubmodulesPage    , 'Submodules-1-Structure'), 
        ROUTER_PAGE('submodules-form/:submoduleId', SubmodulesFormPage, 'Submodules-1-Structure'), 
    ]
}];  

@NgModule({
    declarations: [    
        ModulesPage,
        ModulesFormPage,
        PagesPage,
        PagesFormPage,
        ProjectsPage,
        SidenavPage,
        SubmodulesPage,
        SubmodulesFormPage
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StructureModule { }