
export function getData() {
    var data = [];
        for (var i = 0; i < 10000; i++) {
            data.push({
                id: i,
                countries: getCountries(),
                sales: Math.random() * 10000,
                expenses: Math.random() * 5000
            });
        }
        return data;
}

function getCountries() {
    var countries = 'Austria,Belgium,Canada,Denmark,Estonia,Finland,Germany,Hungary,Ireland,Japan,Korea,Lebanon,Mexico,Norway,Portugal,Qatar,Romania,Spain,Turkey,Ukraine,Venezuela,Zaire'.split(',');
    var c = [];
    var cnt = Math.round(Math.random() * 8) + 1;
    var start = Math.round(Math.random() * countries.length);
    for (var i = 0; i < cnt; i++) {
        c.push(countries[(i + start) % countries.length]);
    }
    return c.join(', ');
}
