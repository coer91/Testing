import * as i0 from '@angular/core';
import { Component, forwardRef, signal, input, output, effect, computed, inject, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Router, ActivatedRoute } from '@angular/router';

class _Transactions {
    static transactions = new Map();
}
const Tools = {
    /** Generates a guid */
    GetGuid: (seed = 'coer91') => {
        let time = new Date().getTime();
        seed = seed.toString().trim();
        return seed + `-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
            const random = (time + Math.random() * 16) % 16 | 0;
            time = Math.floor(time / 16);
            return (c == 'x' ? random : (random & 0x3 | 0x8)).toString(16);
        });
    },
    /** Returns true if the value is null or undefined, false otherwise */
    IsNull: (value) => {
        return (value === undefined || value === null);
    },
    /** Returns true if the value is not null or undefined, false otherwise */
    IsNotNull: (value) => {
        return !Tools.IsNull(value);
    },
    /** Returns true if the value is null or undefined or is an empty string or contains only whitespace, false otherwise */
    IsOnlyWhiteSpace: (value) => {
        return Tools.IsNull(value) || (typeof value === 'string' && value.trim() === '');
    },
    /** Returns true if it has a string value and is not all whitespace, false otherwise */
    IsNotOnlyWhiteSpace: (value) => {
        return Tools.IsNotNull(value) && !Tools.IsOnlyWhiteSpace(value);
    },
    /** Break reference of a object or array */
    BreakReference: (object) => {
        if (Tools.IsNull(object) || ['string', 'number', 'boolean', 'function', 'symbol', 'bigint'].includes(typeof object))
            return object;
        return JSON.parse(JSON.stringify(object));
    },
    /** Get properties of an object */
    GetPropertyList: (object) => {
        return Tools.IsNotNull(object) && typeof object === 'object' && !Array.isArray(object)
            ? Object.keys(object)
            : [];
    },
    /** */
    HasProperty: (object, property) => {
        return Tools.GetPropertyList(object).includes(property);
    },
    /** */
    IsBoolean: (object, property = '') => {
        return Tools.IsOnlyWhiteSpace(property)
            ? typeof object === 'boolean'
            : Tools.HasProperty(object, property) && (typeof object[property] === 'boolean');
    },
    /** */
    IsBooleanTrue: (object, property = '') => {
        return Tools.IsOnlyWhiteSpace(property)
            ? Tools.IsBoolean(object) && object === true
            : Tools.HasProperty(object, property) && (typeof object[property] === 'boolean') && object[property] === true;
    },
    /** */
    IsBooleanFalse: (object, property = '') => {
        return Tools.IsOnlyWhiteSpace(property)
            ? Tools.IsBoolean(object) && object === false
            : Tools.HasProperty(object, property) && (typeof object[property] === 'boolean') && object[property] === false;
    },
    /** */
    IsString: (object, property = '') => {
        return Tools.IsOnlyWhiteSpace(property)
            ? typeof object === 'string'
            : Tools.HasProperty(object, property) && (typeof object[property] === 'string');
    },
    /** */
    IsFunction: (object, property = '') => {
        return Tools.IsOnlyWhiteSpace(property)
            ? typeof object === 'function'
            : Tools.HasProperty(object, property) && (typeof object[property] === 'function');
    },
    /** Wait the time indicated */
    Sleep: (milliseconds = 0, transactionName = '') => {
        return new Promise(Resolve => {
            if (Tools.IsNotOnlyWhiteSpace(transactionName)) {
                const transaction = _Transactions.transactions.get(transactionName);
                if (transaction)
                    clearTimeout(transaction);
                _Transactions.transactions.set(transactionName, setTimeout(() => {
                    Resolve();
                    _Transactions.transactions.delete(transactionName);
                }, milliseconds));
            }
            else {
                setTimeout(Resolve, milliseconds);
            }
        });
    },
    GetDefaultIcon(icon) {
        switch (icon) {
            case 'add': return 'iw-plus font-size-20px';
            case 'save': return 'iw-floppy-disk-fill font-size-25px margin-right-3px';
            case 'excel': return 'iw-file-xls-fill font-size-20px';
            case 'cancel': return 'iw-mark font-size-22px';
            case 'import': return 'iw-file-arrow-up-fill font-size-20px';
            case 'delete': return 'iw-trash-can font-size-20px margin-right-3px';
            case 'edit': return 'iw-pen font-size-20px';
            case 'modal': return 'iw-modal-fill font-size-20px';
            case 'navigate': return 'iw-arrow-from-bracket font-size-20px';
            case 'loading': return 'iw-arrows-rotate animation-spin animation-speed-15';
            case 'information': return 'iw-info-circle';
            case 'success': return 'iw-check-circle';
            case 'warning': return 'iw-exclamation-triangle';
            case 'error': return 'iw-exclamation-octagon';
            case 'filter': return 'iw-filter-fill font-size-20px';
            case 'bug': return 'iw-bug-fill font-size-20px';
            case 'back': return 'iw-arrow-from-bracket font-size-25px iw-mirror-Y';
            case 'barcode': return 'iw-barcode font-size-20px';
            case 'location': return 'iw-location font-size-20px';
            case 'material': return 'iw-box-fill font-size-20px';
            default: return icon || '';
        }
    },
    /** Send text to the computer's clipboard */
    Clipboard: (text, message = '', title = 'Copied') => {
        try {
            navigator.clipboard.writeText(text.trim()).then(() => {
                new CoerAlert().Information(message, title, 'iw-clipboard-fill');
            });
        }
        catch {
            new CoerAlert().Warning('Unable to copy to clipboard', 'Quick Implement', 'iw-clipboard-fill');
        }
    },
};

class HTMLElements {
    /**  */
    static _QuerySelector = (selector) => {
        try {
            if (Tools.IsOnlyWhiteSpace(selector))
                return null;
            else if (typeof selector === 'string') {
                return document.querySelector(selector);
            }
            else
                return selector;
        }
        catch (error) {
            console.warn(error);
            return null;
        }
    };
    /** Returns the first element within node's descendants whose ID is elementId. */
    static SelectElementById = (id) => {
        if (!id.startsWith('#'))
            id = `#${id}`;
        return this._QuerySelector(id);
    };
    /** Returns the first element that is a descendant of node that matches selectors */
    static SelectElement = (selector) => {
        return this._QuerySelector(selector);
    };
    /** Returns all element descendants of node that match selectors. */
    static SelectAllElements = (selector) => {
        try {
            return Tools.IsNotOnlyWhiteSpace(selector) ? Array.from(document.querySelectorAll(selector)) : [];
        }
        catch (error) {
            console.warn(error);
            return [];
        }
    };
    /** */
    static ScrollX = (element, x) => {
        const HTML_ELEMENT = this._QuerySelector(element);
        HTML_ELEMENT?.scroll({ top: 0, left: x, behavior: 'smooth' });
        return HTML_ELEMENT;
    };
    /** */
    static ScrollY = (element, y) => {
        const HTML_ELEMENT = this._QuerySelector(element);
        HTML_ELEMENT?.scroll({ top: y, left: 0, behavior: 'smooth' });
        return HTML_ELEMENT;
    };
    /** */
    static ScrollToCoordinates = (element, x, y) => {
        const HTML_ELEMENT = this._QuerySelector(element);
        HTML_ELEMENT?.scroll({ top: y, left: x, behavior: 'smooth' });
        return HTML_ELEMENT;
    };
    /** */
    static ScrollToElement = (element, toView = 'nearest') => {
        const HTML_ELEMENT = this._QuerySelector(element);
        HTML_ELEMENT?.scrollIntoView({ block: toView, behavior: 'smooth' });
        return HTML_ELEMENT;
    };
    /** */
    static GetOffsetTop = (element) => {
        const HTML_ELEMENT = this._QuerySelector(element);
        return HTML_ELEMENT ? HTML_ELEMENT.offsetTop : 0;
    };
    /** */
    static GetCssValue = (element, style) => {
        const HTML_ELEMENT = this._QuerySelector(element);
        return HTML_ELEMENT ? window.getComputedStyle(HTML_ELEMENT).getPropertyValue(style) : '';
    };
    /** Gets the width of the element in px */
    static GetWidth = (element) => {
        const HTML_ELEMENT = this._QuerySelector(element);
        return `${(HTML_ELEMENT && HTML_ELEMENT.offsetWidth) ? HTML_ELEMENT.offsetWidth : 0}px`;
    };
    /** Gets the height of the element in px */
    static GetHeight = (element) => {
        const HTML_ELEMENT = this._QuerySelector(element);
        return `${(HTML_ELEMENT && HTML_ELEMENT.offsetHeight) ? HTML_ELEMENT.offsetHeight : 0}px`;
    };
    /** */
    static HasClass = (element, className) => {
        const HTML_ELEMENT = this._QuerySelector(element);
        return HTML_ELEMENT?.classList?.contains(className) || false;
    };
    /** */
    static AddClass = (element, className) => {
        const HTML_ELEMENT = this._QuerySelector(element);
        if (HTML_ELEMENT) {
            if (!this.HasClass(HTML_ELEMENT, className)) {
                HTML_ELEMENT?.classList?.add(className);
            }
        }
        return HTML_ELEMENT;
    };
    /** */
    static RemoveClass = (element, className) => {
        const HTML_ELEMENT = this._QuerySelector(element);
        if (HTML_ELEMENT) {
            if (this.HasClass(HTML_ELEMENT, className)) {
                HTML_ELEMENT?.classList?.remove(className);
            }
        }
        return HTML_ELEMENT;
    };
    /** */
    static GetChildren = (element) => {
        const HTML_ELEMENT = this._QuerySelector(element);
        return Array.from(HTML_ELEMENT?.children || []);
    };
    /** */
    static GetFather = (element) => {
        const HTML_ELEMENT = this._QuerySelector(element);
        return HTML_ELEMENT ? (HTML_ELEMENT?.parentElement || null) : null;
    };
    /** */
    static OnMouseLeave = (element) => {
        const ELEMENT = this._QuerySelector(element);
        if (ELEMENT) {
            return new Observable(subscriber => {
                const Handle = () => subscriber.next('mouseleave');
                ELEMENT.addEventListener("mouseleave", Handle);
                return () => ELEMENT.removeEventListener("mouseleave", Handle);
            });
        }
        console.warn('Element not found for OnMouseLeave');
        return null;
    };
}
;

