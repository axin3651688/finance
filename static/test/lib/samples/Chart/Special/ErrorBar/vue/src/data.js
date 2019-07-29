import * as wijmo from '@grapecity/wijmo';
//
// generate some random data
export function getData() {
    let arr = [],
        date = new Date();
    //
    for (let i = 0; i < 10; i++) {
        arr.push({
            date: date,
            amount: 20 + 80 * Math.random(),
            errorPlus: 10 * Math.random(),
            errorMinus: 10 * Math.random(),
        });
        //
        date = wijmo.DateTime.addMonths(date, 1);
    }
    //
    return arr;
}
//
export function getComboData() {
    return [
        { hdr: 'Bound Error Values', value: null, mode: 'Custom' },
        { hdr: '15%', value: .15, mode: 'Percentage' },
        { hdr: '5 units', value: 5, mode: 'FixedValue' },
        { hdr: '1.5 Std Dev', value: 1.5, mode: 'StandardDeviation' },
        { hdr: 'Standard Error', value: 1, mode: 'StandardError' },
        { hdr: 'Plus 5, Minus 10', value: { plus: 5, minus: 10 }, mode: 'Custom' }
    ];
}