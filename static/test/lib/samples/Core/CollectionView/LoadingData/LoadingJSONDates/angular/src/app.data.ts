import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        let json = '[' +
            '{"id":0,"country":"US","sales":489.51,"expenses":2358.24,"date":"2017-02-08T12:47:06.405Z"},' +
            '{"id":1,"country":"Germany","sales":7803.20,"expenses":2513.54,"date":"2017-02-09T12:47:06.405Z"},' +
            '{"id":2,"country":"UK","sales":9996.58,"expenses":2616.71,"date":"2017-02-10T12:47:06.405Z"},' +
            '{"id":3,"country":"Japan","sales":9351.68,"expenses":3030.59,"date":"2017-02-10T12:47:06.405Z"},' +
            '{"id":4,"country":"Spain","sales":349.51,"expenses":7358.24,"date":"/Date(1486561758556)"}' +
            ']';
        //
        return json;
    }
}
