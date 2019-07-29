export function getData() {
    let countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
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
