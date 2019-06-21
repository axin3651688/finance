import { Injectable } from '@angular/core';
//
export type TDataItem = {
    country: string;
    downloads: number;
    sales: number;
    expenses: number;
    active: boolean;
}
//
export const countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece', 'Spain', 'Portugal', 'Australia'];
//
@Injectable()
export class DataService {
    getData() {
        // create some random data
        let data: TDataItem[] = [];
        //
        for (let i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                downloads: Math.round(Math.random() * 20000),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                active: i % 4 == 0
            });
        }
        //
        return data;
    }
}