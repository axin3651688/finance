import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData(callback: (data: any[]) => void, delay: number) {
        let countries = ['US', 'UK', 'China', 'Germany', 'India'],
            data: any[] = [];
        //
        for (let i = 0; i < 1000; i++) {
            data.push({
                id: i,
                country: countries[i % countries.length],
                sales: Math.random() * 1000,
                downloads: Math.random() * 10000,
            });
        }
        //
        setTimeout(() => callback(data), delay);
    }
}

