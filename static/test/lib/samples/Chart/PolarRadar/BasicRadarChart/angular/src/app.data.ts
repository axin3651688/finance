import { Injectable } from '@angular/core';
interface DataItem {
    country: string;
    downloads: number;
    sales: number;
}
@Injectable()
export class DataService {
    getData() {
        var data: DataItem[] = [],
            countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
        countries.forEach(function (country) {
            data.push({
                country: country,
                downloads: Math.ceil(Math.random() * 80) + 20,
                sales: Math.ceil(Math.random() * 80) + 20
            });
        });
        return data;
    }
}