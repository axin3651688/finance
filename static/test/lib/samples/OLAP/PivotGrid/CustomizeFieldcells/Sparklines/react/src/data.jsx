//
export function getData(cnt) {
    let year = new Date().getFullYear(), data = [];
    //
    for (let i = 0; i < cnt; i++) {
        data.push({
            product: randomInt(0, 1) ? 'Wijmo' : 'Aoba',
            country: randomInt(0, 1) ? 'USA' : 'Japan',
            active: i % 2 == 0,
            date: new Date(year - randomInt(0, 2), randomInt(0, 11), randomInt(0, 27) + 1),
            sales: randomInt(10, 20),
            downloads: randomInt(10, 200)
        });
    }
    //
    return data;
}
//
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