class CoerAlert {
    static _alert;
    static _confirm;
    static _transactions = new Set();
    async ngAfterViewInit() {
        while (Tools.IsNull(CoerAlert._alert) || Tools.IsNull(CoerAlert._confirm)) {
            CoerAlert._alert = document.querySelector('#coerAlert');
            CoerAlert._confirm = document.querySelector('#coerConfirm');
            await Tools.Sleep(100);
        }
    }
    /** */
    async Information(message = null, title = null, icon = null, autohide = 3000) {
        while (Tools.IsNull(CoerAlert._alert))
            await Tools.Sleep(100);
        message = Tools.IsNotOnlyWhiteSpace(message) ? message : '';
        title = Tools.IsNotOnlyWhiteSpace(title) ? title : 'Information';
        icon = Tools.GetDefaultIcon(icon || 'iw-info-circle');
        autohide = Tools.IsNotNull(icon) ? autohide : 0;
        return await this._BuildAlert(message, title, icon, autohide, 'background-color-information');
    }
    /** */
    async Success(message = null, title = null, icon = null, autohide = 3000) {
        while (Tools.IsNull(CoerAlert._alert))
            await Tools.Sleep(100);
        message = Tools.IsNotOnlyWhiteSpace(message) ? message : '';
        title = Tools.IsNotOnlyWhiteSpace(title) ? title : 'Success';
        icon = Tools.GetDefaultIcon(icon || 'iw-check-circle');
        autohide = Tools.IsNotNull(icon) ? autohide : 0;
        return await this._BuildAlert(message, title, icon, autohide, 'background-color-success');
    }
    /** */
    async Warning(message = null, title = null, icon = null, autohide = 3000) {
        while (Tools.IsNull(CoerAlert._alert))
            await Tools.Sleep(100);
        message = Tools.IsNotOnlyWhiteSpace(message) ? message : '';
        title = Tools.IsNotOnlyWhiteSpace(title) ? title : 'Warning';
        icon = Tools.GetDefaultIcon(icon || 'iw-exclamation-triangle');
        autohide = Tools.IsNotNull(icon) ? autohide : 0;
        return await this._BuildAlert(message, title, icon, autohide, 'background-color-warning');
    }
    /** */
    async Danger(message = null, title = null, icon = null, autohide = 3000) {
        while (Tools.IsNull(CoerAlert._alert))
            await Tools.Sleep(100);
        message = Tools.IsNotOnlyWhiteSpace(message) ? message : '';
        title = Tools.IsNotOnlyWhiteSpace(title) ? title : 'Error';
        icon = Tools.GetDefaultIcon(icon || 'iw-exclamation-octagon');
        autohide = Tools.IsNotNull(icon) ? autohide : 0;
        return await this._BuildAlert(message, title, icon, autohide, 'background-color-danger');
    }
    /** */
    CloseAlert(alert) {
        if (CoerAlert._alert.contains(alert)) {
            HTMLElements.RemoveClass(alert, 'background-color-information');
            HTMLElements.RemoveClass(alert, 'background-color-success');
            HTMLElements.RemoveClass(alert, 'background-color-warning');
            HTMLElements.RemoveClass(alert, 'background-color-danger');
            alert.removeEventListener('mouseenter', alert.StopAutohide);
            alert.removeEventListener('mouseleave', alert.StartAutohide);
            Tools.Sleep(500).then(() => CoerAlert._alert.removeChild(alert));
        }
    }
    /** */
    CloseAllAlerts() {
        HTMLElements.SelectAllElements('aside#coerAlert > div.coer-alert').forEach(alert => this.CloseAlert(alert));
    }
    /** */
    async _BuildAlert(message, title, icon, autohide, backround) {
        const id = Tools.GetGuid('coer-alert');
        const COER_ALERT = document.createElement('div');
        COER_ALERT.className = 'coer-alert alert-hidden';
        COER_ALERT.setAttribute('id', id);
        const HEADER = document.createElement('div');
        HEADER.className = 'coer-alert-header';
        const HEADER_TITLE = document.createElement('div');
        HEADER_TITLE.className = 'coer-alert-header-title';
        const ICON = document.createElement('i');
        ICON.className = icon;
        HEADER_TITLE.appendChild(ICON);
        const TITLE = document.createElement('b');
        TITLE.textContent = title;
        HEADER_TITLE.appendChild(TITLE);
        const BUTTON = document.createElement('button');
        BUTTON.type = 'button';
        BUTTON.className = 'iw-mark';
        BUTTON.onclick = () => this.CloseAlert(COER_ALERT);
        HEADER.appendChild(HEADER_TITLE);
        HEADER.appendChild(BUTTON);
        const BODY = document.createElement('div');
        BODY.className = 'coer-alert-body';
        const PRE = document.createElement('pre');
        PRE.innerHTML = message;
        BODY.appendChild(PRE);
        COER_ALERT.appendChild(HEADER);
        COER_ALERT.appendChild(BODY);
        CoerAlert._alert.appendChild(COER_ALERT);
        await Tools.Sleep();
        HTMLElements.ScrollToElement(COER_ALERT);
        HTMLElements.RemoveClass(COER_ALERT, 'alert-hidden');
        HTMLElements.AddClass(COER_ALERT, backround);
        //Autohide
        let autohideRef$;
        COER_ALERT.StartAutohide = () => {
            if (autohide > 0) {
                autohide = autohide >= 1000 ? autohide : 1000;
                autohideRef$ = setTimeout(() => this.CloseAlert(COER_ALERT), autohide);
            }
        };
        COER_ALERT.StopAutohide = () => clearTimeout(autohideRef$);
        //Events
        COER_ALERT.addEventListener('mouseenter', COER_ALERT.StopAutohide);
        COER_ALERT.addEventListener('mouseleave', COER_ALERT.StartAutohide);
        COER_ALERT.StartAutohide();
        return COER_ALERT;
    }
    /** */
    async InformationOk(message = null, icon = null) {
        return await this._ConfirmInformation(message, icon, true);
    }
    /** */
    async SuccessOk(message = null, icon = null) {
        return await this._ConfirmSuccess(message, icon, true);
    }
    /** */
    async WarningOk(message = null, icon = null) {
        return await this._ConfirmWarning(message, icon, true);
    }
    /** */
    async DangerOk(message = null, icon = null) {
        return await this._ConfirmDanger(message, icon, true);
    }
    /** */
    async InformationConfirm(message = null, icon = null) {
        return await this._ConfirmInformation(message, icon, false);
    }
    /** */
    async SuccessConfirm(message = null, icon = null) {
        return await this._ConfirmSuccess(message, icon, false);
    }
    /** */
    async WarningConfirm(message = null, icon = null) {
        return await this._ConfirmWarning(message, icon, false);
    }
    /** */
    async DangerConfirm(message = null, icon = null) {
        return await this._ConfirmDanger(message, icon, false);
    }
    /** */
    async _ConfirmInformation(message = null, icon = null, onlyInformation = false) {
        while (Tools.IsNull(CoerAlert._confirm))
            await Tools.Sleep(100);
        message = Tools.IsNotOnlyWhiteSpace(message) ? message : 'Confirm action';
        icon = Tools.GetDefaultIcon(icon || 'iw-info-circle');
        return await this._BuildConfirm(message, icon, onlyInformation, 'information');
    }
    /** */
    async _ConfirmSuccess(message = null, icon = null, onlyInformation = false) {
        while (Tools.IsNull(CoerAlert._confirm))
            await Tools.Sleep(100);
        message = Tools.IsNotOnlyWhiteSpace(message) ? message : 'Confirm action';
        icon = Tools.GetDefaultIcon(icon || 'iw-check-circle');
        return await this._BuildConfirm(message, icon, onlyInformation, 'success');
    }
    /** */
    async _ConfirmWarning(message = null, icon = null, onlyInformation = false) {
        while (Tools.IsNull(CoerAlert._confirm))
            await Tools.Sleep(100);
        message = Tools.IsNotOnlyWhiteSpace(message) ? message : 'Confirm action';
        icon = Tools.GetDefaultIcon(icon || 'iw-exclamation-triangle');
        return await this._BuildConfirm(message, icon, onlyInformation, 'warning');
    }
    /** */
    async _ConfirmDanger(message = null, icon = null, onlyInformation = false) {
        while (Tools.IsNull(CoerAlert._confirm))
            await Tools.Sleep(100);
        message = Tools.IsNotOnlyWhiteSpace(message) ? message : 'Confirm action';
        icon = Tools.GetDefaultIcon(icon || 'iw-exclamation-octagon');
        return await this._BuildConfirm(message, icon, onlyInformation, 'danger');
    }
    /**  */
    async _BuildConfirm(message, icon, onlyInformation, backround) {
        CoerAlert._confirm.style.position = 'fixed';
        CoerAlert._confirm.style.backgroundColor = 'var(--backdrop)';
        CoerAlert._confirm.style.backdropFilter = 'blur(1.5px)';
        CoerAlert._confirm.style.zIndex = '2999';
        const id = Tools.GetGuid('coer-alert');
        const COER_CONFIRM = document.createElement('div');
        COER_CONFIRM.className = `coer-confirm ${backround}`;
        COER_CONFIRM.setAttribute('id', id);
        CoerAlert._transactions.add(id);
        //Header
        const HEADER = document.createElement('header');
        const ICON = document.createElement('i');
        ICON.className = icon;
        HEADER.appendChild(ICON);
        COER_CONFIRM.appendChild(HEADER);
        //Section
        const SECTION = document.createElement('section');
        SECTION.innerHTML = `<p>${message}</p>`;
        SECTION.style.paddingTop = '20px';
        SECTION.style.paddingLeft = '20px';
        SECTION.style.paddingRight = '20px';
        SECTION.style.textAlign = 'center';
        COER_CONFIRM.appendChild(SECTION);
        //Footer
        let response = null;
        const FOOTER = document.createElement('footer');
        const BUTTON_OK = document.createElement('button');
        const BUTTON_CONFIRM = document.createElement('button');
        const BUTTON_REJECT = document.createElement('button');
        if (onlyInformation) {
            BUTTON_OK.type = 'button';
            BUTTON_OK.innerText = 'OK';
            BUTTON_OK.onclick = () => (response = true);
            FOOTER.appendChild(BUTTON_OK);
        }
        else {
            BUTTON_CONFIRM.type = 'button';
            BUTTON_CONFIRM.innerText = 'YES';
            BUTTON_CONFIRM.onclick = () => (response = true);
            BUTTON_REJECT.type = 'button';
            BUTTON_REJECT.innerText = 'NO';
            BUTTON_REJECT.onclick = () => (response = false);
            FOOTER.appendChild(BUTTON_CONFIRM);
            FOOTER.appendChild(BUTTON_REJECT);
        }
        COER_CONFIRM.appendChild(FOOTER);
        //Build
        CoerAlert._confirm.appendChild(COER_CONFIRM);
        await Tools.Sleep();
        COER_CONFIRM.style.transform = 'scale(1)';
        //Wait
        while (response === null)
            await Tools.Sleep(100);
        COER_CONFIRM.style.transform = 'scale(0)';
        BUTTON_CONFIRM.style.display = 'none';
        BUTTON_REJECT.style.display = 'none';
        BUTTON_OK.style.display = 'none';
        CoerAlert._transactions.delete(id);
        Tools.Sleep(400).then(() => {
            if (CoerAlert._transactions.size <= 0) {
                CoerAlert._confirm.style.position = 'initial';
                CoerAlert._confirm.style.backgroundColor = 'transparent';
                CoerAlert._confirm.style.backdropFilter = 'blur(0px)';
                CoerAlert._confirm.style.zIndex = '1';
            }
            CoerAlert._confirm.removeChild(COER_CONFIRM);
        });
        return response;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: CoerAlert, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.17", type: CoerAlert, isStandalone: true, selector: "coer-alert", ngImport: i0, template: "<aside id=\"coerAlert\" class=\"coer-alert\"></aside>\r\n<aside id=\"coerConfirm\" class=\"coer-confirm\"></aside>", styles: ["aside.coer-alert{position:fixed!important;gap:10px!important;padding:10px 10px 0!important;right:0!important;bottom:0!important;max-height:calc(100vh - 60px)!important;overflow-x:visible!important;overflow-Y:auto!important;max-width:calc(100% - 20px)!important;z-index:3000}@media(min-width:0)and (max-width:499px){aside.coer-alert{width:calc(100% - 20px)!important}}aside.coer-alert div.coer-alert{cursor:default!important;border-radius:10px!important;color:var(--light)!important;min-width:300px!important;margin:10px 0!important;max-width:400px;opacity:100%;transition:all .5s ease-in-out!important}aside.coer-alert div.coer-alert div.coer-alert-header{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:5px!important;height:20px!important;max-height:20px!important;padding:10px!important;font-size:17px!important;font-weight:700!important;white-space:nowrap!important;width:calc(100% - 20px)!important;border-radius:inherit!important}aside.coer-alert div.coer-alert div.coer-alert-header div.coer-alert-header-title{width:inherit!important;display:inherit!important;align-items:inherit!important;gap:inherit!important}aside.coer-alert div.coer-alert div.coer-alert-header div.coer-alert-header-title i{font-size:18px!important}aside.coer-alert div.coer-alert div.coer-alert-header div.coer-alert-header-title b{width:inherit!important;overflow:hidden!important;text-overflow:ellipsis!important}aside.coer-alert div.coer-alert div.coer-alert-header button{color:inherit!important;cursor:pointer!important;font-size:20px!important}aside.coer-alert div.coer-alert div.coer-alert-body{min-height:20px!important;padding:10px!important;border-top:2px solid var(--light)!important;transition:all .5s ease-in-out!important}aside.coer-alert div.coer-alert div.coer-alert-body pre{white-space:pre-line!important;word-break:break-all!important}aside.coer-alert div.coer-alert.background-color-information:hover,aside.coer-alert div.coer-alert.background-color-success:hover,aside.coer-alert div.coer-alert.background-color-warning:hover,aside.coer-alert div.coer-alert.background-color-danger:hover{box-shadow:0 0 7px 1px var(--gray)!important;transform:scale(1.01)!important}aside.coer-alert div.coer-alert.background-color-warning{color:var(--dark)!important}aside.coer-alert div.coer-alert.background-color-warning div.coer-alert-body{border-color:var(--dark)!important}aside.coer-alert .alert-hidden{opacity:0%!important}aside.coer-confirm{inset:0!important;display:flex!important;align-items:top!important;justify-content:center!important;background-color:transparent;z-index:1}aside.coer-confirm div.coer-confirm{position:absolute!important;display:grid!important;grid-template-rows:150px 1fr 80px!important;background-color:var(--light)!important;border-radius:10px!important;min-width:300px!important;transform:scale(0);transition:transform .5s ease-in-out!important;margin-top:25px!important}@media(min-width:499px){aside.coer-confirm div.coer-confirm{width:400px!important;margin-top:50px!important}}aside.coer-confirm div.coer-confirm header{border-radius:10px 10px 0 0!important;display:flex!important;align-items:flex-end!important;justify-content:center!important}aside.coer-confirm div.coer-confirm header i{font-size:100px!important}aside.coer-confirm div.coer-confirm section{display:flex!important;align-items:center!important;justify-content:center!important;font-size:25px!important;min-height:20px!important;word-break:break-word!important}aside.coer-confirm div.coer-confirm footer{border-radius:0 0 10px 10px!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:10px!important}aside.coer-confirm div.coer-confirm footer button{border:none!important;border-radius:5px!important;width:100px!important;height:35px!important;font-weight:700!important;cursor:pointer!important;-webkit-user-select:none!important;user-select:none!important}aside.coer-confirm div.coer-confirm.information header i{color:var(--information)!important}aside.coer-confirm div.coer-confirm.information footer button{background-color:var(--information)!important;color:var(--light)!important}aside.coer-confirm div.coer-confirm.success header i{color:var(--success)!important}aside.coer-confirm div.coer-confirm.success footer button{background-color:var(--success)!important;color:var(--light)!important}aside.coer-confirm div.coer-confirm.warning header i{color:var(--warning)!important}aside.coer-confirm div.coer-confirm.warning footer button{background-color:var(--warning)!important;color:var(--dark)!important}aside.coer-confirm div.coer-confirm.danger header i{color:var(--danger)!important}aside.coer-confirm div.coer-confirm.danger footer button{background-color:var(--danger)!important;color:var(--light)!important}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: CoerAlert, decorators: [{
            type: Component,
            args: [{ selector: 'coer-alert', standalone: true, template: "<aside id=\"coerAlert\" class=\"coer-alert\"></aside>\r\n<aside id=\"coerConfirm\" class=\"coer-confirm\"></aside>", styles: ["aside.coer-alert{position:fixed!important;gap:10px!important;padding:10px 10px 0!important;right:0!important;bottom:0!important;max-height:calc(100vh - 60px)!important;overflow-x:visible!important;overflow-Y:auto!important;max-width:calc(100% - 20px)!important;z-index:3000}@media(min-width:0)and (max-width:499px){aside.coer-alert{width:calc(100% - 20px)!important}}aside.coer-alert div.coer-alert{cursor:default!important;border-radius:10px!important;color:var(--light)!important;min-width:300px!important;margin:10px 0!important;max-width:400px;opacity:100%;transition:all .5s ease-in-out!important}aside.coer-alert div.coer-alert div.coer-alert-header{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:5px!important;height:20px!important;max-height:20px!important;padding:10px!important;font-size:17px!important;font-weight:700!important;white-space:nowrap!important;width:calc(100% - 20px)!important;border-radius:inherit!important}aside.coer-alert div.coer-alert div.coer-alert-header div.coer-alert-header-title{width:inherit!important;display:inherit!important;align-items:inherit!important;gap:inherit!important}aside.coer-alert div.coer-alert div.coer-alert-header div.coer-alert-header-title i{font-size:18px!important}aside.coer-alert div.coer-alert div.coer-alert-header div.coer-alert-header-title b{width:inherit!important;overflow:hidden!important;text-overflow:ellipsis!important}aside.coer-alert div.coer-alert div.coer-alert-header button{color:inherit!important;cursor:pointer!important;font-size:20px!important}aside.coer-alert div.coer-alert div.coer-alert-body{min-height:20px!important;padding:10px!important;border-top:2px solid var(--light)!important;transition:all .5s ease-in-out!important}aside.coer-alert div.coer-alert div.coer-alert-body pre{white-space:pre-line!important;word-break:break-all!important}aside.coer-alert div.coer-alert.background-color-information:hover,aside.coer-alert div.coer-alert.background-color-success:hover,aside.coer-alert div.coer-alert.background-color-warning:hover,aside.coer-alert div.coer-alert.background-color-danger:hover{box-shadow:0 0 7px 1px var(--gray)!important;transform:scale(1.01)!important}aside.coer-alert div.coer-alert.background-color-warning{color:var(--dark)!important}aside.coer-alert div.coer-alert.background-color-warning div.coer-alert-body{border-color:var(--dark)!important}aside.coer-alert .alert-hidden{opacity:0%!important}aside.coer-confirm{inset:0!important;display:flex!important;align-items:top!important;justify-content:center!important;background-color:transparent;z-index:1}aside.coer-confirm div.coer-confirm{position:absolute!important;display:grid!important;grid-template-rows:150px 1fr 80px!important;background-color:var(--light)!important;border-radius:10px!important;min-width:300px!important;transform:scale(0);transition:transform .5s ease-in-out!important;margin-top:25px!important}@media(min-width:499px){aside.coer-confirm div.coer-confirm{width:400px!important;margin-top:50px!important}}aside.coer-confirm div.coer-confirm header{border-radius:10px 10px 0 0!important;display:flex!important;align-items:flex-end!important;justify-content:center!important}aside.coer-confirm div.coer-confirm header i{font-size:100px!important}aside.coer-confirm div.coer-confirm section{display:flex!important;align-items:center!important;justify-content:center!important;font-size:25px!important;min-height:20px!important;word-break:break-word!important}aside.coer-confirm div.coer-confirm footer{border-radius:0 0 10px 10px!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:10px!important}aside.coer-confirm div.coer-confirm footer button{border:none!important;border-radius:5px!important;width:100px!important;height:35px!important;font-weight:700!important;cursor:pointer!important;-webkit-user-select:none!important;user-select:none!important}aside.coer-confirm div.coer-confirm.information header i{color:var(--information)!important}aside.coer-confirm div.coer-confirm.information footer button{background-color:var(--information)!important;color:var(--light)!important}aside.coer-confirm div.coer-confirm.success header i{color:var(--success)!important}aside.coer-confirm div.coer-confirm.success footer button{background-color:var(--success)!important;color:var(--light)!important}aside.coer-confirm div.coer-confirm.warning header i{color:var(--warning)!important}aside.coer-confirm div.coer-confirm.warning footer button{background-color:var(--warning)!important;color:var(--dark)!important}aside.coer-confirm div.coer-confirm.danger header i{color:var(--danger)!important}aside.coer-confirm div.coer-confirm.danger footer button{background-color:var(--danger)!important;color:var(--light)!important}\n"] }]
        }] });

