//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';    
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 

//Pages
import { UsersPage             } from './users/users.page';
import { UsersFormPage         } from './users-form/users-form.page'; 
import { UsersFormAddRoles     } from './users-form/users-form-addRoles';
import { UsersFormInformation  } from './users-form/users-form-information';
import { RolesPage             } from './roles/roles.page';
import { RolesFormPage         } from './roles-form/roles-form.page'; 
import { RolesFormAddPageModal } from './roles-form/roles-form-addPageModal'; 
   
const routes: Routes = [{
    path: '', 
    children: [ 
        ROUTER_PAGE('users'             , UsersPage    , 'Users-1-Authorization'), 
        ROUTER_PAGE('users-form/:userId', UsersFormPage, 'Users-1-Authorization'),  
        ROUTER_PAGE('roles'             , RolesPage    , 'Roles-1-Authorization'), 
        ROUTER_PAGE('roles-form/:roleId', RolesFormPage, 'Roles-1-Authorization'),  
    ]
}];  

@NgModule({
    declarations: [     
        UsersPage,    
        UsersFormPage,
        UsersFormAddRoles,
        UsersFormInformation,
        RolesPage,
        RolesFormPage,
        RolesFormAddPageModal 
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorizationModule { }