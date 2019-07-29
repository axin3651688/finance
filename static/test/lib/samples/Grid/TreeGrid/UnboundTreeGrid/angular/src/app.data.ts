import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    getWorkers() {
        return [{
            name: 'Jack Smith',
            checks: [{
                name: 'check1',
                earnings: [
                    { name: 'hourly', hours: 30.0, rate: 15.0 },
                    { name: 'overtime', hours: 10.0, rate: 20.0 },
                    { name: 'bonus', hours: 5.0, rate: 30.0 }
                ]
            }, {
                name: 'check2',
                earnings: [
                    { name: 'hourly', hours: 20.0, rate: 18.0 },
                    { name: 'overtime', hours: 20.0, rate: 24.0 }
                ]
            }]
        }, {
            name: 'Jack Smith',
            checks: [{
                name: 'check1',
                earnings: [
                    { name: 'hourly', hours: 30.0, rate: 15.0 },
                    { name: 'overtime', hours: 10.0, rate: 20.0 },
                    { name: 'bonus', hours: 5.0, rate: 30.0 }
                ]
            }, {
                name: 'check2',
                earnings: [
                    { name: 'hourly', hours: 20.0, rate: 18.0 },
                    { name: 'overtime', hours: 20.0, rate: 24.0 }
                ]
            }]
        }, {
            name: 'Jane Smith',
            checks: [{
                name: 'check1',
                earnings: [
                    { name: 'hourly', hours: 30.0, rate: 15.0 },
                    { name: 'overtime', hours: 10.0, rate: 20.0 },
                    { name: 'bonus', hours: 5.0, rate: 30.0 }
                ]
            }, {
                name: 'check2',
                earnings: [
                    { name: 'hourly', hours: 20.0, rate: 18.0 },
                    { name: 'overtime', hours: 20.0, rate: 24.0 }
                ]
            }]
        }];
    }
}