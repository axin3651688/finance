export function getData() {
    let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
        data = [];
    for (let i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            active: i % 5 != 0,
            downloads: Math.round(Math.random() * 200000),
            sales: Math.random() * 100000,
            expenses: Math.random() * 50000
        });
    }
    return data;
}