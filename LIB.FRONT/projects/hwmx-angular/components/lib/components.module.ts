import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'hwmx-angular/directives';
import { PipesModule } from 'hwmx-angular/pipes';

//Components  
import { WIAButton     } from './wia-button/wia-button.component'; 
import { WIADateBox    } from './wia-datebox/wia-datebox.component';
import { WIAForm       } from './wia-form/wia-form.component';
import { WIAGridBody   } from './wia-grid/wia-grid-body/wia-grid-body.component';
import { WIAGridCell   } from './wia-grid/wia-grid-cell/wia-grid-cell.component';
import { WIAGridFooter } from './wia-grid/wia-grid-footer/wia-grid-footer.component';
import { WIAGridHeader } from './wia-grid/wia-grid-header/wia-grid-header.component';
import { WIAGrid       } from './wia-grid/wia-grid.component';
import { WIANumberBox  } from './wia-numberbox/wia-numberbox.component';
import { WIAModal      } from './wia-modal/wia-modal.component';
import { WIAPageTitle  } from './wia-page-title/wia-page-title.component';
import { WIASecretBox  } from './wia-secretbox/wia-secretbox.component'; 
import { WIASelectBox  } from './wia-selectbox/wia-selectbox.component'; 
import { WIASwitch     } from './wia-switch/wia-switch.component';
import { WIATextBox    } from './wia-textbox/wia-textbox.component';

@NgModule({
    imports: [
        CommonModule,  
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        PipesModule
    ],
    declarations: [  
        WIAButton,
        WIADateBox,
        WIAForm,
        WIAGrid,
        WIAGridBody,
        WIAGridCell,
        WIAGridFooter,
        WIAGridHeader,
        WIAModal, 
        WIANumberBox,
        WIAPageTitle,
        WIASecretBox,
        WIASelectBox,
        WIASwitch,
        WIATextBox,
    ],
    exports: [   
        WIAButton,
        WIADateBox,
        WIAForm,
        WIAGrid,
        WIAModal, 
        WIANumberBox,
        WIAPageTitle,
        WIASecretBox,
        WIASelectBox,
        WIASwitch,
        WIATextBox,
    ]
})
export class ComponentsModule { }