class Numbers {
    /** */
    static IsNumber(value, validType = false) {
        return !Number.isNaN(Number(value)) && (validType ? ['number', 'bigint'].includes(typeof value) : true);
    }
    /** */
    static IsNotNumber(value) {
        return !this.IsNumber(value);
    }
    /** */
    static SetDecimals(value, decimals = 2) {
        if (typeof value === 'string')
            value = Number(value);
        if (this.IsNotNumber(value))
            return '0';
        let valueInteger = '';
        let valueDecimal = '';
        value = String(value);
        if (value.includes('.') || (decimals > 0)) {
            valueInteger = value.includes('.') ? value.split('.')[0] : value;
            if (decimals > 0) {
                valueDecimal = value.includes('.') ? value.split('.')[1] : '';
                for (let i = 0; i < decimals; i++)
                    valueDecimal += '0';
                valueDecimal = valueDecimal.substring(0, decimals);
                valueDecimal = `.${valueDecimal}`;
            }
        }
        else {
            valueInteger = value;
        }
        return `${valueInteger}${valueDecimal}`;
    }
    /** */
    static ToNumericFormat(value, decimals = 0) {
        const [INTEGER, DECIMAL = ''] = this.SetDecimals(value).split('.');
        return decimals > 0
            ? `${INTEGER.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${DECIMAL}`
            : INTEGER.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    /** */
    static ToCurrency(value, currency = '', currencyCode = '') {
        if (currency.length <= 0)
            currency = appSettings?.region?.currency || '$';
        return `${currency}${this.ToNumericFormat(value, 2)}${currencyCode.length > 0 ? ` ${currencyCode}` : ''}`;
    }
}

class Strings {
    /** Sets the first character to lowercase */
    static FirstCharToLower(value) {
        return (Tools.IsNotOnlyWhiteSpace(value))
            ? String(value).charAt(0).toLowerCase() + String(value).slice(1)
            : '';
    }
    /** Sets the first character to uppercase */
    static FirstCharToUpper(value) {
        return (Tools.IsNotOnlyWhiteSpace(value))
            ? String(value).charAt(0).toUpperCase() + String(value).slice(1)
            : '';
    }
    /** Clean extra whitespaces */
    static CleanUpBlanks(value) {
        return value && Tools.IsNotOnlyWhiteSpace(value)
            ? String(value).replace(/\s+/g, ' ').trim()
            : '';
    }
    /** Apply title formatting */
    static ToTitle(value) {
        return (Tools.IsNotOnlyWhiteSpace(value))
            ? String(value).split(' ').filter(x => x.length > 0).map(x => Strings.FirstCharToUpper(x.toLowerCase())).join(' ')
            : '';
    }
    /** Removes the last character */
    static RemoveLastChar(value) {
        return Tools.IsNotOnlyWhiteSpace(value)
            ? String(value).trimEnd().slice(0, -1)
            : '';
    }
    /** Removes accents */
    static RemoveAccents(value, except = []) {
        if (Tools.IsOnlyWhiteSpace(value))
            return '';
        if (except.length > 0) {
            let index = 0;
            const mapValue = new Map();
            for (const char of String(value)) {
                mapValue.set(index++, char);
            }
            index = 0;
            const mapNormalize = new Map();
            for (const char of String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '')) {
                mapNormalize.set(index++, char);
            }
            for (const char of except) {
                for (const [index, value] of mapValue.entries()) {
                    if (value === char) {
                        mapNormalize.set(index, char);
                    }
                }
            }
            return Array.from(mapNormalize.values()).join('');
        }
        else {
            return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }
    }
    /** Removes special characters */
    static RemoveSpecialCharacters(value) {
        return (Tools.IsNotOnlyWhiteSpace(value))
            ? String(value).replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]/g, '') : '';
    }
    /** Only Alphanumeric */
    static OnlyAlphanumeric(value) {
        return (Tools.IsNotOnlyWhiteSpace(value))
            ? String(value).replace(/[^a-zA-Z0-9\s]/g, '') : '';
    }
    /** Only Alphanumeric */
    static OnlyNumbers(value) {
        return (Tools.IsNotOnlyWhiteSpace(value))
            ? String(value).replace(/[^0-9.]/g, '') : '';
    }
    /** Validates if both strings are equal */
    static Equals(value, value2, sensitive = false) {
        if (typeof value === null && typeof value2 === null)
            return true;
        if (typeof value === 'undefined' && typeof value2 === 'undefined')
            return true;
        if (typeof value === 'string' && typeof value2 === 'string') {
            if (!sensitive) {
                value = value.toUpperCase();
                value2 = value2.toUpperCase();
            }
            return value.length === value2.length
                && value === value2;
        }
        return false;
    }
    /**  */
    static ConcatName(...args) {
        return args.map(Strings.CleanUpBlanks).filter(Tools.IsNotOnlyWhiteSpace).join(' ');
    }
}

