//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { SharedModule } from '@appShared'; 
 
import { RolesFormPage } from './roles-form/roles-form.page';
import { ROUTER_PAGE } from 'hwmx-angular/core'; 
import { RolesFormAddPageModal } from './roles-form/roles-form-addPageModal';
 
const routes: Routes = [{
    path: '', 
    children: [ 
        ROUTER_PAGE('roles-form/:roleId', RolesFormPage),
    ]
}];  

@NgModule({
    declarations: [   
        RolesFormPage, 
        RolesFormAddPageModal
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BackEndModule { }