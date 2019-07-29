export function getData(count) {
    // data used to generate random items
    const countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
    const products = ['Widget', 'Gadget', 'Doohickey'];
    const colors = ['Orange', 'White', 'Red', 'Green', 'Blue'];
    //
    let data = [];
    let dt = new Date();
    //
    // add count items
    for (let i = 0; i < count; i++) {
        // constants used to create data items
        let date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
            countryId = Math.floor(Math.random() * countries.length),
            productId = Math.floor(Math.random() * products.length),
            colorId = Math.floor(Math.random() * colors.length);
        //
        // create the item
        let item = {
            id: i,
            start: date,
            end: date,
            country: countries[countryId],
            product: products[productId],
            color: colors[colorId],
            amount: Math.random() * 10000 - 5000,
            amount2: Math.random() * 10000 - 5000,
            discount: Math.random() / 4,
            active: i % 4 == 0,
        };
        //
        // add the item to the list
        data.push(item);
    }
    return data;
}

export function getExpenses() {
    // [5; 10]
    let count = 5 + Math.round(Math.random() * 5),
        ret = {
            items: [],
            totals: { hotel: 0, transport: 0, fuel: 0, meal: 0, Misc: 0, total: 0 }
        },
        msPerDay = 1000 * 24 * 60 * 60,
        curDate = Date.now() - 60 * msPerDay;
    //
    for (let i = 0; i < count; i++) {
        let item = {
            date: new Date(curDate),
            description: 'Customer visit',
            hotel: 30 + Math.random() * 200,
            transport: 10 + Math.random() * 150,
            fuel: Math.random() * 50,
            meal: 30 + Math.random() * 170,
            Misc: Math.random() * 220,
            total: 0
        };
        //
        item.total = item.hotel + item.transport + item.fuel + item.meal + item.Misc;
        //
        ret.totals.fuel += item.fuel;
        ret.totals.hotel += item.hotel;
        ret.totals.meal += item.meal;
        ret.totals.Misc += item.Misc;
        ret.totals.total += item.total;
        ret.totals.transport += item.transport;
        //
        ret.items.push(item);
        //
        curDate += msPerDay * Math.round(Math.random() * 4);
    }
    //
    return ret;
}