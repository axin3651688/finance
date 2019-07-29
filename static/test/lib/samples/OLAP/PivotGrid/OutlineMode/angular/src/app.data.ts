import { Injectable } from '@angular/core';
import * as wjCore from '@grapecity/wijmo';

@Injectable()
export class DataService {
    getData(cnt: number): any[] {
        let countries = 'Germany,Italy,Japan,UK,US'.split(','),
            products = 'Widgets,Gadgets,Doohickeys'.split(','),
            colors = 'Red,Green,Blue,Yellow,Purple,White,Black,Magenta'.split(','),
            data = [];
        for (let i = 0; i < cnt; i++) {
            let trend = (i % countries.length + 1) * (i % products.length + 1);
            data.push({
                country: randomItem(countries),
                product: randomItem(products),
                color: randomItem(colors),
                active: i % 5 == 0,
                due: new Date(),
                sales: Math.random() * 10000 * trend,
                expenses: Math.random() * 5000 * trend,
                downloads: Math.random() * 100000 * trend,
            });
        }
        return data;
    }
}

function randomItem(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
}
