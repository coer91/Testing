import * as _angular_core from '@angular/core';
import { AfterViewInit, WritableSignal, OnDestroy, EffectRef } from '@angular/core';
import { IUser, IJWT, IHttpRequest, IHttpResponse, IMenuSelected, IAppSource, ITitleBreadcrumb, ITitleGoBack, ICallbackItem, ICellSwitch, IScreenSize } from 'hwmx-angular/interfaces';
import * as _angular_forms from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

declare class CoerAlert implements AfterViewInit {
    protected static _alert: HTMLElement;
    protected static _confirm: HTMLElement;
    protected static _transactions: Set<string>;
    ngAfterViewInit(): Promise<void>;
    /** */
    Information(message?: string | null, title?: string | null, icon?: string | null, autohide?: number | null): Promise<HTMLElement>;
    /** */
    Success(message?: string | null, title?: string | null, icon?: string | null, autohide?: number | null): Promise<HTMLElement>;
    /** */
    Warning(message?: string | null, title?: string | null, icon?: string | null, autohide?: number | null): Promise<HTMLElement>;
    /** */
    Danger(message?: string | null, title?: string | null, icon?: string | null, autohide?: number | null): Promise<HTMLElement>;
    /** */
    CloseAlert(alert: HTMLElement): void;
    /** */
    CloseAllAlerts(): void;
    /** */
    private _BuildAlert;
    /** */
    InformationOk(message?: string | null, icon?: string | null): Promise<boolean>;
    /** */
    SuccessOk(message?: string | null, icon?: string | null): Promise<boolean>;
    /** */
    WarningOk(message?: string | null, icon?: string | null): Promise<boolean>;
    /** */
    DangerOk(message?: string | null, icon?: string | null): Promise<boolean>;
    /** */
    InformationConfirm(message?: string | null, icon?: string | null): Promise<boolean>;
    /** */
    SuccessConfirm(message?: string | null, icon?: string | null): Promise<boolean>;
    /** */
    WarningConfirm(message?: string | null, icon?: string | null): Promise<boolean>;
    /** */
    DangerConfirm(message?: string | null, icon?: string | null): Promise<boolean>;
    /** */
    private _ConfirmInformation;
    /** */
    private _ConfirmSuccess;
    /** */
    private _ConfirmWarning;
    /** */
    private _ConfirmDanger;
    /**  */
    private _BuildConfirm;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CoerAlert, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CoerAlert, "coer-alert", never, {}, {}, never, never, true, never>;
}

/** Controls user information in localStorage */
declare class Access {
    private static readonly useJWT;
    private static readonly storage;
    /** */
    static SetUser(user: string | IUser | null): void;
    /** */
    static GetUser(): IUser | null;
    /** */
    static RememberUser(): string;
    /** */
    static IsLogin(): boolean;
    /** */
    static LogOut(userSIGNAL: WritableSignal<IUser | null>): void;
    /** */
    static GetJWTInfo(): IJWT;
}
/** Get webAPI from appSettings */
declare const GetAppSettings: <T>(environment: "DEVELOPMENT" | "STAGING" | "PRODUCTION") => T;

declare class Collections {
    /** Set an index and concat more arrays of the same type */
    static SetIndex<T>(array: T[], ...args: T[][]): T[];
    /** Set an id and concat more arrays of the same type */
    static SetId<T>(array: T[], ...args: T[][]): T[];
    /** */
    static Distinct<T>(array: T[]): T[];
    /** */
    static Except<T>(array: T[], exceptions: T[], property?: string | null): T[];
    /** */
    static Intercept<T>(array: T[], array2: T[], property?: string | null): T[];
    /** */
    static SortAsc<T>(array: T[], property?: string | null): T[];
    /** */
    static SortDesc<T>(array: T[], property?: string | null): T[];
    /** */
    private static _Sort;
    /** */
    static Search<T>(array: T[], text: string, properties?: string[]): T[];
}

