const appSettings = { 
    appInfo: {
        id: 3,
        project: 'Documentation',
        title: 'Documentation',
        version: '1.0.0', 
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
        static: true,
        showHome: true,
        redirectTo: '/home' 
    }
}