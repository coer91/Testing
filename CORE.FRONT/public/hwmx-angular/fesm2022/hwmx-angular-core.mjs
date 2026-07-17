import * as i0 from '@angular/core';
import { signal, effect, computed, Component, inject, viewChild, output, input, viewChildren, NgModule } from '@angular/core';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from '@angular/router';
import { Router, ResolveEnd, RouterModule } from '@angular/router';
import * as i3 from 'hwmx-angular/components';
import { ComponentsModule } from 'hwmx-angular/components';
import * as i2 from '@angular/forms';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i4 from 'hwmx-angular/directives';
import { DirectivesModule } from 'hwmx-angular/directives';
import * as i5 from 'hwmx-angular/pipes';
import { PipesModule } from 'hwmx-angular/pipes';
import * as i2$1 from 'hwmx-angular/tools';
import { Page, Tools, Collections, Strings, HTMLElements, Screen, Navigation, SourcePage, BreadcrumbsPage, Access, CoerAlert, Dates } from 'hwmx-angular/tools';
import { selectedMenuSIGNAL, navigationSIGNAL, isLoadingSIGNAL, environmentSIGNAL, screenSizeSIGNAL, userSIGNAL, userImageSIGNAL } from 'hwmx-angular/signals';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs';

class MenuPage extends Page {
    //variables
    menu = signal([], ...(ngDevMode ? [{ debugName: "menu" }] : /* istanbul ignore next */ []));
    title = signal('Menu', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    constructor() {
        super('Menu');
        effect(() => {
            this._GetNavigation(selectedMenuSIGNAL());
        });
    }
    //Function
    _isPage = (item) => {
        return Tools.IsNull(item?.Items) && Tools.IsNotOnlyWhiteSpace(item?.Path);
    };
    //Function
    _getPath = (item) => {
        return (this._isPage(item) && item.Path.length > 0) ? item.Path : null;
    };
    //Computed
    _pages = computed(() => {
        return Collections.SetId(this.menu().filter(item => this._isPage(item)));
    }, ...(ngDevMode ? [{ debugName: "_pages" }] : /* istanbul ignore next */ []));
    //Computed
    _submenu = computed(() => {
        return Collections.SetId(this.menu().filter(item => !this._isPage(item)));
    }, ...(ngDevMode ? [{ debugName: "_submenu" }] : /* istanbul ignore next */ []));
    //Function
    async _GetNavigation(selectedMenu) {
        const TREE = selectedMenu?.tree.filter(x => !Strings.Equals(x.id, 'GRID')) || [];
        if (TREE.length > 0) {
            this.menu.set([]);
            this.title.set(TREE[0].label);
            this.SetPageName(TREE[TREE.length - 1].label);
            const INDEX_MENU = Number(TREE[0].id.split('index')[1]);
            const MENU = navigationSIGNAL()[INDEX_MENU]?.Items || [];
            if (TREE.length > 1) {
                const INDEX_SUBMENU = Number(TREE[1].id.split('index')[1]);
                const SUBMENU = MENU[INDEX_SUBMENU]?.Items || [];
                this.menu.set(SUBMENU);
            }
            else
                Tools.Sleep().then(() => this.menu.set(MENU));
            await Tools.Sleep();
            if (this.menu().length <= 0) {
                this.GoToSource();
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: MenuPage, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: MenuPage, isStandalone: false, selector: "menu-page", usesInheritance: true, ngImport: i0, template: "<!-- Title -->\r\n<wia-page-title\r\n    [title]=\"title()\"\r\n    [breadcrumbs]=\"breadcrumbs()\"\r\n></wia-page-title> \r\n\r\n<nav>\r\n    @for(item of _pages(); let index = $index; track item.Id) {           \r\n        <a [routerLink]=\"_getPath(item)\" class=\"animation-fadeIn\">\r\n            @if(item?.ShowIndex) {\r\n                <span class=\"index\">{{ index + 1 }}</span>\r\n            }\r\n          \r\n            @else if((item?.Icon || '').length > 0) {\r\n                <i [class]=\"item!.Icon\"></i>\r\n            }\r\n            <span class=\"label\"> {{ item.Label }} </span>\r\n        </a> \r\n    }\r\n</nav>", styles: ["nav{display:flex!important;flex-wrap:wrap!important;margin:30px!important;gap:30px!important}nav a{display:flex!important;align-items:center!important;justify-content:center!important;flex-direction:column!important;flex-basis:150px!important;padding:10px!important;gap:10px!important;height:150px!important;max-height:150px!important;text-decoration:none!important;font-weight:700!important;border:2px ridge var(--sidenav)!important;border-radius:5px!important;color:var(--sidenav)!important;flex-grow:1!important;overflow:hidden!important}nav a i{font-size:35px!important}nav a span.index{max-width:20px!important;width:20px!important;text-align:center!important;background-color:var(--dark)!important;color:var(--light)!important;border-radius:5px!important;padding:5px!important}nav a span.label{text-align:center!important}nav a:not(.menu):hover{box-shadow:0 0 15px -4px var(--navigation)!important;border-color:var(--navigation)!important;color:var(--navigation)!important;background-color:var(--containers)!important}@media(min-width:0px)and (max-width:499px){nav{margin:20px!important;gap:10px!important}nav a{justify-content:flex-start!important;flex-direction:row!important;flex-basis:100%!important;flex-grow:0!important;height:26px!important;max-height:26px!important;white-space:nowrap!important}nav a i{font-size:20px!important;min-width:20px!important}nav a span.label{width:calc(100% - 20px);overflow:hidden!important;text-overflow:ellipsis!important;justify-content:flex-start!important;display:flex!important}}\n"], dependencies: [{ kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i3.WIAPageTitle, selector: "wia-page-title", inputs: ["title", "showBreadcrumbs", "breadcrumbs", "goBack", "information"], outputs: ["onClickInformation", "onClickGoBack"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: MenuPage, decorators: [{
            type: Component,
            args: [{ selector: 'menu-page', standalone: false, template: "<!-- Title -->\r\n<wia-page-title\r\n    [title]=\"title()\"\r\n    [breadcrumbs]=\"breadcrumbs()\"\r\n></wia-page-title> \r\n\r\n<nav>\r\n    @for(item of _pages(); let index = $index; track item.Id) {           \r\n        <a [routerLink]=\"_getPath(item)\" class=\"animation-fadeIn\">\r\n            @if(item?.ShowIndex) {\r\n                <span class=\"index\">{{ index + 1 }}</span>\r\n            }\r\n          \r\n            @else if((item?.Icon || '').length > 0) {\r\n                <i [class]=\"item!.Icon\"></i>\r\n            }\r\n            <span class=\"label\"> {{ item.Label }} </span>\r\n        </a> \r\n    }\r\n</nav>", styles: ["nav{display:flex!important;flex-wrap:wrap!important;margin:30px!important;gap:30px!important}nav a{display:flex!important;align-items:center!important;justify-content:center!important;flex-direction:column!important;flex-basis:150px!important;padding:10px!important;gap:10px!important;height:150px!important;max-height:150px!important;text-decoration:none!important;font-weight:700!important;border:2px ridge var(--sidenav)!important;border-radius:5px!important;color:var(--sidenav)!important;flex-grow:1!important;overflow:hidden!important}nav a i{font-size:35px!important}nav a span.index{max-width:20px!important;width:20px!important;text-align:center!important;background-color:var(--dark)!important;color:var(--light)!important;border-radius:5px!important;padding:5px!important}nav a span.label{text-align:center!important}nav a:not(.menu):hover{box-shadow:0 0 15px -4px var(--navigation)!important;border-color:var(--navigation)!important;color:var(--navigation)!important;background-color:var(--containers)!important}@media(min-width:0px)and (max-width:499px){nav{margin:20px!important;gap:10px!important}nav a{justify-content:flex-start!important;flex-direction:row!important;flex-basis:100%!important;flex-grow:0!important;height:26px!important;max-height:26px!important;white-space:nowrap!important}nav a i{font-size:20px!important;min-width:20px!important}nav a span.label{width:calc(100% - 20px);overflow:hidden!important;text-overflow:ellipsis!important;justify-content:flex-start!important;display:flex!important}}\n"] }]
        }], ctorParameters: () => [] });

class LoginPage {
    //Inject
    formBulder = inject(FormBuilder);
    //Elements
    _form = viewChild.required('form');
    _inputUser = viewChild.required('userRef');
    _inputPassword = viewChild.required('passwordRef');
    _loginButton = viewChild.required('loginRef');
    //Variables
    title = appSettings?.appInfo?.title || '';
    isLoading = isLoadingSIGNAL;
    background = '';
    view = signal('LOGIN', ...(ngDevMode ? [{ debugName: "view" }] : /* istanbul ignore next */ []));
    //form
    formGroup = this.formBulder.group({
        user: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });
    //Outputs 
    onLogin = output();
    onRecoveryPassword = output();
    constructor() {
        if (Tools.IsNotOnlyWhiteSpace(appSettings?.background?.login))
            this.background = appSettings?.background?.login;
    }
    async ngAfterViewInit() {
        await Tools.Sleep();
        if (this._form().GetControlValue('user', '').length < 6)
            this.FocusUser();
        else
            this.FocusPassword();
    }
    //Computed
    _icon = computed(() => {
        switch (environmentSIGNAL().info) {
            case 'DEVELOPMENT': return 'iw-developer-fill';
            case 'STAGING': return 'iw-quality-fill';
        }
        return '';
    }, ...(ngDevMode ? [{ debugName: "_icon" }] : /* istanbul ignore next */ []));
    //Function
    _Toggle() {
        if (this.view() === 'LOGIN')
            this.Show('RECOVERY');
        else
            this.Show('LOGIN');
    }
    //Function
    _Click() {
        this.isLoading.set(true);
        const { user, password } = this._form().GetValue();
        if (this.view() === 'LOGIN') {
            this.onLogin.emit({ User: user, Password: password });
        }
        else {
            this.onRecoveryPassword.emit(user);
        }
    }
    //Function
    _ShowButton = () => {
        return (this.view() === 'LOGIN' && this._form().IsValid())
            || (this.view() === 'RECOVERY' && this._form().IsValidControl('user'));
    };
    /** */
    Show(view) {
        this.view.set(view);
        Tools.Sleep().then(_ => {
            if (view === 'RECOVERY') {
                if (this._form().IsValidControl('user'))
                    this._loginButton().Focus();
                else
                    this.FocusUser();
            }
            else if (view === 'LOGIN') {
                if (this._form().IsValidControl('user'))
                    this.FocusPassword(true);
                else
                    this.FocusUser();
            }
        });
    }
    /** */
    FocusUser() {
        Tools.Sleep(200).then(() => this._inputUser().Focus());
    }
    /** */
    FocusPassword(select = false) {
        Tools.Sleep(200).then(() => this._inputPassword().Focus(select));
    }
    /** */
    SetUser(user) {
        this._form().SetControlValue('user', user);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: LoginPage, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: LoginPage, isStandalone: false, selector: "login", outputs: { onLogin: "onLogin", onRecoveryPassword: "onRecoveryPassword" }, viewQueries: [{ propertyName: "_form", first: true, predicate: ["form"], descendants: true, isSignal: true }, { propertyName: "_inputUser", first: true, predicate: ["userRef"], descendants: true, isSignal: true }, { propertyName: "_inputPassword", first: true, predicate: ["passwordRef"], descendants: true, isSignal: true }, { propertyName: "_loginButton", first: true, predicate: ["loginRef"], descendants: true, isSignal: true }], ngImport: i0, template: "<main>\r\n    <div class=\"login-container\">\r\n        <h1>\r\n            {{ title }}\r\n            @if(_icon().length > 0) {\r\n                <i [class]=\"_icon()\"></i> \r\n            }\r\n        </h1>\r\n\r\n        <section class=\"form\"> \r\n            <wia-form #form [formGroup]=\"formGroup\" [controls]=\"[userRef, passwordRef]\" [isLoading]=\"isLoading()\">\r\n                <!-- user -->\r\n                <wia-textbox\r\n                    #userRef\r\n                    [label]=\"(view() === 'LOGIN' ? 'User' : 'User / Email')\"\r\n                    formControlName=\"user\"\r\n                    [isLoading]=\"isLoading()\"\r\n                    [isInvalid]=\"form.IsInvalidControl('user')\"\r\n                    marginTop=\"35px\"\r\n                    (onKeyupEnter)=\"(view() === 'RECOVERY' ? loginRef.Click() : passwordRef.Focus())\"\r\n                ></wia-textbox>\r\n\r\n                <!-- password -->\r\n                <wia-secretbox\r\n                    #passwordRef\r\n                    label=\"Password\"\r\n                    formControlName=\"password\"\r\n                    [isLoading]=\"isLoading()\"\r\n                    marginTop=\"35px\"\r\n                    [isInvisible]=\"view() === 'RECOVERY'\"\r\n                    (onKeyupEnter)=\"loginRef.Click()\" \r\n                ></wia-secretbox>\r\n\r\n                <!-- Login -->\r\n                <wia-button\r\n                    #loginRef\r\n                    [label]=\"(view() === 'LOGIN' ? 'Login' : 'Recovery')\"\r\n                    width=\"100%\"\r\n                    marginTop=\"35px\"\r\n                    [isLoading]=\"isLoading()\"\r\n                    [isInvisible]=\"!_ShowButton()\"\r\n                    (onClick)=\"_Click()\"\r\n                ></wia-button>\r\n            </wia-form>  \r\n        </section>\r\n\r\n        @if(!isLoading()) {\r\n            <section class=\"options\" (click)=\"_Toggle()\">\r\n                {{ (view() === 'LOGIN' ? 'Recovery' : 'Back') }}\r\n            </section>\r\n        }\r\n    </div>  \r\n\r\n    <!-- background -->\r\n    @if(background.length <= 0) {\r\n        <div class=\"login-background\"></div>\r\n    }\r\n\r\n    @else if (background.toLowerCase().endsWith('.png') || background.toLowerCase().endsWith('.jpeg') || background.toLowerCase().endsWith('.jpg')) {\r\n        <div class=\"login-background-image\" [ngStyle]=\"{ backgroundImage: `url('${background}')` }\"></div>\r\n    }\r\n\r\n    @else if (background.toLowerCase().endsWith('.mp4')) {\r\n        <video autoplay loop muted playsinline>\r\n            <source [src]=\"background\" type=\"video/mp4\" />\r\n        </video>\r\n    }\r\n</main>", styles: ["main{width:100vw!important;height:100vh!important;display:flex!important;align-items:center!important;justify-content:center!important}main div.login-container{background-color:color-mix(in srgb,var(--body),transparent 70%)!important;width:100%!important;max-width:350px!important;margin:0 15px!important;border-radius:25px!important;padding:35px!important;z-index:1!important}main div.login-container h1{text-align:center!important;font-weight:700!important;color:var(--dark)!important}main div.login-container h1 i{font-size:35px!important}main div.login-container section.options{position:absolute!important;transform:translateY(40px)!important;color:color-mix(in srgb,var(--body),transparent 70%)!important;-webkit-user-select:none!important;user-select:none!important;cursor:pointer!important}main div.login-container:hover{background-color:var(--smoke)!important;box-shadow:0 0 15px 1px var(--primary)!important}main div.login-container:hover h1{color:var(--primary)!important}main div.login-container:hover section.options{color:var(--light)!important;font-weight:700!important;text-decoration:underline}main video,main div.login-background,main div.login-background-image{width:100%!important;height:100%!important;position:absolute!important;background:radial-gradient(circle,var(--blue),var(--dark))}main div.login-background-image{background-size:contain!important;background-repeat:no-repeat!important;background-position:center!important}main video{object-fit:cover!important}@media(min-width:0)and (max-width:499px){main{align-items:flex-start!important}main div.login-container{margin:15px!important}}\n"], dependencies: [{ kind: "directive", type: i1$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],[formArray],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i3.WIAButton, selector: "wia-button", inputs: ["label", "type", "color", "icon", "path", "iconPosition", "isLoading", "isReadonly", "isInvisible", "isHidden", "breakpoints", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "marginTop", "marginRight", "marginBottom", "marginLeft"], outputs: ["onClick", "onDestroy", "onReady"] }, { kind: "component", type: i3.WIAForm, selector: "wia-form", inputs: ["formGroup", "controls", "isLoading", "isReadonly"], outputs: ["onDestroy", "onReady"] }, { kind: "component", type: i3.WIASecretBox, selector: "wia-secretbox", inputs: ["maxLength", "showSecret"] }, { kind: "component", type: i3.WIATextBox, selector: "wia-textbox", inputs: ["placeholder", "selectOnFocus", "textPosition", "minLength", "maxLength", "showClearButton", "showSearchButton", "externalButtons", "size", "width", "minWidth", "maxWidth"], outputs: ["onKeyupEnter", "onClickClear", "onClickSearch", "onClickLeft", "onClickRight"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: LoginPage, decorators: [{
            type: Component,
            args: [{ selector: 'login', standalone: false, template: "<main>\r\n    <div class=\"login-container\">\r\n        <h1>\r\n            {{ title }}\r\n            @if(_icon().length > 0) {\r\n                <i [class]=\"_icon()\"></i> \r\n            }\r\n        </h1>\r\n\r\n        <section class=\"form\"> \r\n            <wia-form #form [formGroup]=\"formGroup\" [controls]=\"[userRef, passwordRef]\" [isLoading]=\"isLoading()\">\r\n                <!-- user -->\r\n                <wia-textbox\r\n                    #userRef\r\n                    [label]=\"(view() === 'LOGIN' ? 'User' : 'User / Email')\"\r\n                    formControlName=\"user\"\r\n                    [isLoading]=\"isLoading()\"\r\n                    [isInvalid]=\"form.IsInvalidControl('user')\"\r\n                    marginTop=\"35px\"\r\n                    (onKeyupEnter)=\"(view() === 'RECOVERY' ? loginRef.Click() : passwordRef.Focus())\"\r\n                ></wia-textbox>\r\n\r\n                <!-- password -->\r\n                <wia-secretbox\r\n                    #passwordRef\r\n                    label=\"Password\"\r\n                    formControlName=\"password\"\r\n                    [isLoading]=\"isLoading()\"\r\n                    marginTop=\"35px\"\r\n                    [isInvisible]=\"view() === 'RECOVERY'\"\r\n                    (onKeyupEnter)=\"loginRef.Click()\" \r\n                ></wia-secretbox>\r\n\r\n                <!-- Login -->\r\n                <wia-button\r\n                    #loginRef\r\n                    [label]=\"(view() === 'LOGIN' ? 'Login' : 'Recovery')\"\r\n                    width=\"100%\"\r\n                    marginTop=\"35px\"\r\n                    [isLoading]=\"isLoading()\"\r\n                    [isInvisible]=\"!_ShowButton()\"\r\n                    (onClick)=\"_Click()\"\r\n                ></wia-button>\r\n            </wia-form>  \r\n        </section>\r\n\r\n        @if(!isLoading()) {\r\n            <section class=\"options\" (click)=\"_Toggle()\">\r\n                {{ (view() === 'LOGIN' ? 'Recovery' : 'Back') }}\r\n            </section>\r\n        }\r\n    </div>  \r\n\r\n    <!-- background -->\r\n    @if(background.length <= 0) {\r\n        <div class=\"login-background\"></div>\r\n    }\r\n\r\n    @else if (background.toLowerCase().endsWith('.png') || background.toLowerCase().endsWith('.jpeg') || background.toLowerCase().endsWith('.jpg')) {\r\n        <div class=\"login-background-image\" [ngStyle]=\"{ backgroundImage: `url('${background}')` }\"></div>\r\n    }\r\n\r\n    @else if (background.toLowerCase().endsWith('.mp4')) {\r\n        <video autoplay loop muted playsinline>\r\n            <source [src]=\"background\" type=\"video/mp4\" />\r\n        </video>\r\n    }\r\n</main>", styles: ["main{width:100vw!important;height:100vh!important;display:flex!important;align-items:center!important;justify-content:center!important}main div.login-container{background-color:color-mix(in srgb,var(--body),transparent 70%)!important;width:100%!important;max-width:350px!important;margin:0 15px!important;border-radius:25px!important;padding:35px!important;z-index:1!important}main div.login-container h1{text-align:center!important;font-weight:700!important;color:var(--dark)!important}main div.login-container h1 i{font-size:35px!important}main div.login-container section.options{position:absolute!important;transform:translateY(40px)!important;color:color-mix(in srgb,var(--body),transparent 70%)!important;-webkit-user-select:none!important;user-select:none!important;cursor:pointer!important}main div.login-container:hover{background-color:var(--smoke)!important;box-shadow:0 0 15px 1px var(--primary)!important}main div.login-container:hover h1{color:var(--primary)!important}main div.login-container:hover section.options{color:var(--light)!important;font-weight:700!important;text-decoration:underline}main video,main div.login-background,main div.login-background-image{width:100%!important;height:100%!important;position:absolute!important;background:radial-gradient(circle,var(--blue),var(--dark))}main div.login-background-image{background-size:contain!important;background-repeat:no-repeat!important;background-position:center!important}main video{object-fit:cover!important}@media(min-width:0)and (max-width:499px){main{align-items:flex-start!important}main div.login-container{margin:15px!important}}\n"] }]
        }], ctorParameters: () => [], propDecorators: { _form: [{ type: i0.ViewChild, args: ['form', { isSignal: true }] }], _inputUser: [{ type: i0.ViewChild, args: ['userRef', { isSignal: true }] }], _inputPassword: [{ type: i0.ViewChild, args: ['passwordRef', { isSignal: true }] }], _loginButton: [{ type: i0.ViewChild, args: ['loginRef', { isSignal: true }] }], onLogin: [{ type: i0.Output, args: ["onLogin"] }], onRecoveryPassword: [{ type: i0.Output, args: ["onRecoveryPassword"] }] } });

class SidenavAccordion {
    //Variables 
    _isCollapsed = signal(true, ...(ngDevMode ? [{ debugName: "_isCollapsed" }] : /* istanbul ignore next */ []));
    IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    _htmlElement;
    //Output
    onOpen = output();
    onClose = output();
    onDestroy = output();
    onReady = output();
    //input 
    id = input.required(...(ngDevMode ? [{ debugName: "id" }] : /* istanbul ignore next */ []));
    title = input.required(...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    icon = input.required(...(ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []));
    level = input.required(...(ngDevMode ? [{ debugName: "level" }] : /* istanbul ignore next */ []));
    showIndicator = input.required(...(ngDevMode ? [{ debugName: "showIndicator" }] : /* istanbul ignore next */ []));
    showIndex = input.required(...(ngDevMode ? [{ debugName: "showIndex" }] : /* istanbul ignore next */ []));
    showSidenav = input.required(...(ngDevMode ? [{ debugName: "showSidenav" }] : /* istanbul ignore next */ []));
    async ngAfterViewInit() {
        await Tools.Sleep();
        this._htmlElement = HTMLElements.SelectElementById(this.id());
        this.onReady?.emit();
    }
    ngOnDestroy() {
        this.onReady = null;
        this.onDestroy.emit();
    }
    //Computed
    isCollapsed = computed(() => this._isCollapsed(), ...(ngDevMode ? [{ debugName: "isCollapsed" }] : /* istanbul ignore next */ []));
    //Computed
    _paddingLeft = computed(() => this.level() === 'lv1' ? '10px' : '40px', ...(ngDevMode ? [{ debugName: "_paddingLeft" }] : /* istanbul ignore next */ []));
    //Function
    _Toggle = () => {
        if (!this.showSidenav())
            return;
        if (this._isCollapsed())
            this.Open();
        else
            this.Close();
    };
    /** */
    Open() {
        this._isCollapsed.set(false);
        Tools.Sleep().then(() => {
            HTMLElements.ScrollToElement(this._htmlElement);
            this.onOpen.emit();
        });
    }
    /** */
    Close() {
        this._isCollapsed.set(true);
        Tools.Sleep().then(() => this.onClose.emit());
    }
    /** */
    ScrollToElement() {
        HTMLElements.ScrollToElement(this._htmlElement, 'start');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: SidenavAccordion, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: SidenavAccordion, isStandalone: false, selector: "coer-sidenav-accordion", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: true, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: true, transformFunction: null }, level: { classPropertyName: "level", publicName: "level", isSignal: true, isRequired: true, transformFunction: null }, showIndicator: { classPropertyName: "showIndicator", publicName: "showIndicator", isSignal: true, isRequired: true, transformFunction: null }, showIndex: { classPropertyName: "showIndex", publicName: "showIndex", isSignal: true, isRequired: true, transformFunction: null }, showSidenav: { classPropertyName: "showSidenav", publicName: "showSidenav", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { onOpen: "onOpen", onClose: "onClose", onDestroy: "onDestroy", onReady: "onReady" }, ngImport: i0, template: "<div title=\"\">    \r\n    <div [id]=\"id()\" (click)=\"_Toggle()\"\r\n        [ngClass]=\"{\r\n            'accordion-header': true, \r\n            'expanded-lv1': (!isCollapsed() && level() === 'lv1'),\r\n            'expanded-lv2': (!isCollapsed() && level() === 'lv2')\r\n        }\"> \r\n\r\n        <h4 [ngStyle]=\"{ paddingLeft: _paddingLeft() }\">\r\n            @if(showIndex() > 0) {\r\n                <span class=\"index\">{{ showIndex() }}</span>\r\n            }\r\n\r\n\r\n            @else if(IsNotOnlyWhiteSpace(icon())) {\r\n                <i [class]=\"icon()\"></i>\r\n            }\r\n\r\n            @else if(!showSidenav()) {\r\n                <i class='iw-menu'></i>\r\n            }\r\n\r\n            <span>{{ title() || '' }}</span>\r\n        </h4>\r\n      \r\n        @if(showSidenav()) {\r\n            <button type=\"button\" [ngClass]=\"{ 'invisible': !showIndicator() }\">\r\n                <i class=\"iw-angle\" [class]=\"_isCollapsed() ? 'iw-270deg' : 'iw-90deg'\"></i> \r\n            </button>\r\n        }\r\n    </div>\r\n    \r\n    <div class=\"accordion-body\"\r\n        [ngStyle]=\"{ \r\n            'overflow'   : (_isCollapsed() ? 'hidden' : 'auto'),\r\n            'max-height' : (_isCollapsed() ? '0px'    : '')\r\n        }\"> \r\n        <div [ngClass]=\"{ 'display-none': _isCollapsed() }\">\r\n            <ng-content></ng-content>               \r\n        </div> \r\n    </div>   \r\n</div>   ", styles: ["div{overflow:hidden!important}div div.accordion-header{height:calc(var(--sidenav-item-height) - .8px)!important;display:flex!important;align-items:center!important;justify-content:space-between!important;transition:border-radius .3s ease-in-out!important;border-bottom:1px solid color-mix(in srgb,var(--body),var(--sidenav) 90%)!important;transition:all .3s ease-in-out!important;-webkit-user-select:none!important;user-select:none!important;background-color:var(--sidenav)}div div.accordion-header h4{display:inherit!important;align-items:inherit!important;gap:15px!important;white-space:nowrap!important;width:calc(100% - 35px)!important;cursor:inherit!important}div div.accordion-header h4 i{min-width:16px!important}div div.accordion-header h4 span{overflow:hidden!important;max-width:calc(100% - 20px)!important}div div.accordion-header h4 span.index{width:16px!important;text-align:center!important}div div.accordion-header button{padding:0 3px 0 0!important;border:none!important;cursor:inherit!important;background-color:transparent;color:inherit}div div.accordion-header button i{font-size:30px!important;transition:transform .3s ease-in-out!important}div div.accordion-header:hover{background-color:color-mix(in srgb,var(--body),var(--sidenav) 90%)!important}div div.accordion-header.selected{color:var(--navigation)!important}div div.accordion-header.expanded-lv1{background-color:var(--navigation)!important;color:var(--inherit)!important}div div.accordion-header.expanded-lv2{color:var(--navigation)!important}div div.accordion-body{background-color:var(--sidenav)!important;transition:all .3s ease-in-out}\n"], dependencies: [{ kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: SidenavAccordion, decorators: [{
            type: Component,
            args: [{ selector: 'coer-sidenav-accordion', standalone: false, template: "<div title=\"\">    \r\n    <div [id]=\"id()\" (click)=\"_Toggle()\"\r\n        [ngClass]=\"{\r\n            'accordion-header': true, \r\n            'expanded-lv1': (!isCollapsed() && level() === 'lv1'),\r\n            'expanded-lv2': (!isCollapsed() && level() === 'lv2')\r\n        }\"> \r\n\r\n        <h4 [ngStyle]=\"{ paddingLeft: _paddingLeft() }\">\r\n            @if(showIndex() > 0) {\r\n                <span class=\"index\">{{ showIndex() }}</span>\r\n            }\r\n\r\n\r\n            @else if(IsNotOnlyWhiteSpace(icon())) {\r\n                <i [class]=\"icon()\"></i>\r\n            }\r\n\r\n            @else if(!showSidenav()) {\r\n                <i class='iw-menu'></i>\r\n            }\r\n\r\n            <span>{{ title() || '' }}</span>\r\n        </h4>\r\n      \r\n        @if(showSidenav()) {\r\n            <button type=\"button\" [ngClass]=\"{ 'invisible': !showIndicator() }\">\r\n                <i class=\"iw-angle\" [class]=\"_isCollapsed() ? 'iw-270deg' : 'iw-90deg'\"></i> \r\n            </button>\r\n        }\r\n    </div>\r\n    \r\n    <div class=\"accordion-body\"\r\n        [ngStyle]=\"{ \r\n            'overflow'   : (_isCollapsed() ? 'hidden' : 'auto'),\r\n            'max-height' : (_isCollapsed() ? '0px'    : '')\r\n        }\"> \r\n        <div [ngClass]=\"{ 'display-none': _isCollapsed() }\">\r\n            <ng-content></ng-content>               \r\n        </div> \r\n    </div>   \r\n</div>   ", styles: ["div{overflow:hidden!important}div div.accordion-header{height:calc(var(--sidenav-item-height) - .8px)!important;display:flex!important;align-items:center!important;justify-content:space-between!important;transition:border-radius .3s ease-in-out!important;border-bottom:1px solid color-mix(in srgb,var(--body),var(--sidenav) 90%)!important;transition:all .3s ease-in-out!important;-webkit-user-select:none!important;user-select:none!important;background-color:var(--sidenav)}div div.accordion-header h4{display:inherit!important;align-items:inherit!important;gap:15px!important;white-space:nowrap!important;width:calc(100% - 35px)!important;cursor:inherit!important}div div.accordion-header h4 i{min-width:16px!important}div div.accordion-header h4 span{overflow:hidden!important;max-width:calc(100% - 20px)!important}div div.accordion-header h4 span.index{width:16px!important;text-align:center!important}div div.accordion-header button{padding:0 3px 0 0!important;border:none!important;cursor:inherit!important;background-color:transparent;color:inherit}div div.accordion-header button i{font-size:30px!important;transition:transform .3s ease-in-out!important}div div.accordion-header:hover{background-color:color-mix(in srgb,var(--body),var(--sidenav) 90%)!important}div div.accordion-header.selected{color:var(--navigation)!important}div div.accordion-header.expanded-lv1{background-color:var(--navigation)!important;color:var(--inherit)!important}div div.accordion-header.expanded-lv2{color:var(--navigation)!important}div div.accordion-body{background-color:var(--sidenav)!important;transition:all .3s ease-in-out}\n"] }]
        }], propDecorators: { onOpen: [{ type: i0.Output, args: ["onOpen"] }], onClose: [{ type: i0.Output, args: ["onClose"] }], onDestroy: [{ type: i0.Output, args: ["onDestroy"] }], onReady: [{ type: i0.Output, args: ["onReady"] }], id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: true }] }], level: [{ type: i0.Input, args: [{ isSignal: true, alias: "level", required: true }] }], showIndicator: [{ type: i0.Input, args: [{ isSignal: true, alias: "showIndicator", required: true }] }], showIndex: [{ type: i0.Input, args: [{ isSignal: true, alias: "showIndex", required: true }] }], showSidenav: [{ type: i0.Input, args: [{ isSignal: true, alias: "showSidenav", required: true }] }] } });

class Sidenav {
    //Elements 
    _menuList = viewChildren(SidenavAccordion, ...(ngDevMode ? [{ debugName: "_menuList" }] : /* istanbul ignore next */ []));
    //Injections
    _router = inject(Router);
    //Variables    
    show = signal(true, ...(ngDevMode ? [{ debugName: "show" }] : /* istanbul ignore next */ []));
    _navigation = navigationSIGNAL;
    _isLoading = isLoadingSIGNAL;
    SetId = Collections.SetId;
    IsBooleanFalse = Tools.IsBooleanFalse;
    IsBooleanTrue = Tools.IsBooleanTrue;
    IsOnlyWhiteSpace = Tools.IsOnlyWhiteSpace;
    IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    //Inputs 
    navigation = input.required(...(ngDevMode ? [{ debugName: "navigation" }] : /* istanbul ignore next */ []));
    //Output 
    onOpen = output();
    onClose = output();
    constructor() {
        Screen.ClickBrowserButton.subscribe(url => this._ClickBrowserButton(url));
        effect(() => {
            const NAVIGATION = this.navigation();
            if (Tools.IsNotNull(NAVIGATION)) {
                const showHome = !Tools.IsBooleanFalse(appSettings?.navigation?.showHome);
                const NAVIGATION_HOME = showHome
                    ? [{ Id: 1, Label: 'Home', Icon: 'iw-home-door-fill', Path: '/home' }] : [];
                this._navigation.set([]
                    .concat(NAVIGATION_HOME)
                    .concat(NAVIGATION));
                Tools.Sleep().then(() => this._SetSelectedMenu());
            }
        });
        effect(() => {
            const breakpoint = screenSizeSIGNAL().breakpoint;
            if (breakpoint === 'xxl')
                this.Open();
            else
                this.Close();
        });
        this._router.events
            .pipe(filter(event => event instanceof ResolveEnd), map((event) => ({ requested: event.url, resolved: event.urlAfterRedirects })))
            .subscribe(url => {
            if (url.requested != url.resolved) {
                this._ResetStorage();
                this._SetSelectedMenu();
            }
        });
    }
    //Computed
    _width = computed(() => {
        return this.show()
            ? 'width-sidenav'
            : (['xl', 'xxl'].includes(screenSizeSIGNAL().breakpoint) ? 'width-40px cursor-pointer' : 'width-0px');
    }, ...(ngDevMode ? [{ debugName: "_width" }] : /* istanbul ignore next */ []));
    //Computed
    _SetId = (level) => {
        return [...level].map((item, index) => ({ ...item, id: (index + 1) }));
    };
    //Function
    async _SetSelectedMenu(path = null) {
        await Tools.Sleep();
        const NAVIGATION = this._navigation();
        if (NAVIGATION.length > 0) {
            const PATH = Tools.IsNotOnlyWhiteSpace(path) ? path : (appSettings?.navigation?.redirectTo || 'home');
            const SELECTED_MENU = Navigation.GetSelectedMenu() || this._GetSelectedMenuByPath(PATH);
            if (SELECTED_MENU) {
                if (document.location.href.endsWith('/')) {
                    this._router.navigateByUrl(SELECTED_MENU.menu?.Path || PATH);
                    await Tools.Sleep();
                }
                this._NavigateTo(SELECTED_MENU, false);
            }
        }
    }
    //Function
    _GetSelectedMenuByPath = (path) => {
        if (!path.startsWith('/'))
            path = `/${path}`;
        const NAVIGATION = this._navigation();
        if (NAVIGATION.length > 0) {
            let id = this._IdGenerated(1, 0, 0, 0);
            let menu = { ...NAVIGATION[0] };
            let level = 'LV1';
            let action = 'NONE';
            let tree = [{ id, label: NAVIGATION[0]?.Label, icon: NAVIGATION[0]?.Icon }];
            const selector = `.${path?.replaceAll('/', '__')}`;
            const ELEMENT = HTMLElements.SelectElement(selector);
            if (ELEMENT) {
                const ELEMENT_ID = ELEMENT.getAttribute('id');
                if (ELEMENT_ID) {
                    id = ELEMENT_ID;
                    const GET_FATHER = (ELEMENT) => {
                        if (ELEMENT) {
                            let times = 10;
                            let FATHER = HTMLElements.GetFather(ELEMENT);
                            do {
                                if (FATHER && HTMLElements.HasClass(FATHER, 'accordion-body')) {
                                    return HTMLElements.GetChildren(HTMLElements.GetFather(FATHER)).find(x => HTMLElements.HasClass(x, 'accordion-header')) || null;
                                }
                                else if (FATHER) {
                                    FATHER = HTMLElements.GetFather(FATHER);
                                    times--;
                                }
                                else
                                    break;
                            } while (times > 0);
                        }
                        return null;
                    };
                    //GET LEVEL
                    let [LV1, LV2, LV3] = ELEMENT_ID.split('-');
                    LV1 = LV1.split('id')[1];
                    LV2 = LV2.split('id')[1];
                    LV3 = LV3.split('id')[1];
                    if (Number(LV3) > 0) {
                        level = 'LV3';
                        const SELECTED_MENU_LV1 = NAVIGATION
                            .filter(x => x.Items && x.Items.length > 0)
                            .find(x => x.Items.some(x => x.Items?.some(x => x.Path === path)));
                        const SELECTED_MENU_LV2 = NAVIGATION
                            .filter(x => x.Items && x.Items.length > 0).flatMap(x => x.Items)
                            .find(x => x.Items.some(x => x.Path === path));
                        const SELECTED_MENU_LV3 = NAVIGATION
                            .filter(x => x.Items && x.Items.length > 0).flatMap(x => x.Items)
                            .filter(x => x && x.Items && x.Items.length > 0).flatMap(x => x.Items)
                            .find(x => x.Path === path);
                        const ID_LV3 = ELEMENT_ID;
                        const ELEMENT_LV2 = GET_FATHER(ELEMENT);
                        const ID_LV2 = ELEMENT_LV2?.getAttribute('id');
                        const ELEMENT_LV1 = GET_FATHER(ELEMENT_LV2);
                        const ID_LV1 = ELEMENT_LV1?.getAttribute('id');
                        if (SELECTED_MENU_LV1 && SELECTED_MENU_LV2 && SELECTED_MENU_LV3 && ID_LV1 && ID_LV2 && ID_LV3) {
                            menu = { id: ID_LV3, label: SELECTED_MENU_LV3.Label, icon: SELECTED_MENU_LV3.Icon, path: SELECTED_MENU_LV3.Path };
                            tree = [
                                { id: ID_LV1, label: SELECTED_MENU_LV1.Label, icon: SELECTED_MENU_LV1?.Icon },
                                { id: ID_LV2, label: SELECTED_MENU_LV2.Label, icon: SELECTED_MENU_LV2?.Icon },
                                { id: ID_LV3, label: SELECTED_MENU_LV3.Label, icon: SELECTED_MENU_LV3?.Icon }
                            ];
                        }
                    }
                    else if (Number(LV2) > 0) {
                        level = 'LV2';
                        const SELECTED_MENU_LV1 = NAVIGATION
                            .filter(x => x.Items && x.Items.length > 0)
                            .find(x => x.Items.some(x => x.Items?.some(x => x.Path === path)));
                        const SELECTED_MENU_LV2 = NAVIGATION
                            .filter(x => x.Items && x.Items.length > 0).flatMap(x => x.Items)
                            .find(x => x.Path === path);
                        const ID_LV2 = ELEMENT_ID;
                        const ELEMENT_LV1 = GET_FATHER(ELEMENT);
                        const ID_LV1 = ELEMENT_LV1?.getAttribute('id');
                        if (SELECTED_MENU_LV1 && SELECTED_MENU_LV2 && ID_LV1 && ID_LV2) {
                            menu = { id: ID_LV2, label: SELECTED_MENU_LV2.Label, icon: SELECTED_MENU_LV2.Icon, path: SELECTED_MENU_LV2.Path };
                            tree = [
                                { id: ID_LV1, label: SELECTED_MENU_LV1.Label, icon: SELECTED_MENU_LV1?.Icon },
                                { id: ID_LV2, label: SELECTED_MENU_LV2.Label, icon: SELECTED_MENU_LV2?.Icon }
                            ];
                        }
                    }
                    else {
                        level = 'LV1';
                        const SELECTED_MENU = NAVIGATION.find(x => x.Path === path);
                        if (SELECTED_MENU) {
                            menu = { id: ELEMENT_ID, label: SELECTED_MENU.Label, icon: SELECTED_MENU.Icon, path: SELECTED_MENU.Path };
                            tree = [{ id: ELEMENT_ID, label: SELECTED_MENU.Label, icon: SELECTED_MENU?.Icon }];
                        }
                    }
                    ;
                }
            }
            return { id, menu, level, action, tree };
        }
        return null;
    };
    //Function
    _IdGenerated = (lv1, lv2, lv3, index) => {
        return `lv1id${lv1 || 0}-lv2id${lv2 || 0}-lv3id${lv3 || 0}-index${index || 0}`;
    };
    //Function
    _IsOption = (menu) => {
        return Tools.IsNull(menu?.Items);
    };
    //Function
    _IsMenu = (item) => {
        return Tools.IsNotNull(item?.Items) && Strings.Equals(item?.MenuType, 'LIST');
    };
    //Function
    _ClickOptionLv1(lv1, lv1Id) {
        if (!this.show())
            return;
        this._ResetStorage();
        this._NavigateTo({
            id: lv1Id,
            menu: { ...lv1 },
            level: 'LV1',
            action: 'NONE',
            tree: [
                { id: lv1Id, label: lv1.Label, icon: lv1?.Icon || '' }
            ]
        }, true);
    }
    //Function
    _ClickOptionLv2(lv2, lv1, lv2Id, lv1Id) {
        if (!this.show())
            return;
        this._ResetStorage();
        this._NavigateTo({
            id: lv2Id,
            menu: { ...lv2 },
            level: 'LV2',
            action: 'NONE',
            tree: [
                { id: lv1Id, label: lv1.Label, icon: lv1?.Icon || '' },
                { id: lv2Id, label: lv2.Label, icon: lv2?.Icon || '' }
            ]
        }, true);
    }
    //Function
    _ClickOptionLv3(lv3, lv2, lv1, lv3Id, lv2Id, lv1Id) {
        if (!this.show())
            return;
        this._ResetStorage();
        this._NavigateTo({
            id: lv3Id,
            menu: { ...lv3 },
            level: 'LV3',
            action: 'NONE',
            tree: [
                { id: lv1Id, label: lv1.Label, icon: lv1?.Icon || '' },
                { id: lv2Id, label: lv2.Label, icon: lv2?.Icon || '' },
                { id: lv3Id, label: lv3.Label, icon: lv3?.Icon || '' }
            ]
        }, true);
    }
    //Function
    _ClickMenu(lv1, action, lv1Id) {
        if (!this.show())
            return;
        if (action === 'OPEN') {
            this._NavigateTo({
                id: lv1Id,
                menu: { ...lv1 },
                level: 'LV1',
                action: action,
                tree: [
                    { id: lv1Id, label: lv1.Label, icon: lv1?.Icon || '' }
                ]
            }, false);
        }
    }
    //Function
    _ClickSubmenu(lv2, lv1, action, lv2Id, lv1Id) {
        if (!this.show())
            return;
        if (action === 'OPEN') {
            this._NavigateTo({
                id: lv2Id,
                menu: { ...lv2 },
                level: 'LV2',
                action: action,
                tree: [
                    { id: lv1Id, label: lv1.Label, icon: lv1?.Icon || '' },
                    { id: lv2Id, label: lv2.Label, icon: lv2?.Icon || '' }
                ]
            }, false);
        }
    }
    //Function
    _ClickMenuGrid(lv1, lv1Id) {
        if (!this.show())
            return;
        this._ResetStorage();
        this._NavigateTo({
            id: lv1Id,
            menu: { ...lv1 },
            level: 'LV1',
            action: 'GRID',
            tree: [
                { id: lv1Id, label: lv1.Label, icon: lv1?.Icon || '' }
            ]
        }, true);
    }
    //Function
    _ClickSubmenuGrid(lv2, lv1, lv2Id, lv1Id) {
        if (!this.show())
            return;
        this._ResetStorage();
        this._NavigateTo({
            id: lv1Id,
            menu: { ...lv2 },
            level: 'LV2',
            action: 'GRID',
            tree: [
                { id: lv1Id, label: lv1.Label, icon: lv1?.Icon || '' },
                { id: lv2Id, label: lv2.Label, icon: lv2?.Icon || '' }
            ]
        }, true);
    }
    //Function
    _NavigateTo(option, navigate) {
        const OPTION = { ...option };
        if (['NONE', 'GRID'].includes(OPTION.action)) {
            Tools.Sleep(0, 'update-menu-selected').then(() => {
                //Testing
                //navigate = (`${this._router.url}` == `${OPTION?.menu?.Path}`) ? navigate : true; 
                //console.log(OPTION)
                if (OPTION.action === 'GRID') {
                    if (!([...OPTION.tree].pop()?.id === 'GRID')) {
                        OPTION.tree.push({ id: 'GRID', label: 'Menu', icon: 'iw-grid' });
                    }
                    if (navigate)
                        this._router.navigateByUrl('/menu');
                }
                else {
                    if (navigate)
                        this._router.navigateByUrl(String(OPTION?.menu?.Path));
                }
                if (['mv', 'xs', 'sm', 'md'].includes(screenSizeSIGNAL().breakpoint)) {
                    this.Close();
                }
                OPTION.menu.Items = [];
                Navigation.SetSelectedMenu(OPTION);
                selectedMenuSIGNAL.set(OPTION);
                HTMLElements.ScrollToElement(OPTION.tree[0].id, 'start');
                document.querySelectorAll('.selected').forEach(item => item.classList.remove('selected'));
                OPTION.tree.forEach(({ id }) => HTMLElements.AddClass(`#${id}`, 'selected'));
                //Close Menus
                for (const accordion of this._menuList() || []) {
                    if (Strings.Equals(OPTION.level, 'LV1')) {
                        if (!accordion.isCollapsed())
                            accordion.Close();
                    }
                    else if (Strings.Equals(OPTION.level, 'LV2')) {
                        if (Strings.Equals(OPTION.tree[0].id, accordion.id()))
                            continue;
                        else
                            accordion.Close();
                    }
                }
            });
        }
        else {
            this._CloseMenus(OPTION);
        }
    }
    //Function
    _CloseMenus(option) {
        for (const accordion of this._menuList() || []) {
            if (option) {
                if (Strings.Equals(option.level, 'LV1')) {
                    if (Strings.Equals(accordion.id(), option.id)) {
                        accordion.ScrollToElement();
                        continue;
                    }
                    else if (!accordion.isCollapsed())
                        accordion.Close();
                }
                else if (Strings.Equals(option.level, 'LV2')) {
                    if (option.tree[0].id === accordion.id())
                        continue;
                    if (Strings.Equals(option.tree[1].id, accordion.id())) {
                        accordion.ScrollToElement();
                        continue;
                    }
                    if (!accordion.isCollapsed())
                        accordion.Close();
                }
            }
            else
                accordion.Close();
        }
    }
    //Function
    _ResetStorage() {
        const storage = (appSettings?.appInfo?.project).replaceAll(' ', '') || 'coer91';
        sessionStorage.removeItem(storage);
    }
    /** */
    Toggle() {
        if (this.show())
            this.Close();
        else
            this.Open();
    }
    /** */
    Open() {
        this.show.set(true);
        this.onOpen.emit();
    }
    /** */
    Close() {
        this.show.set(false);
        this._CloseMenus(null);
        this.onClose.emit();
    }
    //Function 
    async _ClickBrowserButton(url) {
        const fromPath = this._router.url;
        const toPath = url.split('#')[1];
        const source = SourcePage.Get()?.path;
        if (Tools.IsOnlyWhiteSpace(source)) {
            this._ResetStorage();
            this._SetSelectedMenu(toPath);
        }
        else {
            BreadcrumbsPage.RemoveByPath(fromPath);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: Sidenav, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: Sidenav, isStandalone: false, selector: "sidenav", inputs: { navigation: { classPropertyName: "navigation", publicName: "navigation", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { onOpen: "onOpen", onClose: "onClose" }, viewQueries: [{ propertyName: "_menuList", predicate: SidenavAccordion, descendants: true, isSignal: true }], ngImport: i0, template: "<nav [class]=\"_width()\" [ngClass]=\"{ 'display-none': _navigation().length <= 1 }\" (click)=\"show() ? null : Open()\">\r\n    <ul class=\"lv1\">\r\n        @if(_isLoading()) {\r\n            <li class=\"lv1\">\r\n                <div class=\"option loading-option lv1-option\">  \r\n                    <i  [ngStyle]=\"{ backgroundImage: `url('hwmx-angular/images/loading.gif')` }\"></i>\r\n                    <span> Loading </span>  \r\n                </div>\r\n            </li>\r\n        }\r\n\r\n        @for(lv1 of _SetId(_navigation()); let i1 = $index; track `${lv1.id}-${i1}`) {\r\n            <li class=\"lv1\" [ngClass]=\"{ 'display-none': _isLoading() }\">\r\n                @if(_IsOption(lv1)) {  \r\n                    <div [id]=\"_IdGenerated(lv1.id, 0, 0, i1)\" \r\n                        class=\"option lv1-option\" \r\n                        [class]=\"lv1.Path?.replaceAll('/', '__')\" \r\n                        (click)=\"_ClickOptionLv1(lv1, _IdGenerated(lv1.id, 0, 0, i1))\">\r\n                        \r\n                        @if(IsNotOnlyWhiteSpace(lv1.Icon)) {\r\n                            <i [class]=\"lv1.Icon\"></i>\r\n                        }\r\n\r\n                        @else if(!show()) {\r\n                            <i class='iw-circle-fill'></i>\r\n                        }\r\n\r\n                        <span>{{ lv1.Label }}</span>\r\n                    </div>\r\n                }\r\n\r\n                @else if(_IsMenu(lv1)) {                   \r\n                    <coer-sidenav-accordion \r\n                        level=\"lv1\"\r\n                        [icon]=\"lv1.Icon\" \r\n                        [title]=\"lv1.Label\" \r\n                        [showSidenav]=\"show()\"\r\n                        [showIndicator]=\"!IsBooleanFalse(lv1.ShowIndicator)\"\r\n                        [showIndex]=\"(IsBooleanTrue(lv1.ShowIndex) ? (i1 + 1) : 0)\"\r\n                        [id]=\"_IdGenerated(lv1.id, 0, 0, i1)\" \r\n                        (onOpen)=\"_ClickMenu(lv1, 'OPEN', _IdGenerated(lv1.id, 0, 0, i1))\">\r\n                        \r\n                        <ul class=\"lv2\"> \r\n                            @for(lv2 of _SetId(lv1.Items!); let i2 = $index; track `${lv2.id}-${i2}`) {\r\n                                <li class=\"lv2\">  \r\n                                    @if(_IsOption(lv2)) {\r\n                                        <div [id]=\"_IdGenerated(lv1.id, lv2.id, 0, i2)\" \r\n                                            class=\"option lv2-option\" \r\n                                            [class]=\"lv2.Path?.replaceAll('/', '__')\" \r\n                                            (click)=\"_ClickOptionLv2(lv2, lv1, _IdGenerated(lv1.id, lv2.id, 0, i2), _IdGenerated(lv1.id, 0, 0, i1))\">\r\n                                            \r\n                                            @if(lv2.ShowIndex) {\r\n                                                <span class=\"index\">{{ i2 + 1 }}</span>\r\n                                            }\r\n\r\n                                            @else if(IsNotOnlyWhiteSpace(lv2.Icon)) {\r\n                                                <i [class]=\"lv2.Icon\"></i>\r\n                                            }\r\n                                            <span>{{ lv2.Label }} </span>\r\n                                        </div>\r\n                                    }\r\n    \r\n                                    @else if(_IsMenu(lv2)) { \r\n                                        <coer-sidenav-accordion \r\n                                            level=\"lv2\"\r\n                                            [icon]=\"lv2.Icon\" \r\n                                            [title]=\"lv2.Label\"  \r\n                                            [showSidenav]=\"show()\"\r\n                                            [showIndicator]=\"!IsBooleanFalse(lv2.ShowIndicator)\"\r\n                                            [showIndex]=\"(IsBooleanTrue(lv2.ShowIndex) ? (i2 + 1) : 0)\"\r\n                                            [id]=\"_IdGenerated(lv1.id, lv2.id, 0, i2)\" \r\n                                            (onOpen)=\"_ClickSubmenu(lv2, lv1, 'OPEN', _IdGenerated(lv1.id, lv2.id, 0, i2), _IdGenerated(lv1.id, 0, 0, i1))\">\r\n                                            \r\n                                            <ul class=\"lv3\">\r\n                                                @for(lv3 of _SetId(lv2.Items!); let i3 = $index; track `${lv3.id}-${i3}`) {\r\n                                                    @if(_IsOption(lv3)) {\r\n                                                        <div [id]=\"_IdGenerated(lv1.id, lv2.id, lv3.id, i3)\" \r\n                                                            class=\"option lv3-option\" \r\n                                                            [class]=\"lv3.Path?.replaceAll('/', '__')\" \r\n                                                            (click)=\"_ClickOptionLv3(lv3, lv2, lv1, _IdGenerated(lv1.id, lv2.id, lv3.id, i3), _IdGenerated(lv1.id, lv2.id, 0, i2), _IdGenerated(lv1.id, 0, 0, i1))\">\r\n                                                            \r\n                                                            @if(lv3.ShowIndex) {\r\n                                                                <span class=\"index\">{{ i3 + 1 }}</span>\r\n                                                            }\r\n\r\n                                                            @else {\r\n                                                                <i [class]=\"IsNotOnlyWhiteSpace(lv3.Icon) ? lv3.Icon : 'width-16px'\"></i>\r\n                                                            }\r\n\r\n                                                            <span>{{ lv3.Label }}</span>\r\n                                                        </div>\r\n                                                    }\r\n                                                }\r\n                                            </ul>\r\n                                        </coer-sidenav-accordion>\r\n                                    }\r\n\r\n                                    @else { \r\n                                        <div [id]=\"_IdGenerated(lv1.id, lv2.id, 0, i2)\" \r\n                                            class=\"option lv2-option padding-right-10px\" \r\n                                            [class]=\"lv2.Path?.replaceAll('/', '__')\"\r\n                                            (click)=\"_ClickSubmenuGrid(lv2, lv1, _IdGenerated(lv1.id, lv2.id, 0, i2), _IdGenerated(lv1.id, 0, 0, i1))\">\r\n\r\n                                            @if(IsNotOnlyWhiteSpace(lv2.Icon)) {\r\n                                                <i [class]=\"lv2.Icon\"></i>\r\n                                            }\r\n\r\n                                            <div class=\"grid\"> \r\n                                                <span>{{ lv2.Label }}</span>\r\n                                                <i class=\"iw-grid\" [ngClass]=\"{ 'invisible': IsBooleanFalse(lv2.ShowIndicator) }\"></i>\r\n                                            </div> \r\n                                        </div>\r\n                                    }\r\n                                </li>\r\n                            }\r\n                        </ul>\r\n                    </coer-sidenav-accordion>\r\n                }\r\n\r\n                @else {\r\n                    <div [id]=\"_IdGenerated(lv1.id, 0, 0, i1)\" \r\n                        class=\"option lv1-option padding-right-10px\" \r\n                        [class]=\"lv1.Path\" \r\n                        (click)=\"_ClickMenuGrid(lv1, _IdGenerated(lv1.id, 0, 0, i1))\">\r\n                         \r\n                        @if(IsNotOnlyWhiteSpace(lv1.Icon)) {\r\n                            <i [class]=\"lv1.Icon\"></i>\r\n                        }\r\n\r\n                        <div class=\"grid\">  \r\n                            <span [ngClass]=\"{ \r\n                                'display-none': (!show() && IsOnlyWhiteSpace(lv1.Icon))  \r\n                            }\">{{ lv1.Label }}</span> \r\n                            <i class=\"iw-grid\" [ngClass]=\"{ 'invisible': IsBooleanFalse(lv1.ShowIndicator) }\"></i>\r\n                        </div> \r\n                    </div>\r\n                }\r\n            </li>\r\n        }\r\n    </ul>\r\n</nav> ", styles: ["nav{height:var(--main-screen-height)!important;overflow-x:hidden!important;overflow-y:auto!important;position:relative!important;z-index:var(--z-index-sidenav)!important;background-color:var(--sidenav)!important;transition:width .5s ease!important;width:0px}nav ul{padding:0!important;margin:0!important;background-color:inherit!important}nav ul li{background-color:inherit!important}nav ul li div.option{min-height:calc(var(--sidenav-item-height) - .8px)!important}nav ul li div.loading-option i{display:inline-block!important;min-width:30px!important;max-width:30px!important;min-height:30px!important;max-height:30px!important;border-radius:25px!important;background:transparent;background-size:cover!important;background-repeat:no-repeat!important;background-position:center!important}nav ul.lv1 li.lv1{cursor:pointer!important;color:var(--sidenav-item)}nav ul.lv1 li.lv1 div.lv1-option,nav ul.lv1 li.lv1 div.lv2-option,nav ul.lv1 li.lv1 div.lv3-option{height:calc(100% - .8px)!important;max-height:calc(100% - .8px)!important;padding-left:10px!important;display:flex!important;align-items:center!important;gap:15px!important;border-bottom:1px solid color-mix(in srgb,var(--body),var(--sidenav) 90%)!important;-webkit-user-select:none!important;user-select:none!important;background-color:inherit}nav ul.lv1 li.lv1 div.lv1-option i,nav ul.lv1 li.lv1 div.lv2-option i,nav ul.lv1 li.lv1 div.lv3-option i{width:16px!important;min-width:16px!important;max-width:16px!important;height:16px!important;min-height:16px!important;max-height:16px!important}nav ul.lv1 li.lv1 div.lv1-option span,nav ul.lv1 li.lv1 div.lv2-option span,nav ul.lv1 li.lv1 div.lv3-option span{white-space:nowrap!important;overflow:hidden!important;font-weight:700!important}nav ul.lv1 li.lv1 div.lv1-option span.index,nav ul.lv1 li.lv1 div.lv2-option span.index,nav ul.lv1 li.lv1 div.lv3-option span.index{text-align:center!important;width:16px!important;max-width:16px!important;overflow:visible!important}nav ul.lv1 li.lv1 div.lv1-option div.grid,nav ul.lv1 li.lv1 div.lv2-option div.grid,nav ul.lv1 li.lv1 div.lv3-option div.grid{width:100%!important;display:flex!important;align-items:center!important;justify-content:space-between!important}nav ul.lv1 li.lv1 div.lv1-option div.grid i,nav ul.lv1 li.lv1 div.lv2-option div.grid i,nav ul.lv1 li.lv1 div.lv3-option div.grid i{font-size:30px!important}nav ul.lv1 li.lv1 div.lv2-option{padding-left:40px!important}nav ul.lv1 li.lv1 div.lv3-option{padding-left:40px!important}nav ul.lv1 li.lv1 div.option.selected{color:var(--navigation)!important}nav ul.lv1 div.option:hover{background-color:color-mix(in srgb,var(--body),var(--sidenav) 90%)!important}nav.width-sidenav{width:var(--sidenav-width)}\n"], dependencies: [{ kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: SidenavAccordion, selector: "coer-sidenav-accordion", inputs: ["id", "title", "icon", "level", "showIndicator", "showIndex", "showSidenav"], outputs: ["onOpen", "onClose", "onDestroy", "onReady"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: Sidenav, decorators: [{
            type: Component,
            args: [{ selector: 'sidenav', standalone: false, template: "<nav [class]=\"_width()\" [ngClass]=\"{ 'display-none': _navigation().length <= 1 }\" (click)=\"show() ? null : Open()\">\r\n    <ul class=\"lv1\">\r\n        @if(_isLoading()) {\r\n            <li class=\"lv1\">\r\n                <div class=\"option loading-option lv1-option\">  \r\n                    <i  [ngStyle]=\"{ backgroundImage: `url('hwmx-angular/images/loading.gif')` }\"></i>\r\n                    <span> Loading </span>  \r\n                </div>\r\n            </li>\r\n        }\r\n\r\n        @for(lv1 of _SetId(_navigation()); let i1 = $index; track `${lv1.id}-${i1}`) {\r\n            <li class=\"lv1\" [ngClass]=\"{ 'display-none': _isLoading() }\">\r\n                @if(_IsOption(lv1)) {  \r\n                    <div [id]=\"_IdGenerated(lv1.id, 0, 0, i1)\" \r\n                        class=\"option lv1-option\" \r\n                        [class]=\"lv1.Path?.replaceAll('/', '__')\" \r\n                        (click)=\"_ClickOptionLv1(lv1, _IdGenerated(lv1.id, 0, 0, i1))\">\r\n                        \r\n                        @if(IsNotOnlyWhiteSpace(lv1.Icon)) {\r\n                            <i [class]=\"lv1.Icon\"></i>\r\n                        }\r\n\r\n                        @else if(!show()) {\r\n                            <i class='iw-circle-fill'></i>\r\n                        }\r\n\r\n                        <span>{{ lv1.Label }}</span>\r\n                    </div>\r\n                }\r\n\r\n                @else if(_IsMenu(lv1)) {                   \r\n                    <coer-sidenav-accordion \r\n                        level=\"lv1\"\r\n                        [icon]=\"lv1.Icon\" \r\n                        [title]=\"lv1.Label\" \r\n                        [showSidenav]=\"show()\"\r\n                        [showIndicator]=\"!IsBooleanFalse(lv1.ShowIndicator)\"\r\n                        [showIndex]=\"(IsBooleanTrue(lv1.ShowIndex) ? (i1 + 1) : 0)\"\r\n                        [id]=\"_IdGenerated(lv1.id, 0, 0, i1)\" \r\n                        (onOpen)=\"_ClickMenu(lv1, 'OPEN', _IdGenerated(lv1.id, 0, 0, i1))\">\r\n                        \r\n                        <ul class=\"lv2\"> \r\n                            @for(lv2 of _SetId(lv1.Items!); let i2 = $index; track `${lv2.id}-${i2}`) {\r\n                                <li class=\"lv2\">  \r\n                                    @if(_IsOption(lv2)) {\r\n                                        <div [id]=\"_IdGenerated(lv1.id, lv2.id, 0, i2)\" \r\n                                            class=\"option lv2-option\" \r\n                                            [class]=\"lv2.Path?.replaceAll('/', '__')\" \r\n                                            (click)=\"_ClickOptionLv2(lv2, lv1, _IdGenerated(lv1.id, lv2.id, 0, i2), _IdGenerated(lv1.id, 0, 0, i1))\">\r\n                                            \r\n                                            @if(lv2.ShowIndex) {\r\n                                                <span class=\"index\">{{ i2 + 1 }}</span>\r\n                                            }\r\n\r\n                                            @else if(IsNotOnlyWhiteSpace(lv2.Icon)) {\r\n                                                <i [class]=\"lv2.Icon\"></i>\r\n                                            }\r\n                                            <span>{{ lv2.Label }} </span>\r\n                                        </div>\r\n                                    }\r\n    \r\n                                    @else if(_IsMenu(lv2)) { \r\n                                        <coer-sidenav-accordion \r\n                                            level=\"lv2\"\r\n                                            [icon]=\"lv2.Icon\" \r\n                                            [title]=\"lv2.Label\"  \r\n                                            [showSidenav]=\"show()\"\r\n                                            [showIndicator]=\"!IsBooleanFalse(lv2.ShowIndicator)\"\r\n                                            [showIndex]=\"(IsBooleanTrue(lv2.ShowIndex) ? (i2 + 1) : 0)\"\r\n                                            [id]=\"_IdGenerated(lv1.id, lv2.id, 0, i2)\" \r\n                                            (onOpen)=\"_ClickSubmenu(lv2, lv1, 'OPEN', _IdGenerated(lv1.id, lv2.id, 0, i2), _IdGenerated(lv1.id, 0, 0, i1))\">\r\n                                            \r\n                                            <ul class=\"lv3\">\r\n                                                @for(lv3 of _SetId(lv2.Items!); let i3 = $index; track `${lv3.id}-${i3}`) {\r\n                                                    @if(_IsOption(lv3)) {\r\n                                                        <div [id]=\"_IdGenerated(lv1.id, lv2.id, lv3.id, i3)\" \r\n                                                            class=\"option lv3-option\" \r\n                                                            [class]=\"lv3.Path?.replaceAll('/', '__')\" \r\n                                                            (click)=\"_ClickOptionLv3(lv3, lv2, lv1, _IdGenerated(lv1.id, lv2.id, lv3.id, i3), _IdGenerated(lv1.id, lv2.id, 0, i2), _IdGenerated(lv1.id, 0, 0, i1))\">\r\n                                                            \r\n                                                            @if(lv3.ShowIndex) {\r\n                                                                <span class=\"index\">{{ i3 + 1 }}</span>\r\n                                                            }\r\n\r\n                                                            @else {\r\n                                                                <i [class]=\"IsNotOnlyWhiteSpace(lv3.Icon) ? lv3.Icon : 'width-16px'\"></i>\r\n                                                            }\r\n\r\n                                                            <span>{{ lv3.Label }}</span>\r\n                                                        </div>\r\n                                                    }\r\n                                                }\r\n                                            </ul>\r\n                                        </coer-sidenav-accordion>\r\n                                    }\r\n\r\n                                    @else { \r\n                                        <div [id]=\"_IdGenerated(lv1.id, lv2.id, 0, i2)\" \r\n                                            class=\"option lv2-option padding-right-10px\" \r\n                                            [class]=\"lv2.Path?.replaceAll('/', '__')\"\r\n                                            (click)=\"_ClickSubmenuGrid(lv2, lv1, _IdGenerated(lv1.id, lv2.id, 0, i2), _IdGenerated(lv1.id, 0, 0, i1))\">\r\n\r\n                                            @if(IsNotOnlyWhiteSpace(lv2.Icon)) {\r\n                                                <i [class]=\"lv2.Icon\"></i>\r\n                                            }\r\n\r\n                                            <div class=\"grid\"> \r\n                                                <span>{{ lv2.Label }}</span>\r\n                                                <i class=\"iw-grid\" [ngClass]=\"{ 'invisible': IsBooleanFalse(lv2.ShowIndicator) }\"></i>\r\n                                            </div> \r\n                                        </div>\r\n                                    }\r\n                                </li>\r\n                            }\r\n                        </ul>\r\n                    </coer-sidenav-accordion>\r\n                }\r\n\r\n                @else {\r\n                    <div [id]=\"_IdGenerated(lv1.id, 0, 0, i1)\" \r\n                        class=\"option lv1-option padding-right-10px\" \r\n                        [class]=\"lv1.Path\" \r\n                        (click)=\"_ClickMenuGrid(lv1, _IdGenerated(lv1.id, 0, 0, i1))\">\r\n                         \r\n                        @if(IsNotOnlyWhiteSpace(lv1.Icon)) {\r\n                            <i [class]=\"lv1.Icon\"></i>\r\n                        }\r\n\r\n                        <div class=\"grid\">  \r\n                            <span [ngClass]=\"{ \r\n                                'display-none': (!show() && IsOnlyWhiteSpace(lv1.Icon))  \r\n                            }\">{{ lv1.Label }}</span> \r\n                            <i class=\"iw-grid\" [ngClass]=\"{ 'invisible': IsBooleanFalse(lv1.ShowIndicator) }\"></i>\r\n                        </div> \r\n                    </div>\r\n                }\r\n            </li>\r\n        }\r\n    </ul>\r\n</nav> ", styles: ["nav{height:var(--main-screen-height)!important;overflow-x:hidden!important;overflow-y:auto!important;position:relative!important;z-index:var(--z-index-sidenav)!important;background-color:var(--sidenav)!important;transition:width .5s ease!important;width:0px}nav ul{padding:0!important;margin:0!important;background-color:inherit!important}nav ul li{background-color:inherit!important}nav ul li div.option{min-height:calc(var(--sidenav-item-height) - .8px)!important}nav ul li div.loading-option i{display:inline-block!important;min-width:30px!important;max-width:30px!important;min-height:30px!important;max-height:30px!important;border-radius:25px!important;background:transparent;background-size:cover!important;background-repeat:no-repeat!important;background-position:center!important}nav ul.lv1 li.lv1{cursor:pointer!important;color:var(--sidenav-item)}nav ul.lv1 li.lv1 div.lv1-option,nav ul.lv1 li.lv1 div.lv2-option,nav ul.lv1 li.lv1 div.lv3-option{height:calc(100% - .8px)!important;max-height:calc(100% - .8px)!important;padding-left:10px!important;display:flex!important;align-items:center!important;gap:15px!important;border-bottom:1px solid color-mix(in srgb,var(--body),var(--sidenav) 90%)!important;-webkit-user-select:none!important;user-select:none!important;background-color:inherit}nav ul.lv1 li.lv1 div.lv1-option i,nav ul.lv1 li.lv1 div.lv2-option i,nav ul.lv1 li.lv1 div.lv3-option i{width:16px!important;min-width:16px!important;max-width:16px!important;height:16px!important;min-height:16px!important;max-height:16px!important}nav ul.lv1 li.lv1 div.lv1-option span,nav ul.lv1 li.lv1 div.lv2-option span,nav ul.lv1 li.lv1 div.lv3-option span{white-space:nowrap!important;overflow:hidden!important;font-weight:700!important}nav ul.lv1 li.lv1 div.lv1-option span.index,nav ul.lv1 li.lv1 div.lv2-option span.index,nav ul.lv1 li.lv1 div.lv3-option span.index{text-align:center!important;width:16px!important;max-width:16px!important;overflow:visible!important}nav ul.lv1 li.lv1 div.lv1-option div.grid,nav ul.lv1 li.lv1 div.lv2-option div.grid,nav ul.lv1 li.lv1 div.lv3-option div.grid{width:100%!important;display:flex!important;align-items:center!important;justify-content:space-between!important}nav ul.lv1 li.lv1 div.lv1-option div.grid i,nav ul.lv1 li.lv1 div.lv2-option div.grid i,nav ul.lv1 li.lv1 div.lv3-option div.grid i{font-size:30px!important}nav ul.lv1 li.lv1 div.lv2-option{padding-left:40px!important}nav ul.lv1 li.lv1 div.lv3-option{padding-left:40px!important}nav ul.lv1 li.lv1 div.option.selected{color:var(--navigation)!important}nav ul.lv1 div.option:hover{background-color:color-mix(in srgb,var(--body),var(--sidenav) 90%)!important}nav.width-sidenav{width:var(--sidenav-width)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { _menuList: [{ type: i0.ViewChildren, args: [i0.forwardRef(() => SidenavAccordion), { isSignal: true }] }], navigation: [{ type: i0.Input, args: [{ isSignal: true, alias: "navigation", required: true }] }], onOpen: [{ type: i0.Output, args: ["onOpen"] }], onClose: [{ type: i0.Output, args: ["onClose"] }] } });

class Toolbar {
    //Elements
    _profileModal = viewChild('profileModal', ...(ngDevMode ? [{ debugName: "_profileModal" }] : /* istanbul ignore next */ []));
    _passwordModal = viewChild('passwordModal', ...(ngDevMode ? [{ debugName: "_passwordModal" }] : /* istanbul ignore next */ []));
    passwordRef = viewChild('passwordRef', ...(ngDevMode ? [{ debugName: "passwordRef" }] : /* istanbul ignore next */ []));
    confirmRef = viewChild('confirmRef', ...(ngDevMode ? [{ debugName: "confirmRef" }] : /* istanbul ignore next */ []));
    buttonRef = viewChild('buttonRef', ...(ngDevMode ? [{ debugName: "buttonRef" }] : /* istanbul ignore next */ []));
    //Variables 
    user = userSIGNAL;
    userImage = userImageSIGNAL;
    _isLoading = isLoadingSIGNAL;
    title = appSettings?.appInfo?.title;
    _isCollapsed = signal(true, ...(ngDevMode ? [{ debugName: "_isCollapsed" }] : /* istanbul ignore next */ []));
    _password = signal('', ...(ngDevMode ? [{ debugName: "_password" }] : /* istanbul ignore next */ []));
    _confirm = signal('', ...(ngDevMode ? [{ debugName: "_confirm" }] : /* istanbul ignore next */ []));
    _language = signal(null, ...(ngDevMode ? [{ debugName: "_language" }] : /* istanbul ignore next */ []));
    IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    //Inputs
    menu = input.required(...(ngDevMode ? [{ debugName: "menu" }] : /* istanbul ignore next */ []));
    showUserData = input.required(...(ngDevMode ? [{ debugName: "showUserData" }] : /* istanbul ignore next */ []));
    showProfileMenu = input.required(...(ngDevMode ? [{ debugName: "showProfileMenu" }] : /* istanbul ignore next */ []));
    preventProfileMenu = input.required(...(ngDevMode ? [{ debugName: "preventProfileMenu" }] : /* istanbul ignore next */ []));
    showPasswordMenu = input.required(...(ngDevMode ? [{ debugName: "showPasswordMenu" }] : /* istanbul ignore next */ []));
    preventPasswordMenu = input.required(...(ngDevMode ? [{ debugName: "preventPasswordMenu" }] : /* istanbul ignore next */ []));
    showLogOutMenu = input.required(...(ngDevMode ? [{ debugName: "showLogOutMenu" }] : /* istanbul ignore next */ []));
    preventLogOutMenu = input.required(...(ngDevMode ? [{ debugName: "preventLogOutMenu" }] : /* istanbul ignore next */ []));
    //Output 
    onClickToogle = output();
    onClickToolbarMenu = output();
    onUpdatePassword = output();
    onUpdateLanguage = output();
    //Computed
    _languageList = computed(() => {
        return [
            { Id: 'en_US', Name: 'English' },
            { Id: 'es_MX', Name: 'Español' },
            { Id: 'ko-KR', Name: '한국어' }
        ];
    }, ...(ngDevMode ? [{ debugName: "_languageList" }] : /* istanbul ignore next */ []));
    constructor() {
        effect(() => {
            const USER = userSIGNAL();
            const Language = this._languageList().find(x => x.Id == USER?.Language) || null;
            this._language.set(Language);
        });
    }
    ngAfterViewInit() {
        Tools.Sleep().then(() => {
            HTMLElements.OnMouseLeave('#coer91-toolbar-user')?.subscribe(() => {
                if (!this._isCollapsed())
                    this._isCollapsed.set(true);
            });
        });
    }
    //Computed
    _showButtonSidenav = computed(() => navigationSIGNAL().length > 1, ...(ngDevMode ? [{ debugName: "_showButtonSidenav" }] : /* istanbul ignore next */ []));
    //Computed
    _icon = computed(() => {
        switch (environmentSIGNAL().info) {
            case 'DEVELOPMENT': return 'iw-developer-fill';
            case 'STAGING': return 'iw-quality-fill';
        }
        return '';
    }, ...(ngDevMode ? [{ debugName: "_icon" }] : /* istanbul ignore next */ []));
    //Computed
    _isInvalidPassword = computed(() => {
        return this.passwordRef().isTouched()
            && this._password().length <= 5;
    }, ...(ngDevMode ? [{ debugName: "_isInvalidPassword" }] : /* istanbul ignore next */ []));
    //Computed
    _isInvalidConfirm = computed(() => {
        return this.confirmRef().isTouched()
            && (this._confirm().length <= 5 || this._confirm() != this._password());
    }, ...(ngDevMode ? [{ debugName: "_isInvalidConfirm" }] : /* istanbul ignore next */ []));
    //Computed
    _disableUpdatePassword = computed(() => {
        return this._isInvalidPassword()
            || this._isInvalidConfirm()
            || this._password().length <= 5
            || this._confirm().length <= 5
            || this._confirm() != this._password();
    }, ...(ngDevMode ? [{ debugName: "_disableUpdatePassword" }] : /* istanbul ignore next */ []));
    //Computed
    _showIdentity = computed(() => {
        return ['sm', 'md', 'lg', 'xl', 'xxl'].includes(screenSizeSIGNAL().breakpoint)
            && (Tools.IsNotOnlyWhiteSpace(this.user()?.FullName) || Tools.IsNotOnlyWhiteSpace(this.user()?.Department));
    }, ...(ngDevMode ? [{ debugName: "_showIdentity" }] : /* istanbul ignore next */ []));
    //Computed
    _menu = computed(() => {
        return Collections.SetIndex(this.menu()
            .concat(this.showProfileMenu() ? [{ label: 'Profile', preventDefault: this.preventProfileMenu(), icon: 'iw-user-fill' }] : [])
            .concat(this.showPasswordMenu() ? [{ label: 'Change Password', preventDefault: this.preventPasswordMenu(), icon: 'iw-lock-fill' }] : [])
            .concat(this.showLogOutMenu() ? [{ label: 'Log Out', preventDefault: this.preventLogOutMenu(), icon: 'iw-door-open-fill' }] : []));
    }, ...(ngDevMode ? [{ debugName: "_menu" }] : /* istanbul ignore next */ []));
    //Function
    _SelectMenu(menu) {
        if (menu) {
            if (!Tools.IsBooleanTrue(menu.preventDefault)) {
                switch (menu.label) {
                    case 'Profile': {
                        this._profileModal()?.Open();
                        break;
                    }
                    case 'Change Password': {
                        this._passwordModal()?.Open();
                        break;
                    }
                    case 'Log Out': {
                        Access.LogOut(userSIGNAL);
                        break;
                    }
                }
            }
            this.onClickToolbarMenu.emit(menu);
        }
    }
    //Function
    _UpdateLanguage(language) {
        if (Tools.IsNotNull(language) && Tools.IsNotNull(this.user())) {
            if (this.user()?.Language != language.Id)
                this.onUpdateLanguage.emit(language);
        }
    }
    //Function
    _ResetPassword() {
        this._password.set('');
        this._confirm.set('');
    }
    /** */
    CloseModal() {
        this._profileModal()?.Close();
        this._passwordModal()?.Close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: Toolbar, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: Toolbar, isStandalone: false, selector: "coer-toolbar", inputs: { menu: { classPropertyName: "menu", publicName: "menu", isSignal: true, isRequired: true, transformFunction: null }, showUserData: { classPropertyName: "showUserData", publicName: "showUserData", isSignal: true, isRequired: true, transformFunction: null }, showProfileMenu: { classPropertyName: "showProfileMenu", publicName: "showProfileMenu", isSignal: true, isRequired: true, transformFunction: null }, preventProfileMenu: { classPropertyName: "preventProfileMenu", publicName: "preventProfileMenu", isSignal: true, isRequired: true, transformFunction: null }, showPasswordMenu: { classPropertyName: "showPasswordMenu", publicName: "showPasswordMenu", isSignal: true, isRequired: true, transformFunction: null }, preventPasswordMenu: { classPropertyName: "preventPasswordMenu", publicName: "preventPasswordMenu", isSignal: true, isRequired: true, transformFunction: null }, showLogOutMenu: { classPropertyName: "showLogOutMenu", publicName: "showLogOutMenu", isSignal: true, isRequired: true, transformFunction: null }, preventLogOutMenu: { classPropertyName: "preventLogOutMenu", publicName: "preventLogOutMenu", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { onClickToogle: "onClickToogle", onClickToolbarMenu: "onClickToolbarMenu", onUpdatePassword: "onUpdatePassword", onUpdateLanguage: "onUpdateLanguage" }, viewQueries: [{ propertyName: "_profileModal", first: true, predicate: ["profileModal"], descendants: true, isSignal: true }, { propertyName: "_passwordModal", first: true, predicate: ["passwordModal"], descendants: true, isSignal: true }, { propertyName: "passwordRef", first: true, predicate: ["passwordRef"], descendants: true, isSignal: true }, { propertyName: "confirmRef", first: true, predicate: ["confirmRef"], descendants: true, isSignal: true }, { propertyName: "buttonRef", first: true, predicate: ["buttonRef"], descendants: true, isSignal: true }], ngImport: i0, template: "<header>\r\n    <h2>\r\n        <div class=\"title\">\r\n            @if(_showButtonSidenav()) {\r\n                <wia-button\r\n                    type=\"icon-rounded\"\r\n                    icon=\"iw-menu\"\r\n                    height=\"20px\"\r\n                    color=\"navigation\"\r\n                    (onClick)=\"onClickToogle.emit()\"\r\n                ></wia-button>\r\n            }\r\n            \r\n            <span class=\"title-project\">\r\n                <span>{{ title }}</span>\r\n                \r\n                @if(_icon().length > 0) {\r\n                    <i [class]=\"_icon()\"></i> \r\n                }\r\n            </span>\r\n        </div> \r\n\r\n        @if(_isLoading()) {\r\n            <div class=\"user-loading\">\r\n                <span>Loading</span>\r\n                <div class=\"user-loading-image\" [ngStyle]=\"{ backgroundImage: `url('hwmx-angular/images/loading.gif')` }\"></div>\r\n            </div>\r\n        }\r\n\r\n         \r\n        <div id=\"coer91-toolbar-user\" \r\n            class=\"user\" \r\n            [ngClass]=\"{ 'display-none' : (_isLoading() || !showUserData()) }\" \r\n            (click)=\"_isCollapsed.set(!_isCollapsed())\"> \r\n            \r\n            <figure>\r\n                <div class=\"user-image\" [ngStyle]=\"{ backgroundImage: `url('${userImage() | noImage: 'USER'}')` }\"></div>\r\n                \r\n                @if(_showIdentity()) {\r\n                    <div class=\"user-identity\">\r\n                        <p>{{ user()?.FullName   }}</p>\r\n                        <p>{{ user()?.Department }}</p>\r\n                    </div>\r\n                }\r\n            </figure>\r\n    \r\n            <ul [ngClass]=\"{ 'absolute-menu': !_showIdentity() }\"\r\n                [ngStyle]=\"{ \r\n                    'max-height': (_isCollapsed() ? '0px' : '175px'),\r\n                    'min-width' : (_isCollapsed() ? '0px' : '200px') \r\n                }\">\r\n                @for(item of _menu(); track item.__index__) {\r\n                    <li (click)=\"_SelectMenu(item)\"> \r\n                        @if((item?.icon || '').length > 0) {\r\n                            <span class=\"icon-container-option\">\r\n                                <i [class]=\"item?.icon\"></i> \r\n                            </span>\r\n                        } \r\n    \r\n                        <span class=\"display-property-option\">{{ item?.label || '' }}</span>    \r\n                    </li>\r\n                }\r\n            </ul>\r\n        </div> \r\n    </h2>\r\n</header> \r\n\r\n\r\n<wia-modal #profileModal [title]=\"user()?.FullName || ''\" icon=\"iw-user-fill\">\r\n    <div class=\"user-profile\">\r\n        <!-- User -->\r\n        <div class=\"flex-basis\">\r\n            <wia-textbox \r\n                label=\"User\"\r\n                [ngModel]=\"user()?.User\" \r\n                [isLoading]=\"_isLoading()\" \r\n                [isReadonly]=\"true\"\r\n            ></wia-textbox> \r\n        </div> \r\n\r\n        <!-- Email -->\r\n        @if(IsNotOnlyWhiteSpace(user()?.Email)) {\r\n            <div class=\"flex-basis\">\r\n                <wia-textbox \r\n                    label=\"Email\"\r\n                    [ngModel]=\"user()?.Email\" \r\n                    [isLoading]=\"_isLoading()\" \r\n                    [isReadonly]=\"true\"\r\n                ></wia-textbox> \r\n            </div>\r\n        }\r\n\r\n        <!-- Partner -->\r\n        @if(IsNotOnlyWhiteSpace(user()?.Partner)) {\r\n            <div class=\"flex-basis\">\r\n                <wia-textbox \r\n                    label=\"Partner\"\r\n                    [ngModel]=\"user()?.Partner\" \r\n                    [isLoading]=\"_isLoading()\" \r\n                    [isReadonly]=\"true\"\r\n                ></wia-textbox> \r\n            </div> \r\n        }\r\n\r\n        <!-- Language --> \r\n        @if(IsNotOnlyWhiteSpace(_language())) {\r\n            <div class=\"flex-basis\">\r\n                <wia-selectbox \r\n                    label=\"Language\"\r\n                    [(ngModel)]=\"_language\" \r\n                    [isLoading]=\"_isLoading()\" \r\n                    [dataSource]=\"_languageList()\" \r\n                    (onValueChange)=\"_UpdateLanguage($event)\"\r\n                ></wia-selectbox> \r\n            </div>\r\n        }   \r\n    </div>\r\n</wia-modal>\r\n\r\n\r\n<wia-modal #passwordModal title=\"Change Password\" icon=\"iw-lock-fill\" (onClose)=\"_ResetPassword()\" (onOpen)=\"passwordRef.Focus()\">\r\n    <div class=\"flex-wrap margin-top-15px max-width-300px margin-x-10px\">\r\n        <!-- Password -->\r\n        <div class=\"flex-basis-300px flex-grow-1\">\r\n            <wia-secretbox\r\n                #passwordRef\r\n                label=\"Password\"\r\n                [(ngModel)]=\"_password\" \r\n                [isLoading]=\"_isLoading()\" \r\n                [isInvalid]=\"_isInvalidPassword()\"\r\n                marginTop=\"5px\"\r\n                (onKeyupEnter)=\"confirmRef.Focus()\"\r\n            ></wia-secretbox> \r\n        </div> \r\n\r\n        <!-- Confirm -->\r\n        <div class=\"flex-basis-300px flex-grow-1\">\r\n            <wia-secretbox\r\n                #confirmRef\r\n                label=\"Confirm\"\r\n                [(ngModel)]=\"_confirm\" \r\n                [isLoading]=\"_isLoading()\" \r\n                [isInvalid]=\"_isInvalidConfirm()\"\r\n                marginTop=\"5px\"\r\n                marginBottom=\"10px\"\r\n                (onKeyupEnter)=\"buttonRef()?.Click()\"\r\n            ></wia-secretbox> \r\n        </div>\r\n    </div>\r\n    \r\n    <ng-template templateRef=\"modal-footer\">\r\n        <wia-button\r\n            #buttonRef\r\n            label=\"Update\"\r\n            icon=\"save\"\r\n            color=\"success\"\r\n            [isLoading]=\"_isLoading()\"\r\n            marginRight=\"10px\"\r\n            [isReadonly]=\"_disableUpdatePassword()\"\r\n            (onClick)=\"onUpdatePassword.emit(_password())\"\r\n        ></wia-button>\r\n    </ng-template>\r\n</wia-modal>", styles: ["header{height:var(--toolbar-height)!important;max-height:var(--toolbar-height)!important;position:relative!important;z-index:var(--z-index-toolbar)!important;background-color:var(--toolbar)!important;padding:0 10px!important;box-shadow:10px -12px 15px 1px #000!important}header h2{height:100%!important;width:100%!important;max-height:100%!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:10px!important}header h2 div.title{height:inherit!important;display:inherit!important;align-items:inherit!important;gap:inherit!important;color:var(--sidenav)!important}header h2 div.title span.title-project{display:flex!important;align-items:center!important;gap:5px!important;white-space:nowrap!important}header h2 div.title span.title-project i{font-size:25px!important}header h2 div.user-loading{display:flex;align-items:center;gap:10px}header h2 div.user-loading span{color:var(--loading)!important;animation:__KeyOpacity50 .8s ease-in-out infinite alternate!important}header h2 div.user-loading div.user-loading-image{min-width:30px!important;max-width:30px!important;min-height:30px!important;max-height:30px!important;border-radius:25px!important;background:transparent;background-size:cover!important;background-repeat:no-repeat!important;background-position:center!important}header h2 div.user{height:inherit!important;-webkit-user-select:none!important;user-select:none!important;max-width:calc(100% - 30px)!important}header h2 div.user figure{height:inherit!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:5px!important;border-radius:5px!important;cursor:pointer!important;padding:0 5px!important}@media(min-width:0px)and (max-width:499px){header h2 div.user figure{justify-content:flex-start!important;padding:0!important;overflow:hidden}}header h2 div.user figure div.user-image{min-width:38px!important;max-width:38px!important;min-height:38px!important;max-height:38px!important;border-radius:25px;background:transparent;background-size:cover;background-repeat:no-repeat;background-position:top}header h2 div.user figure div.user-identity p{white-space:nowrap!important;font-size:14px!important;font-weight:700!important}@media(min-width:0px)and (max-width:499px){header h2 div.user figure div.user-identity p{overflow:hidden!important;text-overflow:ellipsis!important;max-width:calc(100% - 10px)!important}}header h2 div.user figure:hover{box-shadow:0 0 10px 0 var(--dark)!important}header h2 div.user ul{list-style:none!important;padding-left:0!important;background-color:var(--ghost)!important;border-radius:0 0 5px 5px!important;transition:all .3s ease-in-out!important;box-shadow:0 5px 10px -3px var(--dark)!important;font-size:16px!important;overflow:auto!important;-webkit-user-select:none!important;user-select:none!important}header h2 div.user ul li{min-height:24.2px!important;border-bottom:1px solid var(--loading)!important;display:flex!important;align-items:center!important;padding:5px 10px!important;overflow:hidden!important;cursor:pointer!important;gap:5px!important}header h2 div.user ul li span.icon-container-option{width:25px!important;max-width:25px!important;display:inherit!important;align-items:inherit!important;justify-content:center!important}header h2 div.user ul li span.display-property-option{display:flex!important;align-items:center!important;word-break:break-all!important}header h2 div.user ul li:last-child{border-bottom-color:transparent!important}header h2 div.user ul li:not(.focus):hover{background-color:var(--item-hover)!important;border-radius:0 0 5px 5px!important}header h2 div.user ul.absolute-menu{position:absolute!important;right:10px!important}div.user-profile{display:flex!important;flex-wrap:wrap!important;width:720px!important;max-width:720px!important;margin:20px 10px!important;gap:20px!important}div.user-profile div.flex-basis{width:calc(50% - 10px)!important}@media(min-width:0px)and (max-width:799px){div.user-profile{width:calc(100% - 20px)!important}div.user-profile div.flex-basis{width:100%!important}}\n"], dependencies: [{ kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i3.WIAButton, selector: "wia-button", inputs: ["label", "type", "color", "icon", "path", "iconPosition", "isLoading", "isReadonly", "isInvisible", "isHidden", "breakpoints", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "marginTop", "marginRight", "marginBottom", "marginLeft"], outputs: ["onClick", "onDestroy", "onReady"] }, { kind: "component", type: i3.WIAModal, selector: "wia-modal", inputs: ["title", "icon", "showCancelButton", "alignX", "alignY", "width", "maxWidth", "height"], outputs: ["onOpen", "onClose", "onDestroy", "onReady"] }, { kind: "component", type: i3.WIASecretBox, selector: "wia-secretbox", inputs: ["maxLength", "showSecret"] }, { kind: "component", type: i3.WIASelectBox, selector: "wia-selectbox", inputs: ["selectOnFocus", "showClearButton", "dataSource", "displayProperty", "useIconProperty"], outputs: ["onValueChange", "onOpen", "onClose"] }, { kind: "component", type: i3.WIATextBox, selector: "wia-textbox", inputs: ["placeholder", "selectOnFocus", "textPosition", "minLength", "maxLength", "showClearButton", "showSearchButton", "externalButtons", "size", "width", "minWidth", "maxWidth"], outputs: ["onKeyupEnter", "onClickClear", "onClickSearch", "onClickLeft", "onClickRight"] }, { kind: "directive", type: i4.TemplateRefDirective, selector: "[templateRef]", inputs: ["templateRef", "title", "icon", "isReadonly", "show", "tooltip"] }, { kind: "pipe", type: i5.NoImagePipe, name: "noImage" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: Toolbar, decorators: [{
            type: Component,
            args: [{ selector: 'coer-toolbar', standalone: false, template: "<header>\r\n    <h2>\r\n        <div class=\"title\">\r\n            @if(_showButtonSidenav()) {\r\n                <wia-button\r\n                    type=\"icon-rounded\"\r\n                    icon=\"iw-menu\"\r\n                    height=\"20px\"\r\n                    color=\"navigation\"\r\n                    (onClick)=\"onClickToogle.emit()\"\r\n                ></wia-button>\r\n            }\r\n            \r\n            <span class=\"title-project\">\r\n                <span>{{ title }}</span>\r\n                \r\n                @if(_icon().length > 0) {\r\n                    <i [class]=\"_icon()\"></i> \r\n                }\r\n            </span>\r\n        </div> \r\n\r\n        @if(_isLoading()) {\r\n            <div class=\"user-loading\">\r\n                <span>Loading</span>\r\n                <div class=\"user-loading-image\" [ngStyle]=\"{ backgroundImage: `url('hwmx-angular/images/loading.gif')` }\"></div>\r\n            </div>\r\n        }\r\n\r\n         \r\n        <div id=\"coer91-toolbar-user\" \r\n            class=\"user\" \r\n            [ngClass]=\"{ 'display-none' : (_isLoading() || !showUserData()) }\" \r\n            (click)=\"_isCollapsed.set(!_isCollapsed())\"> \r\n            \r\n            <figure>\r\n                <div class=\"user-image\" [ngStyle]=\"{ backgroundImage: `url('${userImage() | noImage: 'USER'}')` }\"></div>\r\n                \r\n                @if(_showIdentity()) {\r\n                    <div class=\"user-identity\">\r\n                        <p>{{ user()?.FullName   }}</p>\r\n                        <p>{{ user()?.Department }}</p>\r\n                    </div>\r\n                }\r\n            </figure>\r\n    \r\n            <ul [ngClass]=\"{ 'absolute-menu': !_showIdentity() }\"\r\n                [ngStyle]=\"{ \r\n                    'max-height': (_isCollapsed() ? '0px' : '175px'),\r\n                    'min-width' : (_isCollapsed() ? '0px' : '200px') \r\n                }\">\r\n                @for(item of _menu(); track item.__index__) {\r\n                    <li (click)=\"_SelectMenu(item)\"> \r\n                        @if((item?.icon || '').length > 0) {\r\n                            <span class=\"icon-container-option\">\r\n                                <i [class]=\"item?.icon\"></i> \r\n                            </span>\r\n                        } \r\n    \r\n                        <span class=\"display-property-option\">{{ item?.label || '' }}</span>    \r\n                    </li>\r\n                }\r\n            </ul>\r\n        </div> \r\n    </h2>\r\n</header> \r\n\r\n\r\n<wia-modal #profileModal [title]=\"user()?.FullName || ''\" icon=\"iw-user-fill\">\r\n    <div class=\"user-profile\">\r\n        <!-- User -->\r\n        <div class=\"flex-basis\">\r\n            <wia-textbox \r\n                label=\"User\"\r\n                [ngModel]=\"user()?.User\" \r\n                [isLoading]=\"_isLoading()\" \r\n                [isReadonly]=\"true\"\r\n            ></wia-textbox> \r\n        </div> \r\n\r\n        <!-- Email -->\r\n        @if(IsNotOnlyWhiteSpace(user()?.Email)) {\r\n            <div class=\"flex-basis\">\r\n                <wia-textbox \r\n                    label=\"Email\"\r\n                    [ngModel]=\"user()?.Email\" \r\n                    [isLoading]=\"_isLoading()\" \r\n                    [isReadonly]=\"true\"\r\n                ></wia-textbox> \r\n            </div>\r\n        }\r\n\r\n        <!-- Partner -->\r\n        @if(IsNotOnlyWhiteSpace(user()?.Partner)) {\r\n            <div class=\"flex-basis\">\r\n                <wia-textbox \r\n                    label=\"Partner\"\r\n                    [ngModel]=\"user()?.Partner\" \r\n                    [isLoading]=\"_isLoading()\" \r\n                    [isReadonly]=\"true\"\r\n                ></wia-textbox> \r\n            </div> \r\n        }\r\n\r\n        <!-- Language --> \r\n        @if(IsNotOnlyWhiteSpace(_language())) {\r\n            <div class=\"flex-basis\">\r\n                <wia-selectbox \r\n                    label=\"Language\"\r\n                    [(ngModel)]=\"_language\" \r\n                    [isLoading]=\"_isLoading()\" \r\n                    [dataSource]=\"_languageList()\" \r\n                    (onValueChange)=\"_UpdateLanguage($event)\"\r\n                ></wia-selectbox> \r\n            </div>\r\n        }   \r\n    </div>\r\n</wia-modal>\r\n\r\n\r\n<wia-modal #passwordModal title=\"Change Password\" icon=\"iw-lock-fill\" (onClose)=\"_ResetPassword()\" (onOpen)=\"passwordRef.Focus()\">\r\n    <div class=\"flex-wrap margin-top-15px max-width-300px margin-x-10px\">\r\n        <!-- Password -->\r\n        <div class=\"flex-basis-300px flex-grow-1\">\r\n            <wia-secretbox\r\n                #passwordRef\r\n                label=\"Password\"\r\n                [(ngModel)]=\"_password\" \r\n                [isLoading]=\"_isLoading()\" \r\n                [isInvalid]=\"_isInvalidPassword()\"\r\n                marginTop=\"5px\"\r\n                (onKeyupEnter)=\"confirmRef.Focus()\"\r\n            ></wia-secretbox> \r\n        </div> \r\n\r\n        <!-- Confirm -->\r\n        <div class=\"flex-basis-300px flex-grow-1\">\r\n            <wia-secretbox\r\n                #confirmRef\r\n                label=\"Confirm\"\r\n                [(ngModel)]=\"_confirm\" \r\n                [isLoading]=\"_isLoading()\" \r\n                [isInvalid]=\"_isInvalidConfirm()\"\r\n                marginTop=\"5px\"\r\n                marginBottom=\"10px\"\r\n                (onKeyupEnter)=\"buttonRef()?.Click()\"\r\n            ></wia-secretbox> \r\n        </div>\r\n    </div>\r\n    \r\n    <ng-template templateRef=\"modal-footer\">\r\n        <wia-button\r\n            #buttonRef\r\n            label=\"Update\"\r\n            icon=\"save\"\r\n            color=\"success\"\r\n            [isLoading]=\"_isLoading()\"\r\n            marginRight=\"10px\"\r\n            [isReadonly]=\"_disableUpdatePassword()\"\r\n            (onClick)=\"onUpdatePassword.emit(_password())\"\r\n        ></wia-button>\r\n    </ng-template>\r\n</wia-modal>", styles: ["header{height:var(--toolbar-height)!important;max-height:var(--toolbar-height)!important;position:relative!important;z-index:var(--z-index-toolbar)!important;background-color:var(--toolbar)!important;padding:0 10px!important;box-shadow:10px -12px 15px 1px #000!important}header h2{height:100%!important;width:100%!important;max-height:100%!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:10px!important}header h2 div.title{height:inherit!important;display:inherit!important;align-items:inherit!important;gap:inherit!important;color:var(--sidenav)!important}header h2 div.title span.title-project{display:flex!important;align-items:center!important;gap:5px!important;white-space:nowrap!important}header h2 div.title span.title-project i{font-size:25px!important}header h2 div.user-loading{display:flex;align-items:center;gap:10px}header h2 div.user-loading span{color:var(--loading)!important;animation:__KeyOpacity50 .8s ease-in-out infinite alternate!important}header h2 div.user-loading div.user-loading-image{min-width:30px!important;max-width:30px!important;min-height:30px!important;max-height:30px!important;border-radius:25px!important;background:transparent;background-size:cover!important;background-repeat:no-repeat!important;background-position:center!important}header h2 div.user{height:inherit!important;-webkit-user-select:none!important;user-select:none!important;max-width:calc(100% - 30px)!important}header h2 div.user figure{height:inherit!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:5px!important;border-radius:5px!important;cursor:pointer!important;padding:0 5px!important}@media(min-width:0px)and (max-width:499px){header h2 div.user figure{justify-content:flex-start!important;padding:0!important;overflow:hidden}}header h2 div.user figure div.user-image{min-width:38px!important;max-width:38px!important;min-height:38px!important;max-height:38px!important;border-radius:25px;background:transparent;background-size:cover;background-repeat:no-repeat;background-position:top}header h2 div.user figure div.user-identity p{white-space:nowrap!important;font-size:14px!important;font-weight:700!important}@media(min-width:0px)and (max-width:499px){header h2 div.user figure div.user-identity p{overflow:hidden!important;text-overflow:ellipsis!important;max-width:calc(100% - 10px)!important}}header h2 div.user figure:hover{box-shadow:0 0 10px 0 var(--dark)!important}header h2 div.user ul{list-style:none!important;padding-left:0!important;background-color:var(--ghost)!important;border-radius:0 0 5px 5px!important;transition:all .3s ease-in-out!important;box-shadow:0 5px 10px -3px var(--dark)!important;font-size:16px!important;overflow:auto!important;-webkit-user-select:none!important;user-select:none!important}header h2 div.user ul li{min-height:24.2px!important;border-bottom:1px solid var(--loading)!important;display:flex!important;align-items:center!important;padding:5px 10px!important;overflow:hidden!important;cursor:pointer!important;gap:5px!important}header h2 div.user ul li span.icon-container-option{width:25px!important;max-width:25px!important;display:inherit!important;align-items:inherit!important;justify-content:center!important}header h2 div.user ul li span.display-property-option{display:flex!important;align-items:center!important;word-break:break-all!important}header h2 div.user ul li:last-child{border-bottom-color:transparent!important}header h2 div.user ul li:not(.focus):hover{background-color:var(--item-hover)!important;border-radius:0 0 5px 5px!important}header h2 div.user ul.absolute-menu{position:absolute!important;right:10px!important}div.user-profile{display:flex!important;flex-wrap:wrap!important;width:720px!important;max-width:720px!important;margin:20px 10px!important;gap:20px!important}div.user-profile div.flex-basis{width:calc(50% - 10px)!important}@media(min-width:0px)and (max-width:799px){div.user-profile{width:calc(100% - 20px)!important}div.user-profile div.flex-basis{width:100%!important}}\n"] }]
        }], ctorParameters: () => [], propDecorators: { _profileModal: [{ type: i0.ViewChild, args: ['profileModal', { isSignal: true }] }], _passwordModal: [{ type: i0.ViewChild, args: ['passwordModal', { isSignal: true }] }], passwordRef: [{ type: i0.ViewChild, args: ['passwordRef', { isSignal: true }] }], confirmRef: [{ type: i0.ViewChild, args: ['confirmRef', { isSignal: true }] }], buttonRef: [{ type: i0.ViewChild, args: ['buttonRef', { isSignal: true }] }], menu: [{ type: i0.Input, args: [{ isSignal: true, alias: "menu", required: true }] }], showUserData: [{ type: i0.Input, args: [{ isSignal: true, alias: "showUserData", required: true }] }], showProfileMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "showProfileMenu", required: true }] }], preventProfileMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "preventProfileMenu", required: true }] }], showPasswordMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "showPasswordMenu", required: true }] }], preventPasswordMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "preventPasswordMenu", required: true }] }], showLogOutMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "showLogOutMenu", required: true }] }], preventLogOutMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "preventLogOutMenu", required: true }] }], onClickToogle: [{ type: i0.Output, args: ["onClickToogle"] }], onClickToolbarMenu: [{ type: i0.Output, args: ["onClickToolbarMenu"] }], onUpdatePassword: [{ type: i0.Output, args: ["onUpdatePassword"] }], onUpdateLanguage: [{ type: i0.Output, args: ["onUpdateLanguage"] }] } });

