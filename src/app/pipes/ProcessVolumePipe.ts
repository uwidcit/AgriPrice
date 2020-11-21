import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'convertvolume'
})

export class ProcessVolumePipe implements PipeTransform { // convert price to price per pound
    transform(value: string, args: string[]): any {
        if (!value) {
            return value;
        }
        return Math.round(parseFloat(value) * 2.20462);
    }
}
