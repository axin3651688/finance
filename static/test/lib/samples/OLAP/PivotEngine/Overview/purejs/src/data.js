import * as wjCore from '@grapecity/wijmo';
function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
export function getData(cnt) {
    var today = new Date(), buyers = 'Mom,Dad,Kelly,Sheldon'.split(','), types = 'Food,Clothes,Fuel,Books,Sports,Music'.split(','), data = [];
    for (var i = 0; i < cnt; i++) {
        data.push({
            date: wjCore.DateTime.addDays(today, -Math.random() * 365),
            buyer: randomItem(buyers),
            type: randomItem(types),
            amount: 20 + Math.random() * 1000
        });
    }
    return data;
}
