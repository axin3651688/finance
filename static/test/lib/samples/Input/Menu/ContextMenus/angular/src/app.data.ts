import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        let countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'],
            data = [];
        //
        for (let i = 0; i < countries.length; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        //
        return data;
    }
}