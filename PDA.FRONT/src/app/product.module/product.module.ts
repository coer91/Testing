//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { SharedModule } from '@appShared'; 
import { ROUTER_PAGE } from 'hwmx-angular/core';

//Pages 
import { ThreeCBufferHistoryPage     } from './threec-buffer-history/threec-buffer-history.page';
import { DiecastPalletizeHistoryPage } from './diecast-palletize-history/diecast-palletize-history.page';
import { DiecastProductHistoryPage   } from './diecast-product-history/diecast-product-history.page';
import { InCastingRemarkPage         } from './in-casting-remark/in-casting-remark.page';
import { IrregularRemarkPage         } from './irregular-remark/irregular-remark.page';
import { OutCastingRemarkPage        } from './out-casting-remark/out-casting-remark.page';

const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_PM0101', ThreeCBufferHistoryPage    , 'MM_PM0101'),
        ROUTER_PAGE('MM_PM0205', DiecastPalletizeHistoryPage, 'MM_PM0205'),
        ROUTER_PAGE('MM_PM0204', DiecastProductHistoryPage  , 'MM_PM0204'),
        ROUTER_PAGE('MM_PM0201', InCastingRemarkPage        , 'MM_PM0201'),
        ROUTER_PAGE('MM_PM0203', IrregularRemarkPage        , 'MM_PM0203'),
        ROUTER_PAGE('MM_PM0202', OutCastingRemarkPage       , 'MM_PM0202'),
    ]
}];  

@NgModule({
    declarations: [   
        ThreeCBufferHistoryPage,    
        DiecastPalletizeHistoryPage,
        DiecastProductHistoryPage,  
        InCastingRemarkPage,        
        IrregularRemarkPage,        
        OutCastingRemarkPage,       
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductModule { }