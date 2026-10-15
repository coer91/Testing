const appSettings = { 
    appInfo: {
        id: 1,
        project: 'HWMXCore',
        title: 'Core',
        version: 'COER 91', 
        company: 'Hyundai WIA'
    },
    webAPI: {
        development: {
            hwmxCore: 'https://staging.hyundaiwia.mx:9081' 
        },
        staging: {
            hwmxCore: 'https://staging.hyundaiwia.mx:9081' 
        },
        production: {  
            hwmxCore: 'https://production.hyundaiwia.mx:8081'
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
    }
}