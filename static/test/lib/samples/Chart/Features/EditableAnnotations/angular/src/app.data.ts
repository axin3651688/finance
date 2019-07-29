import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        var data = [],
            numCount = 100;
    
        for (var i = 0; i < numCount; i++) {
            data.push({
                x: this.getRandomValue(100),
                y: this.getRandomValue(1000)
            });
        }
        return data;
    }
    //
    getRandomValue(max: number) {
        return Math.round(Math.random() * max);
    }
}