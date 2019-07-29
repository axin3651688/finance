import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        return [
            'aaron',
            'Aaron',
            'Ação',
            'Acao',
            'Haagen',
            'Häagen',
            'Hilton',
            'bill',
            'Bill',
            'Adieu',
            'a',
            'A',
            'b',
            'B'
        ];
    }
}
