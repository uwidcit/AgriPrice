import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'removeEmpty'
})

export class RemoveEmptyCropPipe implements PipeTransform {
    transform(array, args: string): Array<object> {
        let i = 0;
        let j = 0;
        const arr1 = [];
        for (i = 0; i < array.length; i++) {
            if (array[i].price !== '0.0') {
                arr1[j++] = array[i];
            }
        }

        return arr1;
    }
}
