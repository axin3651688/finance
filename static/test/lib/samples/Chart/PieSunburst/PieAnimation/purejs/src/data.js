// generate some random data
import * as wijmo from '@grapecity/wijmo';
//
export function getData() {
    let data = new wijmo.ObservableArray();
    //
    for (let i = 0; i < 5; i++) {
        data.push(getRandomData('random' + getRandomValue(1000)));
    }
    //
    return data;
}
//
export function getRandomData(id) {
    return {
        id: id,
        y0: getRandomValue(200),
        y1: getRandomValue(400),
        y2: getRandomValue(600),
        y3: getRandomValue(800),
        y4: getRandomValue(1000)
    };
}
//
function getRandomValue(max) {
    return Math.round(Math.random() * max);
}
