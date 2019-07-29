import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        return [
            { x: 4, y: 100 },
            { x: 10, y: 2000 },
            { x: 35, y: 2500 },
            { x: 60, y: 4000 },
            { x: 75, y: 5000 },
            { x: 90, y: 6500 },
            { x: 110, y: 8000 },
            { x: 150, y: 9000 },
            { x: 200, y: 10000 },
            { x: 350, y: 15000 },
            { x: 500, y: 20000 },
            { x: 600, y: 25000 },
            { x: 750, y: 30000 },
            { x: 900, y: 40000 },
            { x: 1000, y: 45000 }
        ];
    }
}