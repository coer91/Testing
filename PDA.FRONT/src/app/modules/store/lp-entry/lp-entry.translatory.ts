import { CoerAlert } from "hwmx-angular/tools";

export class TRANSLATORY {

    private _alert = new CoerAlert();
    private _language: 'en_US' | 'es_MX' | 'ko-KR' = 'en_US'; 

    constructor(language: 'en_US' | 'es_MX' | 'ko-KR' = 'en_US') {
        this._language = language;
    }

     
    /** */
    public alert = { 
        PickingOrder: (code: string) => {
            let message = 'This picking order is <b>KD</b>';
            
            switch(this._language) {
                case 'es_MX': {
                    message = 'Esta orden de picking es <b>KD</b>';
                    break;
                }

                case 'ko-KR': {
                    message = '이 피킹 오더는 <b>KD</b>입니다';
                    break;
                }
            } 

            this._alert.Warning(message, code, 'barcode');
        },
    } 
}