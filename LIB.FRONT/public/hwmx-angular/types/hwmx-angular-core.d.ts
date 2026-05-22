import * as _angular_core from '@angular/core';
import { AfterViewInit, OnDestroy, Type } from '@angular/core';
import * as i15 from 'hwmx-angular/tools';
import { Page, Collections, CoerAlert } from 'hwmx-angular/tools';
import * as hwmx_angular_interfaces from 'hwmx-angular/interfaces';
import { IMenu, IMenuSelected, IToolbarMenu, ILogin, ILoginResponse, IUser, IAuthService } from 'hwmx-angular/interfaces';
import * as i12 from 'hwmx-angular/components';
import { WIAModal, WIASecretBox, WIAButton, WIAForm, WIATextBox } from 'hwmx-angular/components';
import * as i11 from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as i10 from '@angular/router';
import { Router, CanActivateFn, Route } from '@angular/router';
import * as i9 from '@angular/common';
import * as i13 from 'hwmx-angular/directives';
import * as i14 from 'hwmx-angular/pipes';

declare class MenuPage extends Page {
    protected menu: _angular_core.WritableSignal<IMenu[]>;
    protected title: _angular_core.WritableSignal<string>;
    constructor();
    protected _isPage: (item: IMenu) => boolean;
    protected _getPath: (item: IMenu) => string | null;
    protected _pages: _angular_core.Signal<IMenu[]>;
    protected _submenu: _angular_core.Signal<IMenu[]>;
    protected _GetNavigation(selectedMenu: IMenuSelected | null): Promise<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<MenuPage, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<MenuPage, "menu-page", never, {}, {}, never, never, false, never>;
}

