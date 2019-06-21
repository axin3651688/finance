import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        let year = '2018',
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            categories = ['Music', 'Video', 'Books', 'Electronics', 'Computers'];
        let data: any[] = [];
        //
        months.forEach(month => {
            let val = {
                    month: month + ' ' + year,
                    max: 50000,
                    actual: 0,
                    target: 25000,
                    bad: 15000,
                    good: 40000,
                    items: <any>[]
                };
            //
            categories.forEach(category => {
                let v = {
                    category: category,
                    max: 10000,
                    target: 5000,
                    bad: 3000,
                    good: 8000,
                    actual: 0
                };
                let actual = Math.random();
                actual = Math.round(actual * 10000);
                v.actual = actual;
                val.actual += actual;
                val.items.push(v);
            });
            data.push(val);
        });
        return data;
    }
    //
    getSales() {
        let data = this.getData(),
            cats: any[] = [];
        //
        data.forEach(d => {
            let items = d.items;
            items.forEach((item: any, idx: number) => {
                if(idx >= cats.length) {
                    cats.push({
                        category: item.category,
                        max: 0,
                        target: 0,
                        bad: 0,
                        good: 0,
                        actual: 0
                    });
                }
                let cat = cats[idx];
                cat.max += item.max;
                cat.target += item.target;
                cat.bad += item.bad;
                cat.good += item.good;
                cat.actual += item.actual;
            });
        });
        return {
            month: data,
            category: cats
        }
    }
}