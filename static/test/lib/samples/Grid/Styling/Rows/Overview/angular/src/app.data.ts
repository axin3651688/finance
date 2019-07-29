import { Injectable } from '@angular/core';

interface DataItem {
    id: number;
    country: string;
    product: string;
    comment: string;
    sales: number;
    expenses: number;
}

@Injectable()
export class DataService {
    getData(): DataItem[] {
        var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
            products = 'Phones,Computers,Cameras,Stereos'.split(','),
            data = [];
        for (var i = 0; i < 200; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                product: products[i % products.length],
                comment: i % 5 == 0 ? 'This item has a long comment so it will wrap in the cell.' : '',
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
            });

        }
        return data;
    }
}