import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        let countries = ['US', 'Canada', 'Mexico', 'Germany', 'UK', 'France', 'Japan', 'Korea', 'China'],
            data = [];
        //
        for (let i = 0; i < countries.length; i++) {
            data.push({
                country: countries[i],
                sales: this.getRandomArray(20, 10000),
                expenses: this.getRandomArray(20, 5000)
            });
        }
        //
        return data;
    }
    //
    getRandomArray(count: number, max: number) {
        let arr = [];
        //
        for (var i = 0; i < count; i++) {
            arr.push(
                Math.random() * max / 3 +
                Math.random() * max / 3 +
                Math.random() * max / 3
            );
        }
        //
        return arr;
    }
}