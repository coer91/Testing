//Modules
import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';   
import { SharedModule } from '@appShared'; 
import { ROUTER_PAGE } from 'hwmx-angular/core';

//Pages
import { AssemblyPalletizingPage      } from './assembly-palletizing/assembly-palletizing.page';
import { BringInShippingPage          } from './bring-in-shipping/bring-in-shipping.page';
import { EngineShippingInspectionPage } from './engine-shipping-inspection/engine-shipping-inspection.page';
import { ETCOutListPage               } from './etc-out-list/etc-out-list.page';
import { MovementEnginePage           } from './movement-engine/movement-engine.page';
import { PalletizingPage              } from './palletizing/palletizing.page';
import { PermitOfGatePage             } from './permit-of-gate/permit-of-gate.page';
import { ReceivingCVJPalletPage       } from './receiving-cvj-pallet/receiving-cvj-pallet.page';
import { ReceivingDCPalletPage        } from './receiving-dc-pallet/receiving-dc-pallet.page';
import { ReceivingEnginePage          } from './receiving-engine/receiving-engine.page';
import { ScrapPermitPage              } from './scrap-permit/scrap-permit.page';
import { SendingCVJPalletPage         } from './sending-cvj-pallet/sending-cvj-pallet.page';
import { SendingDCPalletPage          } from './sending-dc-pallet/sending-dc-pallet.page';
import { SendingEnginePage            } from './sending-engine/sending-engine.page';
import { ShippingExportEnginePage     } from './shipping-export-engine/shipping-export-engine.page';
import { ToHoldingPage                } from './to-holding/to-holding.page';
import { WiaCCDeliveryPage            } from './wia-CC-delivery/wia-CC-delivery.page';
import { WIPPalletizingPage           } from './wip-palletizing/wip-palletizing.page';
 
const routes: Routes = [{
    path: '', 
    children: [
        ROUTER_PAGE('MM_OT0301', AssemblyPalletizingPage     , 'MM_OT0301'),
        ROUTER_PAGE('MM_OT0201', BringInShippingPage         , 'MM_OT0201'),
        ROUTER_PAGE('MM_OT0401', EngineShippingInspectionPage, 'MM_OT0401'),
        ROUTER_PAGE('MM_OT0101', ETCOutListPage              , 'MM_OT0101'),
        ROUTER_PAGE('MM_OT0501', MovementEnginePage          , 'MM_OT0501'),
        ROUTER_PAGE('MM_OT0302', PalletizingPage             , 'MM_OT0302'),
        ROUTER_PAGE('MM_OT0701', PermitOfGatePage            , 'MM_OT0701'),
        ROUTER_PAGE('MM_OT0802', ReceivingCVJPalletPage      , 'MM_OT0802'),
        ROUTER_PAGE('MM_OT1001', ReceivingDCPalletPage       , 'MM_OT1001'),
        ROUTER_PAGE('MM_OT0801', ReceivingEnginePage         , 'MM_OT0801'),
        ROUTER_PAGE('MM_OT0702', ScrapPermitPage             , 'MM_OT0702'),
        ROUTER_PAGE('MM_OT0902', SendingCVJPalletPage        , 'MM_OT0902'),
        ROUTER_PAGE('MM_OT1002', SendingDCPalletPage         , 'MM_OT1002'), 
        ROUTER_PAGE('MM_OT0901', SendingEnginePage           , 'MM_OT0901'),
        ROUTER_PAGE('MM_OT0601', ShippingExportEnginePage    , 'MM_OT0601'),
        ROUTER_PAGE('MM_OT0304', ToHoldingPage               , 'MM_OT0304'),
        ROUTER_PAGE('MM_OT0001', WiaCCDeliveryPage           , 'MM_OT0001'),
        ROUTER_PAGE('MM_OT0303', WIPPalletizingPage          , 'MM_OT0303'),
    ]
}];  

@NgModule({
    declarations: [   
        AssemblyPalletizingPage,
        BringInShippingPage,
        EngineShippingInspectionPage,
        ETCOutListPage,
        MovementEnginePage,
        PalletizingPage,
        PermitOfGatePage,
        ReceivingCVJPalletPage,
        ReceivingDCPalletPage,
        ReceivingEnginePage,
        ScrapPermitPage,
        SendingCVJPalletPage,
        SendingDCPalletPage,
        SendingEnginePage,
        ShippingExportEnginePage,
        ToHoldingPage,
        WiaCCDeliveryPage,
        WIPPalletizingPage,
    ],
    imports: [SharedModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliveryModule { }