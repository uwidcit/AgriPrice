import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'processprice'
})

export class ProcessPricePipe implements PipeTransform { // convert price to price per pound
    transform(value: string, arg1: any): any {
        if (!value) {
            return value;
        }
        let value1 = 1;
        value1 = parseFloat(value);
        if (arg1 === 'Kg') {
            if (value1 === 0) {
                return value1;
            }
            value1 = value1 / 2.20462;
            return value1.toFixed(2);
        } else {
            return value;
        }
    }
}
