export function getData() {
    let countries = ['US', 'Canada', 'Mexico', 'Germany', 'UK', 'France', 'Italy', 'Greece', 'Holland', 'Japan', 'Korea', 'China'], data = [];
    //
    for (let i = 0; i < 1000; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            active: i % 3 == 0
        });
    }
    //
    return data;
}
