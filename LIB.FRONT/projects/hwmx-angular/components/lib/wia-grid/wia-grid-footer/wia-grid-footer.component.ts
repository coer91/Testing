import { Component, input, WritableSignal } from '@angular/core'; 
import { IFooterSettings } from 'hwmx-angular/interfaces';
import { Tools } from 'hwmx-angular/tools';

@Component({
    selector: 'wia-grid-footer',
    templateUrl: './wia-grid-footer.component.html', 
    styleUrl: './wia-grid-footer.component.scss', 
    standalone: false
})
export class WIAGridFooter<T> {

    //Variables
    protected readonly IsBooleanFalse = Tools.IsBooleanFalse;
    protected readonly IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;

    //Inputs
    public readonly value              = input.required<T[]>();
    public readonly dataSourceSelected = input.required<T[]>();
    public readonly dataSourceFiltered = input.required<T[]>();
    public readonly search             = input.required<string>();
    public readonly IdCalculated       = input.required<(indexRow: number, indexColumn: number, suffix?: string) => string>();
    public readonly footerSettings     = input.required<IFooterSettings<T>>();
    public readonly isLoadingInner     = input.required<WritableSignal<boolean>>();  
    public readonly isLoading          = input.required<boolean>();  
}