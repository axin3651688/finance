export function getData() {
    let countries = 'US,Canada,Mexico,Germany,Austria,Belgium,Denmark,France,Russia,Finland,UK,Italy,Japan,Korea,China'.split(','),
        data = [];
    //
    for (let i = 0; i < countries.length; i++) {
        data.push({
            country: countries[i],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            downloads: Math.round(Math.random() * 20000)
        });
    }
    //
    return data;
}
