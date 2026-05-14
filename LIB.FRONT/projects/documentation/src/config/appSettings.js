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
            hwmxCore: 'http://mxmes-test.hyundaiwia.mx:8083'  //'https://localhost:5002' 
        },
        staging: {
            hwmxCore: 'http://mxmes-test.hyundaiwia.mx:8083' 
        },
        production: {  
            hwmxCore: ''
        }
    },
    background: {
        home: '',
        login: ''
    },
    security: {
        useJWT: false
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