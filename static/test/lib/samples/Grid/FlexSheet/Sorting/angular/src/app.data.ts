import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
    products = ['Widget', 'Gadget', 'Doohickey'];
    getData(count: number) {
        let data = [],
            i = 0,
            countryId,
            productId;
    
        for (; i < count; i++) {
            countryId = Math.floor(Math.random() * this.countries.length);
            productId = Math.floor(Math.random() * this.products.length);
            data.push({
                id: i,
                countryId: countryId,
                productId: productId,
                date: new Date(2014, i % 12, i % 28),
                amount: Math.random() * 10000,
                active: i % 4 === 0
            });
        }
        return data;
    }
}