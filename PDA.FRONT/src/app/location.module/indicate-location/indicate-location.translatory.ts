export class TRANSLATORY {

    private _language: 'en_US' | 'es_MX' | 'ko-KR' = 'en_US'; 

    constructor(language: 'en_US' | 'es_MX' | 'ko-KR' = 'en_US') {
        this._language = language;
    }

     
    /** */
    public label = {
        locationByMaterial: () => { 
            switch(this._language) {
                case 'es_MX': return 'Ubicación por material';
                case 'ko-KR': return '자재별 위치'; 
                default:      return 'Location by Material';
            } 
        } 
    } 
}