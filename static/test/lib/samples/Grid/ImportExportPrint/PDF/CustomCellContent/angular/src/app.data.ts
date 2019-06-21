import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    //
    getData(count: number) {
        // data used to generate random items
        const countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
        const capitals = ['Washington', 'Berlin', 'London', 'Tokyo', 'Rome', 'Athens'];
        const products = ['Widget', 'Gadget', 'Doohickey'];
        const colors = ['Orange', 'White', 'Red', 'Green', 'Blue'];
        //
        let data = [];
        //
        // add count items
        for (let i = 0; i < count; i++) {
            // constants used to create data items
            let countryId = Math.floor(Math.random() * countries.length),
                productId = Math.floor(Math.random() * products.length),
                colorId = Math.floor(Math.random() * colors.length);
            //
            // create the item
            let item = {
                id: i,
                country: countries[countryId],
                capital: capitals[countryId],
                product: products[productId],
                color: colors[colorId]
            };
            //
            // add the item to the list
            data.push(item);
        }
        //
        return data;
    }
}