class Dates {
    static MONTHS = new Map([
        [1, 'Jan'], [2, 'Feb'], [3, 'Mar'], [4, 'Apr'], [5, 'May'], [6, 'Jun'],
        [7, 'Jul'], [8, 'Aug'], [9, 'Sep'], [10, 'Oct'], [11, 'Nov'], [12, 'Dec'],
    ]);
    /** */
    static GetOffset() {
        return -(new Date().getTimezoneOffset());
    }
    /** */
    static IsValidDate(date) {
        return !isNaN(new Date(date).getTime());
    }
    /** */
    static ToDate(date) {
        if (Tools.IsOnlyWhiteSpace(date))
            return null;
        if (typeof date === 'string') {
            if (this.IsValidDate(date)) {
                return /\b([01]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?\b/.test(date)
                    ? new Date(date) : new Date(`${date} 00:00:00`);
            }
            else {
                date = Strings.CleanUpBlanks(date.replace(/(?:at|AT|t|T)/g, ' '));
                date = /\b([01]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?\b/.test(date) ? new Date(date) : new Date(`${date} 00:00:00`);
                return this.IsValidDate(date) ? date : null;
            }
        }
        else
            return date;
    }
    /** */
    static GetLastDayOfMonth(date) {
        const DATE = this.ToDate(date);
        return Tools.IsNotNull(DATE) ?
            new Date(DATE.getFullYear(), DATE.getMonth() + 1, 0).getDate()
            : -1;
    }
    /** */
    static GetCurrentDate() {
        return new Date();
    }
    /** */
    static GetCurrentUTCDate() {
        return this.AddHours(new Date(), -(this.GetOffset() / 60));
    }
    /** */
    static ToLocalZone(utcDate) {
        const DATE = this.ToDate(utcDate);
        return Tools.IsNotNull(DATE)
            ? new Date(new Date(utcDate).getTime() + this.GetOffset() * 60000)
            : null;
    }
    /** */
    static ToUTC(date) {
        const DATE = this.ToDate(date);
        return Tools.IsNotNull(DATE)
            ? new Date(new Date(date).getTime() - this.GetOffset() * 60000)
            : null;
    }
    /** YYYY-MM-DD HH:mm:ss */
    static ToFormatDB(date) {
        const DATE = this.ToDate(date);
        if (Tools.IsNull(DATE))
            return '';
        return `${DATE.getFullYear()}` + '-'
            + `${DATE.getMonth() + 1}`.padStart(2, '0') + '-'
            + `${DATE.getDate()}`.padStart(2, '0') + ' '
            + `${DATE.getHours()}`.padStart(2, '0') + ':'
            + `${DATE.getMinutes()}`.padStart(2, '0') + ':'
            + `${DATE.getSeconds()}`.padStart(2, '0');
    }
    /** MMM DD, YYYY */
    static ToFormatDateMDY(date) {
        const DATE = this.ToDate(date);
        if (Tools.IsNull(DATE))
            return '';
        return `${this.MONTHS.get(DATE.getMonth() + 1)}` + ' '
            + `${DATE.getDate()}`.padStart(2, '0') + ', '
            + `${DATE.getFullYear()}`;
    }
    /** DD MMM YYYY */
    static ToFormatDateDMY(date) {
        const DATE = this.ToDate(date);
        if (Tools.IsNull(DATE))
            return '';
        return `${DATE.getDate()}`.padStart(2, '0') + ' '
            + `${this.MONTHS.get(DATE.getMonth() + 1)}` + ' '
            + `${DATE.getFullYear()}`;
    }
    /** */
    static ToFormatDate(date, format) {
        const DATE = this.ToDate(date);
        if (Tools.IsNull(DATE))
            return '';
        if (Tools.IsOnlyWhiteSpace(format)) {
            format = Tools.IsNotNull(appSettings)
                && Tools.IsNotNull(appSettings?.region?.dateTime)
                && Tools.IsNotOnlyWhiteSpace(appSettings?.region?.dateTime)
                ? appSettings?.region?.dateTime : 'MDY';
        }
        if (format == 'DMY')
            return this.ToFormatDateDMY(date);
        else
            return this.ToFormatDateMDY(date);
    }
    /** YYYY-MM-DD */
    static ToDateOnly(date) {
        const DATE = this.ToDate(date);
        if (Tools.IsNull(DATE))
            return '';
        return `${DATE.getFullYear()}` + '-'
            + `${DATE.getMonth() + 1}`.padStart(2, '0') + '-'
            + `${DATE.getDate()}`.padStart(2, '0');
    }
    /** */
    static ToFormatTime(date, ampm = false) {
        const DATE = this.ToDate(date);
        if (Tools.IsNull(DATE))
            return '';
        if (ampm) {
            let hours = DATE.getHours();
            const AM_PM = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours === 0 ? 12 : hours;
            return `${hours}`.padStart(2, '0') + ':'
                + `${DATE.getMinutes()}`.padStart(2, '0') + ' '
                + `${AM_PM}`;
        }
        else {
            return `${DATE.getHours()}`.padStart(2, '0') + ':'
                + `${DATE.getMinutes()}`.padStart(2, '0');
        }
    }
    /** */
    static ToFormatDateTime(date, ampm = false, format) {
        return Tools.IsNotOnlyWhiteSpace(date)
            ? (this.ToFormatDate(date, format) + ' at ' + this.ToFormatTime(date, ampm))
            : '';
    }
    /** */
    static AddMilliseconds(date, milliseconds) {
        return new Date(this.ToDate(date).getTime() + milliseconds);
    }
    /** */
    static AddSeconds(date, seconds = 1) {
        return this.AddMilliseconds(date, seconds * 1000);
    }
    /** */
    static AddMinutes(date, minutes = 1) {
        return this.AddMilliseconds(date, minutes * 60 * 1000);
    }
    /** */
    static AddHours(date, hours = 1) {
        return this.AddMilliseconds(date, hours * 60 * 60 * 1000);
    }
    /** Add days */
    static AddDays(date, days = 1) {
        return this.AddMilliseconds(date, days * 24 * 60 * 60 * 1000);
    }
    /** Add weeks */
    static AddWeeks(date, weeks = 1) {
        return this.AddMilliseconds(date, weeks * 7 * 24 * 60 * 60 * 1000);
    }
    /** Add months */
    static AddMonths(date, months = 1) {
        const DATE = this.ToDate(date);
        const DATE_UPDATED = new Date(DATE.getFullYear(), (DATE.getMonth() + months), 1);
        DATE_UPDATED.setDate(Math.min(DATE.getDate(), new Date(DATE_UPDATED.getFullYear(), (DATE_UPDATED.getMonth() + 1), 0).getDate()));
        DATE_UPDATED.setHours(DATE.getHours(), DATE.getMinutes(), DATE.getSeconds(), DATE.getMilliseconds());
        return DATE_UPDATED;
    }
    /** Add years */
    static AddYears(date, years = 1) {
        const DATE = this.ToDate(date);
        const DATE_UPDATED = new Date((DATE.getFullYear() + years), DATE.getMonth(), 1);
        DATE_UPDATED.setDate(Math.min(DATE.getDate(), new Date(DATE_UPDATED.getFullYear(), DATE_UPDATED.getMonth() + 1, 0).getDate()));
        DATE_UPDATED.setHours(DATE.getHours(), DATE.getMinutes(), DATE.getSeconds(), DATE.getMilliseconds());
        return DATE_UPDATED;
    }
    /** */
    static SetMillisecond(date, millisecond = 0) {
        const DATE = this.ToDate(date);
        if (millisecond < 0 || millisecond >= 1000) {
            millisecond = DATE.getMilliseconds();
        }
        DATE.setMilliseconds(millisecond);
        return DATE;
    }
    /** */
    static SetSecond(date, second = 0) {
        const DATE = this.ToDate(date);
        if (second < 0 || second >= 60) {
            second = DATE.getSeconds();
        }
        DATE.setSeconds(second);
        return DATE;
    }
    /** */
    static SetMinute(date, minute = 0) {
        const DATE = this.ToDate(date);
        if (minute < 0 || minute >= 60) {
            minute = DATE.getMinutes();
        }
        DATE.setMinutes(minute, DATE.getSeconds());
        return DATE;
    }
    /** */
    static SetHour(date, hour = 0) {
        const DATE = this.ToDate(date);
        if (hour < 0 || hour >= 24) {
            hour = DATE.getHours();
        }
        DATE.setHours(hour, DATE.getMinutes(), DATE.getSeconds());
        return DATE;
    }
    /** Set 00:00:00 */
    static SetFirstHour(date) {
        const DATE = this.ToDate(date);
        DATE.setHours(0, 0, 0);
        return DATE;
    }
    /** Set 23:59:59 */
    static SetLastHour(date) {
        const DATE = this.ToDate(date);
        DATE.setHours(23, 59, 59);
        return DATE;
    }
    /** */
    static SetDay(date, day = 1) {
        const DATE = this.ToDate(date);
        if (day < 1 || day > this.GetLastDayOfMonth(DATE)) {
            day = DATE.getDate();
        }
        DATE.setDate(day);
        return DATE;
    }
    /** */
    static SetFirstDay(date) {
        return this.SetDay(date, 1);
    }
    /**  */
    static SetLastDay(date) {
        return this.SetDay(date, this.GetLastDayOfMonth(date));
    }
    /** */
    static GetDiffNow(date, unit = 'minutes', isUTC = true) {
        return this.GetDiff((isUTC ? this.GetCurrentUTCDate() : this.GetCurrentDate()), date, unit);
    }
    /** */
    static GetDiff(fromDate, toDate, unit = 'minutes') {
        switch (unit) {
            case 'milliseconds': return Number(Numbers.SetDecimals(this.ToDate(fromDate).getTime() - this.ToDate(toDate).getTime(), 0));
            case 'seconds': return Number(Numbers.SetDecimals((this.ToDate(fromDate).getTime() - this.ToDate(toDate).getTime()) / 1000, 0));
            case 'minutes': return Number(Numbers.SetDecimals((this.ToDate(fromDate).getTime() - this.ToDate(toDate).getTime()) / (1000 * 60), 0));
            case 'hours': return Number(Numbers.SetDecimals((this.ToDate(fromDate).getTime() - this.ToDate(toDate).getTime()) / (1000 * 60 * 60), 0));
            case 'days': return Number(Numbers.SetDecimals((this.ToDate(fromDate).getTime() - this.ToDate(toDate).getTime()) / (1000 * 60 * 60 * 24), 0));
        }
    }
    /** HH:mm:ss */
    static GetTimeSpan(date) {
        const DATE = this.ToDate(date);
        if (Tools.IsNull(DATE))
            return '';
        return `${DATE.getHours()}`.padStart(2, '0') + ':'
            + `${DATE.getMinutes()}`.padStart(2, '0') + ':'
            + `${DATE.getSeconds()}`.padStart(2, '0');
    }
}

/** Controls user information in localStorage */
class Access {
    static useJWT = Tools.IsBooleanTrue(appSettings?.security?.useJWT);
    static storage = (appSettings?.appInfo?.project).replaceAll(' ', '') || 'coer91';
    /** */
    static SetUser(user) {
        if (user && !Tools.IsString(user) && user.hasOwnProperty('message')) {
            const _user = Object.assign({}, user);
            delete _user['message'];
            localStorage.setItem(this.storage, JSON.stringify({ user: _user }));
        }
        else {
            localStorage.setItem(this.storage, JSON.stringify({ user }));
        }
    }
    /** */
    static GetUser() {
        if (this.useJWT) {
            const JWT = Access.GetJWTInfo();
            if (JWT.claims?.hasOwnProperty('User')) {
                return {
                    UserId: Number(JWT.claims?.UserId || 0),
                    User: String(JWT.claims?.User || ''),
                    DepartmentId: Number(JWT.claims?.DepartmentId || 0),
                    Department: String(JWT.claims?.Department || ''),
                    PartnerId: Number(JWT.claims?.partnerId || 0),
                    Partner: String(JWT.claims?.Partner || ''),
                    FullName: String(JWT.claims?.FullName || ''),
                    Email: String(JWT.claims?.Email || ''),
                    Factory: String(JWT.claims?.Factory || ''),
                    Language: String(JWT.claims?.Language || ''),
                    JWT: JWT.jwt,
                    Roles: String(JWT.claims?.Roles || '').replaceAll('[', '').replaceAll(']', '').split(','),
                };
            }
        }
        else {
            let storage = localStorage.getItem(this.storage);
            if (storage) {
                storage = JSON.parse(storage);
                if (storage.hasOwnProperty('user')) {
                    return storage.user;
                }
            }
        }
        return null;
    }
    /** */
    static RememberUser() {
        if (this.useJWT) {
            const CLAIMS = Access.GetJWTInfo().claims;
            if (CLAIMS.hasOwnProperty('User')) {
                return String(CLAIMS?.User || '');
            }
        }
        let storage = localStorage.getItem(this.storage);
        if (storage) {
            storage = JSON.parse(storage);
            if (storage.hasOwnProperty('user')) {
                return Tools.IsString(storage.user)
                    && (String(storage.user).length <= 50)
                    ? storage.user
                    : (storage.user?.user || '');
            }
        }
        return '';
    }
    /** */
    static IsLogin() {
        if (this.useJWT) {
            const JWT = Access.GetJWTInfo();
            return Tools.IsNotOnlyWhiteSpace(JWT.claims?.User)
                && Tools.IsNotOnlyWhiteSpace(JWT.claims?.ExpirationDate)
                && JWT.minutes > 0;
        }
        else {
            const user = Access.GetUser();
            return Tools.IsNotNull(user)
                && Tools.IsNotOnlyWhiteSpace(user?.User);
        }
    }
    /** */
    static LogOut(userSIGNAL) {
        userSIGNAL.set(null);
        const user = this.useJWT
            ? Access.GetJWTInfo()?.claims?.User || ''
            : Access.GetUser()?.User || '';
        sessionStorage.removeItem(this.storage);
        localStorage.removeItem(this.storage);
        localStorage.setItem(this.storage, JSON.stringify({ user }));
        if (document.location.href.includes('#')) {
            document.location.href = '/#/';
        }
        else
            document.location.href = '/';
    }
    /** */
    static GetJWTInfo() {
        if (this.useJWT) {
            let storage = localStorage.getItem(this.storage);
            if (storage) {
                storage = JSON.parse(storage);
                if (storage.hasOwnProperty('user') && Tools.IsString(storage.user)) {
                    const JWT = storage.user.split('.');
                    if (JWT.length === 3) {
                        const CLAIMS = JSON.parse(atob(JWT[1].replace(/-/g, '+').replace(/_/g, '/')));
                        if (CLAIMS.hasOwnProperty('ExpirationDate')) {
                            return {
                                jwt: storage.user,
                                minutes: Dates.GetDiff(CLAIMS.ExpirationDate, Dates.GetCurrentUTCDate(), 'minutes'),
                                claims: CLAIMS
                            };
                        }
                    }
                }
            }
        }
        return {
            jwt: '',
            minutes: 0,
            claims: {}
        };
    }
}
/** Get webAPI from appSettings */
const GetAppSettings = (environment) => {
    let webAPI = {};
    switch (environment) {
        case 'DEVELOPMENT':
            webAPI = ({
                webAPI: { ...appSettings?.webAPI?.development || null },
                environment: {
                    info: environment,
                    isDevelopment: true,
                    isStaging: false,
                    isProduction: false
                }
            });
            break;
        case 'STAGING':
            webAPI = ({
                webAPI: { ...appSettings?.webAPI?.staging || null },
                environment: {
                    info: environment,
                    isDevelopment: false,
                    isStaging: true,
                    isProduction: false
                }
            });
            break;
        case 'PRODUCTION':
            webAPI = ({
                webAPI: { ...appSettings?.webAPI?.production || null },
                environment: {
                    info: environment,
                    isDevelopment: false,
                    isStaging: false,
                    isProduction: true
                }
            });
            break;
    }
    return {
        ...appSettings,
        appInfo: {
            id: 0,
            project: '',
            title: 'WIA',
            version: '0.0.0',
            company: 'Hyundai WIA',
            ...appSettings?.appInfo
        },
        ...webAPI,
        background: {
            home: '',
            login: '',
            ...appSettings?.background
        },
        security: {
            useJWT: false,
            ...appSettings?.security
        },
        region: {
            dateTime: 'MDY',
            language: 'en',
            currencyCode: 'MXN',
            currency: '$',
            ...appSettings?.dateTime
        },
        navigation: {
            static: true,
            showHome: true,
            redirectTo: 'home',
            ...appSettings?.navigation
        }
    };
};

//import { Dates } from "./dates"; 
class Collections {
    /** Set an index and concat more arrays of the same type */
    static SetIndex(array, ...args) {
        return [...array].concat(...args).map((item, index) => ({ ...item, __index__: index }));
    }
    /** Set an id and concat more arrays of the same type */
    static SetId(array, ...args) {
        return [...array].concat(...args).map((item, index) => ({ ...item, id: (index + 1) }));
    }
    /** */
    static Distinct(array) {
        try {
            if (!Array.isArray(array) || array.length <= 0)
                return [];
            const TYPE = typeof array[0];
            if (['string', 'number', 'bigint', 'boolean'].includes(TYPE)) {
                return Array.from(new Set(array));
            }
            if (TYPE === 'object') {
                const objectList = array.reduce((map, item) => {
                    map.set(JSON.stringify(item), item);
                    return map;
                }, new Map());
                return [...objectList.values()];
            }
            console.warn('Distinct: unsupported data type');
            return array;
        }
        catch (error) {
            console.warn(error);
            return array;
        }
    }
    /** */
    static Except(array, exceptions, property = null) {
        try {
            if (!Array.isArray(array) || array.length <= 0)
                return [];
            if (!Array.isArray(exceptions) || exceptions.length <= 0)
                return [...array];
            const TYPE = typeof array[0];
            if (['string', 'number', 'bigint', 'boolean'].includes(TYPE)) {
                return [...array].filter(item => !Collections.Distinct(exceptions).includes(item));
            }
            if (TYPE === 'object') {
                if (Tools.IsOnlyWhiteSpace(property)) {
                    const ARRAY = [...array].map(item => ({ key: JSON.stringify(item), value: item }));
                    const EXCEPTIONS = new Set([...exceptions].map(item => JSON.stringify(item)));
                    return ARRAY.filter(item => !EXCEPTIONS.has(item.key)).map(item => item.value);
                }
                else {
                    const values = new Set(exceptions.map((y) => String(y[property])));
                    return array.filter((x) => !values.has(String(x[property])));
                }
            }
            console.warn('Except: unsupported data type');
            return array;
        }
        catch (error) {
            console.warn(error);
            return array;
        }
    }
    /** */
    static Intercept(array, array2, property = null) {
        try {
            if (!Array.isArray(array) || array.length <= 0)
                return [];
            if (!Array.isArray(array2) || array2.length <= 0)
                return [];
            const TYPE = typeof array[0];
            if (['string', 'number', 'bigint', 'boolean'].includes(TYPE)) {
                return [...array].filter(item => Collections.Distinct(array2).includes(item));
            }
            if (TYPE === 'object') {
                if (Tools.IsOnlyWhiteSpace(property)) {
                    const ARRAY = [...array].map(item => ({ key: JSON.stringify(item), value: item }));
                    const ARRAY2 = new Set([...array2].map(item => JSON.stringify(item)));
                    return ARRAY.filter(item => ARRAY2.has(item.key)).map(item => item.value);
                }
                else {
                    const values = new Set(array2.map((y) => String(y[property])));
                    return array.filter((x) => values.has(String(x[property])));
                }
            }
            console.warn('Intercept: unsupported data type');
            return array;
        }
        catch (error) {
            console.warn(error);
            return array;
        }
    }
    /** */
    static SortAsc(array, property = null) {
        return [...this._Sort(array, property, 'ascending')];
    }
    /** */
    static SortDesc(array, property = null) {
        return [...this._Sort(array, property, 'descending')];
    }
    /** */
    static _Sort(array, property = null, direction = 'ascending') {
        try {
            if (!Array.isArray(array) || array.length <= 0)
                return [];
            const TYPE = typeof array[0];
            if (['string', 'number', 'bigint', 'boolean'].includes(TYPE)) {
                if (['string', 'boolean'].includes(TYPE)) {
                    return direction == 'ascending'
                        ? array.sort((x, y) => String(x).localeCompare(String(y)))
                        : array.sort((x, y) => String(y).localeCompare(String(x)));
                }
                else if (['number', 'bigint'].includes(TYPE)) {
                    const CLEANER = (val) => Number.isNaN(Number(val)) ? 0 : Number(val);
                    return direction == 'ascending'
                        ? array.sort((x, y) => CLEANER(x) - CLEANER(y))
                        : array.sort((x, y) => CLEANER(y) - CLEANER(x));
                }
            }
            if (TYPE === 'object') {
                if (Dates.IsValidDate(String(array[0]))) {
                    const CLEANER = (val) => Dates.IsValidDate(val) ? (Dates.ToDate(val)?.getTime() || 0) : 0;
                    return direction === 'ascending'
                        ? array.sort((x, y) => CLEANER(x) - CLEANER(y))
                        : array.sort((x, y) => CLEANER(y) - CLEANER(x));
                }
                else if (Tools.IsNotOnlyWhiteSpace(property)) {
                    const PROPERTY = String(property);
                    const PROPERTY_TYPE = typeof array[0][PROPERTY];
                    if (['string', 'number', 'bigint', 'boolean'].includes(PROPERTY_TYPE)) {
                        if (['string', 'boolean'].includes(PROPERTY_TYPE)) {
                            return direction == 'ascending'
                                ? array.sort((x, y) => String(x[PROPERTY]).localeCompare(String(y[PROPERTY])))
                                : array.sort((x, y) => String(y[PROPERTY]).localeCompare(String(x[PROPERTY])));
                        }
                        else if (['number', 'bigint'].includes(PROPERTY_TYPE)) {
                            const CLEANER = (val) => Number.isNaN(Number(val)) ? 0 : Number(val);
                            return direction == 'ascending'
                                ? array.sort((x, y) => CLEANER(x[PROPERTY]) - CLEANER(y[PROPERTY]))
                                : array.sort((x, y) => CLEANER(y[PROPERTY]) - CLEANER(x[PROPERTY]));
                        }
                    }
                    else if (PROPERTY_TYPE === 'object') {
                        if (Dates.IsValidDate(String(array[0][PROPERTY]))) {
                            const CLEANER = (val) => Dates.IsValidDate(val) ? (Dates.ToDate(val)?.getTime() || 0) : 0;
                            return direction === 'ascending'
                                ? array.sort((x, y) => CLEANER(x[PROPERTY]) - CLEANER(y[PROPERTY]))
                                : array.sort((x, y) => CLEANER(y[PROPERTY]) - CLEANER(x[PROPERTY]));
                        }
                    }
                }
                else {
                    console.warn('Sort: property is required');
                    return array;
                }
            }
            console.warn('Sort: unsupported data type');
            return array;
        }
        catch (error) {
            console.warn(error);
            return array;
        }
    }
    /** */
    static Search(array, text, properties = []) {
        try {
            if (!Array.isArray(array) || array.length <= 0)
                return [];
            const TYPE = typeof array[0];
            text = Strings.RemoveAccents(Strings.CleanUpBlanks(text.toUpperCase()));
            const CLEAN = (value) => Tools.IsNotOnlyWhiteSpace(value) ? Strings.RemoveAccents(Strings.CleanUpBlanks(`${value}`.toUpperCase())) : '';
            if (TYPE === 'object') {
                if (properties.length <= 0 && array.length > 0) {
                    properties = Tools.GetPropertyList(array[0]);
                }
                return [...array].filter((item) => properties.some(property => CLEAN(item[property]).includes(text)));
            }
            else if (['string', 'number', 'bigint', 'boolean'].includes(TYPE)) {
                return [...array].filter((item) => CLEAN(item).includes(text));
            }
            console.warn('Search: unsupported data type');
            return array;
        }
        catch (error) {
            console.warn(error);
            return array;
        }
    }
}

const CONTROL_VALUE = (component) => {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => component),
        multi: true
    };
};
class ControlValue {
    //Variables 
    effectControlValueRef;
    _id = Tools.GetGuid();
    _value = signal(null, ...(ngDevMode ? [{ debugName: "_value" }] : /* istanbul ignore next */ []));
    _isTouched = signal(false, ...(ngDevMode ? [{ debugName: "_isTouched" }] : /* istanbul ignore next */ []));
    _IsTouchedFunction = signal(null, ...(ngDevMode ? [{ debugName: "_IsTouchedFunction" }] : /* istanbul ignore next */ []));
    _UpdateValue = signal(null, ...(ngDevMode ? [{ debugName: "_UpdateValue" }] : /* istanbul ignore next */ []));
    _isElementReady = signal(false, ...(ngDevMode ? [{ debugName: "_isElementReady" }] : /* istanbul ignore next */ []));
    _isDestroyed = signal(false, ...(ngDevMode ? [{ debugName: "_isDestroyed" }] : /* istanbul ignore next */ []));
    IsNull = Tools.IsNull;
    IsNotNull = Tools.IsNotNull;
    IsOnlyWhiteSpace = Tools.IsOnlyWhiteSpace;
    IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    IsBooleanTrue = Tools.IsBooleanTrue;
    IsBooleanFalse = Tools.IsBooleanFalse;
    //Input
    value = input('', ...(ngDevMode ? [{ debugName: "value" }] : /* istanbul ignore next */ []));
    formControlName = input('', ...(ngDevMode ? [{ debugName: "formControlName" }] : /* istanbul ignore next */ []));
    label = input('', ...(ngDevMode ? [{ debugName: "label" }] : /* istanbul ignore next */ []));
    translatory = input(null, ...(ngDevMode ? [{ debugName: "translatory" }] : /* istanbul ignore next */ []));
    isLoading = input(false, ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    isReadonly = input(false, ...(ngDevMode ? [{ debugName: "isReadonly" }] : /* istanbul ignore next */ []));
    isInvisible = input(false, ...(ngDevMode ? [{ debugName: "isInvisible" }] : /* istanbul ignore next */ []));
    isHidden = input(false, ...(ngDevMode ? [{ debugName: "isHidden" }] : /* istanbul ignore next */ []));
    isValid = input(false, ...(ngDevMode ? [{ debugName: "isValid" }] : /* istanbul ignore next */ []));
    isInvalid = input(false, ...(ngDevMode ? [{ debugName: "isInvalid" }] : /* istanbul ignore next */ []));
    marginTop = input('0px', ...(ngDevMode ? [{ debugName: "marginTop" }] : /* istanbul ignore next */ []));
    marginRight = input('0px', ...(ngDevMode ? [{ debugName: "marginRight" }] : /* istanbul ignore next */ []));
    marginBottom = input('0px', ...(ngDevMode ? [{ debugName: "marginBottom" }] : /* istanbul ignore next */ []));
    marginLeft = input('0px', ...(ngDevMode ? [{ debugName: "marginLeft" }] : /* istanbul ignore next */ []));
    //Output
    onValueChange = output();
    onDestroy = output();
    onReady = output();
    constructor() {
        this.effectControlValueRef = effect(() => {
            const value = this.value();
            if (!this._useModelBinding())
                this._SetValue(value);
        }, ...(ngDevMode ? [{ debugName: "effectControlValueRef" }] : /* istanbul ignore next */ []));
    }
    //AfterViewInit
    async ngAfterViewInit() {
        await Tools.Sleep();
        await this.Start();
        this._isElementReady.set(true);
        this.onReady?.emit();
    }
    async Start() { }
    //OnDestroy
    ngOnDestroy() {
        this._isDestroyed.set(true);
        this.onReady = null;
        this.Destructor();
        this.onDestroy.emit();
    }
    Destructor() {
        this.effectControlValueRef?.destroy();
    }
    /** */
    isTouched = computed(() => this._isTouched(), ...(ngDevMode ? [{ debugName: "isTouched" }] : /* istanbul ignore next */ []));
    //Computed
    _isEnabled = computed(() => {
        return this.isLoading() === false
            && this.isReadonly() === false
            && this.isInvisible() === false
            && this.isHidden() === false;
    }, ...(ngDevMode ? [{ debugName: "_isEnabled" }] : /* istanbul ignore next */ []));
    /** Sets the value of the component */
    _SetValue(value) {
        if (this._useModelBinding()) {
            this._UpdateValue()(value);
        }
        if (!this.isLoading())
            this.onValueChange.emit(value);
        this._value.set(value);
    }
    //Computed
    _useModelBinding = computed(() => Tools.IsFunction(this._UpdateValue()), ...(ngDevMode ? [{ debugName: "_useModelBinding" }] : /* istanbul ignore next */ []));
    //Function
    writeValue(value) {
        this._SetValue(value);
    }
    //Function
    registerOnChange(callback) {
        if (Tools.IsFunction(callback)) {
            this._UpdateValue.set(callback);
        }
    }
    //Function
    registerOnTouched(callback) {
        if (Tools.IsFunction(callback)) {
            this._IsTouchedFunction.set(callback);
        }
    }
    /** Sets whether the component has been touched */
    SetTouched(isTouched) {
        if (Tools.IsFunction(this._IsTouchedFunction())) {
            this._IsTouchedFunction()(isTouched);
        }
        this._isTouched.set(isTouched);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: ControlValue, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.17", type: ControlValue, isStandalone: true, selector: "ng-component", inputs: { value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, formControlName: { classPropertyName: "formControlName", publicName: "formControlName", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, translatory: { classPropertyName: "translatory", publicName: "translatory", isSignal: true, isRequired: false, transformFunction: null }, isLoading: { classPropertyName: "isLoading", publicName: "isLoading", isSignal: true, isRequired: false, transformFunction: null }, isReadonly: { classPropertyName: "isReadonly", publicName: "isReadonly", isSignal: true, isRequired: false, transformFunction: null }, isInvisible: { classPropertyName: "isInvisible", publicName: "isInvisible", isSignal: true, isRequired: false, transformFunction: null }, isHidden: { classPropertyName: "isHidden", publicName: "isHidden", isSignal: true, isRequired: false, transformFunction: null }, isValid: { classPropertyName: "isValid", publicName: "isValid", isSignal: true, isRequired: false, transformFunction: null }, isInvalid: { classPropertyName: "isInvalid", publicName: "isInvalid", isSignal: true, isRequired: false, transformFunction: null }, marginTop: { classPropertyName: "marginTop", publicName: "marginTop", isSignal: true, isRequired: false, transformFunction: null }, marginRight: { classPropertyName: "marginRight", publicName: "marginRight", isSignal: true, isRequired: false, transformFunction: null }, marginBottom: { classPropertyName: "marginBottom", publicName: "marginBottom", isSignal: true, isRequired: false, transformFunction: null }, marginLeft: { classPropertyName: "marginLeft", publicName: "marginLeft", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onValueChange: "onValueChange", onDestroy: "onDestroy", onReady: "onReady" }, ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: ControlValue, decorators: [{
            type: Component,
            args: [{ template: '' }]
        }], ctorParameters: () => [], propDecorators: { value: [{ type: i0.Input, args: [{ isSignal: true, alias: "value", required: false }] }], formControlName: [{ type: i0.Input, args: [{ isSignal: true, alias: "formControlName", required: false }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: false }] }], translatory: [{ type: i0.Input, args: [{ isSignal: true, alias: "translatory", required: false }] }], isLoading: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoading", required: false }] }], isReadonly: [{ type: i0.Input, args: [{ isSignal: true, alias: "isReadonly", required: false }] }], isInvisible: [{ type: i0.Input, args: [{ isSignal: true, alias: "isInvisible", required: false }] }], isHidden: [{ type: i0.Input, args: [{ isSignal: true, alias: "isHidden", required: false }] }], isValid: [{ type: i0.Input, args: [{ isSignal: true, alias: "isValid", required: false }] }], isInvalid: [{ type: i0.Input, args: [{ isSignal: true, alias: "isInvalid", required: false }] }], marginTop: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginTop", required: false }] }], marginRight: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginRight", required: false }] }], marginBottom: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginBottom", required: false }] }], marginLeft: [{ type: i0.Input, args: [{ isSignal: true, alias: "marginLeft", required: false }] }], onValueChange: [{ type: i0.Output, args: ["onValueChange"] }], onDestroy: [{ type: i0.Output, args: ["onDestroy"] }], onReady: [{ type: i0.Output, args: ["onReady"] }] } });

