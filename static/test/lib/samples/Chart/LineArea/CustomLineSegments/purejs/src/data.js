// create some random data
export function getData() {
    let countries = ['US', 'Canada', 'Mexico', 'Germany', 'UK', 'France', 'Japan', 'Korea', 'China'], data = [];
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
