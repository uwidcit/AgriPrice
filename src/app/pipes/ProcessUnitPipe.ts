import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pound'
})

export class ProcessUnitPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;
    if (value == "Kg") value = "lb";
    return value;
  }
}