class Files {
    static IMAGE_EXTENSIONS = new Map([
        ['png', 'image/png'],
        ['jpg', 'image/jpeg'],
        ['jpeg', 'image/jpeg'],
        ['gif', 'image/gif'],
        ['svg', 'image/image/svg+xml'],
        ['ico', 'image/x-icon']
    ]);
    static EXCEL_EXTENSIONS = new Map([
        ['xls', 'application/vnd.ms-excel'],
        ['xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        ['csv', 'text/csv']
    ]);
    /** Get Extension File */
    static GetExtension(file) {
        if (file.name.includes('.')) {
            let worlds = file.name.split('.');
            if (worlds.length > 0) {
                let extension = worlds.pop();
                extension = extension.trim().toLowerCase();
                if (extension.length > 0)
                    return extension;
            }
        }
        return '';
    }
    /** */
    static IsExcel(file) {
        const EXTENSION = Files.GetExtension(file);
        return Tools.IsNotNull(EXTENSION)
            ? [...this.EXCEL_EXTENSIONS.keys()].includes(EXTENSION)
            : false;
    }
    /** Read excel file */
    static ReadExcel(file) {
        return new Promise(Resolve => {
            let columns = [];
            let rows = [];
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
                const dataBytes = new Uint8Array(reader.result);
                if (dataBytes) {
                    const workbook = XLSX.read(dataBytes, {});
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    let dataSheet = XLSX.utils.sheet_to_json(sheet, {
                        header: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                    });
                    //Get Headers
                    for (const column in dataSheet[0]) {
                        columns.push(Strings.FirstCharToLower(String(dataSheet[0][column]).replaceAll(' ', '')));
                    }
                    //Get Rows
                    rows = XLSX.utils.sheet_to_json(sheet, { header: columns });
                    rows.shift();
                    rows = rows.map(row => {
                        const item = Tools.BreakReference(row);
                        delete item['__rowNum__'];
                        return item;
                    });
                }
                Resolve({ columns, rows });
            };
            reader.onerror = () => { Resolve({ columns, rows }); };
        });
    }
    /** Export to excel file */
    static ExportExcel(data, fileName = '', sheetName = 'Sheet1') {
        sheetName = Strings.CleanUpBlanks(sheetName);
        fileName = Strings.CleanUpBlanks(fileName);
        if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx') || fileName.endsWith('.csv')) {
            if (fileName.endsWith('.xls')) {
                fileName = fileName.replaceAll('.xls', '.xlsx');
            }
            if (fileName.endsWith('.csv')) {
                fileName = fileName.replaceAll('.csv', '.xlsx');
            }
        }
        else {
            fileName += '.xlsx';
        }
        const WORK_SHEET = XLSX.utils.json_to_sheet(data);
        const WORK_BOOK = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(WORK_BOOK, WORK_SHEET, sheetName);
        XLSX.writeFile(WORK_BOOK, fileName);
    }
    /** Convert file to string base64 */
    static ToBase64(file) {
        return new Promise(Resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                Resolve(reader.result?.toString() || '');
            };
            reader.onerror = () => Resolve('');
        });
    }
}

