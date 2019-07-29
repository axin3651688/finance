import * as wjCore from '@grapecity/wijmo';
import { Injectable } from '@angular/core';

export interface DataItem {
    date: Date;
    buyer: string;
    type: string;
    amount: number;
}

function randomItem(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
}
@Injectable()
export class DataService {
    getData(cnt: number): DataItem[] {
        var today = new Date(),
            buyers = 'Mom,Dad,Kelly,Sheldon'.split(','),
            types = 'Food,Clothes,Fuel,Books,Sports,Music'.split(','),
            data = [];
        for (var i = 0; i < cnt; i++) {
            data.push({
                date: wjCore.DateTime.addDays(today, -Math.random() * 365 * 3),
                buyer: randomItem(buyers),
                type: randomItem(types),
                amount: 20 + Math.random() * 1000
            });
        }
        return data;
    }
}