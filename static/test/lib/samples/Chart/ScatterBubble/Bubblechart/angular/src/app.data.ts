import { Injectable } from '@angular/core';
//
export type TDataItem = {
    country: string;
    sales: number;
    expenses: number;
    downloads: number;
}
//
@Injectable()
export class DataService {
    getData() {
        let countries = ['US', 'Canada', 'Mexico', 'UK', 'Germany', 'France', 'Italy', 'Japan', 'Korea', 'China', 'Autralia', 'New Zealand'],
            data: TDataItem[] = [];
        //
        for (let i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                downloads: Math.round(Math.random() * 20000)
            });
        }
        //
        return data;
    }
}