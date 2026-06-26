//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { SharedModule } from '@appShared'; 
import { ROUTER_PAGE } from 'hwmx-angular/core';

//Pages
import { ThreeCStocktakingPage      } from './threec-stocktaking/threec-stocktaking.page';
import { CasePalletVerificationPage } from './case-pallet-verification/case-pallet-verification.page';
import { DiecastingStocktakingPage  } from './diecasting-stocktaking/diecasting-stocktaking.page';
import { EngineStocktakingPage      } from './engine-stocktaking/engine-stocktaking.page';
import { EngineWipStocktakingPage   } from './engine-wip-stocktaking/engine-wip-stocktaking.page';
import { IngotLocationPage          } from './ingot-location/ingot-location.page';
import { LocationSelectorPage       } from './location-selector/location-selector.page';
import { MakeUpTrollyPage           } from './make-up-trolly/make-up-trolly.page'; 
import { MaterialMoveFIFOPage       } from './material-move-fifo/material-move-fifo.page';
import { MaterialMovePage        } from './material-move/material-move.page';
import { PalletLocationPage         } from './pallet-location/pallet-location.page';
import { PalletMovePage             } from './pallet-move/pallet-move.page';
import { StocktakingLinesidePage    } from './stocktaking-lineside/stocktaking-lineside.page';
 
const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_LM0701', ThreeCStocktakingPage     , 'MM_LM0701'),
        ROUTER_PAGE('MM_LM1011', CasePalletVerificationPage, 'MM_LM1011'),
        ROUTER_PAGE('MM_LM1001', DiecastingStocktakingPage , 'MM_LM1001'),
        ROUTER_PAGE('MM_LM0601', EngineStocktakingPage     , 'MM_LM0601'),
        ROUTER_PAGE('MM_LM1101', EngineWipStocktakingPage  , 'MM_LM1101'),
        ROUTER_PAGE('MM_LM0203', IngotLocationPage         , 'MM_LM0203'),
        ROUTER_PAGE('MM_LM0201', LocationSelectorPage      , 'MM_LM0201'),
        ROUTER_PAGE('MM_LM0401', MakeUpTrollyPage          , 'MM_LM0401'), 
        ROUTER_PAGE('MM_LM0103', MaterialMoveFIFOPage      , 'MM_LM0103'),
        ROUTER_PAGE('MM_LM0102', MaterialMovePage       , 'MM_LM0102'),
        ROUTER_PAGE('MM_LM0901', PalletLocationPage        , 'MM_LM0901'),
        ROUTER_PAGE('MM_LM0501', PalletMovePage            , 'MM_LM0501'),
        ROUTER_PAGE('MM_LM0801', StocktakingLinesidePage   , 'MM_LM0801'),
    ]
}];  

@NgModule({
    declarations: [   
        ThreeCStocktakingPage,
        CasePalletVerificationPage,
        DiecastingStocktakingPage,
        EngineStocktakingPage,
        EngineWipStocktakingPage,
        IngotLocationPage,
        LocationSelectorPage,
        MakeUpTrollyPage, 
        MaterialMoveFIFOPage,
        MaterialMovePage,
        PalletLocationPage,
        PalletMovePage,
        StocktakingLinesidePage 
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LocationModule { }