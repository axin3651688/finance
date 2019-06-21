import { Injectable } from '@angular/core';

export interface DataItem {
    id: number;
    country: string;
    active: boolean;
    downloads: number;
    sales: number;
    expenses: number;
}


@Injectable()
export class DataService {
    getData(): DataItem[] {
        var countries = 'US,Germany,UK,Japan'.split(',');
        var data = [];
        for (var i = 0; i < 20; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                active: i % 5 != 0,
                downloads: Math.round(Math.random() * 200000),
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        return data;
    }
}