declare const CONTROL_VALUE: <T>(component: T) => {
    provide: _angular_core.InjectionToken<readonly _angular_forms.ControlValueAccessor[]>;
    useExisting: _angular_core.Type<any>;
    multi: boolean;
};
declare abstract class ControlValue implements AfterViewInit, OnDestroy {
    protected effectControlValueRef: EffectRef;
    protected readonly _id: string;
    protected readonly _value: _angular_core.WritableSignal<any>;
    protected readonly _isTouched: _angular_core.WritableSignal<boolean>;
    protected readonly _IsTouchedFunction: _angular_core.WritableSignal<Function | null>;
    protected readonly _UpdateValue: _angular_core.WritableSignal<Function | null>;
    protected readonly _isElementReady: _angular_core.WritableSignal<boolean>;
    protected readonly IsNull: (value: any) => boolean;
    protected readonly IsNotNull: (value: any) => boolean;
    protected readonly IsOnlyWhiteSpace: (value: any) => boolean;
    protected readonly IsNotOnlyWhiteSpace: (value: any) => boolean;
    protected readonly IsBooleanTrue: (object: any, property?: string) => boolean;
    protected readonly IsBooleanFalse: (object: any, property?: string) => boolean;
    readonly value: _angular_core.InputSignal<any>;
    readonly formControlName: _angular_core.InputSignal<string>;
    readonly label: _angular_core.InputSignal<string>;
    readonly isLoading: _angular_core.InputSignal<boolean>;
    readonly isReadonly: _angular_core.InputSignal<boolean>;
    readonly isInvisible: _angular_core.InputSignal<boolean>;
    readonly isHidden: _angular_core.InputSignal<boolean>;
    readonly isValid: _angular_core.InputSignal<boolean>;
    readonly isInvalid: _angular_core.InputSignal<boolean>;
    readonly marginTop: _angular_core.InputSignal<string>;
    readonly marginRight: _angular_core.InputSignal<string>;
    readonly marginBottom: _angular_core.InputSignal<string>;
    readonly marginLeft: _angular_core.InputSignal<string>;
    protected readonly onValueChange: _angular_core.OutputEmitterRef<any>;
    protected readonly onDestroy: _angular_core.OutputEmitterRef<void>;
    protected onReady: _angular_core.OutputEmitterRef<void>;
    constructor();
    ngAfterViewInit(): Promise<void>;
    protected Start(): Promise<void>;
    ngOnDestroy(): void;
    protected Destructor(): void;
    /** */
    isTouched: _angular_core.Signal<boolean>;
    protected _isEnabled: _angular_core.Signal<boolean>;
    /** Sets the value of the component */
    protected _SetValue(value: any): void;
    protected _useModelBinding: _angular_core.Signal<boolean>;
    protected writeValue(value: any): void;
    protected registerOnChange(callback: Function): void;
    protected registerOnTouched(callback: Function): void;
    /** Sets whether the component has been touched */
    SetTouched(isTouched: boolean): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ControlValue, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ControlValue, "ng-component", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "formControlName": { "alias": "formControlName"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "isLoading": { "alias": "isLoading"; "required": false; "isSignal": true; }; "isReadonly": { "alias": "isReadonly"; "required": false; "isSignal": true; }; "isInvisible": { "alias": "isInvisible"; "required": false; "isSignal": true; }; "isHidden": { "alias": "isHidden"; "required": false; "isSignal": true; }; "isValid": { "alias": "isValid"; "required": false; "isSignal": true; }; "isInvalid": { "alias": "isInvalid"; "required": false; "isSignal": true; }; "marginTop": { "alias": "marginTop"; "required": false; "isSignal": true; }; "marginRight": { "alias": "marginRight"; "required": false; "isSignal": true; }; "marginBottom": { "alias": "marginBottom"; "required": false; "isSignal": true; }; "marginLeft": { "alias": "marginLeft"; "required": false; "isSignal": true; }; }, { "onValueChange": "onValueChange"; "onDestroy": "onDestroy"; "onReady": "onReady"; }, never, never, true, never>;
}

