import { Pipe, PipeTransform } from '@angular/core'; 
import { Dates } from 'hwmx-angular/tools';

@Pipe({ name: 'datetime', standalone: false })
export class DateTimePipe implements PipeTransform {

    transform(value: string | Date | null, ampm: boolean = false, format?: 'MDY' | 'DMY'): string {
        return value ? Dates.ToFormatDateTime(value, ampm, format) : '';
    }
}