import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    //
    getData(count: number) {
        // data used to generate random items
        const countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
        //
        let data = [];
        let dt = new Date();
        //
        // add count items
        for (let i = 0; i < count; i++) {
            // constants used to create data items
            let date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
                countryId = Math.floor(Math.random() * countries.length);
            //
            // create the item
            let item = {
                id: i,
                start: date,
                end: date,
                country: countries[countryId]
            };
            //
            // add the item to the list
            data.push(item);
        }
        //
        return data;
    }
}