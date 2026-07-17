import { IMenu } from "hwmx-angular/interfaces";  

export const NAVIGATION: IMenu[] = [    
    { Label: 'Back End', Icon: 'iw-logo-angular-fill', ShowIndex: true, ShowIndicator: true, MenuType: 'LIST', Items: [  

        { Label: 'roles'   , Icon: '', ShowIndex: true, Path: '/back-end/roles-form/1'    },  
    ]}, 

    { Label: 'Front End', Icon: 'iw-logo-angular-fill', ShowIndex: true, ShowIndicator: true, MenuType: 'LIST', Items: [ 

        //Components
        { Label: 'Components', Icon: 'iw-logo-angular-fill', MenuType: 'GRID', ShowIndex: true, ShowIndicator: true, Items: [ 
            { Label: 'coer-button'   , Icon: 'iw-hand-pointer-fill', ShowIndex: true, Path: '/front-end/components/coer-button' , ActiveKey: 'Test', CanCreate: true },  
            { Label: 'coer-datebox'  , Icon: '',                     ShowIndex: true, Path: '/front-end/components/coer-datebox', ActiveKey: 'r', CanCreate: true   },  
            { Label: 'coer-form'     , Icon: '',                     ShowIndex: true, Path: '/front-end/components/coer-form'      },  
            { Label: 'coer-grid'     , Icon: '',                     ShowIndex: true, Path: '/front-end/components/coer-grid'      },  
            { Label: 'coer-modal'    , Icon: 'iw-modal-fill',        ShowIndex: true, Path: '/front-end/components/coer-modal'     },
            { Label: 'coer-numberbox', Icon: '',                     ShowIndex: true, Path: '/front-end/components/coer-numberbox' },
            { Label: 'coer-secretbox', Icon: 'iw-eye-slash-fill',    ShowIndex: true, Path: '/front-end/components/coer-secretbox' },
            { Label: 'coer-selectbox', Icon: 'iw-angle iw-90deg',    ShowIndex: true, Path: '/front-end/components/coer-selectbox' },
            { Label: 'coer-switch'   , Icon: '',                     ShowIndex: true, Path: '/front-end/components/coer-switch'    },
            { Label: 'coer-textbox'  , Icon: 'iw-input-text',        ShowIndex: true, Path: '/front-end/components/coer-textbox'   },
            { Label: 'coer-tab'      , Icon: 'iw-input-text',        ShowIndex: true, Path: '/front-end/components/coer-tab'       }, 
            { Label: 'coer-radio'    , Icon: '',                     ShowIndex: true, Path: '/front-end/components/coer-radio'     },  
        ]}, 

        { Label: 'coer-button'   , Icon: 'iw-hand-pointer-fill', ShowIndex: true, Path: '/front-end/components/coer-button'    },  
    ]},   
];