import { Injectable } from '@angular/core';

export interface DataItem {
    country: string;
    product: string;
    downloads: number;
    sales: number;
    expenses:number;
}

@Injectable()
export class DataService {
    getData(cnt: number): DataItem[] {
        var countries = 'US,Germany,UK,Japan,Italy'.split(','),
            products = 'Widgets,Gadgets,Doohickeys'.split(','),
            data = [];
        for (var i = 0; i < cnt; i++) {
            data.push({
                country: countries[i % countries.length],
                product: products[i % products.length],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}