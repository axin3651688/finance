let _countries = ['US', 'Germany', 'UK', 'Japan', 'Sweden', 'Norway', 'Denmark'];

export function getCountries() {
    return ['US', 'Germany', 'UK', 'Japan', 'Sweden', 'Norway', 'Denmark'];
};

export function getData() {
    let data = [];

    for (let i = 0; i < 100; i++) {
        data.push({
            id: i,
            country: _countries[i % _countries.length],
            sales: Math.random() * 10000,
            expenses: Math.random() * 5000,
            overdue: (i + 1) % 4 == 0
        });
    }

    return data;
};
