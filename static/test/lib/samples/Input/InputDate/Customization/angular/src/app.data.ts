import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    // gets the holiday for a given date
    private readonly _holidays = {
        '1/1': 'New Year\'s Day',
        '6/14': 'Flag Day',
        '7/4': 'Independence Day',
        '11/11': 'Veteran\'s Day',
        '12/25': 'Christmas Day',
        '1/3/1': 'Martin Luther King\'s Birthday', // third Monday in January
        '2/3/1': 'Washington\'s Birthday', // third Monday in February
        '5/3/6': 'Armed Forces Day', // third Saturday in May
        '9/1/1': 'Labor Day', // first Monday in September
        '10/2/1': 'Columbus Day', // second Monday in October
        '11/4/4': 'Thanksgiving Day' // fourth Thursday in November
    };
    //
    getHoliday(date: Date) {
        let day = date.getDate(),
            month = date.getMonth() + 1,
            holiday = this._holidays[month + '/' + day];
        //
        if (!holiday) {
            let weekDay = date.getDay(),
                weekNum = Math.floor((day - 1) / 7) + 1;
            //
            holiday = this._holidays[month + '/' + weekNum + '/' + weekDay];
        }
        //
        return holiday;
    }
}