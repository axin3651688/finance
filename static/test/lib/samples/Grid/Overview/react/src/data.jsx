import { CollectionView } from '@grapecity/wijmo';
//
let countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];
let products = ['Widget', 'Gadget', 'Doohickey'];
let colors = ['Black', 'White', 'Red', 'Green', 'Blue'];
//
// generate some random data
export function getData(count, currentChangedHdl) {
    let data = [];
    let dt = new Date();
    //
    // add count items
    for (let i = 0; i < count; i++) {
        // constants used to create data items
        let date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60), countryId = Math.floor(Math.random() * countries.length), productId = Math.floor(Math.random() * products.length), colorId = Math.floor(Math.random() * colors.length);
        //
        // add the item to the list
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
            amount: Math.random() * 10000 - 5000,
            amount2: Math.random() * 10000 - 5000,
            discount: Math.random() / 4,
            active: i % 4 == 0
        });
    }
    //
    // return a CollectionView so multiple controls bound to this source
    // will be updated automatically (TFS 145538)
    let cv = new CollectionView(data);
    if (currentChangedHdl) {
        cv.currentChanged.addHandler(currentChangedHdl);
    }
    //
    return cv;
}
//
// get possible values for each field
export function getCountries() {
    return countries;
}
//
export function getProducts() {
    return products;
}
//
export function getColors() {
    return colors;
}
