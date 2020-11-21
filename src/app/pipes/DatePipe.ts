import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'date'
})

export class DatePipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) {
            return value;
        }
        return (new Date(value)).toDateString();
    }
}
