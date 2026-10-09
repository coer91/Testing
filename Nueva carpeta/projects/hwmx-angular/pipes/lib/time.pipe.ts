import { Pipe, PipeTransform } from '@angular/core';
import { Dates } from 'hwmx-angular/tools';

@Pipe({ name: 'time', standalone: false })
export class TimePipe implements PipeTransform {

    transform(value: string | Date, ampm: boolean = false): string {
        return Dates.ToFormatTime(value, ampm);
    }
}