class HTTP {
    alert = new CoerAlert();
    static STATUS_CODE = {
        /** 200 */
        Ok: 200,
        /** 201 */
        Created: 201,
        /** 204 */
        NoContent: 204,
        /** 400 */
        BadRequest: 400,
        /** 401 */
        Unauthorize: 401,
        /** 403 */
        Forbidden: 403,
        /** 404 */
        NotFound: 404,
        /** 405 */
        NotAllowed: 405,
        /** 406 */
        NotAcceptable: 406,
        /** 409 */
        Conflict: 409,
        /** 413 */
        PayloadTooLarge: 413,
        /** 500 */
        InnerError: 500
    };
    /** */
    static async GET(request) {
        return await this._HTTP(request, 'GET');
    }
    /** */
    static async POST(request) {
        return await this._HTTP(request, 'POST');
    }
    /** */
    static async PUT(request) {
        return await this._HTTP(request, 'PUT');
    }
    /** */
    static async PATCH(request) {
        return await this._HTTP(request, 'PATCH');
    }
    /** */
    static async DELETE(request) {
        return await this._HTTP(request, 'DELETE');
    }
    //Function 
    static async _HTTP(request, method) {
        try {
            const RESPONSE = this._BuildRequest(request, method);
            const fetchResponse = await fetch(RESPONSE.url, {
                method: RESPONSE.method,
                headers: RESPONSE.headers,
                body: RESPONSE.body,
                credentials: RESPONSE.credentials,
            });
            return await this._BuildResponse(fetchResponse, request.responseType);
        }
        catch (error) {
            console.error(error);
            Tools.Sleep(5000, 'Offline_API').then(() => {
                new CoerAlert().CloseAllAlerts();
                new CoerAlert().Danger('WEB API is down', 'Offline', 'iw-cloud-slash-fill');
            });
            return this._BuildError(0, 'Offline API', request.responseType);
        }
    }
    //Function 
    static _BuildRequest(request, method) {
        //Build URL
        const _URL = new URL(request.url);
        if (request.queryParams) {
            for (const query of request.queryParams.filter(x => Tools.IsNotOnlyWhiteSpace(x.value))) {
                _URL.searchParams.append(query.param, String(query.value));
            }
        }
        //Build HEADERS
        const _HEADERS = this._BuildHeaders(method);
        if (request.headers) {
            for (const header of request.headers.filter(x => Tools.IsNotOnlyWhiteSpace(x.value))) {
                _HEADERS.append(header.header, String(header.value));
            }
        }
        //Build BODY
        let _BODY = null;
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            if (request.body) {
                if (request.body instanceof FormData) {
                    _BODY = request.body;
                }
                else {
                    _BODY = JSON.stringify(request.body);
                }
            }
            else
                _BODY = '{}';
        }
        return {
            url: _URL.toString(),
            method,
            headers: _HEADERS,
            body: _BODY,
            credentials: (request.withCredentials ? 'include' : 'same-origin')
        };
    }
    //Function
    static _BuildHeaders(method) {
        const headers = new Headers();
        if (['POST', 'PUT'].includes(method)) {
            headers.set('Content-Type', 'application/json');
        }
        else if (method == 'PATCH') {
            headers.set('Content-Type', 'application/json-patch+json');
        }
        const USER = Access.GetUser();
        if (Tools.IsNotOnlyWhiteSpace(USER?.JWT)) {
            const JWT = USER.JWT.startsWith('BEARER') ? USER.JWT : `BEARER ${USER.JWT}`;
            headers.append('Authorization', JWT);
        }
        if (Tools.IsNotOnlyWhiteSpace(USER?.User))
            headers.append('Clien-User', USER.User);
        headers.append('Utc-Offset', `${Dates.GetOffset() / 60}`);
        return headers;
    }
    //Function
    static async _BuildResponse(fetchResponse, responseType) {
        if (Tools.IsNull(responseType)) {
            responseType = 'json';
        }
        let response = null;
        //ERROR
        if (fetchResponse.status >= 400) {
            response = await fetchResponse.text();
            return await this._BuildError(fetchResponse.status, response, responseType);
        }
        //OK  
        if (fetchResponse.status >= 200) {
            switch (responseType) {
                case 'json': {
                    try {
                        response = await fetchResponse.json();
                    }
                    catch {
                        response = null;
                    }
                    break;
                }
                case 'text': {
                    try {
                        response = await fetchResponse.text();
                    }
                    catch {
                        response = '';
                    }
                    break;
                }
                case 'arraybuffer': {
                    try {
                        response = await fetchResponse.arrayBuffer();
                    }
                    catch {
                        response = null;
                    }
                    break;
                }
                case 'blob': {
                    try {
                        response = await fetchResponse.blob();
                    }
                    catch {
                        response = null;
                    }
                    break;
                }
            }
        }
        return {
            data: response,
            status: fetchResponse.status,
            message: fetchResponse.statusText,
            ok: fetchResponse.ok
        };
    }
    //Function
    static async _BuildError(status, message, responseType) {
        let response;
        switch (responseType) {
            case 'text': {
                response = '';
                break;
            }
            case 'arraybuffer': {
                response = null;
                //message = new TextDecoder().decode(new Uint8Array(message as any));
                break;
            }
            case 'blob': {
                response = null;
                break;
            }
            default: {
                response = {};
                break;
            }
        }
        return {
            data: response,
            status,
            message,
            ok: false
        };
    }
}

