import { Injectable } from '@angular/core';

export interface DataItem {
    date: Date;
    buyer: string;
    type: string;
    amount: number;
}

@Injectable()
export class DataService {
    getData(): DataItem[] {
        var yr = new Date().getFullYear();
        return [{
            date: new Date(yr, 0, 1),
            buyer: '<span class="initial">M</span>om',
            type: '<span class="initial">F</span>uel',
            amount: 74
        },
        {
            date: new Date(yr, 0, 15),
            buyer: '<span class="initial">M</span>om',
            type: '<span class="initial">F</span>ood',
            amount: 235
        },
        {
            date: new Date(yr, 0, 17),
            buyer: '<span class="initial">D</span>ad',
            type: '<span class="initial">S</span>ports',
            amount: 20
        },
        {
            date: new Date(yr, 0, 21),
            buyer: '<span class="initial">K</span>elly',
            type: '<span class="initial">B</span>ooks',
            amount: 125
        },
        {
            date: new Date(yr, 1, 2),
            buyer: '<span class="initial">M</span>om',
            type: '<span class="initial">F</span>ood',
            amount: 235
        },
        {
            date: new Date(yr, 1, 20),
            buyer: '<span class="initial">K</span>elly',
            type: '<span class="initial">M</span>usic',
            amount: 20
        },
        {
            date: new Date(yr, 1, 25),
            buyer: '<span class="initial">K</span>elly',
            type: '<span class="initial">T</span>ickets',
            amount: 125
        },
        ];
    }
}