import * as core from '@grapecity/wijmo';

export function getData(numCount) {
    var data = new core.ObservableArray();
    //
    for (var i = 0; i < numCount; i++) {
        data.push(getRandomData('random' + getRandomValue(1000)));
    }
    return data;
}
    //
export function getRandomData(idx) {
    return {
        //x: getRandomValue(100),
        x: idx,
        y0: getRandomValue(200),
        y1: getRandomValue(400),
        y2: getRandomValue(600),
        y3: getRandomValue(800),
        y4: getRandomValue(1000)
    }
}
    //
export function getRandomValue(max) {
    return Math.round(Math.random() * max);
}