import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        let arr = [];
        for (let i = 0; i < 20; i++) {
            arr.push('item ' + i);
        }
        return arr;
    }
}