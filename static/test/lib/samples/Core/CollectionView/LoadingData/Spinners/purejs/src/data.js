// get some data asynchronously
export function getData(callback, delay) {
    let countries = ['US', 'UK', 'China', 'Germany', 'India'], data = [];
    //
    for (let i = 0; i < 1000; i++) {
        data.push({
            id: i,
            country: countries[i % countries.length],
            sales: Math.random() * 1000,
            downloads: Math.random() * 10000,
        });
    }
    //
    setTimeout(() => callback(data), delay);
}
