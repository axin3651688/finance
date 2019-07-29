import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData(cnt: number) {
        let arr = [],
            y = 0;
        //
        for (let i = 0; i < cnt; i++) {
            arr.push({ x: i, y: y });
            y = Math.random() * 100;
        }
        //
        return arr;
    }
}