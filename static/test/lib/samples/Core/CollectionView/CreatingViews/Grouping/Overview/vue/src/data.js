export function getData(callback, delay) {
    let countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'],
    products = ['Piano', 'Violin', 'Flute', 'Guitar', 'Cello'],
    data = [];
    //
    for (let i = 0; i < 1000; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            product: products[i % products.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    //
    return data;
}