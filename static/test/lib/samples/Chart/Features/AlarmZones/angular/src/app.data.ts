import { Injectable } from '@angular/core';
//// get temperature(random data) of device.
let data: any[] = [];
@Injectable()
export class DataService {
    getData() {
        let date = new Date();
        if(data.length === 0) {
            date.setSeconds(date.getSeconds() - 99);
            for(let i = 1; i < 100; i++) {
                data.push({
                    x: new Date(date.valueOf()),
                    y: this.getRandomTemp()
                });
                date.setSeconds(date.getSeconds() + 1);
            }
        }
        if(data.length === 100) {
            data.splice(0, 1);
        }
        data.push({
            x: date,
            y: this.getRandomTemp()
        });
        return data.slice();
    }
    //
    getRandomTemp() {
        let seed = Math.random();
        if(seed > 0.9) {
            return  (Math.round(Math.random() * 800) / 10) + 20 ;
        } else if (seed > 0.6) {
            return (Math.round(Math.random() * 600) / 10) + 20 ;
        } else {
            return (Math.round(Math.random() * 300) / 10) + 20 ;
        }
    }
}