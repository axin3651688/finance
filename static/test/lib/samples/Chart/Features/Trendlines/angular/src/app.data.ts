import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        let arr = [],
            cnt = 50,
            a = Math.random(),
            b = Math.random();
        //
        for (let i = 1; i < cnt; i++) {
            arr.push({
                x: i,
                y: a + i * b + i * (Math.random() - .5)
            });
        }
        //
        return arr;
    }
    //
    getComboData() {
        return 'Linear,Exponential,Logarithmic,Power,Fourier,Polynomial,MinX,MinY,MaxX,MaxY,AverageX,AverageY'.split(',');
    }
}