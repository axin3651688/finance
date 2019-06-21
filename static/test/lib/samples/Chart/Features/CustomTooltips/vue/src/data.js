export function getData() {
    let data = [];
    'germany,us,italy,uk,japan,canada,greece'.split(',').forEach(country => {
        data.push({
            country: country,
            sales: Math.round(Math.random() * 10000),
            downloads: Math.round(Math.random() * 50000)
        });
    });
    return data;
}
