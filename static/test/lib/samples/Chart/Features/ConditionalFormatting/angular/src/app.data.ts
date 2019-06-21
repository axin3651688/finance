import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData(cnt: number, a: number, b: number) {
        let arr = [],
            x = -5 * cnt / 2;
        //
        for (let i = 0; i < cnt; i++) {
            let  rnd = Math.random() * cnt - cnt / 2;
            //
            arr.push({
                x: x,
                y: a + x * (b + rnd) + rnd
            });
            //
            x += .5 + Math.random() * 10;
        }
        //
        return arr;
    }
}