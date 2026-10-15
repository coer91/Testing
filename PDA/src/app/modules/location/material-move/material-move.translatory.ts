import { CoerAlert } from "hwmx-angular/tools";

export class TRANSLATORY {
    private _alert = new CoerAlert();
    private _language: 'en_US' | 'es_MX' | 'ko-KR' = 'en_US'; 

    constructor(language: 'en_US' | 'es_MX' | 'ko-KR' = 'en_US') {
        this._language = language;
    }


    /** */
    public alert = {
        OlderLotsExist: async () => {
            let message = `There are older lots`;

            switch(this._language) {
                case 'es_MX': {
                    message = `Hay lotes más viejos`;
                    break;
                }

                case 'ko-KR': {
                    message = `더 오래된 로트가 있습니다`;  
                    break;
                }
            }
             
            return await this._alert.Warning(message);
        },
    } 

     
    /** */
    public confirm = {
        OlderLotsExist: async (lotnumber: string) => {
            let message = `There are older lots<br>add <b>${lotnumber}</b> ?`;

            switch(this._language) {
                case 'es_MX': {
                    message = `Hay lotes más viejos<br>agregar el <b>${lotnumber}</b> ?`;
                    break;
                }

                case 'ko-KR': {
                    message = `더 오래된 로트가 있습니다<br><b>${lotnumber}을</b> 추가하시겠습니까 ?`;  
                    break;
                }
            }
             
            return await this._alert.WarningConfirm(message);
        },
    } 
}