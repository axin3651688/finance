import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        let countries = 'US,Canada,Mexico,Japan,Korea,China,Germany,France,UK,Italy,Greece'.split(','),
            data = [];
        //
        for (let i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                leads: Math.random() * 100000,
                qualified: Math.random() * 50000,
                analysis: Math.random() * 5000,
                quotes: Math.random() * 4000,
                negotiations: Math.random() * 1000,
                sales: Math.random() * 800
            });
        }
        //
        return data;
    }
}