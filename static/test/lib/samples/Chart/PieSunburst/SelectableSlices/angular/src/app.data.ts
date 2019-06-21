import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    // best selling mobile phones brands
    // https://en.wikipedia.org/wiki/List_of_best-selling_mobile_phones
    getData() {
        return [
            { brand: 'Samsung', sales: 321 },
            { brand: 'Apple', sales: 215 },
            { brand: 'Huawei', sales: 160 },
            { brand: 'OPPO', sales: 112 },
            { brand: 'Vivo', sales: 100 },
            { brand: 'Others', sales: 638 }
        ];
    }
}