class Navigation {
    static storage = (appSettings?.appInfo?.project).replaceAll(' ', '') || 'coer91';
    /** */
    static SetSelectedMenu(selectedMenu) {
        let storage = sessionStorage.getItem(this.storage);
        if (storage)
            storage = JSON.parse(storage);
        storage = Object.assign({}, storage, {
            navigation: { ...storage?.navigation, selectedMenu }
        });
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }
    /** */
    static GetSelectedMenu() {
        let storage = sessionStorage.getItem(this.storage);
        if (storage) {
            storage = JSON.parse(storage);
            if (storage.hasOwnProperty('navigation') && storage.navigation.hasOwnProperty('selectedMenu')) {
                return storage.navigation.selectedMenu;
            }
        }
        return null;
    }
}

class BreadcrumbsPage {
    static storage = (appSettings?.appInfo?.project).replaceAll(' ', '') || 'coer91';
    /** */
    static Set(page, path) {
        const breadcrumbs = this.Get();
        if (!breadcrumbs.some(x => x.path == path)) {
            breadcrumbs.push({ page, path });
            this._Save(breadcrumbs);
        }
    }
    /** */
    static Get() {
        let storage = sessionStorage.getItem(this.storage);
        if (storage) {
            storage = JSON.parse(storage);
            return storage?.breadcrumbs || [];
        }
        return [];
    }
    /** */
    static UpdateLast(page, path) {
        const breadcrumbs = this.Get();
        if (breadcrumbs.length > 0) {
            breadcrumbs[breadcrumbs.length - 1] = { page, path };
            this._Save(breadcrumbs);
        }
    }
    /** */
    static RemoveByPath(path) {
        const breadcrumbs = this.Get();
        const index = breadcrumbs.findIndex(x => x.path == path);
        if (index >= 0) {
            this._Save(breadcrumbs.splice(0, index + 1));
        }
    }
    /** */
    static RemoveLast() {
        const breadcrumbs = this.Get();
        if (breadcrumbs.length > 0) {
            this._Save(breadcrumbs.slice(0, -1));
        }
    }
    //Function
    static _Save(breadcrumbs) {
        let storage = sessionStorage.getItem(this.storage);
        if (storage)
            storage = JSON.parse(storage);
        storage = { ...storage, breadcrumbs };
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }
}

class FiltersPage {
    static storage = (appSettings?.appInfo?.project).replaceAll(' ', '') || 'coer91';
    /** */
    static Get(path) {
        let storage = sessionStorage.getItem(this.storage);
        if (storage) {
            storage = JSON.parse(storage);
            const filterByPath = storage?.filterByPath || [];
            const index = filterByPath.findIndex(x => x.path === path);
            if (index >= 0) {
                return filterByPath[index].filters;
            }
        }
        return {};
    }
    /** */
    static Set(path, filters) {
        let storage = sessionStorage.getItem(this.storage);
        if (storage) {
            storage = JSON.parse(storage);
            const filterByPath = storage?.filterByPath || [];
            const index = filterByPath.findIndex(x => x.path === path);
            if (index >= 0) {
                filterByPath[index] = { path, filters };
            }
            else {
                filterByPath.push({ path, filters });
            }
            storage = { ...storage, filterByPath };
            sessionStorage.setItem(this.storage, JSON.stringify(storage));
        }
    }
    /** */
    static Remove(path) {
        let storage = sessionStorage.getItem(this.storage);
        if (storage) {
            storage = JSON.parse(storage);
            const filterByPath = storage?.filterByPath || [];
            const index = filterByPath.findIndex(x => x.path === path);
            if (index >= 0) {
                filterByPath.splice(index, 1);
                storage = { ...storage, filterByPath };
            }
            sessionStorage.setItem(this.storage, JSON.stringify(storage));
        }
    }
}

class ResponsePage {
    static storage = (appSettings?.appInfo?.project).replaceAll(' ', '') || 'coer91';
    /** Save the responsePage to sessionStorage */
    static Set(sender, receiver, response) {
        let storage = sessionStorage.getItem(this.storage);
        storage = JSON.parse(storage);
        storage = {
            ...storage,
            responsePage: { sender, receiver, response }
        };
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }
    /** Gets the responsePage from sessionStorage */
    static Get() {
        let storage = sessionStorage.getItem(this.storage);
        if (storage) {
            storage = JSON.parse(storage);
            return storage?.responsePage || null;
        }
        return {
            sender: '',
            receiver: '',
            response: null
        };
    }
    /** Remove the responsePage from sessionStorage */
    static Remove() {
        let storage = sessionStorage.getItem(this.storage);
        storage = JSON.parse(storage);
        if (Tools.IsNotNull(storage)) {
            if (storage.hasOwnProperty('responsePage')) {
                delete storage.responsePage;
            }
            storage = { ...storage };
            sessionStorage.setItem(this.storage, JSON.stringify(storage));
        }
    }
}

class SourcePage {
    static storage = (appSettings?.appInfo?.project).replaceAll(' ', '') || 'coer91';
    /** */
    static Set(pageName, path) {
        let source = null;
        BreadcrumbsPage.Set(pageName, path);
        const breadcrumbs = BreadcrumbsPage.Get();
        if (breadcrumbs.length >= 2) {
            const breadcrumb = breadcrumbs.slice(0, -1).pop();
            source = { page: breadcrumb.page, path: breadcrumb.path };
        }
        let storage = sessionStorage.getItem(this.storage);
        if (storage)
            storage = JSON.parse(storage);
        storage = { ...storage, source };
        sessionStorage.setItem(this.storage, JSON.stringify(storage));
    }
    /** */
    static Get() {
        let storage = sessionStorage.getItem(this.storage);
        if (storage) {
            storage = JSON.parse(storage);
            return storage?.source || null;
        }
        return null;
    }
}

class Page {
    //Injection
    router = inject(Router);
    alert = new CoerAlert();
    _activatedRoute = inject(ActivatedRoute);
    /** */
    isUpdating = signal(false, ...(ngDevMode ? [{ debugName: "isUpdating" }] : /* istanbul ignore next */ []));
    /** */
    isLoading = signal(true, ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    /** */
    canCreate = signal(false, ...(ngDevMode ? [{ debugName: "canCreate" }] : /* istanbul ignore next */ []));
    /** */
    canUpdate = signal(false, ...(ngDevMode ? [{ debugName: "canUpdate" }] : /* istanbul ignore next */ []));
    /** */
    canDelete = signal(false, ...(ngDevMode ? [{ debugName: "canDelete" }] : /* istanbul ignore next */ []));
    /** */
    breadcrumbs = signal([], ...(ngDevMode ? [{ debugName: "breadcrumbs" }] : /* istanbul ignore next */ []));
    /** */
    responsePage = signal(null, ...(ngDevMode ? [{ debugName: "responsePage" }] : /* istanbul ignore next */ []));
    /** */
    filters = signal({}, ...(ngDevMode ? [{ debugName: "filters" }] : /* istanbul ignore next */ []));
    /** */
    language = signal(null, ...(ngDevMode ? [{ debugName: "language" }] : /* istanbul ignore next */ []));
    /** */
    goBack = { show: false };
    //Helper tools
    IsNull = Tools.IsNull;
    IsNotNull = Tools.IsNotNull;
    IsOnlyWhiteSpace = Tools.IsOnlyWhiteSpace;
    IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    IsBooleanTrue = Tools.IsBooleanTrue;
    IsBooleanFalse = Tools.IsBooleanFalse;
    SetId = Collections.SetId;
    SetIndex = Collections.SetIndex;
    Equals = Strings.Equals;
    //Private Variables
    _path = '';
    _pageName = '';
    _sourcePage = null;
    _routeParams;
    _queryParams;
    /** */
    constructor(pageName) {
        this._SetPath();
        SourcePage.Set(pageName, this._path);
        this.SetPageName(pageName);
        this._sourcePage = SourcePage.Get();
        this._SetBreadcrumbs();
        this._SetGoBack();
        this.filters.set(FiltersPage.Get(this._path));
        this._GetResponsePage();
    }
    ngAfterViewInit() {
        Tools.Sleep().then(() => this.StartPage());
    }
    ngOnDestroy() {
        this.Destroy();
    }
    /** Main method */
    StartPage() { }
    ;
    /** Main method */
    Destroy() { }
    ;
    //Function
    async _SetPath() {
        this._routeParams = this._activatedRoute.snapshot.params;
        this._queryParams = this._activatedRoute.snapshot.queryParams;
        this._path = this.router.url;
        if (this._path.includes('?')) {
            this._path = this._path.split('?')[0];
        }
        await Tools.Sleep(0);
        const activeKey = this._activatedRoute.snapshot.data['activeKey'];
        if (Tools.IsNotOnlyWhiteSpace(activeKey)) {
            const GetNavigationKeys = this._activatedRoute.snapshot.data['GetNavigationKeys'];
            if (Tools.IsFunction(GetNavigationKeys)) {
                const NAVIGATION_KEYS = Array.from(GetNavigationKeys().values()).filter((x) => Tools.IsNotOnlyWhiteSpace(x.activeKey));
                const ACTIVE_KEY = NAVIGATION_KEYS.find(x => x.activeKey === activeKey.toUpperCase());
                if (ACTIVE_KEY) {
                    this.canCreate.set(ACTIVE_KEY.canCreate);
                    this.canUpdate.set(ACTIVE_KEY.canUpdate);
                    this.canDelete.set(ACTIVE_KEY.canDelete);
                }
            }
        }
        const Language = Access.GetUser()?.Language;
        this.language.set(Tools.IsNotOnlyWhiteSpace(Language) ? Language : null);
        console.clear();
        console.log({
            path: this._path,
            activeKey: activeKey,
            canCreate: this.canCreate(),
            canUpdate: this.canUpdate(),
            canDelete: this.canDelete()
        });
    }
    /** */
    SetPageName(pageName, id) {
        this._pageName = pageName;
        if (Tools.IsNotOnlyWhiteSpace(id)) {
            const PATH_ARRAY = this._path.split('/');
            PATH_ARRAY[PATH_ARRAY.length - 1] = String(id);
            this._path = PATH_ARRAY.join('/');
        }
        if (BreadcrumbsPage.Get().pop()?.page != pageName) {
            BreadcrumbsPage.UpdateLast(pageName, this._path);
            this._SetBreadcrumbs();
        }
        this.router.navigateByUrl(this._path);
    }
    //Function
    _SetBreadcrumbs() {
        const breadcrumbs = BreadcrumbsPage.Get();
        if (breadcrumbs.length > 1) {
            const last = breadcrumbs.pop();
            const last2 = breadcrumbs.pop();
            if (last?.path === last2?.path) {
                BreadcrumbsPage.RemoveLast();
            }
        }
        const BREADCRUMBS = BreadcrumbsPage.Get().map(item => ({
            page: item.page,
            path: item.path,
            click: () => BreadcrumbsPage.RemoveByPath(item.path)
        }));
        if (BREADCRUMBS.length <= 0) {
            BREADCRUMBS.push({ page: this._pageName, path: this._path });
        }
        this.breadcrumbs.set(BREADCRUMBS);
    }
    //Function
    _SetGoBack() {
        this.goBack = {
            show: Tools.IsNotNull(this._sourcePage),
            path: this._sourcePage?.path,
            click: () => BreadcrumbsPage.RemoveLast()
        };
    }
    /** */
    SetResponsePage(response) {
        ResponsePage.Set(this._path, '', response);
    }
    ;
    //Function
    _GetResponsePage() {
        const responsePage = ResponsePage.Get();
        if (Tools.IsNotOnlyWhiteSpace(responsePage?.sender)) {
            if (responsePage.sender != this._path) {
                ResponsePage.Set('', this._path, responsePage.response);
                this.responsePage.set({ ...responsePage.response });
            }
        }
        else if (Tools.IsNotOnlyWhiteSpace(responsePage?.receiver)) {
            if (responsePage.receiver == this._path) {
                this.responsePage.set({ ...responsePage.response });
            }
            else {
                ResponsePage.Remove();
            }
        }
    }
    ;
    /** Navigate to previous page */
    GoToSource(responsePage) {
        if (this._sourcePage) {
            BreadcrumbsPage.RemoveLast();
            this.SetResponsePage(responsePage);
            this.RemovePageFilter();
            Tools.Sleep().then(() => this.router.navigateByUrl(this._sourcePage.path));
        }
    }
    ;
    /** */
    ReloadPage() {
        this.isLoading.set(true);
        BreadcrumbsPage.RemoveLast();
        Tools.Sleep().then(() => window.location.reload());
    }
    /** */
    SetPageFilters(filters) {
        const FILTERS = Tools.BreakReference(filters);
        this.filters.set(FILTERS);
        FiltersPage.Set(this._path, FILTERS);
    }
    /** */
    RemovePageFilter() {
        FiltersPage.Remove(this._path);
        this.filters.set({});
    }
    /** */
    GetParam(param, origin) {
        return origin != 'QUERY_PARAMS'
            ? this._routeParams[param] || ''
            : this._queryParams[param] || '';
    }
    /** */
    Log(value, logName = null) {
        if (Tools.IsNotNull(logName))
            console.log({ log: logName, value });
        else
            console.log(value);
    }
    /** */
    iconTemplate = (data) => {
        return `<i class='${data.value}'></i>`;
    };
    /** */
    isActiveTemplate = (data) => {
        return data.value
            ? `<span class='color-green font-weight-bold'>ACTIVE</span>`
            : `<span class='color-gray font-weight-bold'>DISABLED</span>`;
    };
    /** */
    switchTemplate = (_) => {
        return {
            showInput: true,
            isReadonly: this.isLoading()
        };
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: Page, deps: [{ token: String }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.17", type: Page, isStandalone: true, selector: "ng-component", ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: Page, decorators: [{
            type: Component,
            args: [{ template: '' }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [String]
                }] }] });

