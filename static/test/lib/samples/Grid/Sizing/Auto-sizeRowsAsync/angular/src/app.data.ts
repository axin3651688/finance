import { Injectable } from '@angular/core';

interface DataItem {
    id: number;
    countries: string;
    sales: number;
    expenses: number;
}

function getCountries(): string {
    var countries = 'Austria,Belgium,Canada,Denmark,Estonia,Finland,Germany,Hungary,Ireland,Japan,Korea,Lebanon,Mexico,Norway,Portugal,Qatar,Romania,Spain,Turkey,Ukraine,Venezuela,Zaire'.split(',');
    var c = [];
    var cnt = Math.round(Math.random() * 8) + 1;
    var start = Math.round(Math.random() * countries.length);
    for (var i = 0; i < cnt; i++) {
        c.push(countries[(i + start) % countries.length]);
    }
    return c.join(', ');
}

@Injectable()
export class DataService {
    getData(): DataItem[] {
        var data = [];
        for (var i = 0; i < 10000; i++) {
            data.push({
                id: i,
                countries: getCountries(),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
    }
}