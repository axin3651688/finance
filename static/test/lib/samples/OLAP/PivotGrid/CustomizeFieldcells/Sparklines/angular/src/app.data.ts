import { Injectable } from '@angular/core';
//
export interface DataItem {
    product: string;
    country: string;
    active: boolean;
    date: Date;
    sales: number;
    downloads: number;
}
//
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//
@Injectable()
export class DataService {
    getData(cnt: number): DataItem[] {
        let year = new Date().getFullYear(),
            data = [];
        //
        for (let i = 0; i < cnt; i++) {
            data.push({
                product: randomInt(0, 1) ? 'Wijmo' : 'Aoba',
                country: randomInt(0, 1) ? 'USA' : 'Japan',
                active: i % 2 == 0,
                date: new Date(year - randomInt(0, 2), randomInt(0, 11), randomInt(0, 27) + 1),
                sales: randomInt(10, 20),
                downloads: randomInt(10, 200)
            });
        }
        //
        return data;
    }
}