import { Component, computed, signal } from '@angular/core';   
import { Tools } from 'hwmx-angular/tools'; 
import { Subscription } from 'rxjs';
import { PagePDA, Scanner } from '@appShared/tools';
import { IParsedCode } from '@appShared/interfaces';

@Component({
    selector: 'scanner-page',
    templateUrl: './scanner.page.html', 
    standalone: false
})
export class ScannerPage extends PagePDA {  

    constructor() { super('Scanner') } 

    //Variables
    private keys$!: Subscription;    
    protected readonly keyArray   = signal<string[]>([]); 
    protected readonly parsedCode = signal<IParsedCode | null>(null); 
 

    /** */
    protected override StartPage() {   
        this.keys$ = Scanner.ListenKeys().subscribe(key => this.keyArray.update(data => [...data, key]));
        super.StartPage();
    } 


    /** */
    protected override async OnScanCode(scanner: string) {
        this.isLoading.set(true);         
        
        this.transaction.set(scanner);         
        if(Scanner.IsEncoded(scanner)) {  
            this.parsedCode.set(Scanner.Decode(scanner)); 
        }                     

        this.isLoading.set(false);
    }


    /** */
    protected override Destroy(): void {
        this.keys$?.unsubscribe();
        super.Destroy();
    }


    /** */
    protected data = computed<any[]>(() => {
        const PARSED_CODE = this.parsedCode() as any;
        const DATA: any[] = [];
        
        if(Tools.IsNotNull(PARSED_CODE)) {
            for(const property in PARSED_CODE!) {
                DATA.push({ property, value: PARSED_CODE[property] });
            }
        }

        return DATA;
    });


    /** */
    protected Clear(): void {
        this.transaction.set('');
        this.keyArray.set([]);
        this.parsedCode.set(null);
    } 
}