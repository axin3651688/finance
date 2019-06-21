import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        // create some random data
        let countries = ['China', 'Germany', 'Greece', 'Italy', 'Japan', 'Portugal', 'Russia', 'Spain', 'UK', 'US'],
            data = [];
        //
        for (let i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                active: i % 5 != 0,
                sales: Math.random() * 100000,
                expenses: Math.random() * 50000
            });
        }
        //
        return data;
    }
}