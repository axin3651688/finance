import { Injectable } from '@angular/core';
import * as wjcCore from '@grapecity/wijmo';

@Injectable()
export class DataService {
    getData(cnt: number): any[] {
        let data = [],
            today = new Date();
        for (let i = 0; i < cnt; i++) {
            data.push({
                sel: false,
                title: this.getOneOf(['Lunch Tomorrow', 'Meeting on Friday', 'Quarterly Review', 'Evaluation']),
                from: this.getOneOf(['joe@joe.com', 'mark@smith.com', 'todd@schick.com', 'sun@wong.com']),
                priority: this.getOneOf([1, 2, 3]),
                immediate: Math.random() > .75,
                date: wjcCore.DateTime.addDays(today, i)
            });
        }
        return data;
    }

    getOneOf(arr: any[]): string {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}
