import { Injectable } from '@angular/core';
import * as wjCore from '@grapecity/wijmo';
//
@Injectable()
export class DataService {
    getData() {
        let arr = [],
            today = new Date(),
            sales = 1000;
        //
        for (let i = 100; i >= 0; i--) {
            arr.push({
                date: wjCore.DateTime.addDays(today, -i),
                sales: sales
            });
            //
            sales += Math.round(Math.random() * 300 - 130);
        }
        //
        return arr;
    }
    //
    getTypeData() {
        return 'Simple,Weighted,Exponential,Triangular'.split(',');
    }
}