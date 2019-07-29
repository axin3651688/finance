// get an array with random data
export function getData(cnt, start) {
    var data = [];
    var countries = 'USA,Germany,UK,Japan,Italy,Greece'.split(',');
    if (!start)
        start = 0;
    for (var i = 0; i < cnt; i++) {
        data.push({
            id: i + start,
            country: countries[i % countries.length],
            date: new Date(2014, i % 12, i % 28),
            amount: Math.random() * 10000,
            active: i % 4 === 0
        });
    }
    return data;
}
