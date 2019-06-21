import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        return [
            { stage: 'Prospects', count: 750 },
            { stage: 'Qualified Prospects', count: 520 },
            { stage: 'Needs Analysis', count: 200 },
            { stage: 'Price Quotes', count: 150 },
            { stage: 'Negotiations', count: 100 },
            { stage: 'Closed Sales', count: 90 }
        ];
    }
}