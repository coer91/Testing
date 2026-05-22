import * as i0 from '@angular/core';
import { input, Directive, NgModule } from '@angular/core';

class TemplateRefDirective {
    template;
    //Inputs
    templateRef = input('', ...(ngDevMode ? [{ debugName: "templateRef" }] : /* istanbul ignore next */ []));
    title = input('', ...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    icon = input('', ...(ngDevMode ? [{ debugName: "icon" }] : /* istanbul ignore next */ []));
    isReadonly = input(false, ...(ngDevMode ? [{ debugName: "isReadonly" }] : /* istanbul ignore next */ []));
    show = input(true, ...(ngDevMode ? [{ debugName: "show" }] : /* istanbul ignore next */ []));
    tooltip = input('', ...(ngDevMode ? [{ debugName: "tooltip" }] : /* istanbul ignore next */ []));
    constructor(template) {
        this.template = template;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: TemplateRefDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "21.2.6", type: TemplateRefDirective, isStandalone: false, selector: "[templateRef]", inputs: { templateRef: { classPropertyName: "templateRef", publicName: "templateRef", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, isReadonly: { classPropertyName: "isReadonly", publicName: "isReadonly", isSignal: true, isRequired: false, transformFunction: null }, show: { classPropertyName: "show", publicName: "show", isSignal: true, isRequired: false, transformFunction: null }, tooltip: { classPropertyName: "tooltip", publicName: "tooltip", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: TemplateRefDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[templateRef]',
                    standalone: false
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }], propDecorators: { templateRef: [{ type: i0.Input, args: [{ isSignal: true, alias: "templateRef", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: false }] }], icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: false }] }], isReadonly: [{ type: i0.Input, args: [{ isSignal: true, alias: "isReadonly", required: false }] }], show: [{ type: i0.Input, args: [{ isSignal: true, alias: "show", required: false }] }], tooltip: [{ type: i0.Input, args: [{ isSignal: true, alias: "tooltip", required: false }] }] } });

class DirectivesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: DirectivesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "21.2.6", ngImport: i0, type: DirectivesModule, declarations: [TemplateRefDirective], exports: [TemplateRefDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: DirectivesModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: DirectivesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        TemplateRefDirective,
                    ],
                    exports: [
                        TemplateRefDirective,
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DirectivesModule, TemplateRefDirective };
//# sourceMappingURL=hwmx-angular-directives.mjs.map
