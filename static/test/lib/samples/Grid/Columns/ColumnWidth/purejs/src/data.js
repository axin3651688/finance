import { CollectionView } from '@grapecity/wijmo';
let countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
let products = ['Widget', 'Gadget', 'Doohickey'];
let colors = ['Black', 'White', 'Red', 'Green', 'Blue'];
// generate some random data
export function getData(count) {
    let data = [];
    let dt = new Date();
    // add count items
    for (let i = 0; i < count; i++) {
        // constants used to create data items
        let date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60), countryId = Math.floor(Math.random() * countries.length), productId = Math.floor(Math.random() * products.length), colorId = Math.floor(Math.random() * colors.length);
        // create the item
        let item = {
            id: i,
            start: date,
            end: date,
            country: countries[countryId],
            product: products[productId],
            color: colors[colorId],
            countryId: countryId,
            productId: productId,
            colorId: colorId,
            amount: Math.random() * 10000 - 5000,
            amount2: Math.random() * 10000 - 5000,
            discount: Math.random() / 4,
            active: i % 4 == 0,
        };
        // add an array (should not auto-bind)
        item.sales = [];
        for (var j = 0; j < 12; j++) {
            item.sales.push(50 + 20 * (Math.random() - .5) + j);
        }
        // add an object (should not auto-bind)
        item.someObject = {
            name: i,
            value: i
        };
        // add the item to the list
        data.push(item);
    }
    // return a CollectionView so multiple controls bound to this source
    // will be updated automatically (TFS 145538)
    return new CollectionView(data);
}
