import { Injectable } from '@angular/core';
//
export type TDataItem = {
    id: number;
    country: string;
    sales: number;
    expenses: number;
    overdue: boolean;
}
//
@Injectable()
export class DataService {
    private _countries = ['US', 'Germany', 'UK', 'Japan', 'Sweden', 'Norway', 'Denmark'];
    //
    getCountries() {
        return this._countries;
    }
    //
    getData() {
        let data: TDataItem[] = [];
        //
        for (let i = 0; i < 100; i++) {
            data.push({
                id: i,
                country: this._countries[i % this._countries.length],
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000,
                overdue: (i + 1) % 4 == 0
            });
        }
        //
        return data;
    }
}