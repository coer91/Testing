import { Pipe, PipeTransform } from '@angular/core';
import { Dates, Tools } from 'hwmx-angular/tools';

@Pipe({ name: 'date', standalone: false })
export class DatePipe implements PipeTransform {

    transform(value: string | Date | null, format?: 'MDY' | 'DMY'): string {
        return value ? Dates.ToFormatDate(value, format) : '';
    }
}