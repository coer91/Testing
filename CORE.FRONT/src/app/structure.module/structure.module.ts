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
        ROUTER_PAGE('modules'                     , ModulesPage       ), 
        ROUTER_PAGE('modules-form/:moduleId'      , ModulesFormPage   ), 
        ROUTER_PAGE('pages'                       , PagesPage         ), 
        ROUTER_PAGE('pages-form/:pageId'          , PagesFormPage     ), 
        ROUTER_PAGE('projects'                    , ProjectsPage      ), 
        ROUTER_PAGE('sidenav'                     , SidenavPage       ), 
        ROUTER_PAGE('submodules'                  , SubmodulesPage    ), 
        ROUTER_PAGE('submodules-form/:submoduleId', SubmodulesFormPage), 
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