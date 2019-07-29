import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    // Average temerature in Tokyo
    // https://en.wikipedia.org/wiki/Tokyo#Climate
    getData() {
        return [
            { month: 'Jan', temperature: 5.2 },
            { month: 'Feb', temperature: 5.7 },
            { month: 'Mar', temperature: 8.7 },
            { month: 'Apr', temperature: 13.9 },
            { month: 'May', temperature: 18.2 },
            { month: 'Jun', temperature: 21.4 },
            { month: 'Jul', temperature: 25.0 },
            { month: 'Aug', temperature: 26.4 },
            { month: 'Sep', temperature: 22.8 },
            { month: 'Oct', temperature: 17.5 },
            { month: 'Nov', temperature: 12.1 },
            { month: 'Dec', temperature: 7.6 }
        ];
    }
}