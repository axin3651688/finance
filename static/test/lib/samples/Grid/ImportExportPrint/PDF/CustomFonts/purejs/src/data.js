export function getData(count) {
    // data used to generate random items
    const countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
    const products = ['Widget', 'Gadget', 'Doohickey'];
    //
    let data = [];
    //
    // add count items
    for (let i = 0; i < count; i++) {
        // constants used to create data items
        let countryId = Math.floor(Math.random() * countries.length), productId = Math.floor(Math.random() * products.length);
        //
        // create the item
        let item = {
            id: i,
            country: countries[countryId],
            product: products[productId],
            discount: Math.random() / 4,
            active: i % 4 == 0
        };
        //
        // add the item to the list
        data.push(item);
    }
    //
    return data;
}
