import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
   // get an array with random data
   getData(cnt: number, start?: number): any[] { 
      let data = [];
      let countries = 'USA,Germany,UK,Japan,Italy,Greece'.split(',');
      if (!start) start = 0;
      for (let i = 0; i < cnt; i++) {
         data.push({
            id: i + start,
            country: countries[i % countries.length],
            date: new Date(2014, i % 12, i % 28),
            amount: Math.random() * 10000,
            active: i % 4 === 0
         });
      }
      return data;
   }
}