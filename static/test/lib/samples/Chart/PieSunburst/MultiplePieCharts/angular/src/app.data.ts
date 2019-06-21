import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        return [
            {
                'brand': 'Samsung',
                '2017Q1': 23.2,
                '2017Q2': 22.9,
                '2017Q3': 22.1,
                '2017Q4': 18.9
            },
            {
                'brand': 'Huawei',
                '2017Q1': 10.0,
                '2017Q2': 11.0,
                '2017Q3': 10.4,
                '2017Q4': 10.7
            },
            {
                'brand': 'Apple',
                '2017Q1': 14.7,
                '2017Q2': 11.8,
                '2017Q3': 12.4,
                '2017Q4': 19.6
            },
            {
                'brand': 'Xiaomi',
                '2017Q1': 4.3,
                '2017Q2': 6.2,
                '2017Q3': 7.5,
                '2017Q4': 7.1
            },
            {
                'brand': 'OPPO',
                '2017Q1': 7.5,
                '2017Q2': 8.0,
                '2017Q3': 8.1,
                '2017Q4': 6.9
            },
            {
                'brand': 'Others',
                '2017Q1': 40.2,
                '2017Q2': 40.1,
                '2017Q3': 39.6,
                '2017Q4': 36.8
            }
        ];
    }
}