import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@angular/router';
import * as i3 from '@angular/forms';
import * as i4 from 'hwmx-angular/components';
import * as i5 from 'hwmx-angular/core';
import * as i6 from 'hwmx-angular/directives';
import * as i7 from 'hwmx-angular/pipes';
import * as i8 from 'hwmx-angular/tools';

declare global {
    interface Array<T> {
        /** */
        setIndex(...args: T[][]): T[];
        /** */
        setId(...args: T[][]): T[];
        /** */
        distinct(): T[];
        /** */
        except(exceptions: T[], property?: string): T[];
        /** */
        intercept(array: T[], property?: string): T[];
        /** */
        sortAsc(property?: string): T[];
        /** */
        sortDesc(property?: string): T[];
        /** */
        search(text: string, properties?: string[]): T[];
    }
}

declare global {
    interface Date {
        /** */
        getOffset(): number;
        /** */
        isValidDate(): boolean;
        /** */
        getLastDayOfMonth(): number;
        /** */
        getCurrentDate(): Date;
        /** */
        getCurrentUTCDate(): Date;
        /** Convert UTC Date to Local Zone */
        toLocalZone(): Date;
        /** Convert Local Zone Date to UTC */
        toUTC(): Date;
        /** YYYY-MM-DD HH:mm:ss */
        toFormatDB(): string;
        /** */
        toFormatDate(format?: 'MDY' | 'DMY' | 'YMD'): string;
        /** */
        toFormatDateTime(ampm?: boolean, format?: 'MDY' | 'DMY' | 'YMD'): string;
        /** YYYY-MM-DD */
        toDateOnly(): string;
        /** */
        addMilliseconds(milliseconds: number): Date;
        /** */
        addSeconds(seconds: number): Date;
        /** */
        addMinutes(minutes: number): Date;
        /** */
        addHours(hours: number): Date;
        /** */
        addDays(days: number): Date;
        /** */
        addWeeks(weeks: number): Date;
        /** */
        addMonths(months: number): Date;
        /** */
        addYears(years: number): Date;
        /** */
        setMillisecond(millisecond?: number): Date;
        /** */
        setSecond(second?: number): Date;
        /** */
        setMinute(minute?: number): Date;
        /** */
        setHour(hour?: number): Date;
        /** */
        setFirstHour(): Date;
        /** */
        setLastHour(): Date;
        /** */
        setDay(day?: number): Date;
        /** */
        setFirstDay(): Date;
        /** */
        setLastDay(): Date;
        /** */
        getDiffNow(unit?: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days', isUTC?: boolean): number;
        /** */
        getDiff(date: string | Date, unit?: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days'): number;
        /** */
        getTimeSpan(): string;
    }
}

declare global {
    interface HTMLElement {
        /** */
        scrollX(x: number): HTMLElement | null;
        /** */
        scrollY(y: number): HTMLElement | null;
        /** */
        scrollToCoordinates(x: number, y: number): HTMLElement | null;
        /** */
        scrollToElement(toView?: 'start' | 'center' | 'end' | 'nearest'): HTMLElement | null;
        /** */
        getOffsetTop(): number;
        /** */
        getCssValue(style: string): string;
        /** Gets the height of the element in px */
        getElementWidth(): string;
        /** Gets the height of the element in px */
        getElementHeight(): string;
        hasClass(className: string): boolean;
        addClass(className: string): HTMLElement | null;
        removeClass(className: string): HTMLElement | null;
        getChildren(): HTMLElement[];
        getFather(): HTMLElement | null;
    }
}

declare global {
    interface Number {
        /** */
        setDecimals(decimals?: number): string;
        /** */
        toNumericFormat(decimals?: number): string;
        /** */
        toCurrency(symbol?: string, currency?: string): string;
    }
}

declare global {
    interface String {
        /** Sets the first character to lowercase */
        firstCharToLower(): string;
        /** Sets the first character to uppercase */
        firstCharToUpper(): string;
        /** Clean extra whitespaces */
        cleanUpBlanks(): string;
        /** Apply title formatting */
        toTitle(): string;
        /** Removes the last character */
        removeLastChar(): string;
        /** Removes accents */
        removeAccents(except?: string[]): string;
        /** Removes special characters */
        removeSpecialCharacters(): string;
        /** Only alphaNumeric */
        onlyAlphanumeric(): string;
        /** Only Numbers */
        onlyNumbers(): string;
        /** Validates if both strings are equal */
        equals(value: string | number | null | undefined, sensitive?: boolean): boolean;
        /** Returns true if the value is null or undefined or contains only whitespace, false otherwise */
        isOnlyWhiteSpace(): boolean;
        /** Returns true if has string value and is not only whitespace, false otherwise */
        isNotOnlyWhiteSpace(): boolean;
        /** */
        concatName(...args: string[]): string;
    }
}

declare class HWMXModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<HWMXModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<HWMXModule, never, [typeof i1.CommonModule, typeof i2.RouterModule, typeof i2.RouterOutlet, typeof i3.FormsModule, typeof i3.ReactiveFormsModule, typeof i4.ComponentsModule, typeof i5.CoreModule, typeof i6.DirectivesModule, typeof i7.PipesModule, typeof i8.CoerAlert], [typeof i1.CommonModule, typeof i2.RouterModule, typeof i2.RouterOutlet, typeof i3.FormsModule, typeof i3.ReactiveFormsModule, typeof i4.WIAButton, typeof i4.WIADateBox, typeof i4.WIAForm, typeof i4.WIAGrid, typeof i4.WIAModal, typeof i4.WIANumberBox, typeof i4.WIAPageTitle, typeof i4.WIASecretBox, typeof i4.WIASelectBox, typeof i4.WIASwitch, typeof i4.WIATextBox, typeof i5.WiaRoot, typeof i6.TemplateRefDirective, typeof i7.DatePipe, typeof i7.DateTimePipe, typeof i7.CurrencyPipe, typeof i7.HtmlPipe, typeof i7.IndexCollectionPipe, typeof i7.NoImagePipe, typeof i7.NumericFormatPipe, typeof i7.TimePipe, typeof i8.CoerAlert]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<HWMXModule>;
}

export { HWMXModule };
