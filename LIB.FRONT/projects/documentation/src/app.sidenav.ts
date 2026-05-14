import { IMenu } from "hwmx-angular/interfaces";  

export const NAVIGATION: IMenu[] = [   
    { Label: 'Back End', Icon: 'iw-logo-csharp-fill', MenuType: 'LIST', Items: [ 
        
    ]},

    { Label: 'Front End', Icon: 'iw-logo-angular-fill', ShowIndicator: false, MenuType: 'LIST', Items: [   
        //About
        { Label: 'About Library', Icon: 'iw-logo-coer91', ShowIndicator: false, MenuType: 'LIST', Items: [ 
            { Label: 'Install', Icon: '', Path: '/front-end/about-library/install' },
        ]},  

        //Components
        { Label: 'Components', Icon: '', MenuType: 'LIST', ShowIndicator: true, Items: [ 
            { Label: 'coer-button ssssssssssssssssssss ssssssssssssssssssssss ssssssssssssssssssssssssssssssssss'   , Icon: 'iw-hand-pointer-fill', Path: '/front-end/components/coer-button'    },  
            { Label: 'coer-datebox'  , Icon: '',                      Path: '/front-end/components/coer-datebox'   },  
            { Label: 'coer-form'     , Icon: '',                      Path: '/front-end/components/coer-form'      },  
            { Label: 'coer-grid'     , Icon: '',                      Path: '/front-end/components/coer-grid'      },  
            { Label: 'coer-modal'    , Icon: 'iw-modal-fill',        Path: '/front-end/components/coer-modal'     },
            { Label: 'coer-numberbox', Icon: '',                      Path: '/front-end/components/coer-numberbox' },
            { Label: 'coer-secretbox', Icon: 'iw-eye-slash-fill',    Path: '/front-end/components/coer-secretbox' },
            { Label: 'coer-selectbox', Icon: 'iw-angle iw-90deg',   Path: '/front-end/components/coer-selectbox' },
            { Label: 'coer-switch'   , Icon: '',                      Path: '/front-end/components/coer-switch'    },
            { Label: 'coer-textbox'  , Icon: 'iw-input-text',        Path: '/front-end/components/coer-textbox'   },  
        ]}, 
    ]},  

    { Label: 'Components 2', Icon: '', MenuType: 'GRID', ShowIndicator: false, Items: [ 
             
    ]},
    
    { Label: 'coer-button'   , Icon: 'iw-hand-pointer-fill', Path: ''    },
];