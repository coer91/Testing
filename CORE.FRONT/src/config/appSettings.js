const appSettings = { 
    appInfo: {
        id: 1,
        project: 'HWMXCore',
        title: 'Core',
        version: 'Jinzo', 
        company: 'Hyundai WIA'
    },
    webAPI: {
        development: {
            hwmxCore: 'http://localhost:5081'
        },
        staging: {
            hwmxCore: 'https://staging.hyundaiwia.mx:9081' 
        },
        production: {  
            hwmxCore: 'https://staging.hyundaiwia.mx:8081'  
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
    }
}