declare class Toolbar implements AfterViewInit {
    protected readonly _profileModal: _angular_core.Signal<WIAModal | undefined>;
    protected readonly _passwordModal: _angular_core.Signal<WIAModal | undefined>;
    protected readonly passwordRef: _angular_core.Signal<WIASecretBox | undefined>;
    protected readonly confirmRef: _angular_core.Signal<WIASecretBox | undefined>;
    protected readonly buttonRef: _angular_core.Signal<WIAButton | undefined>;
    protected readonly user: _angular_core.WritableSignal<hwmx_angular_interfaces.IUser | null>;
    protected readonly userImage: _angular_core.WritableSignal<string>;
    protected readonly _isLoading: _angular_core.WritableSignal<boolean>;
    protected readonly title: any;
    protected readonly _isCollapsed: _angular_core.WritableSignal<boolean>;
    protected readonly _password: _angular_core.WritableSignal<string>;
    protected readonly _confirm: _angular_core.WritableSignal<string>;
    protected readonly _role: _angular_core.WritableSignal<any>;
    protected readonly IsNotOnlyWhiteSpace: (value: any) => boolean;
    readonly menu: _angular_core.InputSignal<IToolbarMenu[]>;
    readonly showUserData: _angular_core.InputSignal<boolean>;
    readonly showProfileMenu: _angular_core.InputSignal<boolean>;
    readonly preventProfileMenu: _angular_core.InputSignal<boolean>;
    readonly showPasswordMenu: _angular_core.InputSignal<boolean>;
    readonly preventPasswordMenu: _angular_core.InputSignal<boolean>;
    readonly showLogOutMenu: _angular_core.InputSignal<boolean>;
    readonly preventLogOutMenu: _angular_core.InputSignal<boolean>;
    protected readonly onClickToogle: _angular_core.OutputEmitterRef<void>;
    protected readonly onClickToolbarMenu: _angular_core.OutputEmitterRef<IToolbarMenu>;
    protected readonly onUpdatePassword: _angular_core.OutputEmitterRef<string>;
    protected readonly onUpdateRole: _angular_core.OutputEmitterRef<string>;
    constructor();
    ngAfterViewInit(): void;
    protected _showButtonSidenav: _angular_core.Signal<boolean>;
    protected _roleList: _angular_core.Signal<any[]>;
    protected _icon: _angular_core.Signal<"" | "iw-developer-fill" | "iw-quality-fill">;
    protected _isInvalidPassword: _angular_core.Signal<boolean>;
    protected _isInvalidConfirm: _angular_core.Signal<boolean>;
    protected _disableUpdatePassword: _angular_core.Signal<boolean>;
    protected _showIdentity: _angular_core.Signal<boolean>;
    protected _menu: _angular_core.Signal<any[]>;
    protected _SelectMenu(menu: IToolbarMenu): void;
    protected _UpdateRole(role: string): void;
    protected _ResetPassword(): void;
    /** */
    CloseModal(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Toolbar, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<Toolbar, "coer-toolbar", never, { "menu": { "alias": "menu"; "required": true; "isSignal": true; }; "showUserData": { "alias": "showUserData"; "required": true; "isSignal": true; }; "showProfileMenu": { "alias": "showProfileMenu"; "required": true; "isSignal": true; }; "preventProfileMenu": { "alias": "preventProfileMenu"; "required": true; "isSignal": true; }; "showPasswordMenu": { "alias": "showPasswordMenu"; "required": true; "isSignal": true; }; "preventPasswordMenu": { "alias": "preventPasswordMenu"; "required": true; "isSignal": true; }; "showLogOutMenu": { "alias": "showLogOutMenu"; "required": true; "isSignal": true; }; "preventLogOutMenu": { "alias": "preventLogOutMenu"; "required": true; "isSignal": true; }; }, { "onClickToogle": "onClickToogle"; "onClickToolbarMenu": "onClickToolbarMenu"; "onUpdatePassword": "onUpdatePassword"; "onUpdateRole": "onUpdateRole"; }, never, never, false, never>;
}

declare class LoginPage implements AfterViewInit {
    protected formBulder: FormBuilder;
    protected readonly _form: _angular_core.Signal<WIAForm>;
    protected readonly _inputUser: _angular_core.Signal<WIATextBox>;
    protected readonly _inputPassword: _angular_core.Signal<WIASecretBox>;
    protected readonly _loginButton: _angular_core.Signal<WIAButton>;
    protected readonly title: any;
    protected readonly isLoading: _angular_core.WritableSignal<boolean>;
    protected readonly background = "";
    protected readonly view: _angular_core.WritableSignal<"LOGIN" | "RECOVERY">;
    protected formGroup: FormGroup;
    protected readonly onLogin: _angular_core.OutputEmitterRef<ILogin>;
    protected readonly onRecoveryPassword: _angular_core.OutputEmitterRef<string>;
    constructor();
    ngAfterViewInit(): Promise<void>;
    protected _Toggle(): void;
    protected _Click(): void;
    protected _ShowButton: () => boolean;
    /** */
    Show(view: 'LOGIN' | 'RECOVERY'): void;
    /** */
    FocusUser(): void;
    /** */
    FocusPassword(select?: boolean): void;
    /** */
    SetUser(user: string): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<LoginPage, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<LoginPage, "login", never, {}, { "onLogin": "onLogin"; "onRecoveryPassword": "onRecoveryPassword"; }, never, never, false, never>;
}

declare class SidenavAccordion implements AfterViewInit, OnDestroy {
    protected readonly _isCollapsed: _angular_core.WritableSignal<boolean>;
    protected readonly IsNotOnlyWhiteSpace: (value: any) => boolean;
    protected _htmlElement: HTMLElement;
    protected readonly onOpen: _angular_core.OutputEmitterRef<void>;
    protected readonly onClose: _angular_core.OutputEmitterRef<void>;
    protected readonly onDestroy: _angular_core.OutputEmitterRef<void>;
    protected onReady: _angular_core.OutputEmitterRef<void>;
    id: _angular_core.InputSignal<string>;
    title: _angular_core.InputSignal<string | null | undefined>;
    icon: _angular_core.InputSignal<string | null | undefined>;
    level: _angular_core.InputSignal<"lv1" | "lv2">;
    showIndicator: _angular_core.InputSignal<boolean>;
    showSidenav: _angular_core.InputSignal<boolean>;
    ngAfterViewInit(): Promise<void>;
    ngOnDestroy(): void;
    isCollapsed: _angular_core.Signal<boolean>;
    _paddingLeft: _angular_core.Signal<"10px" | "40px">;
    protected _Toggle: () => void;
    /** */
    Open(): void;
    /** */
    Close(): void;
    /** */
    ScrollToElement(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SidenavAccordion, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SidenavAccordion, "coer-sidenav-accordion", never, { "id": { "alias": "id"; "required": true; "isSignal": true; }; "title": { "alias": "title"; "required": true; "isSignal": true; }; "icon": { "alias": "icon"; "required": true; "isSignal": true; }; "level": { "alias": "level"; "required": true; "isSignal": true; }; "showIndicator": { "alias": "showIndicator"; "required": true; "isSignal": true; }; "showSidenav": { "alias": "showSidenav"; "required": true; "isSignal": true; }; }, { "onOpen": "onOpen"; "onClose": "onClose"; "onDestroy": "onDestroy"; "onReady": "onReady"; }, never, ["*"], false, never>;
}

declare class Sidenav {
    protected readonly _menuList: _angular_core.Signal<readonly SidenavAccordion[]>;
    private readonly _router;
    protected readonly show: _angular_core.WritableSignal<boolean>;
    protected readonly _navigation: _angular_core.WritableSignal<IMenu[]>;
    protected readonly _isLoading: _angular_core.WritableSignal<boolean>;
    protected readonly SetId: typeof Collections.SetId;
    protected readonly IsBooleanFalse: (object: any, property?: string) => boolean;
    protected readonly IsOnlyWhiteSpace: (value: any) => boolean;
    protected readonly IsNotOnlyWhiteSpace: (value: any) => boolean;
    readonly navigation: _angular_core.InputSignal<IMenu[]>;
    protected readonly onOpen: _angular_core.OutputEmitterRef<void>;
    protected readonly onClose: _angular_core.OutputEmitterRef<void>;
    constructor();
    protected _width: _angular_core.Signal<"width-sidenav" | "width-40px cursor-pointer" | "width-0px">;
    protected _SetSelectedMenu(): Promise<void>;
    protected _GetSelectedMenuByPath: (path: string) => IMenuSelected | null;
    protected _IdGenerated: (lv1?: number, lv2?: number, lv3?: number, index?: number) => string;
    protected _IsOption: (menu: IMenu) => boolean;
    protected _IsMenu: (item: IMenu) => boolean;
    protected _ClickOptionLv1(lv1: IMenu, lv1Id: string): void;
    protected _ClickOptionLv2(lv2: IMenu, lv1: IMenu, lv2Id: string, lv1Id: string): void;
    protected _ClickOptionLv3(lv3: IMenu, lv2: IMenu, lv1: IMenu, lv3Id: string, lv2Id: string, lv1Id: string): void;
    protected _ClickMenu(lv1: IMenu, action: 'OPEN' | 'CLOSED', lv1Id: string): void;
    protected _ClickSubmenu(lv2: IMenu, lv1: IMenu, action: 'OPEN' | 'CLOSED', lv2Id: string, lv1Id: string): void;
    protected _ClickMenuGrid(lv1: IMenu, lv1Id: string): void;
    protected _ClickSubmenuGrid(lv2: IMenu, lv1: IMenu, lv2Id: string, lv1Id: string): void;
    protected _NavigateTo(option: IMenuSelected, navigate: boolean): void;
    protected _CloseMenus(option: IMenuSelected | null): void;
    protected _ResetStorage(): void;
    /** */
    Toggle(): void;
    /** */
    Open(): void;
    /** */
    Close(): void;
    private _ClickBrowserButton;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<Sidenav, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<Sidenav, "sidenav", never, { "navigation": { "alias": "navigation"; "required": true; "isSignal": true; }; }, { "onOpen": "onOpen"; "onClose": "onClose"; }, never, never, false, never>;
}

declare class WiaComponent {
    protected readonly _alert: CoerAlert;
    protected readonly _router: Router;
    protected readonly _toolbar: _angular_core.Signal<Toolbar | undefined>;
    protected readonly _sidenav: _angular_core.Signal<Sidenav | undefined>;
    protected readonly _login: _angular_core.Signal<LoginPage | undefined>;
    readonly alert: CoerAlert;
    readonly router: Router;
    protected readonly isOpenSidenav: _angular_core.WritableSignal<boolean>;
    protected _watchJWT$: any;
    readonly navigation: _angular_core.InputSignal<IMenu[]>;
    readonly toolbarMenu: _angular_core.InputSignal<IToolbarMenu[]>;
    readonly toolbarShowUserData: _angular_core.InputSignal<boolean>;
    readonly toolbarShowProfileMenu: _angular_core.InputSignal<boolean>;
    readonly toolbarPreventProfileMenu: _angular_core.InputSignal<boolean>;
    readonly toolbarShowPasswordMenu: _angular_core.InputSignal<boolean>;
    readonly toolbarPreventPasswordMenu: _angular_core.InputSignal<boolean>;
    readonly toolbarShowLogOutMenu: _angular_core.InputSignal<boolean>;
    readonly toolbarPreventLogOutMenu: _angular_core.InputSignal<boolean>;
    protected readonly onLogin: _angular_core.OutputEmitterRef<ILogin>;
    protected readonly onRecoveryPassword: _angular_core.OutputEmitterRef<string>;
    protected readonly onUpdateJWT: _angular_core.OutputEmitterRef<void>;
    protected readonly onClickToolbarMenu: _angular_core.OutputEmitterRef<IToolbarMenu>;
    protected readonly onUpdatePassword: _angular_core.OutputEmitterRef<string>;
    protected readonly onUpdateRole: _angular_core.OutputEmitterRef<string>;
    constructor();
    protected _isLogin: _angular_core.Signal<boolean>;
    protected _showBackdrop: _angular_core.Signal<boolean>;
    /** */
    FocusUser(): void;
    /** */
    FocusPassword(select?: boolean): void;
    /** */
    Show(view: 'LOGIN' | 'RECOVERY'): void;
    /** */
    CloseModal(): void;
    /** */
    SetAccess(response: ILoginResponse | IUser): boolean;
    private _WatchJWT;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WiaComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WiaComponent, "wia-component", never, { "navigation": { "alias": "navigation"; "required": true; "isSignal": true; }; "toolbarMenu": { "alias": "toolbarMenu"; "required": false; "isSignal": true; }; "toolbarShowUserData": { "alias": "toolbarShowUserData"; "required": false; "isSignal": true; }; "toolbarShowProfileMenu": { "alias": "toolbarShowProfileMenu"; "required": false; "isSignal": true; }; "toolbarPreventProfileMenu": { "alias": "toolbarPreventProfileMenu"; "required": false; "isSignal": true; }; "toolbarShowPasswordMenu": { "alias": "toolbarShowPasswordMenu"; "required": false; "isSignal": true; }; "toolbarPreventPasswordMenu": { "alias": "toolbarPreventPasswordMenu"; "required": false; "isSignal": true; }; "toolbarShowLogOutMenu": { "alias": "toolbarShowLogOutMenu"; "required": false; "isSignal": true; }; "toolbarPreventLogOutMenu": { "alias": "toolbarPreventLogOutMenu"; "required": false; "isSignal": true; }; }, { "onLogin": "onLogin"; "onRecoveryPassword": "onRecoveryPassword"; "onUpdateJWT": "onUpdateJWT"; "onClickToolbarMenu": "onClickToolbarMenu"; "onUpdatePassword": "onUpdatePassword"; "onUpdateRole": "onUpdateRole"; }, never, never, false, never>;
}

declare class WiaRoot {
    protected readonly _coer91: _angular_core.Signal<WiaComponent>;
    protected readonly _navigation: _angular_core.WritableSignal<IMenu[]>;
    protected readonly IsNotNull: (value: any) => boolean;
    protected readonly IsFunction: (object: any, property?: string) => boolean;
    authService: _angular_core.InputSignal<IAuthService>;
    staticNavigation: _angular_core.InputSignal<IMenu[]>;
    protected readonly onLogin: _angular_core.OutputEmitterRef<ILogin>;
    protected readonly onRecoveryPassword: _angular_core.OutputEmitterRef<string>;
    protected readonly onUpdatePassword: _angular_core.OutputEmitterRef<string>;
    protected readonly onUpdateRole: _angular_core.OutputEmitterRef<string>;
    protected readonly onUpdateJWT: _angular_core.OutputEmitterRef<void>;
    protected readonly onClickToolbarMenu: _angular_core.OutputEmitterRef<IToolbarMenu>;
    constructor();
    /** */
    protected Login(login?: ILogin): Promise<void>;
    /** */
    protected GetNavigation(): Promise<void>;
    /** */
    protected RecoveryPassword(user: string): Promise<void>;
    /** */
    protected SetPassword(Password: string): Promise<void>;
    /** */
    protected UpdateRole(roleId: string): Promise<void>;
    /** */
    protected UpdateJWT(): Promise<void>;
    /** */
    protected ToolbarMenu(menu: IToolbarMenu): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<WiaRoot, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<WiaRoot, "wia-root", never, { "authService": { "alias": "authService"; "required": true; "isSignal": true; }; "staticNavigation": { "alias": "staticNavigation"; "required": false; "isSignal": true; }; }, { "onLogin": "onLogin"; "onRecoveryPassword": "onRecoveryPassword"; "onUpdatePassword": "onUpdatePassword"; "onUpdateRole": "onUpdateRole"; "onUpdateJWT": "onUpdateJWT"; "onClickToolbarMenu": "onClickToolbarMenu"; }, never, never, false, never>;
}

declare class HomePage extends Page {
    protected readonly version = "0.0.0";
    protected readonly img = "hwmx-angular/images/hyundai-wia.png";
    constructor();
    protected _environment: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HomePage, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HomePage, "home-page", never, {}, {}, never, never, false, never>;
}

declare class CoreModule {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CoreModule, never>;
    static ɵmod: _angular_core.ɵɵNgModuleDeclaration<CoreModule, [typeof MenuPage, typeof WiaComponent, typeof WiaRoot, typeof HomePage, typeof LoginPage, typeof Sidenav, typeof SidenavAccordion, typeof Toolbar], [typeof i9.CommonModule, typeof i10.RouterModule, typeof i11.FormsModule, typeof i11.ReactiveFormsModule, typeof i12.ComponentsModule, typeof i13.DirectivesModule, typeof i14.PipesModule, typeof i15.CoerAlert], [typeof WiaRoot]>;
    static ɵinj: _angular_core.ɵɵInjectorDeclaration<CoreModule>;
}

/** */
declare const LoginGuard: CanActivateFn;
/** */
declare const ActiveKeyGuard: CanActivateFn;
/** */
declare const ROUTER_PAGE: (path: string, component: Type<any>, routerParams?: string[], activeKey?: string) => Route;
/** */
declare const ROUTES_WIA: Route[];

export { ActiveKeyGuard, CoreModule, LoginGuard, ROUTER_PAGE, ROUTES_WIA, WiaRoot };
