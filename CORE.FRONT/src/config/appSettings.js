const appSettings = { 
    appInfo: {
        id: 1,
        project: 'HWMXCore',
        title: 'Core',
        version: '1.0.0', 
        company: 'Hyundai WIA'
    },
    webAPI: {
        development: {
            hwmxCore: 'http://mxmes-test.hyundaiwia.mx:8083' 
        },
        staging: {
            hwmxCore: 'http://mxmes-test.hyundaiwia.mx:8083' 
        },
        production: {  
            hwmxCore: 'http://mxmes-test.hyundaiwia.mx:8083'  
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