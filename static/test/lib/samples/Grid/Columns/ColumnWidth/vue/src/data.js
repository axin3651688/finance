// data used to generate random items
var _products = ['Widget', 'Gadget', 'Doohickey'];
var _colors = ['Black', 'White', 'Red', 'Green', 'Blue'];
var _someCountries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];

function getCountries() {
    return this._someCountries;
}

function getProducts() {
    return this._products;
}

function getColors() {
    return this._colors;
}
export function getData(count) {
    var data = [];
    var dt = new Date();

    // add count items
    for (var i = 0; i < count; i++) {

        // constants used to create data items
        var date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
            countryId = Math.floor(Math.random() * _someCountries.length),
            productId = Math.floor(Math.random() * _products.length),
            colorId = Math.floor(Math.random() * _colors.length);

        // create the item
        var item = {
            id: i,
            start: date,
            end: new Date(date.getTime() + Math.random() * 30 * (24 * 60 * 60 * 1000)),
            country: _someCountries[countryId],
            product: _products[productId],
            color: _colors[colorId],
            countryId: countryId,
            productId: productId,
            colorId: colorId,
            amount: Math.random() * 10000 - 5000,
            amount2: Math.random() * 10000 - 5000,
            discount: Math.random() / 4,
            active: i % 4 == 0
        };

        // add the item to the list
        data.push(item);
    }
    return data;
}