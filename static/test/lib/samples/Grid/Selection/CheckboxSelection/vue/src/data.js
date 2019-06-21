import {DateTime} from '@grapecity/wijmo';

// some random data
export function getData(cnt) {
    var data = [],
        today = new Date();
    for (var i = 0; i < cnt; i++) {
        data.push({
            sel: false,
            title: getOneOf(['Lunch Tomorrow', 'Meeting on Friday', 'Quarterly Review', 'Evaluation']),
            from: getOneOf(['joe@joe.com', 'mark@smith.com', 'todd@schick.com', 'sun@wong.com']),
            priority: getOneOf([1, 2, 3]),
            immediate: Math.random() > .75,
            date: DateTime.addDays(today, i)
        });
    }
    return data;
}

//
function getOneOf(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