class Screen {
    static alert = new CoerAlert();
    /** Gets the width of the browser window */
    static get WINDOW_WIDTH() {
        return window.innerWidth;
    }
    /** Gets the height of the browser window */
    static get WINDOW_HEIGHT() {
        return window.innerHeight;
    }
    /** Gets the width of the device screen */
    static get DEVICE_WIDTH() {
        return window.screen.width;
    }
    /** Gets the height of the device screen */
    static get DEVICE_HEIGHT() {
        return window.screen.height;
    }
    /** gets the breakpoint based on the width of the browsing window */
    static get BREAKPOINT() {
        if (this.WINDOW_WIDTH < 500)
            return 'mv';
        else if (this.WINDOW_WIDTH >= 500 && this.WINDOW_WIDTH < 576)
            return 'xs';
        else if (this.WINDOW_WIDTH >= 576 && this.WINDOW_WIDTH < 768)
            return 'sm';
        else if (this.WINDOW_WIDTH >= 768 && this.WINDOW_WIDTH < 992)
            return 'md';
        else if (this.WINDOW_WIDTH >= 992 && this.WINDOW_WIDTH < 1200)
            return 'lg';
        else if (this.WINDOW_WIDTH >= 1200 && this.WINDOW_WIDTH < 1400)
            return 'xl';
        else
            return 'xxl';
    }
    /** Provides an observable for screen resizing */
    static Resize = new Observable(subscriber => {
        const handleResize = () => {
            subscriber.next({
                width: window.innerWidth,
                height: window.innerHeight,
                breakpoint: this.BREAKPOINT
            });
        };
        window.addEventListener("resize", handleResize);
        window.addEventListener("load", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("load", handleResize);
        };
    });
    /** Provides an observable for the browser buttons */
    static ClickBrowserButton = new Observable(subscriber => {
        const handlePopState = (popStateEvent) => {
            if (popStateEvent.state && popStateEvent.target) {
                subscriber.next(popStateEvent.target.location.href);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    });
}

class Section {
    //Injection
    router = inject(Router);
    alert = new CoerAlert();
    //Helper tools
    IsNull = Tools.IsNull;
    IsNotNull = Tools.IsNotNull;
    IsOnlyWhiteSpace = Tools.IsOnlyWhiteSpace;
    IsNotOnlyWhiteSpace = Tools.IsNotOnlyWhiteSpace;
    IsBooleanTrue = Tools.IsBooleanTrue;
    IsBooleanFalse = Tools.IsBooleanFalse;
    SetId = Collections.SetId;
    SetIndex = Collections.SetIndex;
    Equals = Strings.Equals;
    //Variables
    isLoading = signal(false, ...(ngDevMode ? [{ debugName: "isLoading" }] : /* istanbul ignore next */ []));
    //Inputs
    isLoadingExternal = input(false, ...(ngDevMode ? [{ debugName: "isLoadingExternal" }] : /* istanbul ignore next */ []));
    isUpdating = input(false, ...(ngDevMode ? [{ debugName: "isUpdating" }] : /* istanbul ignore next */ []));
    canCreate = input(false, ...(ngDevMode ? [{ debugName: "canCreate" }] : /* istanbul ignore next */ []));
    canUpdate = input(false, ...(ngDevMode ? [{ debugName: "canUpdate" }] : /* istanbul ignore next */ []));
    canDelete = input(false, ...(ngDevMode ? [{ debugName: "canDelete" }] : /* istanbul ignore next */ []));
    onLoading = output();
    ngAfterViewInit() {
        Tools.Sleep().then(() => this.StartSection());
    }
    ngOnDestroy() {
        this.Destroy();
    }
    /** Main method */
    StartSection() { }
    ;
    /** Main method */
    Destroy() { }
    ;
    /** */
    Log(value, logName = null) {
        if (Tools.IsNotNull(logName))
            console.log({ log: logName, value });
        else
            console.log(value);
    }
    /** */
    iconTemplate = (data) => {
        return `<i class='${data.row.icon}'></i>`;
    };
    /** */
    isActiveTemplate = (data) => {
        return data.value
            ? `<span class='color-green font-weight-bold'>ACTIVE</span>`
            : `<span class='color-gray font-weight-bold'>DISABLED</span>`;
    };
    /** */
    switchTemplate = (_) => {
        return {
            showInput: true,
            isReadonly: Tools.IsBooleanTrue(this.isLoading())
        };
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: Section, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "21.2.17", type: Section, isStandalone: true, selector: "ng-component", inputs: { isLoadingExternal: { classPropertyName: "isLoadingExternal", publicName: "isLoadingExternal", isSignal: true, isRequired: false, transformFunction: null }, isUpdating: { classPropertyName: "isUpdating", publicName: "isUpdating", isSignal: true, isRequired: false, transformFunction: null }, canCreate: { classPropertyName: "canCreate", publicName: "canCreate", isSignal: true, isRequired: false, transformFunction: null }, canUpdate: { classPropertyName: "canUpdate", publicName: "canUpdate", isSignal: true, isRequired: false, transformFunction: null }, canDelete: { classPropertyName: "canDelete", publicName: "canDelete", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onLoading: "onLoading" }, ngImport: i0, template: '', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.17", ngImport: i0, type: Section, decorators: [{
            type: Component,
            args: [{ template: '' }]
        }], propDecorators: { isLoadingExternal: [{ type: i0.Input, args: [{ isSignal: true, alias: "isLoadingExternal", required: false }] }], isUpdating: [{ type: i0.Input, args: [{ isSignal: true, alias: "isUpdating", required: false }] }], canCreate: [{ type: i0.Input, args: [{ isSignal: true, alias: "canCreate", required: false }] }], canUpdate: [{ type: i0.Input, args: [{ isSignal: true, alias: "canUpdate", required: false }] }], canDelete: [{ type: i0.Input, args: [{ isSignal: true, alias: "canDelete", required: false }] }], onLoading: [{ type: i0.Output, args: ["onLoading"] }] } });

const LANGUAGES = [
    { label: 'Project', en_US: 'Project', es_MX: 'Proyecto', ko_KR: '프로젝트' },
    { label: 'Module', en_US: 'Module', es_MX: 'Módulo', ko_KR: '기준 치수' },
    { label: 'Submodule', en_US: 'Submodule', es_MX: 'Submódulo', ko_KR: '서브모듈' },
    { label: 'Page', en_US: 'Page', es_MX: 'Página', ko_KR: '페이지' },
    { label: 'User', en_US: 'User', es_MX: 'Usuario', ko_KR: '사용자' },
    { label: 'Role', en_US: 'Role', es_MX: 'Rol', ko_KR: '역할' },
    { label: 'Active', en_US: 'Active', es_MX: 'Activo', ko_KR: '활동적인' },
    { label: 'Disabled', en_US: 'Disabled', es_MX: 'Deshabilitado', ko_KR: '비활성화됨' },
    { label: 'CaseLabel', en_US: 'Case Label', es_MX: 'Etiqueta de Caja', ko_KR: '케이스 라벨' },
    { label: 'CaseLabelId', en_US: 'Case Label Id', es_MX: 'Id Etiqueta de Caja', ko_KR: '케이스 라벨 ID' },
    { label: 'Division', en_US: 'Division', es_MX: 'Division', ko_KR: '구분' },
    { label: 'EoNumber', en_US: 'Eo Number', es_MX: 'Número EO', ko_KR: 'EO 번호' },
    { label: 'HasDefect', en_US: 'Has Defect', es_MX: 'Está defectuoso', ko_KR: '결함이 있습니다' },
    { label: 'InputDate', en_US: 'Input Date', es_MX: 'Fecha de Entrada', ko_KR: '입력 날짜' },
    { label: 'IsDeleted', en_US: 'Deleted', es_MX: 'Eliminado', ko_KR: '삭제됨' },
    { label: 'Location', en_US: 'Location', es_MX: 'Localización', ko_KR: '위치' },
    { label: 'Lot', en_US: 'Lot', es_MX: 'Lote', ko_KR: '일괄' },
    { label: 'LotNumber', en_US: 'Lot Number', es_MX: 'Numero de Lote', ko_KR: '' },
    { label: 'ManualScanner', en_US: 'Manual Scanner', es_MX: 'Scanner Manual', ko_KR: '' },
    { label: 'PartName', en_US: 'Part Name', es_MX: 'Parte', ko_KR: '' },
    { label: 'PartNumber', en_US: 'Part Number', es_MX: 'Numero de Parte', ko_KR: '' },
    { label: 'Printer', en_US: 'Printer', es_MX: 'Impresora', ko_KR: '' },
    { label: 'ProductionDate', en_US: 'Production Date', es_MX: 'Fecha Producción', ko_KR: '' },
    { label: 'Quantity', en_US: 'Quantity', es_MX: 'Cantidad', ko_KR: '' },
    { label: 'Scanner', en_US: 'Scanner', es_MX: 'Scanner', ko_KR: '' },
    { label: 'Storage', en_US: 'Storage', es_MX: 'Almacén', ko_KR: '' },
    { label: 'StorageCode', en_US: 'Storage Code', es_MX: 'Codigo de Almacén', ko_KR: '' },
    { label: 'Transaction', en_US: 'Transaction', es_MX: 'Transacción', ko_KR: '' },
    { label: 'Unit', en_US: 'Unit', es_MX: 'Unidad', ko_KR: '' },
    { label: 'Vendor', en_US: 'Vendor', es_MX: 'Vendedor', ko_KR: '' },
    { label: 'VendorId', en_US: 'Vendor Id', es_MX: 'Id Vendedor', ko_KR: '' },
    { label: 'Warehouse', en_US: 'Warehouse', es_MX: 'Bodega', ko_KR: '' },
    { label: 'WarehouseCode', en_US: 'Warehouse Code', es_MX: 'Codigo de Bodega', ko_KR: '' },
];
class Translatory {
    static Label = (label, language = null) => {
        if (language) {
            console.log(label, language);
            const LANGUAGE = LANGUAGES.find(item => item.label.toUpperCase() == (Tools.IsNotOnlyWhiteSpace(label) ? label.trim().toUpperCase() : ''));
            if (LANGUAGE) {
                switch (language) {
                    case 'es_MX': return LANGUAGE.es_MX;
                    case 'ko-KR': return LANGUAGE.ko_KR;
                    default: return LANGUAGE.en_US;
                }
            }
        }
        return label;
    };
}

/**
 * Generated bundle index. Do not edit.
 */

export { Access, BreadcrumbsPage, CONTROL_VALUE, CoerAlert, Collections, ControlValue, Dates, Files, FiltersPage, GetAppSettings, HTMLElements, HTTP, Navigation, Numbers, Page, ResponsePage, Screen, Section, SourcePage, Strings, Tools, Translatory };
//# sourceMappingURL=hwmx-angular-tools.mjs.map
