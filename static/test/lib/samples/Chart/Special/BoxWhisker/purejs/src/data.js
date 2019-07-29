// create some random data
// the data items contain arrays of values rather than single values
export function getData() {
    let countries = ['US', 'Canada', 'Mexico', 'Germany', 'UK', 'France', 'Japan', 'Korea', 'China'], data = [];
    //
    for (let i = 0; i < countries.length; i++) {
        data.push({
            country: countries[i],
            sales: getRandomArray(20, 10000),
            expenses: getRandomArray(20, 5000)
        });
    }
    //
    return data;
}
//
function getRandomArray(count, max) {
    let arr = [];
    //
    for (var i = 0; i < count; i++) {
        arr.push(Math.random() * max / 3 +
            Math.random() * max / 3 +
            Math.random() * max / 3);
    }
    //
    return arr;
}
