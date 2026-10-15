const appSettings = { 
    appInfo: {
        id: 2,
        project: 'HWMXPDA',
        title: 'PDA',
        version: 'COER 91', 
        company: 'Hyundai WIA'
    },
    webAPI: {
        development: {
            hwmxCore: 'https://staging.hyundaiwia.mx:9081', 
            hwmxPDA:  'https://staging.hyundaiwia.mx:9082',
        },
        staging: {
            hwmxCore: 'https://staging.hyundaiwia.mx:9081', 
            hwmxPDA:  'https://staging.hyundaiwia.mx:9082',
        },
        production: {  
            hwmxCore: 'https://production.hyundaiwia.mx:8081',
            hwmxPDA:  'https://production.hyundaiwia.mx:8082',
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
        currency: '$',
        showDateServer: false
    }, 
    navigation: {
        static: false,
        showHome: true,
        redirectTo: '/home' 
    },
    scanner: {
        isDisabled: false
    } 
}