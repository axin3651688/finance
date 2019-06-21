import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
     // data used to generate random items
     private _products = ['Widget', 'Gadget', 'Doohickey'];
     private _colors = ['Black', 'White', 'Red', 'Green', 'Blue'];
     private _someCountries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];

     getCountries(): string[] {
        return this._someCountries;
    }

    getProducts(): string[] {
        return this._products;
    }

    getColors(): string[] {
        return this._colors;
    }

    // get matches for a search term
    getData(count: number): any[] {
        var data = [];
        var dt = new Date();

        // add count items
        for (var i = 0; i < count; i++) {

            // constants used to create data items
            var date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                countryId = Math.floor(Math.random() * this._someCountries.length),
                productId = Math.floor(Math.random() * this._products.length),
                colorId = Math.floor(Math.random() * this._colors.length);

            // create the item
            var item = {
                id: i,
                start: date,
                end: new Date(date.getTime() + Math.random() * 30 * (24 * 60 * 60 * 1000)),
                country: this._someCountries[countryId],
                product: this._products[productId],
                color: this._colors[colorId],
                countryId: countryId,
                productId: productId,
                colorId: colorId,
                amount: Math.random() * 10000 - 5000,
                amount2: Math.random() * 10000 - 5000,
                discount: Math.random() / 4,
                active: i % 4 == 0
            };

            // add the item to the list
            data.push(item);
        }
        return data;
    }
}