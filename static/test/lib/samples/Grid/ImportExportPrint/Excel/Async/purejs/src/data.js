// data used to generate random items
let countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'], products = ['Widget', 'Gadget', 'Doohickey'], colors = ['Black', 'White', 'Red', 'Green', 'Blue'];
export function getProductOrders(count) {
    let data = [], dt = new Date();
    // add count items
    for (let i = 0; i < count; i++) {
        // constants used to create data items
        let date = new Date(dt.getFullYear(), i % 12, 25), countryId = Math.floor(Math.random() * countries.length), productId = Math.floor(Math.random() * products.length), colorId = Math.floor(Math.random() * colors.length);
        // create the item
        let item = {
            id: i,
            start: date,
            end: date,
            country: countries[countryId],
            product: products[productId],
            color: colors[colorId],
            amount: Math.random() * 10000,
            amount2: Math.random() * 10000,
            discount: Math.random() / 4,
            active: i % 4 == 0,
        };
        // add the item to the list
        data.push(item);
    }
    return data;
}
