const appSettings = { 
    appInfo: {
        id: 2,
        project: 'HWMXPDA',
        title: 'PDA',
        version: '1.0.0', 
        company: 'Hyundai WIA'
    },
    webAPI: {
        development: {
            hwmxCore: 'http://mxmes-test.hyundaiwia.mx:8083',  
            hwmxPDA:  'http://localhost:5050',  
        },
        staging: {
            hwmxCore: 'http://mxmes-test.hyundaiwia.mx:8083',
            hwmxPDA: 'http://mxmes-test.hyundaiwia.mx:8082',
        },
        production: {  
            hwmxCore: '',
            hwmxPDA: '',
        }
    },
    background: {
        home: '',
        login: ''
    },
    security: {
        useJWT: true
    },
    region: {
        dateTime: 'MDY',
        language: 'en',
        currencyCode: 'USD',
        currency: '$'
    }, 
    navigation: {
        static: false,
        showHome: true,
        redirectTo: '/home' 
    },
    scanner: {
        isDisabled: true
    } 
}