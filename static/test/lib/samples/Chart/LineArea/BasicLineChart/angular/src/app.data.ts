import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        return [
            { month: 'Jan', mean: -5.2, high: -0.8, low: -9.7 },
            { month: 'Feb', mean: -3.4, high: 1.4, low: -8.2 },
            { month: 'Mar', mean: 1.7, high: 6.9, low: -3.5 },
            { month: 'Apr', mean: 8.8, high: 14.6, low: 2.9 },
            { month: 'May', mean: 14.6, high: 20.8, low: 8.4 },
            { month: 'Jun', mean: 19.6, high: 25.5, low: 13.6 },
            { month: 'Jul', mean: 22.1, high: 27.9, low: 16.3 },
            { month: 'Aug', mean: 21.2, high: 26.9, low: 15.5 },
            { month: 'Sep', mean: 16.6, high: 22.3, low: 10.9 },
            { month: 'Oct', mean: 9.8, high: 15.4, low: 4.2 },
            { month: 'Nov', mean: 4.3, high: 8.8, low: -0.3 },
            { month: 'Dec', mean: -1.9, high: 2.1, low: -6 }
        ];
    }
}