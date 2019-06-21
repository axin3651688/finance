export function getData() {
    // create some random data
    let data = [],
        countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'],
        products = ['Widget', 'Sprocket', 'Gadget', 'Doohickey'],
        colors = ['Black', 'White', 'Red', 'Green', 'Blue'],
        dt = new Date();
    //
    for (let i = 0; i < 100; i++) {
        let date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
            countryId = Math.floor(Math.random() * countries.length),
            productId = Math.floor(Math.random() * products.length),
            colorId = Math.floor(Math.random() * colors.length);
        //
        data.push({
            id: i,
            start: date,
            end: date,
            country: countries[countryId],
            product: products[productId],
            color: colors[colorId],
            countryId: countryId,
            productId: productId,
            colorId: colorId,
            amount1: Math.random() * 10000 - 5000,
            amount2: Math.random() * 10000 - 5000,
            amount3: Math.random() * 10000 - 5000,
            amount4: Math.random() * 10000 - 5000,
            amount5: Math.random() * 10000 - 5000,
            discount: Math.random() / 4,
            active: i % 4 == 0
        });
    }
    //
    return data;
}