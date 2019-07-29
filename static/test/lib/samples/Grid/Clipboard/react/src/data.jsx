export function getData() {
    // create some random data
    let countries = 'US,Germany,UK,Japan,Sweden,Norway,Denmark'.split(','), data = [];
    for (let i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
        });
    }
    return data;
}
