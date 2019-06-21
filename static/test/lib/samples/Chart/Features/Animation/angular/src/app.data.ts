import { Injectable } from '@angular/core';
import * as core from '@grapecity/wijmo';
//
@Injectable()
export class DataService {
    getData(numCount: number) {
        var data = new core.ObservableArray();
        //
        for (var i = 0; i < numCount; i++) {
            data.push(this.getRandomData('random' + this.getRandomValue(1000)));
        }
        return data;
    }
    //
    getRandomData(idx: number | string) {
        return {
            //x: getRandomValue(100),
            x: idx,
            y0: this.getRandomValue(200),
            y1: this.getRandomValue(400),
            y2: this.getRandomValue(600),
            y3: this.getRandomValue(800),
            y4: this.getRandomValue(1000)
        }
    }
    //
    getRandomValue(max: number) {
        return Math.round(Math.random() * max);
    }
}