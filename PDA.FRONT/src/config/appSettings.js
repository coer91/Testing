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
            hwmxCore: 'https://staging.hyundaiwia.mx:9081',  
            hwmxPDA:  'http://localhost:5082',  
        },
        staging: {
            hwmxCore: 'https://staging.hyundaiwia.mx:9081', 
            hwmxPDA:  'https://staging.hyundaiwia.mx:9082',
        },
        production: {  
            hwmxCore: 'https://staging.hyundaiwia.mx:8081',
            hwmxPDA:  'https://staging.hyundaiwia.mx:8082',
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