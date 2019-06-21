//
export function getData(count) {
    let countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece'], colors = ['Black', 'White', 'Red', 'Green', 'Blue'], data = [];
    //
    // add count items
    for (let i = 0; i < count; i++) {
        // constants used to create data items
        let countryId = Math.floor(Math.random() * countries.length), colorId = Math.floor(Math.random() * colors.length);
        //
        // create the item
        let item = {
            id: i,
            country: countries[countryId],
            color: colors[colorId],
            amount: Math.random() * 10000 - 5000
        };
        //
        // add the item to the list
        data.push(item);
    }
    //
    return data;
}
