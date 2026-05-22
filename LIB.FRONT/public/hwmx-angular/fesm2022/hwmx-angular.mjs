import * as i0 from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as tools from 'hwmx-angular/tools';
import { Collections, Dates, HTMLElements, Numbers, Strings, Tools } from 'hwmx-angular/tools';
import * as components from 'hwmx-angular/components';
import * as core from 'hwmx-angular/core';
import * as directives from 'hwmx-angular/directives';
import * as pipes from 'hwmx-angular/pipes';

Array.prototype.setIndex = function (...args) {
    return Collections.SetIndex([...this], args);
};
Array.prototype.setId = function (...args) {
    return Collections.SetId([...this], args);
};
Array.prototype.distinct = function () {
    return Collections.Distinct(this);
};
Array.prototype.except = function (exceptions, property = null) {
    return Collections.Except(this, exceptions, property);
};
Array.prototype.intercept = function (array, property = null) {
    return Collections.Intercept(this, array, property);
};
Array.prototype.sortAsc = function (property = null) {
    return Collections.SortAsc(this, property);
};
Array.prototype.sortDesc = function (property = null) {
    return Collections.SortDesc(this, property);
};
Array.prototype.search = function (text, properties = []) {
    return Collections.Search(this, text, properties);
};

Date.prototype.getOffset = function () {
    return Dates.GetOffset();
};
Date.prototype.isValidDate = function () {
    return Dates.IsValidDate(this);
};
Date.prototype.getLastDayOfMonth = function () {
    return Dates.GetLastDayOfMonth(this);
};
Date.prototype.getCurrentDate = function () {
    return Dates.GetCurrentDate();
};
Date.prototype.getCurrentUTCDate = function () {
    return Dates.GetCurrentUTCDate();
};
Date.prototype.toLocalZone = function () {
    return Dates.ToLocalZone(this);
};
Date.prototype.toUTC = function () {
    return Dates.ToUTC(this);
};
Date.prototype.toFormatDB = function () {
    return Dates.ToFormatDB(this);
};
Date.prototype.toFormatDate = function (format) {
    return Dates.ToFormatDate(this, format);
};
Date.prototype.toFormatDateTime = function (ampm = true, format) {
    return Dates.ToFormatDateTime(this, ampm, format);
};
Date.prototype.toDateOnly = function () {
    return Dates.ToDateOnly(this);
};
Date.prototype.addMilliseconds = function (milliseconds = 1) {
    return Dates.AddMilliseconds(this, milliseconds);
};
Date.prototype.addSeconds = function (seconds = 1) {
    return Dates.AddSeconds(this, seconds);
};
Date.prototype.addMinutes = function (minutes = 1) {
    return Dates.AddMinutes(this, minutes);
};
Date.prototype.addHours = function (hours = 1) {
    return Dates.AddHours(this, hours);
};
Date.prototype.addDays = function (days = 1) {
    return Dates.AddDays(this, days);
};
Date.prototype.addWeeks = function (weeks = 1) {
    return Dates.AddWeeks(this, weeks);
};
Date.prototype.addMonths = function (months = 1) {
    return Dates.AddMonths(this, months);
};
Date.prototype.addYears = function (years = 1) {
    return Dates.AddYears(this, years);
};
Date.prototype.setMillisecond = function (millisecond = 0) {
    return Dates.SetMillisecond(this, millisecond);
};
Date.prototype.setSecond = function (second = 0) {
    return Dates.SetSecond(this, second);
};
Date.prototype.setMinute = function (minute = 0) {
    return Dates.SetMinute(this, minute);
};
Date.prototype.setHour = function (hour = 0) {
    return Dates.SetHour(this, hour);
};
Date.prototype.setFirstHour = function () {
    return Dates.SetFirstHour(this);
};
Date.prototype.setLastHour = function () {
    return Dates.SetLastHour(this);
};
Date.prototype.setDay = function (day = 1) {
    return Dates.SetDay(this, day);
};
Date.prototype.setFirstDay = function () {
    return Dates.SetFirstDay(this);
};
Date.prototype.setLastDay = function () {
    return Dates.SetLastDay(this);
};
Date.prototype.getDiffNow = function (unit = 'minutes', isUTC = true) {
    return Dates.GetDiffNow(this, unit, isUTC);
};
Date.prototype.getDiff = function (date, unit = 'minutes') {
    return Dates.GetDiff(this, date, unit);
};
Date.prototype.getTimeSpan = function () {
    return Dates.GetTimeSpan(this);
};

HTMLElement.prototype.scrollX = function (x) {
    return HTMLElements.ScrollX(this, x);
};
HTMLElement.prototype.scrollY = function (y) {
    return HTMLElements.ScrollY(this, y);
};
HTMLElement.prototype.scrollToCoordinates = function (x, y) {
    return HTMLElements.ScrollToCoordinates(this, x, y);
};
HTMLElement.prototype.scrollToElement = function (toView = 'nearest') {
    return HTMLElements.ScrollToElement(this, toView);
};
HTMLElement.prototype.getOffsetTop = function () {
    return HTMLElements.GetOffsetTop(this);
};
HTMLElement.prototype.getCssValue = function (style) {
    return HTMLElements.GetCssValue(this, style);
};
HTMLElement.prototype.getElementWidth = function () {
    return HTMLElements.GetWidth(this);
};
HTMLElement.prototype.getElementHeight = function () {
    return HTMLElements.GetHeight(this);
};
HTMLElement.prototype.hasClass = function (className) {
    return HTMLElements.HasClass(this, className);
};
HTMLElement.prototype.addClass = function (className) {
    return HTMLElements.AddClass(this, className);
};
HTMLElement.prototype.removeClass = function (className) {
    return HTMLElements.RemoveClass(this, className);
};
HTMLElement.prototype.getChildren = function () {
    return HTMLElements.GetChildren(this);
};
HTMLElement.prototype.getFather = function () {
    return HTMLElements.GetFather(this);
};

