export function getData(callback, delay) {
    let countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'],
    data = [];
    //
    for (let i = 0; i < 1000; i++) {
        data.push({
            country: countries[i % countries.length],
            downloads: Math.round(Math.random() * 20000),
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000
        });
    }
    //
    return data;
}