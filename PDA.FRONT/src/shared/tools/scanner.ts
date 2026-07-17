
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
    public static DecodeProperty(code: string, property: 'LotNumber' | 'PartNumber' | 'EoNumber' | 'Qty' | 'Unit' | 'StorageCode' | 'VendorCode' | 'ProductionDate' | 'erpCode' | 'DeliverySlip' | 'DeliveryItem' |  'Category' | 'Model' | 'corp' | 'ship' | 'container'): string {
        if(Scanner.IsEncoded(code)) {
            const parsedCode = Scanner.Decode(code);
            return parsedCode.Message.equals('OK') ? parsedCode[property] : ''; 
        }

        return code;
    }


    /** */
    public static Decode(code: string): IParsedCode {
        const parsedCode: IParsedCode = {
            LotNumber:      '',
            PartNumber:     '',
            EoNumber:       '',
            Qty:            '',
            Unit:           '',
            StorageCode:    '',
            VendorCode:     '',
            ProductionDate: '', 
            erpCode:        '',
            DeliverySlip:   '',
            DeliveryItem:   '',
            Category:       '',
            Model:          '',
            corp:           '',     
            ship:           '',     
            container:      '',
            Message:        ''
        };

        if(!Scanner.IsEncoded(code)) {            
            parsedCode.Message = `Can't decode: ${code}`;
            return parsedCode;
        } 

        if(Tools.IsOnlyWhiteSpace(code)) {
            parsedCode.Message = 'Code not provided';
            return parsedCode;
        }

        if (code.includes('\x1D')) code = code.replaceAll('\x1D', '<=>');
        if (code.includes(']'))    code = code.replaceAll(']', '<=>');
        if (code.includes('+'))    code = code.replaceAll('+', '<=>'); 

        if(!code.includes('<=>')) {
            parsedCode.Message = 'Invalid Code';
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
                case "L": parsedCode.LotNumber      = VALUE; break;  
                case "P": parsedCode.PartNumber     = VALUE; break;                      
                case "E": parsedCode.EoNumber       = VALUE; break; 
                case "Q": parsedCode.Qty            = VALUE; break; 
                case "U": parsedCode.Unit           = VALUE; break; 
                case "X": parsedCode.StorageCode    = VALUE; break;  
                case "V": parsedCode.VendorCode     = VALUE; break;  
                case "R": parsedCode.ProductionDate = VALUE; break;   
                case "F": parsedCode.erpCode        = VALUE; break;  
                case "D": parsedCode.DeliverySlip   = VALUE; break; //EBELN
                case "N": parsedCode.DeliveryItem   = VALUE; break; //EBELP
                case "Z": parsedCode.Category       = VALUE; break; //sType
                case "M": parsedCode.Model          = VALUE; break; 
                case "C": parsedCode.corp           = VALUE; break; //CORP CD
                case "S": parsedCode.ship           = VALUE; break; //SHIP NO
                case "T": parsedCode.container      = VALUE; break; //CONTAINER NO
            }
        }

        parsedCode.Message = 'OK';
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

            KEY = [' ', '-', '_'].includes(KEY) ? KEY : Strings.OnlyAlphanumeric(KEY);
            
            if(!['SHIFT', 'TAB', 'UNIDENTIFIED'].includes(KEY.toUpperCase())) { 
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