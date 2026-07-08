import { Component, signal } from "@angular/core";
import { Page, Tools } from 'hwmx-angular/tools';
import { Subscription } from "rxjs";
import { Scanner } from "./scanner";
import { ICallbackItem } from "hwmx-angular/interfaces";
import { appSettings } from "@appSettings";
import { IDataSourceScaned, IDataSourceStatus } from "@appShared/interfaces";

@Component({ template: '' })
export abstract class PagePDA extends Page {

    //Variables      
    private scanner$!: Subscription; 
    protected readonly transaction = signal<string>('');   
    protected readonly manualScanner = signal<string>('');  
    protected readonly useScanner = (appSettings.environment.isProduction || !appSettings.scanner.isDisabled);
    protected readonly isDevelopment = appSettings.environment.isDevelopment;

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
    }


    /** */
    protected async OnScanCode(scanner: string) { console.log(scanner) }  


    /** */
    protected backgroundSCAN = (item: ICallbackItem<IDataSourceScaned>): 'success' | null => {
        return Tools.IsBooleanTrue(item.row?.Scaned) ? 'success' : null
    }


    /** */
    protected colorSCAN = (item: ICallbackItem<IDataSourceScaned>): 'light' | null => {
        return Tools.IsBooleanTrue(item.row?.Scaned) ? 'light' : null
    }


    /** */
    protected backgroundSTATUS = (item: ICallbackItem<IDataSourceStatus>): 'success' | 'navigation' | null => {
        switch(item.row?.Status) {
            case 1: return 'success';
            case 2: return 'navigation';
            case 3: return 'success';
            default: return null;
        }
    }


    /** */
    protected colorSTATUS = (item: ICallbackItem<IDataSourceStatus>): 'light' | null => {
        return item.row?.Status > 0 ? 'light' : null;
    }


    /** */
    protected backgroundQTY = (item: ICallbackItem<any>): 'success' | 'danger' | null => {
        const qty    = Number(item.row?.Qty || '0');
        const cheked = Number(item.row?.QtyChecked || '0');

        if(cheked === qty) return 'success';

        else if(cheked > qty) {
            return item.property.equals('QtyChecked') ? 'danger' : 'success';
        }

        else return null; 
    }


    /** */
    protected colorQTY = (item: ICallbackItem<any>): 'light' | null => {
        const qty    = Number(item.row?.Qty || '0');
        const cheked = Number(item.row?.QtyChecked || '0'); 
        return (cheked >= qty) ? 'light' :  null; 
    }


    /** */
    protected OnScanCodeDevelopment() {   
        this.OnScanCode(this.manualScanner());
        this.manualScanner.set('');
    } 
}