Number.prototype.setDecimals = function (decimals = 2) {
    return Numbers.SetDecimals(Number(this), decimals);
};
Number.prototype.toNumericFormat = function (decimals = 0) {
    return Numbers.ToNumericFormat(Number(this), decimals);
};
Number.prototype.toCurrency = function (symbol = '$', currency = '') {
    return Numbers.ToCurrency(Number(this), symbol, currency);
};

String.prototype.firstCharToLower = function () {
    return Strings.FirstCharToLower(this.toString());
};
String.prototype.firstCharToUpper = function () {
    return Strings.FirstCharToUpper(this.toString());
};
String.prototype.cleanUpBlanks = function () {
    return Strings.CleanUpBlanks(this.toString());
};
String.prototype.toTitle = function () {
    return Strings.ToTitle(this.toString());
};
String.prototype.removeLastChar = function () {
    return Strings.RemoveLastChar(this.toString());
};
String.prototype.removeAccents = function (except = []) {
    return Strings.RemoveAccents(this.toString(), except);
};
String.prototype.removeSpecialCharacters = function () {
    return Strings.RemoveSpecialCharacters(this.toString());
};
String.prototype.onlyAlphanumeric = function () {
    return Strings.OnlyAlphanumeric(this.toString());
};
String.prototype.onlyNumbers = function () {
    return Strings.OnlyNumbers(this.toString());
};
String.prototype.equals = function (value, sensitive = false) {
    return Strings.Equals(this.toString(), value, sensitive);
};
String.prototype.isOnlyWhiteSpace = function () {
    return Tools.IsOnlyWhiteSpace(this);
};
String.prototype.isNotOnlyWhiteSpace = function () {
    return Tools.IsNotOnlyWhiteSpace(this);
};
String.prototype.concatName = function (...args) {
    return Strings.ConcatName(this.toString(), ...args);
};

class HWMXModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: HWMXModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "21.2.6", ngImport: i0, type: HWMXModule, imports: [CommonModule,
            RouterModule,
            RouterOutlet,
            FormsModule,
            ReactiveFormsModule, components.ComponentsModule, core.CoreModule, directives.DirectivesModule, pipes.PipesModule, tools.CoerAlert], exports: [CommonModule,
            RouterModule,
            RouterOutlet,
            FormsModule,
            ReactiveFormsModule, components.WIAButton, components.WIADateBox, components.WIAForm, components.WIAGrid, components.WIAModal, components.WIANumberBox, components.WIAPageTitle, components.WIASecretBox, components.WIASelectBox, components.WIASwitch, components.WIATextBox, core.WiaRoot, directives.TemplateRefDirective, pipes.DatePipe, pipes.DateTimePipe, pipes.CurrencyPipe, pipes.HtmlPipe, pipes.IndexCollectionPipe, pipes.NoImagePipe, pipes.NumericFormatPipe, pipes.TimePipe, tools.CoerAlert] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: HWMXModule, providers: [
            tools.CoerAlert
        ], imports: [CommonModule,
            RouterModule,
            FormsModule,
            ReactiveFormsModule,
            components.ComponentsModule,
            core.CoreModule,
            directives.DirectivesModule,
            pipes.PipesModule,
            tools.CoerAlert, CommonModule,
            RouterModule,
            FormsModule,
            ReactiveFormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.6", ngImport: i0, type: HWMXModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        RouterOutlet,
                        FormsModule,
                        ReactiveFormsModule,
                        components.ComponentsModule,
                        core.CoreModule,
                        directives.DirectivesModule,
                        pipes.PipesModule,
                        tools.CoerAlert,
                    ],
                    providers: [
                        tools.CoerAlert
                    ],
                    exports: [
                        CommonModule,
                        RouterModule,
                        RouterOutlet,
                        FormsModule,
                        ReactiveFormsModule,
                        components.WIAButton,
                        components.WIADateBox,
                        components.WIAForm,
                        components.WIAGrid,
                        components.WIAModal,
                        components.WIANumberBox,
                        components.WIAPageTitle,
                        components.WIASecretBox,
                        components.WIASelectBox,
                        components.WIASwitch,
                        components.WIATextBox,
                        core.WiaRoot,
                        directives.TemplateRefDirective,
                        pipes.DatePipe,
                        pipes.DateTimePipe,
                        pipes.CurrencyPipe,
                        pipes.HtmlPipe,
                        pipes.IndexCollectionPipe,
                        pipes.NoImagePipe,
                        pipes.NumericFormatPipe,
                        pipes.TimePipe,
                        tools.CoerAlert,
                    ]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { HWMXModule };
//# sourceMappingURL=hwmx-angular.mjs.map
