import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        let dataCount = 3000;
        let data = [];
        for (var i = 0; i < dataCount; i++) {
            var mod = Math.floor(i / 10) % 10;
            data.push({
                date: new Date(2005, 0, i),
                yval: mod == 0 ? null : Math.random() * 100
            });
        }
        return data;
    }
}