declare class Dates {
    static readonly MONTHS: Map<number, string>;
    /** */
    static GetOffset(): number;
    /** */
    static IsValidDate(date: string | Date): boolean;
    /** */
    static ToDate(date: string | Date): Date;
    /** */
    static GetLastDayOfMonth(date: string | Date): number;
    /** */
    static GetCurrentDate(): Date;
    /** */
    static GetCurrentUTCDate(): Date;
    /** */
    static ToLocalZone(utcDate: string | Date): Date;
    /** */
    static ToUTC(date: string | Date): Date;
    /** YYYY-MM-DD HH:mm:ss */
    static ToFormatDB(date: string | Date): string;
    /** MMM DD, YYYY */
    private static ToFormatDateMDY;
    /** DD MMM YYYY */
    private static ToFormatDateDMY;
    /** */
    static ToFormatDate(date: string | Date, format?: 'MDY' | 'DMY'): string;
    /** YYYY-MM-DD */
    static ToDateOnly(date: string | Date): string;
    /** */
    static ToFormatTime(date: string | Date, ampm?: boolean): string;
    /** */
    static ToFormatDateTime(date: string | Date, ampm?: boolean, format?: 'MDY' | 'DMY'): string;
    /** */
    static AddMilliseconds(date: string | Date, milliseconds: number): Date;
    /** */
    static AddSeconds(date: string | Date, seconds?: number): Date;
    /** */
    static AddMinutes(date: string | Date, minutes?: number): Date;
    /** */
    static AddHours(date: string | Date, hours?: number): Date;
    /** Add days */
    static AddDays(date: string | Date, days?: number): Date;
    /** Add weeks */
    static AddWeeks(date: string | Date, weeks?: number): Date;
    /** Add months */
    static AddMonths(date: string | Date, months?: number): Date;
    /** Add years */
    static AddYears(date: string | Date, years?: number): Date;
    /** */
    static SetMillisecond(date: string | Date, millisecond?: number): Date;
    /** */
    static SetSecond(date: string | Date, second?: number): Date;
    /** */
    static SetMinute(date: string | Date, minute?: number): Date;
    /** */
    static SetHour(date: string | Date, hour?: number): Date;
    /** Set 00:00:00 */
    static SetFirstHour(date: string | Date): Date;
    /** Set 23:59:59 */
    static SetLastHour(date: string | Date): Date;
    /** */
    static SetDay(date: string | Date, day?: number): Date;
    /** */
    static SetFirstDay(date: string | Date): Date;
    /**  */
    static SetLastDay(date: string | Date): Date;
    /** */
    static GetDiffNow(date: string | Date, unit?: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days', isUTC?: boolean): number;
    /** */
    static GetDiff(fromDate: string | Date, toDate: string | Date, unit?: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days'): number;
    /** HH:mm:ss */
    static GetTimeSpan(date: string | Date): string;
}

declare class Files {
    static readonly IMAGE_EXTENSIONS: Map<string, string>;
    static readonly EXCEL_EXTENSIONS: Map<string, string>;
    /** Get Extension File */
    static GetExtension(file: File): string;
    /** */
    static IsExcel(file: File): boolean;
    /** Read excel file */
    static ReadExcel<T>(file: File): Promise<{
        columns: string[];
        rows: T[];
    }>;
    /** Export to excel file */
    static ExportExcel<T>(data: T[], fileName?: string, sheetName?: string): void;
    /** Convert file to string base64 */
    static ToBase64(file: File): Promise<string>;
}

declare const Tools: {
    /** Generates a guid */
    GetGuid: (seed?: string) => string;
    /** Returns true if the value is null or undefined, false otherwise */
    IsNull: (value: any) => boolean;
    /** Returns true if the value is not null or undefined, false otherwise */
    IsNotNull: (value: any) => boolean;
    /** Returns true if the value is null or undefined or is an empty string or contains only whitespace, false otherwise */
    IsOnlyWhiteSpace: (value: any) => boolean;
    /** Returns true if it has a string value and is not all whitespace, false otherwise */
    IsNotOnlyWhiteSpace: (value: any) => boolean;
    /** Break reference of a object or array */
    BreakReference: <T>(object: T) => T;
    /** Get properties of an object */
    GetPropertyList: (object: any) => string[];
    /** */
    HasProperty: (object: any, property: string) => boolean;
    /** */
    IsBoolean: (object: any, property?: string) => boolean;
    /** */
    IsBooleanTrue: (object: any, property?: string) => boolean;
    /** */
    IsBooleanFalse: (object: any, property?: string) => boolean;
    /** */
    IsString: (object: any, property?: string) => boolean;
    /** */
    IsFunction: (object: any, property?: string) => boolean;
    /** Wait the time indicated */
    Sleep: (milliseconds?: number, transactionName?: string) => Promise<void>;
    GetDefaultIcon(icon: string | null): string;
    /** Send text to the computer's clipboard */
    Clipboard: (text: string, message?: string, title?: string) => void;
};

declare class HTMLElements {
    /**  */
    private static _QuerySelector;
    /** Returns the first element within node's descendants whose ID is elementId. */
    static SelectElementById: (id: string) => HTMLElement | null;
    /** Returns the first element that is a descendant of node that matches selectors */
    static SelectElement: (selector: string) => HTMLElement | null;
    /** Returns all element descendants of node that match selectors. */
    static SelectAllElements: (selector: string) => HTMLElement[];
    /** */
    static ScrollX: (element: string | HTMLElement, x: number) => HTMLElement | null;
    /** */
    static ScrollY: (element: string | HTMLElement, y: number) => HTMLElement | null;
    /** */
    static ScrollToCoordinates: (element: string | HTMLElement, x: number, y: number) => HTMLElement | null;
    /** */
    static ScrollToElement: (element: string | HTMLElement, toView?: "start" | "center" | "end" | "nearest") => HTMLElement | null;
    /** */
    static GetOffsetTop: (element: string | HTMLElement) => number;
    /** */
    static GetCssValue: (element: string | HTMLElement, style: string) => string;
    /** Gets the width of the element in px */
    static GetWidth: (element: string | HTMLElement) => string;
    /** Gets the height of the element in px */
    static GetHeight: (element: string | HTMLElement) => string;
    /** */
    static HasClass: (element: string | HTMLElement, className: string) => boolean;
    /** */
    static AddClass: (element: string | HTMLElement, className: string) => HTMLElement | null;
    /** */
    static RemoveClass: (element: string | HTMLElement, className: string) => HTMLElement | null;
    /** */
    static GetChildren: (element: string | HTMLElement) => HTMLElement[];
    /** */
    static GetFather: (element: string | HTMLElement) => HTMLElement | null;
    /** */
    static OnMouseLeave: (element: string | HTMLElement) => Observable<"mouseleave"> | null;
}

declare class HTTP {
    readonly alert: CoerAlert;
    static readonly STATUS_CODE: {
        /** 200 */
        Ok: number;
        /** 201 */
        Created: number;
        /** 204 */
        NoContent: number;
        /** 400 */
        BadRequest: number;
        /** 401 */
        Unauthorize: number;
        /** 403 */
        Forbidden: number;
        /** 404 */
        NotFound: number;
        /** 405 */
        NotAllowed: number;
        /** 406 */
        NotAcceptable: number;
        /** 409 */
        Conflict: number;
        /** 413 */
        PayloadTooLarge: number;
        /** 500 */
        InnerError: number;
    };
    /** */
    static GET<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>>;
    /** */
    static POST<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>>;
    /** */
    static PUT<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>>;
    /** */
    static PATCH<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>>;
    /** */
    static DELETE<T>(request: IHttpRequest<T>): Promise<IHttpResponse<T>>;
    private static _HTTP;
    private static _BuildRequest;
    private static _BuildHeaders;
    private static _BuildResponse;
    private static _BuildError;
}

declare class Navigation {
    private static readonly storage;
    /** */
    static SetSelectedMenu(selectedMenu: IMenuSelected): void;
    /** */
    static GetSelectedMenu(): IMenuSelected | null;
}

declare class Numbers {
    /** */
    static IsNumber(value: any, validType?: boolean): boolean;
    /** */
    static IsNotNumber(value: any): boolean;
    /** */
    static SetDecimals(value: string | number | null | undefined, decimals?: number): string;
    /** */
    static ToNumericFormat(value: string | number | null | undefined, decimals?: number): string;
    /** */
    static ToCurrency(value: string | number | null | undefined, currency?: string, currencyCode?: string): string;
}

declare class BreadcrumbsPage {
    private static readonly storage;
    /** */
    static Set(page: string, path: string): void;
    /** */
    static Get(): IAppSource[];
    /** */
    static UpdateLast(page: string, path: string): void;
    /** */
    static RemoveByPath(path: string): void;
    /** */
    static RemoveLast(): void;
    private static _Save;
}

declare class FiltersPage {
    private static readonly storage;
    /** */
    static Get<T>(path: string): T;
    /** */
    static Set<T>(path: string, filters: T): void;
    /** */
    static Remove(path: string): void;
}

declare class ResponsePage {
    private static readonly storage;
    /** Save the responsePage to sessionStorage */
    static Set<T>(sender: string, receiver: string, response: T): void;
    /** Gets the responsePage from sessionStorage */
    static Get<T>(): {
        sender: string;
        receiver: string;
        response: T | null;
    };
    /** Remove the responsePage from sessionStorage */
    static Remove(): void;
}

declare class SourcePage {
    private static readonly storage;
    /** */
    static Set(pageName: string, path: string): void;
    /** */
    static Get(): IAppSource | null;
}

declare class Strings {
    /** Sets the first character to lowercase */
    static FirstCharToLower(value: string | number | null | undefined): string;
    /** Sets the first character to uppercase */
    static FirstCharToUpper(value: string | number | null | undefined): string;
    /** Clean extra whitespaces */
    static CleanUpBlanks(value: string | number | null | undefined): string;
    /** Apply title formatting */
    static ToTitle(value: string | number | null | undefined): string;
    /** Removes the last character */
    static RemoveLastChar(value: string | number | null | undefined): string;
    /** Removes accents */
    static RemoveAccents(value: string | number | null | undefined, except?: string[]): string;
    /** Removes special characters */
    static RemoveSpecialCharacters(value: string | number | null | undefined): string;
    /** Only Alphanumeric */
    static OnlyAlphanumeric(value: string | number | null | undefined): string;
    /** Only Alphanumeric */
    static OnlyNumbers(value: string | number | null | undefined): string;
    /** Validates if both strings are equal */
    static Equals(value: string | number | null | undefined, value2: string | number | null | undefined, sensitive?: boolean): boolean;
    /**  */
    static ConcatName(...args: string[]): string;
}

declare abstract class Page implements AfterViewInit, OnDestroy {
    protected readonly router: Router;
    protected readonly alert: CoerAlert;
    private readonly _activatedRoute;
    /** */
    protected readonly isUpdating: _angular_core.WritableSignal<boolean>;
    /** */
    protected readonly isLoading: _angular_core.WritableSignal<boolean>;
    /** */
    protected readonly canCreate: _angular_core.WritableSignal<boolean>;
    /** */
    protected readonly canUpdate: _angular_core.WritableSignal<boolean>;
    /** */
    protected readonly canDelete: _angular_core.WritableSignal<boolean>;
    /** */
    protected readonly breadcrumbs: _angular_core.WritableSignal<ITitleBreadcrumb[]>;
    /** */
    protected readonly responsePage: _angular_core.WritableSignal<any>;
    /** */
    protected readonly filters: _angular_core.WritableSignal<any>;
    /** */
    protected goBack: ITitleGoBack;
    protected readonly IsNull: (value: any) => boolean;
    protected readonly IsNotNull: (value: any) => boolean;
    protected readonly IsOnlyWhiteSpace: (value: any) => boolean;
    protected readonly IsNotOnlyWhiteSpace: (value: any) => boolean;
    protected readonly IsBooleanTrue: (object: any, property?: string) => boolean;
    protected readonly IsBooleanFalse: (object: any, property?: string) => boolean;
    protected readonly SetId: typeof Collections.SetId;
    protected readonly SetIndex: typeof Collections.SetIndex;
    protected readonly Equals: typeof Strings.Equals;
    private _path;
    private _pageName;
    private _sourcePage;
    private _routeParams;
    private _queryParams;
    /** */
    constructor(pageName: string);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Main method */
    protected StartPage(): void;
    /** Main method */
    protected Destroy(): void;
    private _SetPath;
    /** */
    protected SetPageName(pageName: string, id?: string | number): void;
    private _SetBreadcrumbs;
    private _SetGoBack;
    /** */
    protected SetResponsePage<T>(response: T): void;
    private _GetResponsePage;
    /** Navigate to previous page */
    protected GoToSource<T>(responsePage?: T): void;
    /** */
    protected ReloadPage(): void;
    /** */
    protected SetPageFilters<T>(filters: T): void;
    /** */
    protected RemovePageFilter(): void;
    /** */
    protected GetParam(param: string, origin?: 'ROUTE_PARAMS' | 'QUERY_PARAMS'): string;
    /** */
    protected Log(value: any, logName?: string | null): void;
    /** */
    protected iconTemplate: (data: ICallbackItem<any>) => string;
    /** */
    protected isActiveTemplate: (data: ICallbackItem<any>) => string;
    /** */
    protected switchTemplate: (_: ICallbackItem<any>) => ICellSwitch;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Page, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<Page, "ng-component", never, {}, {}, never, never, true, never>;
}

declare class Screen {
    protected static readonly alert: CoerAlert;
    /** Gets the width of the browser window */
    static get WINDOW_WIDTH(): number;
    /** Gets the height of the browser window */
    static get WINDOW_HEIGHT(): number;
    /** Gets the width of the device screen */
    static get DEVICE_WIDTH(): number;
    /** Gets the height of the device screen */
    static get DEVICE_HEIGHT(): number;
    /** gets the breakpoint based on the width of the browsing window */
    static get BREAKPOINT(): 'mv' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    /** Provides an observable for screen resizing */
    static Resize: Observable<IScreenSize>;
    /** Provides an observable for the browser buttons */
    static ClickBrowserButton: Observable<string>;
}

declare abstract class Section implements AfterViewInit, OnDestroy {
    protected readonly router: Router;
    protected readonly alert: CoerAlert;
    protected readonly IsNull: (value: any) => boolean;
    protected readonly IsNotNull: (value: any) => boolean;
    protected readonly IsOnlyWhiteSpace: (value: any) => boolean;
    protected readonly IsNotOnlyWhiteSpace: (value: any) => boolean;
    protected readonly IsBooleanTrue: (object: any, property?: string) => boolean;
    protected readonly IsBooleanFalse: (object: any, property?: string) => boolean;
    protected readonly SetId: typeof Collections.SetId;
    protected readonly SetIndex: typeof Collections.SetIndex;
    protected readonly Equals: typeof Strings.Equals;
    readonly isLoading: WritableSignal<boolean>;
    readonly isLoadingExternal: _angular_core.InputSignal<boolean>;
    readonly isUpdating: _angular_core.InputSignal<boolean>;
    readonly canCreate: _angular_core.InputSignal<boolean>;
    readonly canUpdate: _angular_core.InputSignal<boolean>;
    readonly canDelete: _angular_core.InputSignal<boolean>;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Main method */
    protected StartSection(): void;
    /** Main method */
    protected Destroy(): void;
    /** */
    protected Log(value: any, logName?: string | null): void;
    /** */
    protected iconTemplate: (data: ICallbackItem<any>) => string;
    /** */
    protected isActiveTemplate: (data: ICallbackItem<any>) => string;
    /** */
    protected switchTemplate: (_: ICallbackItem<any>) => ICellSwitch;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Section, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<Section, "ng-component", never, { "isLoadingExternal": { "alias": "isLoadingExternal"; "required": false; "isSignal": true; }; "isUpdating": { "alias": "isUpdating"; "required": false; "isSignal": true; }; "canCreate": { "alias": "canCreate"; "required": false; "isSignal": true; }; "canUpdate": { "alias": "canUpdate"; "required": false; "isSignal": true; }; "canDelete": { "alias": "canDelete"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { Access, BreadcrumbsPage, CONTROL_VALUE, CoerAlert, Collections, ControlValue, Dates, Files, FiltersPage, GetAppSettings, HTMLElements, HTTP, Navigation, Numbers, Page, ResponsePage, Screen, Section, SourcePage, Strings, Tools };
