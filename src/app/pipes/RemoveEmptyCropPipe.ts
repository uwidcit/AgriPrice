import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeEmpty'
})

export class RemoveEmptyCropPipe implements PipeTransform{
  transform(array: Array<string>, args: string): Array<string> {
    var i = 0;
    var j = 0;
    var arr1 = [];
    for (i = 0; i<array.length; i++){
      if (array[i]['price']!='0.0')
      arr1[j++]=array[i];
    }

    return arr1;
  }
}