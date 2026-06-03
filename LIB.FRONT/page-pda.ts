import { Component, signal } from "@angular/core";
import { Page, Tools } from 'hwmx-angular/tools';
import { Subscription } from "rxjs";
import { Scanner } from "./scanner";
import { ICallbackItem } from "hwmx-angular/interfaces";
import { appSettings } from "@appSettings";

@Component({ template: '' })
export abstract class PagePDA extends Page {

    //Variables     
    private scanner$!: Subscription; 
    protected readonly transaction = signal<string>('');  
    protected readonly scanner = signal<string>('');  
    protected readonly scannerDevelopment = signal<string>('');  
    protected readonly isDevelopment = appSettings.environment.isDevelopment;

    /** */
    protected override StartPage(): void {   
        this.isLoading.set(false);   
       
        if(!this.isDevelopment) {
            this.scanner$ = Scanner.Listen().subscribe(scanner => {
                if(!this.isLoading()) {    
                    this.scanner.set(scanner.code);   
    
                    if(scanner.operation.equals('ENTER')) {    
                        this.OnScanCode(); 
                    }                  
                }   
            }); 
        }
    }


    /** */
    protected override Destroy(): void {
        this.scanner$?.unsubscribe();
    }


    /** */
    protected async OnScanCode() { }  


    /** */
    protected backgroundSCAN = (item: ICallbackItem<any>): 'success' | null => {
        return Tools.IsBooleanTrue(item.row?.SCAN) ? 'success' : null
    }


    /** */
    protected colorSCAN = (item: ICallbackItem<any>): 'light' | null => {
        return Tools.IsBooleanTrue(item.row?.SCAN) ? 'light' : null
    }


    /** */
    protected backgroundSTATUS = (item: ICallbackItem<any>): 'success' | 'navigation' | null => {
        switch(item.row?.STATUS) {
            case 1: return 'success';
            case 2: return 'navigation';
            case 3: return 'success';
            default: return null;
        }
    }


    /** */
    protected colorSTATUS = (item: ICallbackItem<any>): 'light' | null => {
        return item.row?.STATUS > 0 ? 'light' : null;
    }


    /** */
    protected backgroundQTY = (item: ICallbackItem<any>): 'success' | null => {
        return Tools.IsBooleanTrue(item.row?.QTY === item.row?.SCAN) ? 'success' : null
    }


    /** */
    protected colorQTY = (item: ICallbackItem<any>): 'light' | null => {
        return item.row?.QTY === item.row?.SCAN ? 'light' : null
    }


    /** */
    protected OnScanCodeDevelopment() {  
        this.scanner.set(this.scannerDevelopment());
        this.OnScanCode();
        this.scannerDevelopment.set('');
    } 
}