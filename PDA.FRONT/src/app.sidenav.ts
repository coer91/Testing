import { IMenu } from "hwmx-angular/interfaces";  

export const NAVIGATION: IMenu[] = [   
    { Label: 'Store', Icon: 'fa-solid fa-boxes-stacked', MenuType: 'GRID', ActiveKey: 'T_PDAMM01', ShowIndicator: false, Items: [ 
        { Label: 'LP Stock In'       , Icon: '', Path: '/store/MM_IN0101', ActiveKey: 'MM_IN0101' },   
        { Label: 'GKD Stock In'      , Icon: '', Path: '/store/MM_IN0301', ActiveKey: 'MM_IN0301' },  
        { Label: 'CC Stock In'       , Icon: '', Path: '/store/MM_IN0202', ActiveKey: 'MM_IN0202' },  
        { Label: 'KD Stock In'       , Icon: '', Path: '/store/MM_IN0201', ActiveKey: 'MM_IN0201' }, 
        { Label: 'INGOT Weight'      , Icon: '', Path: '/store/MM_IN0401', ActiveKey: 'MM_IN0401' },  
        { Label: 'Import Engine'     , Icon: '', Path: '/store/MM_IN0501', ActiveKey: 'MM_IN0501' },  
        { Label: 'Container Download', Icon: '', Path: '/store/MM_IN0601', ActiveKey: 'MM_IN0601' },  
        { Label: 'Container Load'    , Icon: '', Path: '/store/MM_IN0701', ActiveKey: 'MM_IN0701' }, 
        { Label: 'Manual Stock IN'   , Icon: '', Path: '/store/MM_IN0801', ActiveKey: 'MM_IN0801' }, 
    ]},

    { Label: 'Location', Icon: 'fa-solid fa-location-dot', MenuType: 'GRID', ActiveKey: 'T_PDAMM02', ShowIndicator: false, Items: [    
        { Label: 'Material Move'           , Icon: '', Path: '/location/MM_LM0101', ActiveKey: 'MM_LM0101' },
        { Label: 'Material Move(New)'      , Icon: '', Path: '/location/MM_LM0102', ActiveKey: 'MM_LM0102' },  
        { Label: 'Material Move(FIFO)'     , Icon: '', Path: '/location/MM_LM0103', ActiveKey: 'MM_LM0103' },
        { Label: 'Location Selector'       , Icon: '', Path: '/location/MM_LM0201', ActiveKey: 'MM_LM0201' },  
        { Label: 'INGOT Location'          , Icon: '', Path: '/location/MM_LM0203', ActiveKey: 'MM_LM0203' },  
        { Label: 'Make up Trolly'          , Icon: '', Path: '/location/MM_LM0401', ActiveKey: 'MM_LM0401' },  
        { Label: 'Pallet Move'             , Icon: '', Path: '/location/MM_LM0501', ActiveKey: 'MM_LM0501' },  
        { Label: 'Engine StockTaking'      , Icon: '', Path: '/location/MM_LM0601', ActiveKey: 'MM_LM0601' },  
        { Label: '3C Stocktaking'          , Icon: '', Path: '/location/MM_LM0701', ActiveKey: 'MM_LM0701' },  
        { Label: 'Stocktaking Lineside'    , Icon: '', Path: '/location/MM_LM0801', ActiveKey: 'MM_LM0801' },  
        { Label: 'Pallet Location'         , Icon: '', Path: '/location/MM_LM0901', ActiveKey: 'MM_LM0901' },  
        { Label: 'Diecasting Stocktaking'  , Icon: '', Path: '/location/MM_LM1001', ActiveKey: 'MM_LM1001' },  
        { Label: 'Case Pallet Verification', Icon: '', Path: '/location/MM_LM1011', ActiveKey: 'MM_LM1011' },  
        { Label: 'Engine Wip Stocktaking'  , Icon: '', Path: '/location/MM_LM1101', ActiveKey: 'MM_LM1101' },
    ]},  

    { Label: 'Delivery', Icon: 'fa-solid fa-truck-ramp-box', MenuType: 'GRID', ActiveKey: 'T_PDAMM03', ShowIndicator: false, Items: [ 
        { Label: 'Wia to CC Delivery'        , Icon: '', Path: '/delivery/MM_OT0001', ActiveKey: 'MM_OT0001' },
        { Label: 'ETC Out List'              , Icon: '', Path: '/delivery/MM_OT0101', ActiveKey: 'MM_OT0101' },
        { Label: 'Bring-IN Shipping'         , Icon: '', Path: '/delivery/MM_OT0201', ActiveKey: 'MM_OT0201' },
        { Label: 'Assembly Palletizing'      , Icon: '', Path: '/delivery/MM_OT0301', ActiveKey: 'MM_OT0301' },
        { Label: 'Palletizing'               , Icon: '', Path: '/delivery/MM_OT0302', ActiveKey: 'MM_OT0302' },
        { Label: 'WIP Palletizing'           , Icon: '', Path: '/delivery/MM_OT0303', ActiveKey: 'MM_OT0303' },
        { Label: 'To - Holding'              , Icon: '', Path: '/delivery/MM_OT0304', ActiveKey: 'MM_OT0304' },      
        { Label: 'Engine Shipping inspection', Icon: '', Path: '/delivery/MM_OT0401', ActiveKey: 'MM_OT0401' },
        { Label: 'Movement Engine'           , Icon: '', Path: '/delivery/MM_OT0501', ActiveKey: 'MM_OT0501' }, 
        { Label: 'Shipping Export Engine'    , Icon: '', Path: '/delivery/MM_OT0601', ActiveKey: 'MM_OT0601' },
        { Label: 'Permit of Gate'            , Icon: '', Path: '/delivery/MM_OT0701', ActiveKey: 'MM_OT0701' },
        { Label: 'Scrap Permit'              , Icon: '', Path: '/delivery/MM_OT0702', ActiveKey: 'MM_OT0702' },
        { Label: 'Receiving Engine'          , Icon: '', Path: '/delivery/MM_OT0801', ActiveKey: 'MM_OT0801' },
        { Label: 'Receiving CVJ Pallet'      , Icon: '', Path: '/delivery/MM_OT0802', ActiveKey: 'MM_OT0802' },
        { Label: 'Receiving DC Pallet'       , Icon: '', Path: '/delivery/MM_OT1001', ActiveKey: 'MM_OT1001' },
        { Label: 'Sending Engine'            , Icon: '', Path: '/delivery/MM_OT0901', ActiveKey: 'MM_OT0901' },
        { Label: 'Sending CVJ Pallet'        , Icon: '', Path: '/delivery/MM_OT0902', ActiveKey: 'MM_OT0902' },
        { Label: 'Sending DC Pallet'         , Icon: '', Path: '/delivery/MM_OT1002', ActiveKey: 'MM_OT1002' },
    ]},

    { Label: 'Change', Icon: 'fa-solid fa-arrows-turn-to-dots', MenuType: 'GRID', ActiveKey: 'T_PDAMM04', ShowIndicator: false, Items: [ 
        { Label: 'Vendor Return'    , Icon: '', Path: '/change/MM_RT0101', ActiveKey: 'MM_RT0101' }, 
        { Label: 'Inspection Return', Icon: '', Path: '/change/MM_RT0201', ActiveKey: 'MM_RT0201' }, 
    ]},

    { Label: 'Shortage', Icon: 'fa-solid fa-boxes-packing', MenuType: 'GRID', ActiveKey: 'T_PDAMM05', ShowIndicator: false, Items: [ 
        { Label: 'Shortage List'          , Icon: '', Path: '/shortage/MM_SM0101', ActiveKey: 'MM_SM0101' },
        { Label: 'Trace LOT Location'     , Icon: '', Path: '/shortage/MM_SM0201', ActiveKey: 'MM_SM0201' },
        { Label: 'Lamp Turn On List'      , Icon: '', Path: '/shortage/MM_SM0301', ActiveKey: 'MM_SM0301' },
        { Label: 'Inventory check in cell', Icon: '', Path: '/shortage/MM_SM0401', ActiveKey: 'MM_SM0401' }, 
    ]},

    { Label: 'Lot', Icon: 'fa-solid fa-cart-flatbed', MenuType: 'GRID', ActiveKey: 'T_PDAMM06', ShowIndicator: false, Items: [ 
        { Label: 'Republish'            , Icon: '', Path: '/lot/MM_LT0101', ActiveKey: 'MM_LT0101' },
        { Label: 'Split'                , Icon: '', Path: '/lot/MM_LT0201', ActiveKey: 'MM_LT0201' },
        { Label: 'Merge'                , Icon: '', Path: '/lot/MM_LT0301', ActiveKey: 'MM_LT0301' },
        { Label: 'Stocktaking Warehouse', Icon: '', Path: '/lot/MM_LT0401', ActiveKey: 'MM_LT0401' },
        { Label: 'Trace Publish'        , Icon: '', Path: '/lot/MM_LT0501', ActiveKey: 'MM_LT0501' },
        { Label: 'Information'          , Icon: '', Path: '/lot/MM_LT0601', ActiveKey: 'MM_LT0601' },
        { Label: 'Merge Label'          , Icon: '', Path: '/lot/MM_LT0701', ActiveKey: 'MM_LT0701' }, 
    ]},

    { Label: 'Defect', Icon: 'fa-solid fa-file-circle-exclamation', MenuType: 'GRID', ActiveKey: 'T_PDAMM07', ShowIndicator: false, Items: [ 
        { Label: 'Oper Defect Reg(Product)' , Icon: '', Path: '/defect/MM_DM0101', ActiveKey: 'MM_DM0101' },
        { Label: 'Material Defect'          , Icon: '', Path: '/defect/MM_DM0201', ActiveKey: 'MM_DM0201' },
        { Label: 'Rework Judgement'         , Icon: '', Path: '/defect/MM_DM0301', ActiveKey: 'MM_DM0301' },
        { Label: 'Rework Approval'          , Icon: '', Path: '/defect/MM_DM0302', ActiveKey: 'MM_DM0302' },
        { Label: 'Material Input'           , Icon: '', Path: '/defect/MM_DM0401', ActiveKey: 'MM_DM0401' },
        { Label: 'Material Output'          , Icon: '', Path: '/defect/MM_DM0402', ActiveKey: 'MM_DM0402' },
        { Label: 'Scrap Area LOT Split'     , Icon: '', Path: '/defect/MM_DM0501', ActiveKey: 'MM_DM0501' },
        { Label: 'Reimpregnation'           , Icon: '', Path: '/defect/MM_DM0601', ActiveKey: 'MM_DM0601' },
        { Label: 'QC Ingot Judgement'       , Icon: '', Path: '/defect/MM_DM0701', ActiveKey: 'MM_DM0701' },
        { Label: 'DC Regist Scrap'          , Icon: '', Path: '/defect/MM_DM9901', ActiveKey: 'MM_DM9901' },  
    ]},

    { Label: 'Product', Icon: 'bi bi-box-seam-fill', MenuType: 'GRID', ActiveKey: 'T_PDAMM09', ShowIndicator: false, Items: [ 
        { Label: '3C Buffer History'        , Icon: '', Path: '/product/MM_PM0101', ActiveKey: 'MM_PM0101' },
        { Label: 'In-Casting Remark'        , Icon: '', Path: '/product/MM_PM0201', ActiveKey: 'MM_PM0201' },
        { Label: 'Out-Casting Remark'       , Icon: '', Path: '/product/MM_PM0202', ActiveKey: 'MM_PM0202' },
        { Label: 'Irregular Remark'         , Icon: '', Path: '/product/MM_PM0203', ActiveKey: 'MM_PM0203' },
        { Label: 'Diecast Product History'  , Icon: '', Path: '/product/MM_PM0204', ActiveKey: 'MM_PM0204' },
        { Label: 'Diecast Palletize History', Icon: '', Path: '/product/MM_PM0205', ActiveKey: 'MM_PM0205' },   
    ]},

    { Label: 'Recycle', Icon: 'fa-solid fa-recycle', MenuType: 'GRID', ActiveKey: 'T_PDAMM10', ShowIndicator: false, Items: [ 
        { Label: 'Receiving for Recycle Parts', Icon: '', Path: '/recycle/MM_RC0101', ActiveKey: 'MM_RC0101' },
        { Label: 'Movement engine to cons'    , Icon: '', Path: '/recycle/MM_RC0201', ActiveKey: 'MM_RC0201' },
        { Label: 'Engine return'              , Icon: '', Path: '/recycle/MM_RC0301', ActiveKey: 'MM_RC0301' }, 
    ]},
];