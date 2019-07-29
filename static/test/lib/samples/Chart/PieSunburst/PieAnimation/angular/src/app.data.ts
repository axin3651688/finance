import * as wijmo from '@grapecity/wijmo';
import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        let data = new wijmo.ObservableArray();
        //
        for (let i = 0; i < 5; i++) {
            data.push(this.getRandomData('random' + this._getRandomValue(1000)));
        }
        //
        return data;
    }
    //
    getRandomData(id: string) {
        return {
            id: id,
            y0: this._getRandomValue(200),
            y1: this._getRandomValue(400),
            y2: this._getRandomValue(600),
            y3: this._getRandomValue(800),
            y4: this._getRandomValue(1000)
        };
    }
    //
    private _getRandomValue(max: number) {
        return Math.round(Math.random() * max);
    }
}