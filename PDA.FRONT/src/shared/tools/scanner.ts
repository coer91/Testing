
import { IParsedCode } from "@appShared/interfaces";
import { IScanner } from "hwmx-angular/interfaces";
import { Strings, Tools } from "hwmx-angular/tools";
import { Observable } from "rxjs";  

export class Scanner {  

    /** */
    public static IsEncoded(code: string): boolean {
        return code.length > 10 && (
            code.includes('\x1D') ||
            code.includes('\x1E') ||
            code.includes('[)>')  ||
            code.includes(']')    ||
            code.includes('+')    ||
            code.includes('<=>')  
        );
    }


    /** */
    public static DecodeProperty(code: string, property: 'erpCode' | 'vendorCode' | 'partNumber' | 'lotNumber' | 'qty' | 'unit' | 'deliverySlip' | 'deliveryItem' | 'warehouse' | 'category' | 'eoNumber' | 'prodDate' | 'model' | 'corp' | 'ship' | 'container'): string {
        if(Scanner.IsEncoded(code)) {
            const parsedCode = Scanner.Decode(code);
            return parsedCode.message.equals('OK') ? parsedCode[property] : ''; 
        }

        return code;
    }


    /** */
    public static Decode(code: string): IParsedCode {
        const parsedCode: IParsedCode = {
            erpCode:      '',
            vendorCode:   '',
            partNumber:   '',
            lotNumber:    '',
            qty:          '',
            unit:         '',
            deliverySlip: '',
            deliveryItem: '',
            warehouse:    '',
            category:     '',
            eoNumber:     '',
            prodDate:     '',
            model:        '',
            corp:         '',     
            ship:         '',     
            container:    '',
            message:      ''
        };

        if(!Scanner.IsEncoded(code)) {            
            parsedCode.message = `Can't decode: ${code}`;
            return parsedCode;
        } 

        if(Tools.IsOnlyWhiteSpace(code)) {
            parsedCode.message = 'Code not provided';
            return parsedCode;
        }

        if (code.includes('\x1D')) code = code.replaceAll('\x1D', '<=>');
        if (code.includes(']'))    code = code.replaceAll(']', '<=>');
        if (code.includes('+'))    code = code.replaceAll('+', '<=>'); 

        if(!code.includes('<=>')) {
            parsedCode.message = 'Invalid Code';
            return parsedCode;
        }

        if (code.includes("[)>")) code = code.replaceAll("[)>", '');
        if (code.includes('\x1E')) code = code.replaceAll("\x1E", '');
        if (code.includes('\x0003')) code = code.replaceAll("\x0003", ' '); 
        const CODE_ARRAY = code.split('<=>');

        for(const CODE of CODE_ARRAY) {
            const KEY   = CODE.substring(0, 1).trim();
            const VALUE = CODE.substring(1).trim();

            switch(KEY) {
                case "F": parsedCode.erpCode      = VALUE; break; //ERP_CODE
                case "V": parsedCode.vendorCode   = VALUE; break; //VD_CD   
                case "P": parsedCode.partNumber   = VALUE; break; //PART_NO                         
                case "L": parsedCode.lotNumber    = VALUE; break; //MAT_LOT_NO
                case "Q": parsedCode.qty          = VALUE; break; //QTY
                case "U": parsedCode.unit         = VALUE; break; //UNIT
                case "D": parsedCode.deliverySlip = VALUE; break; //EBELN
                case "N": parsedCode.deliveryItem = VALUE; break; //EBELP
                case "X": parsedCode.warehouse    = VALUE; break; //STORAGE_CODE
                case "Z": parsedCode.category     = VALUE; break; //sType
                case "E": parsedCode.eoNumber     = VALUE; break; //EO_NO
                case "R": parsedCode.prodDate     = VALUE; break; //PROD_DATE
                case "M": parsedCode.model        = VALUE; break; //sModel
                case "C": parsedCode.corp         = VALUE; break; //CORP CD
                case "S": parsedCode.ship         = VALUE; break; //SHIP NO
                case "T": parsedCode.container    = VALUE; break; //CONTAINER NO
            }
        }

        parsedCode.message = 'OK';
        return parsedCode;
    }


    /** */
    public static Listen = (event: 'keydown' = 'keydown') => new Observable<IScanner>(subscriber => {
        let code = '';
        let timeout$: any;

        const eventListener = (keyboardEvent: KeyboardEvent) => {
            let KEY = keyboardEvent.key; 

            if(KEY.equals('Enter')) {   
                code = code.replaceAll('Enter', '').trim();

                if(code.isNotOnlyWhiteSpace()) {
                    subscriber.next({ code, operation: 'ENTER' }); 
                }

                code = '';  
            }  
                             
            else if(['+', ']', '\x1D'].includes(KEY)) { 
                code += '<=>';
                subscriber.next({ code, operation: 'EMIT' });                 
            } 

            KEY = Strings.OnlyAlphanumeric(KEY);
            
            if(!['SHIFT', 'TAB'].includes(KEY.toUpperCase())) { 
                code += KEY;
                subscriber.next({ code, operation: 'EMIT' });                  
            }  

            clearTimeout(timeout$);  
            timeout$ = setTimeout(() => {
                code = '';
                subscriber.next({ code, operation: 'AUTOCLEAN' });
            }, 3000);
        };

        window.addEventListener(event, eventListener);  

        return () => { 
            window.removeEventListener(event, eventListener); 
        };
    });


    /** */
    public static ListenKeys = (event: 'keydown' = 'keydown') => new Observable<string>(subscriber => {
        const eventListener = (keyboardEvent: KeyboardEvent) => {
            subscriber.next(keyboardEvent.key);
        };

        window.addEventListener(event, eventListener);  

        return () => { 
            window.removeEventListener(event, eventListener); 
        };
    });
}