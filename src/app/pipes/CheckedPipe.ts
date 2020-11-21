import {Pipe, PipeTransform} from '@angular/core';
import {Storage} from '@ionic/storage';

@Pipe({
    name: 'check'
})

export class CheckedPipe implements PipeTransform {
    constructor(private storage: Storage) {
    }

    transform(value: string, args: string[]): any {
        if (this.storage.get(value) !== null) {
            this.storage.get(value).then((val) => {
                return val;
            });
        } else {
            return 'false';
        }
    }
}
