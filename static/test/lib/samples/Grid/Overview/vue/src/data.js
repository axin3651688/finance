

var _products = ['Widget', 'Gadget', 'Doohickey'];
var _colors = ['Black', 'White', 'Red', 'Green', 'Blue'];
var _someCountries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'];

export function getCountries() {
    return _someCountries;
}

export function getProducts() {
    return _products;
}

export function getColors() {
    return _colors;
}

// get matches for a search term
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