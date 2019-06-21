import { Injectable } from '@angular/core';

export interface DataItem {
    country: string;
    downloads: number;
    sales: number;
    expenses: number;
}
@Injectable()
export class DataService {
    getData(): DataItem[] {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];
        for (var i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}
