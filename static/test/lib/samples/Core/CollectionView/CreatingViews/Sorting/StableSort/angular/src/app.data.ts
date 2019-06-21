import { Injectable } from '@angular/core';
//
export type TDataItem = {
    id: number;
    country: string;
    color: string;
    active: boolean;
    downloads: number;
    sales: number;
    expenses: number;
}
//
@Injectable()
export class DataService {
    getData() {
        let countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'],
            colors = ['Red', 'Green', 'Blue', 'White'],
            data: TDataItem[] = [];
        //
        for (let i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                color: colors[i % colors.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        //
        return data;
    }
}
