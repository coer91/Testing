import { Component, effect, EffectRef, Inject, signal } from "@angular/core";
import { Page, Tools } from 'hwmx-angular/tools';
import { Subscription } from "rxjs";
import { Scanner } from "./scanner";
import { ICallbackItem } from "hwmx-angular/interfaces";
import { appSettings } from "@appSettings";
import { ILotInformationScaned, ILotInformationStatus } from "@appShared/interfaces"; 

@Component({ template: '' })
export abstract class PagePDA extends Page { 
    
    //Variables      
    private scanner$!: Subscription; 
    protected translatoryRef$!: EffectRef; 
    protected readonly transaction   = signal<string>('');   
    protected readonly manualScanner = signal<string>('');  
    protected readonly useScanner    = (appSettings.environment.isProduction || !appSettings.scanner.isDisabled);
    protected readonly isDevelopment = appSettings.environment.isDevelopment; 
    protected TRANSLATORY: any = {};

    constructor(@Inject(String) pageName: string, @Inject({}) translator: any = null) {
        super(pageName);
         
        if(Tools.IsNotNull(translator)) {
            this.translatoryRef$ = effect(() => 
                Tools.Sleep().then(() => this.TRANSLATORY = new translator(this.language()))
            ); 
        }
    }

     
    /** */
    protected override StartPage(): void {   
        this.isLoading.set(false);   
       
        if(this.useScanner) {
            this.scanner$ = Scanner.Listen().subscribe(scanner => {
                if(!this.isLoading() && scanner.operation.equals('ENTER')) {    
                    this.OnScanCode(scanner.code);             
                }   
            }); 
        }
    }


    /** */
    protected override Destroy(): void {
        this.scanner$?.unsubscribe();
        this.translatoryRef$?.destroy(); 
    }


    /** */
    protected OnScanCodeDevelopment() {   
        this.OnScanCode(this.manualScanner());
        this.manualScanner.set('');
    }


    /** */
    protected async OnScanCode(scanner: string) { console.log(scanner) }  


    /** */
    protected backgroundSCAN = (item: ICallbackItem<ILotInformationScaned>): 'success' | null => {
        return Tools.IsBooleanTrue(item.row?.Scaned) ? 'success' : null
    }


    /** */
    protected colorSCAN = (item: ICallbackItem<ILotInformationScaned>): 'light' | null => {
        return Tools.IsBooleanTrue(item.row?.Scaned) ? 'light' : null
    }


    /** */
    protected backgroundSTATUS = (item: ICallbackItem<ILotInformationStatus>): 'success' | 'navigation' | null => {
        switch(item.row?.Status) {
            case 1: return 'success';
            case 2: return 'navigation';
            case 3: return 'success';
            default: return null;
        }
    }


    /** */
    protected colorSTATUS = (item: ICallbackItem<ILotInformationStatus>): 'light' | null => {
        return item.row?.Status > 0 ? 'light' : null;
    }


    /** */
    protected backgroundQTY = (item: ICallbackItem<any>): 'success' | 'danger' | null => {
        const qty    = Number(item.row?.Qty || '0');
        const cheked = Number(item.row?.QtyChecked || '0');

        if(cheked === qty && cheked > 0) return 'success';

        else if(cheked > qty) {
            return item.property.equals('QtyChecked') ? 'danger' : 'success';
        }

        else return null; 
    }


    /** */
    protected colorQTY = (item: ICallbackItem<any>): 'light' | null => {
        const qty    = Number(item.row?.Qty || '0');
        const cheked = Number(item.row?.QtyChecked || '0'); 
        return (cheked >= qty && cheked > 0) ? 'light' :  null; 
    }  
}