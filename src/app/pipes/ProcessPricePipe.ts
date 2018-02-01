import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertprice'
})

export class ProcessPricePipe implements PipeTransform { // convert price to price per pound
  transform(value: string, args: string[]): any {
    if (!value) return value;
    let value1 = parseFloat(value.slice(1));
		value1 = value1 / 2.20462;

		return value1;
  }
}