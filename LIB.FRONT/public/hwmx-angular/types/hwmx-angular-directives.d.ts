import * as _angular_core from '@angular/core';
import { TemplateRef, WritableSignal } from '@angular/core';

interface ICoerRef {
    template: TemplateRef<any>;
    coerRef: WritableSignal<string>;
    title: WritableSignal<string>;
    icon: WritableSignal<string>;
    isReadonly: WritableSignal<boolean>;
    show: WritableSignal<boolean>;
    tooltip: WritableSignal<string>;
}
declare class TemplateRefDirective {
    template: TemplateRef<any>;
    templateRef: _angular_core.InputSignal<string>;
    title: _angular_core.InputSignal<string>;
    icon: _angular_core.InputSignal<string>;
    isReadonly: _angular_core.InputSignal<boolean>;
    show: _angular_core.InputSignal<boolean>;
    tooltip: _angular_core.InputSignal<string>;
    constructor(template: TemplateRef<any>);
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TemplateRefDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<TemplateRefDirective, "[templateRef]", never, { "templateRef": { "alias": "templateRef"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "isReadonly": { "alias": "isReadonly"; "required": false; "isSignal": true; }; "show": { "alias": "show"; "required": false; "isSignal": true; }; "tooltip": { "alias": "tooltip"; "required": false; "isSignal": true; }; }, {}, never, never, false, never>;
}

declare class DirectivesModule {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<DirectivesModule, never>;
    static ɵmod: _angular_core.ɵɵNgModuleDeclaration<DirectivesModule, [typeof TemplateRefDirective], never, [typeof TemplateRefDirective]>;
    static ɵinj: _angular_core.ɵɵInjectorDeclaration<DirectivesModule>;
}

export { DirectivesModule, TemplateRefDirective };
export type { ICoerRef };
