import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertvolume'
})

export class ProcessVolumePipe implements PipeTransform { // convert price to price per pound
  transform(value: string, args: string[]): any {
    if (!value) return value;
    let value1 = parseFloat(value);
    return value1 = Math.round(value1 * 2.20462);
  }
}
