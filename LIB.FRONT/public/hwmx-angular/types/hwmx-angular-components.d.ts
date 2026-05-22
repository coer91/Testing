import * as _angular_core from '@angular/core';
import { AfterViewInit, OnDestroy, EffectRef, Signal, ElementRef, WritableSignal, AfterContentChecked } from '@angular/core';
import { IBreakpointButton, IExternalButton, IHeaderSettings, IImportButton, IInputChange, IColumnConfig, IBodySettings, IInputEnter, ISort, IDataSourceGroup, ISelectedRow, IColumn, IFooterSettings, ITitleBreadcrumb, ITitleGoBack, ITitleInformation } from 'hwmx-angular/interfaces';
import { ControlValue, CoerAlert } from 'hwmx-angular/tools';
import * as i18 from '@angular/forms';
import { FormGroup } from '@angular/forms';
import * as i17 from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as i19 from 'hwmx-angular/directives';
import { TemplateRefDirective } from 'hwmx-angular/directives';
import * as i16 from '@angular/common';
import * as i20 from 'hwmx-angular/pipes';

declare class WIAButton implements AfterViewInit, OnDestroy {
    protected readonly _id: string;
    protected readonly IsNotOnlyWhiteSpace: (value: any) => boolean;
    protected _htmlElement: HTMLElement;
    readonly label: _angular_core.InputSignal<string>;
    readonly type: _angular_core.InputSignal<"filled" | "outline" | "icon" | "icon-rounded" | "icon-filled" | "icon-filled-rounded" | "icon-outline" | "icon-outline-rounded">;
    readonly color: _angular_core.InputSignal<"primary" | "secondary" | "success" | "warning" | "danger" | "navigation" | "information" | "dark" | "light">;
    readonly icon: _angular_core.InputSignal<string>;
    readonly path: _angular_core.InputSignal<string>;
    readonly iconPosition: _angular_core.InputSignal<"left" | "right">;
    readonly isLoading: _angular_core.InputSignal<boolean>;
    readonly isReadonly: _angular_core.InputSignal<boolean>;
    readonly isInvisible: _angular_core.InputSignal<boolean>;
    readonly isHidden: _angular_core.InputSignal<boolean>;
    readonly breakpoints: _angular_core.InputSignal<IBreakpointButton>;
    readonly width: _angular_core.InputSignal<string>;
    readonly minWidth: _angular_core.InputSignal<string>;
    readonly maxWidth: _angular_core.InputSignal<string>;
    readonly height: _angular_core.InputSignal<string>;
    readonly minHeight: _angular_core.InputSignal<string>;
    readonly maxHeight: _angular_core.InputSignal<string>;
    readonly marginTop: _angular_core.InputSignal<string>;
    readonly marginRight: _angular_core.InputSignal<string>;
    readonly marginBottom: _angular_core.InputSignal<string>;
    readonly marginLeft: _angular_core.InputSignal<string>;
    protected readonly onClick: _angular_core.OutputEmitterRef<void>;
    protected readonly onDestroy: _angular_core.OutputEmitterRef<void>;
    protected onReady: _angular_core.OutputEmitterRef<void>;
    ngAfterViewInit(): Promise<void>;
    ngOnDestroy(): void;
    private _onFocus;
    protected _label: _angular_core.Signal<string>;
    protected _color: _angular_core.Signal<string>;
    protected _isEnabled: _angular_core.Signal<boolean>;
    protected _cursor: _angular_core.Signal<"pointer" | "wait" | "default">;
    protected _breakpointWidth: _angular_core.Signal<string>;
    protected _width: _angular_core.Signal<string>;
    protected _path: _angular_core.Signal<string | null>;
    protected _iconPosition: _angular_core.Signal<"left" | "right">;
    protected _icon: _angular_core.Signal<string>;
    protected _breakpointType: _angular_core.Signal<"filled" | "outline" | "icon" | "icon-rounded" | "icon-filled" | "icon-filled-rounded" | "icon-outline" | "icon-outline-rounded">;
    protected _Click(event: any): void;
    /** Press the button logically */
    Click(): void;
    /** Focus on the button */
    Focus(delay?: number): void;
    /** Blur the button */
    Blur(): void;
    /** Scroll to the element */
    ScrollToElement(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIAButton, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIAButton, "wia-button", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "color": { "alias": "color"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "path": { "alias": "path"; "required": false; "isSignal": true; }; "iconPosition": { "alias": "iconPosition"; "required": false; "isSignal": true; }; "isLoading": { "alias": "isLoading"; "required": false; "isSignal": true; }; "isReadonly": { "alias": "isReadonly"; "required": false; "isSignal": true; }; "isInvisible": { "alias": "isInvisible"; "required": false; "isSignal": true; }; "isHidden": { "alias": "isHidden"; "required": false; "isSignal": true; }; "breakpoints": { "alias": "breakpoints"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; "minWidth": { "alias": "minWidth"; "required": false; "isSignal": true; }; "maxWidth": { "alias": "maxWidth"; "required": false; "isSignal": true; }; "height": { "alias": "height"; "required": false; "isSignal": true; }; "minHeight": { "alias": "minHeight"; "required": false; "isSignal": true; }; "maxHeight": { "alias": "maxHeight"; "required": false; "isSignal": true; }; "marginTop": { "alias": "marginTop"; "required": false; "isSignal": true; }; "marginRight": { "alias": "marginRight"; "required": false; "isSignal": true; }; "marginBottom": { "alias": "marginBottom"; "required": false; "isSignal": true; }; "marginLeft": { "alias": "marginLeft"; "required": false; "isSignal": true; }; }, { "onClick": "onClick"; "onDestroy": "onDestroy"; "onReady": "onReady"; }, never, never, false, never>;
}

declare class WIATextBox extends ControlValue {
    protected readonly _isFocused: _angular_core.WritableSignal<boolean>;
    protected readonly _isHoverElement: _angular_core.WritableSignal<boolean>;
    protected _htmlElement: HTMLInputElement | null;
    protected _htmlElementContainer: HTMLElement | null;
    protected readonly _isSecretComponent: _angular_core.WritableSignal<boolean>;
    protected readonly _showSecret: _angular_core.WritableSignal<boolean>;
    protected readonly _isNumberComponent: _angular_core.WritableSignal<boolean>;
    protected readonly _showStepIcon: _angular_core.WritableSignal<boolean>;
    protected readonly _isSelectComponent: _angular_core.WritableSignal<boolean>;
    protected readonly _dataSource: _angular_core.WritableSignal<any[]>;
    protected readonly _isCollapsed: _angular_core.WritableSignal<boolean>;
    protected readonly _index: _angular_core.WritableSignal<number>;
    protected readonly _search: _angular_core.WritableSignal<string>;
    placeholder: _angular_core.InputSignal<string>;
    selectOnFocus: _angular_core.InputSignal<boolean>;
    textPosition: _angular_core.InputSignal<"left" | "right" | "center">;
    minLength: _angular_core.InputSignal<string | number>;
    maxLength: _angular_core.InputSignal<string | number>;
    showClearButton: _angular_core.InputSignal<boolean>;
    showSearchButton: _angular_core.InputSignal<boolean>;
    externalButtons: _angular_core.InputSignal<IExternalButton | undefined>;
    size: _angular_core.InputSignal<"small" | "normal">;
    width: _angular_core.InputSignal<string>;
    minWidth: _angular_core.InputSignal<string>;
    maxWidth: _angular_core.InputSignal<string>;
    protected readonly onKeyupEnter: _angular_core.OutputEmitterRef<string>;
    protected readonly onClickClear: _angular_core.OutputEmitterRef<void>;
    protected readonly onClickSearch: _angular_core.OutputEmitterRef<string>;
    protected readonly onClickLeft: _angular_core.OutputEmitterRef<void>;
    protected readonly onClickRight: _angular_core.OutputEmitterRef<void>;
    /** Sets the value of the component */
    protected _SetValue(value: any): void;
    protected Start(): Promise<void>;
    protected Destructor(): void;
    protected _onMouseEnter: () => void;
    protected _onMouseLeave: () => void;
    protected _onKeyup: (event: KeyboardEvent) => void;
    protected _onKeydown: (event: KeyboardEvent) => void;
    protected _onPaste: () => void;
    protected _onFocus: () => void;
    protected _onBlur: () => void;
    protected _inputType: _angular_core.Signal<"number" | "text" | "password">;
    protected _showExternalButtonLeft: _angular_core.Signal<boolean>;
    protected _showExternalButtonRight: _angular_core.Signal<boolean>;
    protected _left: _angular_core.Signal<"40px" | "0px">;
    protected _right: _angular_core.Signal<"40px" | "0px">;
    protected _showSecretClosed: _angular_core.Signal<boolean>;
    protected _showSecretOpen: _angular_core.Signal<boolean>;
    protected _paddingLeft: _angular_core.Signal<"10px">;
    protected _paddingRight: _angular_core.Signal<string>;
    protected _widtht: _angular_core.Signal<string>;
    protected _label: _angular_core.Signal<string>;
    protected _showLabel: _angular_core.Signal<boolean>;
    protected _showClearButton: _angular_core.Signal<boolean>;
    protected _showSearchButton: _angular_core.Signal<boolean>;
    protected _ClickSearch(): void;
    protected _ValueByComponent: _angular_core.Signal<any>;
    protected _Input: (value: any) => void;
    isFocused: _angular_core.Signal<boolean>;
    /** */
    Clear(): void;
    /** */
    Focus(select?: boolean): void;
    /** */
    Blur(): void;
    /** */
    ScrollToElement(delay?: number, toView?: 'start' | 'center' | 'end' | 'nearest'): void;
    protected _placeholder: _angular_core.Signal<string>;
    protected _GetIconBySelect: (item: any) => string;
    protected _GetDisplayBySelect: (item: any) => string;
    protected _ResetSearch(value: any): void;
    protected _IncrementStep(): void;
    protected _DecrementStep(): void;
    protected _ValueFormat: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIATextBox, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIATextBox, "wia-textbox", never, { "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "selectOnFocus": { "alias": "selectOnFocus"; "required": false; "isSignal": true; }; "textPosition": { "alias": "textPosition"; "required": false; "isSignal": true; }; "minLength": { "alias": "minLength"; "required": false; "isSignal": true; }; "maxLength": { "alias": "maxLength"; "required": false; "isSignal": true; }; "showClearButton": { "alias": "showClearButton"; "required": false; "isSignal": true; }; "showSearchButton": { "alias": "showSearchButton"; "required": false; "isSignal": true; }; "externalButtons": { "alias": "externalButtons"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; "minWidth": { "alias": "minWidth"; "required": false; "isSignal": true; }; "maxWidth": { "alias": "maxWidth"; "required": false; "isSignal": true; }; }, { "onKeyupEnter": "onKeyupEnter"; "onClickClear": "onClickClear"; "onClickSearch": "onClickSearch"; "onClickLeft": "onClickLeft"; "onClickRight": "onClickRight"; }, never, never, false, never>;
}

declare class WIADateBox extends WIATextBox {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIADateBox, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIADateBox, "wia-datebox", never, {}, {}, never, never, false, never>;
}

declare class WIASelectBox<T> extends WIATextBox {
    protected effectRef: EffectRef;
    protected _htmlElement: HTMLInputElement | null;
    protected readonly _isSelectComponent: _angular_core.WritableSignal<boolean>;
    protected readonly _isFocused: _angular_core.WritableSignal<boolean>;
    protected readonly _search: _angular_core.WritableSignal<string>;
    protected readonly _index: _angular_core.WritableSignal<number>;
    protected readonly _isHoverElement: _angular_core.WritableSignal<boolean>;
    protected readonly _arrayType: _angular_core.WritableSignal<"string" | "number" | "object">;
    protected readonly _applySearch: _angular_core.WritableSignal<boolean>;
    protected readonly _isLoading: _angular_core.WritableSignal<boolean>;
    readonly selectOnFocus: _angular_core.InputSignal<boolean>;
    readonly showClearButton: _angular_core.InputSignal<boolean>;
    readonly dataSource: _angular_core.InputSignal<T[]>;
    readonly displayProperty: _angular_core.InputSignal<string>;
    readonly useIconProperty: _angular_core.InputSignal<boolean>;
    protected readonly onValueChange: _angular_core.OutputEmitterRef<T>;
    protected readonly onOpen: _angular_core.OutputEmitterRef<void>;
    protected readonly onClose: _angular_core.OutputEmitterRef<void>;
    constructor();
    private _valueCalculated;
    protected _onPaste: () => void;
    protected _onFocus: () => void;
    protected _onBlur: () => void;
    protected _onKeyup: (event: KeyboardEvent) => void;
    protected Destructor(): void;
    protected _placeholder: _angular_core.Signal<string>;
    protected _isEnabled: _angular_core.Signal<boolean>;
    protected _showClearButton: _angular_core.Signal<boolean>;
    protected _showSearchButton: _angular_core.Signal<boolean>;
    /** Sets the value of the component */
    protected _SetValue(value: any): void;
    protected _GetIconBySelect: (item: any) => string;
    protected _GetDisplayBySelect: (item: any) => string;
    protected _ValueByComponent: _angular_core.Signal<any>;
    protected _Input: (value: any) => void;
    protected _ResetSearch(value: any): void;
    /** */
    Focus(open?: boolean): Promise<void>;
    /** */
    Blur(): Promise<void>;
    /** */
    Clear(): void;
    /**  */
    Select(callback: number | string | ((row: T) => boolean), property?: string): T | null;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIASelectBox<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIASelectBox<any>, "wia-selectbox", never, { "selectOnFocus": { "alias": "selectOnFocus"; "required": false; "isSignal": true; }; "showClearButton": { "alias": "showClearButton"; "required": false; "isSignal": true; }; "dataSource": { "alias": "dataSource"; "required": false; "isSignal": true; }; "displayProperty": { "alias": "displayProperty"; "required": false; "isSignal": true; }; "useIconProperty": { "alias": "useIconProperty"; "required": false; "isSignal": true; }; }, { "onValueChange": "onValueChange"; "onOpen": "onOpen"; "onClose": "onClose"; }, never, never, false, never>;
}

declare class WIASwitch extends ControlValue {
    protected readonly _value: _angular_core.WritableSignal<boolean>;
    protected _htmlElement: HTMLElement;
    readonly value: _angular_core.InputSignal<boolean>;
    readonly labelPosition: _angular_core.InputSignal<"left" | "right">;
    readonly breakLabel: _angular_core.InputSignal<boolean>;
    readonly type: _angular_core.InputSignal<"switch" | "checkbox">;
    readonly color: _angular_core.InputSignal<"primary" | "secondary" | "success" | "warning" | "danger" | "navigation" | "information">;
    readonly textColor: _angular_core.InputSignal<boolean>;
    readonly tooltip: _angular_core.InputSignal<string>;
    readonly tooltipPosition: _angular_core.InputSignal<"left" | "right" | "top" | "bottom">;
    readonly width: _angular_core.InputSignal<string>;
    readonly maxWidth: _angular_core.InputSignal<string>;
    protected readonly onClick: _angular_core.OutputEmitterRef<boolean>;
    /** Sets the value of the component */
    protected _SetValue(value: boolean): void;
    protected Start(): Promise<void>;
    protected _Toggle(): void;
    protected _textColor: _angular_core.Signal<string>;
    protected _checkboxColor: _angular_core.Signal<"var(--light)" | "transparent">;
    /** */
    Check(): void;
    /** */
    Uncheck(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIASwitch, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIASwitch, "wia-switch", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "labelPosition": { "alias": "labelPosition"; "required": false; "isSignal": true; }; "breakLabel": { "alias": "breakLabel"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "color": { "alias": "color"; "required": false; "isSignal": true; }; "textColor": { "alias": "textColor"; "required": false; "isSignal": true; }; "tooltip": { "alias": "tooltip"; "required": false; "isSignal": true; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; "maxWidth": { "alias": "maxWidth"; "required": false; "isSignal": true; }; }, { "onClick": "onClick"; }, never, never, false, never>;
}

declare class WIANumberBox extends WIATextBox {
    protected effectRef: EffectRef;
    protected readonly _isNumberComponent: _angular_core.WritableSignal<boolean>;
    protected readonly _showStepIcon: _angular_core.WritableSignal<boolean>;
    protected _stepIconLoading: _angular_core.WritableSignal<boolean>;
    readonly minLength: _angular_core.InputSignal<string | number>;
    readonly maxLength: _angular_core.InputSignal<string | number>;
    readonly format: _angular_core.InputSignal<"number" | "none" | "currency">;
    readonly decimals: _angular_core.InputSignal<number>;
    readonly step: _angular_core.InputSignal<number>;
    readonly showStepIcon: _angular_core.InputSignal<boolean>;
    readonly min: _angular_core.InputSignal<number>;
    readonly max: _angular_core.InputSignal<number>;
    constructor();
    protected _step: _angular_core.Signal<number>;
    protected _ValueFormat: _angular_core.Signal<string>;
    protected _onKeydown: (event: KeyboardEvent) => void;
    protected _onBlur: () => void;
    protected _Input: (value: any) => void;
    protected _IncrementStep(): void;
    protected _DecrementStep(): void;
    /** */
    private _OnlyNumbers;
    /** */
    private _ValidateRangeValue;
    protected _showLabel: _angular_core.Signal<boolean>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIANumberBox, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIANumberBox, "wia-numberbox", never, { "minLength": { "alias": "minLength"; "required": false; "isSignal": true; }; "maxLength": { "alias": "maxLength"; "required": false; "isSignal": true; }; "format": { "alias": "format"; "required": false; "isSignal": true; }; "decimals": { "alias": "decimals"; "required": false; "isSignal": true; }; "step": { "alias": "step"; "required": false; "isSignal": true; }; "showStepIcon": { "alias": "showStepIcon"; "required": false; "isSignal": true; }; "min": { "alias": "min"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; }, {}, never, never, false, never>;
}

declare class WIAForm implements AfterViewInit, OnDestroy {
    protected readonly _alert: CoerAlert;
    protected readonly _isReady: _angular_core.WritableSignal<boolean>;
    formGroup: _angular_core.InputSignal<FormGroup<any>>;
    controls: _angular_core.InputSignal<(WIATextBox | WIASwitch | WIANumberBox | WIASelectBox<any>)[]>;
    isLoading: _angular_core.InputSignal<boolean>;
    isReadonly: _angular_core.InputSignal<boolean>;
    protected readonly onDestroy: _angular_core.OutputEmitterRef<void>;
    protected onReady: _angular_core.OutputEmitterRef<void>;
    ngAfterViewInit(): Promise<void>;
    ngOnDestroy(): void;
    protected _isEnabled: _angular_core.Signal<boolean>;
    /** */
    IsInvalidControl: (formControlName: string) => boolean;
    /** */
    IsValidControl: (formControlName: string) => boolean;
    /** */
    SetControlValue(formControlName: string, value: any): void;
    /** */
    GetControlValue<T>(formControlName: string, alternative?: T): T;
    /** */
    RemoveControlValidator(formControlName: string): void;
    /** */
    HasControlValue(formControlName: string): boolean;
    /** Mark all controls as touched */
    TouchForm(): void;
    /** Mark all controls as touched */
    IsValid: () => boolean;
    /** Mark all controls as touched */
    IsInvalid: () => boolean;
    /** */
    RemoveValidators(exclude?: string[]): void;
    /** Gets the value of the form */
    GetValue<T>(): T;
    /** */
    Reset<T>(properties?: T | null): void;
    /**
     * Mark all controls as touched.
     * If form is invalid emit a warning and focus first invalid control.
    */
    Validate(): boolean;
    /** Focuses the specified control, otherwise the first invalid control or first control */
    Focus(formControl?: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIAForm, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIAForm, "wia-form", never, { "formGroup": { "alias": "formGroup"; "required": true; "isSignal": true; }; "controls": { "alias": "controls"; "required": true; "isSignal": true; }; "isLoading": { "alias": "isLoading"; "required": false; "isSignal": true; }; "isReadonly": { "alias": "isReadonly"; "required": false; "isSignal": true; }; }, { "onDestroy": "onDestroy"; "onReady": "onReady"; }, never, ["*"], false, never>;
}

declare class WIAGridHeader<T> implements AfterViewInit {
    protected readonly _inputFile: Signal<ElementRef<any>>;
    protected readonly _isLoadingExport: WritableSignal<boolean>;
    protected readonly _isElementReady: WritableSignal<boolean>;
    protected readonly IsNotOnlyWhiteSpace: (value: any) => boolean;
    readonly label: _angular_core.InputSignal<string>;
    readonly icon: _angular_core.InputSignal<string>;
    readonly IdCalculated: _angular_core.InputSignal<(indexRow: number, indexColumn: number, suffix?: string) => string>;
    readonly search: _angular_core.InputSignal<WritableSignal<string>>;
    readonly headerSettings: _angular_core.InputSignal<IHeaderSettings>;
    readonly isLoadingInner: _angular_core.InputSignal<WritableSignal<boolean>>;
    readonly isLoading: _angular_core.InputSignal<boolean>;
    readonly isEnabled: _angular_core.InputSignal<boolean>;
    readonly dataSourceExport: _angular_core.InputSignal<T[]>;
    readonly contentElements: _angular_core.InputSignal<Signal<readonly TemplateRefDirective[]>>;
    protected readonly onClickBack: _angular_core.OutputEmitterRef<void>;
    protected readonly onClickCancel: _angular_core.OutputEmitterRef<void>;
    protected readonly onClickFilter: _angular_core.OutputEmitterRef<void>;
    protected readonly onClickExport: _angular_core.OutputEmitterRef<T[]>;
    protected readonly onClickImport: _angular_core.OutputEmitterRef<IImportButton<T>>;
    protected readonly onClickAdd: _angular_core.OutputEmitterRef<void>;
    protected readonly onClickSave: _angular_core.OutputEmitterRef<void>;
    protected readonly onKeyupEnter: _angular_core.OutputEmitterRef<IInputChange<T>>;
    protected readonly onInputChange: _angular_core.OutputEmitterRef<IInputChange<T>>;
    protected readonly onClickClear: _angular_core.OutputEmitterRef<IInputChange<T>>;
    protected readonly onClickSearch: _angular_core.OutputEmitterRef<IInputChange<T>>;
    ngAfterViewInit(): void;
    protected _buttons: Signal<{
        icon: string;
        label: string;
        color: "primary" | "secondary" | "success" | "warning" | "danger" | "navigation" | "information" | "dark" | "light";
        path: string;
        tooltip: string;
        isLoading: boolean;
        event: any;
    }[]>;
    protected _showSearch: Signal<boolean>;
    protected _slotPosition: Signal<string>;
    /** */
    Export(exportFile?: boolean, fileName?: string): void;
    protected _importAccept: Signal<string>;
    /** */
    Import(event?: any): Promise<void>;
    protected _SearchChange(value: string): void;
    protected _gridHeaderBelow: Signal<any>;
    protected _showHeaderBelow: Signal<boolean>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIAGridHeader<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIAGridHeader<any>, "wia-grid-header", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "icon": { "alias": "icon"; "required": true; "isSignal": true; }; "IdCalculated": { "alias": "IdCalculated"; "required": true; "isSignal": true; }; "search": { "alias": "search"; "required": true; "isSignal": true; }; "headerSettings": { "alias": "headerSettings"; "required": true; "isSignal": true; }; "isLoadingInner": { "alias": "isLoadingInner"; "required": true; "isSignal": true; }; "isLoading": { "alias": "isLoading"; "required": true; "isSignal": true; }; "isEnabled": { "alias": "isEnabled"; "required": true; "isSignal": true; }; "dataSourceExport": { "alias": "dataSourceExport"; "required": true; "isSignal": true; }; "contentElements": { "alias": "contentElements"; "required": true; "isSignal": true; }; }, { "onClickBack": "onClickBack"; "onClickCancel": "onClickCancel"; "onClickFilter": "onClickFilter"; "onClickExport": "onClickExport"; "onClickImport": "onClickImport"; "onClickAdd": "onClickAdd"; "onClickSave": "onClickSave"; "onKeyupEnter": "onKeyupEnter"; "onInputChange": "onInputChange"; "onClickClear": "onClickClear"; "onClickSearch": "onClickSearch"; }, never, ["*"], false, never>;
}

declare class WIAGridCell<T> implements AfterViewInit {
    protected readonly WIATextBox: _angular_core.Signal<WIATextBox | undefined>;
    protected readonly coerNumberbox: _angular_core.Signal<WIANumberBox | undefined>;
    protected readonly coerSelectbox: _angular_core.Signal<WIASelectBox<T> | undefined>;
    protected readonly _isElementReady: WritableSignal<boolean>;
    readonly id: _angular_core.InputSignal<string>;
    readonly ApplyFormat: _angular_core.InputSignal<(value: any, format: "string" | "number" | "currency" | "date" | "datetime" | "time") => string>;
    readonly column: _angular_core.InputSignal<IColumnConfig<T>>;
    readonly row: _angular_core.InputSignal<any>;
    readonly bodySettings: _angular_core.InputSignal<IBodySettings<T>>;
    readonly isLoadingInner: _angular_core.InputSignal<WritableSignal<boolean>>;
    readonly isEnabled: _angular_core.InputSignal<boolean>;
    readonly isDraging: _angular_core.InputSignal<boolean>;
    readonly isDragoverself: _angular_core.InputSignal<boolean>;
    readonly isDragoverUp: _angular_core.InputSignal<boolean>;
    readonly isDragoverDown: _angular_core.InputSignal<boolean>;
    protected readonly onClickRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onDoubleClickRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onInputChange: _angular_core.OutputEmitterRef<IInputChange<T>>;
    protected readonly onKeyupEnter: _angular_core.OutputEmitterRef<IInputEnter<T>>;
    protected readonly onUpdateType: _angular_core.OutputEmitterRef<IInputChange<T>>;
    ngAfterViewInit(): void;
    protected _DoubleClick(): void;
    /** */
    _input: _angular_core.Signal<"inputTextbox" | "inputNumberbox" | "inputSelectbox" | "inputDatebox" | "inputSwitch">;
    private _ShowInput;
    protected _GetCellValue: _angular_core.Signal<string>;
    protected _GetAttributes: () => any;
    protected _GetAttributeValue: (attribute: string, defaultValue?: any) => any;
    protected _minHeight: _angular_core.Signal<string>;
    protected _GetTextAlignX: _angular_core.Signal<"center" | "flex-start" | "flex-end">;
    protected _GetTextBreak: _angular_core.Signal<"break-word" | "keep-all">;
    protected _GetSpaceBreak: _angular_core.Signal<"normal" | "nowrap">;
    protected _GetTextColor: _angular_core.Signal<string>;
    /** */
    Focus(onlyFocus?: boolean): void;
    /** */
    protected _SelectboxChange(value: any): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIAGridCell<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIAGridCell<any>, "wia-grid-cell", never, { "id": { "alias": "id"; "required": true; "isSignal": true; }; "ApplyFormat": { "alias": "ApplyFormat"; "required": true; "isSignal": true; }; "column": { "alias": "column"; "required": true; "isSignal": true; }; "row": { "alias": "row"; "required": true; "isSignal": true; }; "bodySettings": { "alias": "bodySettings"; "required": true; "isSignal": true; }; "isLoadingInner": { "alias": "isLoadingInner"; "required": true; "isSignal": true; }; "isEnabled": { "alias": "isEnabled"; "required": true; "isSignal": true; }; "isDraging": { "alias": "isDraging"; "required": true; "isSignal": true; }; "isDragoverself": { "alias": "isDragoverself"; "required": true; "isSignal": true; }; "isDragoverUp": { "alias": "isDragoverUp"; "required": true; "isSignal": true; }; "isDragoverDown": { "alias": "isDragoverDown"; "required": true; "isSignal": true; }; }, { "onClickRow": "onClickRow"; "onDoubleClickRow": "onDoubleClickRow"; "onInputChange": "onInputChange"; "onKeyupEnter": "onKeyupEnter"; "onUpdateType": "onUpdateType"; }, never, never, false, never>;
}

declare class WIAGridBody<T> {
    protected readonly _coerGridCellList: _angular_core.Signal<readonly WIAGridCell<T>[]>;
    protected readonly _sort: WritableSignal<ISort>;
    protected readonly IsBooleanFalse: (object: any, property?: string) => boolean;
    protected readonly _checkAll: WritableSignal<boolean>;
    protected readonly dragingId: WritableSignal<number>;
    protected readonly dragoverId: WritableSignal<number>;
    protected readonly dragoverOver: WritableSignal<boolean>;
    readonly value: _angular_core.InputSignal<T[]>;
    readonly IdCalculated: _angular_core.InputSignal<(indexRow: number, indexColumn: number, suffix?: string) => string>;
    readonly ApplyFormat: _angular_core.InputSignal<(value: any, type: "string" | "number" | "currency" | "date" | "datetime" | "time") => string>;
    readonly columns: _angular_core.InputSignal<IColumnConfig<T>[]>;
    readonly dataSourceGroup: _angular_core.InputSignal<IDataSourceGroup[]>;
    readonly headerSettings: _angular_core.InputSignal<IHeaderSettings>;
    readonly bodySettings: _angular_core.InputSignal<IBodySettings<T>>;
    readonly isLoadingInner: _angular_core.InputSignal<WritableSignal<boolean>>;
    readonly isLoading: _angular_core.InputSignal<boolean>;
    readonly isEnabled: _angular_core.InputSignal<boolean>;
    readonly useContainer: _angular_core.InputSignal<boolean>;
    readonly displayProperty: _angular_core.InputSignal<string>;
    readonly isDraggable: _angular_core.InputSignal<boolean>;
    readonly search: _angular_core.InputSignal<string>;
    readonly height: _angular_core.InputSignal<string>;
    readonly minHeight: _angular_core.InputSignal<string>;
    readonly maxHeight: _angular_core.InputSignal<string>;
    protected readonly onClickRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onDoubleClickRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onClickDeleteRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onClickEditRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onClickModalRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onClickNavigateRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onSelectedRowChange: _angular_core.OutputEmitterRef<T[]>;
    protected readonly onSelectedRow: _angular_core.OutputEmitterRef<ISelectedRow<T>>;
    protected readonly onInputChange: _angular_core.OutputEmitterRef<IInputChange<T>>;
    protected readonly onKeyupEnter: _angular_core.OutputEmitterRef<IInputChange<T>>;
    protected readonly onKeyupEnterLast: _angular_core.OutputEmitterRef<IInputChange<T>>;
    protected readonly onUpdateType: _angular_core.OutputEmitterRef<IInputChange<T>>;
    protected readonly onSort: _angular_core.OutputEmitterRef<T[]>;
    protected readonly onReorder: _angular_core.OutputEmitterRef<{
        from: number;
        to: number;
    }>;
    constructor();
    protected _showStriped: (index: number) => boolean;
    protected _ShowButton(button: any, position: 'left' | 'right', row?: any): boolean;
    protected _borderButtom: _angular_core.Signal<string>;
    protected _buttonsByRow: _angular_core.Signal<any[]>;
    protected _Path(property: 'deleteButton' | 'editButton' | 'modalButton' | 'navigateButton', row: any): string;
    protected _showCheckbox: _angular_core.Signal<boolean | undefined>;
    protected _isReadonlySelection: (row: any, byClickRow: boolean) => boolean;
    protected _IconShortHeader: (property: string) => string;
    protected _IconSearchHeader: (column: IColumn<T>) => "" | "iw-search";
    protected _ClickOnRow(row: any): void;
    protected _ClickCheckAll(checked: boolean): Promise<void>;
    protected _ClickCheck(checked: boolean, row: any): void;
    /** */
    CheckBy(callback: (row: T) => boolean): void;
    /** */
    UncheckBy(callback: (row: T) => boolean): void;
    protected _NextInput(indexRow: number, indexColumn: number, event: IInputEnter<T>): void;
    /** */
    FocusInput(indexRow?: number, indexColumn?: number, onlyFocus?: boolean): void;
    /** */
    FocusLastInput(onlyFocus?: boolean): void;
    /** */
    protected _ToggleSort(column: IColumn<T>): Promise<void>;
    /** */
    protected _Drag(row: any, event: DragEvent): void;
    /** */
    protected _DragOver(index: number, event: DragEvent): void;
    /** */
    protected _Drop(index: number, event: DragEvent): void;
    protected _cursor: _angular_core.Signal<"pointer" | "default" | "grabbing" | "grab">;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIAGridBody<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIAGridBody<any>, "wia-grid-body", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; "IdCalculated": { "alias": "IdCalculated"; "required": true; "isSignal": true; }; "ApplyFormat": { "alias": "ApplyFormat"; "required": true; "isSignal": true; }; "columns": { "alias": "columns"; "required": true; "isSignal": true; }; "dataSourceGroup": { "alias": "dataSourceGroup"; "required": true; "isSignal": true; }; "headerSettings": { "alias": "headerSettings"; "required": true; "isSignal": true; }; "bodySettings": { "alias": "bodySettings"; "required": true; "isSignal": true; }; "isLoadingInner": { "alias": "isLoadingInner"; "required": true; "isSignal": true; }; "isLoading": { "alias": "isLoading"; "required": true; "isSignal": true; }; "isEnabled": { "alias": "isEnabled"; "required": true; "isSignal": true; }; "useContainer": { "alias": "useContainer"; "required": true; "isSignal": true; }; "displayProperty": { "alias": "displayProperty"; "required": true; "isSignal": true; }; "isDraggable": { "alias": "isDraggable"; "required": true; "isSignal": true; }; "search": { "alias": "search"; "required": true; "isSignal": true; }; "height": { "alias": "height"; "required": true; "isSignal": true; }; "minHeight": { "alias": "minHeight"; "required": true; "isSignal": true; }; "maxHeight": { "alias": "maxHeight"; "required": true; "isSignal": true; }; }, { "onClickRow": "onClickRow"; "onDoubleClickRow": "onDoubleClickRow"; "onClickDeleteRow": "onClickDeleteRow"; "onClickEditRow": "onClickEditRow"; "onClickModalRow": "onClickModalRow"; "onClickNavigateRow": "onClickNavigateRow"; "onSelectedRowChange": "onSelectedRowChange"; "onSelectedRow": "onSelectedRow"; "onInputChange": "onInputChange"; "onKeyupEnter": "onKeyupEnter"; "onKeyupEnterLast": "onKeyupEnterLast"; "onUpdateType": "onUpdateType"; "onSort": "onSort"; "onReorder": "onReorder"; }, never, never, false, never>;
}

declare class WIAGrid<T> extends ControlValue implements AfterContentChecked {
    protected readonly _router: Router;
    protected readonly _alert: CoerAlert;
    contentElements: _angular_core.Signal<readonly TemplateRefDirective[]>;
    protected readonly _header: _angular_core.Signal<WIAGridHeader<T> | undefined>;
    protected readonly _body: _angular_core.Signal<WIAGridBody<T> | undefined>;
    protected readonly _value: _angular_core.WritableSignal<T[]>;
    protected readonly _search: _angular_core.WritableSignal<string>;
    protected readonly _isLoadingInner: _angular_core.WritableSignal<boolean>;
    protected readonly _headerHeight: _angular_core.WritableSignal<number>;
    protected readonly _footerHeight: _angular_core.WritableSignal<number>;
    protected readonly _containerHeight: _angular_core.WritableSignal<number>;
    protected _resize$: Subscription;
    readonly columns: _angular_core.InputSignal<IColumn<T>[]>;
    readonly headerSettings: _angular_core.InputSignal<IHeaderSettings>;
    readonly bodySettings: _angular_core.InputSignal<IBodySettings<T>>;
    readonly footerSettings: _angular_core.InputSignal<IFooterSettings<T>>;
    readonly useContainer: _angular_core.InputSignal<boolean>;
    readonly icon: _angular_core.InputSignal<string>;
    readonly width: _angular_core.InputSignal<string>;
    readonly minWidth: _angular_core.InputSignal<string>;
    readonly maxWidth: _angular_core.InputSignal<string>;
    readonly height: _angular_core.InputSignal<string>;
    readonly minHeight: _angular_core.InputSignal<string>;
    readonly maxHeight: _angular_core.InputSignal<string>;
    readonly siblings: _angular_core.InputSignal<(number | HTMLElement)[]>;
    readonly displayProperty: _angular_core.InputSignal<string>;
    readonly isDraggable: _angular_core.InputSignal<boolean>;
    readonly marginTop: _angular_core.InputSignal<string>;
    readonly marginRight: _angular_core.InputSignal<string>;
    readonly marginLeft: _angular_core.InputSignal<string>;
    protected readonly onClickBack: _angular_core.OutputEmitterRef<void>;
    protected readonly onClickCancel: _angular_core.OutputEmitterRef<void>;
    protected readonly onClickFilter: _angular_core.OutputEmitterRef<void>;
    protected readonly onClickExport: _angular_core.OutputEmitterRef<T[]>;
    protected readonly onClickImport: _angular_core.OutputEmitterRef<IImportButton<T>>;
    protected readonly onClickAdd: _angular_core.OutputEmitterRef<T | null>;
    protected readonly onClickSave: _angular_core.OutputEmitterRef<void>;
    protected readonly onKeyupEnter: _angular_core.OutputEmitterRef<IInputChange<T>>;
    protected readonly onClickClear: _angular_core.OutputEmitterRef<IInputChange<T>>;
    protected readonly onClickSearch: _angular_core.OutputEmitterRef<IInputChange<T>>;
    protected readonly onClickRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onDoubleClickRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onClickDeleteRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onClickEditRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onClickModalRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onClickNavigateRow: _angular_core.OutputEmitterRef<T>;
    protected readonly onSelectedRow: _angular_core.OutputEmitterRef<ISelectedRow<T>>;
    protected readonly onInputChange: _angular_core.OutputEmitterRef<IInputChange<T>>;
    protected readonly onSort: _angular_core.OutputEmitterRef<T[]>;
    protected readonly onReorder: _angular_core.OutputEmitterRef<T[]>;
    /** Sets the value of the component */
    protected _SetValue(value: T[], finishLoadingInner?: boolean): void;
    protected _SetValueInput(event: IInputChange<T>, updateType?: boolean): void;
    ngAfterContentChecked(): void;
    protected _columns: _angular_core.Signal<IColumnConfig<T>[]>;
    protected _GetColumnName: (property: string) => string;
    protected _GetColumnConfig: (property: string) => IColumn<T> | null;
    protected _dataSourceGroup: _angular_core.Signal<IDataSourceGroup[]>;
    protected _dataSourceFiltered: _angular_core.Signal<T[]>;
    protected _dataSourceExport: _angular_core.Signal<T[]>;
    /** */
    selectedValue: _angular_core.Signal<T[]>;
    protected _ApplyFormat: (value: string | number | Date | boolean, type?: "string" | "number" | "currency" | "date" | "time" | "datetime") => string;
    protected _IdCalculated: (indexRow: number, indexColumn: number, suffix?: string) => string;
    protected _ClickDeleteRow(row: T): Promise<void>;
    protected _height: _angular_core.Signal<string>;
    private CalculateHeight;
    protected _Import(value: IImportButton<T>): void;
    protected _Add(): void;
    /** */
    protected Reorder(event: any): Promise<void>;
    /** */
    Import(): void;
    /** */
    Export(fileName?: string, exportFile?: boolean): void;
    /** */
    CheckBy(callback: (row: T) => boolean): void;
    /** */
    UncheckBy(callback: (row: T) => boolean): void;
    /** */
    FocusInput(indexRow?: number, indexColumn?: number, onlyFocus?: boolean): void;
    /** */
    FocusLastInput(onlyFocus?: boolean): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIAGrid<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIAGrid<any>, "wia-grid", never, { "columns": { "alias": "columns"; "required": false; "isSignal": true; }; "headerSettings": { "alias": "headerSettings"; "required": false; "isSignal": true; }; "bodySettings": { "alias": "bodySettings"; "required": false; "isSignal": true; }; "footerSettings": { "alias": "footerSettings"; "required": false; "isSignal": true; }; "useContainer": { "alias": "useContainer"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; "minWidth": { "alias": "minWidth"; "required": false; "isSignal": true; }; "maxWidth": { "alias": "maxWidth"; "required": false; "isSignal": true; }; "height": { "alias": "height"; "required": false; "isSignal": true; }; "minHeight": { "alias": "minHeight"; "required": false; "isSignal": true; }; "maxHeight": { "alias": "maxHeight"; "required": false; "isSignal": true; }; "siblings": { "alias": "siblings"; "required": false; "isSignal": true; }; "displayProperty": { "alias": "displayProperty"; "required": false; "isSignal": true; }; "isDraggable": { "alias": "isDraggable"; "required": false; "isSignal": true; }; "marginTop": { "alias": "marginTop"; "required": false; "isSignal": true; }; "marginRight": { "alias": "marginRight"; "required": false; "isSignal": true; }; "marginLeft": { "alias": "marginLeft"; "required": false; "isSignal": true; }; }, { "onClickBack": "onClickBack"; "onClickCancel": "onClickCancel"; "onClickFilter": "onClickFilter"; "onClickExport": "onClickExport"; "onClickImport": "onClickImport"; "onClickAdd": "onClickAdd"; "onClickSave": "onClickSave"; "onKeyupEnter": "onKeyupEnter"; "onClickClear": "onClickClear"; "onClickSearch": "onClickSearch"; "onClickRow": "onClickRow"; "onDoubleClickRow": "onDoubleClickRow"; "onClickDeleteRow": "onClickDeleteRow"; "onClickEditRow": "onClickEditRow"; "onClickModalRow": "onClickModalRow"; "onClickNavigateRow": "onClickNavigateRow"; "onSelectedRow": "onSelectedRow"; "onInputChange": "onInputChange"; "onSort": "onSort"; "onReorder": "onReorder"; }, ["contentElements"], ["*"], false, never>;
}

declare class WIAGridFooter<T> {
    protected readonly IsBooleanFalse: (object: any, property?: string) => boolean;
    protected readonly IsNotOnlyWhiteSpace: (value: any) => boolean;
    readonly value: _angular_core.InputSignal<T[]>;
    readonly dataSourceSelected: _angular_core.InputSignal<T[]>;
    readonly dataSourceFiltered: _angular_core.InputSignal<T[]>;
    readonly search: _angular_core.InputSignal<string>;
    readonly IdCalculated: _angular_core.InputSignal<(indexRow: number, indexColumn: number, suffix?: string) => string>;
    readonly footerSettings: _angular_core.InputSignal<IFooterSettings<T>>;
    readonly isLoadingInner: _angular_core.InputSignal<WritableSignal<boolean>>;
    readonly isLoading: _angular_core.InputSignal<boolean>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIAGridFooter<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIAGridFooter<any>, "wia-grid-footer", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; "dataSourceSelected": { "alias": "dataSourceSelected"; "required": true; "isSignal": true; }; "dataSourceFiltered": { "alias": "dataSourceFiltered"; "required": true; "isSignal": true; }; "search": { "alias": "search"; "required": true; "isSignal": true; }; "IdCalculated": { "alias": "IdCalculated"; "required": true; "isSignal": true; }; "footerSettings": { "alias": "footerSettings"; "required": true; "isSignal": true; }; "isLoadingInner": { "alias": "isLoadingInner"; "required": true; "isSignal": true; }; "isLoading": { "alias": "isLoading"; "required": true; "isSignal": true; }; }, {}, never, never, false, never>;
}

declare class WIAModal implements AfterViewInit, OnDestroy {
    contentElements: _angular_core.Signal<readonly TemplateRefDirective[]>;
    protected readonly _id: string;
    protected readonly _showBackdrop: _angular_core.WritableSignal<boolean>;
    protected readonly _showContent: _angular_core.WritableSignal<boolean>;
    protected _htmlElement: HTMLElement;
    readonly title: _angular_core.InputSignal<string | undefined>;
    readonly icon: _angular_core.InputSignal<string>;
    readonly showCancelButton: _angular_core.InputSignal<boolean>;
    readonly alignX: _angular_core.InputSignal<"left" | "right" | "center">;
    readonly alignY: _angular_core.InputSignal<"top" | "bottom" | "middle">;
    readonly width: _angular_core.InputSignal<string>;
    readonly maxWidth: _angular_core.InputSignal<string>;
    readonly height: _angular_core.InputSignal<string>;
    protected readonly onOpen: _angular_core.OutputEmitterRef<void>;
    protected readonly onClose: _angular_core.OutputEmitterRef<void>;
    protected readonly onDestroy: _angular_core.OutputEmitterRef<void>;
    protected onReady: _angular_core.OutputEmitterRef<void>;
    ngAfterViewInit(): Promise<void>;
    ngOnDestroy(): void;
    protected _alignY: _angular_core.Signal<"center" | "flex-start" | "flex-end">;
    protected _alignX: _angular_core.Signal<"center" | "flex-start" | "flex-end">;
    protected _showHeader: _angular_core.Signal<boolean>;
    protected _modalBody: _angular_core.Signal<any>;
    protected _modalFooter: _angular_core.Signal<any>;
    protected _showFooter: _angular_core.Signal<boolean>;
    protected _gridTemplateRows: _angular_core.Signal<string>;
    protected _margin: _angular_core.Signal<string>;
    protected _width: _angular_core.Signal<string>;
    protected _maxWidth: _angular_core.Signal<string>;
    protected _clickBackdrop(event: any): Promise<void>;
    /** */
    Close(): Promise<void>;
    /** */
    Open(): Promise<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIAModal, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIAModal, "wia-modal", never, { "title": { "alias": "title"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "showCancelButton": { "alias": "showCancelButton"; "required": false; "isSignal": true; }; "alignX": { "alias": "alignX"; "required": false; "isSignal": true; }; "alignY": { "alias": "alignY"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; "maxWidth": { "alias": "maxWidth"; "required": false; "isSignal": true; }; "height": { "alias": "height"; "required": false; "isSignal": true; }; }, { "onOpen": "onOpen"; "onClose": "onClose"; "onDestroy": "onDestroy"; "onReady": "onReady"; }, ["contentElements"], ["*"], false, never>;
}

declare class WIAPageTitle {
    protected readonly _isLoading: _angular_core.WritableSignal<boolean>;
    protected readonly _iconRoot: _angular_core.WritableSignal<string>;
    protected readonly _labelRoot: _angular_core.WritableSignal<string | null>;
    readonly title: _angular_core.InputSignal<string | null>;
    readonly showBreadcrumbs: _angular_core.InputSignal<boolean>;
    readonly breadcrumbs: _angular_core.InputSignal<ITitleBreadcrumb[]>;
    readonly goBack: _angular_core.InputSignal<ITitleGoBack>;
    readonly information: _angular_core.InputSignal<ITitleInformation>;
    readonly onClickInformation: _angular_core.OutputEmitterRef<void>;
    readonly onClickGoBack: _angular_core.OutputEmitterRef<void>;
    constructor();
    /** */
    protected _GetSelectedMenu(): Promise<void>;
    protected _breadcrumbs: _angular_core.Signal<any[]>;
    /** */
    protected _ClickGoBack(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIAPageTitle, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIAPageTitle, "wia-page-title", never, { "title": { "alias": "title"; "required": false; "isSignal": true; }; "showBreadcrumbs": { "alias": "showBreadcrumbs"; "required": false; "isSignal": true; }; "breadcrumbs": { "alias": "breadcrumbs"; "required": false; "isSignal": true; }; "goBack": { "alias": "goBack"; "required": false; "isSignal": true; }; "information": { "alias": "information"; "required": false; "isSignal": true; }; }, { "onClickInformation": "onClickInformation"; "onClickGoBack": "onClickGoBack"; }, never, never, false, never>;
}

declare class WIASecretBox extends WIATextBox {
    protected effectRef: EffectRef;
    maxLength: _angular_core.InputSignal<string | number>;
    showSecret: _angular_core.InputSignal<boolean>;
    constructor();
    protected Destructor(): void;
    protected _inputType: _angular_core.Signal<"number" | "text" | "password">;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WIASecretBox, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WIASecretBox, "wia-secretbox", never, { "maxLength": { "alias": "maxLength"; "required": false; "isSignal": true; }; "showSecret": { "alias": "showSecret"; "required": false; "isSignal": true; }; }, {}, never, never, false, never>;
}

declare class ComponentsModule {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ComponentsModule, never>;
    static ɵmod: _angular_core.ɵɵNgModuleDeclaration<ComponentsModule, [typeof WIAButton, typeof WIADateBox, typeof WIAForm, typeof WIAGrid, typeof WIAGridBody, typeof WIAGridCell, typeof WIAGridFooter, typeof WIAGridHeader, typeof WIAModal, typeof WIANumberBox, typeof WIAPageTitle, typeof WIASecretBox, typeof WIASelectBox, typeof WIASwitch, typeof WIATextBox], [typeof i16.CommonModule, typeof i17.RouterModule, typeof i18.FormsModule, typeof i18.ReactiveFormsModule, typeof i19.DirectivesModule, typeof i20.PipesModule], [typeof WIAButton, typeof WIADateBox, typeof WIAForm, typeof WIAGrid, typeof WIAModal, typeof WIANumberBox, typeof WIAPageTitle, typeof WIASecretBox, typeof WIASelectBox, typeof WIASwitch, typeof WIATextBox]>;
    static ɵinj: _angular_core.ɵɵInjectorDeclaration<ComponentsModule>;
}

export { ComponentsModule, WIAButton, WIADateBox, WIAForm, WIAGrid, WIAModal, WIANumberBox, WIAPageTitle, WIASecretBox, WIASelectBox, WIASwitch, WIATextBox };
