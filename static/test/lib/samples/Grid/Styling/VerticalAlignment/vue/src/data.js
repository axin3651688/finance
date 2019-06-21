export function getData() {
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
        products = 'Phones,Computers,Cameras,Stereos'.split(','),
        data = [];
    for (var i = 0; i < 200; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            product: products[i % products.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            active: 1 % 4 == 0
        });

    }
    return data;
}