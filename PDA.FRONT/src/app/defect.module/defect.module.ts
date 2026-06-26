//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { SharedModule } from '@appShared';  
import { ROUTER_PAGE } from 'hwmx-angular/core';

//Pages
import { OperDefectRegPage     } from './oper-defect-reg/oper-defect-reg.page';
import { MaterialDefectPage    } from './material-defect/material-defect.page';
import { ReworkJudgementPage   } from './rework-judgement/rework-judgement.page';
import { ReworkApprovalPage    } from './rework-approval/rework-approval.page';
import { MaterialInputPage     } from './material-input/material-input.page';
import { MaterialOutputPage    } from './material-output/material-output.page';
import { ScrapAreaLotSplitPage } from './scrap-area-lot-split/scrap-area-lot-split.page';
import { ReimpregnationPage    } from './reimpregnation/reimpregnation.page';
import { QCIngotJudgementPage  } from './qc-ingot-judgement/qc-ingot-judgement.page';
import { DCRegistScrapPage     } from './dc-regist-scrap/dc-regist-scrap.page';

const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_DM0101', OperDefectRegPage    , 'MM_DM0101'),
        ROUTER_PAGE('MM_DM0201', MaterialDefectPage   , 'MM_DM0201'),
        ROUTER_PAGE('MM_DM0301', ReworkJudgementPage  , 'MM_DM0301'),
        ROUTER_PAGE('MM_DM0302', ReworkApprovalPage   , 'MM_DM0302'),
        ROUTER_PAGE('MM_DM0401', MaterialInputPage    , 'MM_DM0401'),
        ROUTER_PAGE('MM_DM0402', MaterialOutputPage   , 'MM_DM0402'),
        ROUTER_PAGE('MM_DM0501', ScrapAreaLotSplitPage, 'MM_DM0501'),
        ROUTER_PAGE('MM_DM0601', ReimpregnationPage   , 'MM_DM0601'),
        ROUTER_PAGE('MM_DM0701', QCIngotJudgementPage , 'MM_DM0701'),
        ROUTER_PAGE('MM_DM9901', DCRegistScrapPage    , 'MM_DM9901'),
    ]
}];  

@NgModule({
    declarations: [   
        OperDefectRegPage,    
        MaterialDefectPage,   
        ReworkJudgementPage,  
        ReworkApprovalPage,   
        MaterialInputPage,    
        MaterialOutputPage,   
        ScrapAreaLotSplitPage,
        ReimpregnationPage,   
        QCIngotJudgementPage, 
        DCRegistScrapPage    
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DefectModule { }