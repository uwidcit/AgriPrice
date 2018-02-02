import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertprice'
})

export class ProcessPricePipe implements PipeTransform { // convert price to price per pound
  transform(value: string, args: string[]): any {
    if (!value) return value;
    let value1 = 1;
    value1 = parseFloat(value);
    if (value1==0) return value1
		value1 = value1 / 2.20462;
		return value1.toFixed(2);
  }
}

// function round(value1, decimals) {
//   let num = Number(value1);
//   return Math.round(num+'e'+decimals)+'e-'+decimals);
// }