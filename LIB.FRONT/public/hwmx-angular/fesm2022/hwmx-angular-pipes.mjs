import * as i0 from '@angular/core';
import { Pipe, NgModule } from '@angular/core';
import { Numbers, Dates, Collections, Tools } from 'hwmx-angular/tools';
import * as i1 from '@angular/platform-browser';

class CurrencyPipe {
    transform(value, symbol = '$', currency = '') {
        return Numbers.ToCurrency(value, symbol, currency);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: CurrencyPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.2.6", ngImport: i0, type: CurrencyPipe, isStandalone: false, name: "currency" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: CurrencyPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'currency', standalone: false }]
        }] });

class DateTimePipe {
    transform(value, ampm = false, format) {
        return Dates.ToFormatDateTime(value, ampm, format);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: DateTimePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.2.6", ngImport: i0, type: DateTimePipe, isStandalone: false, name: "datetime" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: DateTimePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'datetime', standalone: false }]
        }] });

class DatePipe {
    transform(value, format) {
        return Dates.ToFormatDate(value, format);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: DatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.2.6", ngImport: i0, type: DatePipe, isStandalone: false, name: "date" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: DatePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'date', standalone: false }]
        }] });

class HtmlPipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: HtmlPipe, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.2.6", ngImport: i0, type: HtmlPipe, isStandalone: false, name: "html" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: HtmlPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'html', standalone: false }]
        }], ctorParameters: () => [{ type: i1.DomSanitizer }] });

class IndexCollectionPipe {
    transform(value) {
        return Collections.SetIndex(value || []);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: IndexCollectionPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.2.6", ngImport: i0, type: IndexCollectionPipe, isStandalone: false, name: "index-collection" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: IndexCollectionPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'index-collection', standalone: false }]
        }] });

class NoImagePipe {
    transform(value, defaultImage = 'IMAGE') {
        if (typeof value == 'string' && value.trim().toUpperCase() == 'LOADING')
            return 'coersystem/images/loading.gif';
        let NO_IMAGE = (defaultImage === 'IMAGE')
            ? 'hwmx-angular/images/no-image.png'
            : 'hwmx-angular/images/no-user.png';
        if (Tools.IsOnlyWhiteSpace(value)) {
            return NO_IMAGE;
        }
        else if (typeof value === 'string') {
            return value;
        }
        //Files.ConvertToBase64(value as File).then(base64 => { return base64 });
        return NO_IMAGE;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: NoImagePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.2.6", ngImport: i0, type: NoImagePipe, isStandalone: false, name: "noImage" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: NoImagePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'noImage', standalone: false }]
        }] });

class NumericFormatPipe {
    transform(value, decimals = 0) {
        return Numbers.ToNumericFormat(value, decimals);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: NumericFormatPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.2.6", ngImport: i0, type: NumericFormatPipe, isStandalone: false, name: "numericFormat" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: NumericFormatPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'numericFormat', standalone: false }]
        }] });

class TimePipe {
    transform(value, ampm = false) {
        return Dates.ToFormatTime(value, ampm);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: TimePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "21.2.6", ngImport: i0, type: TimePipe, isStandalone: false, name: "time" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: TimePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'time', standalone: false }]
        }] });

class PipesModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: PipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "21.2.6", ngImport: i0, type: PipesModule, declarations: [CurrencyPipe,
            DateTimePipe,
            DatePipe,
            HtmlPipe,
            IndexCollectionPipe,
            NoImagePipe,
            NumericFormatPipe,
            TimePipe], exports: [CurrencyPipe,
            DateTimePipe,
            DatePipe,
            HtmlPipe,
            IndexCollectionPipe,
            NoImagePipe,
            NumericFormatPipe,
            TimePipe] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: PipesModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: PipesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        CurrencyPipe,
                        DateTimePipe,
                        DatePipe,
                        HtmlPipe,
                        IndexCollectionPipe,
                        NoImagePipe,
                        NumericFormatPipe,
                        TimePipe
                    ],
                    exports: [
                        CurrencyPipe,
                        DateTimePipe,
                        DatePipe,
                        HtmlPipe,
                        IndexCollectionPipe,
                        NoImagePipe,
                        NumericFormatPipe,
                        TimePipe
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { CurrencyPipe, DatePipe, DateTimePipe, HtmlPipe, IndexCollectionPipe, NoImagePipe, NumericFormatPipe, PipesModule, TimePipe };
//# sourceMappingURL=hwmx-angular-pipes.mjs.map
