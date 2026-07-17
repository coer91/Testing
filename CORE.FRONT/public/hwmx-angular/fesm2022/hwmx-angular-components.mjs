import * as i0 from '@angular/core';
import { input, output, computed, Component, signal, inject, effect, viewChild, viewChildren, contentChildren, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import * as i2$1 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateRefDirective, DirectivesModule } from 'hwmx-angular/directives';
import * as i2$2 from 'hwmx-angular/pipes';
import { PipesModule } from 'hwmx-angular/pipes';
import { screenSizeSIGNAL, isLoadingSIGNAL } from 'hwmx-angular/signals';
import { Tools, HTMLElements, ControlValue, Translatory, CONTROL_VALUE, CoerAlert, Numbers, Collections, Dates, Files, Strings, Navigation } from 'hwmx-angular/tools';

class WIAButton {
    //Variables
    _id = Tools.GetGuid("coer-button");
    IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    _htmlElement;
    //Inputs
    label = input('', ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    type = input('filled', ...(ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
    color = input('primary', ...(ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []));
    icon = input('', ...(ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []));
    path = input('', ...(ngDevMode ? [{ debugName: "path" }] : /* istanbul ignore next */ []));
    iconPosition = input('left', ...(ngDevMode ? [{ debugName: "iconPosition" }] : /* istanbul ignore next */ []));
    isLoading = input(false, ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    isReadonly = input(false, ...(ngDevMode ? [{ debugName: "isReadonly" }] : /* istanbul ignore next */ []));
    isInvisible = input(false, ...(ngDevMode ? [{ debugName: "isInvisible" }] : /* istanbul ignore next */ []));
    isHidden = input(false, ...(ngDevMode ? [{ debugName: "isHidden" }] : /* istanbul ignore next */ []));
    breakpoints = input({}, ...(ngDevMode ? [{ debugName: "breakpoints" }] : /* istanbul ignore next */ []));
    width = input('100px', ...(ngDevMode ? [{ debugName: "width" }] : /* istanbul ignore next */ []));
    minWidth = input('20px', ...(ngDevMode ? [{ debugName: "minWidth" }] : /* istanbul ignore next */ []));
    maxWidth = input('100%', ...(ngDevMode ? [{ debugName: "maxWidth" }] : /* istanbul ignore next */ []));
    height = input('40px', ...(ngDevMode ? [{ debugName: "height" }] : /* istanbul ignore next */ []));
    minHeight = input('20px', ...(ngDevMode ? [{ debugName: "minHeight" }] : /* istanbul ignore next */ []));
    maxHeight = input('40px', ...(ngDevMode ? [{ debugName: "maxHeight" }] : /* istanbul ignore next */ []));
    marginTop = input('0px', ...(ngDevMode ? [{ debugName: "marginTop" }] : /* istanbul ignore next */ []));
    marginRight = input('0px', ...(ngDevMode ? [{ debugName: "marginRight" }] : /* istanbul ignore next */ []));
    marginBottom = input('0px', ...(ngDevMode ? [{ debugName: "marginBottom" }] : /* istanbul ignore next */ []));
    marginLeft = input('0px', ...(ngDevMode ? [{ debugName: "marginLeft" }] : /* istanbul ignore next */ []));
    //Output
    onClick = output();
    onDestroy = output();
    onReady = output();
    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep();
        this._htmlElement = HTMLElements.SelectElementById(this._id);
        this._htmlElement?.addEventListener('focus', this._onFocus);
        this.onReady?.emit();
    }
    //OnDestroy
    ngOnDestroy() {
        this.onReady = null;
        this._htmlElement?.removeEventListener('focus', this._onFocus);
        this.onDestroy.emit();
    }
    //event
    _onFocus = () => {
        if (!this._isEnabled)
            this.Blur();
    };
    //Computed
    _label = computed(() => {
        if (['filled', 'outline'].includes(this._breakpointType())) {
            if (this.isLoading())
                return 'Loading';
            return this.label().length <= 0 ? 'Click' : this.label();
        }
        return '';
    }, ...(ngDevMode ? [{ debugName: "_label" }] : /* istanbul ignore next */ []));
    //Computed
    _color = computed(() => {
        let background = 'background-color-transparent';
        if (this.isInvisible())
            background = 'background-color-transparent';
        else if (this.isLoading())
            background = 'background-color-loading animation-fade';
        else if (this.isReadonly())
            background = 'background-color-readonly';
        else if (['filled', 'icon-filled', 'icon-filled-rounded'].includes(this._breakpointType())) {
            background = `background-color-${this.color()}`;
        }
        let color = `color-${this.color()}`;
        if (this.isInvisible())
            color = 'color-transparent';
        else if (this.isLoading() || this.isReadonly())
            color = 'color-gray';
        else if (['filled', 'icon-filled', 'icon-filled-rounded'].includes(this._breakpointType())) {
            color = ['warning', 'light'].includes(this.color()) ? 'color-dark' : 'color-light';
        }
        return `${background} ${color}` + (this._isEnabled() ? ` button-focus-${this.color()} button-hover-${this.color()}` : '');
    }, ...(ngDevMode ? [{ debugName: "_color" }] : /* istanbul ignore next */ []));
    //Computed
    _isEnabled = computed(() => {
        return !this.isLoading() && !this.isReadonly() && !this.isInvisible() && !this.isHidden();
    }, ...(ngDevMode ? [{ debugName: "_isEnabled" }] : /* istanbul ignore next */ []));
    //Computed
    _cursor = computed(() => {
        return this._isEnabled() ? 'pointer' : (this.isLoading() ? 'wait' : 'default');
    }, ...(ngDevMode ? [{ debugName: "_cursor" }] : /* istanbul ignore next */ []));
    //computed
    _breakpointWidth = computed(() => {
        switch (screenSizeSIGNAL().breakpoint) {
            case 'mv': return this.breakpoints().width?.mv || this.width();
            case 'xs': return this.breakpoints().width?.xs || this.width();
            case 'sm': return this.breakpoints().width?.sm || this.width();
            case 'md': return this.breakpoints().width?.md || this.width();
            case 'lg': return this.breakpoints().width?.lg || this.width();
            case 'xl': return this.breakpoints().width?.xl || this.width();
            case 'xxl': return this.breakpoints().width?.xxl || this.width();
            default: return this.width();
        }
    }, ...(ngDevMode ? [{ debugName: "_breakpointWidth" }] : /* istanbul ignore next */ []));
    //Computed
    _width = computed(() => {
        return ['filled', 'outline'].includes(this._breakpointType())
            ? this._breakpointWidth()
            : this.height();
    }, ...(ngDevMode ? [{ debugName: "_width" }] : /* istanbul ignore next */ []));
    //Computed
    _path = computed(() => {
        return Tools.IsNotOnlyWhiteSpace(this.path()) ? this.path() : null;
    }, ...(ngDevMode ? [{ debugName: "_path" }] : /* istanbul ignore next */ []));
    //Computed
    _iconPosition = computed(() => {
        return this.isLoading() ? 'right' : this.iconPosition();
    }, ...(ngDevMode ? [{ debugName: "_iconPosition" }] : /* istanbul ignore next */ []));
    //Computed
    _icon = computed(() => {
        if (this.isLoading() && ['filled', 'outline'].includes(this._breakpointType()))
            return 'iw-arrows-rotate animation-spin animation-speed-15';
        if (Tools.IsOnlyWhiteSpace(this.icon()) && !['filled', 'outline'].includes(this._breakpointType()))
            return 'iw-hand-pointer-fill';
        return Tools.GetDefaultIcon(this.icon());
    }, ...(ngDevMode ? [{ debugName: "_icon" }] : /* istanbul ignore next */ []));
    //computed
    _breakpointType = computed(() => {
        switch (screenSizeSIGNAL().breakpoint) {
            case 'mv': return this.breakpoints().type?.mv || this.type();
            case 'xs': return this.breakpoints().type?.xs || this.type();
            case 'sm': return this.breakpoints().type?.sm || this.type();
            case 'md': return this.breakpoints().type?.md || this.type();
            case 'lg': return this.breakpoints().type?.lg || this.type();
            case 'xl': return this.breakpoints().type?.xl || this.type();
            case 'xxl': return this.breakpoints().type?.xxl || this.type();
            default: return this.type();
        }
    }, ...(ngDevMode ? [{ debugName: "_breakpointType" }] : /* istanbul ignore next */ []));
    //Function
    _Click(event) {
        event?.preventDefault();
        this.Blur();
        if (this._isEnabled())
            this.onClick.emit();
    }
    /** Press the button logically */
    Click() {
        Tools.Sleep().then(() => this._Click(null));
    }
    /** Focus on the button */
    Focus(delay = 0) {
        Tools.Sleep(delay).then(() => {
            if (this._isEnabled()) {
                this._htmlElement?.focus();
            }
            else
                this.Blur();
        });
    }
    /** Blur the button */
    Blur() {
        this._htmlElement?.blur();
    }
    /** Scroll to the element */
    ScrollToElement() {
        HTMLElements.ScrollToElement(this._htmlElement);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIAButton, isStandalone: false, selector: "wia-button", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, path: { classPropertyName: "path", publicName: "path", isSignal: true, isRequired: false, transformFunction: null }, iconPosition: { classPropertyName: "iconPosition", publicName: "iconPosition", isSignal: true, isRequired: false, transformFunction: null }, isLoading: { classPropertyName: "isLoading", publicName: "isLoading", isSignal: true, isRequired: false, transformFunction: null }, isReadonly: { classPropertyName: "isReadonly", publicName: "isReadonly", isSignal: true, isRequired: false, transformFunction: null }, isInvisible: { classPropertyName: "isInvisible", publicName: "isInvisible", isSignal: true, isRequired: false, transformFunction: null }, isHidden: { classPropertyName: "isHidden", publicName: "isHidden", isSignal: true, isRequired: false, transformFunction: null }, breakpoints: { classPropertyName: "breakpoints", publicName: "breakpoints", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, minWidth: { classPropertyName: "minWidth", publicName: "minWidth", isSignal: true, isRequired: false, transformFunction: null }, maxWidth: { classPropertyName: "maxWidth", publicName: "maxWidth", isSignal: true, isRequired: false, transformFunction: null }, height: { classPropertyName: "height", publicName: "height", isSignal: true, isRequired: false, transformFunction: null }, minHeight: { classPropertyName: "minHeight", publicName: "minHeight", isSignal: true, isRequired: false, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: false, transformFunction: null }, marginTop: { classPropertyName: "marginTop", publicName: "marginTop", isSignal: true, isRequired: false, transformFunction: null }, marginRight: { classPropertyName: "marginRight", publicName: "marginRight", isSignal: true, isRequired: false, transformFunction: null }, marginBottom: { classPropertyName: "marginBottom", publicName: "marginBottom", isSignal: true, isRequired: false, transformFunction: null }, marginLeft: { classPropertyName: "marginLeft", publicName: "marginLeft", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onClick: "onClick", onDestroy: "onDestroy", onReady: "onReady" }, ngImport: i0, template: "<a class=\"coer-button\" (click)=\"_Click($event)\" [routerLink]=\"_path()\" \r\n    [ngStyle]=\"{ \r\n        'width'        : _width(),\r\n        'min-width'    : minWidth(),\r\n        'max-width'    : maxWidth(),\r\n        'height'       : height(),\r\n        'min-height'   : minHeight(),\r\n        'max-height'   : maxHeight(),      \r\n        'margin-top'   : marginTop(),\r\n        'margin-right' : marginRight(),\r\n        'margin-bottom': marginBottom(),\r\n        'margin-left'  : marginLeft(),\r\n        'display'      : (isHidden()    ? 'none'   : 'inline-block'),\r\n        'visibility'   : (isInvisible() ? 'hidden' : 'visible'     )    \r\n    }\">\r\n\r\n    <button \r\n        [id]=\"_id\"\r\n        type=\"button\"\r\n        [class]=\"`${_color()}`\" \r\n        [ngStyle]=\"{ \r\n            'border'        : (_isEnabled() && ['outline', 'icon-outline', 'icon-outline-rounded'].includes(_breakpointType()) ? '2px solid' : 'none'),\r\n            'border-radius' : (['icon-rounded', 'icon-filled-rounded', 'icon-outline-rounded'].includes(_breakpointType()) ? '25px' : '5px'),\r\n            'cursor'        : _cursor(),      \r\n        }\"\r\n    >\r\n        <span class=\"label-container\">\r\n            @if(IsNotOnlyWhiteSpace(_icon()) && _iconPosition() === 'left') {\r\n                <i [class]=\"_icon()\"></i> \r\n            }\r\n            \r\n            @if(['filled', 'outline'].includes(_breakpointType())) {\r\n                <span>{{ _label() }}</span> \r\n            }\r\n            \r\n            @if(IsNotOnlyWhiteSpace(_icon()) && _iconPosition() === 'right') {\r\n                <i [class]=\"_icon()\"></i> \r\n            }\r\n        </span> \r\n    </button>\r\n</a>  ", styles: ["a.coer-button button{width:100%!important;height:100%!important;padding:5px!important;display:flex!important;align-items:center!important;justify-content:center!important}a.coer-button button span.label-container{display:inherit!important;align-items:inherit!important;justify-content:inherit!important}a.coer-button button span.label-container span{font-size:18px!important}a.coer-button button.button-hover-primary:hover{box-shadow:0 0 10px 0 var(--primary)!important}a.coer-button button.button-focus-primary:focus{box-shadow:0 0 10px 3px var(--primary)!important;outline:3px double var(--primary)!important}a.coer-button button.button-hover-secondary:hover{box-shadow:0 0 10px 0 var(--secondary)!important}a.coer-button button.button-focus-secondary:focus{box-shadow:0 0 10px 3px var(--secondary)!important;outline:3px double var(--secondary)!important}a.coer-button button.button-hover-success:hover{box-shadow:0 0 10px 0 var(--success)!important}a.coer-button button.button-focus-success:focus{box-shadow:0 0 10px 3px var(--success)!important;outline:3px double var(--success)!important}a.coer-button button.button-hover-warning:hover{box-shadow:0 0 10px 0 var(--warning)!important}a.coer-button button.button-focus-warning:focus{box-shadow:0 0 10px 3px var(--warning)!important;outline:3px double var(--warning)!important}a.coer-button button.button-hover-danger:hover{box-shadow:0 0 10px 0 var(--danger)!important}a.coer-button button.button-focus-danger:focus{box-shadow:0 0 10px 3px var(--danger)!important;outline:3px double var(--danger)!important}a.coer-button button.button-hover-navigation:hover{box-shadow:0 0 10px 0 var(--navigation)!important}a.coer-button button.button-focus-navigation:focus{box-shadow:0 0 10px 3px var(--navigation)!important;outline:3px double var(--navigation)!important}a.coer-button button.button-hover-information:hover{box-shadow:0 0 10px 0 var(--information)!important}a.coer-button button.button-focus-information:focus{box-shadow:0 0 10px 3px var(--information)!important;outline:3px double var(--information)!important}a.coer-button button.button-hover-dark:hover{box-shadow:0 0 10px 0 var(--dark)!important}a.coer-button button.button-focus-dark:focus{box-shadow:0 0 10px 3px var(--dark)!important;outline:3px double var(--dark)!important}a.coer-button button.button-hover-light:hover{box-shadow:0 0 10px 0 var(--light)!important}a.coer-button button.button-focus-light:focus{box-shadow:0 0 10px 3px var(--light)!important;outline:3px double var(--light)!important}\n"], dependencies: [{ kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAButton, decorators: [{
            type: Component,
            args: [{ selector: 'wia-button', standalone: false, template: "<a class=\"coer-button\" (click)=\"_Click($event)\" [routerLink]=\"_path()\" \r\n    [ngStyle]=\"{ \r\n        'width'        : _width(),\r\n        'min-width'    : minWidth(),\r\n        'max-width'    : maxWidth(),\r\n        'height'       : height(),\r\n        'min-height'   : minHeight(),\r\n        'max-height'   : maxHeight(),      \r\n        'margin-top'   : marginTop(),\r\n        'margin-right' : marginRight(),\r\n        'margin-bottom': marginBottom(),\r\n        'margin-left'  : marginLeft(),\r\n        'display'      : (isHidden()    ? 'none'   : 'inline-block'),\r\n        'visibility'   : (isInvisible() ? 'hidden' : 'visible'     )    \r\n    }\">\r\n\r\n    <button \r\n        [id]=\"_id\"\r\n        type=\"button\"\r\n        [class]=\"`${_color()}`\" \r\n        [ngStyle]=\"{ \r\n            'border'        : (_isEnabled() && ['outline', 'icon-outline', 'icon-outline-rounded'].includes(_breakpointType()) ? '2px solid' : 'none'),\r\n            'border-radius' : (['icon-rounded', 'icon-filled-rounded', 'icon-outline-rounded'].includes(_breakpointType()) ? '25px' : '5px'),\r\n            'cursor'        : _cursor(),      \r\n        }\"\r\n    >\r\n        <span class=\"label-container\">\r\n            @if(IsNotOnlyWhiteSpace(_icon()) && _iconPosition() === 'left') {\r\n                <i [class]=\"_icon()\"></i> \r\n            }\r\n            \r\n            @if(['filled', 'outline'].includes(_breakpointType())) {\r\n                <span>{{ _label() }}</span> \r\n            }\r\n            \r\n            @if(IsNotOnlyWhiteSpace(_icon()) && _iconPosition() === 'right') {\r\n                <i [class]=\"_icon()\"></i> \r\n            }\r\n        </span> \r\n    </button>\r\n</a>  ", styles: ["a.coer-button button{width:100%!important;height:100%!important;padding:5px!important;display:flex!important;align-items:center!important;justify-content:center!important}a.coer-button button span.label-container{display:inherit!important;align-items:inherit!important;justify-content:inherit!important}a.coer-button button span.label-container span{font-size:18px!important}a.coer-button button.button-hover-primary:hover{box-shadow:0 0 10px 0 var(--primary)!important}a.coer-button button.button-focus-primary:focus{box-shadow:0 0 10px 3px var(--primary)!important;outline:3px double var(--primary)!important}a.coer-button button.button-hover-secondary:hover{box-shadow:0 0 10px 0 var(--secondary)!important}a.coer-button button.button-focus-secondary:focus{box-shadow:0 0 10px 3px var(--secondary)!important;outline:3px double var(--secondary)!important}a.coer-button button.button-hover-success:hover{box-shadow:0 0 10px 0 var(--success)!important}a.coer-button button.button-focus-success:focus{box-shadow:0 0 10px 3px var(--success)!important;outline:3px double var(--success)!important}a.coer-button button.button-hover-warning:hover{box-shadow:0 0 10px 0 var(--warning)!important}a.coer-button button.button-focus-warning:focus{box-shadow:0 0 10px 3px var(--warning)!important;outline:3px double var(--warning)!important}a.coer-button button.button-hover-danger:hover{box-shadow:0 0 10px 0 var(--danger)!important}a.coer-button button.button-focus-danger:focus{box-shadow:0 0 10px 3px var(--danger)!important;outline:3px double var(--danger)!important}a.coer-button button.button-hover-navigation:hover{box-shadow:0 0 10px 0 var(--navigation)!important}a.coer-button button.button-focus-navigation:focus{box-shadow:0 0 10px 3px var(--navigation)!important;outline:3px double var(--navigation)!important}a.coer-button button.button-hover-information:hover{box-shadow:0 0 10px 0 var(--information)!important}a.coer-button button.button-focus-information:focus{box-shadow:0 0 10px 3px var(--information)!important;outline:3px double var(--information)!important}a.coer-button button.button-hover-dark:hover{box-shadow:0 0 10px 0 var(--dark)!important}a.coer-button button.button-focus-dark:focus{box-shadow:0 0 10px 3px var(--dark)!important;outline:3px double var(--dark)!important}a.coer-button button.button-hover-light:hover{box-shadow:0 0 10px 0 var(--light)!important}a.coer-button button.button-focus-light:focus{box-shadow:0 0 10px 3px var(--light)!important;outline:3px double var(--light)!important}\n"] }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }], color: [{ type: i0.Input, args: [{ isSignal: true, alias: "color", required: false }] }], icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: false }] }], path: [{ type: i0.Input, args: [{ isSignal: true, alias: "path", required: false }] }], iconPosition: [{ type: i0.Input, args: [{ isSignal: true, alias: "iconPosition", required: false }] }], isLoading: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoading", required: false }] }], isReadonly: [{ type: i0.Input, args: [{ isSignal: true, alias: "isReadonly", required: false }] }], isInvisible: [{ type: i0.Input, args: [{ isSignal: true, alias: "isInvisible", required: false }] }], isHidden: [{ type: i0.Input, args: [{ isSignal: true, alias: "isHidden", required: false }] }], breakpoints: [{ type: i0.Input, args: [{ isSignal: true, alias: "breakpoints", required: false }] }], width: [{ type: i0.Input, args: [{ isSignal: true, alias: "width", required: false }] }], minWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "minWidth", required: false }] }], maxWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxWidth", required: false }] }], height: [{ type: i0.Input, args: [{ isSignal: true, alias: "height", required: false }] }], minHeight: [{ type: i0.Input, args: [{ isSignal: true, alias: "minHeight", required: false }] }], maxHeight: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxHeight", required: false }] }], marginTop: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginTop", required: false }] }], marginRight: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginRight", required: false }] }], marginBottom: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginBottom", required: false }] }], marginLeft: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginLeft", required: false }] }], onClick: [{ type: i0.Output, args: ["onClick"] }], onDestroy: [{ type: i0.Output, args: ["onDestroy"] }], onReady: [{ type: i0.Output, args: ["onReady"] }] } });

class WIATextBox extends ControlValue {
    //Variables
    _isFocused = signal(false, ...(ngDevMode ? [{ debugName: "_isFocused" }] : /* istanbul ignore next */ []));
    _isHoverElement = signal(false, ...(ngDevMode ? [{ debugName: "_isHoverElement" }] : /* istanbul ignore next */ []));
    _htmlElement = null;
    _htmlElementContainer = null;
    //secretbox
    _isSecretComponent = signal(false, ...(ngDevMode ? [{ debugName: "_isSecretComponent" }] : /* istanbul ignore next */ []));
    _showSecret = signal(true, ...(ngDevMode ? [{ debugName: "_showSecret" }] : /* istanbul ignore next */ []));
    //numberbox
    _isNumberComponent = signal(false, ...(ngDevMode ? [{ debugName: "_isNumberComponent" }] : /* istanbul ignore next */ []));
    _showStepIcon = signal(false, ...(ngDevMode ? [{ debugName: "_showStepIcon" }] : /* istanbul ignore next */ []));
    //selectbox
    _isSelectComponent = signal(false, ...(ngDevMode ? [{ debugName: "_isSelectComponent" }] : /* istanbul ignore next */ []));
    _dataSource = signal([], ...(ngDevMode ? [{ debugName: "_dataSource" }] : /* istanbul ignore next */ []));
    _isCollapsed = signal(true, ...(ngDevMode ? [{ debugName: "_isCollapsed" }] : /* istanbul ignore next */ []));
    _index = signal(-1, ...(ngDevMode ? [{ debugName: "_index" }] : /* istanbul ignore next */ []));
    _search = signal('', ...(ngDevMode ? [{ debugName: "_search" }] : /* istanbul ignore next */ []));
    //Input  
    placeholder = input('', ...(ngDevMode ? [{ debugName: "placeholder" }] : /* istanbul ignore next */ []));
    selectOnFocus = input(false, ...(ngDevMode ? [{ debugName: "selectOnFocus" }] : /* istanbul ignore next */ []));
    textPosition = input('left', ...(ngDevMode ? [{ debugName: "textPosition" }] : /* istanbul ignore next */ []));
    minLength = input(0, ...(ngDevMode ? [{ debugName: "minLength" }] : /* istanbul ignore next */ []));
    maxLength = input(50, ...(ngDevMode ? [{ debugName: "maxLength" }] : /* istanbul ignore next */ []));
    showClearButton = input(false, ...(ngDevMode ? [{ debugName: "showClearButton" }] : /* istanbul ignore next */ []));
    showSearchButton = input(false, ...(ngDevMode ? [{ debugName: "showSearchButton" }] : /* istanbul ignore next */ []));
    externalButtons = input(...(ngDevMode ? [undefined, { debugName: "externalButtons" }] : /* istanbul ignore next */ []));
    size = input('normal', ...(ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
    width = input('100%', ...(ngDevMode ? [{ debugName: "width" }] : /* istanbul ignore next */ []));
    minWidth = input('100px', ...(ngDevMode ? [{ debugName: "minWidth" }] : /* istanbul ignore next */ []));
    maxWidth = input('100%', ...(ngDevMode ? [{ debugName: "maxWidth" }] : /* istanbul ignore next */ []));
    //Output     
    onKeyupEnter = output();
    onClickClear = output();
    onClickSearch = output();
    onClickLeft = output();
    onClickRight = output();
    /** Sets the value of the component */
    _SetValue(value) {
        if (Tools.IsNull(value))
            value == '';
        super._SetValue(value);
    }
    //Start
    async Start() {
        this._htmlElement = HTMLElements.SelectElementById(this._id);
        this._htmlElement?.addEventListener('keyup', this._onKeyup);
        this._htmlElement?.addEventListener('keydown', this._onKeydown);
        this._htmlElement?.addEventListener('paste', this._onPaste);
        this._htmlElement?.addEventListener('focus', this._onFocus);
        this._htmlElement?.addEventListener('blur', this._onBlur);
        this._htmlElementContainer = HTMLElements.SelectElementById(`${this._id}-container`);
        this._htmlElementContainer?.addEventListener('mouseenter', this._onMouseEnter);
        this._htmlElementContainer?.addEventListener('mouseleave', this._onMouseLeave);
    }
    //Destroy
    Destructor() {
        super.Destructor();
        this._htmlElement?.removeEventListener('keyup', this._onKeyup);
        this._htmlElement?.removeEventListener('keydown', this._onKeydown);
        this._htmlElement?.removeEventListener('paste', this._onPaste);
        this._htmlElement?.removeEventListener('focus', this._onFocus);
        this._htmlElement?.removeEventListener('blur', this._onBlur);
        this._htmlElementContainer?.removeEventListener('mouseenter', this._onMouseEnter);
        this._htmlElementContainer?.removeEventListener('mouseleave', this._onMouseLeave);
    }
    //Function
    _onMouseEnter = () => this._isHoverElement.set(true);
    //Function
    _onMouseLeave = () => this._isHoverElement.set(false);
    //Function
    _onKeyup = (event) => {
        if (!this._isEnabled())
            return;
        if (event.key === 'Enter') {
            this.onKeyupEnter.emit(this._value());
            this.Blur();
        }
    };
    //Function
    _onKeydown = (event) => { event; };
    //Function
    _onPaste = () => {
        Tools.Sleep().then(() => this._SetValue(String(this._value()).trim()));
    };
    //Function
    _onFocus = () => {
        if (this._isEnabled()) {
            if (this.selectOnFocus() === true)
                this._htmlElement?.select();
            this._isFocused.set(true);
        }
        else
            this.Blur();
    };
    //Function
    _onBlur = () => this.Blur();
    //Computed
    _inputType = computed(() => 'text', ...(ngDevMode ? [{ debugName: "_inputType" }] : /* istanbul ignore next */ []));
    //Computed
    _showExternalButtonLeft = computed(() => {
        return Tools.IsBooleanTrue(this.externalButtons()?.showLeft)
            && this.isLoading() === false
            && this.isInvisible() === false
            && this.isHidden() === false;
    }, ...(ngDevMode ? [{ debugName: "_showExternalButtonLeft" }] : /* istanbul ignore next */ []));
    //Computed
    _showExternalButtonRight = computed(() => {
        return Tools.IsBooleanTrue(this.externalButtons()?.showRight)
            && this.isLoading() === false
            && this.isInvisible() === false
            && this.isHidden() === false;
    }, ...(ngDevMode ? [{ debugName: "_showExternalButtonRight" }] : /* istanbul ignore next */ []));
    //Computed
    _left = computed(() => {
        return this._showExternalButtonLeft() ? '40px' : '0px';
    }, ...(ngDevMode ? [{ debugName: "_left" }] : /* istanbul ignore next */ []));
    //Computed
    _right = computed(() => {
        return this._showExternalButtonRight() ? '40px' : '0px';
    }, ...(ngDevMode ? [{ debugName: "_right" }] : /* istanbul ignore next */ []));
    //Computed
    _showSecretClosed = computed(() => {
        return this._isSecretComponent() && this._showSecret();
    }, ...(ngDevMode ? [{ debugName: "_showSecretClosed" }] : /* istanbul ignore next */ []));
    //Computed
    _showSecretOpen = computed(() => {
        return this._isSecretComponent() && !this._showSecret();
    }, ...(ngDevMode ? [{ debugName: "_showSecretOpen" }] : /* istanbul ignore next */ []));
    //Computed
    _paddingLeft = computed(() => '10px', ...(ngDevMode ? [{ debugName: "_paddingLeft" }] : /* istanbul ignore next */ []));
    //Computed
    _paddingRight = computed(() => {
        let padding = 10;
        if (this._showClearButton()
            || this._showSearchButton()
            || this._showSecretClosed()
            || this._showSecretOpen())
            padding += 20;
        if (this.isValid() || this.isInvalid())
            padding += 20;
        if (this._isSelectComponent())
            padding += 20;
        else if (this._isNumberComponent() && this._showStepIcon())
            padding += 20;
        if (padding == 30)
            padding += 5;
        if (padding == 50)
            padding += 10;
        if (padding == 70)
            padding += 15;
        return `${padding}px`;
    }, ...(ngDevMode ? [{ debugName: "_paddingRight" }] : /* istanbul ignore next */ []));
    //Computed
    _widtht = computed(() => {
        let width = 0;
        if (this._showExternalButtonLeft())
            width += 40;
        if (this._showExternalButtonRight())
            width += 40;
        width += Number(this._paddingLeft().split('px')[0]);
        width += Number(this._paddingRight().split('px')[0]);
        return `calc(${this.width()} - ${width}px)`;
    }, ...(ngDevMode ? [{ debugName: "_widtht" }] : /* istanbul ignore next */ []));
    //Computed
    _label = computed(() => {
        return Tools.IsNotOnlyWhiteSpace(this.label())
            ? Translatory.Label(this.label(), this.translatory())
            : Translatory.Label(this.placeholder(), this.translatory());
    }, ...(ngDevMode ? [{ debugName: "_label" }] : /* istanbul ignore next */ []));
    //Computed
    _showLabel = computed(() => {
        return Tools.IsNotOnlyWhiteSpace(this.label()) || (Tools.IsNotOnlyWhiteSpace(this.placeholder()) && Tools.IsOnlyWhiteSpace(this._value()));
    }, ...(ngDevMode ? [{ debugName: "_showLabel" }] : /* istanbul ignore next */ []));
    //Computed
    _showClearButton = computed(() => {
        return this.showClearButton()
            && this._isEnabled()
            && this.IsNotOnlyWhiteSpace(this._value());
    }, ...(ngDevMode ? [{ debugName: "_showClearButton" }] : /* istanbul ignore next */ []));
    //Computed
    _showSearchButton = computed(() => {
        return this.showSearchButton()
            && !this._showClearButton()
            && this._isEnabled();
    }, ...(ngDevMode ? [{ debugName: "_showSearchButton" }] : /* istanbul ignore next */ []));
    //Function
    _ClickSearch() {
        if (Tools.IsOnlyWhiteSpace(this._value())) {
            this.Focus();
        }
        else
            this.Blur();
        this.onClickSearch.emit(this._value());
    }
    //Computed
    _ValueByComponent = computed(() => this._value(), ...(ngDevMode ? [{ debugName: "_ValueByComponent" }] : /* istanbul ignore next */ []));
    //Function
    _Input = (value) => this._SetValue(value);
    //Computed
    isFocused = computed(() => this._isFocused(), ...(ngDevMode ? [{ debugName: "isFocused" }] : /* istanbul ignore next */ []));
    /** */
    Clear() {
        this._SetValue('');
        this.Focus(false);
        this.onClickClear.emit();
    }
    /** */
    Focus(select = false) {
        if (this._isEnabled()) {
            Tools.Sleep().then(() => {
                this._htmlElement?.focus();
                if (select)
                    this._htmlElement?.select();
            });
        }
        else
            this.Blur();
    }
    /** */
    Blur() {
        this._htmlElement?.blur();
        this._isFocused.set(false);
        if (!this.isTouched())
            this.SetTouched(true);
    }
    /** */
    ScrollToElement(delay = 0, toView = 'nearest') {
        Tools.Sleep(delay).then(() => {
            let element = HTMLElements.SelectElementById(`#${this._id}-options`);
            if (Tools.IsNull(element))
                element = HTMLElements.SelectElementById(`#${this._id}-container`);
            if (element)
                HTMLElements.ScrollToElement(element, toView);
        });
    }
    //Functions For selectbox
    _placeholder = computed(() => '', ...(ngDevMode ? [{ debugName: "_placeholder" }] : /* istanbul ignore next */ []));
    _GetIconBySelect = (item) => item;
    _GetDisplayBySelect = (item) => item;
    _ResetSearch(value) { value; }
    //Functions For numberbox
    _IncrementStep() { }
    _DecrementStep() { }
    _ValueFormat = computed(() => `${this._value()}`, ...(ngDevMode ? [{ debugName: "_ValueFormat" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIATextBox, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIATextBox, isStandalone: false, selector: "wia-textbox", inputs: { placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, selectOnFocus: { classPropertyName: "selectOnFocus", publicName: "selectOnFocus", isSignal: true, isRequired: false, transformFunction: null }, textPosition: { classPropertyName: "textPosition", publicName: "textPosition", isSignal: true, isRequired: false, transformFunction: null }, minLength: { classPropertyName: "minLength", publicName: "minLength", isSignal: true, isRequired: false, transformFunction: null }, maxLength: { classPropertyName: "maxLength", publicName: "maxLength", isSignal: true, isRequired: false, transformFunction: null }, showClearButton: { classPropertyName: "showClearButton", publicName: "showClearButton", isSignal: true, isRequired: false, transformFunction: null }, showSearchButton: { classPropertyName: "showSearchButton", publicName: "showSearchButton", isSignal: true, isRequired: false, transformFunction: null }, externalButtons: { classPropertyName: "externalButtons", publicName: "externalButtons", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, minWidth: { classPropertyName: "minWidth", publicName: "minWidth", isSignal: true, isRequired: false, transformFunction: null }, maxWidth: { classPropertyName: "maxWidth", publicName: "maxWidth", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onKeyupEnter: "onKeyupEnter", onClickClear: "onClickClear", onClickSearch: "onClickSearch", onClickLeft: "onClickLeft", onClickRight: "onClickRight" }, providers: [CONTROL_VALUE(WIATextBox)], usesInheritance: true, ngImport: i0, template: "<div [id]=\"_id + '-container'\" class=\"coer-textbox\" \r\n    [ngClass]=\"{ \r\n        'background-color-readonly': isReadonly(), \r\n        'invisible': isInvisible(),\r\n        'display-none': isHidden(), \r\n    }\"\r\n    [ngStyle]=\"{\r\n        width       : width(), \r\n        minWidth    : minWidth(),\r\n        maxWidth    : maxWidth(),\r\n        marginTop   : marginTop(),\r\n        marginRight : marginRight(),\r\n        marginBottom: marginBottom(),\r\n        marginLeft  : marginLeft(),\r\n        height      : ((size() == 'small') ? 'var(--input-height-small)' : 'var(--input-height)') \r\n    }\">  \r\n\r\n    @if(_showExternalButtonLeft()) {\r\n        <div class=\"coer-textbox-button radius-left-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconLeft || ''\"\r\n                [type]=\"externalButtons()?.typeLeft || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorLeft || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyLeft || false)\"\r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickLeft.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n     \r\n    <input \r\n        #inputINNER\r\n        [type]=\"_inputType()\" \r\n        [id]=\"_id\" \r\n        [name]=\"_id\" \r\n        [placeholder]=\"_placeholder()\"\r\n        [value]=\"_ValueByComponent()\"\r\n        [disabled]=\"!_isEnabled()\"\r\n        [minLength]=\"minLength()\"\r\n        [maxLength]=\"maxLength()\"\r\n        (input)=\"_Input($event.target.value)\"\r\n        [ngStyle]=\"{ \r\n            width: _widtht(),\r\n            paddingLeft:  _paddingLeft(),\r\n            paddingRight: _paddingRight(), \r\n            'text-align': textPosition(), \r\n            color: (_isNumberComponent() && !_isFocused() ? 'transparent' : 'var(--dark)')\r\n        }\"> \r\n        \r\n    @if(_isNumberComponent() && !_isFocused()) {\r\n        <input [type]=\"_inputType()\"  \r\n            [name]=\"_id\"\r\n            class=\"position-absolute\" \r\n            [placeholder]=\"_placeholder()\"\r\n            [value]=\"_ValueFormat()\" \r\n            [disabled]=\"!_isEnabled()\"\r\n            (focus)=\"Focus()\"\r\n            [ngStyle]=\"{ \r\n                width: _widtht(),\r\n                paddingLeft:  _paddingLeft(),\r\n                paddingRight: _paddingRight(), \r\n                'text-align': textPosition()\r\n            }\"> \r\n    }\r\n\r\n    @if(_showExternalButtonRight()) {\r\n        <div class=\"coer-textbox-button radius-right-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconRight || ''\"\r\n                [type]=\"externalButtons()?.typeRight || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorRight || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyRight || false)\"  \r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickRight.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n\r\n    @if(_paddingRight() != '10px') {\r\n        <div class=\"icon-container\" [ngStyle]=\"{ right: _right() }\">\r\n            @if(isInvalid() && _isEnabled()) {\r\n                <i class=\"iw-exclamation-circle-fill\"></i>\r\n            }\r\n    \r\n            @else if(isValid() && _isEnabled()) {\r\n                <i class=\"iw-check-circle-fill\"></i>\r\n            }  \r\n\r\n            @if(_showSearchButton()) {\r\n                <i class=\"iw-search\" (click)=\"_ClickSearch()\"></i>\r\n            }\r\n    \r\n            @else if(_showClearButton()) {\r\n                <i class=\"iw-mark\" (click)=\"Clear()\"></i>\r\n            }  \r\n\r\n            @else if(_showSecretClosed()) {\r\n                <i class=\"iw-eye-slash-fill\" (click)=\"_showSecret.set(false); Focus();\"></i>\r\n            }\r\n    \r\n            @else if(_showSecretOpen()) {\r\n                <i class=\"iw-eye-fill\" (click)=\"_showSecret.set(true); Focus();\"></i>\r\n            } \r\n            \r\n            @if(_isSelectComponent() && _isEnabled()) {\r\n                <i [ngClass]=\"{\r\n                    'iw-angle'    : true,\r\n                    'iw-90deg'    : _isCollapsed(),\r\n                    'iw-270deg'   : !_isCollapsed(),\r\n                    'color-primary': !_isCollapsed() && !isValid() && !isInvalid(),\r\n                    'color-success': !_isCollapsed() && isValid()  && !isInvalid(),\r\n                    'color-danger' : !_isCollapsed() && isInvalid(),\r\n                }\" (click)=\"_isCollapsed() ? Focus() : Blur()\"></i>\r\n            } \r\n\r\n            @if(_isNumberComponent() && _showStepIcon() && _isEnabled()) {\r\n                <div [ngClass]=\"{ 'tricks-container': true, 'focus': _isFocused() }\">\r\n                    <i class=\"iw-angle iw-270deg\" (click)=\"_IncrementStep()\"></i>\r\n                    <i class=\"iw-angle iw-90deg\" (click)=\"_DecrementStep()\"></i>\r\n                </div>\r\n            } \r\n        </div>\r\n    }\r\n\r\n    @if(_showLabel()) {\r\n        <label [for]=\"_id\"\r\n            [ngStyle]=\"{ width: _widtht() }\"\r\n            [ngClass]=\"{ \r\n                'focus'          : _isFocused() && IsNotOnlyWhiteSpace(label()),\r\n                'no-empty'       : IsNotOnlyWhiteSpace(_value()),\r\n                'external-button': _showExternalButtonLeft(), \r\n                'display-none'   : isLoading(),\r\n                'isValid'        : isValid(), \r\n                'isInvalid'      : isInvalid(),\r\n                'readonly'       : isReadonly(),\r\n                'small'          : (size() == 'small')\r\n            }\">\r\n            <span [ngClass]=\"{ 'background-color-readonly': isReadonly() }\"> {{ _label() }} </span>\r\n        </label>\r\n    }\r\n\r\n    @if(isLoading()) {\r\n        <div class=\"loading\"></div>\r\n    }\r\n\r\n    @if(_isEnabled()) {\r\n        <div class=\"line\"\r\n            [ngStyle]=\"{ left: _left(), right: _right() }\"\r\n            [ngClass]=\"{   \r\n                'focus'    : _isFocused(), \r\n                'isValid'  : _isFocused() && isValid(), \r\n                'isInvalid': _isFocused() && isInvalid(),\r\n                'display-none': !_isEnabled()\r\n            }\" \r\n        ></div>\r\n    }\r\n\r\n    @if(_isSelectComponent()) {        \r\n        <ul [id]=\"_id + '-options'\" [ngStyle]=\"{ 'max-height' : (_isCollapsed() ? '0px' : '175px') }\">\r\n            @if(_dataSource().length > 0) {\r\n                @for(item of _dataSource(); track item.__index__) {\r\n                    <li [id]=\"_id + '-index' + item.__index__\" [ngClass]=\"{ 'focus': _index() == item.__index__ }\" (click)=\"_SetValue(item)\"> \r\n                        @if(IsNotOnlyWhiteSpace(_GetIconBySelect(item))) {\r\n                            <span class=\"icon-container-option\">\r\n                                <i [class]=\"_GetIconBySelect(item)\"></i> \r\n                            </span>\r\n                        }\r\n        \r\n                        <span class=\"display-property-option\">{{ _GetDisplayBySelect(item) }}</span>    \r\n                    </li>\r\n                } \r\n            }\r\n\r\n            @else {\r\n                <li (click)=\"Blur()\">    \r\n                    <span class=\"display-property-option\"> -- No Options -- </span>    \r\n                </li>\r\n            }\r\n        </ul> \r\n    }\r\n</div>    ", styles: ["div.coer-textbox{align-items:center!important;position:relative!important;border-radius:5px;background-color:var(--input);height:var(--input-height);display:inline-flex}div.coer-textbox div.coer-textbox-button{display:inline!important;background-color:inherit!important;z-index:1!important}div.coer-textbox input{border:none!important;height:inherit!important;padding-top:0!important;padding-bottom:0!important;border-radius:inherit!important;font-size:var(--input-font-size)!important;background-color:inherit!important;color:var(--dark)}div.coer-textbox input:focus{outline:none!important}div.coer-textbox input:disabled{background-color:var(--readonly)}div.coer-textbox div.icon-container{position:absolute!important;top:0!important;bottom:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:10px 10px 10px 5px!important;background-color:inherit!important;border-radius:inherit!important;z-index:1!important;gap:5px!important}div.coer-textbox div.icon-container div.tricks-container{width:20px!important;max-width:20px!important;height:var(--input-height)}div.coer-textbox div.icon-container div.tricks-container i,div.coer-textbox div.icon-container i{cursor:pointer!important;font-size:20px!important}div.coer-textbox div.icon-container i.iw-search,div.coer-textbox div.icon-container i.iw-mark,div.coer-textbox div.icon-container i.iw-eye-fill,div.coer-textbox div.icon-container i.iw-eye-slash-fill{color:color-mix(in srgb,var(--gray),var(--light) 50%)}div.coer-textbox div.icon-container i.iw-search:hover,div.coer-textbox div.icon-container i.iw-mark:hover,div.coer-textbox div.icon-container i.iw-eye-fill:hover,div.coer-textbox div.icon-container i.iw-eye-slash-fill:hover{color:var(--gray)!important}div.coer-textbox div.icon-container i.iw-exclamation-circle-fill{color:var(--danger)}div.coer-textbox div.icon-container i.iw-check-circle-fill{color:var(--success)}div.coer-textbox div.icon-container i.iw-angle{transition:all .3s ease!important;color:var(--gray)}div.coer-textbox div.icon-container i.iw-270deg{color:var(--primary)}div.coer-textbox div.icon-container div.tricks-container{display:flex!important;flex-direction:column!important}div.coer-textbox div.icon-container div.tricks-container i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container i.iw-270deg{color:var(--gray)!important}div.coer-textbox div.icon-container div.tricks-container.focus i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container.focus i.iw-270deg{color:var(--primary)!important}div.coer-textbox label{-webkit-user-select:none!important;user-select:none!important;position:absolute!important;color:var(--gray)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;transform:translate(11px)!important;transition:transform .3s ease!important}div.coer-textbox label span{padding:0 10px!important;border-radius:10px!important;background-color:var(--input)}div.coer-textbox label.focus,div.coer-textbox label.no-empty{font-size:14px!important;font-weight:700!important;transform:translate(5px,calc(var(--input-height) / 2 * -1))!important;background-color:transparent!important}div.coer-textbox label.focus.small,div.coer-textbox label.no-empty.small{font-size:12px!important;transform:translate(5px,-15px)!important}div.coer-textbox label.focus{color:var(--input-focus)!important}div.coer-textbox label.focus.isValid{color:var(--success)!important}div.coer-textbox label.focus.isInvalid{color:var(--danger)!important}div.coer-textbox label.no-empty.readonly{color:var(--dark)!important}div.coer-textbox label.external-button{transform:translate(50px)!important}div.coer-textbox label.focus.external-button,div.coer-textbox label.no-empty.external-button{transform:translate(45px,calc(var(--input-height) / 2 * -1))!important}div.coer-textbox label.focus.external-button.small,div.coer-textbox label.no-empty.external-button.small{transform:translate(45px,-15px)!important}div.coer-textbox div.loading{border-radius:inherit!important;position:absolute!important;z-index:1!important}div.coer-textbox div.line{position:absolute!important;bottom:0!important;z-index:2!important;transition:all .4s ease-in-out!important;border:1px solid var(--gray)}div.coer-textbox div.line.focus{border-color:var(--input-focus)!important}div.coer-textbox div.line.isValid{border-color:var(--success)!important}div.coer-textbox div.line.isInvalid{border-color:var(--danger)!important}div.coer-textbox ul{list-style:none!important;padding-left:0!important;background-color:var(--ghost)!important;border-radius:0 0 5px 5px!important;box-shadow:0 5px 10px -3px var(--dark)!important;position:absolute!important;top:var(--input-height);left:0!important;right:0!important;overflow:auto!important;transition:max-height .3s ease-in-out!important;z-index:var(--z-index-items)!important}div.coer-textbox ul li{min-height:24.2px!important;border-bottom:1px solid var(--loading)!important;display:flex!important;align-items:center!important;padding:5px 10px!important;overflow:hidden!important;cursor:pointer!important;gap:5px!important}div.coer-textbox ul li span.icon-container-option{width:25px!important;max-width:25px!important;display:inherit!important;align-items:inherit!important;justify-content:center!important}div.coer-textbox ul li span.display-property-option{display:flex!important;align-items:center!important;word-break:break-all!important}div.coer-textbox ul li:last-child{border-bottom-color:transparent!important;border-radius:0 0 5px 5px!important}div.coer-textbox ul li:not(.focus):hover{background-color:var(--item-hover)}div.coer-textbox ul li.focus{background-color:var(--item-focus)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: WIAButton, selector: "wia-button", inputs: ["label", "type", "color", "icon", "path", "iconPosition", "isLoading", "isReadonly", "isInvisible", "isHidden", "breakpoints", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "marginTop", "marginRight", "marginBottom", "marginLeft"], outputs: ["onClick", "onDestroy", "onReady"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIATextBox, decorators: [{
            type: Component,
            args: [{ selector: 'wia-textbox', providers: [CONTROL_VALUE(WIATextBox)], standalone: false, template: "<div [id]=\"_id + '-container'\" class=\"coer-textbox\" \r\n    [ngClass]=\"{ \r\n        'background-color-readonly': isReadonly(), \r\n        'invisible': isInvisible(),\r\n        'display-none': isHidden(), \r\n    }\"\r\n    [ngStyle]=\"{\r\n        width       : width(), \r\n        minWidth    : minWidth(),\r\n        maxWidth    : maxWidth(),\r\n        marginTop   : marginTop(),\r\n        marginRight : marginRight(),\r\n        marginBottom: marginBottom(),\r\n        marginLeft  : marginLeft(),\r\n        height      : ((size() == 'small') ? 'var(--input-height-small)' : 'var(--input-height)') \r\n    }\">  \r\n\r\n    @if(_showExternalButtonLeft()) {\r\n        <div class=\"coer-textbox-button radius-left-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconLeft || ''\"\r\n                [type]=\"externalButtons()?.typeLeft || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorLeft || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyLeft || false)\"\r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickLeft.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n     \r\n    <input \r\n        #inputINNER\r\n        [type]=\"_inputType()\" \r\n        [id]=\"_id\" \r\n        [name]=\"_id\" \r\n        [placeholder]=\"_placeholder()\"\r\n        [value]=\"_ValueByComponent()\"\r\n        [disabled]=\"!_isEnabled()\"\r\n        [minLength]=\"minLength()\"\r\n        [maxLength]=\"maxLength()\"\r\n        (input)=\"_Input($event.target.value)\"\r\n        [ngStyle]=\"{ \r\n            width: _widtht(),\r\n            paddingLeft:  _paddingLeft(),\r\n            paddingRight: _paddingRight(), \r\n            'text-align': textPosition(), \r\n            color: (_isNumberComponent() && !_isFocused() ? 'transparent' : 'var(--dark)')\r\n        }\"> \r\n        \r\n    @if(_isNumberComponent() && !_isFocused()) {\r\n        <input [type]=\"_inputType()\"  \r\n            [name]=\"_id\"\r\n            class=\"position-absolute\" \r\n            [placeholder]=\"_placeholder()\"\r\n            [value]=\"_ValueFormat()\" \r\n            [disabled]=\"!_isEnabled()\"\r\n            (focus)=\"Focus()\"\r\n            [ngStyle]=\"{ \r\n                width: _widtht(),\r\n                paddingLeft:  _paddingLeft(),\r\n                paddingRight: _paddingRight(), \r\n                'text-align': textPosition()\r\n            }\"> \r\n    }\r\n\r\n    @if(_showExternalButtonRight()) {\r\n        <div class=\"coer-textbox-button radius-right-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconRight || ''\"\r\n                [type]=\"externalButtons()?.typeRight || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorRight || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyRight || false)\"  \r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickRight.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n\r\n    @if(_paddingRight() != '10px') {\r\n        <div class=\"icon-container\" [ngStyle]=\"{ right: _right() }\">\r\n            @if(isInvalid() && _isEnabled()) {\r\n                <i class=\"iw-exclamation-circle-fill\"></i>\r\n            }\r\n    \r\n            @else if(isValid() && _isEnabled()) {\r\n                <i class=\"iw-check-circle-fill\"></i>\r\n            }  \r\n\r\n            @if(_showSearchButton()) {\r\n                <i class=\"iw-search\" (click)=\"_ClickSearch()\"></i>\r\n            }\r\n    \r\n            @else if(_showClearButton()) {\r\n                <i class=\"iw-mark\" (click)=\"Clear()\"></i>\r\n            }  \r\n\r\n            @else if(_showSecretClosed()) {\r\n                <i class=\"iw-eye-slash-fill\" (click)=\"_showSecret.set(false); Focus();\"></i>\r\n            }\r\n    \r\n            @else if(_showSecretOpen()) {\r\n                <i class=\"iw-eye-fill\" (click)=\"_showSecret.set(true); Focus();\"></i>\r\n            } \r\n            \r\n            @if(_isSelectComponent() && _isEnabled()) {\r\n                <i [ngClass]=\"{\r\n                    'iw-angle'    : true,\r\n                    'iw-90deg'    : _isCollapsed(),\r\n                    'iw-270deg'   : !_isCollapsed(),\r\n                    'color-primary': !_isCollapsed() && !isValid() && !isInvalid(),\r\n                    'color-success': !_isCollapsed() && isValid()  && !isInvalid(),\r\n                    'color-danger' : !_isCollapsed() && isInvalid(),\r\n                }\" (click)=\"_isCollapsed() ? Focus() : Blur()\"></i>\r\n            } \r\n\r\n            @if(_isNumberComponent() && _showStepIcon() && _isEnabled()) {\r\n                <div [ngClass]=\"{ 'tricks-container': true, 'focus': _isFocused() }\">\r\n                    <i class=\"iw-angle iw-270deg\" (click)=\"_IncrementStep()\"></i>\r\n                    <i class=\"iw-angle iw-90deg\" (click)=\"_DecrementStep()\"></i>\r\n                </div>\r\n            } \r\n        </div>\r\n    }\r\n\r\n    @if(_showLabel()) {\r\n        <label [for]=\"_id\"\r\n            [ngStyle]=\"{ width: _widtht() }\"\r\n            [ngClass]=\"{ \r\n                'focus'          : _isFocused() && IsNotOnlyWhiteSpace(label()),\r\n                'no-empty'       : IsNotOnlyWhiteSpace(_value()),\r\n                'external-button': _showExternalButtonLeft(), \r\n                'display-none'   : isLoading(),\r\n                'isValid'        : isValid(), \r\n                'isInvalid'      : isInvalid(),\r\n                'readonly'       : isReadonly(),\r\n                'small'          : (size() == 'small')\r\n            }\">\r\n            <span [ngClass]=\"{ 'background-color-readonly': isReadonly() }\"> {{ _label() }} </span>\r\n        </label>\r\n    }\r\n\r\n    @if(isLoading()) {\r\n        <div class=\"loading\"></div>\r\n    }\r\n\r\n    @if(_isEnabled()) {\r\n        <div class=\"line\"\r\n            [ngStyle]=\"{ left: _left(), right: _right() }\"\r\n            [ngClass]=\"{   \r\n                'focus'    : _isFocused(), \r\n                'isValid'  : _isFocused() && isValid(), \r\n                'isInvalid': _isFocused() && isInvalid(),\r\n                'display-none': !_isEnabled()\r\n            }\" \r\n        ></div>\r\n    }\r\n\r\n    @if(_isSelectComponent()) {        \r\n        <ul [id]=\"_id + '-options'\" [ngStyle]=\"{ 'max-height' : (_isCollapsed() ? '0px' : '175px') }\">\r\n            @if(_dataSource().length > 0) {\r\n                @for(item of _dataSource(); track item.__index__) {\r\n                    <li [id]=\"_id + '-index' + item.__index__\" [ngClass]=\"{ 'focus': _index() == item.__index__ }\" (click)=\"_SetValue(item)\"> \r\n                        @if(IsNotOnlyWhiteSpace(_GetIconBySelect(item))) {\r\n                            <span class=\"icon-container-option\">\r\n                                <i [class]=\"_GetIconBySelect(item)\"></i> \r\n                            </span>\r\n                        }\r\n        \r\n                        <span class=\"display-property-option\">{{ _GetDisplayBySelect(item) }}</span>    \r\n                    </li>\r\n                } \r\n            }\r\n\r\n            @else {\r\n                <li (click)=\"Blur()\">    \r\n                    <span class=\"display-property-option\"> -- No Options -- </span>    \r\n                </li>\r\n            }\r\n        </ul> \r\n    }\r\n</div>    ", styles: ["div.coer-textbox{align-items:center!important;position:relative!important;border-radius:5px;background-color:var(--input);height:var(--input-height);display:inline-flex}div.coer-textbox div.coer-textbox-button{display:inline!important;background-color:inherit!important;z-index:1!important}div.coer-textbox input{border:none!important;height:inherit!important;padding-top:0!important;padding-bottom:0!important;border-radius:inherit!important;font-size:var(--input-font-size)!important;background-color:inherit!important;color:var(--dark)}div.coer-textbox input:focus{outline:none!important}div.coer-textbox input:disabled{background-color:var(--readonly)}div.coer-textbox div.icon-container{position:absolute!important;top:0!important;bottom:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:10px 10px 10px 5px!important;background-color:inherit!important;border-radius:inherit!important;z-index:1!important;gap:5px!important}div.coer-textbox div.icon-container div.tricks-container{width:20px!important;max-width:20px!important;height:var(--input-height)}div.coer-textbox div.icon-container div.tricks-container i,div.coer-textbox div.icon-container i{cursor:pointer!important;font-size:20px!important}div.coer-textbox div.icon-container i.iw-search,div.coer-textbox div.icon-container i.iw-mark,div.coer-textbox div.icon-container i.iw-eye-fill,div.coer-textbox div.icon-container i.iw-eye-slash-fill{color:color-mix(in srgb,var(--gray),var(--light) 50%)}div.coer-textbox div.icon-container i.iw-search:hover,div.coer-textbox div.icon-container i.iw-mark:hover,div.coer-textbox div.icon-container i.iw-eye-fill:hover,div.coer-textbox div.icon-container i.iw-eye-slash-fill:hover{color:var(--gray)!important}div.coer-textbox div.icon-container i.iw-exclamation-circle-fill{color:var(--danger)}div.coer-textbox div.icon-container i.iw-check-circle-fill{color:var(--success)}div.coer-textbox div.icon-container i.iw-angle{transition:all .3s ease!important;color:var(--gray)}div.coer-textbox div.icon-container i.iw-270deg{color:var(--primary)}div.coer-textbox div.icon-container div.tricks-container{display:flex!important;flex-direction:column!important}div.coer-textbox div.icon-container div.tricks-container i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container i.iw-270deg{color:var(--gray)!important}div.coer-textbox div.icon-container div.tricks-container.focus i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container.focus i.iw-270deg{color:var(--primary)!important}div.coer-textbox label{-webkit-user-select:none!important;user-select:none!important;position:absolute!important;color:var(--gray)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;transform:translate(11px)!important;transition:transform .3s ease!important}div.coer-textbox label span{padding:0 10px!important;border-radius:10px!important;background-color:var(--input)}div.coer-textbox label.focus,div.coer-textbox label.no-empty{font-size:14px!important;font-weight:700!important;transform:translate(5px,calc(var(--input-height) / 2 * -1))!important;background-color:transparent!important}div.coer-textbox label.focus.small,div.coer-textbox label.no-empty.small{font-size:12px!important;transform:translate(5px,-15px)!important}div.coer-textbox label.focus{color:var(--input-focus)!important}div.coer-textbox label.focus.isValid{color:var(--success)!important}div.coer-textbox label.focus.isInvalid{color:var(--danger)!important}div.coer-textbox label.no-empty.readonly{color:var(--dark)!important}div.coer-textbox label.external-button{transform:translate(50px)!important}div.coer-textbox label.focus.external-button,div.coer-textbox label.no-empty.external-button{transform:translate(45px,calc(var(--input-height) / 2 * -1))!important}div.coer-textbox label.focus.external-button.small,div.coer-textbox label.no-empty.external-button.small{transform:translate(45px,-15px)!important}div.coer-textbox div.loading{border-radius:inherit!important;position:absolute!important;z-index:1!important}div.coer-textbox div.line{position:absolute!important;bottom:0!important;z-index:2!important;transition:all .4s ease-in-out!important;border:1px solid var(--gray)}div.coer-textbox div.line.focus{border-color:var(--input-focus)!important}div.coer-textbox div.line.isValid{border-color:var(--success)!important}div.coer-textbox div.line.isInvalid{border-color:var(--danger)!important}div.coer-textbox ul{list-style:none!important;padding-left:0!important;background-color:var(--ghost)!important;border-radius:0 0 5px 5px!important;box-shadow:0 5px 10px -3px var(--dark)!important;position:absolute!important;top:var(--input-height);left:0!important;right:0!important;overflow:auto!important;transition:max-height .3s ease-in-out!important;z-index:var(--z-index-items)!important}div.coer-textbox ul li{min-height:24.2px!important;border-bottom:1px solid var(--loading)!important;display:flex!important;align-items:center!important;padding:5px 10px!important;overflow:hidden!important;cursor:pointer!important;gap:5px!important}div.coer-textbox ul li span.icon-container-option{width:25px!important;max-width:25px!important;display:inherit!important;align-items:inherit!important;justify-content:center!important}div.coer-textbox ul li span.display-property-option{display:flex!important;align-items:center!important;word-break:break-all!important}div.coer-textbox ul li:last-child{border-bottom-color:transparent!important;border-radius:0 0 5px 5px!important}div.coer-textbox ul li:not(.focus):hover{background-color:var(--item-hover)}div.coer-textbox ul li.focus{background-color:var(--item-focus)}\n"] }]
        }], propDecorators: { placeholder: [{ type: i0.Input, args: [{ isSignal: true, alias: "placeholder", required: false }] }], selectOnFocus: [{ type: i0.Input, args: [{ isSignal: true, alias: "selectOnFocus", required: false }] }], textPosition: [{ type: i0.Input, args: [{ isSignal: true, alias: "textPosition", required: false }] }], minLength: [{ type: i0.Input, args: [{ isSignal: true, alias: "minLength", required: false }] }], maxLength: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxLength", required: false }] }], showClearButton: [{ type: i0.Input, args: [{ isSignal: true, alias: "showClearButton", required: false }] }], showSearchButton: [{ type: i0.Input, args: [{ isSignal: true, alias: "showSearchButton", required: false }] }], externalButtons: [{ type: i0.Input, args: [{ isSignal: true, alias: "externalButtons", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], width: [{ type: i0.Input, args: [{ isSignal: true, alias: "width", required: false }] }], minWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "minWidth", required: false }] }], maxWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxWidth", required: false }] }], onKeyupEnter: [{ type: i0.Output, args: ["onKeyupEnter"] }], onClickClear: [{ type: i0.Output, args: ["onClickClear"] }], onClickSearch: [{ type: i0.Output, args: ["onClickSearch"] }], onClickLeft: [{ type: i0.Output, args: ["onClickLeft"] }], onClickRight: [{ type: i0.Output, args: ["onClickRight"] }] } });

class WIADateBox extends WIATextBox {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIADateBox, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIADateBox, isStandalone: false, selector: "wia-datebox", providers: [CONTROL_VALUE(WIADateBox)], usesInheritance: true, ngImport: i0, template: "<div [id]=\"_id + '-container'\" class=\"coer-textbox\" \r\n    [ngClass]=\"{ \r\n        'background-color-readonly': isReadonly(), \r\n        'invisible': isInvisible(),\r\n        'display-none': isHidden(), \r\n    }\"\r\n    [ngStyle]=\"{\r\n        width       : width(), \r\n        minWidth    : minWidth(),\r\n        maxWidth    : maxWidth(),\r\n        marginTop   : marginTop(),\r\n        marginRight : marginRight(),\r\n        marginBottom: marginBottom(),\r\n        marginLeft  : marginLeft(),\r\n        height      : ((size() == 'small') ? 'var(--input-height-small)' : 'var(--input-height)') \r\n    }\">  \r\n\r\n    @if(_showExternalButtonLeft()) {\r\n        <div class=\"coer-textbox-button radius-left-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconLeft || ''\"\r\n                [type]=\"externalButtons()?.typeLeft || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorLeft || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyLeft || false)\"\r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickLeft.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n     \r\n    <input \r\n        #inputINNER\r\n        [type]=\"_inputType()\" \r\n        [id]=\"_id\" \r\n        [name]=\"_id\" \r\n        [placeholder]=\"_placeholder()\"\r\n        [value]=\"_ValueByComponent()\"\r\n        [disabled]=\"!_isEnabled()\"\r\n        [minLength]=\"minLength()\"\r\n        [maxLength]=\"maxLength()\"\r\n        (input)=\"_Input($event.target.value)\"\r\n        [ngStyle]=\"{ \r\n            width: _widtht(),\r\n            paddingLeft:  _paddingLeft(),\r\n            paddingRight: _paddingRight(), \r\n            'text-align': textPosition(), \r\n            color: (_isNumberComponent() && !_isFocused() ? 'transparent' : 'var(--dark)')\r\n        }\"> \r\n        \r\n    @if(_isNumberComponent() && !_isFocused()) {\r\n        <input [type]=\"_inputType()\"  \r\n            [name]=\"_id\"\r\n            class=\"position-absolute\" \r\n            [placeholder]=\"_placeholder()\"\r\n            [value]=\"_ValueFormat()\" \r\n            [disabled]=\"!_isEnabled()\"\r\n            (focus)=\"Focus()\"\r\n            [ngStyle]=\"{ \r\n                width: _widtht(),\r\n                paddingLeft:  _paddingLeft(),\r\n                paddingRight: _paddingRight(), \r\n                'text-align': textPosition()\r\n            }\"> \r\n    }\r\n\r\n    @if(_showExternalButtonRight()) {\r\n        <div class=\"coer-textbox-button radius-right-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconRight || ''\"\r\n                [type]=\"externalButtons()?.typeRight || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorRight || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyRight || false)\"  \r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickRight.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n\r\n    @if(_paddingRight() != '10px') {\r\n        <div class=\"icon-container\" [ngStyle]=\"{ right: _right() }\">\r\n            @if(isInvalid() && _isEnabled()) {\r\n                <i class=\"iw-exclamation-circle-fill\"></i>\r\n            }\r\n    \r\n            @else if(isValid() && _isEnabled()) {\r\n                <i class=\"iw-check-circle-fill\"></i>\r\n            }  \r\n\r\n            @if(_showSearchButton()) {\r\n                <i class=\"iw-search\" (click)=\"_ClickSearch()\"></i>\r\n            }\r\n    \r\n            @else if(_showClearButton()) {\r\n                <i class=\"iw-mark\" (click)=\"Clear()\"></i>\r\n            }  \r\n\r\n            @else if(_showSecretClosed()) {\r\n                <i class=\"iw-eye-slash-fill\" (click)=\"_showSecret.set(false); Focus();\"></i>\r\n            }\r\n    \r\n            @else if(_showSecretOpen()) {\r\n                <i class=\"iw-eye-fill\" (click)=\"_showSecret.set(true); Focus();\"></i>\r\n            } \r\n            \r\n            @if(_isSelectComponent() && _isEnabled()) {\r\n                <i [ngClass]=\"{\r\n                    'iw-angle'    : true,\r\n                    'iw-90deg'    : _isCollapsed(),\r\n                    'iw-270deg'   : !_isCollapsed(),\r\n                    'color-primary': !_isCollapsed() && !isValid() && !isInvalid(),\r\n                    'color-success': !_isCollapsed() && isValid()  && !isInvalid(),\r\n                    'color-danger' : !_isCollapsed() && isInvalid(),\r\n                }\" (click)=\"_isCollapsed() ? Focus() : Blur()\"></i>\r\n            } \r\n\r\n            @if(_isNumberComponent() && _showStepIcon() && _isEnabled()) {\r\n                <div [ngClass]=\"{ 'tricks-container': true, 'focus': _isFocused() }\">\r\n                    <i class=\"iw-angle iw-270deg\" (click)=\"_IncrementStep()\"></i>\r\n                    <i class=\"iw-angle iw-90deg\" (click)=\"_DecrementStep()\"></i>\r\n                </div>\r\n            } \r\n        </div>\r\n    }\r\n\r\n    @if(_showLabel()) {\r\n        <label [for]=\"_id\"\r\n            [ngStyle]=\"{ width: _widtht() }\"\r\n            [ngClass]=\"{ \r\n                'focus'          : _isFocused() && IsNotOnlyWhiteSpace(label()),\r\n                'no-empty'       : IsNotOnlyWhiteSpace(_value()),\r\n                'external-button': _showExternalButtonLeft(), \r\n                'display-none'   : isLoading(),\r\n                'isValid'        : isValid(), \r\n                'isInvalid'      : isInvalid(),\r\n                'readonly'       : isReadonly(),\r\n                'small'          : (size() == 'small')\r\n            }\">\r\n            <span [ngClass]=\"{ 'background-color-readonly': isReadonly() }\"> {{ _label() }} </span>\r\n        </label>\r\n    }\r\n\r\n    @if(isLoading()) {\r\n        <div class=\"loading\"></div>\r\n    }\r\n\r\n    @if(_isEnabled()) {\r\n        <div class=\"line\"\r\n            [ngStyle]=\"{ left: _left(), right: _right() }\"\r\n            [ngClass]=\"{   \r\n                'focus'    : _isFocused(), \r\n                'isValid'  : _isFocused() && isValid(), \r\n                'isInvalid': _isFocused() && isInvalid(),\r\n                'display-none': !_isEnabled()\r\n            }\" \r\n        ></div>\r\n    }\r\n\r\n    @if(_isSelectComponent()) {        \r\n        <ul [id]=\"_id + '-options'\" [ngStyle]=\"{ 'max-height' : (_isCollapsed() ? '0px' : '175px') }\">\r\n            @if(_dataSource().length > 0) {\r\n                @for(item of _dataSource(); track item.__index__) {\r\n                    <li [id]=\"_id + '-index' + item.__index__\" [ngClass]=\"{ 'focus': _index() == item.__index__ }\" (click)=\"_SetValue(item)\"> \r\n                        @if(IsNotOnlyWhiteSpace(_GetIconBySelect(item))) {\r\n                            <span class=\"icon-container-option\">\r\n                                <i [class]=\"_GetIconBySelect(item)\"></i> \r\n                            </span>\r\n                        }\r\n        \r\n                        <span class=\"display-property-option\">{{ _GetDisplayBySelect(item) }}</span>    \r\n                    </li>\r\n                } \r\n            }\r\n\r\n            @else {\r\n                <li (click)=\"Blur()\">    \r\n                    <span class=\"display-property-option\"> -- No Options -- </span>    \r\n                </li>\r\n            }\r\n        </ul> \r\n    }\r\n</div>    ", styles: ["div.coer-textbox{align-items:center!important;position:relative!important;border-radius:5px;background-color:var(--input);height:var(--input-height);display:inline-flex}div.coer-textbox div.coer-textbox-button{display:inline!important;background-color:inherit!important;z-index:1!important}div.coer-textbox input{border:none!important;height:inherit!important;padding-top:0!important;padding-bottom:0!important;border-radius:inherit!important;font-size:var(--input-font-size)!important;background-color:inherit!important;color:var(--dark)}div.coer-textbox input:focus{outline:none!important}div.coer-textbox input:disabled{background-color:var(--readonly)}div.coer-textbox div.icon-container{position:absolute!important;top:0!important;bottom:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:10px 10px 10px 5px!important;background-color:inherit!important;border-radius:inherit!important;z-index:1!important;gap:5px!important}div.coer-textbox div.icon-container div.tricks-container{width:20px!important;max-width:20px!important;height:var(--input-height)}div.coer-textbox div.icon-container div.tricks-container i,div.coer-textbox div.icon-container i{cursor:pointer!important;font-size:20px!important}div.coer-textbox div.icon-container i.iw-search,div.coer-textbox div.icon-container i.iw-mark,div.coer-textbox div.icon-container i.iw-eye-fill,div.coer-textbox div.icon-container i.iw-eye-slash-fill{color:color-mix(in srgb,var(--gray),var(--light) 50%)}div.coer-textbox div.icon-container i.iw-search:hover,div.coer-textbox div.icon-container i.iw-mark:hover,div.coer-textbox div.icon-container i.iw-eye-fill:hover,div.coer-textbox div.icon-container i.iw-eye-slash-fill:hover{color:var(--gray)!important}div.coer-textbox div.icon-container i.iw-exclamation-circle-fill{color:var(--danger)}div.coer-textbox div.icon-container i.iw-check-circle-fill{color:var(--success)}div.coer-textbox div.icon-container i.iw-angle{transition:all .3s ease!important;color:var(--gray)}div.coer-textbox div.icon-container i.iw-270deg{color:var(--primary)}div.coer-textbox div.icon-container div.tricks-container{display:flex!important;flex-direction:column!important}div.coer-textbox div.icon-container div.tricks-container i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container i.iw-270deg{color:var(--gray)!important}div.coer-textbox div.icon-container div.tricks-container.focus i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container.focus i.iw-270deg{color:var(--primary)!important}div.coer-textbox label{-webkit-user-select:none!important;user-select:none!important;position:absolute!important;color:var(--gray)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;transform:translate(11px)!important;transition:transform .3s ease!important}div.coer-textbox label span{padding:0 10px!important;border-radius:10px!important;background-color:var(--input)}div.coer-textbox label.focus,div.coer-textbox label.no-empty{font-size:14px!important;font-weight:700!important;transform:translate(5px,calc(var(--input-height) / 2 * -1))!important;background-color:transparent!important}div.coer-textbox label.focus.small,div.coer-textbox label.no-empty.small{font-size:12px!important;transform:translate(5px,-15px)!important}div.coer-textbox label.focus{color:var(--input-focus)!important}div.coer-textbox label.focus.isValid{color:var(--success)!important}div.coer-textbox label.focus.isInvalid{color:var(--danger)!important}div.coer-textbox label.no-empty.readonly{color:var(--dark)!important}div.coer-textbox label.external-button{transform:translate(50px)!important}div.coer-textbox label.focus.external-button,div.coer-textbox label.no-empty.external-button{transform:translate(45px,calc(var(--input-height) / 2 * -1))!important}div.coer-textbox label.focus.external-button.small,div.coer-textbox label.no-empty.external-button.small{transform:translate(45px,-15px)!important}div.coer-textbox div.loading{border-radius:inherit!important;position:absolute!important;z-index:1!important}div.coer-textbox div.line{position:absolute!important;bottom:0!important;z-index:2!important;transition:all .4s ease-in-out!important;border:1px solid var(--gray)}div.coer-textbox div.line.focus{border-color:var(--input-focus)!important}div.coer-textbox div.line.isValid{border-color:var(--success)!important}div.coer-textbox div.line.isInvalid{border-color:var(--danger)!important}div.coer-textbox ul{list-style:none!important;padding-left:0!important;background-color:var(--ghost)!important;border-radius:0 0 5px 5px!important;box-shadow:0 5px 10px -3px var(--dark)!important;position:absolute!important;top:var(--input-height);left:0!important;right:0!important;overflow:auto!important;transition:max-height .3s ease-in-out!important;z-index:var(--z-index-items)!important}div.coer-textbox ul li{min-height:24.2px!important;border-bottom:1px solid var(--loading)!important;display:flex!important;align-items:center!important;padding:5px 10px!important;overflow:hidden!important;cursor:pointer!important;gap:5px!important}div.coer-textbox ul li span.icon-container-option{width:25px!important;max-width:25px!important;display:inherit!important;align-items:inherit!important;justify-content:center!important}div.coer-textbox ul li span.display-property-option{display:flex!important;align-items:center!important;word-break:break-all!important}div.coer-textbox ul li:last-child{border-bottom-color:transparent!important;border-radius:0 0 5px 5px!important}div.coer-textbox ul li:not(.focus):hover{background-color:var(--item-hover)}div.coer-textbox ul li.focus{background-color:var(--item-focus)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: WIAButton, selector: "wia-button", inputs: ["label", "type", "color", "icon", "path", "iconPosition", "isLoading", "isReadonly", "isInvisible", "isHidden", "breakpoints", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "marginTop", "marginRight", "marginBottom", "marginLeft"], outputs: ["onClick", "onDestroy", "onReady"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIADateBox, decorators: [{
            type: Component,
            args: [{ selector: 'wia-datebox', providers: [CONTROL_VALUE(WIADateBox)], standalone: false, template: "<div [id]=\"_id + '-container'\" class=\"coer-textbox\" \r\n    [ngClass]=\"{ \r\n        'background-color-readonly': isReadonly(), \r\n        'invisible': isInvisible(),\r\n        'display-none': isHidden(), \r\n    }\"\r\n    [ngStyle]=\"{\r\n        width       : width(), \r\n        minWidth    : minWidth(),\r\n        maxWidth    : maxWidth(),\r\n        marginTop   : marginTop(),\r\n        marginRight : marginRight(),\r\n        marginBottom: marginBottom(),\r\n        marginLeft  : marginLeft(),\r\n        height      : ((size() == 'small') ? 'var(--input-height-small)' : 'var(--input-height)') \r\n    }\">  \r\n\r\n    @if(_showExternalButtonLeft()) {\r\n        <div class=\"coer-textbox-button radius-left-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconLeft || ''\"\r\n                [type]=\"externalButtons()?.typeLeft || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorLeft || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyLeft || false)\"\r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickLeft.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n     \r\n    <input \r\n        #inputINNER\r\n        [type]=\"_inputType()\" \r\n        [id]=\"_id\" \r\n        [name]=\"_id\" \r\n        [placeholder]=\"_placeholder()\"\r\n        [value]=\"_ValueByComponent()\"\r\n        [disabled]=\"!_isEnabled()\"\r\n        [minLength]=\"minLength()\"\r\n        [maxLength]=\"maxLength()\"\r\n        (input)=\"_Input($event.target.value)\"\r\n        [ngStyle]=\"{ \r\n            width: _widtht(),\r\n            paddingLeft:  _paddingLeft(),\r\n            paddingRight: _paddingRight(), \r\n            'text-align': textPosition(), \r\n            color: (_isNumberComponent() && !_isFocused() ? 'transparent' : 'var(--dark)')\r\n        }\"> \r\n        \r\n    @if(_isNumberComponent() && !_isFocused()) {\r\n        <input [type]=\"_inputType()\"  \r\n            [name]=\"_id\"\r\n            class=\"position-absolute\" \r\n            [placeholder]=\"_placeholder()\"\r\n            [value]=\"_ValueFormat()\" \r\n            [disabled]=\"!_isEnabled()\"\r\n            (focus)=\"Focus()\"\r\n            [ngStyle]=\"{ \r\n                width: _widtht(),\r\n                paddingLeft:  _paddingLeft(),\r\n                paddingRight: _paddingRight(), \r\n                'text-align': textPosition()\r\n            }\"> \r\n    }\r\n\r\n    @if(_showExternalButtonRight()) {\r\n        <div class=\"coer-textbox-button radius-right-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconRight || ''\"\r\n                [type]=\"externalButtons()?.typeRight || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorRight || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyRight || false)\"  \r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickRight.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n\r\n    @if(_paddingRight() != '10px') {\r\n        <div class=\"icon-container\" [ngStyle]=\"{ right: _right() }\">\r\n            @if(isInvalid() && _isEnabled()) {\r\n                <i class=\"iw-exclamation-circle-fill\"></i>\r\n            }\r\n    \r\n            @else if(isValid() && _isEnabled()) {\r\n                <i class=\"iw-check-circle-fill\"></i>\r\n            }  \r\n\r\n            @if(_showSearchButton()) {\r\n                <i class=\"iw-search\" (click)=\"_ClickSearch()\"></i>\r\n            }\r\n    \r\n            @else if(_showClearButton()) {\r\n                <i class=\"iw-mark\" (click)=\"Clear()\"></i>\r\n            }  \r\n\r\n            @else if(_showSecretClosed()) {\r\n                <i class=\"iw-eye-slash-fill\" (click)=\"_showSecret.set(false); Focus();\"></i>\r\n            }\r\n    \r\n            @else if(_showSecretOpen()) {\r\n                <i class=\"iw-eye-fill\" (click)=\"_showSecret.set(true); Focus();\"></i>\r\n            } \r\n            \r\n            @if(_isSelectComponent() && _isEnabled()) {\r\n                <i [ngClass]=\"{\r\n                    'iw-angle'    : true,\r\n                    'iw-90deg'    : _isCollapsed(),\r\n                    'iw-270deg'   : !_isCollapsed(),\r\n                    'color-primary': !_isCollapsed() && !isValid() && !isInvalid(),\r\n                    'color-success': !_isCollapsed() && isValid()  && !isInvalid(),\r\n                    'color-danger' : !_isCollapsed() && isInvalid(),\r\n                }\" (click)=\"_isCollapsed() ? Focus() : Blur()\"></i>\r\n            } \r\n\r\n            @if(_isNumberComponent() && _showStepIcon() && _isEnabled()) {\r\n                <div [ngClass]=\"{ 'tricks-container': true, 'focus': _isFocused() }\">\r\n                    <i class=\"iw-angle iw-270deg\" (click)=\"_IncrementStep()\"></i>\r\n                    <i class=\"iw-angle iw-90deg\" (click)=\"_DecrementStep()\"></i>\r\n                </div>\r\n            } \r\n        </div>\r\n    }\r\n\r\n    @if(_showLabel()) {\r\n        <label [for]=\"_id\"\r\n            [ngStyle]=\"{ width: _widtht() }\"\r\n            [ngClass]=\"{ \r\n                'focus'          : _isFocused() && IsNotOnlyWhiteSpace(label()),\r\n                'no-empty'       : IsNotOnlyWhiteSpace(_value()),\r\n                'external-button': _showExternalButtonLeft(), \r\n                'display-none'   : isLoading(),\r\n                'isValid'        : isValid(), \r\n                'isInvalid'      : isInvalid(),\r\n                'readonly'       : isReadonly(),\r\n                'small'          : (size() == 'small')\r\n            }\">\r\n            <span [ngClass]=\"{ 'background-color-readonly': isReadonly() }\"> {{ _label() }} </span>\r\n        </label>\r\n    }\r\n\r\n    @if(isLoading()) {\r\n        <div class=\"loading\"></div>\r\n    }\r\n\r\n    @if(_isEnabled()) {\r\n        <div class=\"line\"\r\n            [ngStyle]=\"{ left: _left(), right: _right() }\"\r\n            [ngClass]=\"{   \r\n                'focus'    : _isFocused(), \r\n                'isValid'  : _isFocused() && isValid(), \r\n                'isInvalid': _isFocused() && isInvalid(),\r\n                'display-none': !_isEnabled()\r\n            }\" \r\n        ></div>\r\n    }\r\n\r\n    @if(_isSelectComponent()) {        \r\n        <ul [id]=\"_id + '-options'\" [ngStyle]=\"{ 'max-height' : (_isCollapsed() ? '0px' : '175px') }\">\r\n            @if(_dataSource().length > 0) {\r\n                @for(item of _dataSource(); track item.__index__) {\r\n                    <li [id]=\"_id + '-index' + item.__index__\" [ngClass]=\"{ 'focus': _index() == item.__index__ }\" (click)=\"_SetValue(item)\"> \r\n                        @if(IsNotOnlyWhiteSpace(_GetIconBySelect(item))) {\r\n                            <span class=\"icon-container-option\">\r\n                                <i [class]=\"_GetIconBySelect(item)\"></i> \r\n                            </span>\r\n                        }\r\n        \r\n                        <span class=\"display-property-option\">{{ _GetDisplayBySelect(item) }}</span>    \r\n                    </li>\r\n                } \r\n            }\r\n\r\n            @else {\r\n                <li (click)=\"Blur()\">    \r\n                    <span class=\"display-property-option\"> -- No Options -- </span>    \r\n                </li>\r\n            }\r\n        </ul> \r\n    }\r\n</div>    ", styles: ["div.coer-textbox{align-items:center!important;position:relative!important;border-radius:5px;background-color:var(--input);height:var(--input-height);display:inline-flex}div.coer-textbox div.coer-textbox-button{display:inline!important;background-color:inherit!important;z-index:1!important}div.coer-textbox input{border:none!important;height:inherit!important;padding-top:0!important;padding-bottom:0!important;border-radius:inherit!important;font-size:var(--input-font-size)!important;background-color:inherit!important;color:var(--dark)}div.coer-textbox input:focus{outline:none!important}div.coer-textbox input:disabled{background-color:var(--readonly)}div.coer-textbox div.icon-container{position:absolute!important;top:0!important;bottom:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:10px 10px 10px 5px!important;background-color:inherit!important;border-radius:inherit!important;z-index:1!important;gap:5px!important}div.coer-textbox div.icon-container div.tricks-container{width:20px!important;max-width:20px!important;height:var(--input-height)}div.coer-textbox div.icon-container div.tricks-container i,div.coer-textbox div.icon-container i{cursor:pointer!important;font-size:20px!important}div.coer-textbox div.icon-container i.iw-search,div.coer-textbox div.icon-container i.iw-mark,div.coer-textbox div.icon-container i.iw-eye-fill,div.coer-textbox div.icon-container i.iw-eye-slash-fill{color:color-mix(in srgb,var(--gray),var(--light) 50%)}div.coer-textbox div.icon-container i.iw-search:hover,div.coer-textbox div.icon-container i.iw-mark:hover,div.coer-textbox div.icon-container i.iw-eye-fill:hover,div.coer-textbox div.icon-container i.iw-eye-slash-fill:hover{color:var(--gray)!important}div.coer-textbox div.icon-container i.iw-exclamation-circle-fill{color:var(--danger)}div.coer-textbox div.icon-container i.iw-check-circle-fill{color:var(--success)}div.coer-textbox div.icon-container i.iw-angle{transition:all .3s ease!important;color:var(--gray)}div.coer-textbox div.icon-container i.iw-270deg{color:var(--primary)}div.coer-textbox div.icon-container div.tricks-container{display:flex!important;flex-direction:column!important}div.coer-textbox div.icon-container div.tricks-container i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container i.iw-270deg{color:var(--gray)!important}div.coer-textbox div.icon-container div.tricks-container.focus i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container.focus i.iw-270deg{color:var(--primary)!important}div.coer-textbox label{-webkit-user-select:none!important;user-select:none!important;position:absolute!important;color:var(--gray)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;transform:translate(11px)!important;transition:transform .3s ease!important}div.coer-textbox label span{padding:0 10px!important;border-radius:10px!important;background-color:var(--input)}div.coer-textbox label.focus,div.coer-textbox label.no-empty{font-size:14px!important;font-weight:700!important;transform:translate(5px,calc(var(--input-height) / 2 * -1))!important;background-color:transparent!important}div.coer-textbox label.focus.small,div.coer-textbox label.no-empty.small{font-size:12px!important;transform:translate(5px,-15px)!important}div.coer-textbox label.focus{color:var(--input-focus)!important}div.coer-textbox label.focus.isValid{color:var(--success)!important}div.coer-textbox label.focus.isInvalid{color:var(--danger)!important}div.coer-textbox label.no-empty.readonly{color:var(--dark)!important}div.coer-textbox label.external-button{transform:translate(50px)!important}div.coer-textbox label.focus.external-button,div.coer-textbox label.no-empty.external-button{transform:translate(45px,calc(var(--input-height) / 2 * -1))!important}div.coer-textbox label.focus.external-button.small,div.coer-textbox label.no-empty.external-button.small{transform:translate(45px,-15px)!important}div.coer-textbox div.loading{border-radius:inherit!important;position:absolute!important;z-index:1!important}div.coer-textbox div.line{position:absolute!important;bottom:0!important;z-index:2!important;transition:all .4s ease-in-out!important;border:1px solid var(--gray)}div.coer-textbox div.line.focus{border-color:var(--input-focus)!important}div.coer-textbox div.line.isValid{border-color:var(--success)!important}div.coer-textbox div.line.isInvalid{border-color:var(--danger)!important}div.coer-textbox ul{list-style:none!important;padding-left:0!important;background-color:var(--ghost)!important;border-radius:0 0 5px 5px!important;box-shadow:0 5px 10px -3px var(--dark)!important;position:absolute!important;top:var(--input-height);left:0!important;right:0!important;overflow:auto!important;transition:max-height .3s ease-in-out!important;z-index:var(--z-index-items)!important}div.coer-textbox ul li{min-height:24.2px!important;border-bottom:1px solid var(--loading)!important;display:flex!important;align-items:center!important;padding:5px 10px!important;overflow:hidden!important;cursor:pointer!important;gap:5px!important}div.coer-textbox ul li span.icon-container-option{width:25px!important;max-width:25px!important;display:inherit!important;align-items:inherit!important;justify-content:center!important}div.coer-textbox ul li span.display-property-option{display:flex!important;align-items:center!important;word-break:break-all!important}div.coer-textbox ul li:last-child{border-bottom-color:transparent!important;border-radius:0 0 5px 5px!important}div.coer-textbox ul li:not(.focus):hover{background-color:var(--item-hover)}div.coer-textbox ul li.focus{background-color:var(--item-focus)}\n"] }]
        }] });

class WIAForm {
    //Injection
    _alert = inject(CoerAlert);
    //Variables
    _isReady = signal(false, ...(ngDevMode ? [{ debugName: "_isReady" }] : /* istanbul ignore next */ []));
    //Inputs
    formGroup = input.required(...(ngDevMode ? [{ debugName: "formGroup" }] : /* istanbul ignore next */ []));
    controls = input.required(...(ngDevMode ? [{ debugName: "controls" }] : /* istanbul ignore next */ []));
    isLoading = input(false, ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    isReadonly = input(false, ...(ngDevMode ? [{ debugName: "isReadonly" }] : /* istanbul ignore next */ []));
    //Output
    onDestroy = output();
    onReady = output();
    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep();
        this._isReady.set(true);
        this.onReady?.emit();
    }
    //OnDestroy
    ngOnDestroy() {
        this.onReady = null;
        this.onDestroy.emit();
    }
    //Computed
    _isEnabled = computed(() => !this.isLoading() && !this.isReadonly(), ...(ngDevMode ? [{ debugName: "_isEnabled" }] : /* istanbul ignore next */ []));
    /** */
    IsInvalidControl = (formControlName) => {
        if (this._isReady()) {
            const CONTROL = this.controls().find(x => x.formControlName() == formControlName);
            return CONTROL ? CONTROL.isTouched() && this.formGroup().get(formControlName).invalid : true;
        }
        return this._isReady();
    };
    /** */
    IsValidControl = (formControlName) => !this.IsInvalidControl(formControlName);
    /** */
    SetControlValue(formControlName, value) {
        if (Tools.IsNotNull(this.formGroup().get(formControlName))) {
            this.formGroup().get(formControlName).setValue(value);
        }
    }
    /** */
    GetControlValue(formControlName, alternative) {
        return this._isReady()
            ? (this.formGroup().get(formControlName)?.value || alternative)
            : (alternative || '');
    }
    /** */
    RemoveControlValidator(formControlName) {
        this.formGroup()?.get(formControlName)?.clearValidators();
        this.formGroup()?.get(formControlName)?.updateValueAndValidity();
    }
    /** */
    HasControlValue(formControlName) {
        const CONTROL = this.formGroup().get(formControlName);
        return Tools.IsNotNull(CONTROL) ? Tools.IsNotOnlyWhiteSpace(CONTROL.value) : false;
    }
    /** Mark all controls as touched */
    TouchForm() {
        for (const control of this.controls())
            control.SetTouched(true);
    }
    /** Mark all controls as touched */
    IsValid = () => this.formGroup().valid;
    /** Mark all controls as touched */
    IsInvalid = () => !this.IsValid();
    /** */
    RemoveValidators(exclude = []) {
        Object.keys(this.formGroup().controls).forEach(controlName => {
            if (!exclude.includes(controlName)) {
                this.formGroup().get(controlName)?.clearValidators();
                this.formGroup().get(controlName)?.updateValueAndValidity();
            }
        });
    }
    /** Gets the value of the form */
    GetValue() {
        return Tools.BreakReference(this.formGroup().value);
    }
    /** */
    Reset(properties = null) {
        if (Tools.IsNull(properties))
            this.formGroup().reset();
        else
            this.formGroup().reset(properties);
        for (const control of this.controls())
            control.SetTouched(false);
    }
    /**
     * Mark all controls as touched.
     * If form is invalid emit a warning and focus first invalid control.
    */
    Validate() {
        this.TouchForm();
        if (this.formGroup().invalid) {
            this._alert.Warning('Please complete the required fields', 'Instructions', '');
            this.Focus();
        }
        return this.IsValid();
    }
    /** Focuses the specified control, otherwise the first invalid control or first control */
    Focus(formControl = '') {
        const PROPERTY_LIST = Tools.GetPropertyList(this.formGroup().controls);
        let control = this.controls().find(item => item.formControlName() == formControl);
        if (Tools.IsNull(control)) {
            formControl = PROPERTY_LIST.find(item => Tools.IsNotNull(this.formGroup().controls[item].errors)) || '';
            control = this.controls().find(item => item.formControlName() == formControl);
        }
        if (Tools.IsNull(control)) {
            formControl = PROPERTY_LIST.length > 0 ? PROPERTY_LIST[0] : '';
            control = this.controls().find(item => item.formControlName() == formControl);
        }
        if (control && Tools.IsFunction(control.Focus)) {
            control.Focus();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAForm, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.17", type: WIAForm, isStandalone: false, selector: "wia-form", inputs: { formGroup: { classPropertyName: "formGroup", publicName: "formGroup", isSignal: true, isRequired: true, transformFunction: null }, controls: { classPropertyName: "controls", publicName: "controls", isSignal: true, isRequired: true, transformFunction: null }, isLoading: { classPropertyName: "isLoading", publicName: "isLoading", isSignal: true, isRequired: false, transformFunction: null }, isReadonly: { classPropertyName: "isReadonly", publicName: "isReadonly", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onDestroy: "onDestroy", onReady: "onReady" }, ngImport: i0, template: "<form [formGroup]=\"formGroup()\" autocomplete=\"off\" class=\"coer-form\">\r\n    <fieldset [disabled]=\"!_isEnabled()\">\r\n        <ng-content></ng-content>\r\n    </fieldset>\r\n</form>  ", styles: ["form.coer-form fieldset{outline:none!important;border:none!important}\n"], dependencies: [{ kind: "directive", type: i2$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],[formArray],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAForm, decorators: [{
            type: Component,
            args: [{ selector: 'wia-form', standalone: false, template: "<form [formGroup]=\"formGroup()\" autocomplete=\"off\" class=\"coer-form\">\r\n    <fieldset [disabled]=\"!_isEnabled()\">\r\n        <ng-content></ng-content>\r\n    </fieldset>\r\n</form>  ", styles: ["form.coer-form fieldset{outline:none!important;border:none!important}\n"] }]
        }], propDecorators: { formGroup: [{ type: i0.Input, args: [{ isSignal: true, alias: "formGroup", required: true }] }], controls: [{ type: i0.Input, args: [{ isSignal: true, alias: "controls", required: true }] }], isLoading: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoading", required: false }] }], isReadonly: [{ type: i0.Input, args: [{ isSignal: true, alias: "isReadonly", required: false }] }], onDestroy: [{ type: i0.Output, args: ["onDestroy"] }], onReady: [{ type: i0.Output, args: ["onReady"] }] } });

class WIANumberBox extends WIATextBox {
    //Variables
    effectRef;
    _isNumberComponent = signal(true, ...(ngDevMode ? [{ debugName: "_isNumberComponent" }] : /* istanbul ignore next */ []));
    _showStepIcon = signal(true, ...(ngDevMode ? [{ debugName: "_showStepIcon" }] : /* istanbul ignore next */ []));
    _stepIconLoading = signal(false, ...(ngDevMode ? [{ debugName: "_stepIconLoading" }] : /* istanbul ignore next */ []));
    //Inputs
    minLength = input(0, ...(ngDevMode ? [{ debugName: "minLength" }] : /* istanbul ignore next */ []));
    maxLength = input(20, ...(ngDevMode ? [{ debugName: "maxLength" }] : /* istanbul ignore next */ []));
    format = input('number', ...(ngDevMode ? [{ debugName: "format" }] : /* istanbul ignore next */ []));
    decimals = input(0, ...(ngDevMode ? [{ debugName: "decimals" }] : /* istanbul ignore next */ []));
    step = input(1, ...(ngDevMode ? [{ debugName: "step" }] : /* istanbul ignore next */ []));
    showStepIcon = input(true, ...(ngDevMode ? [{ debugName: "showStepIcon" }] : /* istanbul ignore next */ []));
    min = input(0, ...(ngDevMode ? [{ debugName: "min" }] : /* istanbul ignore next */ []));
    max = input(2147483647, ...(ngDevMode ? [{ debugName: "max" }] : /* istanbul ignore next */ []));
    constructor() {
        super();
        this.effectRef = effect(() => {
            this._showStepIcon.set(this.showStepIcon());
        }, ...(ngDevMode ? [{ debugName: "effectRef" }] : /* istanbul ignore next */ []));
    }
    //Computed
    _step = computed(() => {
        if (this.step() < 1)
            return 1;
        if (String(this.step()).includes('.')) {
            const integer = Number(String(this.step()).split('.')[0]);
            return (Number.isNaN(integer) || integer < 1) ? 1 : integer;
        }
        return this.step();
    }, ...(ngDevMode ? [{ debugName: "_step" }] : /* istanbul ignore next */ []));
    //Computed
    _ValueFormat = computed(() => {
        if (!this._stepIconLoading()) {
            switch (this.format()) {
                case 'number': return Numbers.ToNumericFormat(this._value());
                case 'currency': return Numbers.ToCurrency(this._value());
            }
        }
        return `${this._value()}`;
    }, ...(ngDevMode ? [{ debugName: "_ValueFormat" }] : /* istanbul ignore next */ []));
    //Function
    _onKeydown = (event) => {
        if (event.key === 'ArrowUp')
            this._IncrementStep();
        if (event.key === 'ArrowDown')
            this._DecrementStep();
    };
    //Function
    _onBlur = () => {
        const VALUE = String(this._value());
        if (VALUE == '-' || VALUE == '-0')
            this._Input(0);
        if (VALUE.endsWith('.'))
            this._Input(VALUE.split('.')[0]);
        this.Blur();
    };
    //Function
    _Input = (value) => {
        value = this._OnlyNumbers(value);
        value = this._ValidateRangeValue(value);
        if (this._htmlElement)
            this._htmlElement.value = value;
        super._SetValue(value);
    };
    //Function
    _IncrementStep() {
        if (this._isEnabled()) {
            this._stepIconLoading.set(true);
            if (!this._isFocused())
                this.Focus();
            let VALUE = !Number.isNaN(this._value()) ? Number(this._value()) : 0;
            if (this.decimals() <= 0)
                VALUE += this._step();
            else {
                if (String(VALUE).includes('.')) {
                    let [integer, decimals] = String(VALUE).split('.');
                    VALUE = Number(`${Number(integer) + this._step()}.${decimals}`);
                }
                else
                    VALUE += this._step();
            }
            this._Input(VALUE);
            Tools.Sleep(1000, 'IncrementStep').then(() => this._stepIconLoading.set(false));
        }
    }
    //Function
    _DecrementStep() {
        if (this._isEnabled()) {
            this._stepIconLoading.set(true);
            if (!this._isFocused())
                this.Focus();
            this._isFocused.set(true);
            let VALUE = !Number.isNaN(this._value()) ? Number(this._value()) : 0;
            if (this.decimals() <= 0)
                VALUE -= this._step();
            else {
                if (String(VALUE).includes('.')) {
                    let [integer, decimals] = String(VALUE).split('.');
                    VALUE = Number(`${Number(integer) - this._step()}.${decimals}`);
                }
                else
                    VALUE -= this._step();
            }
            this._Input(VALUE);
            Tools.Sleep(1000, 'DecrementStep').then(() => this._stepIconLoading.set(false));
        }
    }
    /** */
    _OnlyNumbers(value) {
        let isNegative = false;
        let valueString = String(value).trim();
        if (Tools.IsOnlyWhiteSpace(valueString))
            return '';
        //Negatives
        if (valueString.includes('-')) {
            if (this.min() < 0) {
                isNegative = valueString.startsWith('-');
                if (valueString == '-')
                    return '-';
                if (valueString == '-.')
                    return this.decimals() > 0 ? '-0.' : '0';
                if (valueString == '-0')
                    return this.decimals() > 0 ? '-0' : '0';
                if (valueString == '-0.')
                    return this.decimals() > 0 ? '-0.' : '0';
            }
            else if (Number(value) < this.min()) {
                valueString = '0';
            }
        }
        const charArray = [];
        for (const char of valueString) {
            if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char)) {
                charArray.push(char);
            }
            else if (char == '.' && !charArray.includes('.') && this.decimals() > 0) {
                charArray.push(char);
            }
        }
        valueString = charArray.join('');
        //Decimals
        if (this.decimals() > 0) {
            let integerString = valueString.split('.')[0] || '';
            let decimalString = valueString.split('.')[1] || '';
            decimalString = decimalString.substring(0, this.decimals());
            if (valueString == '.')
                return '0.';
            else if (valueString.includes('.') && decimalString == '') {
                return (isNegative) ? `-${integerString}.` : `${integerString}.`;
            }
            else if (valueString.includes('.') && decimalString.endsWith('0')) {
                return (isNegative) ? `-${integerString}.${decimalString}` : `${integerString}.${decimalString}`;
            }
            else if (integerString == '' && decimalString == '') {
                return '';
            }
            valueString = `${integerString}.${decimalString}`;
        }
        if (isNegative) {
            valueString = `-${valueString}`;
        }
        return Number(valueString);
    }
    /** */
    _ValidateRangeValue(value) {
        if (['-', '.', '-.', '-0', '-0.', ''].includes(String(value))) {
            return String(value);
        }
        if (Number(value) < this.min()) {
            value = this.min();
        }
        if (Number(value) > this.max()) {
            value = this.max();
        }
        if (this.decimals() <= 0 && String(value).includes('.')) {
            value = String(value).split('.')[0];
        }
        return String(value);
    }
    //Computed
    _showLabel = computed(() => {
        return Tools.IsNotOnlyWhiteSpace(this.label()) || (Tools.IsNotOnlyWhiteSpace(this.placeholder())
            && Tools.IsOnlyWhiteSpace(this._value())
            && (this.format() == 'none'));
    }, ...(ngDevMode ? [{ debugName: "_showLabel" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIANumberBox, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIANumberBox, isStandalone: false, selector: "wia-numberbox", inputs: { minLength: { classPropertyName: "minLength", publicName: "minLength", isSignal: true, isRequired: false, transformFunction: null }, maxLength: { classPropertyName: "maxLength", publicName: "maxLength", isSignal: true, isRequired: false, transformFunction: null }, format: { classPropertyName: "format", publicName: "format", isSignal: true, isRequired: false, transformFunction: null }, decimals: { classPropertyName: "decimals", publicName: "decimals", isSignal: true, isRequired: false, transformFunction: null }, step: { classPropertyName: "step", publicName: "step", isSignal: true, isRequired: false, transformFunction: null }, showStepIcon: { classPropertyName: "showStepIcon", publicName: "showStepIcon", isSignal: true, isRequired: false, transformFunction: null }, min: { classPropertyName: "min", publicName: "min", isSignal: true, isRequired: false, transformFunction: null }, max: { classPropertyName: "max", publicName: "max", isSignal: true, isRequired: false, transformFunction: null } }, providers: [CONTROL_VALUE(WIANumberBox)], usesInheritance: true, ngImport: i0, template: "<div [id]=\"_id + '-container'\" class=\"coer-textbox\" \r\n    [ngClass]=\"{ \r\n        'background-color-readonly': isReadonly(), \r\n        'invisible': isInvisible(),\r\n        'display-none': isHidden(), \r\n    }\"\r\n    [ngStyle]=\"{\r\n        width       : width(), \r\n        minWidth    : minWidth(),\r\n        maxWidth    : maxWidth(),\r\n        marginTop   : marginTop(),\r\n        marginRight : marginRight(),\r\n        marginBottom: marginBottom(),\r\n        marginLeft  : marginLeft(),\r\n        height      : ((size() == 'small') ? 'var(--input-height-small)' : 'var(--input-height)') \r\n    }\">  \r\n\r\n    @if(_showExternalButtonLeft()) {\r\n        <div class=\"coer-textbox-button radius-left-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconLeft || ''\"\r\n                [type]=\"externalButtons()?.typeLeft || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorLeft || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyLeft || false)\"\r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickLeft.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n     \r\n    <input \r\n        #inputINNER\r\n        [type]=\"_inputType()\" \r\n        [id]=\"_id\" \r\n        [name]=\"_id\" \r\n        [placeholder]=\"_placeholder()\"\r\n        [value]=\"_ValueByComponent()\"\r\n        [disabled]=\"!_isEnabled()\"\r\n        [minLength]=\"minLength()\"\r\n        [maxLength]=\"maxLength()\"\r\n        (input)=\"_Input($event.target.value)\"\r\n        [ngStyle]=\"{ \r\n            width: _widtht(),\r\n            paddingLeft:  _paddingLeft(),\r\n            paddingRight: _paddingRight(), \r\n            'text-align': textPosition(), \r\n            color: (_isNumberComponent() && !_isFocused() ? 'transparent' : 'var(--dark)')\r\n        }\"> \r\n        \r\n    @if(_isNumberComponent() && !_isFocused()) {\r\n        <input [type]=\"_inputType()\"  \r\n            [name]=\"_id\"\r\n            class=\"position-absolute\" \r\n            [placeholder]=\"_placeholder()\"\r\n            [value]=\"_ValueFormat()\" \r\n            [disabled]=\"!_isEnabled()\"\r\n            (focus)=\"Focus()\"\r\n            [ngStyle]=\"{ \r\n                width: _widtht(),\r\n                paddingLeft:  _paddingLeft(),\r\n                paddingRight: _paddingRight(), \r\n                'text-align': textPosition()\r\n            }\"> \r\n    }\r\n\r\n    @if(_showExternalButtonRight()) {\r\n        <div class=\"coer-textbox-button radius-right-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconRight || ''\"\r\n                [type]=\"externalButtons()?.typeRight || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorRight || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyRight || false)\"  \r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickRight.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n\r\n    @if(_paddingRight() != '10px') {\r\n        <div class=\"icon-container\" [ngStyle]=\"{ right: _right() }\">\r\n            @if(isInvalid() && _isEnabled()) {\r\n                <i class=\"iw-exclamation-circle-fill\"></i>\r\n            }\r\n    \r\n            @else if(isValid() && _isEnabled()) {\r\n                <i class=\"iw-check-circle-fill\"></i>\r\n            }  \r\n\r\n            @if(_showSearchButton()) {\r\n                <i class=\"iw-search\" (click)=\"_ClickSearch()\"></i>\r\n            }\r\n    \r\n            @else if(_showClearButton()) {\r\n                <i class=\"iw-mark\" (click)=\"Clear()\"></i>\r\n            }  \r\n\r\n            @else if(_showSecretClosed()) {\r\n                <i class=\"iw-eye-slash-fill\" (click)=\"_showSecret.set(false); Focus();\"></i>\r\n            }\r\n    \r\n            @else if(_showSecretOpen()) {\r\n                <i class=\"iw-eye-fill\" (click)=\"_showSecret.set(true); Focus();\"></i>\r\n            } \r\n            \r\n            @if(_isSelectComponent() && _isEnabled()) {\r\n                <i [ngClass]=\"{\r\n                    'iw-angle'    : true,\r\n                    'iw-90deg'    : _isCollapsed(),\r\n                    'iw-270deg'   : !_isCollapsed(),\r\n                    'color-primary': !_isCollapsed() && !isValid() && !isInvalid(),\r\n                    'color-success': !_isCollapsed() && isValid()  && !isInvalid(),\r\n                    'color-danger' : !_isCollapsed() && isInvalid(),\r\n                }\" (click)=\"_isCollapsed() ? Focus() : Blur()\"></i>\r\n            } \r\n\r\n            @if(_isNumberComponent() && _showStepIcon() && _isEnabled()) {\r\n                <div [ngClass]=\"{ 'tricks-container': true, 'focus': _isFocused() }\">\r\n                    <i class=\"iw-angle iw-270deg\" (click)=\"_IncrementStep()\"></i>\r\n                    <i class=\"iw-angle iw-90deg\" (click)=\"_DecrementStep()\"></i>\r\n                </div>\r\n            } \r\n        </div>\r\n    }\r\n\r\n    @if(_showLabel()) {\r\n        <label [for]=\"_id\"\r\n            [ngStyle]=\"{ width: _widtht() }\"\r\n            [ngClass]=\"{ \r\n                'focus'          : _isFocused() && IsNotOnlyWhiteSpace(label()),\r\n                'no-empty'       : IsNotOnlyWhiteSpace(_value()),\r\n                'external-button': _showExternalButtonLeft(), \r\n                'display-none'   : isLoading(),\r\n                'isValid'        : isValid(), \r\n                'isInvalid'      : isInvalid(),\r\n                'readonly'       : isReadonly(),\r\n                'small'          : (size() == 'small')\r\n            }\">\r\n            <span [ngClass]=\"{ 'background-color-readonly': isReadonly() }\"> {{ _label() }} </span>\r\n        </label>\r\n    }\r\n\r\n    @if(isLoading()) {\r\n        <div class=\"loading\"></div>\r\n    }\r\n\r\n    @if(_isEnabled()) {\r\n        <div class=\"line\"\r\n            [ngStyle]=\"{ left: _left(), right: _right() }\"\r\n            [ngClass]=\"{   \r\n                'focus'    : _isFocused(), \r\n                'isValid'  : _isFocused() && isValid(), \r\n                'isInvalid': _isFocused() && isInvalid(),\r\n                'display-none': !_isEnabled()\r\n            }\" \r\n        ></div>\r\n    }\r\n\r\n    @if(_isSelectComponent()) {        \r\n        <ul [id]=\"_id + '-options'\" [ngStyle]=\"{ 'max-height' : (_isCollapsed() ? '0px' : '175px') }\">\r\n            @if(_dataSource().length > 0) {\r\n                @for(item of _dataSource(); track item.__index__) {\r\n                    <li [id]=\"_id + '-index' + item.__index__\" [ngClass]=\"{ 'focus': _index() == item.__index__ }\" (click)=\"_SetValue(item)\"> \r\n                        @if(IsNotOnlyWhiteSpace(_GetIconBySelect(item))) {\r\n                            <span class=\"icon-container-option\">\r\n                                <i [class]=\"_GetIconBySelect(item)\"></i> \r\n                            </span>\r\n                        }\r\n        \r\n                        <span class=\"display-property-option\">{{ _GetDisplayBySelect(item) }}</span>    \r\n                    </li>\r\n                } \r\n            }\r\n\r\n            @else {\r\n                <li (click)=\"Blur()\">    \r\n                    <span class=\"display-property-option\"> -- No Options -- </span>    \r\n                </li>\r\n            }\r\n        </ul> \r\n    }\r\n</div>    ", styles: ["div.coer-textbox{align-items:center!important;position:relative!important;border-radius:5px;background-color:var(--input);height:var(--input-height);display:inline-flex}div.coer-textbox div.coer-textbox-button{display:inline!important;background-color:inherit!important;z-index:1!important}div.coer-textbox input{border:none!important;height:inherit!important;padding-top:0!important;padding-bottom:0!important;border-radius:inherit!important;font-size:var(--input-font-size)!important;background-color:inherit!important;color:var(--dark)}div.coer-textbox input:focus{outline:none!important}div.coer-textbox input:disabled{background-color:var(--readonly)}div.coer-textbox div.icon-container{position:absolute!important;top:0!important;bottom:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:10px 10px 10px 5px!important;background-color:inherit!important;border-radius:inherit!important;z-index:1!important;gap:5px!important}div.coer-textbox div.icon-container div.tricks-container{width:20px!important;max-width:20px!important;height:var(--input-height)}div.coer-textbox div.icon-container div.tricks-container i,div.coer-textbox div.icon-container i{cursor:pointer!important;font-size:20px!important}div.coer-textbox div.icon-container i.iw-search,div.coer-textbox div.icon-container i.iw-mark,div.coer-textbox div.icon-container i.iw-eye-fill,div.coer-textbox div.icon-container i.iw-eye-slash-fill{color:color-mix(in srgb,var(--gray),var(--light) 50%)}div.coer-textbox div.icon-container i.iw-search:hover,div.coer-textbox div.icon-container i.iw-mark:hover,div.coer-textbox div.icon-container i.iw-eye-fill:hover,div.coer-textbox div.icon-container i.iw-eye-slash-fill:hover{color:var(--gray)!important}div.coer-textbox div.icon-container i.iw-exclamation-circle-fill{color:var(--danger)}div.coer-textbox div.icon-container i.iw-check-circle-fill{color:var(--success)}div.coer-textbox div.icon-container i.iw-angle{transition:all .3s ease!important;color:var(--gray)}div.coer-textbox div.icon-container i.iw-270deg{color:var(--primary)}div.coer-textbox div.icon-container div.tricks-container{display:flex!important;flex-direction:column!important}div.coer-textbox div.icon-container div.tricks-container i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container i.iw-270deg{color:var(--gray)!important}div.coer-textbox div.icon-container div.tricks-container.focus i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container.focus i.iw-270deg{color:var(--primary)!important}div.coer-textbox label{-webkit-user-select:none!important;user-select:none!important;position:absolute!important;color:var(--gray)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;transform:translate(11px)!important;transition:transform .3s ease!important}div.coer-textbox label span{padding:0 10px!important;border-radius:10px!important;background-color:var(--input)}div.coer-textbox label.focus,div.coer-textbox label.no-empty{font-size:14px!important;font-weight:700!important;transform:translate(5px,calc(var(--input-height) / 2 * -1))!important;background-color:transparent!important}div.coer-textbox label.focus.small,div.coer-textbox label.no-empty.small{font-size:12px!important;transform:translate(5px,-15px)!important}div.coer-textbox label.focus{color:var(--input-focus)!important}div.coer-textbox label.focus.isValid{color:var(--success)!important}div.coer-textbox label.focus.isInvalid{color:var(--danger)!important}div.coer-textbox label.no-empty.readonly{color:var(--dark)!important}div.coer-textbox label.external-button{transform:translate(50px)!important}div.coer-textbox label.focus.external-button,div.coer-textbox label.no-empty.external-button{transform:translate(45px,calc(var(--input-height) / 2 * -1))!important}div.coer-textbox label.focus.external-button.small,div.coer-textbox label.no-empty.external-button.small{transform:translate(45px,-15px)!important}div.coer-textbox div.loading{border-radius:inherit!important;position:absolute!important;z-index:1!important}div.coer-textbox div.line{position:absolute!important;bottom:0!important;z-index:2!important;transition:all .4s ease-in-out!important;border:1px solid var(--gray)}div.coer-textbox div.line.focus{border-color:var(--input-focus)!important}div.coer-textbox div.line.isValid{border-color:var(--success)!important}div.coer-textbox div.line.isInvalid{border-color:var(--danger)!important}div.coer-textbox ul{list-style:none!important;padding-left:0!important;background-color:var(--ghost)!important;border-radius:0 0 5px 5px!important;box-shadow:0 5px 10px -3px var(--dark)!important;position:absolute!important;top:var(--input-height);left:0!important;right:0!important;overflow:auto!important;transition:max-height .3s ease-in-out!important;z-index:var(--z-index-items)!important}div.coer-textbox ul li{min-height:24.2px!important;border-bottom:1px solid var(--loading)!important;display:flex!important;align-items:center!important;padding:5px 10px!important;overflow:hidden!important;cursor:pointer!important;gap:5px!important}div.coer-textbox ul li span.icon-container-option{width:25px!important;max-width:25px!important;display:inherit!important;align-items:inherit!important;justify-content:center!important}div.coer-textbox ul li span.display-property-option{display:flex!important;align-items:center!important;word-break:break-all!important}div.coer-textbox ul li:last-child{border-bottom-color:transparent!important;border-radius:0 0 5px 5px!important}div.coer-textbox ul li:not(.focus):hover{background-color:var(--item-hover)}div.coer-textbox ul li.focus{background-color:var(--item-focus)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: WIAButton, selector: "wia-button", inputs: ["label", "type", "color", "icon", "path", "iconPosition", "isLoading", "isReadonly", "isInvisible", "isHidden", "breakpoints", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "marginTop", "marginRight", "marginBottom", "marginLeft"], outputs: ["onClick", "onDestroy", "onReady"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIANumberBox, decorators: [{
            type: Component,
            args: [{ selector: 'wia-numberbox', providers: [CONTROL_VALUE(WIANumberBox)], standalone: false, template: "<div [id]=\"_id + '-container'\" class=\"coer-textbox\" \r\n    [ngClass]=\"{ \r\n        'background-color-readonly': isReadonly(), \r\n        'invisible': isInvisible(),\r\n        'display-none': isHidden(), \r\n    }\"\r\n    [ngStyle]=\"{\r\n        width       : width(), \r\n        minWidth    : minWidth(),\r\n        maxWidth    : maxWidth(),\r\n        marginTop   : marginTop(),\r\n        marginRight : marginRight(),\r\n        marginBottom: marginBottom(),\r\n        marginLeft  : marginLeft(),\r\n        height      : ((size() == 'small') ? 'var(--input-height-small)' : 'var(--input-height)') \r\n    }\">  \r\n\r\n    @if(_showExternalButtonLeft()) {\r\n        <div class=\"coer-textbox-button radius-left-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconLeft || ''\"\r\n                [type]=\"externalButtons()?.typeLeft || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorLeft || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyLeft || false)\"\r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickLeft.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n     \r\n    <input \r\n        #inputINNER\r\n        [type]=\"_inputType()\" \r\n        [id]=\"_id\" \r\n        [name]=\"_id\" \r\n        [placeholder]=\"_placeholder()\"\r\n        [value]=\"_ValueByComponent()\"\r\n        [disabled]=\"!_isEnabled()\"\r\n        [minLength]=\"minLength()\"\r\n        [maxLength]=\"maxLength()\"\r\n        (input)=\"_Input($event.target.value)\"\r\n        [ngStyle]=\"{ \r\n            width: _widtht(),\r\n            paddingLeft:  _paddingLeft(),\r\n            paddingRight: _paddingRight(), \r\n            'text-align': textPosition(), \r\n            color: (_isNumberComponent() && !_isFocused() ? 'transparent' : 'var(--dark)')\r\n        }\"> \r\n        \r\n    @if(_isNumberComponent() && !_isFocused()) {\r\n        <input [type]=\"_inputType()\"  \r\n            [name]=\"_id\"\r\n            class=\"position-absolute\" \r\n            [placeholder]=\"_placeholder()\"\r\n            [value]=\"_ValueFormat()\" \r\n            [disabled]=\"!_isEnabled()\"\r\n            (focus)=\"Focus()\"\r\n            [ngStyle]=\"{ \r\n                width: _widtht(),\r\n                paddingLeft:  _paddingLeft(),\r\n                paddingRight: _paddingRight(), \r\n                'text-align': textPosition()\r\n            }\"> \r\n    }\r\n\r\n    @if(_showExternalButtonRight()) {\r\n        <div class=\"coer-textbox-button radius-right-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconRight || ''\"\r\n                [type]=\"externalButtons()?.typeRight || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorRight || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyRight || false)\"  \r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickRight.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n\r\n    @if(_paddingRight() != '10px') {\r\n        <div class=\"icon-container\" [ngStyle]=\"{ right: _right() }\">\r\n            @if(isInvalid() && _isEnabled()) {\r\n                <i class=\"iw-exclamation-circle-fill\"></i>\r\n            }\r\n    \r\n            @else if(isValid() && _isEnabled()) {\r\n                <i class=\"iw-check-circle-fill\"></i>\r\n            }  \r\n\r\n            @if(_showSearchButton()) {\r\n                <i class=\"iw-search\" (click)=\"_ClickSearch()\"></i>\r\n            }\r\n    \r\n            @else if(_showClearButton()) {\r\n                <i class=\"iw-mark\" (click)=\"Clear()\"></i>\r\n            }  \r\n\r\n            @else if(_showSecretClosed()) {\r\n                <i class=\"iw-eye-slash-fill\" (click)=\"_showSecret.set(false); Focus();\"></i>\r\n            }\r\n    \r\n            @else if(_showSecretOpen()) {\r\n                <i class=\"iw-eye-fill\" (click)=\"_showSecret.set(true); Focus();\"></i>\r\n            } \r\n            \r\n            @if(_isSelectComponent() && _isEnabled()) {\r\n                <i [ngClass]=\"{\r\n                    'iw-angle'    : true,\r\n                    'iw-90deg'    : _isCollapsed(),\r\n                    'iw-270deg'   : !_isCollapsed(),\r\n                    'color-primary': !_isCollapsed() && !isValid() && !isInvalid(),\r\n                    'color-success': !_isCollapsed() && isValid()  && !isInvalid(),\r\n                    'color-danger' : !_isCollapsed() && isInvalid(),\r\n                }\" (click)=\"_isCollapsed() ? Focus() : Blur()\"></i>\r\n            } \r\n\r\n            @if(_isNumberComponent() && _showStepIcon() && _isEnabled()) {\r\n                <div [ngClass]=\"{ 'tricks-container': true, 'focus': _isFocused() }\">\r\n                    <i class=\"iw-angle iw-270deg\" (click)=\"_IncrementStep()\"></i>\r\n                    <i class=\"iw-angle iw-90deg\" (click)=\"_DecrementStep()\"></i>\r\n                </div>\r\n            } \r\n        </div>\r\n    }\r\n\r\n    @if(_showLabel()) {\r\n        <label [for]=\"_id\"\r\n            [ngStyle]=\"{ width: _widtht() }\"\r\n            [ngClass]=\"{ \r\n                'focus'          : _isFocused() && IsNotOnlyWhiteSpace(label()),\r\n                'no-empty'       : IsNotOnlyWhiteSpace(_value()),\r\n                'external-button': _showExternalButtonLeft(), \r\n                'display-none'   : isLoading(),\r\n                'isValid'        : isValid(), \r\n                'isInvalid'      : isInvalid(),\r\n                'readonly'       : isReadonly(),\r\n                'small'          : (size() == 'small')\r\n            }\">\r\n            <span [ngClass]=\"{ 'background-color-readonly': isReadonly() }\"> {{ _label() }} </span>\r\n        </label>\r\n    }\r\n\r\n    @if(isLoading()) {\r\n        <div class=\"loading\"></div>\r\n    }\r\n\r\n    @if(_isEnabled()) {\r\n        <div class=\"line\"\r\n            [ngStyle]=\"{ left: _left(), right: _right() }\"\r\n            [ngClass]=\"{   \r\n                'focus'    : _isFocused(), \r\n                'isValid'  : _isFocused() && isValid(), \r\n                'isInvalid': _isFocused() && isInvalid(),\r\n                'display-none': !_isEnabled()\r\n            }\" \r\n        ></div>\r\n    }\r\n\r\n    @if(_isSelectComponent()) {        \r\n        <ul [id]=\"_id + '-options'\" [ngStyle]=\"{ 'max-height' : (_isCollapsed() ? '0px' : '175px') }\">\r\n            @if(_dataSource().length > 0) {\r\n                @for(item of _dataSource(); track item.__index__) {\r\n                    <li [id]=\"_id + '-index' + item.__index__\" [ngClass]=\"{ 'focus': _index() == item.__index__ }\" (click)=\"_SetValue(item)\"> \r\n                        @if(IsNotOnlyWhiteSpace(_GetIconBySelect(item))) {\r\n                            <span class=\"icon-container-option\">\r\n                                <i [class]=\"_GetIconBySelect(item)\"></i> \r\n                            </span>\r\n                        }\r\n        \r\n                        <span class=\"display-property-option\">{{ _GetDisplayBySelect(item) }}</span>    \r\n                    </li>\r\n                } \r\n            }\r\n\r\n            @else {\r\n                <li (click)=\"Blur()\">    \r\n                    <span class=\"display-property-option\"> -- No Options -- </span>    \r\n                </li>\r\n            }\r\n        </ul> \r\n    }\r\n</div>    ", styles: ["div.coer-textbox{align-items:center!important;position:relative!important;border-radius:5px;background-color:var(--input);height:var(--input-height);display:inline-flex}div.coer-textbox div.coer-textbox-button{display:inline!important;background-color:inherit!important;z-index:1!important}div.coer-textbox input{border:none!important;height:inherit!important;padding-top:0!important;padding-bottom:0!important;border-radius:inherit!important;font-size:var(--input-font-size)!important;background-color:inherit!important;color:var(--dark)}div.coer-textbox input:focus{outline:none!important}div.coer-textbox input:disabled{background-color:var(--readonly)}div.coer-textbox div.icon-container{position:absolute!important;top:0!important;bottom:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:10px 10px 10px 5px!important;background-color:inherit!important;border-radius:inherit!important;z-index:1!important;gap:5px!important}div.coer-textbox div.icon-container div.tricks-container{width:20px!important;max-width:20px!important;height:var(--input-height)}div.coer-textbox div.icon-container div.tricks-container i,div.coer-textbox div.icon-container i{cursor:pointer!important;font-size:20px!important}div.coer-textbox div.icon-container i.iw-search,div.coer-textbox div.icon-container i.iw-mark,div.coer-textbox div.icon-container i.iw-eye-fill,div.coer-textbox div.icon-container i.iw-eye-slash-fill{color:color-mix(in srgb,var(--gray),var(--light) 50%)}div.coer-textbox div.icon-container i.iw-search:hover,div.coer-textbox div.icon-container i.iw-mark:hover,div.coer-textbox div.icon-container i.iw-eye-fill:hover,div.coer-textbox div.icon-container i.iw-eye-slash-fill:hover{color:var(--gray)!important}div.coer-textbox div.icon-container i.iw-exclamation-circle-fill{color:var(--danger)}div.coer-textbox div.icon-container i.iw-check-circle-fill{color:var(--success)}div.coer-textbox div.icon-container i.iw-angle{transition:all .3s ease!important;color:var(--gray)}div.coer-textbox div.icon-container i.iw-270deg{color:var(--primary)}div.coer-textbox div.icon-container div.tricks-container{display:flex!important;flex-direction:column!important}div.coer-textbox div.icon-container div.tricks-container i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container i.iw-270deg{color:var(--gray)!important}div.coer-textbox div.icon-container div.tricks-container.focus i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container.focus i.iw-270deg{color:var(--primary)!important}div.coer-textbox label{-webkit-user-select:none!important;user-select:none!important;position:absolute!important;color:var(--gray)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;transform:translate(11px)!important;transition:transform .3s ease!important}div.coer-textbox label span{padding:0 10px!important;border-radius:10px!important;background-color:var(--input)}div.coer-textbox label.focus,div.coer-textbox label.no-empty{font-size:14px!important;font-weight:700!important;transform:translate(5px,calc(var(--input-height) / 2 * -1))!important;background-color:transparent!important}div.coer-textbox label.focus.small,div.coer-textbox label.no-empty.small{font-size:12px!important;transform:translate(5px,-15px)!important}div.coer-textbox label.focus{color:var(--input-focus)!important}div.coer-textbox label.focus.isValid{color:var(--success)!important}div.coer-textbox label.focus.isInvalid{color:var(--danger)!important}div.coer-textbox label.no-empty.readonly{color:var(--dark)!important}div.coer-textbox label.external-button{transform:translate(50px)!important}div.coer-textbox label.focus.external-button,div.coer-textbox label.no-empty.external-button{transform:translate(45px,calc(var(--input-height) / 2 * -1))!important}div.coer-textbox label.focus.external-button.small,div.coer-textbox label.no-empty.external-button.small{transform:translate(45px,-15px)!important}div.coer-textbox div.loading{border-radius:inherit!important;position:absolute!important;z-index:1!important}div.coer-textbox div.line{position:absolute!important;bottom:0!important;z-index:2!important;transition:all .4s ease-in-out!important;border:1px solid var(--gray)}div.coer-textbox div.line.focus{border-color:var(--input-focus)!important}div.coer-textbox div.line.isValid{border-color:var(--success)!important}div.coer-textbox div.line.isInvalid{border-color:var(--danger)!important}div.coer-textbox ul{list-style:none!important;padding-left:0!important;background-color:var(--ghost)!important;border-radius:0 0 5px 5px!important;box-shadow:0 5px 10px -3px var(--dark)!important;position:absolute!important;top:var(--input-height);left:0!important;right:0!important;overflow:auto!important;transition:max-height .3s ease-in-out!important;z-index:var(--z-index-items)!important}div.coer-textbox ul li{min-height:24.2px!important;border-bottom:1px solid var(--loading)!important;display:flex!important;align-items:center!important;padding:5px 10px!important;overflow:hidden!important;cursor:pointer!important;gap:5px!important}div.coer-textbox ul li span.icon-container-option{width:25px!important;max-width:25px!important;display:inherit!important;align-items:inherit!important;justify-content:center!important}div.coer-textbox ul li span.display-property-option{display:flex!important;align-items:center!important;word-break:break-all!important}div.coer-textbox ul li:last-child{border-bottom-color:transparent!important;border-radius:0 0 5px 5px!important}div.coer-textbox ul li:not(.focus):hover{background-color:var(--item-hover)}div.coer-textbox ul li.focus{background-color:var(--item-focus)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { minLength: [{ type: i0.Input, args: [{ isSignal: true, alias: "minLength", required: false }] }], maxLength: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxLength", required: false }] }], format: [{ type: i0.Input, args: [{ isSignal: true, alias: "format", required: false }] }], decimals: [{ type: i0.Input, args: [{ isSignal: true, alias: "decimals", required: false }] }], step: [{ type: i0.Input, args: [{ isSignal: true, alias: "step", required: false }] }], showStepIcon: [{ type: i0.Input, args: [{ isSignal: true, alias: "showStepIcon", required: false }] }], min: [{ type: i0.Input, args: [{ isSignal: true, alias: "min", required: false }] }], max: [{ type: i0.Input, args: [{ isSignal: true, alias: "max", required: false }] }] } });

class WIASelectBox extends WIATextBox {
    //Variables
    effectRef;
    _htmlElement = null;
    _isSelectComponent = signal(true, ...(ngDevMode ? [{ debugName: "_isSelectComponent" }] : /* istanbul ignore next */ []));
    _isFocused = signal(false, ...(ngDevMode ? [{ debugName: "_isFocused" }] : /* istanbul ignore next */ []));
    _search = signal('', ...(ngDevMode ? [{ debugName: "_search" }] : /* istanbul ignore next */ []));
    _index = signal(-1, ...(ngDevMode ? [{ debugName: "_index" }] : /* istanbul ignore next */ []));
    _isHoverElement = signal(false, ...(ngDevMode ? [{ debugName: "_isHoverElement" }] : /* istanbul ignore next */ []));
    _arrayType = signal('object', ...(ngDevMode ? [{ debugName: "_arrayType" }] : /* istanbul ignore next */ []));
    _applySearch = signal(false, ...(ngDevMode ? [{ debugName: "_applySearch" }] : /* istanbul ignore next */ []));
    _isLoading = false;
    //Input      
    selectOnFocus = input(true, ...(ngDevMode ? [{ debugName: "selectOnFocus" }] : /* istanbul ignore next */ []));
    showClearButton = input(true, ...(ngDevMode ? [{ debugName: "showClearButton" }] : /* istanbul ignore next */ []));
    dataSource = input([], ...(ngDevMode ? [{ debugName: "dataSource" }] : /* istanbul ignore next */ []));
    displayProperty = input('Name', ...(ngDevMode ? [{ debugName: "displayProperty" }] : /* istanbul ignore next */ []));
    useIconProperty = input(false, ...(ngDevMode ? [{ debugName: "useIconProperty" }] : /* istanbul ignore next */ []));
    //Output
    onValueChange = output();
    onOpen = output();
    onClose = output();
    constructor() {
        super();
        this.effectRef = effect(() => {
            const SEARCH = this._search();
            const APPLY_SEARCH = this._applySearch();
            let DATA_SOURCE = this.dataSource();
            if (DATA_SOURCE.every(x => Tools.IsString(x)))
                this._arrayType.set('string');
            else if (DATA_SOURCE.every(x => Numbers.IsNumber(x, true)))
                this._arrayType.set('number');
            else
                this._arrayType.set('object');
            DATA_SOURCE = Collections.SetIndex(DATA_SOURCE
                .map(item => this._arrayType() != 'object' ? { [this.displayProperty()]: String(item) } : item)
                .filter(item => (Tools.IsNotOnlyWhiteSpace(SEARCH) && APPLY_SEARCH)
                ? String(item[this.displayProperty()]).toLowerCase().includes(SEARCH.toLowerCase()) : true));
            this._dataSource.set(DATA_SOURCE);
        }, ...(ngDevMode ? [{ debugName: "effectRef" }] : /* istanbul ignore next */ []));
    }
    //Computed
    _valueCalculated = computed(() => this._arrayType() != 'object' ? this._value() : this._value()[this.displayProperty()], ...(ngDevMode ? [{ debugName: "_valueCalculated" }] : /* istanbul ignore next */ []));
    //Function
    _onPaste = () => {
        Tools.Sleep().then(() => this._search.set(this._search().trim()));
    };
    //Function
    _onFocus = () => {
        if (this._isEnabled())
            this.Focus();
        else
            this.Blur();
    };
    //Function
    _onBlur = () => {
        if (this._isLoading || this._isHoverElement())
            return;
        else
            this.Blur();
    };
    //Function
    _onKeyup = (event) => {
        const { key } = event;
        if (['ArrowUp', 'ArrowDown'].includes(key)) {
            if (this._isCollapsed()) {
                this._isCollapsed.set(false);
                this.onOpen.emit();
                return;
            }
            if (key === 'ArrowUp') {
                const firstIndex = (this._dataSource().length <= 0) ? -1 : 0;
                if ((this._index() - 1) >= firstIndex) {
                    this._index.update(index => index - 1);
                }
                else {
                    this._index.set(-1);
                    this._htmlElement?.focus();
                    this._htmlElement?.select();
                }
            }
            if (key === 'ArrowDown') {
                const lastIndex = (this._dataSource().length - 1);
                if ((this._index() + 1) <= lastIndex) {
                    this._index.update(index => index + 1);
                }
            }
            HTMLElements.ScrollToElement(`#${this._id}-index${this._index()}`);
            return;
        }
        const selectedItem = this._dataSource().find(x => x.__index__ == this._index());
        this._applySearch.set(true);
        if (['ArrowLeft', 'ArrowRight'].includes(key)) {
            if (this._isCollapsed()) {
                this._isCollapsed.set(false);
                this.onOpen.emit();
            }
            if (Tools.IsNotOnlyWhiteSpace(this._value())) {
                Tools.Sleep(0, 'ArrowLeftArrowRight').then(() => {
                    const value = this._value()[this.displayProperty()];
                    const index = this._dataSource().findIndex(item => String(item[this.displayProperty()]) == value);
                    this._index.set(index);
                    HTMLElements.ScrollToElement(`#${this._id}-index${index}`);
                });
            }
        }
        else if (key === 'Enter') {
            if (selectedItem)
                this._SetValue(selectedItem);
            this.onKeyupEnter.emit(this._value());
        }
        else if (key === 'Delete') {
            if (this._showClearButton()) {
                this.Clear();
            }
        }
    };
    Destructor() {
        super.Destructor();
        this.effectRef?.destroy();
    }
    //Computed
    _placeholder = computed(() => {
        return Tools.HasProperty(this._value(), this.displayProperty()) ? this._value()[this.displayProperty()] : '';
    }, ...(ngDevMode ? [{ debugName: "_placeholder" }] : /* istanbul ignore next */ []));
    //Computed
    _showClearButton = computed(() => {
        return this.showClearButton()
            && this._isEnabled()
            && this.IsNotOnlyWhiteSpace(this._value())
            && this.IsOnlyWhiteSpace(this._search());
    }, ...(ngDevMode ? [{ debugName: "_showClearButton" }] : /* istanbul ignore next */ []));
    //Computed
    _showSearchButton = computed(() => {
        return this.showSearchButton()
            && !this._showClearButton()
            && this._isEnabled()
            && this.IsNotOnlyWhiteSpace(this._value());
    }, ...(ngDevMode ? [{ debugName: "_showSearchButton" }] : /* istanbul ignore next */ []));
    /** Sets the value of the component */
    _SetValue(value) {
        try {
            if (typeof value != 'object') {
                value = { [this.displayProperty()]: String(value) };
            }
            if (Tools.IsNotOnlyWhiteSpace(value)) {
                value = this.dataSource()
                    .map(item => this._arrayType() != 'object' ? { [this.displayProperty()]: String(item) } : item)
                    .find((item) => String(item[this.displayProperty()]) === String(value[this.displayProperty()])) || null;
            }
        }
        catch {
            value = null;
        }
        finally {
            if (Tools.IsNotOnlyWhiteSpace(value)) {
                if (this._arrayType() === 'string')
                    value = String(value[this.displayProperty()]);
                else if (this._arrayType() === 'number')
                    value = Number(value[this.displayProperty()]);
            }
            if (this._useModelBinding()) {
                this._UpdateValue()(value);
            }
            if (!this.isLoading())
                this.onValueChange.emit(value);
            this._value.set(value);
            this._ResetSearch(value);
            this.Blur();
        }
    }
    //Function
    _GetIconBySelect = (item) => {
        return this.useIconProperty() ? (item?.icon || '') : '';
    };
    //Function
    _GetDisplayBySelect = (item) => {
        try {
            return item[this.displayProperty()] || '';
        }
        catch {
            return '';
        }
    };
    //Computed
    _ValueByComponent = computed(() => {
        return this._arrayType() == 'object' ? this._search() : this._valueCalculated();
    }, ...(ngDevMode ? [{ debugName: "_ValueByComponent" }] : /* istanbul ignore next */ []));
    //Function
    _Input = (value) => {
        this._index.set(0);
        this._search.set(value);
    };
    //Function
    _ResetSearch(value) {
        this._search.set(Tools.IsNotOnlyWhiteSpace(value) ? value[this.displayProperty()] : '');
    }
    /** */
    async Focus(open = true) {
        if (this._isLoading)
            return;
        if (this._isEnabled()) {
            this._isLoading = true;
            await Tools.Sleep();
            if (this.selectOnFocus())
                this._htmlElement?.select();
            else
                this._htmlElement?.focus();
            this._applySearch.set(false);
            this._isFocused.set(true);
            if (open) {
                this._isCollapsed.set(false);
                this.onOpen.emit();
            }
            if (Tools.IsNotOnlyWhiteSpace(this._value())) {
                const value = this._valueCalculated();
                const index = this._dataSource().findIndex(item => String(item[this.displayProperty()]) == value);
                this._index.set(index);
                HTMLElements.ScrollToElement(`#${this._id}-index${index}`);
            }
            this._isLoading = false;
        }
        else
            this.Blur();
    }
    /** */
    async Blur() {
        if (this._isLoading || this._isDestroyed())
            return;
        this._isLoading = true;
        this._search.set(Tools.IsNotOnlyWhiteSpace(this._value()) ? this._value()[this.displayProperty()] : '');
        if (!this.isTouched() && this._isFocused() && this._isElementReady())
            this.SetTouched(true);
        await Tools.Sleep();
        this._htmlElement?.blur();
        this._isCollapsed.set(true);
        this._isFocused.set(false);
        this._index.set(-1);
        this.onClose.emit();
        this._isLoading = false;
    }
    /** */
    Clear() {
        this._SetValue(null);
        this.onClickClear.emit();
    }
    /**  */
    Select(callback, property = 'id') {
        let item = null;
        try {
            if (Tools.IsFunction(callback)) {
                item = this.dataSource().find(callback) || null;
            }
            else {
                item = this.dataSource().find((x) => String(x[property] || '') == String(callback)) || null;
            }
            this._SetValue(item);
        }
        catch {
            item = null;
        }
        return Tools.IsNotOnlyWhiteSpace(item) ? Tools.BreakReference(item) : null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIASelectBox, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIASelectBox, isStandalone: false, selector: "wia-selectbox", inputs: { selectOnFocus: { classPropertyName: "selectOnFocus", publicName: "selectOnFocus", isSignal: true, isRequired: false, transformFunction: null }, showClearButton: { classPropertyName: "showClearButton", publicName: "showClearButton", isSignal: true, isRequired: false, transformFunction: null }, dataSource: { classPropertyName: "dataSource", publicName: "dataSource", isSignal: true, isRequired: false, transformFunction: null }, displayProperty: { classPropertyName: "displayProperty", publicName: "displayProperty", isSignal: true, isRequired: false, transformFunction: null }, useIconProperty: { classPropertyName: "useIconProperty", publicName: "useIconProperty", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onValueChange: "onValueChange", onOpen: "onOpen", onClose: "onClose" }, providers: [CONTROL_VALUE(WIASelectBox)], usesInheritance: true, ngImport: i0, template: "<div [id]=\"_id + '-container'\" class=\"coer-textbox\" \r\n    [ngClass]=\"{ \r\n        'background-color-readonly': isReadonly(), \r\n        'invisible': isInvisible(),\r\n        'display-none': isHidden(), \r\n    }\"\r\n    [ngStyle]=\"{\r\n        width       : width(), \r\n        minWidth    : minWidth(),\r\n        maxWidth    : maxWidth(),\r\n        marginTop   : marginTop(),\r\n        marginRight : marginRight(),\r\n        marginBottom: marginBottom(),\r\n        marginLeft  : marginLeft(),\r\n        height      : ((size() == 'small') ? 'var(--input-height-small)' : 'var(--input-height)') \r\n    }\">  \r\n\r\n    @if(_showExternalButtonLeft()) {\r\n        <div class=\"coer-textbox-button radius-left-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconLeft || ''\"\r\n                [type]=\"externalButtons()?.typeLeft || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorLeft || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyLeft || false)\"\r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickLeft.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n     \r\n    <input \r\n        #inputINNER\r\n        [type]=\"_inputType()\" \r\n        [id]=\"_id\" \r\n        [name]=\"_id\" \r\n        [placeholder]=\"_placeholder()\"\r\n        [value]=\"_ValueByComponent()\"\r\n        [disabled]=\"!_isEnabled()\"\r\n        [minLength]=\"minLength()\"\r\n        [maxLength]=\"maxLength()\"\r\n        (input)=\"_Input($event.target.value)\"\r\n        [ngStyle]=\"{ \r\n            width: _widtht(),\r\n            paddingLeft:  _paddingLeft(),\r\n            paddingRight: _paddingRight(), \r\n            'text-align': textPosition(), \r\n            color: (_isNumberComponent() && !_isFocused() ? 'transparent' : 'var(--dark)')\r\n        }\"> \r\n        \r\n    @if(_isNumberComponent() && !_isFocused()) {\r\n        <input [type]=\"_inputType()\"  \r\n            [name]=\"_id\"\r\n            class=\"position-absolute\" \r\n            [placeholder]=\"_placeholder()\"\r\n            [value]=\"_ValueFormat()\" \r\n            [disabled]=\"!_isEnabled()\"\r\n            (focus)=\"Focus()\"\r\n            [ngStyle]=\"{ \r\n                width: _widtht(),\r\n                paddingLeft:  _paddingLeft(),\r\n                paddingRight: _paddingRight(), \r\n                'text-align': textPosition()\r\n            }\"> \r\n    }\r\n\r\n    @if(_showExternalButtonRight()) {\r\n        <div class=\"coer-textbox-button radius-right-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconRight || ''\"\r\n                [type]=\"externalButtons()?.typeRight || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorRight || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyRight || false)\"  \r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickRight.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n\r\n    @if(_paddingRight() != '10px') {\r\n        <div class=\"icon-container\" [ngStyle]=\"{ right: _right() }\">\r\n            @if(isInvalid() && _isEnabled()) {\r\n                <i class=\"iw-exclamation-circle-fill\"></i>\r\n            }\r\n    \r\n            @else if(isValid() && _isEnabled()) {\r\n                <i class=\"iw-check-circle-fill\"></i>\r\n            }  \r\n\r\n            @if(_showSearchButton()) {\r\n                <i class=\"iw-search\" (click)=\"_ClickSearch()\"></i>\r\n            }\r\n    \r\n            @else if(_showClearButton()) {\r\n                <i class=\"iw-mark\" (click)=\"Clear()\"></i>\r\n            }  \r\n\r\n            @else if(_showSecretClosed()) {\r\n                <i class=\"iw-eye-slash-fill\" (click)=\"_showSecret.set(false); Focus();\"></i>\r\n            }\r\n    \r\n            @else if(_showSecretOpen()) {\r\n                <i class=\"iw-eye-fill\" (click)=\"_showSecret.set(true); Focus();\"></i>\r\n            } \r\n            \r\n            @if(_isSelectComponent() && _isEnabled()) {\r\n                <i [ngClass]=\"{\r\n                    'iw-angle'    : true,\r\n                    'iw-90deg'    : _isCollapsed(),\r\n                    'iw-270deg'   : !_isCollapsed(),\r\n                    'color-primary': !_isCollapsed() && !isValid() && !isInvalid(),\r\n                    'color-success': !_isCollapsed() && isValid()  && !isInvalid(),\r\n                    'color-danger' : !_isCollapsed() && isInvalid(),\r\n                }\" (click)=\"_isCollapsed() ? Focus() : Blur()\"></i>\r\n            } \r\n\r\n            @if(_isNumberComponent() && _showStepIcon() && _isEnabled()) {\r\n                <div [ngClass]=\"{ 'tricks-container': true, 'focus': _isFocused() }\">\r\n                    <i class=\"iw-angle iw-270deg\" (click)=\"_IncrementStep()\"></i>\r\n                    <i class=\"iw-angle iw-90deg\" (click)=\"_DecrementStep()\"></i>\r\n                </div>\r\n            } \r\n        </div>\r\n    }\r\n\r\n    @if(_showLabel()) {\r\n        <label [for]=\"_id\"\r\n            [ngStyle]=\"{ width: _widtht() }\"\r\n            [ngClass]=\"{ \r\n                'focus'          : _isFocused() && IsNotOnlyWhiteSpace(label()),\r\n                'no-empty'       : IsNotOnlyWhiteSpace(_value()),\r\n                'external-button': _showExternalButtonLeft(), \r\n                'display-none'   : isLoading(),\r\n                'isValid'        : isValid(), \r\n                'isInvalid'      : isInvalid(),\r\n                'readonly'       : isReadonly(),\r\n                'small'          : (size() == 'small')\r\n            }\">\r\n            <span [ngClass]=\"{ 'background-color-readonly': isReadonly() }\"> {{ _label() }} </span>\r\n        </label>\r\n    }\r\n\r\n    @if(isLoading()) {\r\n        <div class=\"loading\"></div>\r\n    }\r\n\r\n    @if(_isEnabled()) {\r\n        <div class=\"line\"\r\n            [ngStyle]=\"{ left: _left(), right: _right() }\"\r\n            [ngClass]=\"{   \r\n                'focus'    : _isFocused(), \r\n                'isValid'  : _isFocused() && isValid(), \r\n                'isInvalid': _isFocused() && isInvalid(),\r\n                'display-none': !_isEnabled()\r\n            }\" \r\n        ></div>\r\n    }\r\n\r\n    @if(_isSelectComponent()) {        \r\n        <ul [id]=\"_id + '-options'\" [ngStyle]=\"{ 'max-height' : (_isCollapsed() ? '0px' : '175px') }\">\r\n            @if(_dataSource().length > 0) {\r\n                @for(item of _dataSource(); track item.__index__) {\r\n                    <li [id]=\"_id + '-index' + item.__index__\" [ngClass]=\"{ 'focus': _index() == item.__index__ }\" (click)=\"_SetValue(item)\"> \r\n                        @if(IsNotOnlyWhiteSpace(_GetIconBySelect(item))) {\r\n                            <span class=\"icon-container-option\">\r\n                                <i [class]=\"_GetIconBySelect(item)\"></i> \r\n                            </span>\r\n                        }\r\n        \r\n                        <span class=\"display-property-option\">{{ _GetDisplayBySelect(item) }}</span>    \r\n                    </li>\r\n                } \r\n            }\r\n\r\n            @else {\r\n                <li (click)=\"Blur()\">    \r\n                    <span class=\"display-property-option\"> -- No Options -- </span>    \r\n                </li>\r\n            }\r\n        </ul> \r\n    }\r\n</div>    ", styles: ["div.coer-textbox{align-items:center!important;position:relative!important;border-radius:5px;background-color:var(--input);height:var(--input-height);display:inline-flex}div.coer-textbox div.coer-textbox-button{display:inline!important;background-color:inherit!important;z-index:1!important}div.coer-textbox input{border:none!important;height:inherit!important;padding-top:0!important;padding-bottom:0!important;border-radius:inherit!important;font-size:var(--input-font-size)!important;background-color:inherit!important;color:var(--dark)}div.coer-textbox input:focus{outline:none!important}div.coer-textbox input:disabled{background-color:var(--readonly)}div.coer-textbox div.icon-container{position:absolute!important;top:0!important;bottom:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:10px 10px 10px 5px!important;background-color:inherit!important;border-radius:inherit!important;z-index:1!important;gap:5px!important}div.coer-textbox div.icon-container div.tricks-container{width:20px!important;max-width:20px!important;height:var(--input-height)}div.coer-textbox div.icon-container div.tricks-container i,div.coer-textbox div.icon-container i{cursor:pointer!important;font-size:20px!important}div.coer-textbox div.icon-container i.iw-search,div.coer-textbox div.icon-container i.iw-mark,div.coer-textbox div.icon-container i.iw-eye-fill,div.coer-textbox div.icon-container i.iw-eye-slash-fill{color:color-mix(in srgb,var(--gray),var(--light) 50%)}div.coer-textbox div.icon-container i.iw-search:hover,div.coer-textbox div.icon-container i.iw-mark:hover,div.coer-textbox div.icon-container i.iw-eye-fill:hover,div.coer-textbox div.icon-container i.iw-eye-slash-fill:hover{color:var(--gray)!important}div.coer-textbox div.icon-container i.iw-exclamation-circle-fill{color:var(--danger)}div.coer-textbox div.icon-container i.iw-check-circle-fill{color:var(--success)}div.coer-textbox div.icon-container i.iw-angle{transition:all .3s ease!important;color:var(--gray)}div.coer-textbox div.icon-container i.iw-270deg{color:var(--primary)}div.coer-textbox div.icon-container div.tricks-container{display:flex!important;flex-direction:column!important}div.coer-textbox div.icon-container div.tricks-container i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container i.iw-270deg{color:var(--gray)!important}div.coer-textbox div.icon-container div.tricks-container.focus i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container.focus i.iw-270deg{color:var(--primary)!important}div.coer-textbox label{-webkit-user-select:none!important;user-select:none!important;position:absolute!important;color:var(--gray)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;transform:translate(11px)!important;transition:transform .3s ease!important}div.coer-textbox label span{padding:0 10px!important;border-radius:10px!important;background-color:var(--input)}div.coer-textbox label.focus,div.coer-textbox label.no-empty{font-size:14px!important;font-weight:700!important;transform:translate(5px,calc(var(--input-height) / 2 * -1))!important;background-color:transparent!important}div.coer-textbox label.focus.small,div.coer-textbox label.no-empty.small{font-size:12px!important;transform:translate(5px,-15px)!important}div.coer-textbox label.focus{color:var(--input-focus)!important}div.coer-textbox label.focus.isValid{color:var(--success)!important}div.coer-textbox label.focus.isInvalid{color:var(--danger)!important}div.coer-textbox label.no-empty.readonly{color:var(--dark)!important}div.coer-textbox label.external-button{transform:translate(50px)!important}div.coer-textbox label.focus.external-button,div.coer-textbox label.no-empty.external-button{transform:translate(45px,calc(var(--input-height) / 2 * -1))!important}div.coer-textbox label.focus.external-button.small,div.coer-textbox label.no-empty.external-button.small{transform:translate(45px,-15px)!important}div.coer-textbox div.loading{border-radius:inherit!important;position:absolute!important;z-index:1!important}div.coer-textbox div.line{position:absolute!important;bottom:0!important;z-index:2!important;transition:all .4s ease-in-out!important;border:1px solid var(--gray)}div.coer-textbox div.line.focus{border-color:var(--input-focus)!important}div.coer-textbox div.line.isValid{border-color:var(--success)!important}div.coer-textbox div.line.isInvalid{border-color:var(--danger)!important}div.coer-textbox ul{list-style:none!important;padding-left:0!important;background-color:var(--ghost)!important;border-radius:0 0 5px 5px!important;box-shadow:0 5px 10px -3px var(--dark)!important;position:absolute!important;top:var(--input-height);left:0!important;right:0!important;overflow:auto!important;transition:max-height .3s ease-in-out!important;z-index:var(--z-index-items)!important}div.coer-textbox ul li{min-height:24.2px!important;border-bottom:1px solid var(--loading)!important;display:flex!important;align-items:center!important;padding:5px 10px!important;overflow:hidden!important;cursor:pointer!important;gap:5px!important}div.coer-textbox ul li span.icon-container-option{width:25px!important;max-width:25px!important;display:inherit!important;align-items:inherit!important;justify-content:center!important}div.coer-textbox ul li span.display-property-option{display:flex!important;align-items:center!important;word-break:break-all!important}div.coer-textbox ul li:last-child{border-bottom-color:transparent!important;border-radius:0 0 5px 5px!important}div.coer-textbox ul li:not(.focus):hover{background-color:var(--item-hover)}div.coer-textbox ul li.focus{background-color:var(--item-focus)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: WIAButton, selector: "wia-button", inputs: ["label", "type", "color", "icon", "path", "iconPosition", "isLoading", "isReadonly", "isInvisible", "isHidden", "breakpoints", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "marginTop", "marginRight", "marginBottom", "marginLeft"], outputs: ["onClick", "onDestroy", "onReady"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIASelectBox, decorators: [{
            type: Component,
            args: [{ selector: 'wia-selectbox', providers: [CONTROL_VALUE(WIASelectBox)], standalone: false, template: "<div [id]=\"_id + '-container'\" class=\"coer-textbox\" \r\n    [ngClass]=\"{ \r\n        'background-color-readonly': isReadonly(), \r\n        'invisible': isInvisible(),\r\n        'display-none': isHidden(), \r\n    }\"\r\n    [ngStyle]=\"{\r\n        width       : width(), \r\n        minWidth    : minWidth(),\r\n        maxWidth    : maxWidth(),\r\n        marginTop   : marginTop(),\r\n        marginRight : marginRight(),\r\n        marginBottom: marginBottom(),\r\n        marginLeft  : marginLeft(),\r\n        height      : ((size() == 'small') ? 'var(--input-height-small)' : 'var(--input-height)') \r\n    }\">  \r\n\r\n    @if(_showExternalButtonLeft()) {\r\n        <div class=\"coer-textbox-button radius-left-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconLeft || ''\"\r\n                [type]=\"externalButtons()?.typeLeft || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorLeft || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyLeft || false)\"\r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickLeft.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n     \r\n    <input \r\n        #inputINNER\r\n        [type]=\"_inputType()\" \r\n        [id]=\"_id\" \r\n        [name]=\"_id\" \r\n        [placeholder]=\"_placeholder()\"\r\n        [value]=\"_ValueByComponent()\"\r\n        [disabled]=\"!_isEnabled()\"\r\n        [minLength]=\"minLength()\"\r\n        [maxLength]=\"maxLength()\"\r\n        (input)=\"_Input($event.target.value)\"\r\n        [ngStyle]=\"{ \r\n            width: _widtht(),\r\n            paddingLeft:  _paddingLeft(),\r\n            paddingRight: _paddingRight(), \r\n            'text-align': textPosition(), \r\n            color: (_isNumberComponent() && !_isFocused() ? 'transparent' : 'var(--dark)')\r\n        }\"> \r\n        \r\n    @if(_isNumberComponent() && !_isFocused()) {\r\n        <input [type]=\"_inputType()\"  \r\n            [name]=\"_id\"\r\n            class=\"position-absolute\" \r\n            [placeholder]=\"_placeholder()\"\r\n            [value]=\"_ValueFormat()\" \r\n            [disabled]=\"!_isEnabled()\"\r\n            (focus)=\"Focus()\"\r\n            [ngStyle]=\"{ \r\n                width: _widtht(),\r\n                paddingLeft:  _paddingLeft(),\r\n                paddingRight: _paddingRight(), \r\n                'text-align': textPosition()\r\n            }\"> \r\n    }\r\n\r\n    @if(_showExternalButtonRight()) {\r\n        <div class=\"coer-textbox-button radius-right-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconRight || ''\"\r\n                [type]=\"externalButtons()?.typeRight || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorRight || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyRight || false)\"  \r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickRight.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n\r\n    @if(_paddingRight() != '10px') {\r\n        <div class=\"icon-container\" [ngStyle]=\"{ right: _right() }\">\r\n            @if(isInvalid() && _isEnabled()) {\r\n                <i class=\"iw-exclamation-circle-fill\"></i>\r\n            }\r\n    \r\n            @else if(isValid() && _isEnabled()) {\r\n                <i class=\"iw-check-circle-fill\"></i>\r\n            }  \r\n\r\n            @if(_showSearchButton()) {\r\n                <i class=\"iw-search\" (click)=\"_ClickSearch()\"></i>\r\n            }\r\n    \r\n            @else if(_showClearButton()) {\r\n                <i class=\"iw-mark\" (click)=\"Clear()\"></i>\r\n            }  \r\n\r\n            @else if(_showSecretClosed()) {\r\n                <i class=\"iw-eye-slash-fill\" (click)=\"_showSecret.set(false); Focus();\"></i>\r\n            }\r\n    \r\n            @else if(_showSecretOpen()) {\r\n                <i class=\"iw-eye-fill\" (click)=\"_showSecret.set(true); Focus();\"></i>\r\n            } \r\n            \r\n            @if(_isSelectComponent() && _isEnabled()) {\r\n                <i [ngClass]=\"{\r\n                    'iw-angle'    : true,\r\n                    'iw-90deg'    : _isCollapsed(),\r\n                    'iw-270deg'   : !_isCollapsed(),\r\n                    'color-primary': !_isCollapsed() && !isValid() && !isInvalid(),\r\n                    'color-success': !_isCollapsed() && isValid()  && !isInvalid(),\r\n                    'color-danger' : !_isCollapsed() && isInvalid(),\r\n                }\" (click)=\"_isCollapsed() ? Focus() : Blur()\"></i>\r\n            } \r\n\r\n            @if(_isNumberComponent() && _showStepIcon() && _isEnabled()) {\r\n                <div [ngClass]=\"{ 'tricks-container': true, 'focus': _isFocused() }\">\r\n                    <i class=\"iw-angle iw-270deg\" (click)=\"_IncrementStep()\"></i>\r\n                    <i class=\"iw-angle iw-90deg\" (click)=\"_DecrementStep()\"></i>\r\n                </div>\r\n            } \r\n        </div>\r\n    }\r\n\r\n    @if(_showLabel()) {\r\n        <label [for]=\"_id\"\r\n            [ngStyle]=\"{ width: _widtht() }\"\r\n            [ngClass]=\"{ \r\n                'focus'          : _isFocused() && IsNotOnlyWhiteSpace(label()),\r\n                'no-empty'       : IsNotOnlyWhiteSpace(_value()),\r\n                'external-button': _showExternalButtonLeft(), \r\n                'display-none'   : isLoading(),\r\n                'isValid'        : isValid(), \r\n                'isInvalid'      : isInvalid(),\r\n                'readonly'       : isReadonly(),\r\n                'small'          : (size() == 'small')\r\n            }\">\r\n            <span [ngClass]=\"{ 'background-color-readonly': isReadonly() }\"> {{ _label() }} </span>\r\n        </label>\r\n    }\r\n\r\n    @if(isLoading()) {\r\n        <div class=\"loading\"></div>\r\n    }\r\n\r\n    @if(_isEnabled()) {\r\n        <div class=\"line\"\r\n            [ngStyle]=\"{ left: _left(), right: _right() }\"\r\n            [ngClass]=\"{   \r\n                'focus'    : _isFocused(), \r\n                'isValid'  : _isFocused() && isValid(), \r\n                'isInvalid': _isFocused() && isInvalid(),\r\n                'display-none': !_isEnabled()\r\n            }\" \r\n        ></div>\r\n    }\r\n\r\n    @if(_isSelectComponent()) {        \r\n        <ul [id]=\"_id + '-options'\" [ngStyle]=\"{ 'max-height' : (_isCollapsed() ? '0px' : '175px') }\">\r\n            @if(_dataSource().length > 0) {\r\n                @for(item of _dataSource(); track item.__index__) {\r\n                    <li [id]=\"_id + '-index' + item.__index__\" [ngClass]=\"{ 'focus': _index() == item.__index__ }\" (click)=\"_SetValue(item)\"> \r\n                        @if(IsNotOnlyWhiteSpace(_GetIconBySelect(item))) {\r\n                            <span class=\"icon-container-option\">\r\n                                <i [class]=\"_GetIconBySelect(item)\"></i> \r\n                            </span>\r\n                        }\r\n        \r\n                        <span class=\"display-property-option\">{{ _GetDisplayBySelect(item) }}</span>    \r\n                    </li>\r\n                } \r\n            }\r\n\r\n            @else {\r\n                <li (click)=\"Blur()\">    \r\n                    <span class=\"display-property-option\"> -- No Options -- </span>    \r\n                </li>\r\n            }\r\n        </ul> \r\n    }\r\n</div>    ", styles: ["div.coer-textbox{align-items:center!important;position:relative!important;border-radius:5px;background-color:var(--input);height:var(--input-height);display:inline-flex}div.coer-textbox div.coer-textbox-button{display:inline!important;background-color:inherit!important;z-index:1!important}div.coer-textbox input{border:none!important;height:inherit!important;padding-top:0!important;padding-bottom:0!important;border-radius:inherit!important;font-size:var(--input-font-size)!important;background-color:inherit!important;color:var(--dark)}div.coer-textbox input:focus{outline:none!important}div.coer-textbox input:disabled{background-color:var(--readonly)}div.coer-textbox div.icon-container{position:absolute!important;top:0!important;bottom:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:10px 10px 10px 5px!important;background-color:inherit!important;border-radius:inherit!important;z-index:1!important;gap:5px!important}div.coer-textbox div.icon-container div.tricks-container{width:20px!important;max-width:20px!important;height:var(--input-height)}div.coer-textbox div.icon-container div.tricks-container i,div.coer-textbox div.icon-container i{cursor:pointer!important;font-size:20px!important}div.coer-textbox div.icon-container i.iw-search,div.coer-textbox div.icon-container i.iw-mark,div.coer-textbox div.icon-container i.iw-eye-fill,div.coer-textbox div.icon-container i.iw-eye-slash-fill{color:color-mix(in srgb,var(--gray),var(--light) 50%)}div.coer-textbox div.icon-container i.iw-search:hover,div.coer-textbox div.icon-container i.iw-mark:hover,div.coer-textbox div.icon-container i.iw-eye-fill:hover,div.coer-textbox div.icon-container i.iw-eye-slash-fill:hover{color:var(--gray)!important}div.coer-textbox div.icon-container i.iw-exclamation-circle-fill{color:var(--danger)}div.coer-textbox div.icon-container i.iw-check-circle-fill{color:var(--success)}div.coer-textbox div.icon-container i.iw-angle{transition:all .3s ease!important;color:var(--gray)}div.coer-textbox div.icon-container i.iw-270deg{color:var(--primary)}div.coer-textbox div.icon-container div.tricks-container{display:flex!important;flex-direction:column!important}div.coer-textbox div.icon-container div.tricks-container i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container i.iw-270deg{color:var(--gray)!important}div.coer-textbox div.icon-container div.tricks-container.focus i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container.focus i.iw-270deg{color:var(--primary)!important}div.coer-textbox label{-webkit-user-select:none!important;user-select:none!important;position:absolute!important;color:var(--gray)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;transform:translate(11px)!important;transition:transform .3s ease!important}div.coer-textbox label span{padding:0 10px!important;border-radius:10px!important;background-color:var(--input)}div.coer-textbox label.focus,div.coer-textbox label.no-empty{font-size:14px!important;font-weight:700!important;transform:translate(5px,calc(var(--input-height) / 2 * -1))!important;background-color:transparent!important}div.coer-textbox label.focus.small,div.coer-textbox label.no-empty.small{font-size:12px!important;transform:translate(5px,-15px)!important}div.coer-textbox label.focus{color:var(--input-focus)!important}div.coer-textbox label.focus.isValid{color:var(--success)!important}div.coer-textbox label.focus.isInvalid{color:var(--danger)!important}div.coer-textbox label.no-empty.readonly{color:var(--dark)!important}div.coer-textbox label.external-button{transform:translate(50px)!important}div.coer-textbox label.focus.external-button,div.coer-textbox label.no-empty.external-button{transform:translate(45px,calc(var(--input-height) / 2 * -1))!important}div.coer-textbox label.focus.external-button.small,div.coer-textbox label.no-empty.external-button.small{transform:translate(45px,-15px)!important}div.coer-textbox div.loading{border-radius:inherit!important;position:absolute!important;z-index:1!important}div.coer-textbox div.line{position:absolute!important;bottom:0!important;z-index:2!important;transition:all .4s ease-in-out!important;border:1px solid var(--gray)}div.coer-textbox div.line.focus{border-color:var(--input-focus)!important}div.coer-textbox div.line.isValid{border-color:var(--success)!important}div.coer-textbox div.line.isInvalid{border-color:var(--danger)!important}div.coer-textbox ul{list-style:none!important;padding-left:0!important;background-color:var(--ghost)!important;border-radius:0 0 5px 5px!important;box-shadow:0 5px 10px -3px var(--dark)!important;position:absolute!important;top:var(--input-height);left:0!important;right:0!important;overflow:auto!important;transition:max-height .3s ease-in-out!important;z-index:var(--z-index-items)!important}div.coer-textbox ul li{min-height:24.2px!important;border-bottom:1px solid var(--loading)!important;display:flex!important;align-items:center!important;padding:5px 10px!important;overflow:hidden!important;cursor:pointer!important;gap:5px!important}div.coer-textbox ul li span.icon-container-option{width:25px!important;max-width:25px!important;display:inherit!important;align-items:inherit!important;justify-content:center!important}div.coer-textbox ul li span.display-property-option{display:flex!important;align-items:center!important;word-break:break-all!important}div.coer-textbox ul li:last-child{border-bottom-color:transparent!important;border-radius:0 0 5px 5px!important}div.coer-textbox ul li:not(.focus):hover{background-color:var(--item-hover)}div.coer-textbox ul li.focus{background-color:var(--item-focus)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { selectOnFocus: [{ type: i0.Input, args: [{ isSignal: true, alias: "selectOnFocus", required: false }] }], showClearButton: [{ type: i0.Input, args: [{ isSignal: true, alias: "showClearButton", required: false }] }], dataSource: [{ type: i0.Input, args: [{ isSignal: true, alias: "dataSource", required: false }] }], displayProperty: [{ type: i0.Input, args: [{ isSignal: true, alias: "displayProperty", required: false }] }], useIconProperty: [{ type: i0.Input, args: [{ isSignal: true, alias: "useIconProperty", required: false }] }], onValueChange: [{ type: i0.Output, args: ["onValueChange"] }], onOpen: [{ type: i0.Output, args: ["onOpen"] }], onClose: [{ type: i0.Output, args: ["onClose"] }] } });

class WIASwitch extends ControlValue {
    //Variables     
    _value = signal(false, ...(ngDevMode ? [{ debugName: "_value" }] : /* istanbul ignore next */ []));
    _htmlElement;
    //input
    value = input(false, ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    labelPosition = input('right', ...(ngDevMode ? [{ debugName: "labelPosition" }] : /* istanbul ignore next */ []));
    breakLabel = input(true, ...(ngDevMode ? [{ debugName: "breakLabel" }] : /* istanbul ignore next */ []));
    type = input('switch', ...(ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
    color = input('primary', ...(ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []));
    textColor = input(false, ...(ngDevMode ? [{ debugName: "textColor" }] : /* istanbul ignore next */ []));
    tooltip = input('', ...(ngDevMode ? [{ debugName: "tooltip" }] : /* istanbul ignore next */ []));
    tooltipPosition = input('left', ...(ngDevMode ? [{ debugName: "tooltipPosition" }] : /* istanbul ignore next */ []));
    width = input('fit-content', ...(ngDevMode ? [{ debugName: "width" }] : /* istanbul ignore next */ []));
    maxWidth = input('250px', ...(ngDevMode ? [{ debugName: "maxWidth" }] : /* istanbul ignore next */ []));
    //output 
    onClick = output();
    /** Sets the value of the component */
    _SetValue(value) {
        if (Tools.IsNull(value))
            value = false;
        super._SetValue(value);
    }
    //AfterViewInit
    async Start() {
        this._htmlElement = HTMLElements.SelectElementById(this._id);
    }
    //Function
    _Toggle() {
        if (this._isEnabled()) {
            if (this._value())
                this.Uncheck();
            else
                this.Check();
            this.onClick.emit(this._value());
        }
    }
    //Computed
    _textColor = computed(() => {
        return !this.isLoading()
            ? (this._value() && this.textColor() ? `var(--${this.color()})` : 'var(--dark)')
            : 'var(--loading)';
    }, ...(ngDevMode ? [{ debugName: "_textColor" }] : /* istanbul ignore next */ []));
    //Computed
    _checkboxColor = computed(() => {
        return this._value() ? 'var(--light)' : 'transparent';
    }, ...(ngDevMode ? [{ debugName: "_checkboxColor" }] : /* istanbul ignore next */ []));
    /** */
    Check() {
        if (this._isEnabled())
            this._SetValue(true);
    }
    /** */
    Uncheck() {
        if (this._isEnabled())
            this._SetValue(false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIASwitch, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIASwitch, isStandalone: false, selector: "wia-switch", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, labelPosition: { classPropertyName: "labelPosition", publicName: "labelPosition", isSignal: true, isRequired: false, transformFunction: null }, breakLabel: { classPropertyName: "breakLabel", publicName: "breakLabel", isSignal: true, isRequired: false, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: false, transformFunction: null }, textColor: { classPropertyName: "textColor", publicName: "textColor", isSignal: true, isRequired: false, transformFunction: null }, tooltip: { classPropertyName: "tooltip", publicName: "tooltip", isSignal: true, isRequired: false, transformFunction: null }, tooltipPosition: { classPropertyName: "tooltipPosition", publicName: "tooltipPosition", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, maxWidth: { classPropertyName: "maxWidth", publicName: "maxWidth", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onClick: "onClick" }, providers: [CONTROL_VALUE(WIASwitch)], usesInheritance: true, ngImport: i0, template: "<div class=\"coer-switch animation-fadeIn\"\r\n    [ngClass]=\"{ 'display-none': isHidden(), 'invisible': isInvisible() }\"\r\n    [ngStyle]=\"{\r\n        'width'        : width(), \r\n        'max-width'    : maxWidth(), \r\n        'margin-top'   : marginTop(),\r\n        'margin-right' : marginRight(),\r\n        'margin-bottom': marginBottom(),\r\n        'margin-left'  : marginLeft()         \r\n    }\">   \r\n     \r\n    <div class=\"coer-switch-container\" [ngClass]=\"{ 'cursor-pointer': _isEnabled, 'cursor-loading': isLoading() }\">\r\n        @if(labelPosition() === 'left' && IsNotOnlyWhiteSpace(label())) {\r\n            <label [for]=\"_id\" (click)=\"_Toggle()\" [ngStyle]=\"{ 'color': _textColor() }\"\r\n                [ngClass]=\"{ \r\n                    'white-space-nowrap': !breakLabel(),\r\n                    'word-break-all'    : !breakLabel(),                \r\n            }\"> {{ label() | translatory:translatory() }} </label>\r\n        }\r\n         \r\n        @switch(type()) {\r\n            @case('switch') {\r\n                <div [id]=\"_id\" \r\n                    (click)=\"_Toggle()\" \r\n                    class=\"coer-switch-base\"\r\n                    [ngClass]=\"{ 'animation-appear': isLoading() }\" \r\n                    [ngStyle]=\"{ \r\n                        'background-color': !_value() ? 'var(--readonly)' : `var(--${color()}-light)` \r\n                    }\">\r\n                    <div class=\"coer-switch-selector\" \r\n                        [ngStyle]=\"{ \r\n                            'background-color': !_value() ? 'var(--gray)' : `var(--${color()})`,\r\n                            'left': !_value() ? '0px' : '24px' \r\n                    }\"></div>\r\n                </div>\r\n            }\r\n\r\n            @case ('checkbox') {\r\n                <div [id]=\"_id\" \r\n                    (click)=\"_Toggle()\" \r\n                    class=\"coer-checkbox-base\"\r\n                    [ngClass]=\"{ 'animation-appear': isLoading() }\"\r\n                    [ngStyle]=\"{ \r\n                        'background-color': !_value() ? 'var(--light)'   : `var(--${color()})`, \r\n                        'border-color'    : !_value() ? 'var(--readonly)': `var(--${color()})` \r\n                    }\">\r\n\r\n                    <i class=\"iw-check\" [ngStyle]=\"{ color: _checkboxColor() }\"></i>\r\n                </div>\r\n            }\r\n        } \r\n        \r\n        @if(labelPosition() === 'right' && IsNotOnlyWhiteSpace(label())) {\r\n            <label [for]=\"_id\" (click)=\"_Toggle()\" [ngStyle]=\"{ 'color': _textColor() }\"\r\n                [ngClass]=\"{ \r\n                    'white-space-nowrap': !breakLabel(),\r\n                    'word-break-all'    : !breakLabel(),                \r\n            }\"> {{ label() | translatory:translatory() }} </label>\r\n        }\r\n    </div>\r\n</div>     ", styles: ["div.coer-switch{--primary-light: color-mix(in srgb, var(--primary), var(--light) 80%);--secondary-light: color-mix(in srgb, var(--secondary), var(--light) 80%);--success-light: color-mix(in srgb, var(--success), var(--light) 80%);--warning-light: color-mix(in srgb, var(--warning), var(--light) 80%);--danger-light: color-mix(in srgb, var(--danger), var(--light) 80%);--navigation-light: color-mix(in srgb, var(--navigation), var(--light) 80%);--information-light: color-mix(in srgb, var(--information), var(--light) 80%);display:inline-block!important}div.coer-switch div.coer-switch-container{height:var(--input-height)!important;max-height:var(--input-height)!important;display:flex!important;align-items:center!important;gap:5px!important}div.coer-switch div.coer-switch-container div.coer-switch-base{min-width:45px!important;height:16px!important;border-radius:10px!important;position:relative!important}div.coer-switch div.coer-switch-container div.coer-switch-base div.coer-switch-selector{height:22px;width:22px;border-radius:50px;position:absolute!important;top:-3px!important;transition:all .3s ease!important}div.coer-switch div.coer-switch-container div.coer-checkbox-base{width:16px!important;max-width:16px!important;height:16px!important;max-height:16px!important;border:2px solid var(--gray);border-radius:5px!important;transition:all .3s ease!important}div.coer-switch div.coer-switch-container div.coer-checkbox-base i{display:flex!important;transition:color .3s ease!important}div.coer-switch div.coer-switch-container label{cursor:inherit!important;font-weight:700!important;overflow:hidden!important;transition:color .3s ease!important;text-overflow:ellipsis!important;max-width:calc(100% - 50px)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "pipe", type: i2$2.TranslatoryPipe, name: "translatory" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIASwitch, decorators: [{
            type: Component,
            args: [{ selector: 'wia-switch', providers: [CONTROL_VALUE(WIASwitch)], standalone: false, template: "<div class=\"coer-switch animation-fadeIn\"\r\n    [ngClass]=\"{ 'display-none': isHidden(), 'invisible': isInvisible() }\"\r\n    [ngStyle]=\"{\r\n        'width'        : width(), \r\n        'max-width'    : maxWidth(), \r\n        'margin-top'   : marginTop(),\r\n        'margin-right' : marginRight(),\r\n        'margin-bottom': marginBottom(),\r\n        'margin-left'  : marginLeft()         \r\n    }\">   \r\n     \r\n    <div class=\"coer-switch-container\" [ngClass]=\"{ 'cursor-pointer': _isEnabled, 'cursor-loading': isLoading() }\">\r\n        @if(labelPosition() === 'left' && IsNotOnlyWhiteSpace(label())) {\r\n            <label [for]=\"_id\" (click)=\"_Toggle()\" [ngStyle]=\"{ 'color': _textColor() }\"\r\n                [ngClass]=\"{ \r\n                    'white-space-nowrap': !breakLabel(),\r\n                    'word-break-all'    : !breakLabel(),                \r\n            }\"> {{ label() | translatory:translatory() }} </label>\r\n        }\r\n         \r\n        @switch(type()) {\r\n            @case('switch') {\r\n                <div [id]=\"_id\" \r\n                    (click)=\"_Toggle()\" \r\n                    class=\"coer-switch-base\"\r\n                    [ngClass]=\"{ 'animation-appear': isLoading() }\" \r\n                    [ngStyle]=\"{ \r\n                        'background-color': !_value() ? 'var(--readonly)' : `var(--${color()}-light)` \r\n                    }\">\r\n                    <div class=\"coer-switch-selector\" \r\n                        [ngStyle]=\"{ \r\n                            'background-color': !_value() ? 'var(--gray)' : `var(--${color()})`,\r\n                            'left': !_value() ? '0px' : '24px' \r\n                    }\"></div>\r\n                </div>\r\n            }\r\n\r\n            @case ('checkbox') {\r\n                <div [id]=\"_id\" \r\n                    (click)=\"_Toggle()\" \r\n                    class=\"coer-checkbox-base\"\r\n                    [ngClass]=\"{ 'animation-appear': isLoading() }\"\r\n                    [ngStyle]=\"{ \r\n                        'background-color': !_value() ? 'var(--light)'   : `var(--${color()})`, \r\n                        'border-color'    : !_value() ? 'var(--readonly)': `var(--${color()})` \r\n                    }\">\r\n\r\n                    <i class=\"iw-check\" [ngStyle]=\"{ color: _checkboxColor() }\"></i>\r\n                </div>\r\n            }\r\n        } \r\n        \r\n        @if(labelPosition() === 'right' && IsNotOnlyWhiteSpace(label())) {\r\n            <label [for]=\"_id\" (click)=\"_Toggle()\" [ngStyle]=\"{ 'color': _textColor() }\"\r\n                [ngClass]=\"{ \r\n                    'white-space-nowrap': !breakLabel(),\r\n                    'word-break-all'    : !breakLabel(),                \r\n            }\"> {{ label() | translatory:translatory() }} </label>\r\n        }\r\n    </div>\r\n</div>     ", styles: ["div.coer-switch{--primary-light: color-mix(in srgb, var(--primary), var(--light) 80%);--secondary-light: color-mix(in srgb, var(--secondary), var(--light) 80%);--success-light: color-mix(in srgb, var(--success), var(--light) 80%);--warning-light: color-mix(in srgb, var(--warning), var(--light) 80%);--danger-light: color-mix(in srgb, var(--danger), var(--light) 80%);--navigation-light: color-mix(in srgb, var(--navigation), var(--light) 80%);--information-light: color-mix(in srgb, var(--information), var(--light) 80%);display:inline-block!important}div.coer-switch div.coer-switch-container{height:var(--input-height)!important;max-height:var(--input-height)!important;display:flex!important;align-items:center!important;gap:5px!important}div.coer-switch div.coer-switch-container div.coer-switch-base{min-width:45px!important;height:16px!important;border-radius:10px!important;position:relative!important}div.coer-switch div.coer-switch-container div.coer-switch-base div.coer-switch-selector{height:22px;width:22px;border-radius:50px;position:absolute!important;top:-3px!important;transition:all .3s ease!important}div.coer-switch div.coer-switch-container div.coer-checkbox-base{width:16px!important;max-width:16px!important;height:16px!important;max-height:16px!important;border:2px solid var(--gray);border-radius:5px!important;transition:all .3s ease!important}div.coer-switch div.coer-switch-container div.coer-checkbox-base i{display:flex!important;transition:color .3s ease!important}div.coer-switch div.coer-switch-container label{cursor:inherit!important;font-weight:700!important;overflow:hidden!important;transition:color .3s ease!important;text-overflow:ellipsis!important;max-width:calc(100% - 50px)}\n"] }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }], labelPosition: [{ type: i0.Input, args: [{ isSignal: true, alias: "labelPosition", required: false }] }], breakLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "breakLabel", required: false }] }], type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }], color: [{ type: i0.Input, args: [{ isSignal: true, alias: "color", required: false }] }], textColor: [{ type: i0.Input, args: [{ isSignal: true, alias: "textColor", required: false }] }], tooltip: [{ type: i0.Input, args: [{ isSignal: true, alias: "tooltip", required: false }] }], tooltipPosition: [{ type: i0.Input, args: [{ isSignal: true, alias: "tooltipPosition", required: false }] }], width: [{ type: i0.Input, args: [{ isSignal: true, alias: "width", required: false }] }], maxWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxWidth", required: false }] }], onClick: [{ type: i0.Output, args: ["onClick"] }] } });

class WIAGridCell {
    //Elements   
    WIATextBox = viewChild('inputTextbox', ...(ngDevMode ? [{ debugName: "WIATextBox" }] : /* istanbul ignore next */ []));
    coerNumberbox = viewChild('inputNumberbox', ...(ngDevMode ? [{ debugName: "coerNumberbox" }] : /* istanbul ignore next */ []));
    coerSelectbox = viewChild('coerSelectbox', ...(ngDevMode ? [{ debugName: "coerSelectbox" }] : /* istanbul ignore next */ []));
    //protected readonly coerDatebox   = viewChild<WIADateBox>('inputDatebox');
    //Variables
    _isElementReady = signal(false, ...(ngDevMode ? [{ debugName: "_isElementReady" }] : /* istanbul ignore next */ []));
    //Inputs 
    id = input.required(...(ngDevMode ? [{ debugName: "id" }] : /* istanbul ignore next */ []));
    ApplyFormat = input.required(...(ngDevMode ? [{ debugName: "ApplyFormat" }] : /* istanbul ignore next */ []));
    column = input.required(...(ngDevMode ? [{ debugName: "column" }] : /* istanbul ignore next */ []));
    row = input.required(...(ngDevMode ? [{ debugName: "row" }] : /* istanbul ignore next */ []));
    bodySettings = input.required(...(ngDevMode ? [{ debugName: "bodySettings" }] : /* istanbul ignore next */ []));
    isLoadingInner = input.required(...(ngDevMode ? [{ debugName: "isLoadingInner" }] : /* istanbul ignore next */ []));
    isEnabled = input.required(...(ngDevMode ? [{ debugName: "isEnabled" }] : /* istanbul ignore next */ []));
    isDraging = input.required(...(ngDevMode ? [{ debugName: "isDraging" }] : /* istanbul ignore next */ []));
    isDragoverself = input.required(...(ngDevMode ? [{ debugName: "isDragoverself" }] : /* istanbul ignore next */ []));
    isDragoverUp = input.required(...(ngDevMode ? [{ debugName: "isDragoverUp" }] : /* istanbul ignore next */ []));
    isDragoverDown = input.required(...(ngDevMode ? [{ debugName: "isDragoverDown" }] : /* istanbul ignore next */ []));
    //Outputs  
    onClickRow = output();
    onDoubleClickRow = output();
    onInputChange = output();
    onKeyupEnter = output();
    onUpdateType = output();
    ngAfterViewInit() {
        Tools.Sleep(1000).then(() => this._isElementReady.set(true));
    }
    //Function
    _DoubleClick() {
        if (this.isEnabled()) {
            const ROW = { ...this.row() };
            delete ROW['__index__'];
            delete ROW['__checked__'];
            this.onDoubleClickRow.emit(ROW);
        }
    }
    /** */
    _input = computed(() => {
        const COLUMN_CONFIG = this.column().config;
        if (Tools.IsNull(COLUMN_CONFIG?.template)) {
            if (this._ShowInput(COLUMN_CONFIG?.inputSwitch)) {
                return 'inputSwitch';
            }
            else if (this.isEnabled()) {
                if (this._ShowInput(COLUMN_CONFIG?.inputTextbox)) {
                    return 'inputTextbox';
                }
                else if (this._ShowInput(COLUMN_CONFIG?.inputNumberbox)) {
                    return 'inputNumberbox';
                }
                else if (this._ShowInput(COLUMN_CONFIG?.inputSelectbox)) {
                    return 'inputSelectbox';
                }
                else if (this._ShowInput(COLUMN_CONFIG?.inputDatebox)) {
                    return 'inputDatebox';
                }
            }
        }
        return 'HTML';
    }, ...(ngDevMode ? [{ debugName: "_input" }] : /* istanbul ignore next */ []));
    //Computed
    _ShowInput = (property) => {
        const row = { ...this.row() };
        delete row['__index__'];
        delete row['__checked__'];
        return Tools.IsBooleanTrue(property) || (Tools.IsFunction(property) && property({
            property: this.column().config.property,
            row,
            value: row[this.column().config.property]
        })?.showInput);
    };
    //Computed
    _GetCellValue = computed(() => {
        const value = this.row()[this.column().config.property] || '';
        //Template
        if (Tools.IsNotOnlyWhiteSpace(this.column()?.config?.template)) {
            const ROW = { ...this.row() };
            delete ROW['__index__'];
            delete ROW['__checked__'];
            return Tools.IsFunction(this.column().config.template)
                ? this.column().config.template({
                    property: this.column().config.property,
                    row: ROW,
                    value
                })
                : this.column().config.template;
        }
        return this.ApplyFormat()(value, this.column().config.format);
    }, ...(ngDevMode ? [{ debugName: "_GetCellValue" }] : /* istanbul ignore next */ []));
    //Function
    _GetAttributes = () => {
        const FUNCTION = this.column().config[this._input()];
        const ROW = { ...this.row() };
        delete ROW['__index__'];
        delete ROW['__checked__'];
        return (Tools.IsFunction(FUNCTION) && FUNCTION({
            property: this.column().config.property,
            row: ROW,
            value: ROW[this.column().config.property]
        })) || null;
    };
    //Function
    _GetAttributeValue = (attribute, defaultValue = null) => {
        return Tools.IsNotNull(this._GetAttributes())
            ? (Tools.IsNotOnlyWhiteSpace(this._GetAttributes()[attribute]) ? this._GetAttributes()[attribute] : defaultValue)
            : defaultValue;
    };
    //Computed
    _minHeight = computed(() => {
        const BORDERS = !Tools.IsBooleanFalse(this.bodySettings().showBorders) ? '0.800px' : '0px';
        return `calc(${this.column().config.height} - ${BORDERS})`;
    }, ...(ngDevMode ? [{ debugName: "_minHeight" }] : /* istanbul ignore next */ []));
    //Computed
    _GetTextAlignX = computed(() => {
        switch (this.column().config.textAlignX) {
            case 'left': return 'flex-start';
            case 'center': return 'center';
            case 'right': return 'flex-end';
        }
    }, ...(ngDevMode ? [{ debugName: "_GetTextAlignX" }] : /* istanbul ignore next */ []));
    //Computed
    _GetTextBreak = computed(() => {
        return this.column().config.textBreak
            ? 'break-word' : 'keep-all';
    }, ...(ngDevMode ? [{ debugName: "_GetTextBreak" }] : /* istanbul ignore next */ []));
    //Computed
    _GetSpaceBreak = computed(() => {
        return this.column().config.textBreak
            ? 'normal' : 'nowrap';
    }, ...(ngDevMode ? [{ debugName: "_GetSpaceBreak" }] : /* istanbul ignore next */ []));
    //Computed
    _GetTextColor = computed(() => {
        let color = this.column().config?.color;
        if (Tools.IsNotNull(color)) {
            if (Tools.IsFunction(color)) {
                const ROW = { ...this.row() };
                delete ROW['__index__'];
                delete ROW['__checked__'];
                color = color({
                    property: this.column().config.property,
                    row: ROW,
                    value: ROW[this.column().config.property]
                }) || null;
            }
            if (Tools.IsNotOnlyWhiteSpace(color)) {
                return `color-${color} font-weight-bold`;
            }
        }
        return '';
    }, ...(ngDevMode ? [{ debugName: "_GetTextColor" }] : /* istanbul ignore next */ []));
    //Computed
    _GetBackground = computed(() => {
        let background = this.column().config?.background;
        if (Tools.IsNotNull(background)) {
            if (Tools.IsFunction(background)) {
                const ROW = { ...this.row() };
                delete ROW['__index__'];
                delete ROW['__checked__'];
                background = background({
                    property: this.column().config.property,
                    row: ROW,
                    value: ROW[this.column().config.property]
                }) || null;
            }
            if (Tools.IsNotOnlyWhiteSpace(background)) {
                return `background-color-${background}`;
            }
        }
        return '';
    }, ...(ngDevMode ? [{ debugName: "_GetBackground" }] : /* istanbul ignore next */ []));
    /** */
    Focus(onlyFocus = false) {
        switch (this._input()) {
            case 'inputTextbox': {
                this.WIATextBox()?.Focus(onlyFocus);
                break;
            }
            case 'inputNumberbox': {
                this.coerNumberbox()?.Focus(onlyFocus);
                break;
            }
            case 'inputSelectbox': {
                this.coerSelectbox()?.Focus(!onlyFocus);
                break;
            }
            case 'inputDatebox': {
                //Tools.Sleep(100).then(_ => this.coerDatebox());
                break;
            }
        }
    }
    /** */
    _SelectboxChange(value) {
        if (this._isElementReady()) {
            this.onInputChange.emit({
                position: 'BODY',
                input: this._input(),
                property: this.column().config.property,
                before: this.row(),
                value
            });
        }
        else if (`${value}` != `${this.row()[this.column().config.property]}`) {
            this.onUpdateType.emit({
                position: 'BODY',
                input: this._input(),
                property: this.column().config.property,
                before: this.row(),
                value
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAGridCell, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIAGridCell, isStandalone: false, selector: "wia-grid-cell", inputs: { id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: true, transformFunction: null }, ApplyFormat: { classPropertyName: "ApplyFormat", publicName: "ApplyFormat", isSignal: true, isRequired: true, transformFunction: null }, column: { classPropertyName: "column", publicName: "column", isSignal: true, isRequired: true, transformFunction: null }, row: { classPropertyName: "row", publicName: "row", isSignal: true, isRequired: true, transformFunction: null }, bodySettings: { classPropertyName: "bodySettings", publicName: "bodySettings", isSignal: true, isRequired: true, transformFunction: null }, isLoadingInner: { classPropertyName: "isLoadingInner", publicName: "isLoadingInner", isSignal: true, isRequired: true, transformFunction: null }, isEnabled: { classPropertyName: "isEnabled", publicName: "isEnabled", isSignal: true, isRequired: true, transformFunction: null }, isDraging: { classPropertyName: "isDraging", publicName: "isDraging", isSignal: true, isRequired: true, transformFunction: null }, isDragoverself: { classPropertyName: "isDragoverself", publicName: "isDragoverself", isSignal: true, isRequired: true, transformFunction: null }, isDragoverUp: { classPropertyName: "isDragoverUp", publicName: "isDragoverUp", isSignal: true, isRequired: true, transformFunction: null }, isDragoverDown: { classPropertyName: "isDragoverDown", publicName: "isDragoverDown", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { onClickRow: "onClickRow", onDoubleClickRow: "onDoubleClickRow", onInputChange: "onInputChange", onKeyupEnter: "onKeyupEnter", onUpdateType: "onUpdateType" }, viewQueries: [{ propertyName: "WIATextBox", first: true, predicate: ["inputTextbox"], descendants: true, isSignal: true }, { propertyName: "coerNumberbox", first: true, predicate: ["inputNumberbox"], descendants: true, isSignal: true }, { propertyName: "coerSelectbox", first: true, predicate: ["coerSelectbox"], descendants: true, isSignal: true }], ngImport: i0, template: "@if(!isDraging() && isDragoverUp()) {\r\n    <div class=\"dragover-zone\"></div>\r\n}\r\n\r\n<div [ngClass]=\"{ 'draging': isDraging(), 'dragover-zone': isDraging() && isDragoverself() }\">\r\n    @switch(_input()) {\r\n        @case ('inputSwitch') {\r\n            <div [class]=\"_input()\"> \r\n                <wia-switch \r\n                    [id]=\"id()\"\r\n                    [ngModel]=\"row()[column().config.property]\"\r\n                    [isReadonly]=\"!isEnabled() ||!_isElementReady() || _GetAttributeValue('isReadonly', false)\" \r\n                    [type]=\"_GetAttributeValue('type', 'switch')\"\r\n                    [color]=\"_GetAttributeValue('color', 'primary')\"\r\n                    [tooltip]=\"_GetAttributeValue('tooltip', '')\"\r\n                    [tooltipPosition]=\"_GetAttributeValue('tooltipPosition', 'left')\" \r\n                    marginLeft=\"auto\"\r\n                    marginRight=\"auto\"\r\n                    [isLoading]=\"isLoadingInner()()\" \r\n                    (onValueChange)=\"_isElementReady() ? onInputChange.emit({\r\n                        position: 'BODY',\r\n                        input: _input(),\r\n                        property: column().config.property,\r\n                        before: row(),\r\n                        value: $event\r\n                    }): null\"\r\n                ></wia-switch> \r\n            </div>\r\n        } \r\n    \r\n        @case ('inputTextbox') {\r\n            <div [class]=\"_input()\"> \r\n                <wia-textbox\r\n                    [id]=\"id()\"\r\n                    #inputTextbox\r\n                    [ngModel]=\"row()[column().config.property]\"   \r\n                    [isValid]=\"_GetAttributeValue('isValid', false)\"\r\n                    [isInvalid]=\"_GetAttributeValue('isInvalid', false)\"\r\n                    [placeholder]=\"_GetAttributeValue('placeholder', 'Type...')\"\r\n                    [selectOnFocus]=\"_GetAttributeValue('selectOnFocus', false)\"\r\n                    [textPosition]=\"_GetAttributeValue('textPosition', 'left')\"\r\n                    [minLength]=\"_GetAttributeValue('minLength', 0)\"\r\n                    [maxLength]=\"_GetAttributeValue('maxLength', 50)\"\r\n                    (onValueChange)=\"_isElementReady() ? onInputChange.emit({\r\n                        position: 'BODY',\r\n                        input: _input(),\r\n                        property: column().config.property,\r\n                        before: row(),\r\n                        value: $event\r\n                    }): null\"\r\n                    (onKeyupEnter)=\"onKeyupEnter.emit({ \r\n                        id: id(),\r\n                        input: _input(), \r\n                        property: column().config.property,\r\n                        row: row(), \r\n                        value: $event\r\n                    })\"\r\n                ></wia-textbox>\r\n            </div>\r\n        }\r\n    \r\n        @case ('inputNumberbox') {\r\n            <div [class]=\"_input()\">  \r\n                <wia-numberbox\r\n                    [id]=\"id()\"\r\n                    #inputNumberbox\r\n                    [ngModel]=\"row()[column().config.property]\"   \r\n                    [isValid]=\"_GetAttributeValue('isValid', false)\"\r\n                    [isInvalid]=\"_GetAttributeValue('isInvalid', false)\"\r\n                    [placeholder]=\"_GetAttributeValue('placeholder', '########')\"\r\n                    [selectOnFocus]=\"_GetAttributeValue('selectOnFocus', false)\"\r\n                    [textPosition]=\"_GetAttributeValue('textPosition', 'center')\"\r\n                    [minLength]=\"_GetAttributeValue('minLength', 0)\"\r\n                    [maxLength]=\"_GetAttributeValue('maxLength', 20)\"\r\n                    [format]=\"_GetAttributeValue('format', 'number')\"\r\n                    [decimals]=\"_GetAttributeValue('decimals', 0)\"\r\n                    [step]=\"_GetAttributeValue('step', 1)\"\r\n                    [showStepIcon]=\"_GetAttributeValue('showStepIcon', false)\"\r\n                    [min]=\"_GetAttributeValue('min', 0)\"\r\n                    [max]=\"_GetAttributeValue('max', 2147483647)\"\r\n                    (onValueChange)=\"_isElementReady() ? onInputChange.emit({\r\n                        position: 'BODY',\r\n                        input: _input(),\r\n                        property: column().config.property,\r\n                        before: row(),\r\n                        value: $event\r\n                    }): null\"\r\n                    (onKeyupEnter)=\"onKeyupEnter.emit({ \r\n                        id: id(),\r\n                        input: _input(), \r\n                        property: column().config.property,\r\n                        row: row(), \r\n                        value: $event\r\n                    })\"\r\n                ></wia-numberbox>\r\n            </div>\r\n        }\r\n    \r\n        @case ('inputSelectbox') {\r\n            <div [class]=\"_input()\">  \r\n                <wia-selectbox\r\n                    [id]=\"id()\"\r\n                    #coerSelectbox\r\n                    [ngModel]=\"row()[column().config.property]\"   \r\n                    [dataSource]=\"_GetAttributeValue('dataSource', [])\"\r\n                    [isValid]=\"_GetAttributeValue('isValid', false)\"\r\n                    [isInvalid]=\"_GetAttributeValue('isInvalid', false)\"\r\n                    [placeholder]=\"_GetAttributeValue('placeholder', '-- Select --')\"\r\n                    [selectOnFocus]=\"_GetAttributeValue('selectOnFocus', true)\"\r\n                    [textPosition]=\"_GetAttributeValue('textPosition', 'left')\"\r\n                    [displayProperty]=\"_GetAttributeValue('displayProperty', 'name')\"\r\n                    [useIconProperty]=\"_GetAttributeValue('useIconProperty', false)\"\r\n                    (onOpen)=\"coerSelectbox.ScrollToElement(350, 'end')\"\r\n                    (onValueChange)=\"_SelectboxChange($event)\"\r\n                    (onKeyupEnter)=\"onKeyupEnter.emit({ \r\n                        id: id(),\r\n                        input: _input(), \r\n                        property: column().config.property,\r\n                        row: row(), \r\n                        value: $event\r\n                    })\"\r\n                ></wia-selectbox>\r\n            </div>\r\n        }\r\n    \r\n        @case ('inputDatebox') {\r\n            <div [class]=\"_input()\">  \r\n            \r\n            </div>\r\n        }\r\n        \r\n        @default {\r\n            <div class=\"default\" \r\n                [class]=\"`${_GetBackground()} ${_GetTextColor()}`\"\r\n                [ngStyle]=\"{ \r\n                    'justify-content': _GetTextAlignX(),\r\n                    'word-break'     : _GetTextBreak(),\r\n                    'white-space'    : _GetSpaceBreak(), \r\n                    'min-height'     : _minHeight()  \r\n                }\"\r\n                (click)=\"isEnabled() ? onClickRow.emit(row()) : null\"\r\n                (dblclick)=\"_DoubleClick()\">  \r\n                <div [innerHTML]=\"_GetCellValue() | html\"></div>          \r\n            </div> \r\n        }\r\n    }\r\n</div>\r\n\r\n@if(!isDraging() && isDragoverDown()) {\r\n    <div class=\"dragover-zone\"></div>\r\n}", styles: ["div.draging,div.draging *{background-color:var(--primary)!important;color:var(--light)!important}div.dragover-zone{height:30px!important;background-color:var(--primary-light)!important;border-top:3px dashed var(--primary)!important;border-bottom:3px dashed var(--primary)!important}div.inputSwitch{display:flex!important;justify-content:center!important;align-items:center!important;height:20px!important;padding:5px}div.inputTextbox div.coer-textbox,div.inputNumberbox div.coer-textbox,div.inputSelectbox div.coer-textbox{border-radius:none!important;background-color:transparent!important;height:30px!important}div.inputTextbox div.coer-textbox div.line,div.inputNumberbox div.coer-textbox div.line,div.inputSelectbox div.coer-textbox div.line{border-color:transparent!important}div.inputTextbox div.coer-textbox div.icon-container div.tricks-container,div.inputNumberbox div.coer-textbox div.icon-container div.tricks-container,div.inputSelectbox div.coer-textbox div.icon-container div.tricks-container{height:30px!important}div.inputTextbox div.coer-textbox label span,div.inputNumberbox div.coer-textbox label span,div.inputSelectbox div.coer-textbox label span{background-color:transparent!important}div.inputTextbox div.coer-textbox ul,div.inputNumberbox div.coer-textbox ul,div.inputSelectbox div.coer-textbox ul{top:30px!important}div.default{display:flex!important;align-items:center!important;padding:5px!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: WIANumberBox, selector: "wia-numberbox", inputs: ["minLength", "maxLength", "format", "decimals", "step", "showStepIcon", "min", "max"] }, { kind: "component", type: WIASelectBox, selector: "wia-selectbox", inputs: ["selectOnFocus", "showClearButton", "dataSource", "displayProperty", "useIconProperty"], outputs: ["onValueChange", "onOpen", "onClose"] }, { kind: "component", type: WIASwitch, selector: "wia-switch", inputs: ["value", "labelPosition", "breakLabel", "type", "color", "textColor", "tooltip", "tooltipPosition", "width", "maxWidth"], outputs: ["onClick"] }, { kind: "component", type: WIATextBox, selector: "wia-textbox", inputs: ["placeholder", "selectOnFocus", "textPosition", "minLength", "maxLength", "showClearButton", "showSearchButton", "externalButtons", "size", "width", "minWidth", "maxWidth"], outputs: ["onKeyupEnter", "onClickClear", "onClickSearch", "onClickLeft", "onClickRight"] }, { kind: "pipe", type: i2$2.HtmlPipe, name: "html" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAGridCell, decorators: [{
            type: Component,
            args: [{ selector: 'wia-grid-cell', standalone: false, template: "@if(!isDraging() && isDragoverUp()) {\r\n    <div class=\"dragover-zone\"></div>\r\n}\r\n\r\n<div [ngClass]=\"{ 'draging': isDraging(), 'dragover-zone': isDraging() && isDragoverself() }\">\r\n    @switch(_input()) {\r\n        @case ('inputSwitch') {\r\n            <div [class]=\"_input()\"> \r\n                <wia-switch \r\n                    [id]=\"id()\"\r\n                    [ngModel]=\"row()[column().config.property]\"\r\n                    [isReadonly]=\"!isEnabled() ||!_isElementReady() || _GetAttributeValue('isReadonly', false)\" \r\n                    [type]=\"_GetAttributeValue('type', 'switch')\"\r\n                    [color]=\"_GetAttributeValue('color', 'primary')\"\r\n                    [tooltip]=\"_GetAttributeValue('tooltip', '')\"\r\n                    [tooltipPosition]=\"_GetAttributeValue('tooltipPosition', 'left')\" \r\n                    marginLeft=\"auto\"\r\n                    marginRight=\"auto\"\r\n                    [isLoading]=\"isLoadingInner()()\" \r\n                    (onValueChange)=\"_isElementReady() ? onInputChange.emit({\r\n                        position: 'BODY',\r\n                        input: _input(),\r\n                        property: column().config.property,\r\n                        before: row(),\r\n                        value: $event\r\n                    }): null\"\r\n                ></wia-switch> \r\n            </div>\r\n        } \r\n    \r\n        @case ('inputTextbox') {\r\n            <div [class]=\"_input()\"> \r\n                <wia-textbox\r\n                    [id]=\"id()\"\r\n                    #inputTextbox\r\n                    [ngModel]=\"row()[column().config.property]\"   \r\n                    [isValid]=\"_GetAttributeValue('isValid', false)\"\r\n                    [isInvalid]=\"_GetAttributeValue('isInvalid', false)\"\r\n                    [placeholder]=\"_GetAttributeValue('placeholder', 'Type...')\"\r\n                    [selectOnFocus]=\"_GetAttributeValue('selectOnFocus', false)\"\r\n                    [textPosition]=\"_GetAttributeValue('textPosition', 'left')\"\r\n                    [minLength]=\"_GetAttributeValue('minLength', 0)\"\r\n                    [maxLength]=\"_GetAttributeValue('maxLength', 50)\"\r\n                    (onValueChange)=\"_isElementReady() ? onInputChange.emit({\r\n                        position: 'BODY',\r\n                        input: _input(),\r\n                        property: column().config.property,\r\n                        before: row(),\r\n                        value: $event\r\n                    }): null\"\r\n                    (onKeyupEnter)=\"onKeyupEnter.emit({ \r\n                        id: id(),\r\n                        input: _input(), \r\n                        property: column().config.property,\r\n                        row: row(), \r\n                        value: $event\r\n                    })\"\r\n                ></wia-textbox>\r\n            </div>\r\n        }\r\n    \r\n        @case ('inputNumberbox') {\r\n            <div [class]=\"_input()\">  \r\n                <wia-numberbox\r\n                    [id]=\"id()\"\r\n                    #inputNumberbox\r\n                    [ngModel]=\"row()[column().config.property]\"   \r\n                    [isValid]=\"_GetAttributeValue('isValid', false)\"\r\n                    [isInvalid]=\"_GetAttributeValue('isInvalid', false)\"\r\n                    [placeholder]=\"_GetAttributeValue('placeholder', '########')\"\r\n                    [selectOnFocus]=\"_GetAttributeValue('selectOnFocus', false)\"\r\n                    [textPosition]=\"_GetAttributeValue('textPosition', 'center')\"\r\n                    [minLength]=\"_GetAttributeValue('minLength', 0)\"\r\n                    [maxLength]=\"_GetAttributeValue('maxLength', 20)\"\r\n                    [format]=\"_GetAttributeValue('format', 'number')\"\r\n                    [decimals]=\"_GetAttributeValue('decimals', 0)\"\r\n                    [step]=\"_GetAttributeValue('step', 1)\"\r\n                    [showStepIcon]=\"_GetAttributeValue('showStepIcon', false)\"\r\n                    [min]=\"_GetAttributeValue('min', 0)\"\r\n                    [max]=\"_GetAttributeValue('max', 2147483647)\"\r\n                    (onValueChange)=\"_isElementReady() ? onInputChange.emit({\r\n                        position: 'BODY',\r\n                        input: _input(),\r\n                        property: column().config.property,\r\n                        before: row(),\r\n                        value: $event\r\n                    }): null\"\r\n                    (onKeyupEnter)=\"onKeyupEnter.emit({ \r\n                        id: id(),\r\n                        input: _input(), \r\n                        property: column().config.property,\r\n                        row: row(), \r\n                        value: $event\r\n                    })\"\r\n                ></wia-numberbox>\r\n            </div>\r\n        }\r\n    \r\n        @case ('inputSelectbox') {\r\n            <div [class]=\"_input()\">  \r\n                <wia-selectbox\r\n                    [id]=\"id()\"\r\n                    #coerSelectbox\r\n                    [ngModel]=\"row()[column().config.property]\"   \r\n                    [dataSource]=\"_GetAttributeValue('dataSource', [])\"\r\n                    [isValid]=\"_GetAttributeValue('isValid', false)\"\r\n                    [isInvalid]=\"_GetAttributeValue('isInvalid', false)\"\r\n                    [placeholder]=\"_GetAttributeValue('placeholder', '-- Select --')\"\r\n                    [selectOnFocus]=\"_GetAttributeValue('selectOnFocus', true)\"\r\n                    [textPosition]=\"_GetAttributeValue('textPosition', 'left')\"\r\n                    [displayProperty]=\"_GetAttributeValue('displayProperty', 'name')\"\r\n                    [useIconProperty]=\"_GetAttributeValue('useIconProperty', false)\"\r\n                    (onOpen)=\"coerSelectbox.ScrollToElement(350, 'end')\"\r\n                    (onValueChange)=\"_SelectboxChange($event)\"\r\n                    (onKeyupEnter)=\"onKeyupEnter.emit({ \r\n                        id: id(),\r\n                        input: _input(), \r\n                        property: column().config.property,\r\n                        row: row(), \r\n                        value: $event\r\n                    })\"\r\n                ></wia-selectbox>\r\n            </div>\r\n        }\r\n    \r\n        @case ('inputDatebox') {\r\n            <div [class]=\"_input()\">  \r\n            \r\n            </div>\r\n        }\r\n        \r\n        @default {\r\n            <div class=\"default\" \r\n                [class]=\"`${_GetBackground()} ${_GetTextColor()}`\"\r\n                [ngStyle]=\"{ \r\n                    'justify-content': _GetTextAlignX(),\r\n                    'word-break'     : _GetTextBreak(),\r\n                    'white-space'    : _GetSpaceBreak(), \r\n                    'min-height'     : _minHeight()  \r\n                }\"\r\n                (click)=\"isEnabled() ? onClickRow.emit(row()) : null\"\r\n                (dblclick)=\"_DoubleClick()\">  \r\n                <div [innerHTML]=\"_GetCellValue() | html\"></div>          \r\n            </div> \r\n        }\r\n    }\r\n</div>\r\n\r\n@if(!isDraging() && isDragoverDown()) {\r\n    <div class=\"dragover-zone\"></div>\r\n}", styles: ["div.draging,div.draging *{background-color:var(--primary)!important;color:var(--light)!important}div.dragover-zone{height:30px!important;background-color:var(--primary-light)!important;border-top:3px dashed var(--primary)!important;border-bottom:3px dashed var(--primary)!important}div.inputSwitch{display:flex!important;justify-content:center!important;align-items:center!important;height:20px!important;padding:5px}div.inputTextbox div.coer-textbox,div.inputNumberbox div.coer-textbox,div.inputSelectbox div.coer-textbox{border-radius:none!important;background-color:transparent!important;height:30px!important}div.inputTextbox div.coer-textbox div.line,div.inputNumberbox div.coer-textbox div.line,div.inputSelectbox div.coer-textbox div.line{border-color:transparent!important}div.inputTextbox div.coer-textbox div.icon-container div.tricks-container,div.inputNumberbox div.coer-textbox div.icon-container div.tricks-container,div.inputSelectbox div.coer-textbox div.icon-container div.tricks-container{height:30px!important}div.inputTextbox div.coer-textbox label span,div.inputNumberbox div.coer-textbox label span,div.inputSelectbox div.coer-textbox label span{background-color:transparent!important}div.inputTextbox div.coer-textbox ul,div.inputNumberbox div.coer-textbox ul,div.inputSelectbox div.coer-textbox ul{top:30px!important}div.default{display:flex!important;align-items:center!important;padding:5px!important}\n"] }]
        }], propDecorators: { WIATextBox: [{ type: i0.ViewChild, args: ['inputTextbox', { isSignal: true }] }], coerNumberbox: [{ type: i0.ViewChild, args: ['inputNumberbox', { isSignal: true }] }], coerSelectbox: [{ type: i0.ViewChild, args: ['coerSelectbox', { isSignal: true }] }], id: [{ type: i0.Input, args: [{ isSignal: true, alias: "id", required: true }] }], ApplyFormat: [{ type: i0.Input, args: [{ isSignal: true, alias: "ApplyFormat", required: true }] }], column: [{ type: i0.Input, args: [{ isSignal: true, alias: "column", required: true }] }], row: [{ type: i0.Input, args: [{ isSignal: true, alias: "row", required: true }] }], bodySettings: [{ type: i0.Input, args: [{ isSignal: true, alias: "bodySettings", required: true }] }], isLoadingInner: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoadingInner", required: true }] }], isEnabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "isEnabled", required: true }] }], isDraging: [{ type: i0.Input, args: [{ isSignal: true, alias: "isDraging", required: true }] }], isDragoverself: [{ type: i0.Input, args: [{ isSignal: true, alias: "isDragoverself", required: true }] }], isDragoverUp: [{ type: i0.Input, args: [{ isSignal: true, alias: "isDragoverUp", required: true }] }], isDragoverDown: [{ type: i0.Input, args: [{ isSignal: true, alias: "isDragoverDown", required: true }] }], onClickRow: [{ type: i0.Output, args: ["onClickRow"] }], onDoubleClickRow: [{ type: i0.Output, args: ["onDoubleClickRow"] }], onInputChange: [{ type: i0.Output, args: ["onInputChange"] }], onKeyupEnter: [{ type: i0.Output, args: ["onKeyupEnter"] }], onUpdateType: [{ type: i0.Output, args: ["onUpdateType"] }] } });

class WIALoading {
    //Inputs
    isLoading = input(false, ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    position = input('absolute', ...(ngDevMode ? [{ debugName: "position" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIALoading, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIALoading, isStandalone: false, selector: "wia-loading", inputs: { isLoading: { classPropertyName: "isLoading", publicName: "isLoading", isSignal: true, isRequired: false, transformFunction: null }, position: { classPropertyName: "position", publicName: "position", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@if(isLoading()) {\r\n    <figure class=\"wia-loading\" [ngStyle]=\"{ 'position': position() }\">\r\n        <div class=\"wia-loading-content\">\r\n            <i class=\"iw-arrows-rotate animation-spin animation-speed-15\"></i>\r\n            <span class=\"fa-fade\">Loading</span>\r\n        </div>\r\n    </figure>\r\n}", styles: ["figure.wia-loading{height:100%!important;width:100%!important;inset:0!important;display:flex!important;border-radius:5px!important;align-items:center!important;justify-content:center!important;background-color:var(--loading)!important;animation:__KeyOpacity50 .8s ease-in-out infinite alternate!important;cursor:wait!important;z-index:var(--z-index-items)!important}figure.wia-loading div.wia-loading-content{flex-flow:column!important;display:inherit!important;justify-content:inherit!important;align-items:inherit!important;font-size:35px!important;color:var(--gray)!important;-webkit-user-select:none!important;user-select:none!important}figure.wia-loading div.wia-loading-content i{font-size:inherit!important}\n"], dependencies: [{ kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIALoading, decorators: [{
            type: Component,
            args: [{ selector: 'wia-loading', standalone: false, template: "@if(isLoading()) {\r\n    <figure class=\"wia-loading\" [ngStyle]=\"{ 'position': position() }\">\r\n        <div class=\"wia-loading-content\">\r\n            <i class=\"iw-arrows-rotate animation-spin animation-speed-15\"></i>\r\n            <span class=\"fa-fade\">Loading</span>\r\n        </div>\r\n    </figure>\r\n}", styles: ["figure.wia-loading{height:100%!important;width:100%!important;inset:0!important;display:flex!important;border-radius:5px!important;align-items:center!important;justify-content:center!important;background-color:var(--loading)!important;animation:__KeyOpacity50 .8s ease-in-out infinite alternate!important;cursor:wait!important;z-index:var(--z-index-items)!important}figure.wia-loading div.wia-loading-content{flex-flow:column!important;display:inherit!important;justify-content:inherit!important;align-items:inherit!important;font-size:35px!important;color:var(--gray)!important;-webkit-user-select:none!important;user-select:none!important}figure.wia-loading div.wia-loading-content i{font-size:inherit!important}\n"] }]
        }], propDecorators: { isLoading: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoading", required: false }] }], position: [{ type: i0.Input, args: [{ isSignal: true, alias: "position", required: false }] }] } });

class WIAGridBody {
    //Elements
    _coerGridCellList = viewChildren((WIAGridCell), ...(ngDevMode ? [{ debugName: "_coerGridCellList" }] : /* istanbul ignore next */ []));
    //Variables 
    _pagesObserver;
    _sort = signal({ property: '', direction: 'none', icon: '' }, ...(ngDevMode ? [{ debugName: "_sort" }] : /* istanbul ignore next */ []));
    IsBooleanFalse = Tools.IsBooleanFalse;
    _checkAll = signal(false, ...(ngDevMode ? [{ debugName: "_checkAll" }] : /* istanbul ignore next */ []));
    dragingId = signal(-1, ...(ngDevMode ? [{ debugName: "dragingId" }] : /* istanbul ignore next */ []));
    dragoverId = signal(-1, ...(ngDevMode ? [{ debugName: "dragoverId" }] : /* istanbul ignore next */ []));
    dragoverOver = signal(false, ...(ngDevMode ? [{ debugName: "dragoverOver" }] : /* istanbul ignore next */ []));
    elementsByPages = new Set();
    _isLoadingPaginator = false;
    //Input
    value = input.required(...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    IdCalculated = input.required(...(ngDevMode ? [{ debugName: "IdCalculated" }] : /* istanbul ignore next */ []));
    ApplyFormat = input.required(...(ngDevMode ? [{ debugName: "ApplyFormat" }] : /* istanbul ignore next */ []));
    columns = input.required(...(ngDevMode ? [{ debugName: "columns" }] : /* istanbul ignore next */ []));
    dataSourceGroup = input.required(...(ngDevMode ? [{ debugName: "dataSourceGroup" }] : /* istanbul ignore next */ []));
    headerSettings = input.required(...(ngDevMode ? [{ debugName: "headerSettings" }] : /* istanbul ignore next */ []));
    bodySettings = input.required(...(ngDevMode ? [{ debugName: "bodySettings" }] : /* istanbul ignore next */ []));
    isLoadingInner = input.required(...(ngDevMode ? [{ debugName: "isLoadingInner" }] : /* istanbul ignore next */ []));
    isLoading = input.required(...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    isEnabled = input.required(...(ngDevMode ? [{ debugName: "isEnabled" }] : /* istanbul ignore next */ []));
    useContainer = input.required(...(ngDevMode ? [{ debugName: "useContainer" }] : /* istanbul ignore next */ []));
    displayProperty = input.required(...(ngDevMode ? [{ debugName: "displayProperty" }] : /* istanbul ignore next */ []));
    isDraggable = input.required(...(ngDevMode ? [{ debugName: "isDraggable" }] : /* istanbul ignore next */ []));
    search = input.required(...(ngDevMode ? [{ debugName: "search" }] : /* istanbul ignore next */ []));
    height = input.required(...(ngDevMode ? [{ debugName: "height" }] : /* istanbul ignore next */ []));
    minHeight = input.required(...(ngDevMode ? [{ debugName: "minHeight" }] : /* istanbul ignore next */ []));
    maxHeight = input.required(...(ngDevMode ? [{ debugName: "maxHeight" }] : /* istanbul ignore next */ []));
    pagesLoaded = input.required(...(ngDevMode ? [{ debugName: "pagesLoaded" }] : /* istanbul ignore next */ []));
    //Outputs
    onClickRow = output();
    onDoubleClickRow = output();
    onClickDeleteRow = output();
    onClickEditRow = output();
    onClickModalRow = output();
    onClickNavigateRow = output();
    onSelectedRowChange = output();
    onSelectedRow = output();
    onInputChange = output();
    onKeyupEnter = output();
    onKeyupEnterLast = output();
    onUpdateType = output();
    onSort = output();
    onReorder = output();
    onLoadPages = output();
    constructor() {
        document.addEventListener('dragover', event => event.preventDefault());
        document.addEventListener("drop", event => this._Drop(this.dragoverId(), event));
    }
    ngOnDestroy() {
        if (this._pagesObserver)
            this._pagesObserver?.disconnect();
    }
    //Function
    _showStriped = (index) => {
        return !Tools.IsBooleanFalse(this.bodySettings().showStriped) && (index % 2 != 0);
    };
    //Function
    _ShowButton(button, position, row = null) {
        let response = false;
        if (position === button.position && this.isEnabled() && !this.isLoadingInner()() && this.dataSourceGroup().length > 0) {
            const SHOW_BUTTON = this.bodySettings()[button.property]?.show;
            if (Tools.IsNull(row)) {
                response = Tools.IsBooleanTrue(SHOW_BUTTON) || Tools.IsFunction(SHOW_BUTTON);
            }
            else if (Tools.IsBoolean(SHOW_BUTTON)) {
                response = SHOW_BUTTON;
            }
            else if (Tools.IsFunction(SHOW_BUTTON)) {
                const CALLBACK = SHOW_BUTTON;
                const ROW = { ...row };
                delete ROW['__index__'];
                delete ROW['__checked__'];
                response = CALLBACK({
                    property: button.property,
                    row: ROW,
                    value: null
                });
            }
        }
        return response;
    }
    //Computed
    _borderButtom = computed(() => {
        return Tools.IsBooleanTrue(this.bodySettings().showBorders) ? '1px solid var(--readonly)' : '';
    }, ...(ngDevMode ? [{ debugName: "_borderButtom" }] : /* istanbul ignore next */ []));
    //Computed
    _buttonsByRow = computed(() => [
        {
            property: 'deleteButton',
            icon: 'delete',
            position: this.bodySettings()?.deleteButton?.position || 'right',
            color: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.deleteButton?.background) ? this.bodySettings()?.deleteButton?.background : (Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.deleteButton?.color) ? this.bodySettings()?.deleteButton?.color : 'danger'),
            type: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.deleteButton?.background) ? 'icon-filled' : 'icon-rounded',
            event: this.onClickDeleteRow
        },
        {
            property: 'editButton',
            icon: 'edit',
            position: this.bodySettings()?.editButton?.position || 'right',
            color: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.editButton?.background) ? this.bodySettings()?.editButton?.background : (Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.editButton?.color) ? this.bodySettings()?.editButton?.color : 'primary'),
            type: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.editButton?.background) ? 'icon-filled' : 'icon-rounded',
            event: this.onClickEditRow
        },
        {
            property: 'modalButton',
            icon: 'modal',
            position: this.bodySettings()?.modalButton?.position || 'right',
            color: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.modalButton?.background) ? this.bodySettings()?.modalButton?.background : (Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.modalButton?.color) ? this.bodySettings()?.modalButton?.color : 'primary'),
            type: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.modalButton?.background) ? 'icon-filled' : 'icon-rounded',
            event: this.onClickModalRow
        },
        {
            property: 'navigateButton',
            icon: 'navigate',
            position: this.bodySettings()?.navigateButton?.position || 'right',
            color: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.navigateButton?.background) ? this.bodySettings()?.navigateButton?.background : (Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.navigateButton?.color) ? this.bodySettings()?.navigateButton?.color : 'navigation'),
            type: Tools.IsNotOnlyWhiteSpace(this.bodySettings()?.navigateButton?.background) ? 'icon-filled' : 'icon-rounded',
            event: this.onClickNavigateRow
        }
    ], ...(ngDevMode ? [{ debugName: "_buttonsByRow" }] : /* istanbul ignore next */ []));
    //Function
    _Path(property, row) {
        let response = '';
        const PATH_BUTTON = this.bodySettings()[property]?.path;
        if (Tools.IsFunction(PATH_BUTTON)) {
            const CALLBACK = PATH_BUTTON;
            const ROW = { ...row };
            delete ROW['__index__'];
            delete ROW['__checked__'];
            response = CALLBACK({
                property,
                row: ROW,
                value: null
            });
        }
        return response;
    }
    //Computed
    _showCheckbox = computed(() => {
        return this.bodySettings().selectionRows?.show
            && this.dataSourceGroup().length > 0
            && (this.bodySettings().selectionRows?.selectAllowed !== 0)
            && this.isEnabled();
    }, ...(ngDevMode ? [{ debugName: "_showCheckbox" }] : /* istanbul ignore next */ []));
    //Function
    _isReadonlySelection = (row, byClickRow) => {
        const SELECT_ALLOWED = this.bodySettings().selectionRows?.selectAllowed || 0;
        if (SELECT_ALLOWED > 1) {
            const SELECTED = this.value().filter(x => x.__checked__).length;
            return byClickRow
                ? SELECTED >= SELECT_ALLOWED
                : SELECTED >= SELECT_ALLOWED && Tools.IsBooleanFalse(row.__checked__);
        }
        return false;
    };
    //Computed
    _IconShortHeader = (property) => {
        return this._sort().property == property ? this._sort().icon : '';
    };
    //Computed
    _IconSearchHeader = (column) => {
        return this.headerSettings().search?.show
            && !Tools.IsBooleanTrue(this.headerSettings().search?.preventDefault)
            && Tools.IsNotOnlyWhiteSpace(this.search())
            && Tools.IsNull(column?.inputSwitch)
            && (Tools.IsNull(this.headerSettings().search?.properties) || this.headerSettings().search.properties.length <= 0 || this.headerSettings().search.properties.includes(column.property))
            ? 'iw-search' : '';
    };
    //Function
    _ClickOnRow(row) {
        if (!this.isEnabled())
            return;
        if (this._showCheckbox() && this.bodySettings().selectionRows?.selectOverRow) {
            if (Tools.IsBooleanFalse(row.__checked__) && !this._isReadonlySelection(row, true)) {
                this.CheckBy((x) => x.__index__ == row.__index__);
            }
        }
        const ROW = { ...row };
        delete ROW["__index__"];
        delete ROW["__checked__"];
        this.onClickRow.emit(ROW);
    }
    //Function
    async _ClickCheckAll(checked) {
        this.isLoadingInner().set(true);
        const DATA_SOURCE = [...this.value()].map(item => ({ ...item, __checked__: checked }));
        this.onSelectedRowChange.emit(DATA_SOURCE);
        this.onSelectedRow.emit({
            all: true,
            checked: checked,
            rows: DATA_SOURCE.map((item) => {
                delete item["__index__"];
                delete item["__checked__"];
                return item;
            })
        });
    }
    //Function
    _ClickCheck(checked, row) {
        if (checked)
            this.CheckBy((x) => x.__index__ == row.__index__);
        else
            this.UncheckBy((x) => x.__index__ == row.__index__);
    }
    /** */
    CheckBy(callback) {
        if (this.bodySettings().selectionRows?.show) {
            this.isLoadingInner().set(true);
            let SELECTED_ROWS = [];
            const DATA_SOURCE = [...this.value()];
            const SELECT_ALLOWED = this.bodySettings().selectionRows?.selectAllowed || 0;
            if (SELECT_ALLOWED > 0) {
                if (SELECT_ALLOWED == 1) {
                    const SELECTED = DATA_SOURCE.find(callback);
                    SELECTED_ROWS = DATA_SOURCE.map(item => ({ ...item, __checked__: (item.__index__ == SELECTED.__index__) }));
                }
                else {
                    const CURRENT_SELECTED = [...DATA_SOURCE].filter(item => item.__checked__).map(item => item.__index__);
                    if (CURRENT_SELECTED.length < SELECT_ALLOWED) {
                        const SELECTED = DATA_SOURCE.filter(callback).map(item => item.__index__);
                        SELECTED_ROWS = DATA_SOURCE.map(item => ({
                            ...item,
                            __checked__: SELECTED.includes(item.__index__) || CURRENT_SELECTED.includes(item.__index__)
                        }));
                    }
                    else
                        SELECTED_ROWS = DATA_SOURCE;
                }
            }
            else {
                SELECTED_ROWS = DATA_SOURCE.map(item => callback(item) ? { ...item, __checked__: true } : item);
            }
            this.onSelectedRowChange.emit(SELECTED_ROWS);
            //Mark All checkbox
            this._checkAll.set(SELECTED_ROWS.every((x) => x.__checked__));
            //Event Checkbox Change
            this.onSelectedRow.emit({
                all: false,
                checked: true,
                rows: SELECTED_ROWS.filter(callback).map((item) => {
                    delete item["__index__"];
                    delete item["__checked__"];
                    return item;
                })
            });
        }
    }
    /** */
    UncheckBy(callback) {
        if (this.bodySettings().selectionRows?.show) {
            this.isLoadingInner().set(true);
            const DATA_SOURCE = [...this.value()];
            const SELECTED_ROWS = DATA_SOURCE.map(item => callback(item) ? { ...item, __checked__: false } : item);
            this.onSelectedRowChange.emit(SELECTED_ROWS);
            this._checkAll.set(SELECTED_ROWS.every((x) => x.__checked__));
            this.onSelectedRow.emit({
                all: false,
                checked: false,
                rows: SELECTED_ROWS.filter(callback).map((item) => {
                    delete item["__index__"];
                    delete item["__checked__"];
                    return item;
                })
            });
        }
    }
    //Function
    _NextInput(indexRow, indexColumn, event) {
        const ROW = { ...event.row };
        delete ROW["__index__"];
        delete ROW["__checked__"];
        const KEYUP_ENTER = {
            position: 'BODY',
            input: event.input,
            property: event.property,
            before: ROW,
            after: ROW,
            value: event.value
        };
        this.onKeyupEnter.emit(KEYUP_ENTER);
        if (!Tools.IsBooleanFalse(this.bodySettings().focusNext)) {
            const INPUT_TEXTBOX = this.columns().filter(item => Tools.IsNotNull(item.config?.inputTextbox)).map(item => item.config.property);
            const INPUT_NUMBERBOX = this.columns().filter(item => Tools.IsNotNull(item.config?.inputNumberbox)).map(item => item.config.property);
            const INPUT_SELECTBOX = this.columns().filter(item => Tools.IsNotNull(item.config?.inputSelectbox)).map(item => item.config.property);
            const INPUT_DATETIMEBOX = this.columns().filter(item => Tools.IsNotNull(item.config?.inputDatebox)).map(item => item.config.property);
            let index = 0;
            const COLUMNS = [];
            for (const { property } of this.columns().map(item => item.config)) {
                if (INPUT_TEXTBOX.some(input => input == property)) {
                    COLUMNS.push({ index, property, input: 'inputTextbox' });
                }
                else if (INPUT_NUMBERBOX.some(input => input == property)) {
                    COLUMNS.push({ index, property, input: 'inputNumberbox' });
                }
                else if (INPUT_SELECTBOX.some(input => input == property)) {
                    COLUMNS.push({ index, property, input: 'inputSelectbox' });
                }
                else if (INPUT_DATETIMEBOX.some(input => input == property)) {
                    COLUMNS.push({ index, property, input: 'inputDatebox' });
                }
                else {
                    COLUMNS.push({ index, property, input: 'default' });
                }
                ++index;
            }
            let lastRow = -1;
            for (const { rows } of this.dataSourceGroup()) {
                lastRow += rows.length;
            }
            const COLUMNS_INPUT = COLUMNS.filter(x => x.input != 'default');
            const firstColumn = [...COLUMNS_INPUT].shift()?.index || -1;
            const lastColumn = [...COLUMNS_INPUT].pop()?.index || -1;
            //Is Last Row & Last Input Column?
            if (indexRow == lastRow && indexColumn == lastColumn) {
                this.onKeyupEnterLast.emit(KEYUP_ENTER);
            }
            //Is Last Input Column?
            else if (indexColumn == lastColumn) {
                this.FocusInput((indexRow + 1), firstColumn);
            }
            //Next Column?
            else {
                for (index = (indexColumn + 1); index < COLUMNS.length; index++) {
                    for (const input of COLUMNS) {
                        if (index == input.index && ['inputTextbox', 'inputNumberbox', 'inputSelectbox', 'inputDatebox'].includes(input.input)) {
                            this.FocusInput(indexRow, input.index);
                            return;
                        }
                    }
                }
            }
        }
    }
    /** */
    FocusInput(indexRow = -1, indexColumn = -1, onlyFocus = false) {
        Tools.Sleep().then(() => {
            if (this.isEnabled()) {
                indexRow = indexRow >= 0 ? indexRow : 0;
                if (indexColumn < 0) {
                    const boxTypes = {
                        inputTextbox: this.columns().filter(item => Tools.IsNotNull(item.config?.inputTextbox)).map(item => item.config.property),
                        inputNumberbox: this.columns().filter(item => Tools.IsNotNull(item.config?.inputNumberbox)).map(item => item.config.property),
                        inputSelectbox: this.columns().filter(item => Tools.IsNotNull(item.config?.inputSelectbox)).map(item => item.config.property),
                        inputDatebox: this.columns().filter(item => Tools.IsNotNull(item.config?.inputDatebox)).map(item => item.config.property),
                    };
                    const COLUMNS = this.columns().map(({ config }, index) => ({
                        index,
                        property: config.property,
                        input: Object.entries(boxTypes).find(([_, props]) => props.includes(config.property))?.[0] ?? ''
                    }));
                    if (COLUMNS.length > 0) {
                        this.FocusInput(indexRow, COLUMNS[0].index, onlyFocus);
                    }
                }
                else {
                    const NEXT_INPUT = this._coerGridCellList().find(x => x.id() == this.IdCalculated()(indexRow, indexColumn, 'cell'));
                    NEXT_INPUT?.Focus(onlyFocus);
                }
            }
        });
    }
    /** */
    FocusLastInput(onlyFocus = false) {
        Tools.Sleep().then(() => {
            const boxTypes = {
                inputTextbox: this.columns().filter(item => Tools.IsNotNull(item.config?.inputTextbox)).map(item => item.config.property),
                inputNumberbox: this.columns().filter(item => Tools.IsNotNull(item.config?.inputNumberbox)).map(item => item.config.property),
                inputSelectbox: this.columns().filter(item => Tools.IsNotNull(item.config?.inputSelectbox)).map(item => item.config.property),
                inputDatebox: this.columns().filter(item => Tools.IsNotNull(item.config?.inputDatebox)).map(item => item.config.property),
            };
            const COLUMNS = this.columns().map(({ config }, index) => ({
                index,
                property: config.property,
                input: Object.entries(boxTypes).find(([_, props]) => props.includes(config.property))?.[0] ?? ''
            }));
            const indexRow = (this.value().length > 0) ? (this.value().length - 1) : -1;
            const indexColumn = COLUMNS.filter(x => x.input.length > 0).pop()?.index || -1;
            if (indexRow >= 0 && indexColumn >= 0) {
                this.FocusInput(indexRow, indexColumn, onlyFocus);
            }
        });
    }
    /** */
    async _ToggleSort(column) {
        if (!Tools.IsBooleanFalse(column?.short)) {
            if (this.isLoadingInner()())
                return;
            this.isLoadingInner().set(true);
            const { direction } = this._sort();
            let PROPERTY = column.property;
            let DATA_SOURCE = [];
            switch (column?.format) {
                case 'number': {
                    DATA_SOURCE = [...this.value()].map((item) => ({
                        ...item,
                        [PROPERTY]: Number(item[PROPERTY])
                    }));
                    break;
                }
                case 'currency': {
                    DATA_SOURCE = [...this.value()].map((item) => ({
                        ...item,
                        [PROPERTY]: Number(String(item[PROPERTY]).replace('$', ''))
                    }));
                    break;
                }
                case 'date': {
                    DATA_SOURCE = [...this.value()].map((item) => ({
                        ...item,
                        [PROPERTY]: Dates.IsValidDate(item[PROPERTY]) ? item[PROPERTY] : Dates.ToFormatDB(String(item[PROPERTY]))
                    }));
                    break;
                }
                case 'datetime': {
                    DATA_SOURCE = [...this.value()].map((item) => ({
                        ...item,
                        [PROPERTY]: Dates.IsValidDate(item[PROPERTY]) ? item[PROPERTY] : Dates.ToFormatDB(String(item[PROPERTY]))
                    }));
                    break;
                }
                case 'time': {
                    DATA_SOURCE = [...this.value()].map((item) => ({
                        ...item,
                        [PROPERTY]: Dates.IsValidDate(item[PROPERTY]) ? item[PROPERTY] : Dates.ToFormatDB(String(item[PROPERTY])),
                        __time__: Dates.IsValidDate(item[PROPERTY]) ? `2026-01-01 ${Dates.GetTimeSpan(item[PROPERTY])}` : `2026-01-01 ${Dates.GetTimeSpan(String(item[PROPERTY]))}`
                    }));
                    PROPERTY = '__time__';
                    break;
                }
                default: {
                    DATA_SOURCE = [...this.value()].map((item) => ({ ...item, [PROPERTY]: String(item[PROPERTY]) }));
                    break;
                }
            }
            if (direction == 'descendant') {
                this.onSort.emit(Collections.SortAsc(DATA_SOURCE, PROPERTY));
                this._sort.set({
                    property: column.property,
                    direction: 'ascendant',
                    icon: 'iw-sort-asc-arrow-down'
                });
            }
            else {
                this.onSort.emit(Collections.SortDesc(DATA_SOURCE, PROPERTY));
                this._sort.set({
                    property: column.property,
                    direction: 'descendant',
                    icon: 'iw-sort-desc-arrow-down'
                });
            }
        }
    }
    /** */
    _Drag(row, event) {
        event.stopPropagation();
        event.dataTransfer.setData('text', `${row.__index__}`);
        this.dragingId.set(row.__index__);
        let message = "";
        if (Tools.HasProperty(row, this.displayProperty())) {
            message = row[this.displayProperty()];
        }
        else if (Tools.IsOnlyWhiteSpace(message) && Tools.HasProperty(row, 'name')) {
            message = row['name'];
        }
        else if (Tools.IsOnlyWhiteSpace(message) && Tools.HasProperty(row, 'option')) {
            message = row['option'];
        }
        else
            message = "dragging";
        const ELEMENT = event.target;
        if (ELEMENT) {
            const ghost = document.createElement("div");
            ghost.innerHTML = ELEMENT.outerHTML;
            ghost.style.background = "var(--primary)";
            ghost.style.color = "var(--black)";
            ghost.style.padding = "5px";
            ghost.style.display = "flex";
            let positionY = Number(HTMLElements.GetHeight(ELEMENT).split('px')[0] || 0);
            if (positionY > 0)
                positionY /= 2;
            document.body.appendChild(ghost);
            event.dataTransfer?.setDragImage(ghost, 100, positionY);
            setTimeout(() => document.body.removeChild(ghost), 0);
        }
    }
    /** */
    _DragOver(index, event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragoverId.set(index);
    }
    /** */
    _Drop(index, event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragoverId.set(-1);
        this.dragingId.set(-1);
        const from = Number(event.dataTransfer?.getData('text') || '-1');
        if (from >= 0) {
            this.onReorder.emit({ from, to: index });
        }
    }
    //Computed
    _cursor = computed(() => {
        if (this.bodySettings().selectionRows?.show && this.bodySettings().selectionRows?.selectOverRow) {
            return 'pointer';
        }
        else if (this.isDraggable() && this.dragingId() >= 0) {
            return 'grabbing';
        }
        else if (this.isDraggable()) {
            return 'grab';
        }
        return 'default';
    }, ...(ngDevMode ? [{ debugName: "_cursor" }] : /* istanbul ignore next */ []));
    /** */
    async LoadPages(pages) {
        const pageByRow = this.bodySettings()?.paginator?.pageByRow || 50;
        if (pages <= 0) {
            pages = pageByRow;
            this.onLoadPages.emit(pages);
        }
        if (pages <= pageByRow) {
            if (this._pagesObserver)
                this._pagesObserver?.disconnect();
            this._pagesObserver = new IntersectionObserver((inputList) => {
                for (const input of inputList) {
                    if (input.isIntersecting) {
                        this._pagesObserver.unobserve(input.target);
                        const pagesLoaded = this.pagesLoaded() + pageByRow;
                        this.onLoadPages.emit(pagesLoaded);
                        this.LoadPages(pagesLoaded);
                    }
                }
            });
        }
        await Tools.Sleep();
        const ID = this.IdCalculated()((pages - 1), -1, 'row');
        const ELEMENT = HTMLElements.SelectElementById(ID);
        if (ELEMENT) {
            if (this.elementsByPages.has(ID)) {
                this._pagesObserver.unobserve(ELEMENT);
            }
            this.elementsByPages.add(ID);
            this._pagesObserver.observe(ELEMENT);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAGridBody, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIAGridBody, isStandalone: false, selector: "wia-grid-body", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null }, IdCalculated: { classPropertyName: "IdCalculated", publicName: "IdCalculated", isSignal: true, isRequired: true, transformFunction: null }, ApplyFormat: { classPropertyName: "ApplyFormat", publicName: "ApplyFormat", isSignal: true, isRequired: true, transformFunction: null }, columns: { classPropertyName: "columns", publicName: "columns", isSignal: true, isRequired: true, transformFunction: null }, dataSourceGroup: { classPropertyName: "dataSourceGroup", publicName: "dataSourceGroup", isSignal: true, isRequired: true, transformFunction: null }, headerSettings: { classPropertyName: "headerSettings", publicName: "headerSettings", isSignal: true, isRequired: true, transformFunction: null }, bodySettings: { classPropertyName: "bodySettings", publicName: "bodySettings", isSignal: true, isRequired: true, transformFunction: null }, isLoadingInner: { classPropertyName: "isLoadingInner", publicName: "isLoadingInner", isSignal: true, isRequired: true, transformFunction: null }, isLoading: { classPropertyName: "isLoading", publicName: "isLoading", isSignal: true, isRequired: true, transformFunction: null }, isEnabled: { classPropertyName: "isEnabled", publicName: "isEnabled", isSignal: true, isRequired: true, transformFunction: null }, useContainer: { classPropertyName: "useContainer", publicName: "useContainer", isSignal: true, isRequired: true, transformFunction: null }, displayProperty: { classPropertyName: "displayProperty", publicName: "displayProperty", isSignal: true, isRequired: true, transformFunction: null }, isDraggable: { classPropertyName: "isDraggable", publicName: "isDraggable", isSignal: true, isRequired: true, transformFunction: null }, search: { classPropertyName: "search", publicName: "search", isSignal: true, isRequired: true, transformFunction: null }, height: { classPropertyName: "height", publicName: "height", isSignal: true, isRequired: true, transformFunction: null }, minHeight: { classPropertyName: "minHeight", publicName: "minHeight", isSignal: true, isRequired: true, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: true, transformFunction: null }, pagesLoaded: { classPropertyName: "pagesLoaded", publicName: "pagesLoaded", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { onClickRow: "onClickRow", onDoubleClickRow: "onDoubleClickRow", onClickDeleteRow: "onClickDeleteRow", onClickEditRow: "onClickEditRow", onClickModalRow: "onClickModalRow", onClickNavigateRow: "onClickNavigateRow", onSelectedRowChange: "onSelectedRowChange", onSelectedRow: "onSelectedRow", onInputChange: "onInputChange", onKeyupEnter: "onKeyupEnter", onKeyupEnterLast: "onKeyupEnterLast", onUpdateType: "onUpdateType", onSort: "onSort", onReorder: "onReorder", onLoadPages: "onLoadPages" }, viewQueries: [{ propertyName: "_coerGridCellList", predicate: (WIAGridCell), descendants: true, isSignal: true }], ngImport: i0, template: "<section class=\"coer-grid-body\"\r\n    [ngClass]=\"{\r\n        'background-color-input': dataSourceGroup().length <= 0,\r\n        'radius-5px': dataSourceGroup().length <= 0 || isLoading() || !useContainer()\r\n    }\"\r\n    [ngStyle]=\"{ \r\n        'height'    : height(), \r\n        'min-height': minHeight(), \r\n        'max-height': maxHeight(),\r\n        'overflow'  : (isLoading() ? 'hidden' : 'auto')\r\n    }\"> \r\n\r\n    <table>\r\n        <thead>\r\n            <tr>\r\n                @if(_showCheckbox()) {\r\n                    <th class=\"action-column\" scope=\"col\">    \r\n                        <div class=\"action-column-content\">\r\n                            <wia-switch \r\n                                type=\"checkbox\"\r\n                                [isLoading]=\"isLoadingInner()()\"\r\n                                [isInvisible]=\"(bodySettings().selectionRows?.selectAllowed || 0) > 0\"\r\n                                [(ngModel)]=\"_checkAll\"\r\n                                (onClick)=\"_ClickCheckAll($event)\"\r\n                            ></wia-switch> \r\n                        </div> \r\n                    </th>\r\n                }\r\n\r\n\r\n                @for(button of _buttonsByRow(); track button.property) { \r\n                    @if(_ShowButton(button, 'left')) {\r\n                        <th class=\"action-column\" scope=\"col\"></th>\r\n                    }\r\n                } \r\n\r\n                @if(bodySettings().showRowNumber) {\r\n                    <th class=\"th-index\">#</th>\r\n                }\r\n\r\n                @for(header of columns(); track header.__index__) {\r\n                    <th scope=\"col\" \r\n                        (dblclick)=\"_ToggleSort(header.config)\"\r\n                        [ngStyle]=\"{ \r\n                            'width'     : `calc(${header.config.width} - 10px)`,\r\n                            'text-align': header.config.textAlignX,\r\n                            'cursor'    : (!IsBooleanFalse(header.config.short) ? 'pointer' : 'default')                        \r\n                        }\">                       \r\n                        <div class=\"th-content\">\r\n                            <span>\r\n                                <span> {{ header.name }} </span> \r\n                                <i [class]=\"_IconShortHeader(header.config.property)\"></i>\r\n                            </span>\r\n \r\n                            <i [class]=\"_IconSearchHeader(header.config)\"></i>\r\n                        </div>\r\n                    </th>\r\n                }\r\n\r\n\r\n                @for(button of _buttonsByRow(); track button.property) {\r\n                    @if(_ShowButton(button, 'right')) {\r\n                        <th class=\"action-column\" scope=\"col\"></th>\r\n                    }\r\n                }\r\n            </tr>\r\n        </thead>\r\n\r\n        @for(group of dataSourceGroup(); track group.index) {\r\n            <tbody> \r\n                @for(row of group.rows; let index = $index; track row.__index__) {\r\n                    <tr [id]=\"IdCalculated()(row.__index__, -1, 'row')\" \r\n                        [draggable]=\"isDraggable()\" \r\n                        (dragstart)=\"_Drag(row, $event)\"\r\n                        (dragover)=\"_DragOver(row.__index__, $event)\"                        \r\n                        (drop)=\"_Drop(row.__index__, $event)\"\r\n                        [ngClass]=\"{ \r\n                            'striped'   : _showStriped(index), \r\n                            'no-striped': !_showStriped(index),\r\n                            'hover'     : !IsBooleanFalse(bodySettings().showHover)\r\n                        }\">\r\n\r\n                        @if(_showCheckbox()) {\r\n                            <td class=\"action-column\" [ngStyle]=\"{ 'border-bottom' : _borderButtom() }\">    \r\n                                <div class=\"action-column-content\"> \r\n                                    <wia-switch \r\n                                        type=\"checkbox\"\r\n                                        [isLoading]=\"isLoadingInner()()\"\r\n                                        [isReadonly]=\"_isReadonlySelection(row, false)\"\r\n                                        [ngModel]=\"row.__checked__\"\r\n                                        (onClick)=\"_ClickCheck($event, row)\"\r\n                                    ></wia-switch> \r\n                                </div>\r\n                            </td>\r\n                        }\r\n\r\n\r\n                        @for(button of _buttonsByRow(); track button.property) {\r\n                            @if(_ShowButton(button, 'left')) {\r\n                                <td class=\"action-column\" [ngStyle]=\"{ 'border-bottom': _borderButtom() }\">\r\n                                    @if(_ShowButton(button, 'left', row)) {\r\n                                        <div class=\"action-column-content\">\r\n                                            <wia-button\r\n                                                [type]=\"button.type\"\r\n                                                [color]=\"button.color!\"\r\n                                                [icon]=\"button.icon\"  \r\n                                                [path]=\"_Path(button.property, row)\"\r\n                                                (onClick)=\"button.event.emit(row)\"\r\n                                            ></wia-button>\r\n                                        </div>\r\n                                    }\r\n                                </td>\r\n                            }\r\n                        }\r\n\r\n                        @if(bodySettings().showRowNumber) {\r\n                            <td class=\"td-index\" [ngStyle]=\"{ 'border-bottom': _borderButtom() }\">{{ index + 1 }}</td>\r\n                        }\r\n\r\n\r\n                        @for(column of columns(); track column.__index__) {\r\n                            <td class=\"td-content\"\r\n                                [ngStyle]=\"{ \r\n                                    'border-bottom' : _borderButtom(), \r\n                                    'vertical-align': column.config.textAlignY!,   \r\n                                    'cursor'        : bodySettings().selectionRows?.selectOverRow ? 'pointer' : 'default'                                  \r\n                                }\"> \r\n                                <wia-grid-cell\r\n                                    [id]=\"IdCalculated()(row.__index__, column.__index__, 'cell')\"\r\n                                    [ApplyFormat]=\"ApplyFormat()\"\r\n                                    [column]=\"column\"\r\n                                    [row]=\"row\" \r\n                                    [bodySettings]=\"bodySettings()\"\r\n                                    [isLoadingInner]=\"isLoadingInner()\"\r\n                                    [isEnabled]=\"isEnabled()\"\r\n                                    [isDraging]=\"dragingId() === row.__index__\"\r\n                                    [isDragoverself]=\"(dragoverId() === row.__index__) && (dragingId() == row.__index__)\"\r\n                                    [isDragoverUp]=\"(dragoverId() === row.__index__) && (dragingId() > row.__index__)\"\r\n                                    [isDragoverDown]=\"(dragoverId() === row.__index__) && (dragingId() < row.__index__)\"\r\n                                    (onClickRow)=\"_ClickOnRow($event)\"\r\n                                    (onDoubleClickRow)=\"onDoubleClickRow.emit($event)\"\r\n                                    (onInputChange)=\"onInputChange.emit($event)\"\r\n                                    (onKeyupEnter)=\"_NextInput(row.__index__, column.__index__, $event)\"\r\n                                    (onUpdateType)=\"onUpdateType.emit($event)\"\r\n                                ></wia-grid-cell>\r\n                            </td>\r\n                        }\r\n\r\n\r\n                        @for(button of _buttonsByRow(); track button.property) {\r\n                            @if(_ShowButton(button, 'right')) {\r\n                                <td class=\"action-column\" [ngStyle]=\"{ 'border-bottom': _borderButtom() }\">\r\n                                    @if(_ShowButton(button, 'right', row)) {\r\n                                        <div class=\"action-column-content\">\r\n                                            <wia-button\r\n                                                [type]=\"button.type\"\r\n                                                [color]=\"button.color\"\r\n                                                [icon]=\"button.icon\"  \r\n                                                [path]=\"_Path(button.property, row)\"\r\n                                                (onClick)=\"button.event.emit(row)\"\r\n                                            ></wia-button>\r\n                                        </div>\r\n                                    }\r\n                                </td>\r\n                            }\r\n                        }\r\n                    </tr>\r\n                }\r\n            </tbody>\r\n        }\r\n    </table>\r\n    \r\n    <!-- Loading / Empty -->\r\n    @if(isLoading()) {\r\n        <wia-loading [isLoading]=\"true\" position=\"sticky\"></wia-loading> \r\n    } \r\n\r\n    @else if(isEnabled() && dataSourceGroup().length <= 0) {\r\n        <div class=\"empty-data\">\r\n            <div class=\"empty-data-content\"> No Data </div>\r\n        </div>\r\n    }\r\n</section> ", styles: ["section.coer-grid-body{position:relative!important;background-color:var(--light)}section.coer-grid-body table{width:100%!important;table-layout:auto!important;border-collapse:separate!important;border-spacing:1px 0px!important;margin:0!important;font-size:14px}section.coer-grid-body table thead tr th{position:sticky!important;top:0!important;vertical-align:middle!important;background-color:var(--gray)!important;color:var(--smoke)!important;overflow:hidden!important;text-overflow:ellipsis!important;min-width:20px!important;padding:5px!important;-webkit-user-select:none!important;user-select:none!important;z-index:2!important}section.coer-grid-body table thead tr th div.th-content{display:flex!important;align-items:center!important;justify-content:space-between!important;width:inherit!important;min-height:20px!important}section.coer-grid-body table thead tr th div.th-content i{font-size:15px!important}section.coer-grid-body table tbody tr td{text-overflow:ellipsis!important;padding:0!important;z-index:1!important;background-color:var(--light)}section.coer-grid-body table tbody tr.striped td{background-color:var(--input)!important}section.coer-grid-body table tbody tr.no-striped td{background-color:var(--light)!important}section.coer-grid-body table tbody tr.hover:hover td{background-color:var(--item-hover)!important}section.coer-grid-body table th.action-column,section.coer-grid-body table td.action-column{width:20px!important;min-width:20px!important;max-width:20px!important;padding:0!important;overflow:hidden!important;vertical-align:middle!important}section.coer-grid-body table th.action-column div.action-column-content,section.coer-grid-body table td.action-column div.action-column-content{display:flex!important;align-items:center!important;justify-content:center!important;height:25px!important}section.coer-grid-body table th.th-index,section.coer-grid-body table td.td-index{width:25px;max-width:50px;text-align:center;vertical-align:middle}section.coer-grid-body div.empty-data{position:absolute!important;height:100%!important;width:100%!important;min-height:inherit!important;inset:0!important;display:flex!important;align-items:center!important;justify-content:center!important}section.coer-grid-body div.empty-data div.empty-data-content{flex-flow:column!important;display:inherit!important;justify-content:inherit!important;align-items:inherit!important;font-size:35px!important;color:var(--gray)!important;-webkit-user-select:none!important;user-select:none!important}section.coer-grid-body div.empty-data div.empty-data-content i{font-size:inherit!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: WIAButton, selector: "wia-button", inputs: ["label", "type", "color", "icon", "path", "iconPosition", "isLoading", "isReadonly", "isInvisible", "isHidden", "breakpoints", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "marginTop", "marginRight", "marginBottom", "marginLeft"], outputs: ["onClick", "onDestroy", "onReady"] }, { kind: "component", type: WIAGridCell, selector: "wia-grid-cell", inputs: ["id", "ApplyFormat", "column", "row", "bodySettings", "isLoadingInner", "isEnabled", "isDraging", "isDragoverself", "isDragoverUp", "isDragoverDown"], outputs: ["onClickRow", "onDoubleClickRow", "onInputChange", "onKeyupEnter", "onUpdateType"] }, { kind: "component", type: WIALoading, selector: "wia-loading", inputs: ["isLoading", "position"] }, { kind: "component", type: WIASwitch, selector: "wia-switch", inputs: ["value", "labelPosition", "breakLabel", "type", "color", "textColor", "tooltip", "tooltipPosition", "width", "maxWidth"], outputs: ["onClick"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAGridBody, decorators: [{
            type: Component,
            args: [{ selector: 'wia-grid-body', standalone: false, template: "<section class=\"coer-grid-body\"\r\n    [ngClass]=\"{\r\n        'background-color-input': dataSourceGroup().length <= 0,\r\n        'radius-5px': dataSourceGroup().length <= 0 || isLoading() || !useContainer()\r\n    }\"\r\n    [ngStyle]=\"{ \r\n        'height'    : height(), \r\n        'min-height': minHeight(), \r\n        'max-height': maxHeight(),\r\n        'overflow'  : (isLoading() ? 'hidden' : 'auto')\r\n    }\"> \r\n\r\n    <table>\r\n        <thead>\r\n            <tr>\r\n                @if(_showCheckbox()) {\r\n                    <th class=\"action-column\" scope=\"col\">    \r\n                        <div class=\"action-column-content\">\r\n                            <wia-switch \r\n                                type=\"checkbox\"\r\n                                [isLoading]=\"isLoadingInner()()\"\r\n                                [isInvisible]=\"(bodySettings().selectionRows?.selectAllowed || 0) > 0\"\r\n                                [(ngModel)]=\"_checkAll\"\r\n                                (onClick)=\"_ClickCheckAll($event)\"\r\n                            ></wia-switch> \r\n                        </div> \r\n                    </th>\r\n                }\r\n\r\n\r\n                @for(button of _buttonsByRow(); track button.property) { \r\n                    @if(_ShowButton(button, 'left')) {\r\n                        <th class=\"action-column\" scope=\"col\"></th>\r\n                    }\r\n                } \r\n\r\n                @if(bodySettings().showRowNumber) {\r\n                    <th class=\"th-index\">#</th>\r\n                }\r\n\r\n                @for(header of columns(); track header.__index__) {\r\n                    <th scope=\"col\" \r\n                        (dblclick)=\"_ToggleSort(header.config)\"\r\n                        [ngStyle]=\"{ \r\n                            'width'     : `calc(${header.config.width} - 10px)`,\r\n                            'text-align': header.config.textAlignX,\r\n                            'cursor'    : (!IsBooleanFalse(header.config.short) ? 'pointer' : 'default')                        \r\n                        }\">                       \r\n                        <div class=\"th-content\">\r\n                            <span>\r\n                                <span> {{ header.name }} </span> \r\n                                <i [class]=\"_IconShortHeader(header.config.property)\"></i>\r\n                            </span>\r\n \r\n                            <i [class]=\"_IconSearchHeader(header.config)\"></i>\r\n                        </div>\r\n                    </th>\r\n                }\r\n\r\n\r\n                @for(button of _buttonsByRow(); track button.property) {\r\n                    @if(_ShowButton(button, 'right')) {\r\n                        <th class=\"action-column\" scope=\"col\"></th>\r\n                    }\r\n                }\r\n            </tr>\r\n        </thead>\r\n\r\n        @for(group of dataSourceGroup(); track group.index) {\r\n            <tbody> \r\n                @for(row of group.rows; let index = $index; track row.__index__) {\r\n                    <tr [id]=\"IdCalculated()(row.__index__, -1, 'row')\" \r\n                        [draggable]=\"isDraggable()\" \r\n                        (dragstart)=\"_Drag(row, $event)\"\r\n                        (dragover)=\"_DragOver(row.__index__, $event)\"                        \r\n                        (drop)=\"_Drop(row.__index__, $event)\"\r\n                        [ngClass]=\"{ \r\n                            'striped'   : _showStriped(index), \r\n                            'no-striped': !_showStriped(index),\r\n                            'hover'     : !IsBooleanFalse(bodySettings().showHover)\r\n                        }\">\r\n\r\n                        @if(_showCheckbox()) {\r\n                            <td class=\"action-column\" [ngStyle]=\"{ 'border-bottom' : _borderButtom() }\">    \r\n                                <div class=\"action-column-content\"> \r\n                                    <wia-switch \r\n                                        type=\"checkbox\"\r\n                                        [isLoading]=\"isLoadingInner()()\"\r\n                                        [isReadonly]=\"_isReadonlySelection(row, false)\"\r\n                                        [ngModel]=\"row.__checked__\"\r\n                                        (onClick)=\"_ClickCheck($event, row)\"\r\n                                    ></wia-switch> \r\n                                </div>\r\n                            </td>\r\n                        }\r\n\r\n\r\n                        @for(button of _buttonsByRow(); track button.property) {\r\n                            @if(_ShowButton(button, 'left')) {\r\n                                <td class=\"action-column\" [ngStyle]=\"{ 'border-bottom': _borderButtom() }\">\r\n                                    @if(_ShowButton(button, 'left', row)) {\r\n                                        <div class=\"action-column-content\">\r\n                                            <wia-button\r\n                                                [type]=\"button.type\"\r\n                                                [color]=\"button.color!\"\r\n                                                [icon]=\"button.icon\"  \r\n                                                [path]=\"_Path(button.property, row)\"\r\n                                                (onClick)=\"button.event.emit(row)\"\r\n                                            ></wia-button>\r\n                                        </div>\r\n                                    }\r\n                                </td>\r\n                            }\r\n                        }\r\n\r\n                        @if(bodySettings().showRowNumber) {\r\n                            <td class=\"td-index\" [ngStyle]=\"{ 'border-bottom': _borderButtom() }\">{{ index + 1 }}</td>\r\n                        }\r\n\r\n\r\n                        @for(column of columns(); track column.__index__) {\r\n                            <td class=\"td-content\"\r\n                                [ngStyle]=\"{ \r\n                                    'border-bottom' : _borderButtom(), \r\n                                    'vertical-align': column.config.textAlignY!,   \r\n                                    'cursor'        : bodySettings().selectionRows?.selectOverRow ? 'pointer' : 'default'                                  \r\n                                }\"> \r\n                                <wia-grid-cell\r\n                                    [id]=\"IdCalculated()(row.__index__, column.__index__, 'cell')\"\r\n                                    [ApplyFormat]=\"ApplyFormat()\"\r\n                                    [column]=\"column\"\r\n                                    [row]=\"row\" \r\n                                    [bodySettings]=\"bodySettings()\"\r\n                                    [isLoadingInner]=\"isLoadingInner()\"\r\n                                    [isEnabled]=\"isEnabled()\"\r\n                                    [isDraging]=\"dragingId() === row.__index__\"\r\n                                    [isDragoverself]=\"(dragoverId() === row.__index__) && (dragingId() == row.__index__)\"\r\n                                    [isDragoverUp]=\"(dragoverId() === row.__index__) && (dragingId() > row.__index__)\"\r\n                                    [isDragoverDown]=\"(dragoverId() === row.__index__) && (dragingId() < row.__index__)\"\r\n                                    (onClickRow)=\"_ClickOnRow($event)\"\r\n                                    (onDoubleClickRow)=\"onDoubleClickRow.emit($event)\"\r\n                                    (onInputChange)=\"onInputChange.emit($event)\"\r\n                                    (onKeyupEnter)=\"_NextInput(row.__index__, column.__index__, $event)\"\r\n                                    (onUpdateType)=\"onUpdateType.emit($event)\"\r\n                                ></wia-grid-cell>\r\n                            </td>\r\n                        }\r\n\r\n\r\n                        @for(button of _buttonsByRow(); track button.property) {\r\n                            @if(_ShowButton(button, 'right')) {\r\n                                <td class=\"action-column\" [ngStyle]=\"{ 'border-bottom': _borderButtom() }\">\r\n                                    @if(_ShowButton(button, 'right', row)) {\r\n                                        <div class=\"action-column-content\">\r\n                                            <wia-button\r\n                                                [type]=\"button.type\"\r\n                                                [color]=\"button.color\"\r\n                                                [icon]=\"button.icon\"  \r\n                                                [path]=\"_Path(button.property, row)\"\r\n                                                (onClick)=\"button.event.emit(row)\"\r\n                                            ></wia-button>\r\n                                        </div>\r\n                                    }\r\n                                </td>\r\n                            }\r\n                        }\r\n                    </tr>\r\n                }\r\n            </tbody>\r\n        }\r\n    </table>\r\n    \r\n    <!-- Loading / Empty -->\r\n    @if(isLoading()) {\r\n        <wia-loading [isLoading]=\"true\" position=\"sticky\"></wia-loading> \r\n    } \r\n\r\n    @else if(isEnabled() && dataSourceGroup().length <= 0) {\r\n        <div class=\"empty-data\">\r\n            <div class=\"empty-data-content\"> No Data </div>\r\n        </div>\r\n    }\r\n</section> ", styles: ["section.coer-grid-body{position:relative!important;background-color:var(--light)}section.coer-grid-body table{width:100%!important;table-layout:auto!important;border-collapse:separate!important;border-spacing:1px 0px!important;margin:0!important;font-size:14px}section.coer-grid-body table thead tr th{position:sticky!important;top:0!important;vertical-align:middle!important;background-color:var(--gray)!important;color:var(--smoke)!important;overflow:hidden!important;text-overflow:ellipsis!important;min-width:20px!important;padding:5px!important;-webkit-user-select:none!important;user-select:none!important;z-index:2!important}section.coer-grid-body table thead tr th div.th-content{display:flex!important;align-items:center!important;justify-content:space-between!important;width:inherit!important;min-height:20px!important}section.coer-grid-body table thead tr th div.th-content i{font-size:15px!important}section.coer-grid-body table tbody tr td{text-overflow:ellipsis!important;padding:0!important;z-index:1!important;background-color:var(--light)}section.coer-grid-body table tbody tr.striped td{background-color:var(--input)!important}section.coer-grid-body table tbody tr.no-striped td{background-color:var(--light)!important}section.coer-grid-body table tbody tr.hover:hover td{background-color:var(--item-hover)!important}section.coer-grid-body table th.action-column,section.coer-grid-body table td.action-column{width:20px!important;min-width:20px!important;max-width:20px!important;padding:0!important;overflow:hidden!important;vertical-align:middle!important}section.coer-grid-body table th.action-column div.action-column-content,section.coer-grid-body table td.action-column div.action-column-content{display:flex!important;align-items:center!important;justify-content:center!important;height:25px!important}section.coer-grid-body table th.th-index,section.coer-grid-body table td.td-index{width:25px;max-width:50px;text-align:center;vertical-align:middle}section.coer-grid-body div.empty-data{position:absolute!important;height:100%!important;width:100%!important;min-height:inherit!important;inset:0!important;display:flex!important;align-items:center!important;justify-content:center!important}section.coer-grid-body div.empty-data div.empty-data-content{flex-flow:column!important;display:inherit!important;justify-content:inherit!important;align-items:inherit!important;font-size:35px!important;color:var(--gray)!important;-webkit-user-select:none!important;user-select:none!important}section.coer-grid-body div.empty-data div.empty-data-content i{font-size:inherit!important}\n"] }]
        }], ctorParameters: () => [], propDecorators: { _coerGridCellList: [{ type: i0.ViewChildren, args: [i0.forwardRef(() => WIAGridCell), { isSignal: true }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: true }] }], IdCalculated: [{ type: i0.Input, args: [{ isSignal: true, alias: "IdCalculated", required: true }] }], ApplyFormat: [{ type: i0.Input, args: [{ isSignal: true, alias: "ApplyFormat", required: true }] }], columns: [{ type: i0.Input, args: [{ isSignal: true, alias: "columns", required: true }] }], dataSourceGroup: [{ type: i0.Input, args: [{ isSignal: true, alias: "dataSourceGroup", required: true }] }], headerSettings: [{ type: i0.Input, args: [{ isSignal: true, alias: "headerSettings", required: true }] }], bodySettings: [{ type: i0.Input, args: [{ isSignal: true, alias: "bodySettings", required: true }] }], isLoadingInner: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoadingInner", required: true }] }], isLoading: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoading", required: true }] }], isEnabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "isEnabled", required: true }] }], useContainer: [{ type: i0.Input, args: [{ isSignal: true, alias: "useContainer", required: true }] }], displayProperty: [{ type: i0.Input, args: [{ isSignal: true, alias: "displayProperty", required: true }] }], isDraggable: [{ type: i0.Input, args: [{ isSignal: true, alias: "isDraggable", required: true }] }], search: [{ type: i0.Input, args: [{ isSignal: true, alias: "search", required: true }] }], height: [{ type: i0.Input, args: [{ isSignal: true, alias: "height", required: true }] }], minHeight: [{ type: i0.Input, args: [{ isSignal: true, alias: "minHeight", required: true }] }], maxHeight: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxHeight", required: true }] }], pagesLoaded: [{ type: i0.Input, args: [{ isSignal: true, alias: "pagesLoaded", required: true }] }], onClickRow: [{ type: i0.Output, args: ["onClickRow"] }], onDoubleClickRow: [{ type: i0.Output, args: ["onDoubleClickRow"] }], onClickDeleteRow: [{ type: i0.Output, args: ["onClickDeleteRow"] }], onClickEditRow: [{ type: i0.Output, args: ["onClickEditRow"] }], onClickModalRow: [{ type: i0.Output, args: ["onClickModalRow"] }], onClickNavigateRow: [{ type: i0.Output, args: ["onClickNavigateRow"] }], onSelectedRowChange: [{ type: i0.Output, args: ["onSelectedRowChange"] }], onSelectedRow: [{ type: i0.Output, args: ["onSelectedRow"] }], onInputChange: [{ type: i0.Output, args: ["onInputChange"] }], onKeyupEnter: [{ type: i0.Output, args: ["onKeyupEnter"] }], onKeyupEnterLast: [{ type: i0.Output, args: ["onKeyupEnterLast"] }], onUpdateType: [{ type: i0.Output, args: ["onUpdateType"] }], onSort: [{ type: i0.Output, args: ["onSort"] }], onReorder: [{ type: i0.Output, args: ["onReorder"] }], onLoadPages: [{ type: i0.Output, args: ["onLoadPages"] }] } });

class WIAGridFooter {
    //Variables
    IsBooleanFalse = Tools.IsBooleanFalse;
    IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    //Inputs
    value = input.required(...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    dataSourceSelected = input.required(...(ngDevMode ? [{ debugName: "dataSourceSelected" }] : /* istanbul ignore next */ []));
    dataSourceFiltered = input.required(...(ngDevMode ? [{ debugName: "dataSourceFiltered" }] : /* istanbul ignore next */ []));
    search = input.required(...(ngDevMode ? [{ debugName: "search" }] : /* istanbul ignore next */ []));
    IdCalculated = input.required(...(ngDevMode ? [{ debugName: "IdCalculated" }] : /* istanbul ignore next */ []));
    footerSettings = input.required(...(ngDevMode ? [{ debugName: "footerSettings" }] : /* istanbul ignore next */ []));
    isLoadingInner = input.required(...(ngDevMode ? [{ debugName: "isLoadingInner" }] : /* istanbul ignore next */ []));
    isLoading = input.required(...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAGridFooter, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIAGridFooter, isStandalone: false, selector: "wia-grid-footer", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: true, transformFunction: null }, dataSourceSelected: { classPropertyName: "dataSourceSelected", publicName: "dataSourceSelected", isSignal: true, isRequired: true, transformFunction: null }, dataSourceFiltered: { classPropertyName: "dataSourceFiltered", publicName: "dataSourceFiltered", isSignal: true, isRequired: true, transformFunction: null }, search: { classPropertyName: "search", publicName: "search", isSignal: true, isRequired: true, transformFunction: null }, IdCalculated: { classPropertyName: "IdCalculated", publicName: "IdCalculated", isSignal: true, isRequired: true, transformFunction: null }, footerSettings: { classPropertyName: "footerSettings", publicName: "footerSettings", isSignal: true, isRequired: true, transformFunction: null }, isLoadingInner: { classPropertyName: "isLoadingInner", publicName: "isLoadingInner", isSignal: true, isRequired: true, transformFunction: null }, isLoading: { classPropertyName: "isLoading", publicName: "isLoading", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "@if(!IsBooleanFalse(footerSettings().show) && !isLoading() && value().length > 0) {\r\n    <footer [id]=\"IdCalculated()(-1, -1, 'footer-container')\">\r\n        <span class=\"item-selected\">\r\n            @if(isLoadingInner()()) {\r\n                <span class=\"animation-fade\"> Loading </span>\r\n            }\r\n\r\n            @else if(dataSourceSelected().length > 0) {\r\n                <span>\r\n                    <i class=\"iw-check-square\"></i> \r\n                    {{ dataSourceSelected().length | numericFormat }}\r\n                </span>\r\n            }\r\n        </span>\r\n\r\n        @if(IsNotOnlyWhiteSpace(search())) {\r\n            <span class=\"quantity\">\r\n                <i class=\"iw-filter-fill\"></i>\r\n                {{ dataSourceFiltered().length | numericFormat }} Rows \r\n            </span>\r\n        } \r\n\r\n        @else if(value().length > 0) {\r\n            <span class=\"quantity\"> {{ value().length | numericFormat }} Rows </span>\r\n        }  \r\n    </footer>\r\n}  ", styles: ["footer{height:25px!important;max-height:25px!important;padding-top:5px!important;font-weight:700!important;color:var(--readonly)!important;overflow:hidden!important;display:flex!important;align-items:center!important;justify-content:space-between!important;flex-wrap:wrap!important;gap:10px!important}footer span.item-selected span{margin-left:5px!important}footer span.item-selected span i{font-size:18px!important}footer span.quantity{margin-right:5px!important;display:flex!important;align-items:center!important}\n"], dependencies: [{ kind: "pipe", type: i2$2.NumericFormatPipe, name: "numericFormat" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAGridFooter, decorators: [{
            type: Component,
            args: [{ selector: 'wia-grid-footer', standalone: false, template: "@if(!IsBooleanFalse(footerSettings().show) && !isLoading() && value().length > 0) {\r\n    <footer [id]=\"IdCalculated()(-1, -1, 'footer-container')\">\r\n        <span class=\"item-selected\">\r\n            @if(isLoadingInner()()) {\r\n                <span class=\"animation-fade\"> Loading </span>\r\n            }\r\n\r\n            @else if(dataSourceSelected().length > 0) {\r\n                <span>\r\n                    <i class=\"iw-check-square\"></i> \r\n                    {{ dataSourceSelected().length | numericFormat }}\r\n                </span>\r\n            }\r\n        </span>\r\n\r\n        @if(IsNotOnlyWhiteSpace(search())) {\r\n            <span class=\"quantity\">\r\n                <i class=\"iw-filter-fill\"></i>\r\n                {{ dataSourceFiltered().length | numericFormat }} Rows \r\n            </span>\r\n        } \r\n\r\n        @else if(value().length > 0) {\r\n            <span class=\"quantity\"> {{ value().length | numericFormat }} Rows </span>\r\n        }  \r\n    </footer>\r\n}  ", styles: ["footer{height:25px!important;max-height:25px!important;padding-top:5px!important;font-weight:700!important;color:var(--readonly)!important;overflow:hidden!important;display:flex!important;align-items:center!important;justify-content:space-between!important;flex-wrap:wrap!important;gap:10px!important}footer span.item-selected span{margin-left:5px!important}footer span.item-selected span i{font-size:18px!important}footer span.quantity{margin-right:5px!important;display:flex!important;align-items:center!important}\n"] }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: true }] }], dataSourceSelected: [{ type: i0.Input, args: [{ isSignal: true, alias: "dataSourceSelected", required: true }] }], dataSourceFiltered: [{ type: i0.Input, args: [{ isSignal: true, alias: "dataSourceFiltered", required: true }] }], search: [{ type: i0.Input, args: [{ isSignal: true, alias: "search", required: true }] }], IdCalculated: [{ type: i0.Input, args: [{ isSignal: true, alias: "IdCalculated", required: true }] }], footerSettings: [{ type: i0.Input, args: [{ isSignal: true, alias: "footerSettings", required: true }] }], isLoadingInner: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoadingInner", required: true }] }], isLoading: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoading", required: true }] }] } });

class WIAGridHeader {
    //Elements
    _inputFile = viewChild.required('inputFileRef');
    //Variables
    _isLoadingExport = signal(false, ...(ngDevMode ? [{ debugName: "_isLoadingExport" }] : /* istanbul ignore next */ []));
    _isElementReady = signal(false, ...(ngDevMode ? [{ debugName: "_isElementReady" }] : /* istanbul ignore next */ []));
    IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    //Input
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    icon = input.required(...(ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []));
    IdCalculated = input.required(...(ngDevMode ? [{ debugName: "IdCalculated" }] : /* istanbul ignore next */ []));
    search = input.required(...(ngDevMode ? [{ debugName: "search" }] : /* istanbul ignore next */ []));
    headerSettings = input.required({ ...(ngDevMode ? { debugName: "headerSettings" } : /* istanbul ignore next */ {}) });
    isLoadingInner = input.required(...(ngDevMode ? [{ debugName: "isLoadingInner" }] : /* istanbul ignore next */ []));
    isLoading = input.required(...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    isEnabled = input.required(...(ngDevMode ? [{ debugName: "isEnabled" }] : /* istanbul ignore next */ []));
    dataSourceExport = input.required(...(ngDevMode ? [{ debugName: "dataSourceExport" }] : /* istanbul ignore next */ []));
    contentElements = input.required(...(ngDevMode ? [{ debugName: "contentElements" }] : /* istanbul ignore next */ []));
    //Output     
    onClickBack = output();
    onClickCancel = output();
    onClickFilter = output();
    onClickExport = output();
    onClickImport = output();
    onClickAdd = output();
    onClickSave = output();
    onSearchChange = output();
    onKeyupEnter = output();
    onInputChange = output();
    onClickClear = output();
    onClickSearch = output();
    ngAfterViewInit() {
        Tools.Sleep(1000).then(() => this._isElementReady.set(true));
    }
    //Computed
    _buttons = computed(() => {
        const COLOR = (property, defaultColor) => Tools.IsNotOnlyWhiteSpace(this.headerSettings()[property]?.color)
            ? this.headerSettings()[property].color
            : defaultColor;
        const PATH = (property) => Tools.IsNotOnlyWhiteSpace(this.headerSettings()[property]?.path)
            ? this.headerSettings()[property].path
            : '';
        const TOOLTIP = (property) => Tools.IsNotOnlyWhiteSpace(this.headerSettings()[property]?.tooltip)
            ? this.headerSettings()[property].tooltip
            : '';
        const LOADING = (property) => Tools.IsOnlyWhiteSpace(this.headerSettings()[property]?.path)
            ? (this.isLoading() || this.isLoadingInner()()) : false;
        const SHOW = (property) => Tools.IsBooleanTrue(this.headerSettings()[property]?.show)
            && (Tools.IsOnlyWhiteSpace(this.headerSettings()[property]?.path) ? this.isEnabled() : true);
        return []
            .concat(SHOW('backButton') ? [{
                icon: 'back',
                label: 'Back',
                color: COLOR('backButton', 'primary'),
                path: PATH('backButton'),
                tooltip: TOOLTIP('backButton'),
                isLoading: LOADING('backButton'),
                event: this.onClickBack
            }] : [])
            .concat(SHOW('cancelButton') ? [{
                icon: 'cancel',
                label: 'Cancel',
                color: COLOR('cancelButton', 'danger'),
                path: PATH('cancelButton'),
                tooltip: TOOLTIP('cancelButton'),
                isLoading: LOADING('cancelButton'),
                event: this.onClickCancel
            }] : [])
            .concat(SHOW('filterButton') ? [{
                icon: 'filter',
                label: 'Filter',
                color: COLOR('filterButton', 'primary'),
                path: PATH('filterButton'),
                tooltip: TOOLTIP('filterButton'),
                isLoading: LOADING('filterButton'),
                event: this.onClickFilter
            }] : [])
            .concat((SHOW('exportButton') && this.dataSourceExport().length > 0) ? [{
                icon: 'excel',
                label: 'Export',
                color: COLOR('exportButton', 'primary'),
                path: PATH('exportButton'),
                tooltip: TOOLTIP('exportButton'),
                isLoading: LOADING('exportButton') || this._isLoadingExport(),
                event: {
                    emit: (() => {
                        {
                            if (Tools.IsNotOnlyWhiteSpace(this.headerSettings().exportButton?.path))
                                this.Export(false);
                            else
                                this.Export(!Tools.IsBooleanTrue(this.headerSettings().exportButton?.preventDefault));
                        }
                    })
                }
            }] : [])
            .concat(SHOW('importButton') ? [{
                icon: 'import',
                label: 'Import',
                color: COLOR('importButton', 'primary'),
                path: PATH('importButton'),
                tooltip: TOOLTIP('importButton'),
                isLoading: LOADING('importButton'),
                event: {
                    emit: (() => this.Import(null))
                }
            }] : [])
            .concat(SHOW('addButton') ? [{
                icon: 'add',
                label: 'Add',
                color: COLOR('addButton', 'primary'),
                path: PATH('addButton'),
                tooltip: TOOLTIP('addButton'),
                isLoading: LOADING('addButton'),
                event: this.onClickAdd
            }] : [])
            .concat(SHOW('saveButton') ? [{
                icon: 'save',
                label: 'Save',
                color: COLOR('saveButton', 'primary'),
                path: PATH('saveButton'),
                tooltip: TOOLTIP('saveButton'),
                isLoading: LOADING('saveButton'),
                event: this.onClickSave
            }] : []);
    }, ...(ngDevMode ? [{ debugName: "_buttons" }] : /* istanbul ignore next */ []));
    //Computed
    _showSearch = computed(() => {
        return Tools.IsBooleanTrue(this.headerSettings().search?.show);
    }, ...(ngDevMode ? [{ debugName: "_showSearch" }] : /* istanbul ignore next */ []));
    //Computed
    _slotPosition = computed(() => {
        const position = Tools.IsNotOnlyWhiteSpace(this.headerSettings()?.slotPosition) ? this.headerSettings().slotPosition : 'left';
        const margin = position === 'left' ? 'margin-right-auto' : 'margin-left-auto';
        const width = this._buttons().length > 0 || this._showSearch() ? '' : 'width-100';
        return `flex-wrap gap-5px ${width} ${margin}`;
    }, ...(ngDevMode ? [{ debugName: "_slotPosition" }] : /* istanbul ignore next */ []));
    /** */
    Export(exportFile = true, fileName = '') {
        this.isLoadingInner().set(true);
        this._isLoadingExport.set(true);
        //Export File
        if (exportFile) {
            if (fileName.length <= 0) {
                fileName = Tools.IsNotOnlyWhiteSpace(this.headerSettings().exportButton?.fileName)
                    ? this.headerSettings().exportButton?.fileName : 'Report';
            }
            if (!fileName.endsWith('.xlsx'))
                fileName += '.xlsx';
            Files.ExportExcel(this.dataSourceExport(), fileName);
            this.onClickExport.emit(this.dataSourceExport());
            Tools.Sleep(3000).then(() => this._isLoadingExport.set(false));
        }
        else {
            this.onClickExport.emit(this.dataSourceExport());
            this._isLoadingExport.set(false);
        }
        this.isLoadingInner().set(false);
    }
    //Computed
    _importAccept = computed(() => Array.from(Files.EXCEL_EXTENSIONS.values()).join(','), ...(ngDevMode ? [{ debugName: "_importAccept" }] : /* istanbul ignore next */ []));
    /** */
    async Import(event = null) {
        try {
            if (Tools.IsBooleanTrue(this.headerSettings().importButton?.preventDefault) || Tools.IsNotOnlyWhiteSpace(this.headerSettings().importButton?.path)) {
                this.onClickImport.emit({ data: [], file: null, autofill: false });
                return;
            }
            if (event === null) {
                this._inputFile().nativeElement.value = [];
                this._inputFile().nativeElement.click();
                this.isLoadingInner().set(true);
                return;
            }
            else if (event.target.files.length > 0) {
                const [selectedFile] = event.target.files;
                if (Files.IsExcel(selectedFile)) {
                    const { rows } = await Files.ReadExcel(selectedFile);
                    this.onClickImport.emit({
                        data: rows,
                        file: selectedFile,
                        autofill: rows.length > 0 && !Tools.IsBooleanFalse(this.headerSettings().importButton?.Autofill)
                    });
                }
                else {
                    let message = 'Allowed extensions:';
                    for (const extension of Files.EXCEL_EXTENSIONS.keys()) {
                        message += ` <b>${extension}</b>,`;
                    }
                    message = message.substring(0, message.length - 1);
                    new CoerAlert().Warning(message, 'Invalid File Type', 'iw-file-xls-fill');
                }
                this._inputFile().nativeElement.value = [];
            }
        }
        catch (error) {
            console.error(`coer-grid: ${error}`);
        }
    }
    //Function
    _SearchChange(value) {
        if (this._isElementReady()) {
            this.search().set(value);
            this.onInputChange.emit({
                position: 'HEADER',
                input: 'inputSearch',
                value: (value || '')
            });
            this.onSearchChange.emit(value);
        }
    }
    //Computed
    _gridHeaderBelow = computed(() => {
        return this.contentElements()().find(x => Strings.Equals(x.templateRef(), 'grid-header-below')) || null;
    }, ...(ngDevMode ? [{ debugName: "_gridHeaderBelow" }] : /* istanbul ignore next */ []));
    //Computed
    _showHeaderBelow = computed(() => {
        return Tools.IsNotNull(this._gridHeaderBelow()?.template) && this._gridHeaderBelow()?.show();
    }, ...(ngDevMode ? [{ debugName: "_showHeaderBelow" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAGridHeader, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIAGridHeader, isStandalone: false, selector: "wia-grid-header", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: true, transformFunction: null }, IdCalculated: { classPropertyName: "IdCalculated", publicName: "IdCalculated", isSignal: true, isRequired: true, transformFunction: null }, search: { classPropertyName: "search", publicName: "search", isSignal: true, isRequired: true, transformFunction: null }, headerSettings: { classPropertyName: "headerSettings", publicName: "headerSettings", isSignal: true, isRequired: true, transformFunction: null }, isLoadingInner: { classPropertyName: "isLoadingInner", publicName: "isLoadingInner", isSignal: true, isRequired: true, transformFunction: null }, isLoading: { classPropertyName: "isLoading", publicName: "isLoading", isSignal: true, isRequired: true, transformFunction: null }, isEnabled: { classPropertyName: "isEnabled", publicName: "isEnabled", isSignal: true, isRequired: true, transformFunction: null }, dataSourceExport: { classPropertyName: "dataSourceExport", publicName: "dataSourceExport", isSignal: true, isRequired: true, transformFunction: null }, contentElements: { classPropertyName: "contentElements", publicName: "contentElements", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { onClickBack: "onClickBack", onClickCancel: "onClickCancel", onClickFilter: "onClickFilter", onClickExport: "onClickExport", onClickImport: "onClickImport", onClickAdd: "onClickAdd", onClickSave: "onClickSave", onSearchChange: "onSearchChange", onKeyupEnter: "onKeyupEnter", onInputChange: "onInputChange", onClickClear: "onClickClear", onClickSearch: "onClickSearch" }, viewQueries: [{ propertyName: "_inputFile", first: true, predicate: ["inputFileRef"], descendants: true, isSignal: true }], ngImport: i0, template: "<header [id]=\"IdCalculated()(-1, -1, 'header-container')\"     \r\n    [ngClass]=\"{ 'margin-bottom-5px': (_buttons().length > 0 || _showSearch() || slotRef.childElementCount > 0) }\" \r\n    class=\"flex-wrap-middle-right gap-5px\">\r\n\r\n    @if(slotRef.childElementCount <= 0 && IsNotOnlyWhiteSpace(label())) {\r\n        <h3 class=\"margin-right-auto text-ellipsis flex-middle-left gap-5px\">              \r\n            @if(IsNotOnlyWhiteSpace(icon())) {\r\n                <i [class]=\"icon()\" class=\"min-width-20px font-size-20px\"></i>\r\n            }\r\n\r\n            <span >{{ label() }}</span> \r\n        </h3>\r\n    }\r\n\r\n    <div #slotRef [class]=\"_slotPosition()\" [ngClass]=\"{ 'display-none': slotRef.childElementCount <= 0 }\">\r\n        <ng-content></ng-content>\r\n    </div> \r\n     \r\n\r\n    @if(_buttons().length > 0) { \r\n        <div class=\"flex-basis-min-content display-flex gap-5px\"> \r\n            <input type=\"file\" \r\n                #inputFileRef \r\n                class=\"display-none\"\r\n                [multiple]=\"false\" \r\n                (change)=\"Import($event)\" \r\n                (cancel)=\"isLoadingInner().set(false)\"\r\n                [accept]=\"_importAccept()\">\r\n\r\n            @for(button of _buttons(); track button.icon) {\r\n                <wia-button\r\n                    [label]=\"button.label\"\r\n                    [type]=\"headerSettings().buttonType || 'icon-filled-rounded'\" \r\n                    [icon]=\"button.icon\"\r\n                    [color]=\"button.color\"\r\n                    [path]=\"button.path\"      \r\n                    [isLoading]=\"button.isLoading\"\r\n                    (onClick)=\"button.event.emit()\"\r\n                ></wia-button>\r\n            }\r\n        </div>\r\n    }\r\n\r\n    @if(_showSearch()) {\r\n        <div class=\"mv-flex-basis-100 mv-flex-grow-1 xs-flex-basis-100 md-flex-basis-min-content\">\r\n            <wia-textbox\r\n                #searchRef\r\n                [id]=\"IdCalculated()(-1, -1, 'search')\" \r\n                [ngModel]=\"search()()\"\r\n                minWidth=\"250px\"\r\n                placeholder=\"Search\" \r\n                [selectOnFocus]=\"true\"\r\n                [showSearchButton]=\"true\"\r\n                [showClearButton]=\"true\"\r\n                [isLoading]=\"isLoading() || isLoadingInner()()\" \r\n                (onValueChange)=\"_SearchChange($event)\"\r\n                (onKeyupEnter)=\"onKeyupEnter.emit({\r\n                    position: 'HEADER',\r\n                    input: 'inputSearch',\r\n                    value: ($event || '')\r\n                })\"\r\n                (onClickClear)=\"onClickClear.emit({\r\n                    position: 'HEADER',\r\n                    input: 'inputSearch', \r\n                    value: $event\r\n                })\"\r\n                (onClickSearch)=\"onClickSearch.emit({\r\n                    position: 'HEADER',\r\n                    input: 'inputSearch', \r\n                    value: ($event || '')\r\n                })\"\r\n            ></wia-textbox> \r\n        </div>\r\n    }\r\n\r\n    @if(_showHeaderBelow()) { \r\n        <div #HeaderBelowRef class=\"flex-wrap-middle-right width-100 gap-10px\">\r\n            <ng-container [ngTemplateOutlet]=\"_gridHeaderBelow().template\"></ng-container>\r\n        </div>\r\n    }\r\n</header>", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: WIAButton, selector: "wia-button", inputs: ["label", "type", "color", "icon", "path", "iconPosition", "isLoading", "isReadonly", "isInvisible", "isHidden", "breakpoints", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "marginTop", "marginRight", "marginBottom", "marginLeft"], outputs: ["onClick", "onDestroy", "onReady"] }, { kind: "component", type: WIATextBox, selector: "wia-textbox", inputs: ["placeholder", "selectOnFocus", "textPosition", "minLength", "maxLength", "showClearButton", "showSearchButton", "externalButtons", "size", "width", "minWidth", "maxWidth"], outputs: ["onKeyupEnter", "onClickClear", "onClickSearch", "onClickLeft", "onClickRight"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAGridHeader, decorators: [{
            type: Component,
            args: [{ selector: 'wia-grid-header', standalone: false, template: "<header [id]=\"IdCalculated()(-1, -1, 'header-container')\"     \r\n    [ngClass]=\"{ 'margin-bottom-5px': (_buttons().length > 0 || _showSearch() || slotRef.childElementCount > 0) }\" \r\n    class=\"flex-wrap-middle-right gap-5px\">\r\n\r\n    @if(slotRef.childElementCount <= 0 && IsNotOnlyWhiteSpace(label())) {\r\n        <h3 class=\"margin-right-auto text-ellipsis flex-middle-left gap-5px\">              \r\n            @if(IsNotOnlyWhiteSpace(icon())) {\r\n                <i [class]=\"icon()\" class=\"min-width-20px font-size-20px\"></i>\r\n            }\r\n\r\n            <span >{{ label() }}</span> \r\n        </h3>\r\n    }\r\n\r\n    <div #slotRef [class]=\"_slotPosition()\" [ngClass]=\"{ 'display-none': slotRef.childElementCount <= 0 }\">\r\n        <ng-content></ng-content>\r\n    </div> \r\n     \r\n\r\n    @if(_buttons().length > 0) { \r\n        <div class=\"flex-basis-min-content display-flex gap-5px\"> \r\n            <input type=\"file\" \r\n                #inputFileRef \r\n                class=\"display-none\"\r\n                [multiple]=\"false\" \r\n                (change)=\"Import($event)\" \r\n                (cancel)=\"isLoadingInner().set(false)\"\r\n                [accept]=\"_importAccept()\">\r\n\r\n            @for(button of _buttons(); track button.icon) {\r\n                <wia-button\r\n                    [label]=\"button.label\"\r\n                    [type]=\"headerSettings().buttonType || 'icon-filled-rounded'\" \r\n                    [icon]=\"button.icon\"\r\n                    [color]=\"button.color\"\r\n                    [path]=\"button.path\"      \r\n                    [isLoading]=\"button.isLoading\"\r\n                    (onClick)=\"button.event.emit()\"\r\n                ></wia-button>\r\n            }\r\n        </div>\r\n    }\r\n\r\n    @if(_showSearch()) {\r\n        <div class=\"mv-flex-basis-100 mv-flex-grow-1 xs-flex-basis-100 md-flex-basis-min-content\">\r\n            <wia-textbox\r\n                #searchRef\r\n                [id]=\"IdCalculated()(-1, -1, 'search')\" \r\n                [ngModel]=\"search()()\"\r\n                minWidth=\"250px\"\r\n                placeholder=\"Search\" \r\n                [selectOnFocus]=\"true\"\r\n                [showSearchButton]=\"true\"\r\n                [showClearButton]=\"true\"\r\n                [isLoading]=\"isLoading() || isLoadingInner()()\" \r\n                (onValueChange)=\"_SearchChange($event)\"\r\n                (onKeyupEnter)=\"onKeyupEnter.emit({\r\n                    position: 'HEADER',\r\n                    input: 'inputSearch',\r\n                    value: ($event || '')\r\n                })\"\r\n                (onClickClear)=\"onClickClear.emit({\r\n                    position: 'HEADER',\r\n                    input: 'inputSearch', \r\n                    value: $event\r\n                })\"\r\n                (onClickSearch)=\"onClickSearch.emit({\r\n                    position: 'HEADER',\r\n                    input: 'inputSearch', \r\n                    value: ($event || '')\r\n                })\"\r\n            ></wia-textbox> \r\n        </div>\r\n    }\r\n\r\n    @if(_showHeaderBelow()) { \r\n        <div #HeaderBelowRef class=\"flex-wrap-middle-right width-100 gap-10px\">\r\n            <ng-container [ngTemplateOutlet]=\"_gridHeaderBelow().template\"></ng-container>\r\n        </div>\r\n    }\r\n</header>" }]
        }], propDecorators: { _inputFile: [{ type: i0.ViewChild, args: ['inputFileRef', { isSignal: true }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: true }] }], IdCalculated: [{ type: i0.Input, args: [{ isSignal: true, alias: "IdCalculated", required: true }] }], search: [{ type: i0.Input, args: [{ isSignal: true, alias: "search", required: true }] }], headerSettings: [{ type: i0.Input, args: [{ isSignal: true, alias: "headerSettings", required: true }] }], isLoadingInner: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoadingInner", required: true }] }], isLoading: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoading", required: true }] }], isEnabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "isEnabled", required: true }] }], dataSourceExport: [{ type: i0.Input, args: [{ isSignal: true, alias: "dataSourceExport", required: true }] }], contentElements: [{ type: i0.Input, args: [{ isSignal: true, alias: "contentElements", required: true }] }], onClickBack: [{ type: i0.Output, args: ["onClickBack"] }], onClickCancel: [{ type: i0.Output, args: ["onClickCancel"] }], onClickFilter: [{ type: i0.Output, args: ["onClickFilter"] }], onClickExport: [{ type: i0.Output, args: ["onClickExport"] }], onClickImport: [{ type: i0.Output, args: ["onClickImport"] }], onClickAdd: [{ type: i0.Output, args: ["onClickAdd"] }], onClickSave: [{ type: i0.Output, args: ["onClickSave"] }], onSearchChange: [{ type: i0.Output, args: ["onSearchChange"] }], onKeyupEnter: [{ type: i0.Output, args: ["onKeyupEnter"] }], onInputChange: [{ type: i0.Output, args: ["onInputChange"] }], onClickClear: [{ type: i0.Output, args: ["onClickClear"] }], onClickSearch: [{ type: i0.Output, args: ["onClickSearch"] }] } });

class WIAGrid extends ControlValue {
    //Injects
    _router = inject(Router);
    _alert = inject(CoerAlert);
    //Content 
    contentElements = contentChildren(TemplateRefDirective, ...(ngDevMode ? [{ debugName: "contentElements" }] : /* istanbul ignore next */ []));
    //Elements
    _header = viewChild('header', ...(ngDevMode ? [{ debugName: "_header" }] : /* istanbul ignore next */ []));
    _body = viewChild('body', ...(ngDevMode ? [{ debugName: "_body" }] : /* istanbul ignore next */ []));
    //Variables 
    _value = signal([], ...(ngDevMode ? [{ debugName: "_value" }] : /* istanbul ignore next */ []));
    _search = signal('', ...(ngDevMode ? [{ debugName: "_search" }] : /* istanbul ignore next */ []));
    _isLoadingInner = signal(false, ...(ngDevMode ? [{ debugName: "_isLoadingInner" }] : /* istanbul ignore next */ []));
    _headerHeight = signal(0, ...(ngDevMode ? [{ debugName: "_headerHeight" }] : /* istanbul ignore next */ []));
    _footerHeight = signal(0, ...(ngDevMode ? [{ debugName: "_footerHeight" }] : /* istanbul ignore next */ []));
    _containerHeight = signal(0, ...(ngDevMode ? [{ debugName: "_containerHeight" }] : /* istanbul ignore next */ []));
    _pagesLoaded = signal(0, ...(ngDevMode ? [{ debugName: "_pagesLoaded" }] : /* istanbul ignore next */ []));
    _resize$;
    //Input 
    columns = input([], ...(ngDevMode ? [{ debugName: "columns" }] : /* istanbul ignore next */ []));
    headerSettings = input({}, ...(ngDevMode ? [{ debugName: "headerSettings" }] : /* istanbul ignore next */ []));
    bodySettings = input({}, ...(ngDevMode ? [{ debugName: "bodySettings" }] : /* istanbul ignore next */ []));
    footerSettings = input({}, ...(ngDevMode ? [{ debugName: "footerSettings" }] : /* istanbul ignore next */ []));
    useContainer = input(true, ...(ngDevMode ? [{ debugName: "useContainer" }] : /* istanbul ignore next */ []));
    icon = input('', ...(ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []));
    width = input('100%', ...(ngDevMode ? [{ debugName: "width" }] : /* istanbul ignore next */ []));
    minWidth = input('100px', ...(ngDevMode ? [{ debugName: "minWidth" }] : /* istanbul ignore next */ []));
    maxWidth = input('100%', ...(ngDevMode ? [{ debugName: "maxWidth" }] : /* istanbul ignore next */ []));
    height = input('350px', ...(ngDevMode ? [{ debugName: "height" }] : /* istanbul ignore next */ []));
    minHeight = input('330px', ...(ngDevMode ? [{ debugName: "minHeight" }] : /* istanbul ignore next */ []));
    maxHeight = input('100%', ...(ngDevMode ? [{ debugName: "maxHeight" }] : /* istanbul ignore next */ []));
    siblings = input([], ...(ngDevMode ? [{ debugName: "siblings" }] : /* istanbul ignore next */ []));
    displayProperty = input('name', ...(ngDevMode ? [{ debugName: "displayProperty" }] : /* istanbul ignore next */ []));
    isDraggable = input(false, ...(ngDevMode ? [{ debugName: "isDraggable" }] : /* istanbul ignore next */ []));
    marginTop = input('15px', ...(ngDevMode ? [{ debugName: "marginTop" }] : /* istanbul ignore next */ []));
    marginRight = input('30px', ...(ngDevMode ? [{ debugName: "marginRight" }] : /* istanbul ignore next */ []));
    marginLeft = input('30px', ...(ngDevMode ? [{ debugName: "marginLeft" }] : /* istanbul ignore next */ []));
    //Outputs
    onClickBack = output();
    onClickCancel = output();
    onClickFilter = output();
    onClickExport = output();
    onClickImport = output();
    onClickAdd = output();
    onClickSave = output();
    onKeyupEnter = output();
    onClickClear = output();
    onClickSearch = output();
    onClickRow = output();
    onDoubleClickRow = output();
    onClickDeleteRow = output();
    onClickEditRow = output();
    onClickModalRow = output();
    onClickNavigateRow = output();
    onSelectedRow = output();
    onInputChange = output();
    onSort = output();
    onReorder = output();
    /** Sets the value of the component */
    _SetValue(value, finishLoadingInner = false) {
        if (Tools.IsNull(value))
            value = [];
        value = [...value].map((item, index) => ({ __checked__: false, ...item, __index__: index }));
        super._SetValue(value);
        if (finishLoadingInner)
            this._isLoadingInner.set(false);
        Tools.Sleep(500, `LOAD${this._id}`).then(() => this._body()?.LoadPages(0));
    }
    //Function
    _SetValueInput(event, updateType = false) {
        if (this._isElementReady() && event.property && event.before) {
            let delay = ['inputTextbox', 'inputNumberbox', 'inputSearch'].includes(event.input) ? 1000 : 0;
            Tools.Sleep(delay, `gridUpdating${event.property}`).then(() => {
                const BEFORE = { ...event.before };
                this._value.update(VALUE => {
                    const DATA_SOURCE = [...VALUE];
                    DATA_SOURCE[BEFORE.__index__][event.property] = event.value;
                    if (this._useModelBinding()) {
                        this._UpdateValue()(DATA_SOURCE);
                    }
                    return DATA_SOURCE;
                });
                delete BEFORE['__index__'];
                delete BEFORE['__checked__'];
                this.onInputChange.emit({
                    ...event,
                    before: BEFORE,
                    after: { ...BEFORE, [event.property]: event.value }
                });
            });
        }
        else if (updateType) {
            const BEFORE = { ...event.before };
            this._value.update(VALUE => {
                const DATA_SOURCE = [...VALUE];
                DATA_SOURCE[BEFORE.__index__][event.property] = event.value;
                if (this._useModelBinding()) {
                    this._UpdateValue()(DATA_SOURCE);
                }
                return DATA_SOURCE;
            });
        }
    }
    ngAfterContentChecked() {
        this.CalculateHeight();
        Tools.Sleep().then(() => this.CalculateHeight());
    }
    //computed
    _columns = computed(() => {
        const COLUMNS = this.columns().length > 0
            ? new Set(this.columns().filter(x => !Tools.IsBooleanFalse(x.show)).map(item => item.property).filter(x => !['__index__', '__checked__'].includes(x)))
            : new Set(Tools.GetPropertyList(this._value()[0]).filter(x => !['__index__', '__checked__'].includes(x)));
        return [...COLUMNS].map((property, index) => ({
            __index__: index,
            name: this._GetColumnName(property),
            config: this._GetColumnConfig(property)
        }));
    }, ...(ngDevMode ? [{ debugName: "_columns" }] : /* istanbul ignore next */ []));
    //Function
    _GetColumnName = (property) => {
        const COLUMN_CONFIG = this._GetColumnConfig(property);
        return COLUMN_CONFIG?.alias ? COLUMN_CONFIG.alias
            : property.replace(/([A-Z])/g, ' $1').replace(/^./, x => x.toUpperCase()).trim();
    };
    //Function
    _GetColumnConfig = (property) => {
        const COLUMN_CONFIG = this.columns().find(x => x.property === property);
        //inputSwitch
        if (COLUMN_CONFIG?.inputSwitch) {
            COLUMN_CONFIG.short = false;
            COLUMN_CONFIG.width = COLUMN_CONFIG?.width || '100px';
            COLUMN_CONFIG.textAlignX = 'center';
        }
        //inputTextbox
        else if (COLUMN_CONFIG?.inputTextbox) {
            COLUMN_CONFIG.width = '250px';
        }
        //inputNumberbox
        else if (COLUMN_CONFIG?.inputNumberbox) {
            COLUMN_CONFIG.width = '150px';
        }
        //inputSelectbox
        else if (COLUMN_CONFIG?.inputSelectbox) {
            COLUMN_CONFIG.width = '250px';
        }
        //inputDatebox
        else if (COLUMN_CONFIG?.inputDatebox) {
            COLUMN_CONFIG.width = '250px';
        }
        return {
            property,
            ...COLUMN_CONFIG,
            short: !Tools.IsBooleanFalse(COLUMN_CONFIG?.short),
            width: COLUMN_CONFIG?.width || 'auto',
            height: COLUMN_CONFIG?.height || '20px',
            textBreak: Tools.IsBooleanTrue(COLUMN_CONFIG?.textBreak),
            textAlignX: COLUMN_CONFIG?.textAlignX || 'left',
            textAlignY: COLUMN_CONFIG?.textAlignY || 'middle',
            color: COLUMN_CONFIG?.color || null,
            background: COLUMN_CONFIG?.background || null,
            format: COLUMN_CONFIG?.format || 'string'
        };
    };
    //Computed
    _dataSourceGroup = computed(() => {
        const DATA_SOURCE = this._dataSourceFiltered();
        //Response
        return DATA_SOURCE.length > 0 ? [{
                groupBy: 'Not Grouped',
                index: -1,
                rows: [...DATA_SOURCE].splice(0, this._pagesLoaded())
            }] : [];
    }, ...(ngDevMode ? [{ debugName: "_dataSourceGroup" }] : /* istanbul ignore next */ []));
    //computed
    _dataSourceFiltered = computed(() => {
        const DATA_SOURCE = this._value();
        const SEARCH_TEXT = this._search()?.trim()?.toUpperCase() || '';
        //Ignore Filter
        if (Tools.IsOnlyWhiteSpace(SEARCH_TEXT) || Tools.IsBooleanTrue(this.headerSettings()?.search?.preventDefault)) {
            return DATA_SOURCE;
        }
        //Filter by search   
        const SEARCH_PROPERTIES = this.headerSettings().search?.properties
            ? this.headerSettings().search?.properties : this.columns().map(item => item.property);
        //Data Formated
        let DATA_SOURCE_FORMAT = DATA_SOURCE.map((data) => this._columns().map(x => x.config).reduce((previousValue, currentValue) => ({
            ...previousValue,
            [currentValue.property]: this._ApplyFormat(data[currentValue.property], currentValue.format)
        }), { ...data }));
        DATA_SOURCE_FORMAT = Collections.Search(DATA_SOURCE_FORMAT, SEARCH_TEXT, SEARCH_PROPERTIES);
        return Collections.Intercept(DATA_SOURCE, DATA_SOURCE_FORMAT, '__index__');
    }, ...(ngDevMode ? [{ debugName: "_dataSourceFiltered" }] : /* istanbul ignore next */ []));
    //computed
    _dataSourceExport = computed(() => {
        let DATA_SOURCE = [...this._value()];
        if (Tools.IsBooleanTrue(this.headerSettings().exportButton?.onlyFilteredRows)) {
            DATA_SOURCE = [...this._dataSourceFiltered()];
        }
        if (Tools.IsBooleanTrue(this.headerSettings().exportButton?.onlySelectedRows)) {
            DATA_SOURCE = [...DATA_SOURCE].filter(item => item['__checked__']);
        }
        const COLUMNS = this.columns().length > 0 && !Tools.IsBooleanFalse(this.headerSettings().exportButton?.onlyColumnFiltered)
            ? Collections.Except(this.columns().map(item => item.property), ['__index__', '__checked__'])
            : Collections.Except(Tools.GetPropertyList(DATA_SOURCE[0]), ['__index__', '__checked__']);
        return DATA_SOURCE.map(row => Object.fromEntries(COLUMNS.map(property => [this._GetColumnName(property), row[property]])));
    }, ...(ngDevMode ? [{ debugName: "_dataSourceExport" }] : /* istanbul ignore next */ []));
    /** */
    selectedValue = computed(() => [...this._value()]
        .filter(item => item.__checked__)
        .map(({ ...item }) => {
        delete item['__index__'];
        delete item['__checked__'];
        return item;
    }), ...(ngDevMode ? [{ debugName: "selectedValue" }] : /* istanbul ignore next */ []));
    //Function
    _ApplyFormat = (value, type) => {
        switch (type) {
            case 'number': return Numbers.ToNumericFormat(`${value}`);
            case 'currency': return Numbers.ToCurrency(`${value}`);
            case 'date': return Dates.ToFormatDate(`${value}`);
            case 'datetime': return Dates.ToFormatDateTime(`${value}`, true);
            case 'time': return Dates.ToFormatTime(`${value}`, true);
            default: return Strings.CleanUpBlanks(`${value}`);
        }
    };
    //Function
    _IdCalculated = (indexRow, indexColumn, suffix = '') => {
        return `${this._id}${indexRow > -1 ? '-row' + indexRow : ''}${indexColumn > -1 ? '-column' + indexColumn : ''}${suffix.length > 0 ? '-' + suffix : ''}`;
    };
    //Function
    async _ClickDeleteRow(row) {
        const ROW = { ...row };
        delete ROW['__index__'];
        delete ROW['__checked__'];
        const USE_DEFAULT_FUNCTION = Tools.IsNull(this.bodySettings().deleteButton?.path)
            && !Tools.IsBooleanTrue(this.bodySettings().deleteButton?.preventDefault);
        if (USE_DEFAULT_FUNCTION) {
            let deleteItem = true;
            if (!Tools.IsBooleanFalse(this.bodySettings().deleteButton?.showConfirmation)) {
                let displayProperty = '';
                const ALERT_PROPERTY = this.bodySettings().deleteButton?.displayProperty || '';
                if (Tools.IsNotOnlyWhiteSpace(ALERT_PROPERTY)) {
                    if (Tools.HasProperty(ROW, ALERT_PROPERTY)) {
                        displayProperty = ROW[ALERT_PROPERTY];
                    }
                }
                if (Tools.IsOnlyWhiteSpace(displayProperty)) {
                    if (Tools.HasProperty(ROW, 'Name'))
                        displayProperty = ROW['Name'];
                    else if (Tools.HasProperty(ROW, 'name'))
                        displayProperty = ROW['name'];
                    else if (Tools.HasProperty(ROW, 'Option'))
                        displayProperty = ROW['Option'];
                    else if (Tools.HasProperty(ROW, 'option'))
                        displayProperty = ROW['option'];
                    else
                        displayProperty = 'row';
                }
                deleteItem = await this._alert.DangerConfirm(`Delete ${displayProperty} ?`, 'iw-trash-can');
            }
            if (deleteItem) {
                const DATA_SOURCE = [...this._value()];
                const INDEX = DATA_SOURCE.findIndex(item => JSON.stringify(item) === JSON.stringify(row));
                if (INDEX >= 0) {
                    DATA_SOURCE.splice(INDEX, 1);
                    this._SetValue(DATA_SOURCE);
                }
            }
        }
        this.onClickDeleteRow.emit(ROW);
    }
    //computed
    _height = computed(() => {
        if (this.height() === 'full') {
            let height = 0;
            height += 50; //Toolbar
            height += 50; //Page Title
            height += 35; //Container
            return `calc(100vh - ${height}px)`;
        }
        return this.height();
    }, ...(ngDevMode ? [{ debugName: "_height" }] : /* istanbul ignore next */ []));
    //Function
    CalculateHeight() {
        let ID = this._IdCalculated(-1, -1, 'header-container');
        let ELEMENT = HTMLElements.SelectElementById(ID);
        if (ELEMENT) {
            let height = 0;
            height += Number(HTMLElements.GetCssValue(ELEMENT, 'margin-bottom').split('px')[0]);
            height += Number(HTMLElements.GetHeight(ELEMENT).split('px')[0]);
            this._headerHeight.set(height);
        }
        ID = this._IdCalculated(-1, -1, 'footer-container');
        ELEMENT = HTMLElements.SelectElementById(ID);
        if (ELEMENT) {
            let height = 0;
            height += Number(HTMLElements.GetCssValue(ELEMENT, 'margin-bottom').split('px')[0]);
            height += Number(HTMLElements.GetHeight(ELEMENT).split('px')[0]);
            this._footerHeight.set(height);
        }
        //Compensation siblings
        let container = this.useContainer() ? 20 : 0;
        for (const sibling of this.siblings()) {
            if (Numbers.IsNumber(sibling)) {
                container += sibling;
            }
            else {
                container += Number(HTMLElements.GetCssValue(sibling, 'margin-top').split('px')[0]);
                container += Number(HTMLElements.GetCssValue(sibling, 'margin-bottom').split('px')[0]);
                container += Number(HTMLElements.GetHeight(sibling).split('px')[0]);
            }
        }
        this._containerHeight.set(container);
    }
    //Function
    _Import(value) {
        this.onClickImport.emit(value);
        if (value.autofill) {
            const SET = new Set(value.data.concat(this._value()).flatMap(item => Tools.GetPropertyList(item)));
            const DATA = value.data.concat(this._value()).map(item => ({
                ...item,
                ...Object.fromEntries([...SET].filter(x => !Tools.HasProperty(item, x)).map(property => [property, '']))
            }));
            this._SetValue(DATA);
        }
        this._isLoadingInner.set(false);
    }
    //Function
    _Add() {
        let row = null;
        if (!Tools.IsBooleanTrue(this.headerSettings().addButton?.preventDefault && Tools.IsOnlyWhiteSpace(this.headerSettings().addButton?.path))) {
            row = {};
            if (this._value().length > 0) {
                row = {
                    ...Object.fromEntries(Tools.GetPropertyList(this._value()[0]).map(property => [property, null]))
                };
            }
            else if (this.columns().length > 0) {
                row = {
                    ...Object.fromEntries([...this.columns()].map(column => [column.property, null]))
                };
            }
            const DATA_SOURCE = this.headerSettings().addButton?.addTo === 'start'
                ? [{ ...row, __checked__: false }].concat([...this._value()])
                : [...this._value()].concat([{ ...row, __checked__: false }]);
            if (Tools.GetPropertyList(row).length > 0) {
                this._SetValue(DATA_SOURCE);
                delete row['__index__'];
                delete row['__checked__'];
            }
            else
                row = null;
        }
        this.onClickAdd.emit(row);
    }
    /** */
    async Reorder(event) {
        const { from, to } = event;
        const DATA_SOURCE = [...this._value()];
        const FROM_DATA = { ...DATA_SOURCE[from] };
        DATA_SOURCE.splice(from, 1);
        DATA_SOURCE.splice(to, 0, FROM_DATA);
        this._SetValue(DATA_SOURCE);
        await Tools.Sleep();
        this.onReorder.emit([...DATA_SOURCE].map((item) => {
            delete item['__index__'];
            delete item['__checked__'];
            return item;
        }));
    }
    /** */
    Import() {
        this._header()?.Import();
    }
    ;
    /** */
    Export(fileName = '', exportFile = true) {
        this._header()?.Export(exportFile, fileName);
    }
    /** */
    CheckBy(callback) {
        this._body()?.CheckBy(callback);
    }
    /** */
    UncheckBy(callback) {
        this._body()?.UncheckBy(callback);
    }
    /** */
    FocusInput(indexRow = -1, indexColumn = -1, onlyFocus = false) {
        this._body()?.FocusInput(indexRow, indexColumn, onlyFocus);
    }
    /** */
    FocusLastInput(onlyFocus = false) {
        this._body()?.FocusLastInput(onlyFocus);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAGrid, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "21.2.17", type: WIAGrid, isStandalone: false, selector: "wia-grid", inputs: { columns: { classPropertyName: "columns", publicName: "columns", isSignal: true, isRequired: false, transformFunction: null }, headerSettings: { classPropertyName: "headerSettings", publicName: "headerSettings", isSignal: true, isRequired: false, transformFunction: null }, bodySettings: { classPropertyName: "bodySettings", publicName: "bodySettings", isSignal: true, isRequired: false, transformFunction: null }, footerSettings: { classPropertyName: "footerSettings", publicName: "footerSettings", isSignal: true, isRequired: false, transformFunction: null }, useContainer: { classPropertyName: "useContainer", publicName: "useContainer", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, minWidth: { classPropertyName: "minWidth", publicName: "minWidth", isSignal: true, isRequired: false, transformFunction: null }, maxWidth: { classPropertyName: "maxWidth", publicName: "maxWidth", isSignal: true, isRequired: false, transformFunction: null }, height: { classPropertyName: "height", publicName: "height", isSignal: true, isRequired: false, transformFunction: null }, minHeight: { classPropertyName: "minHeight", publicName: "minHeight", isSignal: true, isRequired: false, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: false, transformFunction: null }, siblings: { classPropertyName: "siblings", publicName: "siblings", isSignal: true, isRequired: false, transformFunction: null }, displayProperty: { classPropertyName: "displayProperty", publicName: "displayProperty", isSignal: true, isRequired: false, transformFunction: null }, isDraggable: { classPropertyName: "isDraggable", publicName: "isDraggable", isSignal: true, isRequired: false, transformFunction: null }, marginTop: { classPropertyName: "marginTop", publicName: "marginTop", isSignal: true, isRequired: false, transformFunction: null }, marginRight: { classPropertyName: "marginRight", publicName: "marginRight", isSignal: true, isRequired: false, transformFunction: null }, marginLeft: { classPropertyName: "marginLeft", publicName: "marginLeft", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onClickBack: "onClickBack", onClickCancel: "onClickCancel", onClickFilter: "onClickFilter", onClickExport: "onClickExport", onClickImport: "onClickImport", onClickAdd: "onClickAdd", onClickSave: "onClickSave", onKeyupEnter: "onKeyupEnter", onClickClear: "onClickClear", onClickSearch: "onClickSearch", onClickRow: "onClickRow", onDoubleClickRow: "onDoubleClickRow", onClickDeleteRow: "onClickDeleteRow", onClickEditRow: "onClickEditRow", onClickModalRow: "onClickModalRow", onClickNavigateRow: "onClickNavigateRow", onSelectedRow: "onSelectedRow", onInputChange: "onInputChange", onSort: "onSort", onReorder: "onReorder" }, providers: [CONTROL_VALUE(WIAGrid)], queries: [{ propertyName: "contentElements", predicate: TemplateRefDirective, isSignal: true }], viewQueries: [{ propertyName: "_header", first: true, predicate: ["header"], descendants: true, isSignal: true }, { propertyName: "_body", first: true, predicate: ["body"], descendants: true, isSignal: true }], usesInheritance: true, ngImport: i0, template: "<section \r\n    [ngClass]=\"{ 'coer-grid-container': useContainer(), 'invisible': isInvisible(), 'display-none': isHidden() }\" \r\n    [ngStyle]=\"{ 'margin-top': marginTop(), 'margin-right' : marginRight(), 'margin-bottom': marginBottom(), 'margin-left': marginLeft() }\">\r\n    \r\n    <div class=\"coer-grid\" [ngStyle]=\"{ 'width' : width(), 'min-width': minWidth(), 'max-width': maxWidth() }\">\r\n        <!-- Header -->\r\n        <wia-grid-header\r\n            #header\r\n            [label]=\"label()\"\r\n            [icon]=\"icon()\"\r\n            [IdCalculated]=\"_IdCalculated\" \r\n            [search]=\"_search\"\r\n            [isLoadingInner]=\"_isLoadingInner\"\r\n            [headerSettings]=\"headerSettings()\"\r\n            [isLoading]=\"isLoading()\"\r\n            [isEnabled]=\"_isEnabled()\"\r\n            [dataSourceExport]=\"_dataSourceExport()\"\r\n            [contentElements]=\"contentElements\"\r\n            (onClickBack)=\"onClickBack.emit()\"\r\n            (onClickCancel)=\"onClickCancel.emit()\"\r\n            (onClickFilter)=\"onClickFilter.emit()\"\r\n            (onClickExport)=\"onClickExport.emit($event)\"\r\n            (onClickImport)=\"_Import($event)\"\r\n            (onClickAdd)=\"_Add()\"\r\n            (onClickSave)=\"onClickSave.emit($event)\"\r\n            (onKeyupEnter)=\"onKeyupEnter.emit($event)\"\r\n            (onInputChange)=\"onInputChange.emit($event)\"\r\n            (onClickClear)=\"onClickClear.emit($event)\"\r\n            (onClickSearch)=\"onClickSearch.emit($event)\"\r\n            (onSearchChange)=\"body.LoadPages(_pagesLoaded())\">\r\n            <ng-content></ng-content>\r\n        </wia-grid-header>\r\n       \r\n        <!-- Body -->\r\n        <wia-grid-body\r\n            #body\r\n            [value]=\"_value()\"\r\n            [IdCalculated]=\"_IdCalculated\"\r\n            [ApplyFormat]=\"_ApplyFormat\"\r\n            [columns]=\"_columns()\"\r\n            [dataSourceGroup]=\"_dataSourceGroup()\"\r\n            [search]=\"_search()\"\r\n            [headerSettings]=\"headerSettings()\"\r\n            [bodySettings]=\"bodySettings()\"\r\n            [isLoadingInner]=\"_isLoadingInner\"\r\n            [isLoading]=\"isLoading()\"\r\n            [isEnabled]=\"_isEnabled()\"\r\n            [useContainer]=\"useContainer()\"\r\n            [displayProperty]=\"displayProperty()\"\r\n            [isDraggable]=\"isDraggable()\"\r\n            [height]=\"`calc(${_height()} - ${this._headerHeight()}px - ${this._footerHeight()}px - ${_containerHeight()}px)`\"\r\n            [minHeight]=\"`calc(${minHeight()} - ${this._headerHeight()}px - ${this._footerHeight()}px - ${_containerHeight()}px)`\"\r\n            [maxHeight]=\"`calc(${ maxHeight()} - ${this._headerHeight()}px - ${this._footerHeight()}px - ${_containerHeight()}px)`\"\r\n            [pagesLoaded]=\"_pagesLoaded()\"\r\n            (onClickRow)=\"onClickRow.emit($event)\"\r\n            (onDoubleClickRow)=\"onDoubleClickRow.emit($event)\"\r\n            (onClickDeleteRow)=\"_ClickDeleteRow($event)\"\r\n            (onClickEditRow)=\"onClickEditRow.emit($event)\"\r\n            (onClickModalRow)=\"onClickModalRow.emit($event)\"\r\n            (onClickNavigateRow)=\"onClickNavigateRow.emit($event)\"\r\n            (onSelectedRowChange)=\"_SetValue($event, true)\"\r\n            (onSelectedRow)=\"onSelectedRow.emit($event)\"\r\n            (onInputChange)=\"_SetValueInput($event)\"\r\n            (onKeyupEnter)=\"onKeyupEnter.emit($event)\"\r\n            (onUpdateType)=\"_SetValueInput($event, true)\"\r\n            (onSort)=\"_SetValue($event, true); onSort.emit($event);\"\r\n            (onReorder)=\"Reorder($event)\" \r\n            (onLoadPages)=\"_pagesLoaded.set($event)\"\r\n        ></wia-grid-body>\r\n        \r\n        <!-- Footer -->\r\n        <wia-grid-footer\r\n            [value]=\"_value()\"\r\n            [dataSourceSelected]=\"selectedValue()\"\r\n            [dataSourceFiltered]=\"_dataSourceFiltered()\"\r\n            [search]=\"_search()\"\r\n            [IdCalculated]=\"_IdCalculated\"\r\n            [footerSettings]=\"footerSettings()\"\r\n            [isLoadingInner]=\"_isLoadingInner\"\r\n            [isLoading]=\"isLoading()\"\r\n        ></wia-grid-footer>\r\n    </div>\r\n</section>", styles: ["section.coer-grid-container{animation-name:__KeyOpacity100!important;animation-iteration-count:1!important;animation-duration:1s!important;animation-direction:reverse!important;box-shadow:0 1px 12px -10px var(--dark)!important;background-color:var(--containers);min-height:var(--input-height);border-radius:8px;padding:10px}@media(min-width:0px)and (max-width:499px){section.coer-grid-container{margin:15px 15px 0!important}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: WIAGridBody, selector: "wia-grid-body", inputs: ["value", "IdCalculated", "ApplyFormat", "columns", "dataSourceGroup", "headerSettings", "bodySettings", "isLoadingInner", "isLoading", "isEnabled", "useContainer", "displayProperty", "isDraggable", "search", "height", "minHeight", "maxHeight", "pagesLoaded"], outputs: ["onClickRow", "onDoubleClickRow", "onClickDeleteRow", "onClickEditRow", "onClickModalRow", "onClickNavigateRow", "onSelectedRowChange", "onSelectedRow", "onInputChange", "onKeyupEnter", "onKeyupEnterLast", "onUpdateType", "onSort", "onReorder", "onLoadPages"] }, { kind: "component", type: WIAGridFooter, selector: "wia-grid-footer", inputs: ["value", "dataSourceSelected", "dataSourceFiltered", "search", "IdCalculated", "footerSettings", "isLoadingInner", "isLoading"] }, { kind: "component", type: WIAGridHeader, selector: "wia-grid-header", inputs: ["label", "icon", "IdCalculated", "search", "headerSettings", "isLoadingInner", "isLoading", "isEnabled", "dataSourceExport", "contentElements"], outputs: ["onClickBack", "onClickCancel", "onClickFilter", "onClickExport", "onClickImport", "onClickAdd", "onClickSave", "onSearchChange", "onKeyupEnter", "onInputChange", "onClickClear", "onClickSearch"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAGrid, decorators: [{
            type: Component,
            args: [{ selector: 'wia-grid', providers: [CONTROL_VALUE(WIAGrid)], standalone: false, template: "<section \r\n    [ngClass]=\"{ 'coer-grid-container': useContainer(), 'invisible': isInvisible(), 'display-none': isHidden() }\" \r\n    [ngStyle]=\"{ 'margin-top': marginTop(), 'margin-right' : marginRight(), 'margin-bottom': marginBottom(), 'margin-left': marginLeft() }\">\r\n    \r\n    <div class=\"coer-grid\" [ngStyle]=\"{ 'width' : width(), 'min-width': minWidth(), 'max-width': maxWidth() }\">\r\n        <!-- Header -->\r\n        <wia-grid-header\r\n            #header\r\n            [label]=\"label()\"\r\n            [icon]=\"icon()\"\r\n            [IdCalculated]=\"_IdCalculated\" \r\n            [search]=\"_search\"\r\n            [isLoadingInner]=\"_isLoadingInner\"\r\n            [headerSettings]=\"headerSettings()\"\r\n            [isLoading]=\"isLoading()\"\r\n            [isEnabled]=\"_isEnabled()\"\r\n            [dataSourceExport]=\"_dataSourceExport()\"\r\n            [contentElements]=\"contentElements\"\r\n            (onClickBack)=\"onClickBack.emit()\"\r\n            (onClickCancel)=\"onClickCancel.emit()\"\r\n            (onClickFilter)=\"onClickFilter.emit()\"\r\n            (onClickExport)=\"onClickExport.emit($event)\"\r\n            (onClickImport)=\"_Import($event)\"\r\n            (onClickAdd)=\"_Add()\"\r\n            (onClickSave)=\"onClickSave.emit($event)\"\r\n            (onKeyupEnter)=\"onKeyupEnter.emit($event)\"\r\n            (onInputChange)=\"onInputChange.emit($event)\"\r\n            (onClickClear)=\"onClickClear.emit($event)\"\r\n            (onClickSearch)=\"onClickSearch.emit($event)\"\r\n            (onSearchChange)=\"body.LoadPages(_pagesLoaded())\">\r\n            <ng-content></ng-content>\r\n        </wia-grid-header>\r\n       \r\n        <!-- Body -->\r\n        <wia-grid-body\r\n            #body\r\n            [value]=\"_value()\"\r\n            [IdCalculated]=\"_IdCalculated\"\r\n            [ApplyFormat]=\"_ApplyFormat\"\r\n            [columns]=\"_columns()\"\r\n            [dataSourceGroup]=\"_dataSourceGroup()\"\r\n            [search]=\"_search()\"\r\n            [headerSettings]=\"headerSettings()\"\r\n            [bodySettings]=\"bodySettings()\"\r\n            [isLoadingInner]=\"_isLoadingInner\"\r\n            [isLoading]=\"isLoading()\"\r\n            [isEnabled]=\"_isEnabled()\"\r\n            [useContainer]=\"useContainer()\"\r\n            [displayProperty]=\"displayProperty()\"\r\n            [isDraggable]=\"isDraggable()\"\r\n            [height]=\"`calc(${_height()} - ${this._headerHeight()}px - ${this._footerHeight()}px - ${_containerHeight()}px)`\"\r\n            [minHeight]=\"`calc(${minHeight()} - ${this._headerHeight()}px - ${this._footerHeight()}px - ${_containerHeight()}px)`\"\r\n            [maxHeight]=\"`calc(${ maxHeight()} - ${this._headerHeight()}px - ${this._footerHeight()}px - ${_containerHeight()}px)`\"\r\n            [pagesLoaded]=\"_pagesLoaded()\"\r\n            (onClickRow)=\"onClickRow.emit($event)\"\r\n            (onDoubleClickRow)=\"onDoubleClickRow.emit($event)\"\r\n            (onClickDeleteRow)=\"_ClickDeleteRow($event)\"\r\n            (onClickEditRow)=\"onClickEditRow.emit($event)\"\r\n            (onClickModalRow)=\"onClickModalRow.emit($event)\"\r\n            (onClickNavigateRow)=\"onClickNavigateRow.emit($event)\"\r\n            (onSelectedRowChange)=\"_SetValue($event, true)\"\r\n            (onSelectedRow)=\"onSelectedRow.emit($event)\"\r\n            (onInputChange)=\"_SetValueInput($event)\"\r\n            (onKeyupEnter)=\"onKeyupEnter.emit($event)\"\r\n            (onUpdateType)=\"_SetValueInput($event, true)\"\r\n            (onSort)=\"_SetValue($event, true); onSort.emit($event);\"\r\n            (onReorder)=\"Reorder($event)\" \r\n            (onLoadPages)=\"_pagesLoaded.set($event)\"\r\n        ></wia-grid-body>\r\n        \r\n        <!-- Footer -->\r\n        <wia-grid-footer\r\n            [value]=\"_value()\"\r\n            [dataSourceSelected]=\"selectedValue()\"\r\n            [dataSourceFiltered]=\"_dataSourceFiltered()\"\r\n            [search]=\"_search()\"\r\n            [IdCalculated]=\"_IdCalculated\"\r\n            [footerSettings]=\"footerSettings()\"\r\n            [isLoadingInner]=\"_isLoadingInner\"\r\n            [isLoading]=\"isLoading()\"\r\n        ></wia-grid-footer>\r\n    </div>\r\n</section>", styles: ["section.coer-grid-container{animation-name:__KeyOpacity100!important;animation-iteration-count:1!important;animation-duration:1s!important;animation-direction:reverse!important;box-shadow:0 1px 12px -10px var(--dark)!important;background-color:var(--containers);min-height:var(--input-height);border-radius:8px;padding:10px}@media(min-width:0px)and (max-width:499px){section.coer-grid-container{margin:15px 15px 0!important}}\n"] }]
        }], propDecorators: { contentElements: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => TemplateRefDirective), { isSignal: true }] }], _header: [{ type: i0.ViewChild, args: ['header', { isSignal: true }] }], _body: [{ type: i0.ViewChild, args: ['body', { isSignal: true }] }], columns: [{ type: i0.Input, args: [{ isSignal: true, alias: "columns", required: false }] }], headerSettings: [{ type: i0.Input, args: [{ isSignal: true, alias: "headerSettings", required: false }] }], bodySettings: [{ type: i0.Input, args: [{ isSignal: true, alias: "bodySettings", required: false }] }], footerSettings: [{ type: i0.Input, args: [{ isSignal: true, alias: "footerSettings", required: false }] }], useContainer: [{ type: i0.Input, args: [{ isSignal: true, alias: "useContainer", required: false }] }], icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: false }] }], width: [{ type: i0.Input, args: [{ isSignal: true, alias: "width", required: false }] }], minWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "minWidth", required: false }] }], maxWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxWidth", required: false }] }], height: [{ type: i0.Input, args: [{ isSignal: true, alias: "height", required: false }] }], minHeight: [{ type: i0.Input, args: [{ isSignal: true, alias: "minHeight", required: false }] }], maxHeight: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxHeight", required: false }] }], siblings: [{ type: i0.Input, args: [{ isSignal: true, alias: "siblings", required: false }] }], displayProperty: [{ type: i0.Input, args: [{ isSignal: true, alias: "displayProperty", required: false }] }], isDraggable: [{ type: i0.Input, args: [{ isSignal: true, alias: "isDraggable", required: false }] }], marginTop: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginTop", required: false }] }], marginRight: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginRight", required: false }] }], marginLeft: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginLeft", required: false }] }], onClickBack: [{ type: i0.Output, args: ["onClickBack"] }], onClickCancel: [{ type: i0.Output, args: ["onClickCancel"] }], onClickFilter: [{ type: i0.Output, args: ["onClickFilter"] }], onClickExport: [{ type: i0.Output, args: ["onClickExport"] }], onClickImport: [{ type: i0.Output, args: ["onClickImport"] }], onClickAdd: [{ type: i0.Output, args: ["onClickAdd"] }], onClickSave: [{ type: i0.Output, args: ["onClickSave"] }], onKeyupEnter: [{ type: i0.Output, args: ["onKeyupEnter"] }], onClickClear: [{ type: i0.Output, args: ["onClickClear"] }], onClickSearch: [{ type: i0.Output, args: ["onClickSearch"] }], onClickRow: [{ type: i0.Output, args: ["onClickRow"] }], onDoubleClickRow: [{ type: i0.Output, args: ["onDoubleClickRow"] }], onClickDeleteRow: [{ type: i0.Output, args: ["onClickDeleteRow"] }], onClickEditRow: [{ type: i0.Output, args: ["onClickEditRow"] }], onClickModalRow: [{ type: i0.Output, args: ["onClickModalRow"] }], onClickNavigateRow: [{ type: i0.Output, args: ["onClickNavigateRow"] }], onSelectedRow: [{ type: i0.Output, args: ["onSelectedRow"] }], onInputChange: [{ type: i0.Output, args: ["onInputChange"] }], onSort: [{ type: i0.Output, args: ["onSort"] }], onReorder: [{ type: i0.Output, args: ["onReorder"] }] } });

class WIAModal {
    //Content 
    contentElements = contentChildren(TemplateRefDirective, ...(ngDevMode ? [{ debugName: "contentElements" }] : /* istanbul ignore next */ []));
    //Variables
    _id = Tools.GetGuid("coer-modal");
    _showBackdrop = signal(false, ...(ngDevMode ? [{ debugName: "_showBackdrop" }] : /* istanbul ignore next */ []));
    _showContent = signal(false, ...(ngDevMode ? [{ debugName: "_showContent" }] : /* istanbul ignore next */ []));
    _htmlElement;
    //input  
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    icon = input('', ...(ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []));
    showCancelButton = input(true, ...(ngDevMode ? [{ debugName: "showCancelButton" }] : /* istanbul ignore next */ []));
    alignX = input('center', ...(ngDevMode ? [{ debugName: "alignX" }] : /* istanbul ignore next */ []));
    alignY = input('top', ...(ngDevMode ? [{ debugName: "alignY" }] : /* istanbul ignore next */ []));
    width = input('fit-content', ...(ngDevMode ? [{ debugName: "width" }] : /* istanbul ignore next */ []));
    maxWidth = input('100vw', ...(ngDevMode ? [{ debugName: "maxWidth" }] : /* istanbul ignore next */ []));
    height = input('auto', ...(ngDevMode ? [{ debugName: "height" }] : /* istanbul ignore next */ []));
    //output 
    onOpen = output();
    onClose = output();
    onDestroy = output();
    onReady = output();
    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep();
        this._htmlElement = HTMLElements.SelectElementById(this._id);
        this.onReady?.emit();
    }
    //OnDestroy
    ngOnDestroy() {
        this.onReady = null;
        this.onDestroy.emit();
    }
    //Computed
    _alignY = computed(() => {
        switch (this.alignY()) {
            case 'top': return 'flex-start';
            case 'bottom': return 'flex-end';
            default: return 'center';
        }
    }, ...(ngDevMode ? [{ debugName: "_alignY" }] : /* istanbul ignore next */ []));
    //Computed
    _alignX = computed(() => {
        switch (this.alignX()) {
            case 'left': return 'flex-start';
            case 'right': return 'flex-end';
            default: return 'center';
        }
    }, ...(ngDevMode ? [{ debugName: "_alignX" }] : /* istanbul ignore next */ []));
    //Computed
    _showHeader = computed(() => {
        return Tools.IsNotOnlyWhiteSpace(this.title())
            || Tools.IsNotOnlyWhiteSpace(this.icon())
            || this.showCancelButton();
    }, ...(ngDevMode ? [{ debugName: "_showHeader" }] : /* istanbul ignore next */ []));
    //Computed
    _modalBody = computed(() => {
        return this.contentElements().find(x => Strings.Equals(x.templateRef(), 'modal-body')) || null;
    }, ...(ngDevMode ? [{ debugName: "_modalBody" }] : /* istanbul ignore next */ []));
    //Computed
    _modalFooter = computed(() => {
        return this.contentElements().find(x => Strings.Equals(x.templateRef(), 'modal-footer')) || null;
    }, ...(ngDevMode ? [{ debugName: "_modalFooter" }] : /* istanbul ignore next */ []));
    //Computed
    _showFooter = computed(() => {
        return Tools.IsNotNull(this._modalFooter()?.template) && this._modalFooter()?.show();
    }, ...(ngDevMode ? [{ debugName: "_showFooter" }] : /* istanbul ignore next */ []));
    //Computed
    _gridTemplateRows = computed(() => Strings.CleanUpBlanks(`${(this._showHeader() ? '40px' : '')} 1fr ${(this._showFooter() ? '50px' : '')}`), ...(ngDevMode ? [{ debugName: "_gridTemplateRows" }] : /* istanbul ignore next */ []));
    //Computed
    _margin = computed(() => {
        const BREAKPOINT = screenSizeSIGNAL().breakpoint;
        let top = '0px';
        let right = '0px';
        let bottom = '0px';
        let left = '0px';
        switch (this.alignY()) {
            case 'top':
                top = '40px';
                break;
            case 'bottom':
                bottom = '40px';
                break;
        }
        switch (this.alignX()) {
            case 'left':
                left = '40px';
                break;
            case 'right':
                right = '40px';
                break;
        }
        return ['mv', 'xs', 'sm'].includes(BREAKPOINT) ? '10px' : `${top} ${right} ${bottom} ${left}`;
    }, ...(ngDevMode ? [{ debugName: "_margin" }] : /* istanbul ignore next */ []));
    //Computed
    _width = computed(() => {
        return `calc(${this.width()} - 20px)`;
    }, ...(ngDevMode ? [{ debugName: "_width" }] : /* istanbul ignore next */ []));
    //Computed
    _maxWidth = computed(() => {
        return `calc(${this.maxWidth()} - 20px)`;
    }, ...(ngDevMode ? [{ debugName: "_maxWidth" }] : /* istanbul ignore next */ []));
    //Function
    async _clickBackdrop(event) {
        event.stopPropagation();
        HTMLElements.AddClass(`#${this._id}-content`, 'animation-beat-modal');
        await Tools.Sleep(1000, 'animation-beat-modal');
        HTMLElements.RemoveClass(`#${this._id}-content`, 'animation-beat-modal');
    }
    /** */
    async Close() {
        if (this._showContent() === true) {
            this._showContent.set(false);
            await Tools.Sleep(500);
            this._showBackdrop.set(false);
            this.onClose.emit();
        }
    }
    /** */
    async Open() {
        if (this._showContent() === false) {
            this._showBackdrop.set(true);
            await Tools.Sleep(100);
            this._showContent.set(true);
            await Tools.Sleep(500);
            this.onOpen.emit();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIAModal, isStandalone: false, selector: "wia-modal", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, showCancelButton: { classPropertyName: "showCancelButton", publicName: "showCancelButton", isSignal: true, isRequired: false, transformFunction: null }, alignX: { classPropertyName: "alignX", publicName: "alignX", isSignal: true, isRequired: false, transformFunction: null }, alignY: { classPropertyName: "alignY", publicName: "alignY", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, maxWidth: { classPropertyName: "maxWidth", publicName: "maxWidth", isSignal: true, isRequired: false, transformFunction: null }, height: { classPropertyName: "height", publicName: "height", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onOpen: "onOpen", onClose: "onClose", onDestroy: "onDestroy", onReady: "onReady" }, queries: [{ propertyName: "contentElements", predicate: TemplateRefDirective, isSignal: true }], ngImport: i0, template: "<aside title=\"\" \r\n    (click)=\"_clickBackdrop($event)\"\r\n    class=\"coer-modal backdrop\" \r\n    [style]=\"{ \r\n        'display': (_showBackdrop() ? 'flex' : 'none'),\r\n        'align-items': _alignY(), \r\n        'justify-content': _alignX() \r\n    }\">\r\n    <div [id]=\"`${_id}-content`\"\r\n        class=\"coer-modal-content\"\r\n        (click)=\"$event.stopPropagation()\"\r\n        [ngStyle]=\"{ \r\n            'transform': (_showContent() ? 'scale(1.0)' : 'scale(0)'),\r\n            'grid-template-rows': _gridTemplateRows(), \r\n            'margin'   : _margin(),  \r\n            'width'    : _width(), \r\n            'max-width': _maxWidth()\r\n        }\">\r\n\r\n        @if(_showHeader()) {\r\n            <header> \r\n                <h3>\r\n                    @if(icon().length > 3) {\r\n                        <i [class]=\"icon()\"></i>\r\n                    }\r\n                    <span> {{ title() || '' }} </span>\r\n                </h3>\r\n\r\n                @if(showCancelButton()) {\r\n                    <wia-button\r\n                        type=\"icon-rounded\"\r\n                        icon=\"iw-mark font-size-25px\"\r\n                        color=\"secondary\"\r\n                        minWidth=\"25px\"\r\n                        maxWidth=\"25px\"\r\n                        minHeight=\"25px\"\r\n                        maxHeight=\"25px\"\r\n                        (onClick)=\"Close()\"\r\n                    ></wia-button>\r\n                }\r\n            </header>\r\n        }\r\n             \r\n        <section [ngStyle]=\"{ \r\n            'width'     : _width(), \r\n            'max-width' : _maxWidth(),\r\n            'height'    : height() \r\n        }\"> \r\n            @if(_modalBody()?.template && _modalBody()?.show()) {\r\n                <ng-container [ngTemplateOutlet]=\"_modalBody().template\"></ng-container>\r\n            }\r\n    \r\n            @else {\r\n                <ng-content></ng-content>\r\n            }\r\n        </section>\r\n\r\n        @if(_showFooter()) { \r\n            <footer [ngStyle]=\"{ 'width': _width(), 'max-width': _maxWidth() }\">\r\n                <ng-container [ngTemplateOutlet]=\"_modalFooter().template\"></ng-container>\r\n            </footer>\r\n        }\r\n    </div>\r\n</aside>", styles: ["aside.coer-modal.backdrop{z-index:var(--z-index-modal)!important;overflow:auto!important;position:fixed!important}aside.coer-modal.backdrop div.coer-modal-content{display:grid!important;min-width:300px!important;min-height:100px!important;background-color:var(--light)!important;border-radius:10px!important;transition:all .5s ease-in-out!important}aside.coer-modal.backdrop div.coer-modal-content header{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:10px!important;border-radius:10px 10px 0 0!important;border-bottom:1px solid var(--input)!important;padding:0 10px!important;overflow:hidden!important}aside.coer-modal.backdrop div.coer-modal-content header h3{max-width:calc(100% - 26px)!important;display:inherit!important;align-items:inherit!important;gap:inherit!important}aside.coer-modal.backdrop div.coer-modal-content header h3 i{min-width:20px!important;min-height:20px!important}aside.coer-modal.backdrop div.coer-modal-content header h3 span{overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}aside.coer-modal.backdrop div.coer-modal-content section{padding:0 10px!important;min-height:40px!important;word-break:break-all!important;white-space:pre-wrap!important;overflow:visible}aside.coer-modal.backdrop div.coer-modal-content footer{display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:10px!important;border-radius:0 0 10px 10px!important;padding:0 10px!important}aside.coer-modal.backdrop .animation-beat-modal{animation-name:__KeyScale1!important;animation-iteration-count:2!important;animation-direction:alternate!important;animation-timing-function:linear!important;animation-duration:.1s}\n"], dependencies: [{ kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: WIAButton, selector: "wia-button", inputs: ["label", "type", "color", "icon", "path", "iconPosition", "isLoading", "isReadonly", "isInvisible", "isHidden", "breakpoints", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "marginTop", "marginRight", "marginBottom", "marginLeft"], outputs: ["onClick", "onDestroy", "onReady"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAModal, decorators: [{
            type: Component,
            args: [{ selector: 'wia-modal', standalone: false, template: "<aside title=\"\" \r\n    (click)=\"_clickBackdrop($event)\"\r\n    class=\"coer-modal backdrop\" \r\n    [style]=\"{ \r\n        'display': (_showBackdrop() ? 'flex' : 'none'),\r\n        'align-items': _alignY(), \r\n        'justify-content': _alignX() \r\n    }\">\r\n    <div [id]=\"`${_id}-content`\"\r\n        class=\"coer-modal-content\"\r\n        (click)=\"$event.stopPropagation()\"\r\n        [ngStyle]=\"{ \r\n            'transform': (_showContent() ? 'scale(1.0)' : 'scale(0)'),\r\n            'grid-template-rows': _gridTemplateRows(), \r\n            'margin'   : _margin(),  \r\n            'width'    : _width(), \r\n            'max-width': _maxWidth()\r\n        }\">\r\n\r\n        @if(_showHeader()) {\r\n            <header> \r\n                <h3>\r\n                    @if(icon().length > 3) {\r\n                        <i [class]=\"icon()\"></i>\r\n                    }\r\n                    <span> {{ title() || '' }} </span>\r\n                </h3>\r\n\r\n                @if(showCancelButton()) {\r\n                    <wia-button\r\n                        type=\"icon-rounded\"\r\n                        icon=\"iw-mark font-size-25px\"\r\n                        color=\"secondary\"\r\n                        minWidth=\"25px\"\r\n                        maxWidth=\"25px\"\r\n                        minHeight=\"25px\"\r\n                        maxHeight=\"25px\"\r\n                        (onClick)=\"Close()\"\r\n                    ></wia-button>\r\n                }\r\n            </header>\r\n        }\r\n             \r\n        <section [ngStyle]=\"{ \r\n            'width'     : _width(), \r\n            'max-width' : _maxWidth(),\r\n            'height'    : height() \r\n        }\"> \r\n            @if(_modalBody()?.template && _modalBody()?.show()) {\r\n                <ng-container [ngTemplateOutlet]=\"_modalBody().template\"></ng-container>\r\n            }\r\n    \r\n            @else {\r\n                <ng-content></ng-content>\r\n            }\r\n        </section>\r\n\r\n        @if(_showFooter()) { \r\n            <footer [ngStyle]=\"{ 'width': _width(), 'max-width': _maxWidth() }\">\r\n                <ng-container [ngTemplateOutlet]=\"_modalFooter().template\"></ng-container>\r\n            </footer>\r\n        }\r\n    </div>\r\n</aside>", styles: ["aside.coer-modal.backdrop{z-index:var(--z-index-modal)!important;overflow:auto!important;position:fixed!important}aside.coer-modal.backdrop div.coer-modal-content{display:grid!important;min-width:300px!important;min-height:100px!important;background-color:var(--light)!important;border-radius:10px!important;transition:all .5s ease-in-out!important}aside.coer-modal.backdrop div.coer-modal-content header{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:10px!important;border-radius:10px 10px 0 0!important;border-bottom:1px solid var(--input)!important;padding:0 10px!important;overflow:hidden!important}aside.coer-modal.backdrop div.coer-modal-content header h3{max-width:calc(100% - 26px)!important;display:inherit!important;align-items:inherit!important;gap:inherit!important}aside.coer-modal.backdrop div.coer-modal-content header h3 i{min-width:20px!important;min-height:20px!important}aside.coer-modal.backdrop div.coer-modal-content header h3 span{overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}aside.coer-modal.backdrop div.coer-modal-content section{padding:0 10px!important;min-height:40px!important;word-break:break-all!important;white-space:pre-wrap!important;overflow:visible}aside.coer-modal.backdrop div.coer-modal-content footer{display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:10px!important;border-radius:0 0 10px 10px!important;padding:0 10px!important}aside.coer-modal.backdrop .animation-beat-modal{animation-name:__KeyScale1!important;animation-iteration-count:2!important;animation-direction:alternate!important;animation-timing-function:linear!important;animation-duration:.1s}\n"] }]
        }], propDecorators: { contentElements: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => TemplateRefDirective), { isSignal: true }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: false }] }], showCancelButton: [{ type: i0.Input, args: [{ isSignal: true, alias: "showCancelButton", required: false }] }], alignX: [{ type: i0.Input, args: [{ isSignal: true, alias: "alignX", required: false }] }], alignY: [{ type: i0.Input, args: [{ isSignal: true, alias: "alignY", required: false }] }], width: [{ type: i0.Input, args: [{ isSignal: true, alias: "width", required: false }] }], maxWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxWidth", required: false }] }], height: [{ type: i0.Input, args: [{ isSignal: true, alias: "height", required: false }] }], onOpen: [{ type: i0.Output, args: ["onOpen"] }], onClose: [{ type: i0.Output, args: ["onClose"] }], onDestroy: [{ type: i0.Output, args: ["onDestroy"] }], onReady: [{ type: i0.Output, args: ["onReady"] }] } });

class WIAPageTitle {
    //Variables
    _isLoading = isLoadingSIGNAL;
    _iconRoot = signal('iw-house-door-fill', ...(ngDevMode ? [{ debugName: "_iconRoot" }] : /* istanbul ignore next */ []));
    _labelRoot = signal(null, ...(ngDevMode ? [{ debugName: "_labelRoot" }] : /* istanbul ignore next */ []));
    //Inputs 
    title = input(null, ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    showBreadcrumbs = input(true, ...(ngDevMode ? [{ debugName: "showBreadcrumbs" }] : /* istanbul ignore next */ []));
    breadcrumbs = input([], ...(ngDevMode ? [{ debugName: "breadcrumbs" }] : /* istanbul ignore next */ []));
    goBack = input({ show: false }, ...(ngDevMode ? [{ debugName: "goBack" }] : /* istanbul ignore next */ []));
    information = input({ show: false }, ...(ngDevMode ? [{ debugName: "information" }] : /* istanbul ignore next */ []));
    //Outputs 
    onClickInformation = output();
    onClickGoBack = output();
    //Constructor
    constructor() {
        this._GetSelectedMenu();
    }
    /** */
    async _GetSelectedMenu() {
        let counter = 10;
        do {
            const MENU = Navigation.GetSelectedMenu();
            if (MENU) {
                const MENU_SELECTED = MENU.tree.shift();
                if (Tools.IsNotNull(MENU_SELECTED)) {
                    if (Tools.IsNotOnlyWhiteSpace(MENU_SELECTED.icon)) {
                        this._iconRoot.set(MENU_SELECTED.icon);
                    }
                    else if (Tools.IsNotOnlyWhiteSpace(MENU_SELECTED.label)) {
                        this._labelRoot.set(MENU_SELECTED.label);
                    }
                }
                break;
            }
            counter--;
            await Tools.Sleep(250);
        } while (counter > 0);
    }
    //computed
    _breadcrumbs = computed(() => Collections.SetIndex(this.breadcrumbs().slice(-(screenSizeSIGNAL().breakpoint == 'mv' ? 2 : this.breadcrumbs().length))), ...(ngDevMode ? [{ debugName: "_breadcrumbs" }] : /* istanbul ignore next */ []));
    /** */
    _ClickGoBack() {
        if (Tools.IsFunction(this.goBack().click)) {
            this.goBack().click();
        }
        this.onClickGoBack.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAPageTitle, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIAPageTitle, isStandalone: false, selector: "wia-page-title", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, showBreadcrumbs: { classPropertyName: "showBreadcrumbs", publicName: "showBreadcrumbs", isSignal: true, isRequired: false, transformFunction: null }, breadcrumbs: { classPropertyName: "breadcrumbs", publicName: "breadcrumbs", isSignal: true, isRequired: false, transformFunction: null }, goBack: { classPropertyName: "goBack", publicName: "goBack", isSignal: true, isRequired: false, transformFunction: null }, information: { classPropertyName: "information", publicName: "information", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onClickInformation: "onClickInformation", onClickGoBack: "onClickGoBack" }, ngImport: i0, template: "<header class=\"coer-page-title\" title=''>\r\n    @if((title() && title()!.length > 0) || information().show) {\r\n        <h2>\r\n            <span> {{ title() }} </span>\r\n    \r\n            <!-- Button Information -->\r\n            @if(information().show) {\r\n                <wia-button\r\n                    type=\"icon-rounded\"\r\n                    icon=\"iw-info-circle font-size-17px\" \r\n                    minWidth=\"17px\"\r\n                    maxWidth=\"17px\"\r\n                    minHeight=\"17px\"\r\n                    maxHeight=\"17px\"\r\n                    (onClick)=\"onClickInformation.emit()\"\r\n                ></wia-button>\r\n            }\r\n        </h2>\r\n    }\r\n\r\n    <!-- Navigation -->\r\n    @if(showBreadcrumbs()) {\r\n        <nav>    \r\n            <!-- Breadcrumbs -->\r\n            <div class=\"breadcrumbs\">  \r\n                <a class=\"padding-left-5px padding-rigth-5px\" draggable=\"false\">\r\n                    @if(_labelRoot()) {\r\n                        {{ _labelRoot() }}\r\n                    }\r\n\r\n                    @else {\r\n                        <i [class]=\"_iconRoot()\"></i>\r\n                    }\r\n                </a>\r\n\r\n                @for(breadcrumb of _breadcrumbs(); track breadcrumb.__index__) {\r\n                    <span class=\"slash\">/</span>\r\n                    <a [routerLink]='(breadcrumb.path && breadcrumb.path.length > 0 && !_isLoading()) ? breadcrumb.path : null'\r\n                       [queryParams]='breadcrumb.queryParams' \r\n                       (click)=\"(breadcrumb.click && !_isLoading()) ? breadcrumb.click() : null\"\r\n                       draggable=\"false\">\r\n                       {{ breadcrumb.page }}\r\n                   </a>\r\n                }    \r\n            </div> \r\n\r\n            <!-- Go Back -->\r\n            @if(goBack().show) {\r\n                <a  class=\"go-back\"\r\n                    [routerLink]=\"!_isLoading() ? goBack().path : null\"\r\n                    [queryParams]='goBack().queryParams'\r\n                    (click)=\"_ClickGoBack()\"\r\n                    draggable=\"false\">\r\n                    <i class=\"iw-reply font-size-20px\"></i>\r\n                </a> \r\n            }\r\n        </nav>\r\n    }\r\n</header> ", styles: ["header.coer-page-title{max-height:50px!important;margin:10px 30px 0!important;overflow:visible!important}header.coer-page-title h2{display:flex!important;align-items:center!important;justify-content:space-between!important;height:25px!important;font-size:20px!important;margin-bottom:5px!important;padding:0 5px 0 0!important}header.coer-page-title h2 span{font-size:20px!important}header.coer-page-title h2 button{font-size:17px!important;display:flex!important;align-items:center!important;justify-content:center!important;color:var(--breadcrumbs)!important;background-color:transparent!important;padding:0!important;width:25px!important;height:25px!important;border:none!important}header.coer-page-title h2 button:focus{box-shadow:0 0 20px!important}header.coer-page-title nav{height:auto!important;min-height:20px!important;max-height:20px!important;font-size:small!important;background-color:color-mix(in srgb,var(--gray),var(--light) 90%)!important;display:flex!important;align-items:center!important;justify-content:space-between!important;border-radius:3px!important;overflow:hidden!important}header.coer-page-title nav div.breadcrumbs{display:flex!important;flex-wrap:nowrap!important;align-items:center!important;flex-grow:1!important;color:var(--breadcrumbs)!important;max-width:calc(100% - 50px)!important;overflow:auto!important;text-overflow:ellipsis}header.coer-page-title nav div.breadcrumbs span.slash{font-size:14px!important;padding:0 5px!important;font-weight:600!important}header.coer-page-title nav div.breadcrumbs span:first-child{padding-left:0!important}header.coer-page-title nav a{margin:0!important;display:flex!important;justify-content:center!important;text-decoration:none!important;color:var(--breadcrumbs)!important;font-size:14px!important;font-weight:600!important;cursor:pointer!important}header.coer-page-title nav a.go-back{margin-left:10px!important;justify-content:flex-end!important}header.coer-page-title li{border:none}\n"], dependencies: [{ kind: "directive", type: i2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: WIAButton, selector: "wia-button", inputs: ["label", "type", "color", "icon", "path", "iconPosition", "isLoading", "isReadonly", "isInvisible", "isHidden", "breakpoints", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "marginTop", "marginRight", "marginBottom", "marginLeft"], outputs: ["onClick", "onDestroy", "onReady"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIAPageTitle, decorators: [{
            type: Component,
            args: [{ selector: 'wia-page-title', standalone: false, template: "<header class=\"coer-page-title\" title=''>\r\n    @if((title() && title()!.length > 0) || information().show) {\r\n        <h2>\r\n            <span> {{ title() }} </span>\r\n    \r\n            <!-- Button Information -->\r\n            @if(information().show) {\r\n                <wia-button\r\n                    type=\"icon-rounded\"\r\n                    icon=\"iw-info-circle font-size-17px\" \r\n                    minWidth=\"17px\"\r\n                    maxWidth=\"17px\"\r\n                    minHeight=\"17px\"\r\n                    maxHeight=\"17px\"\r\n                    (onClick)=\"onClickInformation.emit()\"\r\n                ></wia-button>\r\n            }\r\n        </h2>\r\n    }\r\n\r\n    <!-- Navigation -->\r\n    @if(showBreadcrumbs()) {\r\n        <nav>    \r\n            <!-- Breadcrumbs -->\r\n            <div class=\"breadcrumbs\">  \r\n                <a class=\"padding-left-5px padding-rigth-5px\" draggable=\"false\">\r\n                    @if(_labelRoot()) {\r\n                        {{ _labelRoot() }}\r\n                    }\r\n\r\n                    @else {\r\n                        <i [class]=\"_iconRoot()\"></i>\r\n                    }\r\n                </a>\r\n\r\n                @for(breadcrumb of _breadcrumbs(); track breadcrumb.__index__) {\r\n                    <span class=\"slash\">/</span>\r\n                    <a [routerLink]='(breadcrumb.path && breadcrumb.path.length > 0 && !_isLoading()) ? breadcrumb.path : null'\r\n                       [queryParams]='breadcrumb.queryParams' \r\n                       (click)=\"(breadcrumb.click && !_isLoading()) ? breadcrumb.click() : null\"\r\n                       draggable=\"false\">\r\n                       {{ breadcrumb.page }}\r\n                   </a>\r\n                }    \r\n            </div> \r\n\r\n            <!-- Go Back -->\r\n            @if(goBack().show) {\r\n                <a  class=\"go-back\"\r\n                    [routerLink]=\"!_isLoading() ? goBack().path : null\"\r\n                    [queryParams]='goBack().queryParams'\r\n                    (click)=\"_ClickGoBack()\"\r\n                    draggable=\"false\">\r\n                    <i class=\"iw-reply font-size-20px\"></i>\r\n                </a> \r\n            }\r\n        </nav>\r\n    }\r\n</header> ", styles: ["header.coer-page-title{max-height:50px!important;margin:10px 30px 0!important;overflow:visible!important}header.coer-page-title h2{display:flex!important;align-items:center!important;justify-content:space-between!important;height:25px!important;font-size:20px!important;margin-bottom:5px!important;padding:0 5px 0 0!important}header.coer-page-title h2 span{font-size:20px!important}header.coer-page-title h2 button{font-size:17px!important;display:flex!important;align-items:center!important;justify-content:center!important;color:var(--breadcrumbs)!important;background-color:transparent!important;padding:0!important;width:25px!important;height:25px!important;border:none!important}header.coer-page-title h2 button:focus{box-shadow:0 0 20px!important}header.coer-page-title nav{height:auto!important;min-height:20px!important;max-height:20px!important;font-size:small!important;background-color:color-mix(in srgb,var(--gray),var(--light) 90%)!important;display:flex!important;align-items:center!important;justify-content:space-between!important;border-radius:3px!important;overflow:hidden!important}header.coer-page-title nav div.breadcrumbs{display:flex!important;flex-wrap:nowrap!important;align-items:center!important;flex-grow:1!important;color:var(--breadcrumbs)!important;max-width:calc(100% - 50px)!important;overflow:auto!important;text-overflow:ellipsis}header.coer-page-title nav div.breadcrumbs span.slash{font-size:14px!important;padding:0 5px!important;font-weight:600!important}header.coer-page-title nav div.breadcrumbs span:first-child{padding-left:0!important}header.coer-page-title nav a{margin:0!important;display:flex!important;justify-content:center!important;text-decoration:none!important;color:var(--breadcrumbs)!important;font-size:14px!important;font-weight:600!important;cursor:pointer!important}header.coer-page-title nav a.go-back{margin-left:10px!important;justify-content:flex-end!important}header.coer-page-title li{border:none}\n"] }]
        }], ctorParameters: () => [], propDecorators: { title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], showBreadcrumbs: [{ type: i0.Input, args: [{ isSignal: true, alias: "showBreadcrumbs", required: false }] }], breadcrumbs: [{ type: i0.Input, args: [{ isSignal: true, alias: "breadcrumbs", required: false }] }], goBack: [{ type: i0.Input, args: [{ isSignal: true, alias: "goBack", required: false }] }], information: [{ type: i0.Input, args: [{ isSignal: true, alias: "information", required: false }] }], onClickInformation: [{ type: i0.Output, args: ["onClickInformation"] }], onClickGoBack: [{ type: i0.Output, args: ["onClickGoBack"] }] } });

class WIARadio extends ControlValue {
    //Variables     
    _value = signal(null, ...(ngDevMode ? [{ debugName: "_value" }] : /* istanbul ignore next */ []));
    //input
    value = input(null, ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    dataSource = input([], ...(ngDevMode ? [{ debugName: "dataSource" }] : /* istanbul ignore next */ []));
    position = input('vertical', ...(ngDevMode ? [{ debugName: "position" }] : /* istanbul ignore next */ []));
    labelPosition = input('right', ...(ngDevMode ? [{ debugName: "labelPosition" }] : /* istanbul ignore next */ []));
    breakLabel = input(false, ...(ngDevMode ? [{ debugName: "breakLabel" }] : /* istanbul ignore next */ []));
    showBackround = input(false, ...(ngDevMode ? [{ debugName: "showBackround" }] : /* istanbul ignore next */ []));
    width = input('fit-content', ...(ngDevMode ? [{ debugName: "width" }] : /* istanbul ignore next */ []));
    maxWidth = input('250px', ...(ngDevMode ? [{ debugName: "maxWidth" }] : /* istanbul ignore next */ []));
    //Computed
    _dataSource = computed(() => Collections.SetIndex(this.dataSource()), ...(ngDevMode ? [{ debugName: "_dataSource" }] : /* istanbul ignore next */ []));
    /** Sets the value of the component */
    _SetValue(option) {
        const RADIO = this._dataSource().find(x => x.Label === option?.Label) || null;
        Tools.Sleep(100, `SetValue${this._id}`).then(() => {
            if (this._useModelBinding()) {
                this._UpdateValue()(RADIO);
            }
            if (!this.isLoading())
                this.onValueChange.emit(RADIO);
            this._value.set(RADIO);
            HTMLElements.SelectAllElements(`input[name=${this._id}]`).forEach((element) => {
                element.checked = (`${element.value}` === `${RADIO?.__index__}`);
            });
        });
    }
    //'white-space-nowrap': breakLabel() 
    _ClickOption(index) {
        if (Tools.IsNotOnlyWhiteSpace(index) && index >= 0) {
            this._SetValue(this._dataSource()[index] || null);
        }
        else
            this._SetValue(null);
    }
    /** */
    Select(callback) {
        const option = this._dataSource().find(callback);
        this._SetValue(option || null);
    }
    /** */
    Unselect() {
        this._SetValue(null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIARadio, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIARadio, isStandalone: false, selector: "wia-radio", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, dataSource: { classPropertyName: "dataSource", publicName: "dataSource", isSignal: true, isRequired: false, transformFunction: null }, position: { classPropertyName: "position", publicName: "position", isSignal: true, isRequired: false, transformFunction: null }, labelPosition: { classPropertyName: "labelPosition", publicName: "labelPosition", isSignal: true, isRequired: false, transformFunction: null }, breakLabel: { classPropertyName: "breakLabel", publicName: "breakLabel", isSignal: true, isRequired: false, transformFunction: null }, showBackround: { classPropertyName: "showBackround", publicName: "showBackround", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, maxWidth: { classPropertyName: "maxWidth", publicName: "maxWidth", isSignal: true, isRequired: false, transformFunction: null } }, providers: [CONTROL_VALUE(WIARadio)], usesInheritance: true, ngImport: i0, template: "<div class=\"wia-radio animation-fadeIn\"\r\n    [ngClass]=\"{ 'display-none': isHidden(), 'invisible': isInvisible() }\"\r\n    [ngStyle]=\"{\r\n        'width'        : width(), \r\n        'max-width'    : maxWidth(), \r\n        'margin-top'   : marginTop(),\r\n        'margin-right' : marginRight(),\r\n        'margin-bottom': marginBottom(),\r\n        'margin-left'  : marginLeft()         \r\n    }\">   \r\n     \r\n    <div class=\"wia-radio-container\"  \r\n        [ngClass]=\"{\r\n            'flex-direction-column' : (position() === 'vertical'  ),\r\n            'flex-direction-row'    : (position() === 'horizontal'), \r\n            'animation-appear'      : isLoading(),\r\n            'background-color-input': showBackround()\r\n        }\">\r\n        \r\n        @for(item of _dataSource(); track item.__index__) {\r\n            <label [ngClass]=\"{ 'cursor-pointer': _isEnabled() }\">\r\n                @if(labelPosition() == 'left') {\r\n                    <span [ngClass]=\"{\r\n                        'word-break'        : breakLabel(),\r\n                        'word-break-none'   : !breakLabel(),\r\n                        'white-space-nowrap': !breakLabel() \r\n                    }\">{{item.Label}}</span>\r\n                }\r\n\r\n                <input \r\n                    type=\"radio\" \r\n                    [name]=\"_id\" \r\n                    [value]=\"item.__index__\"\r\n                    [disabled]=\"!_isEnabled()\"\r\n                    (input)=\"_ClickOption(item.__index__)\"\r\n                > \r\n                \r\n                @if(labelPosition() == 'right') {\r\n                    <span [ngClass]=\"{\r\n                        'word-break'        : breakLabel(),\r\n                        'word-break-none'   : !breakLabel(),\r\n                        'white-space-nowrap': !breakLabel() \r\n                    }\">{{item.Label}}</span>\r\n                }\r\n            </label>\r\n        } \r\n    </div>\r\n</div>      ", styles: ["div.wia-radio div.wia-radio-container{overflow:hidden;display:flex!important;flex-wrap:wrap!important;width:inherit!important;max-width:inherit!important;min-height:calc(var(--input-height) - 10px)!important;gap:5px!important;border-radius:5px!important;padding:5px 0!important}div.wia-radio div.wia-radio-container label{display:flex!important;align-items:center!important;width:inherit!important;max-width:inherit!important}div.wia-radio div.wia-radio-container label input{width:16px!important;min-width:16px!important;height:16px!important;min-height:16px!important;margin:0 5px!important}div.wia-radio div.wia-radio-container label span{overflow:hidden;text-overflow:ellipsis}div.wia-radio div.animation-appear label input{background-color:var(--loading)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIARadio, decorators: [{
            type: Component,
            args: [{ selector: 'wia-radio', providers: [CONTROL_VALUE(WIARadio)], standalone: false, template: "<div class=\"wia-radio animation-fadeIn\"\r\n    [ngClass]=\"{ 'display-none': isHidden(), 'invisible': isInvisible() }\"\r\n    [ngStyle]=\"{\r\n        'width'        : width(), \r\n        'max-width'    : maxWidth(), \r\n        'margin-top'   : marginTop(),\r\n        'margin-right' : marginRight(),\r\n        'margin-bottom': marginBottom(),\r\n        'margin-left'  : marginLeft()         \r\n    }\">   \r\n     \r\n    <div class=\"wia-radio-container\"  \r\n        [ngClass]=\"{\r\n            'flex-direction-column' : (position() === 'vertical'  ),\r\n            'flex-direction-row'    : (position() === 'horizontal'), \r\n            'animation-appear'      : isLoading(),\r\n            'background-color-input': showBackround()\r\n        }\">\r\n        \r\n        @for(item of _dataSource(); track item.__index__) {\r\n            <label [ngClass]=\"{ 'cursor-pointer': _isEnabled() }\">\r\n                @if(labelPosition() == 'left') {\r\n                    <span [ngClass]=\"{\r\n                        'word-break'        : breakLabel(),\r\n                        'word-break-none'   : !breakLabel(),\r\n                        'white-space-nowrap': !breakLabel() \r\n                    }\">{{item.Label}}</span>\r\n                }\r\n\r\n                <input \r\n                    type=\"radio\" \r\n                    [name]=\"_id\" \r\n                    [value]=\"item.__index__\"\r\n                    [disabled]=\"!_isEnabled()\"\r\n                    (input)=\"_ClickOption(item.__index__)\"\r\n                > \r\n                \r\n                @if(labelPosition() == 'right') {\r\n                    <span [ngClass]=\"{\r\n                        'word-break'        : breakLabel(),\r\n                        'word-break-none'   : !breakLabel(),\r\n                        'white-space-nowrap': !breakLabel() \r\n                    }\">{{item.Label}}</span>\r\n                }\r\n            </label>\r\n        } \r\n    </div>\r\n</div>      ", styles: ["div.wia-radio div.wia-radio-container{overflow:hidden;display:flex!important;flex-wrap:wrap!important;width:inherit!important;max-width:inherit!important;min-height:calc(var(--input-height) - 10px)!important;gap:5px!important;border-radius:5px!important;padding:5px 0!important}div.wia-radio div.wia-radio-container label{display:flex!important;align-items:center!important;width:inherit!important;max-width:inherit!important}div.wia-radio div.wia-radio-container label input{width:16px!important;min-width:16px!important;height:16px!important;min-height:16px!important;margin:0 5px!important}div.wia-radio div.wia-radio-container label span{overflow:hidden;text-overflow:ellipsis}div.wia-radio div.animation-appear label input{background-color:var(--loading)}\n"] }]
        }], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }], dataSource: [{ type: i0.Input, args: [{ isSignal: true, alias: "dataSource", required: false }] }], position: [{ type: i0.Input, args: [{ isSignal: true, alias: "position", required: false }] }], labelPosition: [{ type: i0.Input, args: [{ isSignal: true, alias: "labelPosition", required: false }] }], breakLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "breakLabel", required: false }] }], showBackround: [{ type: i0.Input, args: [{ isSignal: true, alias: "showBackround", required: false }] }], width: [{ type: i0.Input, args: [{ isSignal: true, alias: "width", required: false }] }], maxWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxWidth", required: false }] }] } });

class WIASecretBox extends WIATextBox {
    //Variables
    effectRef;
    //Input   
    maxLength = input(20, ...(ngDevMode ? [{ debugName: "maxLength" }] : /* istanbul ignore next */ []));
    showSecret = input(true, ...(ngDevMode ? [{ debugName: "showSecret" }] : /* istanbul ignore next */ []));
    constructor() {
        super();
        this.effectRef = effect(() => {
            this._isSecretComponent.set(this.showSecret());
        }, ...(ngDevMode ? [{ debugName: "effectRef" }] : /* istanbul ignore next */ []));
    }
    Destructor() {
        super.Destructor();
        this.effectRef?.destroy();
    }
    //Computed
    _inputType = computed(() => {
        if (this._showSecretClosed())
            return 'password';
        return 'text';
    }, ...(ngDevMode ? [{ debugName: "_inputType" }] : /* istanbul ignore next */ []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIASecretBox, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIASecretBox, isStandalone: false, selector: "wia-secretbox", inputs: { maxLength: { classPropertyName: "maxLength", publicName: "maxLength", isSignal: true, isRequired: false, transformFunction: null }, showSecret: { classPropertyName: "showSecret", publicName: "showSecret", isSignal: true, isRequired: false, transformFunction: null } }, providers: [CONTROL_VALUE(WIASecretBox)], usesInheritance: true, ngImport: i0, template: "<div [id]=\"_id + '-container'\" class=\"coer-textbox\" \r\n    [ngClass]=\"{ \r\n        'background-color-readonly': isReadonly(), \r\n        'invisible': isInvisible(),\r\n        'display-none': isHidden(), \r\n    }\"\r\n    [ngStyle]=\"{\r\n        width       : width(), \r\n        minWidth    : minWidth(),\r\n        maxWidth    : maxWidth(),\r\n        marginTop   : marginTop(),\r\n        marginRight : marginRight(),\r\n        marginBottom: marginBottom(),\r\n        marginLeft  : marginLeft(),\r\n        height      : ((size() == 'small') ? 'var(--input-height-small)' : 'var(--input-height)') \r\n    }\">  \r\n\r\n    @if(_showExternalButtonLeft()) {\r\n        <div class=\"coer-textbox-button radius-left-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconLeft || ''\"\r\n                [type]=\"externalButtons()?.typeLeft || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorLeft || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyLeft || false)\"\r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickLeft.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n     \r\n    <input \r\n        #inputINNER\r\n        [type]=\"_inputType()\" \r\n        [id]=\"_id\" \r\n        [name]=\"_id\" \r\n        [placeholder]=\"_placeholder()\"\r\n        [value]=\"_ValueByComponent()\"\r\n        [disabled]=\"!_isEnabled()\"\r\n        [minLength]=\"minLength()\"\r\n        [maxLength]=\"maxLength()\"\r\n        (input)=\"_Input($event.target.value)\"\r\n        [ngStyle]=\"{ \r\n            width: _widtht(),\r\n            paddingLeft:  _paddingLeft(),\r\n            paddingRight: _paddingRight(), \r\n            'text-align': textPosition(), \r\n            color: (_isNumberComponent() && !_isFocused() ? 'transparent' : 'var(--dark)')\r\n        }\"> \r\n        \r\n    @if(_isNumberComponent() && !_isFocused()) {\r\n        <input [type]=\"_inputType()\"  \r\n            [name]=\"_id\"\r\n            class=\"position-absolute\" \r\n            [placeholder]=\"_placeholder()\"\r\n            [value]=\"_ValueFormat()\" \r\n            [disabled]=\"!_isEnabled()\"\r\n            (focus)=\"Focus()\"\r\n            [ngStyle]=\"{ \r\n                width: _widtht(),\r\n                paddingLeft:  _paddingLeft(),\r\n                paddingRight: _paddingRight(), \r\n                'text-align': textPosition()\r\n            }\"> \r\n    }\r\n\r\n    @if(_showExternalButtonRight()) {\r\n        <div class=\"coer-textbox-button radius-right-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconRight || ''\"\r\n                [type]=\"externalButtons()?.typeRight || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorRight || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyRight || false)\"  \r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickRight.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n\r\n    @if(_paddingRight() != '10px') {\r\n        <div class=\"icon-container\" [ngStyle]=\"{ right: _right() }\">\r\n            @if(isInvalid() && _isEnabled()) {\r\n                <i class=\"iw-exclamation-circle-fill\"></i>\r\n            }\r\n    \r\n            @else if(isValid() && _isEnabled()) {\r\n                <i class=\"iw-check-circle-fill\"></i>\r\n            }  \r\n\r\n            @if(_showSearchButton()) {\r\n                <i class=\"iw-search\" (click)=\"_ClickSearch()\"></i>\r\n            }\r\n    \r\n            @else if(_showClearButton()) {\r\n                <i class=\"iw-mark\" (click)=\"Clear()\"></i>\r\n            }  \r\n\r\n            @else if(_showSecretClosed()) {\r\n                <i class=\"iw-eye-slash-fill\" (click)=\"_showSecret.set(false); Focus();\"></i>\r\n            }\r\n    \r\n            @else if(_showSecretOpen()) {\r\n                <i class=\"iw-eye-fill\" (click)=\"_showSecret.set(true); Focus();\"></i>\r\n            } \r\n            \r\n            @if(_isSelectComponent() && _isEnabled()) {\r\n                <i [ngClass]=\"{\r\n                    'iw-angle'    : true,\r\n                    'iw-90deg'    : _isCollapsed(),\r\n                    'iw-270deg'   : !_isCollapsed(),\r\n                    'color-primary': !_isCollapsed() && !isValid() && !isInvalid(),\r\n                    'color-success': !_isCollapsed() && isValid()  && !isInvalid(),\r\n                    'color-danger' : !_isCollapsed() && isInvalid(),\r\n                }\" (click)=\"_isCollapsed() ? Focus() : Blur()\"></i>\r\n            } \r\n\r\n            @if(_isNumberComponent() && _showStepIcon() && _isEnabled()) {\r\n                <div [ngClass]=\"{ 'tricks-container': true, 'focus': _isFocused() }\">\r\n                    <i class=\"iw-angle iw-270deg\" (click)=\"_IncrementStep()\"></i>\r\n                    <i class=\"iw-angle iw-90deg\" (click)=\"_DecrementStep()\"></i>\r\n                </div>\r\n            } \r\n        </div>\r\n    }\r\n\r\n    @if(_showLabel()) {\r\n        <label [for]=\"_id\"\r\n            [ngStyle]=\"{ width: _widtht() }\"\r\n            [ngClass]=\"{ \r\n                'focus'          : _isFocused() && IsNotOnlyWhiteSpace(label()),\r\n                'no-empty'       : IsNotOnlyWhiteSpace(_value()),\r\n                'external-button': _showExternalButtonLeft(), \r\n                'display-none'   : isLoading(),\r\n                'isValid'        : isValid(), \r\n                'isInvalid'      : isInvalid(),\r\n                'readonly'       : isReadonly(),\r\n                'small'          : (size() == 'small')\r\n            }\">\r\n            <span [ngClass]=\"{ 'background-color-readonly': isReadonly() }\"> {{ _label() }} </span>\r\n        </label>\r\n    }\r\n\r\n    @if(isLoading()) {\r\n        <div class=\"loading\"></div>\r\n    }\r\n\r\n    @if(_isEnabled()) {\r\n        <div class=\"line\"\r\n            [ngStyle]=\"{ left: _left(), right: _right() }\"\r\n            [ngClass]=\"{   \r\n                'focus'    : _isFocused(), \r\n                'isValid'  : _isFocused() && isValid(), \r\n                'isInvalid': _isFocused() && isInvalid(),\r\n                'display-none': !_isEnabled()\r\n            }\" \r\n        ></div>\r\n    }\r\n\r\n    @if(_isSelectComponent()) {        \r\n        <ul [id]=\"_id + '-options'\" [ngStyle]=\"{ 'max-height' : (_isCollapsed() ? '0px' : '175px') }\">\r\n            @if(_dataSource().length > 0) {\r\n                @for(item of _dataSource(); track item.__index__) {\r\n                    <li [id]=\"_id + '-index' + item.__index__\" [ngClass]=\"{ 'focus': _index() == item.__index__ }\" (click)=\"_SetValue(item)\"> \r\n                        @if(IsNotOnlyWhiteSpace(_GetIconBySelect(item))) {\r\n                            <span class=\"icon-container-option\">\r\n                                <i [class]=\"_GetIconBySelect(item)\"></i> \r\n                            </span>\r\n                        }\r\n        \r\n                        <span class=\"display-property-option\">{{ _GetDisplayBySelect(item) }}</span>    \r\n                    </li>\r\n                } \r\n            }\r\n\r\n            @else {\r\n                <li (click)=\"Blur()\">    \r\n                    <span class=\"display-property-option\"> -- No Options -- </span>    \r\n                </li>\r\n            }\r\n        </ul> \r\n    }\r\n</div>    ", styles: ["div.coer-textbox{align-items:center!important;position:relative!important;border-radius:5px;background-color:var(--input);height:var(--input-height);display:inline-flex}div.coer-textbox div.coer-textbox-button{display:inline!important;background-color:inherit!important;z-index:1!important}div.coer-textbox input{border:none!important;height:inherit!important;padding-top:0!important;padding-bottom:0!important;border-radius:inherit!important;font-size:var(--input-font-size)!important;background-color:inherit!important;color:var(--dark)}div.coer-textbox input:focus{outline:none!important}div.coer-textbox input:disabled{background-color:var(--readonly)}div.coer-textbox div.icon-container{position:absolute!important;top:0!important;bottom:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:10px 10px 10px 5px!important;background-color:inherit!important;border-radius:inherit!important;z-index:1!important;gap:5px!important}div.coer-textbox div.icon-container div.tricks-container{width:20px!important;max-width:20px!important;height:var(--input-height)}div.coer-textbox div.icon-container div.tricks-container i,div.coer-textbox div.icon-container i{cursor:pointer!important;font-size:20px!important}div.coer-textbox div.icon-container i.iw-search,div.coer-textbox div.icon-container i.iw-mark,div.coer-textbox div.icon-container i.iw-eye-fill,div.coer-textbox div.icon-container i.iw-eye-slash-fill{color:color-mix(in srgb,var(--gray),var(--light) 50%)}div.coer-textbox div.icon-container i.iw-search:hover,div.coer-textbox div.icon-container i.iw-mark:hover,div.coer-textbox div.icon-container i.iw-eye-fill:hover,div.coer-textbox div.icon-container i.iw-eye-slash-fill:hover{color:var(--gray)!important}div.coer-textbox div.icon-container i.iw-exclamation-circle-fill{color:var(--danger)}div.coer-textbox div.icon-container i.iw-check-circle-fill{color:var(--success)}div.coer-textbox div.icon-container i.iw-angle{transition:all .3s ease!important;color:var(--gray)}div.coer-textbox div.icon-container i.iw-270deg{color:var(--primary)}div.coer-textbox div.icon-container div.tricks-container{display:flex!important;flex-direction:column!important}div.coer-textbox div.icon-container div.tricks-container i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container i.iw-270deg{color:var(--gray)!important}div.coer-textbox div.icon-container div.tricks-container.focus i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container.focus i.iw-270deg{color:var(--primary)!important}div.coer-textbox label{-webkit-user-select:none!important;user-select:none!important;position:absolute!important;color:var(--gray)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;transform:translate(11px)!important;transition:transform .3s ease!important}div.coer-textbox label span{padding:0 10px!important;border-radius:10px!important;background-color:var(--input)}div.coer-textbox label.focus,div.coer-textbox label.no-empty{font-size:14px!important;font-weight:700!important;transform:translate(5px,calc(var(--input-height) / 2 * -1))!important;background-color:transparent!important}div.coer-textbox label.focus.small,div.coer-textbox label.no-empty.small{font-size:12px!important;transform:translate(5px,-15px)!important}div.coer-textbox label.focus{color:var(--input-focus)!important}div.coer-textbox label.focus.isValid{color:var(--success)!important}div.coer-textbox label.focus.isInvalid{color:var(--danger)!important}div.coer-textbox label.no-empty.readonly{color:var(--dark)!important}div.coer-textbox label.external-button{transform:translate(50px)!important}div.coer-textbox label.focus.external-button,div.coer-textbox label.no-empty.external-button{transform:translate(45px,calc(var(--input-height) / 2 * -1))!important}div.coer-textbox label.focus.external-button.small,div.coer-textbox label.no-empty.external-button.small{transform:translate(45px,-15px)!important}div.coer-textbox div.loading{border-radius:inherit!important;position:absolute!important;z-index:1!important}div.coer-textbox div.line{position:absolute!important;bottom:0!important;z-index:2!important;transition:all .4s ease-in-out!important;border:1px solid var(--gray)}div.coer-textbox div.line.focus{border-color:var(--input-focus)!important}div.coer-textbox div.line.isValid{border-color:var(--success)!important}div.coer-textbox div.line.isInvalid{border-color:var(--danger)!important}div.coer-textbox ul{list-style:none!important;padding-left:0!important;background-color:var(--ghost)!important;border-radius:0 0 5px 5px!important;box-shadow:0 5px 10px -3px var(--dark)!important;position:absolute!important;top:var(--input-height);left:0!important;right:0!important;overflow:auto!important;transition:max-height .3s ease-in-out!important;z-index:var(--z-index-items)!important}div.coer-textbox ul li{min-height:24.2px!important;border-bottom:1px solid var(--loading)!important;display:flex!important;align-items:center!important;padding:5px 10px!important;overflow:hidden!important;cursor:pointer!important;gap:5px!important}div.coer-textbox ul li span.icon-container-option{width:25px!important;max-width:25px!important;display:inherit!important;align-items:inherit!important;justify-content:center!important}div.coer-textbox ul li span.display-property-option{display:flex!important;align-items:center!important;word-break:break-all!important}div.coer-textbox ul li:last-child{border-bottom-color:transparent!important;border-radius:0 0 5px 5px!important}div.coer-textbox ul li:not(.focus):hover{background-color:var(--item-hover)}div.coer-textbox ul li.focus{background-color:var(--item-focus)}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: WIAButton, selector: "wia-button", inputs: ["label", "type", "color", "icon", "path", "iconPosition", "isLoading", "isReadonly", "isInvisible", "isHidden", "breakpoints", "width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "marginTop", "marginRight", "marginBottom", "marginLeft"], outputs: ["onClick", "onDestroy", "onReady"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIASecretBox, decorators: [{
            type: Component,
            args: [{ selector: 'wia-secretbox', providers: [CONTROL_VALUE(WIASecretBox)], standalone: false, template: "<div [id]=\"_id + '-container'\" class=\"coer-textbox\" \r\n    [ngClass]=\"{ \r\n        'background-color-readonly': isReadonly(), \r\n        'invisible': isInvisible(),\r\n        'display-none': isHidden(), \r\n    }\"\r\n    [ngStyle]=\"{\r\n        width       : width(), \r\n        minWidth    : minWidth(),\r\n        maxWidth    : maxWidth(),\r\n        marginTop   : marginTop(),\r\n        marginRight : marginRight(),\r\n        marginBottom: marginBottom(),\r\n        marginLeft  : marginLeft(),\r\n        height      : ((size() == 'small') ? 'var(--input-height-small)' : 'var(--input-height)') \r\n    }\">  \r\n\r\n    @if(_showExternalButtonLeft()) {\r\n        <div class=\"coer-textbox-button radius-left-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconLeft || ''\"\r\n                [type]=\"externalButtons()?.typeLeft || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorLeft || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyLeft || false)\"\r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickLeft.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n     \r\n    <input \r\n        #inputINNER\r\n        [type]=\"_inputType()\" \r\n        [id]=\"_id\" \r\n        [name]=\"_id\" \r\n        [placeholder]=\"_placeholder()\"\r\n        [value]=\"_ValueByComponent()\"\r\n        [disabled]=\"!_isEnabled()\"\r\n        [minLength]=\"minLength()\"\r\n        [maxLength]=\"maxLength()\"\r\n        (input)=\"_Input($event.target.value)\"\r\n        [ngStyle]=\"{ \r\n            width: _widtht(),\r\n            paddingLeft:  _paddingLeft(),\r\n            paddingRight: _paddingRight(), \r\n            'text-align': textPosition(), \r\n            color: (_isNumberComponent() && !_isFocused() ? 'transparent' : 'var(--dark)')\r\n        }\"> \r\n        \r\n    @if(_isNumberComponent() && !_isFocused()) {\r\n        <input [type]=\"_inputType()\"  \r\n            [name]=\"_id\"\r\n            class=\"position-absolute\" \r\n            [placeholder]=\"_placeholder()\"\r\n            [value]=\"_ValueFormat()\" \r\n            [disabled]=\"!_isEnabled()\"\r\n            (focus)=\"Focus()\"\r\n            [ngStyle]=\"{ \r\n                width: _widtht(),\r\n                paddingLeft:  _paddingLeft(),\r\n                paddingRight: _paddingRight(), \r\n                'text-align': textPosition()\r\n            }\"> \r\n    }\r\n\r\n    @if(_showExternalButtonRight()) {\r\n        <div class=\"coer-textbox-button radius-right-5px\">\r\n            <wia-button\r\n                [icon]=\"externalButtons()?.iconRight || ''\"\r\n                [type]=\"externalButtons()?.typeRight || 'icon-filled'\"\r\n                [color]=\"externalButtons()?.colorRight || 'secondary'\"\r\n                [isReadonly]=\"(externalButtons()?.isReadonlyRight || false)\"  \r\n                [height]=\"(size() == 'small') ? '25px' : 'var(--input-height)'\"\r\n                (onClick)=\"onClickRight.emit()\"\r\n            ></wia-button>\r\n        </div>\r\n    }\r\n\r\n    @if(_paddingRight() != '10px') {\r\n        <div class=\"icon-container\" [ngStyle]=\"{ right: _right() }\">\r\n            @if(isInvalid() && _isEnabled()) {\r\n                <i class=\"iw-exclamation-circle-fill\"></i>\r\n            }\r\n    \r\n            @else if(isValid() && _isEnabled()) {\r\n                <i class=\"iw-check-circle-fill\"></i>\r\n            }  \r\n\r\n            @if(_showSearchButton()) {\r\n                <i class=\"iw-search\" (click)=\"_ClickSearch()\"></i>\r\n            }\r\n    \r\n            @else if(_showClearButton()) {\r\n                <i class=\"iw-mark\" (click)=\"Clear()\"></i>\r\n            }  \r\n\r\n            @else if(_showSecretClosed()) {\r\n                <i class=\"iw-eye-slash-fill\" (click)=\"_showSecret.set(false); Focus();\"></i>\r\n            }\r\n    \r\n            @else if(_showSecretOpen()) {\r\n                <i class=\"iw-eye-fill\" (click)=\"_showSecret.set(true); Focus();\"></i>\r\n            } \r\n            \r\n            @if(_isSelectComponent() && _isEnabled()) {\r\n                <i [ngClass]=\"{\r\n                    'iw-angle'    : true,\r\n                    'iw-90deg'    : _isCollapsed(),\r\n                    'iw-270deg'   : !_isCollapsed(),\r\n                    'color-primary': !_isCollapsed() && !isValid() && !isInvalid(),\r\n                    'color-success': !_isCollapsed() && isValid()  && !isInvalid(),\r\n                    'color-danger' : !_isCollapsed() && isInvalid(),\r\n                }\" (click)=\"_isCollapsed() ? Focus() : Blur()\"></i>\r\n            } \r\n\r\n            @if(_isNumberComponent() && _showStepIcon() && _isEnabled()) {\r\n                <div [ngClass]=\"{ 'tricks-container': true, 'focus': _isFocused() }\">\r\n                    <i class=\"iw-angle iw-270deg\" (click)=\"_IncrementStep()\"></i>\r\n                    <i class=\"iw-angle iw-90deg\" (click)=\"_DecrementStep()\"></i>\r\n                </div>\r\n            } \r\n        </div>\r\n    }\r\n\r\n    @if(_showLabel()) {\r\n        <label [for]=\"_id\"\r\n            [ngStyle]=\"{ width: _widtht() }\"\r\n            [ngClass]=\"{ \r\n                'focus'          : _isFocused() && IsNotOnlyWhiteSpace(label()),\r\n                'no-empty'       : IsNotOnlyWhiteSpace(_value()),\r\n                'external-button': _showExternalButtonLeft(), \r\n                'display-none'   : isLoading(),\r\n                'isValid'        : isValid(), \r\n                'isInvalid'      : isInvalid(),\r\n                'readonly'       : isReadonly(),\r\n                'small'          : (size() == 'small')\r\n            }\">\r\n            <span [ngClass]=\"{ 'background-color-readonly': isReadonly() }\"> {{ _label() }} </span>\r\n        </label>\r\n    }\r\n\r\n    @if(isLoading()) {\r\n        <div class=\"loading\"></div>\r\n    }\r\n\r\n    @if(_isEnabled()) {\r\n        <div class=\"line\"\r\n            [ngStyle]=\"{ left: _left(), right: _right() }\"\r\n            [ngClass]=\"{   \r\n                'focus'    : _isFocused(), \r\n                'isValid'  : _isFocused() && isValid(), \r\n                'isInvalid': _isFocused() && isInvalid(),\r\n                'display-none': !_isEnabled()\r\n            }\" \r\n        ></div>\r\n    }\r\n\r\n    @if(_isSelectComponent()) {        \r\n        <ul [id]=\"_id + '-options'\" [ngStyle]=\"{ 'max-height' : (_isCollapsed() ? '0px' : '175px') }\">\r\n            @if(_dataSource().length > 0) {\r\n                @for(item of _dataSource(); track item.__index__) {\r\n                    <li [id]=\"_id + '-index' + item.__index__\" [ngClass]=\"{ 'focus': _index() == item.__index__ }\" (click)=\"_SetValue(item)\"> \r\n                        @if(IsNotOnlyWhiteSpace(_GetIconBySelect(item))) {\r\n                            <span class=\"icon-container-option\">\r\n                                <i [class]=\"_GetIconBySelect(item)\"></i> \r\n                            </span>\r\n                        }\r\n        \r\n                        <span class=\"display-property-option\">{{ _GetDisplayBySelect(item) }}</span>    \r\n                    </li>\r\n                } \r\n            }\r\n\r\n            @else {\r\n                <li (click)=\"Blur()\">    \r\n                    <span class=\"display-property-option\"> -- No Options -- </span>    \r\n                </li>\r\n            }\r\n        </ul> \r\n    }\r\n</div>    ", styles: ["div.coer-textbox{align-items:center!important;position:relative!important;border-radius:5px;background-color:var(--input);height:var(--input-height);display:inline-flex}div.coer-textbox div.coer-textbox-button{display:inline!important;background-color:inherit!important;z-index:1!important}div.coer-textbox input{border:none!important;height:inherit!important;padding-top:0!important;padding-bottom:0!important;border-radius:inherit!important;font-size:var(--input-font-size)!important;background-color:inherit!important;color:var(--dark)}div.coer-textbox input:focus{outline:none!important}div.coer-textbox input:disabled{background-color:var(--readonly)}div.coer-textbox div.icon-container{position:absolute!important;top:0!important;bottom:0!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:10px 10px 10px 5px!important;background-color:inherit!important;border-radius:inherit!important;z-index:1!important;gap:5px!important}div.coer-textbox div.icon-container div.tricks-container{width:20px!important;max-width:20px!important;height:var(--input-height)}div.coer-textbox div.icon-container div.tricks-container i,div.coer-textbox div.icon-container i{cursor:pointer!important;font-size:20px!important}div.coer-textbox div.icon-container i.iw-search,div.coer-textbox div.icon-container i.iw-mark,div.coer-textbox div.icon-container i.iw-eye-fill,div.coer-textbox div.icon-container i.iw-eye-slash-fill{color:color-mix(in srgb,var(--gray),var(--light) 50%)}div.coer-textbox div.icon-container i.iw-search:hover,div.coer-textbox div.icon-container i.iw-mark:hover,div.coer-textbox div.icon-container i.iw-eye-fill:hover,div.coer-textbox div.icon-container i.iw-eye-slash-fill:hover{color:var(--gray)!important}div.coer-textbox div.icon-container i.iw-exclamation-circle-fill{color:var(--danger)}div.coer-textbox div.icon-container i.iw-check-circle-fill{color:var(--success)}div.coer-textbox div.icon-container i.iw-angle{transition:all .3s ease!important;color:var(--gray)}div.coer-textbox div.icon-container i.iw-270deg{color:var(--primary)}div.coer-textbox div.icon-container div.tricks-container{display:flex!important;flex-direction:column!important}div.coer-textbox div.icon-container div.tricks-container i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container i.iw-270deg{color:var(--gray)!important}div.coer-textbox div.icon-container div.tricks-container.focus i.iw-90deg,div.coer-textbox div.icon-container div.tricks-container.focus i.iw-270deg{color:var(--primary)!important}div.coer-textbox label{-webkit-user-select:none!important;user-select:none!important;position:absolute!important;color:var(--gray)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;transform:translate(11px)!important;transition:transform .3s ease!important}div.coer-textbox label span{padding:0 10px!important;border-radius:10px!important;background-color:var(--input)}div.coer-textbox label.focus,div.coer-textbox label.no-empty{font-size:14px!important;font-weight:700!important;transform:translate(5px,calc(var(--input-height) / 2 * -1))!important;background-color:transparent!important}div.coer-textbox label.focus.small,div.coer-textbox label.no-empty.small{font-size:12px!important;transform:translate(5px,-15px)!important}div.coer-textbox label.focus{color:var(--input-focus)!important}div.coer-textbox label.focus.isValid{color:var(--success)!important}div.coer-textbox label.focus.isInvalid{color:var(--danger)!important}div.coer-textbox label.no-empty.readonly{color:var(--dark)!important}div.coer-textbox label.external-button{transform:translate(50px)!important}div.coer-textbox label.focus.external-button,div.coer-textbox label.no-empty.external-button{transform:translate(45px,calc(var(--input-height) / 2 * -1))!important}div.coer-textbox label.focus.external-button.small,div.coer-textbox label.no-empty.external-button.small{transform:translate(45px,-15px)!important}div.coer-textbox div.loading{border-radius:inherit!important;position:absolute!important;z-index:1!important}div.coer-textbox div.line{position:absolute!important;bottom:0!important;z-index:2!important;transition:all .4s ease-in-out!important;border:1px solid var(--gray)}div.coer-textbox div.line.focus{border-color:var(--input-focus)!important}div.coer-textbox div.line.isValid{border-color:var(--success)!important}div.coer-textbox div.line.isInvalid{border-color:var(--danger)!important}div.coer-textbox ul{list-style:none!important;padding-left:0!important;background-color:var(--ghost)!important;border-radius:0 0 5px 5px!important;box-shadow:0 5px 10px -3px var(--dark)!important;position:absolute!important;top:var(--input-height);left:0!important;right:0!important;overflow:auto!important;transition:max-height .3s ease-in-out!important;z-index:var(--z-index-items)!important}div.coer-textbox ul li{min-height:24.2px!important;border-bottom:1px solid var(--loading)!important;display:flex!important;align-items:center!important;padding:5px 10px!important;overflow:hidden!important;cursor:pointer!important;gap:5px!important}div.coer-textbox ul li span.icon-container-option{width:25px!important;max-width:25px!important;display:inherit!important;align-items:inherit!important;justify-content:center!important}div.coer-textbox ul li span.display-property-option{display:flex!important;align-items:center!important;word-break:break-all!important}div.coer-textbox ul li:last-child{border-bottom-color:transparent!important;border-radius:0 0 5px 5px!important}div.coer-textbox ul li:not(.focus):hover{background-color:var(--item-hover)}div.coer-textbox ul li.focus{background-color:var(--item-focus)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { maxLength: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxLength", required: false }] }], showSecret: [{ type: i0.Input, args: [{ isSignal: true, alias: "showSecret", required: false }] }] } });

class WIATab extends ControlValue {
    //Content
    _contentElements = contentChildren(TemplateRefDirective, ...(ngDevMode ? [{ debugName: "_contentElements" }] : /* istanbul ignore next */ []));
    //Variables     
    _value = signal(0, ...(ngDevMode ? [{ debugName: "_value" }] : /* istanbul ignore next */ []));
    _containerHeight = signal(0, ...(ngDevMode ? [{ debugName: "_containerHeight" }] : /* istanbul ignore next */ []));
    _showingTab = signal(false, ...(ngDevMode ? [{ debugName: "_showingTab" }] : /* istanbul ignore next */ []));
    //input
    value = input(0, ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    useContainer = input(true, ...(ngDevMode ? [{ debugName: "useContainer" }] : /* istanbul ignore next */ []));
    width = input('100%', ...(ngDevMode ? [{ debugName: "width" }] : /* istanbul ignore next */ []));
    minWidth = input('100px', ...(ngDevMode ? [{ debugName: "minWidth" }] : /* istanbul ignore next */ []));
    maxWidth = input('100%', ...(ngDevMode ? [{ debugName: "maxWidth" }] : /* istanbul ignore next */ []));
    height = input('350px', ...(ngDevMode ? [{ debugName: "height" }] : /* istanbul ignore next */ []));
    minHeight = input('330px', ...(ngDevMode ? [{ debugName: "minHeight" }] : /* istanbul ignore next */ []));
    maxHeight = input('100%', ...(ngDevMode ? [{ debugName: "maxHeight" }] : /* istanbul ignore next */ []));
    siblings = input([], ...(ngDevMode ? [{ debugName: "siblings" }] : /* istanbul ignore next */ []));
    marginTop = input('15px', ...(ngDevMode ? [{ debugName: "marginTop" }] : /* istanbul ignore next */ []));
    marginRight = input('30px', ...(ngDevMode ? [{ debugName: "marginRight" }] : /* istanbul ignore next */ []));
    marginLeft = input('30px', ...(ngDevMode ? [{ debugName: "marginLeft" }] : /* istanbul ignore next */ []));
    //output 
    onClickTab = output();
    //AfterViewInit
    async Start() {
        this._showingTab.set(true);
        this.CalculateHeight();
        Tools.Sleep().then(() => this.CalculateHeight());
    }
    //Function
    CalculateHeight() {
        let container = this.useContainer() ? 60 : 40;
        for (const sibling of this.siblings()) {
            container += Number(HTMLElements.GetCssValue(sibling, 'margin-top').split('px')[0]);
            container += Number(HTMLElements.GetCssValue(sibling, 'margin-bottom').split('px')[0]);
            container += Number(HTMLElements.GetHeight(sibling).split('px')[0]);
        }
        this._containerHeight.set(container);
    }
    //computed
    _height = computed(() => {
        if (this.height() === 'full') {
            let height = 0;
            height += 50; //Toolbar
            height += 50; //Page Title
            height += 35; //Container
            return `calc(100vh - ${height}px)`;
        }
        return this.height();
    }, ...(ngDevMode ? [{ debugName: "_height" }] : /* istanbul ignore next */ []));
    //Computed
    _tabList = computed(() => {
        const TAB_LIST = (this._contentElements() || []);
        return Collections.SetIndex([...TAB_LIST].filter(item => item.show()));
    }, ...(ngDevMode ? [{ debugName: "_tabList" }] : /* istanbul ignore next */ []));
    //Function
    _GetIcon = (templateRef) => {
        return Tools.IsNotOnlyWhiteSpace(templateRef.icon()) ? templateRef.icon() : '';
    };
    //Function
    _GetLabel = (templateRef) => {
        return Tools.IsOnlyWhiteSpace(templateRef.title()) ? templateRef.templateRef() : templateRef.title();
    };
    //Computed
    _GetContent = computed(() => {
        return this._tabList().find(item => item.__index__ == this._value())?.template || null;
    }, ...(ngDevMode ? [{ debugName: "_GetContent" }] : /* istanbul ignore next */ []));
    //Function
    _ClickTab(index) {
        if (this._value() != index) {
            const TAB = this._tabList().find(item => item.__index__ == index);
            if (TAB && !TAB.isReadonly() && !this.isReadonly()) {
                this._showingTab.set(false);
                this._SetValue(index);
                this.onClickTab.emit(index);
            }
            Tools.Sleep(300).then(() => this._showingTab.set(true));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIATab, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.17", type: WIATab, isStandalone: false, selector: "wia-tab", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, useContainer: { classPropertyName: "useContainer", publicName: "useContainer", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, minWidth: { classPropertyName: "minWidth", publicName: "minWidth", isSignal: true, isRequired: false, transformFunction: null }, maxWidth: { classPropertyName: "maxWidth", publicName: "maxWidth", isSignal: true, isRequired: false, transformFunction: null }, height: { classPropertyName: "height", publicName: "height", isSignal: true, isRequired: false, transformFunction: null }, minHeight: { classPropertyName: "minHeight", publicName: "minHeight", isSignal: true, isRequired: false, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: false, transformFunction: null }, siblings: { classPropertyName: "siblings", publicName: "siblings", isSignal: true, isRequired: false, transformFunction: null }, marginTop: { classPropertyName: "marginTop", publicName: "marginTop", isSignal: true, isRequired: false, transformFunction: null }, marginRight: { classPropertyName: "marginRight", publicName: "marginRight", isSignal: true, isRequired: false, transformFunction: null }, marginLeft: { classPropertyName: "marginLeft", publicName: "marginLeft", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onClickTab: "onClickTab" }, providers: [CONTROL_VALUE(WIATab)], queries: [{ propertyName: "_contentElements", predicate: TemplateRefDirective, isSignal: true }], usesInheritance: true, ngImport: i0, template: "<section\r\n    [ngClass]=\"{ 'coer-tab-container': useContainer(), 'invisible': isInvisible(), 'display-none': isHidden() }\" \r\n    [ngStyle]=\"{ 'margin-top': marginTop(), 'margin-right' : marginRight(), 'margin-bottom': marginBottom(), 'margin-left': marginLeft() }\">\r\n\r\n    <div class=\"coer-tab\" [ngStyle]=\"{ 'width' : width(), 'min-width': minWidth(), 'max-width': maxWidth() }\">\r\n        <div class=\"coer-tab-header\">\r\n            @for(tab of _tabList(); track tab.__index__) {                 \r\n                <div class=\"coer-tab-header-option\" (click)=\"_ClickTab(tab.__index__)\"\r\n                    [ngClass]=\"{ \r\n                        'tab-readonly': (tab.isReadonly() || isReadonly()),\r\n                        'tab-selected': tab.__index__ == _value(),\r\n                        'loading'     : isLoading()\r\n                    }\">\r\n\r\n                    @if(IsNotOnlyWhiteSpace(_GetIcon(tab))) {\r\n                        <i [class]=\"_GetIcon(tab)\"></i>\r\n                    }\r\n                    \r\n                    <span>{{ _GetLabel(tab) }}</span>  \r\n                </div>                \r\n            }\r\n        </div> \r\n\r\n        <div class=\"coer-tab-body\" [ngStyle]=\"{ \r\n            'height'    : `calc(${_height()}   - ${_containerHeight()}px)`, \r\n            'min-height': `calc(${minHeight()} - ${_containerHeight()}px)`, \r\n            'max-height': `calc(${maxHeight()} - ${_containerHeight()}px)`,\r\n            'overflow'  : (isLoading() ? 'hidden' : 'auto')\r\n        }\">    \r\n            <div class=\"coer-tab-body-template\" [style]=\"{ opacity: (_showingTab() ? '1.00' : '0.00'), visibility: (_showingTab() ? 'visible' : 'hidden') }\">\r\n                <ng-container [ngTemplateOutlet]=\"_GetContent()\"></ng-container>\r\n            </div>  \r\n            \r\n            <!-- Loading / Empty -->\r\n            @if(isLoading()) {\r\n                <div class=\"loading\">\r\n                    <div class=\"loading-content\">\r\n                        <i class=\"i91-arrows-rotate animation-spin animation-speed-15\"></i>\r\n                        <span class=\"fa-fade\">Loading</span>\r\n                    </div>\r\n                </div> \r\n            }\r\n        </div> \r\n    </div>\r\n</section>  ", styles: ["section.coer-tab-container{animation-name:__KeyOpacity100!important;animation-iteration-count:1!important;animation-duration:1s!important;animation-direction:reverse!important;box-shadow:0 1px 12px -10px var(--dark)!important;background-color:var(--containers);min-height:var(--input-height);border-radius:8px;padding:10px}@media(min-width:0px)and (max-width:499px){section.coer-tab-container{margin:15px 15px 0!important}}div.coer-tab div.coer-tab-header{display:flex!important;align-items:center!important;justify-content:flex-start;gap:1.5px!important}div.coer-tab div.coer-tab-header div.coer-tab-header-option{display:flex!important;align-items:center!important;justify-content:center!important;gap:5px!important;padding:5px 10px!important;height:calc(var(--input-height) - 10px - 1.6px)!important;border-radius:8px 8px 0 0!important;min-width:100px!important;cursor:pointer!important;-webkit-user-select:none!important;user-select:none!important;border-bottom:2px solid var(--gray)!important;font-weight:bolder!important;background-color:var(--input);transition:all .5s ease!important;margin-bottom:5px!important}div.coer-tab div.coer-tab-header div.coer-tab-header-option.tab-readonly{cursor:default!important;border-bottom-color:var(--input)!important;color:var(--readonly)!important}div.coer-tab div.coer-tab-header div.coer-tab-header-option.tab-selected{border-bottom-color:var(--navigation)!important;color:var(--navigation)!important}div.coer-tab div.coer-tab-body{background-color:var(--containers);position:relative}div.coer-tab div.coer-tab-body div.coer-tab-body-template{transition:opacity .3s ease!important}div.coer-tab div.coer-tab-body div.loading,div.coer-tab div.coer-tab-body div.empty-data{position:absolute!important;inset:0!important;display:flex!important;align-items:center!important;justify-content:center!important;z-index:1!important}div.coer-tab div.coer-tab-body div.loading div.loading-content,div.coer-tab div.coer-tab-body div.loading div.empty-data-content,div.coer-tab div.coer-tab-body div.empty-data div.loading-content,div.coer-tab div.coer-tab-body div.empty-data div.empty-data-content{flex-flow:column!important;display:inherit!important;justify-content:inherit!important;align-items:inherit!important;font-size:35px!important;color:var(--gray)!important;-webkit-user-select:none!important;user-select:none!important}div.coer-tab div.coer-tab-body div.loading div.loading-content i,div.coer-tab div.coer-tab-body div.loading div.empty-data-content i,div.coer-tab div.coer-tab-body div.empty-data div.loading-content i,div.coer-tab div.coer-tab-body div.empty-data div.empty-data-content i{font-size:inherit!important}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: WIATab, decorators: [{
            type: Component,
            args: [{ selector: 'wia-tab', providers: [CONTROL_VALUE(WIATab)], standalone: false, template: "<section\r\n    [ngClass]=\"{ 'coer-tab-container': useContainer(), 'invisible': isInvisible(), 'display-none': isHidden() }\" \r\n    [ngStyle]=\"{ 'margin-top': marginTop(), 'margin-right' : marginRight(), 'margin-bottom': marginBottom(), 'margin-left': marginLeft() }\">\r\n\r\n    <div class=\"coer-tab\" [ngStyle]=\"{ 'width' : width(), 'min-width': minWidth(), 'max-width': maxWidth() }\">\r\n        <div class=\"coer-tab-header\">\r\n            @for(tab of _tabList(); track tab.__index__) {                 \r\n                <div class=\"coer-tab-header-option\" (click)=\"_ClickTab(tab.__index__)\"\r\n                    [ngClass]=\"{ \r\n                        'tab-readonly': (tab.isReadonly() || isReadonly()),\r\n                        'tab-selected': tab.__index__ == _value(),\r\n                        'loading'     : isLoading()\r\n                    }\">\r\n\r\n                    @if(IsNotOnlyWhiteSpace(_GetIcon(tab))) {\r\n                        <i [class]=\"_GetIcon(tab)\"></i>\r\n                    }\r\n                    \r\n                    <span>{{ _GetLabel(tab) }}</span>  \r\n                </div>                \r\n            }\r\n        </div> \r\n\r\n        <div class=\"coer-tab-body\" [ngStyle]=\"{ \r\n            'height'    : `calc(${_height()}   - ${_containerHeight()}px)`, \r\n            'min-height': `calc(${minHeight()} - ${_containerHeight()}px)`, \r\n            'max-height': `calc(${maxHeight()} - ${_containerHeight()}px)`,\r\n            'overflow'  : (isLoading() ? 'hidden' : 'auto')\r\n        }\">    \r\n            <div class=\"coer-tab-body-template\" [style]=\"{ opacity: (_showingTab() ? '1.00' : '0.00'), visibility: (_showingTab() ? 'visible' : 'hidden') }\">\r\n                <ng-container [ngTemplateOutlet]=\"_GetContent()\"></ng-container>\r\n            </div>  \r\n            \r\n            <!-- Loading / Empty -->\r\n            @if(isLoading()) {\r\n                <div class=\"loading\">\r\n                    <div class=\"loading-content\">\r\n                        <i class=\"i91-arrows-rotate animation-spin animation-speed-15\"></i>\r\n                        <span class=\"fa-fade\">Loading</span>\r\n                    </div>\r\n                </div> \r\n            }\r\n        </div> \r\n    </div>\r\n</section>  ", styles: ["section.coer-tab-container{animation-name:__KeyOpacity100!important;animation-iteration-count:1!important;animation-duration:1s!important;animation-direction:reverse!important;box-shadow:0 1px 12px -10px var(--dark)!important;background-color:var(--containers);min-height:var(--input-height);border-radius:8px;padding:10px}@media(min-width:0px)and (max-width:499px){section.coer-tab-container{margin:15px 15px 0!important}}div.coer-tab div.coer-tab-header{display:flex!important;align-items:center!important;justify-content:flex-start;gap:1.5px!important}div.coer-tab div.coer-tab-header div.coer-tab-header-option{display:flex!important;align-items:center!important;justify-content:center!important;gap:5px!important;padding:5px 10px!important;height:calc(var(--input-height) - 10px - 1.6px)!important;border-radius:8px 8px 0 0!important;min-width:100px!important;cursor:pointer!important;-webkit-user-select:none!important;user-select:none!important;border-bottom:2px solid var(--gray)!important;font-weight:bolder!important;background-color:var(--input);transition:all .5s ease!important;margin-bottom:5px!important}div.coer-tab div.coer-tab-header div.coer-tab-header-option.tab-readonly{cursor:default!important;border-bottom-color:var(--input)!important;color:var(--readonly)!important}div.coer-tab div.coer-tab-header div.coer-tab-header-option.tab-selected{border-bottom-color:var(--navigation)!important;color:var(--navigation)!important}div.coer-tab div.coer-tab-body{background-color:var(--containers);position:relative}div.coer-tab div.coer-tab-body div.coer-tab-body-template{transition:opacity .3s ease!important}div.coer-tab div.coer-tab-body div.loading,div.coer-tab div.coer-tab-body div.empty-data{position:absolute!important;inset:0!important;display:flex!important;align-items:center!important;justify-content:center!important;z-index:1!important}div.coer-tab div.coer-tab-body div.loading div.loading-content,div.coer-tab div.coer-tab-body div.loading div.empty-data-content,div.coer-tab div.coer-tab-body div.empty-data div.loading-content,div.coer-tab div.coer-tab-body div.empty-data div.empty-data-content{flex-flow:column!important;display:inherit!important;justify-content:inherit!important;align-items:inherit!important;font-size:35px!important;color:var(--gray)!important;-webkit-user-select:none!important;user-select:none!important}div.coer-tab div.coer-tab-body div.loading div.loading-content i,div.coer-tab div.coer-tab-body div.loading div.empty-data-content i,div.coer-tab div.coer-tab-body div.empty-data div.loading-content i,div.coer-tab div.coer-tab-body div.empty-data div.empty-data-content i{font-size:inherit!important}\n"] }]
        }], propDecorators: { _contentElements: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => TemplateRefDirective), { isSignal: true }] }], value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }], useContainer: [{ type: i0.Input, args: [{ isSignal: true, alias: "useContainer", required: false }] }], width: [{ type: i0.Input, args: [{ isSignal: true, alias: "width", required: false }] }], minWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "minWidth", required: false }] }], maxWidth: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxWidth", required: false }] }], height: [{ type: i0.Input, args: [{ isSignal: true, alias: "height", required: false }] }], minHeight: [{ type: i0.Input, args: [{ isSignal: true, alias: "minHeight", required: false }] }], maxHeight: [{ type: i0.Input, args: [{ isSignal: true, alias: "maxHeight", required: false }] }], siblings: [{ type: i0.Input, args: [{ isSignal: true, alias: "siblings", required: false }] }], marginTop: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginTop", required: false }] }], marginRight: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginRight", required: false }] }], marginLeft: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginLeft", required: false }] }], onClickTab: [{ type: i0.Output, args: ["onClickTab"] }] } });

class ComponentsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: ComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "21.2.17", ngImport: i0, type: ComponentsModule, declarations: [WIAButton,
            WIADateBox,
            WIAForm,
            WIAGrid,
            WIAGridBody,
            WIAGridCell,
            WIAGridFooter,
            WIAGridHeader,
            WIALoading,
            WIAModal,
            WIANumberBox,
            WIAPageTitle,
            WIARadio,
            WIASecretBox,
            WIASelectBox,
            WIASwitch,
            WIATab,
            WIATextBox], imports: [CommonModule,
            RouterModule,
            FormsModule,
            ReactiveFormsModule,
            DirectivesModule,
            PipesModule], exports: [WIAButton,
            WIADateBox,
            WIAForm,
            WIAGrid,
            WIALoading,
            WIAModal,
            WIANumberBox,
            WIAPageTitle,
            WIARadio,
            WIASecretBox,
            WIASelectBox,
            WIASwitch,
            WIATab,
            WIATextBox] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: ComponentsModule, imports: [CommonModule,
            RouterModule,
            FormsModule,
            ReactiveFormsModule,
            DirectivesModule,
            PipesModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: ComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormsModule,
                        ReactiveFormsModule,
                        DirectivesModule,
                        PipesModule
                    ],
                    declarations: [
                        WIAButton,
                        WIADateBox,
                        WIAForm,
                        WIAGrid,
                        WIAGridBody,
                        WIAGridCell,
                        WIAGridFooter,
                        WIAGridHeader,
                        WIALoading,
                        WIAModal,
                        WIANumberBox,
                        WIAPageTitle,
                        WIARadio,
                        WIASecretBox,
                        WIASelectBox,
                        WIASwitch,
                        WIATab,
                        WIATextBox,
                    ],
                    exports: [
                        WIAButton,
                        WIADateBox,
                        WIAForm,
                        WIAGrid,
                        WIALoading,
                        WIAModal,
                        WIANumberBox,
                        WIAPageTitle,
                        WIARadio,
                        WIASecretBox,
                        WIASelectBox,
                        WIASwitch,
                        WIATab,
                        WIATextBox,
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ComponentsModule, WIAButton, WIADateBox, WIAForm, WIAGrid, WIALoading, WIAModal, WIANumberBox, WIAPageTitle, WIARadio, WIASecretBox, WIASelectBox, WIASwitch, WIATab, WIATextBox };
//# sourceMappingURL=hwmx-angular-components.mjs.map
