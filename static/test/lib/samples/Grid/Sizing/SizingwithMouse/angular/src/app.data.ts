import { Injectable } from '@angular/core';

interface DataItem {
    id: number;
    country: string;
    sales: number;
    expenses: number;
}

@Injectable()
export class DataService {
    getData(): DataItem[] {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            data = [];
        for (var i = 0; i < 50; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}