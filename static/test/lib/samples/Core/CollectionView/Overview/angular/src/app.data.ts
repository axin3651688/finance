import { Injectable } from '@angular/core';
//
export type TDataItem = {
    id: number;
    country: string;
    color: string;
    amount: number;
}
//
@Injectable()
export class DataService {
    // data used to generate random items
    private _colors = ['Black', 'White', 'Red', 'Green', 'Blue'];
    private _countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
    //
    getData(count: number) {
        let data: TDataItem[] = [];
        //
        // add count items
        for (let i = 0; i < count; i++) {
            // constants used to create data items
            let countryId = Math.floor(Math.random() * this._countries.length),
                colorId = Math.floor(Math.random() * this._colors.length);
            //
            // add the item to the list
            data.push({
                id: i,
                country: this._countries[countryId],
                color: this._colors[colorId],
                amount: Math.random() * 10000 - 5000
            });
        }
        //
        return data;
    }
}
