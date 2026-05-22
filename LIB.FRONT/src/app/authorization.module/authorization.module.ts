//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';    
import { ROUTER_PAGE } from 'hwmx-angular/core';
import { SharedModule } from '@appShared'; 

//Pages
import { UsersPage             } from './users/users.page';
import { UsersFormPage         } from './users-form/users-form.page'; 
import { RolesPage             } from './roles/roles.page';
import { RolesFormPage         } from './roles-form/roles-form.page'; 
import { RolesFormAddPageModal } from './roles-form/roles-form-addPageModal'; 
   
const routes: Routes = [{
    path: '', 
    children: [ 
        ROUTER_PAGE('users'     , UsersPage    , [        ], 'Users-1-Authorization'), 
        ROUTER_PAGE('users'     , UsersFormPage, ['userId'], 'Users-1-Authorization'),  
        ROUTER_PAGE('roles'     , RolesPage    , [        ], 'Roles-1-Authorization'), 
        ROUTER_PAGE('roles-form', RolesFormPage, ['roleId'], 'Roles-1-Authorization'),  
    ]
}];  

@NgModule({
    declarations: [     
        UsersPage,    
        UsersFormPage,
        RolesPage,
        RolesFormPage,
        RolesFormAddPageModal 
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthorizationModule { }