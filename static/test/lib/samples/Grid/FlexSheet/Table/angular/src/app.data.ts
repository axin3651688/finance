import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    
    getTableData(count: number) {
        let data = [],
            countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'],
            products = ['Widget', 'Gadget', 'Doohickey'],
            i = 0,
            country: string,
            product: string;

        for (i = 0; i < count; i++) {
            country = countries[Math.floor(Math.random() * countries.length)];
            product = products[Math.floor(Math.random() * products.length)];
            data.push({
                ID: i,
                Country: country,
                Product: product,
                Date: new Date(2014, i % 12, i % 28),
                Amount: Math.random() * 10000
            });
        }
        return data;
    }
}