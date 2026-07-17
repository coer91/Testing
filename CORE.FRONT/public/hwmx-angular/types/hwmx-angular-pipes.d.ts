import * as i0 from '@angular/core';
import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare class CurrencyPipe implements PipeTransform {
    transform(value: string | number | null | undefined, symbol?: string, currency?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrencyPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CurrencyPipe, "currency", false>;
}

declare class DateTimePipe implements PipeTransform {
    transform(value: string | Date, ampm?: boolean, format?: 'MDY' | 'DMY'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateTimePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DateTimePipe, "datetime", false>;
}

declare class DatePipe implements PipeTransform {
    transform(value: string | Date, format?: 'MDY' | 'DMY'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DatePipe, "date", false>;
}

declare class HtmlPipe implements PipeTransform {
    private sanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(value: string): SafeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<HtmlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<HtmlPipe, "html", false>;
}

declare class IndexCollectionPipe implements PipeTransform {
    transform<T>(value: T[]): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<IndexCollectionPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IndexCollectionPipe, "index-collection", false>;
}

declare class NoImagePipe implements PipeTransform {
    transform(value: string | File | null | undefined, defaultImage?: 'IMAGE' | 'USER'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NoImagePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NoImagePipe, "noImage", false>;
}

declare class NumericFormatPipe implements PipeTransform {
    transform(value: string | number | null | undefined, decimals?: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<NumericFormatPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<NumericFormatPipe, "numericFormat", false>;
}

declare class TimePipe implements PipeTransform {
    transform(value: string | Date, ampm?: boolean): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TimePipe, "time", false>;
}

declare class TranslatoryPipe implements PipeTransform {
    transform(value: string | number | null | undefined, translatory?: 'en_US' | 'es_MX' | 'ko-KR' | null): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslatoryPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TranslatoryPipe, "translatory", false>;
}

declare class PipesModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<PipesModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PipesModule, [typeof CurrencyPipe, typeof DateTimePipe, typeof DatePipe, typeof HtmlPipe, typeof IndexCollectionPipe, typeof NoImagePipe, typeof NumericFormatPipe, typeof TimePipe, typeof TranslatoryPipe], never, [typeof CurrencyPipe, typeof DateTimePipe, typeof DatePipe, typeof HtmlPipe, typeof IndexCollectionPipe, typeof NoImagePipe, typeof NumericFormatPipe, typeof TimePipe, typeof TranslatoryPipe]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PipesModule>;
}

export { CurrencyPipe, DatePipe, DateTimePipe, HtmlPipe, IndexCollectionPipe, NoImagePipe, NumericFormatPipe, PipesModule, TimePipe, TranslatoryPipe };
