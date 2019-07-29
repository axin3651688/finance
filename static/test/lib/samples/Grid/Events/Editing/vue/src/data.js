export function getData() {
    // create some random data
    let countries = ['US', 'Germany', 'UK', 'Japan', 'Sweden', 'Norway', 'Denmark'];
    let data = [];
    for (let i = 0; i < countries.length; i++) {
        data.push({
            id: i,
            country: countries[i],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            overdue: (i + 1) % 4 == 0
        });
    }
    return data;
}
