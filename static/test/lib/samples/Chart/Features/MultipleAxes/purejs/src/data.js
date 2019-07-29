// create some random data
export function getData() {
    let countries = 'US,Canada,Mexico,Germany,UK,France,Italy,Japan,Korea,China'.split(','), data = [];
    //
    for (let i = 0; i < countries.length; i++) {
        data.push({
            country: countries[i],
            sales: 1000 + Math.random() * 10000,
            expenses: 1000 + Math.random() * 5000,
            downloads: Math.round(Math.random() * 100000)
        });
    }
    //
    return data;
}
