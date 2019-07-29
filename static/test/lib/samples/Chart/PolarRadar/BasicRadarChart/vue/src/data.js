export function getData() {
    var data = [],
        countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
    countries.forEach(function (country) {
        data.push({
            country: country,
            downloads: Math.ceil(Math.random() * 80) + 20,
            sales: Math.ceil(Math.random() * 80) + 20
        });
    });
    return data;
}
