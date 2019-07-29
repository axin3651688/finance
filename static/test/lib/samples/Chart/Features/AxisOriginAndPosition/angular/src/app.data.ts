import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData(num: number) {
        let data = [],
            cnt = 0;
        for(let i = 0; cnt < num; i++) {
            let x = 1 - 2 * Math.random();
            let y = 1 - 2 * Math.random();
            if(x*x + y*y <= 1) {
                data.push({
                    x: x,
                    y1: y,
                    y2: 0 - y
                });
                cnt++;
            }
        }
        return data;
    }
}