class WiaComponent {
    //Injection
    _alert = inject(CoerAlert);
    _router = inject(Router);
    //Elements
    _toolbar = viewChild('toolbar', ...(ngDevMode ? [{ debugName: "_toolbar" }] : /* istanbul ignore next */ []));
    _sidenav = viewChild('sidenav', ...(ngDevMode ? [{ debugName: "_sidenav" }] : /* istanbul ignore next */ []));
    _login = viewChild('login', ...(ngDevMode ? [{ debugName: "_login" }] : /* istanbul ignore next */ []));
    //Variables
    alert = this._alert;
    router = this._router;
    isOpenSidenav = signal(true, ...(ngDevMode ? [{ debugName: "isOpenSidenav" }] : /* istanbul ignore next */ []));
    _watchJWT$;
    //Inputs  
    navigation = input.required(...(ngDevMode ? [{ debugName: "navigation" }] : /* istanbul ignore next */ []));
    toolbarMenu = input([], ...(ngDevMode ? [{ debugName: "toolbarMenu" }] : /* istanbul ignore next */ []));
    toolbarShowUserData = input(false, ...(ngDevMode ? [{ debugName: "toolbarShowUserData" }] : /* istanbul ignore next */ []));
    toolbarShowProfileMenu = input(true, ...(ngDevMode ? [{ debugName: "toolbarShowProfileMenu" }] : /* istanbul ignore next */ []));
    toolbarPreventProfileMenu = input(false, ...(ngDevMode ? [{ debugName: "toolbarPreventProfileMenu" }] : /* istanbul ignore next */ []));
    toolbarShowPasswordMenu = input(true, ...(ngDevMode ? [{ debugName: "toolbarShowPasswordMenu" }] : /* istanbul ignore next */ []));
    toolbarPreventPasswordMenu = input(false, ...(ngDevMode ? [{ debugName: "toolbarPreventPasswordMenu" }] : /* istanbul ignore next */ []));
    toolbarShowLogOutMenu = input(true, ...(ngDevMode ? [{ debugName: "toolbarShowLogOutMenu" }] : /* istanbul ignore next */ []));
    toolbarPreventLogOutMenu = input(false, ...(ngDevMode ? [{ debugName: "toolbarPreventLogOutMenu" }] : /* istanbul ignore next */ []));
    //Output
    onLogin = output();
    onRecoveryPassword = output();
    onUpdateJWT = output();
    onClickToolbarMenu = output();
    onUpdatePassword = output();
    onUpdateLanguage = output();
    constructor() {
        Screen.Resize.subscribe(screenSizeSIGNAL.set);
        effect(() => {
            if (this._isLogin())
                this._WatchJWT();
            else {
                clearInterval(this._watchJWT$);
                Tools.Sleep().then(() => this._login()?.SetUser(Access.RememberUser()));
            }
        });
    }
    //Computed
    _isLogin = computed(() => {
        return Tools.IsNotNull(userSIGNAL())
            && Tools.IsNotOnlyWhiteSpace(userSIGNAL()?.User);
    }, ...(ngDevMode ? [{ debugName: "_isLogin" }] : /* istanbul ignore next */ []));
    //Computed
    _showBackdrop = computed(() => {
        return this._isLogin()
            && this.isOpenSidenav()
            && ['mv', 'xs', 'sm', 'md', 'lg'].includes(screenSizeSIGNAL().breakpoint);
    }, ...(ngDevMode ? [{ debugName: "_showBackdrop" }] : /* istanbul ignore next */ []));
    /** */
    FocusUser() {
        this._login()?.FocusUser();
    }
    /** */
    FocusPassword(select = false) {
        this._login()?.FocusPassword(select);
    }
    /** */
    Show(view) {
        this._login()?.Show(view);
    }
    /** */
    CloseModal() {
        this._toolbar()?.CloseModal();
    }
    /** */
    SetAccess(response) {
        const _response = response;
        Access.SetUser(null);
        userSIGNAL.set(null);
        //Set Response
        if (Tools.IsBooleanTrue(appSettings?.security?.useJWT)) {
            if (Tools.IsNotOnlyWhiteSpace(_response?.JWT)) {
                Access.SetUser(_response.JWT);
                userSIGNAL.set(_response);
            }
        }
        else {
            if (Tools.IsNotOnlyWhiteSpace(_response?.User)) {
                Access.SetUser(_response);
                userSIGNAL.set(_response);
            }
        }
        //Has Access
        if (Access.IsLogin()) {
            if (Tools.HasProperty(_response, 'message')) {
                this._alert.Information(_response.Message, 'Welcome', 'iw-logo-coer91');
                let path = '/home';
                if (Tools.IsBooleanFalse(appSettings?.navigation?.showHome)) {
                    if (Tools.IsNotOnlyWhiteSpace(appSettings?.navigation?.redirectTo)) {
                        path = appSettings?.navigation?.redirectTo;
                        if (!path.startsWith('/'))
                            path = `/${path}`;
                    }
                    else
                        path = '/';
                }
                this._router.navigateByUrl(path);
            }
        }
        else {
            this._alert.Warning(_response.Message, 'No access', 'iw-hand-stop-fill');
            this._login()?.FocusPassword();
        }
        return Access.IsLogin();
    }
    //Function 
    _WatchJWT() {
        clearInterval(this._watchJWT$);
        const VALIDATE_EVERY = 60000;
        const DIFERENCE_TO_UPDATE = 30;
        if (Tools.IsBooleanTrue(appSettings?.security?.useJWT)) {
            let JWT = Access.GetJWTInfo();
            if (Tools.IsOnlyWhiteSpace(JWT.claims?.ExpirationDate)) {
                console.warn('ExpirationDate not provided in JWT. Watching JWT is not working');
                return;
            }
            if (JWT.minutes <= 0) {
                Access.LogOut(userSIGNAL);
                return;
            }
            this.onUpdateJWT.emit();
            this._watchJWT$ = setInterval(() => {
                JWT = Access.GetJWTInfo();
                if (Tools.IsNotOnlyWhiteSpace(JWT.claims?.ExpirationDate)) {
                    if (Dates.GetDiff(JWT.claims.ExpirationDate, Dates.GetCurrentUTCDate(), 'minutes') <= DIFERENCE_TO_UPDATE) {
                        this._WatchJWT();
                    }
                }
                else {
                    Access.LogOut(userSIGNAL);
                    clearInterval(this._watchJWT$);
                }
            }, VALIDATE_EVERY);
        }
        else {
            this._watchJWT$ = setInterval(() => {
                if (Tools.IsOnlyWhiteSpace(Access.GetUser()?.User)) {
                    Access.LogOut(userSIGNAL);
                    clearInterval(this._watchJWT$);
                }
            }, VALIDATE_EVERY);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WiaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WiaComponent, isStandalone: false, selector: "wia-component", inputs: { navigation: { classPropertyName: "navigation", publicName: "navigation", isSignal: true, isRequired: true, transformFunction: null }, toolbarMenu: { classPropertyName: "toolbarMenu", publicName: "toolbarMenu", isSignal: true, isRequired: false, transformFunction: null }, toolbarShowUserData: { classPropertyName: "toolbarShowUserData", publicName: "toolbarShowUserData", isSignal: true, isRequired: false, transformFunction: null }, toolbarShowProfileMenu: { classPropertyName: "toolbarShowProfileMenu", publicName: "toolbarShowProfileMenu", isSignal: true, isRequired: false, transformFunction: null }, toolbarPreventProfileMenu: { classPropertyName: "toolbarPreventProfileMenu", publicName: "toolbarPreventProfileMenu", isSignal: true, isRequired: false, transformFunction: null }, toolbarShowPasswordMenu: { classPropertyName: "toolbarShowPasswordMenu", publicName: "toolbarShowPasswordMenu", isSignal: true, isRequired: false, transformFunction: null }, toolbarPreventPasswordMenu: { classPropertyName: "toolbarPreventPasswordMenu", publicName: "toolbarPreventPasswordMenu", isSignal: true, isRequired: false, transformFunction: null }, toolbarShowLogOutMenu: { classPropertyName: "toolbarShowLogOutMenu", publicName: "toolbarShowLogOutMenu", isSignal: true, isRequired: false, transformFunction: null }, toolbarPreventLogOutMenu: { classPropertyName: "toolbarPreventLogOutMenu", publicName: "toolbarPreventLogOutMenu", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onLogin: "onLogin", onRecoveryPassword: "onRecoveryPassword", onUpdateJWT: "onUpdateJWT", onClickToolbarMenu: "onClickToolbarMenu", onUpdatePassword: "onUpdatePassword", onUpdateLanguage: "onUpdateLanguage" }, viewQueries: [{ propertyName: "_toolbar", first: true, predicate: ["toolbar"], descendants: true, isSignal: true }, { propertyName: "_sidenav", first: true, predicate: ["sidenav"], descendants: true, isSignal: true }, { propertyName: "_login", first: true, predicate: ["login"], descendants: true, isSignal: true }], ngImport: i0, template: "@if(_isLogin()) {\r\n    <coer-toolbar \r\n        #toolbar\r\n        [menu]=\"toolbarMenu()\" \r\n        [showUserData]=\"toolbarShowUserData()\"\r\n        [showProfileMenu]=\"toolbarShowProfileMenu()\"    \r\n        [preventProfileMenu]=\"toolbarPreventProfileMenu()\"\r\n        [showPasswordMenu]=\"toolbarShowPasswordMenu()\"   \r\n        [preventPasswordMenu]=\"toolbarPreventPasswordMenu()\"\r\n        [showLogOutMenu]=\"toolbarShowLogOutMenu()\"     \r\n        [preventLogOutMenu]=\"toolbarPreventLogOutMenu()\"  \r\n        (onClickToogle)=\"sidenav.Toggle()\"\r\n        (onClickToolbarMenu)=\"onClickToolbarMenu.emit($event)\"\r\n        (onUpdatePassword)=\"onUpdatePassword.emit($event)\"\r\n        (onUpdateLanguage)=\"onUpdateLanguage.emit($event)\"\r\n\r\n    ></coer-toolbar>\r\n    \r\n    <div class=\"coer91\">\r\n        <sidenav \r\n            #sidenav\r\n            [navigation]=\"navigation()\" \r\n            (onOpen)=\"isOpenSidenav.set(true)\"\r\n            (onClose)=\"isOpenSidenav.set(false)\">\r\n            <div></div>\r\n        </sidenav>\r\n    \r\n        <main>   \r\n            <router-outlet></router-outlet>\r\n            \r\n            @if(_showBackdrop()) {\r\n                <div class=\"backdrop z-index-2\" (click)=\"sidenav.Close()\"></div>\r\n            }\r\n        </main>\r\n    \r\n    </div>\r\n}\r\n\r\n@else {\r\n    <login\r\n        #login\r\n        (onLogin)=\"onLogin.emit($event)\"\r\n        (onRecoveryPassword)=\"onRecoveryPassword.emit($event)\"\r\n    ></login>\r\n}\r\n\r\n<coer-alert></coer-alert>", styles: ["div.coer91{display:flex!important}div.coer91 main{height:var(--main-screen-height)!important;width:100%!important;overflow:auto!important;overflow-x:hidden!important;transition:all .5s ease!important}\n"], dependencies: [{ kind: "directive", type: i1.RouterOutlet, selector: "router-outlet", inputs: ["name", "routerOutletData"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "component", type: i2$1.CoerAlert, selector: "coer-alert" }, { kind: "component", type: LoginPage, selector: "login", outputs: ["onLogin", "onRecoveryPassword"] }, { kind: "component", type: Sidenav, selector: "sidenav", inputs: ["navigation"], outputs: ["onOpen", "onClose"] }, { kind: "component", type: Toolbar, selector: "coer-toolbar", inputs: ["menu", "showUserData", "showProfileMenu", "preventProfileMenu", "showPasswordMenu", "preventPasswordMenu", "showLogOutMenu", "preventLogOutMenu"], outputs: ["onClickToogle", "onClickToolbarMenu", "onUpdatePassword", "onUpdateLanguage"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WiaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'wia-component', standalone: false, template: "@if(_isLogin()) {\r\n    <coer-toolbar \r\n        #toolbar\r\n        [menu]=\"toolbarMenu()\" \r\n        [showUserData]=\"toolbarShowUserData()\"\r\n        [showProfileMenu]=\"toolbarShowProfileMenu()\"    \r\n        [preventProfileMenu]=\"toolbarPreventProfileMenu()\"\r\n        [showPasswordMenu]=\"toolbarShowPasswordMenu()\"   \r\n        [preventPasswordMenu]=\"toolbarPreventPasswordMenu()\"\r\n        [showLogOutMenu]=\"toolbarShowLogOutMenu()\"     \r\n        [preventLogOutMenu]=\"toolbarPreventLogOutMenu()\"  \r\n        (onClickToogle)=\"sidenav.Toggle()\"\r\n        (onClickToolbarMenu)=\"onClickToolbarMenu.emit($event)\"\r\n        (onUpdatePassword)=\"onUpdatePassword.emit($event)\"\r\n        (onUpdateLanguage)=\"onUpdateLanguage.emit($event)\"\r\n\r\n    ></coer-toolbar>\r\n    \r\n    <div class=\"coer91\">\r\n        <sidenav \r\n            #sidenav\r\n            [navigation]=\"navigation()\" \r\n            (onOpen)=\"isOpenSidenav.set(true)\"\r\n            (onClose)=\"isOpenSidenav.set(false)\">\r\n            <div></div>\r\n        </sidenav>\r\n    \r\n        <main>   \r\n            <router-outlet></router-outlet>\r\n            \r\n            @if(_showBackdrop()) {\r\n                <div class=\"backdrop z-index-2\" (click)=\"sidenav.Close()\"></div>\r\n            }\r\n        </main>\r\n    \r\n    </div>\r\n}\r\n\r\n@else {\r\n    <login\r\n        #login\r\n        (onLogin)=\"onLogin.emit($event)\"\r\n        (onRecoveryPassword)=\"onRecoveryPassword.emit($event)\"\r\n    ></login>\r\n}\r\n\r\n<coer-alert></coer-alert>", styles: ["div.coer91{display:flex!important}div.coer91 main{height:var(--main-screen-height)!important;width:100%!important;overflow:auto!important;overflow-x:hidden!important;transition:all .5s ease!important}\n"] }]
        }], ctorParameters: () => [], propDecorators: { _toolbar: [{ type: i0.ViewChild, args: ['toolbar', { isSignal: true }] }], _sidenav: [{ type: i0.ViewChild, args: ['sidenav', { isSignal: true }] }], _login: [{ type: i0.ViewChild, args: ['login', { isSignal: true }] }], navigation: [{ type: i0.Input, args: [{ isSignal: true, alias: "navigation", required: true }] }], toolbarMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "toolbarMenu", required: false }] }], toolbarShowUserData: [{ type: i0.Input, args: [{ isSignal: true, alias: "toolbarShowUserData", required: false }] }], toolbarShowProfileMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "toolbarShowProfileMenu", required: false }] }], toolbarPreventProfileMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "toolbarPreventProfileMenu", required: false }] }], toolbarShowPasswordMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "toolbarShowPasswordMenu", required: false }] }], toolbarPreventPasswordMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "toolbarPreventPasswordMenu", required: false }] }], toolbarShowLogOutMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "toolbarShowLogOutMenu", required: false }] }], toolbarPreventLogOutMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "toolbarPreventLogOutMenu", required: false }] }], onLogin: [{ type: i0.Output, args: ["onLogin"] }], onRecoveryPassword: [{ type: i0.Output, args: ["onRecoveryPassword"] }], onUpdateJWT: [{ type: i0.Output, args: ["onUpdateJWT"] }], onClickToolbarMenu: [{ type: i0.Output, args: ["onClickToolbarMenu"] }], onUpdatePassword: [{ type: i0.Output, args: ["onUpdatePassword"] }], onUpdateLanguage: [{ type: i0.Output, args: ["onUpdateLanguage"] }] } });

