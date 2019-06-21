import * as wijmo from '@grapecity/wijmo';
//
// create some data
export function getData() {
    let data = [], date = new Date();
    //
    date = wijmo.DateTime.addYears(date, -1);
    for (let month = 0; month < 12; month++) {
        data.push({
            date: wijmo.Globalize.format(date, 'MMM yyyy'),
            sales: (Math.random() - .4) * 1000
        });
        //
        date = wijmo.DateTime.addMonths(date, 1);
    }
    //
    return data;
}
