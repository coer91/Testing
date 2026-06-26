//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ComponentsModule } from 'hwmx-angular/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'hwmx-angular/directives';
import { PipesModule } from 'hwmx-angular/pipes';
import { CoerAlert } from 'hwmx-angular/tools';

//Components
import { MenuPage         } from './menu/menu.component';
import { WiaComponent  } from './wia-root/wia.component'; 
import { HomePage         } from './home/home.component';
import { LoginPage        } from './login/login.component';
import { Sidenav          } from './sidenav/sidenav.component';
import { SidenavAccordion } from './sidenav/coer-sidenav-accordion/coer-sidenav-accordion.component'; 
import { Toolbar          } from './toolbar/toolbar.component';  
import { WiaRoot          } from './wia-root/wia-root'; 

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        DirectivesModule,
        PipesModule,
        CoerAlert 
    ],
    declarations: [  
        MenuPage,
        WiaComponent,
        WiaRoot, 
        HomePage, 
        LoginPage,
        Sidenav,
        SidenavAccordion,
        Toolbar,
    ],
    exports: [WiaRoot]
})
export class CoreModule { }