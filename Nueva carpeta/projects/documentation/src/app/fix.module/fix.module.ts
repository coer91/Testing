//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { SharedModule } from '../../shared/shared.module'; 
import { ROUTER_PAGE } from 'hwmx-angular/core';

//Pages 
 
const routes: Routes = [{
    path: '',
    data: { project: 'MySystem', module: 'System' }, 
    children: [ 
    ]
}];  

@NgModule({
    declarations: [    
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FixModule { }