class HomePage extends Page {
    version = '0.0.0';
    img = 'hwmx-angular/images/hyundai-wia.png';
    constructor() {
        super('home');
        if (Tools.IsNotOnlyWhiteSpace(appSettings?.appInfo?.version))
            this.version = appSettings?.appInfo?.version;
        if (Tools.IsNotOnlyWhiteSpace(appSettings?.background?.home))
            this.img = appSettings?.background?.home;
    }
    //Computed
    _environment = computed(() => {
        return environmentSIGNAL().info === 'PRODUCTION'
            ? `${appSettings?.appInfo?.company} © ${Dates.GetCurrentDate().getFullYear()}`
            : environmentSIGNAL().info;
    }, ...(ngDevMode ? [{ debugName: "_environment" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HomePage, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.17", type: HomePage, isStandalone: false, selector: "home-page", usesInheritance: true, ngImport: i0, template: "<!-- <wia-page-title \r\n    title=\"Home\" \r\n    [showBreadcrumbs]=\"false\"\r\n></wia-page-title>  -->\r\n\r\n<section class=\"container-section coer91\">\r\n    <figure [ngStyle]=\"{ 'background-image': `url('${img}')` }\"></figure>\r\n    \r\n    <footer class=\"color-secondary-light\"> \r\n        <span class=\"version\">{{ version }}</span>         \r\n        <span>{{ _environment() }}</span>  \r\n    </footer>\r\n</section>", styles: ["section.container-section.coer91{height:calc(100% - 80px)!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important;margin-top:30px!important}section.container-section.coer91 figure{background-position:center!important;background-size:contain!important;background-repeat:no-repeat!important;width:40%!important;height:40%!important}@media(min-width:0px)and (max-width:499px){section.container-section.coer91 figure{width:75%!important}}section.container-section.coer91 footer{position:absolute!important;left:0!important;right:0!important;bottom:0!important;padding:10px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;font-weight:700!important}\n"], dependencies: [{ kind: "directive", type: i1$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: HomePage, decorators: [{
            type: Component,
            args: [{ selector: 'home-page', standalone: false, template: "<!-- <wia-page-title \r\n    title=\"Home\" \r\n    [showBreadcrumbs]=\"false\"\r\n></wia-page-title>  -->\r\n\r\n<section class=\"container-section coer91\">\r\n    <figure [ngStyle]=\"{ 'background-image': `url('${img}')` }\"></figure>\r\n    \r\n    <footer class=\"color-secondary-light\"> \r\n        <span class=\"version\">{{ version }}</span>         \r\n        <span>{{ _environment() }}</span>  \r\n    </footer>\r\n</section>", styles: ["section.container-section.coer91{height:calc(100% - 80px)!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important;margin-top:30px!important}section.container-section.coer91 figure{background-position:center!important;background-size:contain!important;background-repeat:no-repeat!important;width:40%!important;height:40%!important}@media(min-width:0px)and (max-width:499px){section.container-section.coer91 figure{width:75%!important}}section.container-section.coer91 footer{position:absolute!important;left:0!important;right:0!important;bottom:0!important;padding:10px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;font-weight:700!important}\n"] }]
        }], ctorParameters: () => [] });

class WiaRoot {
    //Elements
    _coer91 = viewChild.required('WiaComponent');
    //Variables  
    _navigation = signal([], ...(ngDevMode ? [{ debugName: "_navigation" }] : /* istanbul ignore next */ []));
    IsNotNull = Tools.IsNotNull;
    IsFunction = Tools.IsFunction;
    //Inputs
    authService = input.required(...(ngDevMode ? [{ debugName: "authService" }] : /* istanbul ignore next */ []));
    staticNavigation = input([], ...(ngDevMode ? [{ debugName: "staticNavigation" }] : /* istanbul ignore next */ []));
    //Output
    onLogin = output();
    onRecoveryPassword = output();
    onUpdatePassword = output();
    onUpdateLanguage = output();
    onUpdateJWT = output();
    onClickToolbarMenu = output();
    //Start
    constructor() {
        if (Access.IsLogin()) {
            isLoadingSIGNAL.set(true);
            userSIGNAL.set(Access.GetUser());
            this.GetNavigation().then(() => isLoadingSIGNAL.set(false));
        }
        else
            Tools.Sleep().then(() => {
                if (!Tools.IsFunction(this.authService().Login)) {
                    this.Login();
                }
            });
    }
    /** */
    async Login(login) {
        if (login && Tools.IsFunction(this.authService().Login)) {
            const FUNCTION = this.authService().Login;
            const loginResponse = await FUNCTION(login);
            if (loginResponse.ok) {
                const access = this._coer91().SetAccess(loginResponse.data);
                if (access) {
                    this.GetNavigation();
                }
            }
            else {
                if (loginResponse.status < 500) {
                    this._coer91().alert.Warning(loginResponse.message, 'Not Access', 'iw-hand-stop-fill');
                }
                else {
                    console.error(loginResponse.message);
                    this._coer91().alert.Danger('Login');
                }
            }
            isLoadingSIGNAL.set(false);
            this.onLogin.emit(login);
        }
        else {
            const access = this._coer91().SetAccess(this.authService().Login);
            if (access) {
                this.GetNavigation();
            }
        }
    }
    /** */
    async GetNavigation() {
        this._navigation.set([]);
        await Tools.Sleep();
        if (!Tools.IsBooleanFalse(appSettings?.navigation?.static)) {
            this._navigation.set(this.staticNavigation());
        }
        else {
            if (Tools.IsFunction(this.authService()?.GetNavigation)) {
                const FUNCTION = this.authService().GetNavigation;
                const project = Number(appSettings?.appInfo?.id || 0);
                const response = await FUNCTION(project);
                if (response.ok)
                    this._navigation.set(response.data);
                else {
                    console.error(response.message);
                    this._coer91().alert.Danger('GetNavigation');
                }
            }
            else
                this._navigation.set(this.staticNavigation());
        }
    }
    /** */
    async RecoveryPassword(user) {
        if (Tools.IsFunction(this.authService()?.RecoveryPassword)) {
            const FUNCTION = this.authService().RecoveryPassword;
            isLoadingSIGNAL.set(true);
            const response = await FUNCTION(user);
            if (response.ok) {
                this._coer91().alert.Information(response.data.Password);
                this._coer91().Show('LOGIN');
            }
            else {
                this._coer91().alert.Warning(response.message);
                this._coer91().FocusUser();
            }
            isLoadingSIGNAL.set(false);
        }
        this.onRecoveryPassword.emit(user);
    }
    /** */
    async SetPassword(Password) {
        if (Tools.IsFunction(this.authService()?.SetPassword)) {
            const FUNCTION = this.authService().SetPassword;
            isLoadingSIGNAL.set(true);
            const User = userSIGNAL()?.User || '';
            const response = await FUNCTION({ User, Password });
            if (response.ok) {
                this._coer91().alert.Success(response.data, 'Change Password', 'iw-lock-fill');
                this._coer91().CloseModal();
            }
            else {
                this._coer91().alert.Warning(response.message, 'Change Password', 'iw-lock-fill');
            }
            isLoadingSIGNAL.set(false);
        }
        this.onUpdatePassword.emit(Password);
    }
    /** */
    async UpdateLanguage(language) {
        if (Tools.IsFunction(this.authService()?.SetLanguage)) {
            const FUNCTION = this.authService().SetLanguage;
            isLoadingSIGNAL.set(true);
            const response = await FUNCTION(language.Id);
            if (response.ok) {
                if (Tools.IsBooleanTrue(appSettings?.security?.useJWT)) {
                    await this.UpdateJWT();
                    Tools.Sleep(1000).then(() => console.log(Access.GetUser()));
                }
                else {
                    const ACCESS_USER = Access.GetUser();
                    ACCESS_USER.Language = response.data;
                    Access.SetUser({ ...ACCESS_USER });
                }
                userSIGNAL.set(Access.GetUser());
                this._coer91().CloseModal();
                this._coer91().alert.Success('The Language has been updated', language.Name);
                await this.GetNavigation();
                this._coer91().router.navigateByUrl(appSettings?.navigation?.redirectTo);
            }
            else {
                this._coer91().alert.Warning(response.message);
            }
            isLoadingSIGNAL.set(false);
        }
        this.onUpdateLanguage.emit(language);
    }
    /** */
    async UpdateJWT() {
        if (Tools.IsFunction(this.authService()?.UpdateJWT)) {
            const FUNCTION = this.authService().UpdateJWT;
            const JWT = await FUNCTION();
            if (JWT.ok)
                Access.SetUser(JWT.data);
            else {
                console.error(JWT.message);
                this._coer91().alert.Danger('UpdateJWT');
            }
        }
        this.onUpdateJWT.emit();
    }
    /** */
    ToolbarMenu(menu) {
        if (menu.label === 'Log Out') {
            if (!Tools.IsFunction(this.authService().Login)) {
                this.Login();
            }
        }
        this.onClickToolbarMenu.emit(menu);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WiaRoot, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "21.2.17", type: WiaRoot, isStandalone: false, selector: "wia-root", inputs: { authService: { classPropertyName: "authService", publicName: "authService", isSignal: true, isRequired: true, transformFunction: null }, staticNavigation: { classPropertyName: "staticNavigation", publicName: "staticNavigation", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onLogin: "onLogin", onRecoveryPassword: "onRecoveryPassword", onUpdatePassword: "onUpdatePassword", onUpdateLanguage: "onUpdateLanguage", onUpdateJWT: "onUpdateJWT", onClickToolbarMenu: "onClickToolbarMenu" }, viewQueries: [{ propertyName: "_coer91", first: true, predicate: ["WiaComponent"], descendants: true, isSignal: true }], ngImport: i0, template: `
        <wia-component
            #WiaComponent 
            [navigation]="_navigation()"  
            [toolbarShowUserData]="IsFunction(this.authService().Login)"
            [toolbarShowProfileMenu]="true"
            [toolbarShowPasswordMenu]="IsNotNull(authService().RecoveryPassword)"
            [toolbarShowLogOutMenu]="true" 
            (onLogin)="Login($event)"
            (onRecoveryPassword)="RecoveryPassword($event)"
            (onUpdatePassword)="SetPassword($event)"
            (onUpdateLanguage)="UpdateLanguage($event)"
            (onUpdateJWT)="UpdateJWT()"
            (onClickToolbarMenu)="ToolbarMenu($event)"
        ></wia-component>
    `, isInline: true, dependencies: [{ kind: "component", type: WiaComponent, selector: "wia-component", inputs: ["navigation", "toolbarMenu", "toolbarShowUserData", "toolbarShowProfileMenu", "toolbarPreventProfileMenu", "toolbarShowPasswordMenu", "toolbarPreventPasswordMenu", "toolbarShowLogOutMenu", "toolbarPreventLogOutMenu"], outputs: ["onLogin", "onRecoveryPassword", "onUpdateJWT", "onClickToolbarMenu", "onUpdatePassword", "onUpdateLanguage"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WiaRoot, decorators: [{
            type: Component,
            args: [{
                    selector: 'wia-root',
                    standalone: false,
                    template: `
        <wia-component
            #WiaComponent 
            [navigation]="_navigation()"  
            [toolbarShowUserData]="IsFunction(this.authService().Login)"
            [toolbarShowProfileMenu]="true"
            [toolbarShowPasswordMenu]="IsNotNull(authService().RecoveryPassword)"
            [toolbarShowLogOutMenu]="true" 
            (onLogin)="Login($event)"
            (onRecoveryPassword)="RecoveryPassword($event)"
            (onUpdatePassword)="SetPassword($event)"
            (onUpdateLanguage)="UpdateLanguage($event)"
            (onUpdateJWT)="UpdateJWT()"
            (onClickToolbarMenu)="ToolbarMenu($event)"
        ></wia-component>
    `
                }]
        }], ctorParameters: () => [], propDecorators: { _coer91: [{ type: i0.ViewChild, args: ['WiaComponent', { isSignal: true }] }], authService: [{ type: i0.Input, args: [{ isSignal: true, alias: "authService", required: true }] }], staticNavigation: [{ type: i0.Input, args: [{ isSignal: true, alias: "staticNavigation", required: false }] }], onLogin: [{ type: i0.Output, args: ["onLogin"] }], onRecoveryPassword: [{ type: i0.Output, args: ["onRecoveryPassword"] }], onUpdatePassword: [{ type: i0.Output, args: ["onUpdatePassword"] }], onUpdateLanguage: [{ type: i0.Output, args: ["onUpdateLanguage"] }], onUpdateJWT: [{ type: i0.Output, args: ["onUpdateJWT"] }], onClickToolbarMenu: [{ type: i0.Output, args: ["onClickToolbarMenu"] }] } });

//Modules
class CoreModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: CoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "21.2.17", ngImport: i0, type: CoreModule, declarations: [MenuPage,
            WiaComponent,
            WiaRoot,
            HomePage,
            LoginPage,
            Sidenav,
            SidenavAccordion,
            Toolbar], imports: [CommonModule,
            RouterModule,
            FormsModule,
            ReactiveFormsModule,
            ComponentsModule,
            DirectivesModule,
            PipesModule,
            CoerAlert], exports: [WiaRoot] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: CoreModule, imports: [CommonModule,
            RouterModule,
            FormsModule,
            ReactiveFormsModule,
            ComponentsModule,
            DirectivesModule,
            PipesModule,
            CoerAlert] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: CoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ComponentsModule,
                        DirectivesModule,
                        PipesModule,
                        CoerAlert
                    ],
                    declarations: [
                        MenuPage,
                        WiaComponent,
                        WiaRoot,
                        HomePage,
                        LoginPage,
                        Sidenav,
                        SidenavAccordion,
                        Toolbar,
                    ],
                    exports: [WiaRoot]
                }]
        }] });

/** */
const LoginGuard = () => {
    if (Access.IsLogin())
        return true;
    else {
        if (userSIGNAL()) {
            console.log(`Unathorized by login`);
            new CoerAlert().Danger('Login expired', 'Unathorized', 'iw-hand-stop-fill');
            Access.LogOut(userSIGNAL);
        }
        return false;
    }
};
/** */
const ActiveKeyGuard = async ({ data }, { url }) => {
    const ACTIVE_KEY = `${data['activeKey'] || ''}`.toUpperCase();
    if (Tools.IsNotOnlyWhiteSpace(ACTIVE_KEY)) {
        let attempts = 60;
        let navigationKeys = [];
        const showHome = !Tools.IsBooleanFalse(appSettings?.navigation?.showHome);
        do {
            navigationKeys = Array.from(GetNavigationKeys().values());
            if (navigationKeys.length > (showHome ? 1 : 0))
                break;
            else {
                isLoadingSIGNAL.set(true);
                await Tools.Sleep(1000);
            }
        } while (--attempts > 0);
        isLoadingSIGNAL.set(false);
        if (navigationKeys.map(x => x.activeKey).includes(ACTIVE_KEY))
            return true;
        else {
            console.log(`Unathorized by path ${url}`);
            new CoerAlert().Danger('You do not have authorization for this section', 'Unathorized', 'iw-hand-stop-fill');
            let redirectTo = String(appSettings?.navigation?.redirectTo || '/home');
            if (!redirectTo.startsWith('/'))
                redirectTo = `/${redirectTo}`;
            if (document.location.href.includes('#')) {
                document.location.href = `/#${redirectTo}`;
            }
            else
                document.location.href = `/${redirectTo}`;
            return false;
        }
    }
    return true;
};
/** */
const ROUTER_PAGE = (path, component, activeKey = '') => {
    return {
        path,
        component,
        data: { activeKey, GetNavigationKeys },
        canActivate: [LoginGuard, ActiveKeyGuard]
    };
};
/** */
const ROUTES_WIA = []
    .concat([ROUTER_PAGE('menu', MenuPage)])
    .concat(!Tools.IsBooleanFalse(appSettings?.navigation?.showHome) ? [ROUTER_PAGE('home', HomePage)] : [])
    .concat([{ path: '**', redirectTo: (Tools.IsNotOnlyWhiteSpace(appSettings?.navigation?.redirectTo) ? appSettings?.navigation?.redirectTo : 'home') }]);
/** */
const GetNavigationKeys = () => {
    const NAVIGATION_KEYS = new Map();
    for (const LV1 of navigationSIGNAL()) {
        //Level 1
        if (Tools.IsNotOnlyWhiteSpace(LV1?.Path) && !NAVIGATION_KEYS.has(LV1.Path)) {
            NAVIGATION_KEYS.set(LV1.Path, {
                activeKey: (Tools.IsNotOnlyWhiteSpace(LV1.ActiveKey) ? `${LV1.ActiveKey}`.toUpperCase() : ''),
                canCreate: Tools.IsBooleanTrue(LV1?.CanCreate),
                canUpdate: Tools.IsBooleanTrue(LV1?.CanUpdate),
                canDelete: Tools.IsBooleanTrue(LV1?.CanDelete)
            });
        }
        else if (Tools.IsNotNull(LV1.Items)) {
            for (const LV2 of LV1.Items) {
                //Level 2
                if (Tools.IsNotOnlyWhiteSpace(LV2?.Path) && !NAVIGATION_KEYS.has(LV2.Path)) {
                    NAVIGATION_KEYS.set(LV2.Path, {
                        activeKey: (Tools.IsNotOnlyWhiteSpace(LV2.ActiveKey) ? `${LV2.ActiveKey}`.toUpperCase() : ''),
                        canCreate: Tools.IsBooleanTrue(LV2?.CanCreate),
                        canUpdate: Tools.IsBooleanTrue(LV2?.CanUpdate),
                        canDelete: Tools.IsBooleanTrue(LV2?.CanDelete)
                    });
                }
                else if (Tools.IsNotNull(LV2.Items)) {
                    for (const LV3 of LV2.Items) {
                        //Level 3
                        if (Tools.IsNotOnlyWhiteSpace(LV3?.Path) && !NAVIGATION_KEYS.has(LV3.Path)) {
                            NAVIGATION_KEYS.set(LV3.Path, {
                                activeKey: (Tools.IsNotOnlyWhiteSpace(LV3.ActiveKey) ? `${LV3.ActiveKey}`.toUpperCase() : ''),
                                canCreate: Tools.IsBooleanTrue(LV3?.CanCreate),
                                canUpdate: Tools.IsBooleanTrue(LV3?.CanUpdate),
                                canDelete: Tools.IsBooleanTrue(LV3?.CanDelete)
                            });
                        }
                    }
                }
            }
        }
    }
    return NAVIGATION_KEYS;
};

/**
 * Generated bundle index. Do not edit.
 */

export { ActiveKeyGuard, CoreModule, GetNavigationKeys, LoginGuard, ROUTER_PAGE, ROUTES_WIA, WiaRoot };
//# sourceMappingURL=hwmx-angular-core.mjs.map
