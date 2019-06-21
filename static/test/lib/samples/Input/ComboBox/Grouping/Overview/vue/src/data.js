import * as wijmo from '@grapecity/wijmo';
// some data for the list/combo
export function getData() {
    var arr = [];
    //
    addCities(arr, 'US', ['New York', 'Los Angeles', 'Chicago', 'Houston']);
    addCities(arr, 'Japan', ['Tokyo', 'Osaka', 'Kyoto', 'Sendai']);
    addCities(arr, 'UK', ['London', 'Birmingham', 'Manchester', 'Liverpool']);
    addCities(arr, 'China', ['Shanghai', 'Beijing', 'Tianjin', 'Shenzhen']);
    addCities(arr, 'Germany', ['Berlin', 'Hamburg', 'Munich', 'Cologne']);
    addCities(arr, 'France', ['Paris', 'Marseille', 'Lyon', 'Toulouse']);
    addCities(arr, 'Canada', ['Toronto', 'Ottawa', 'Vancouver', 'Montreal']);
    addCities(arr, 'Russia', ['Moscow', 'St Petersburg', 'Novosibirsk', 'Yekaterinburg']);
    //
    return new wijmo.CollectionView(arr, {
        sortDescriptions: ['country', 'city'],
        groupDescriptions: ['country'],
        currentItem: null
    });
}
//
export function getCountryCode(country) {
    switch (country) {
        case 'US': return 'us';
        case 'Japan': return 'jp';
        case 'UK': return 'gb';
        case 'China': return 'cn';
        case 'Germany': return 'de';
        case 'France': return 'fr';
        case 'Canada': return 'ca';
        case 'Russia': return 'ru';
    }
    //
    return null;
}
//
function addCities(arr, country, cities) {
    cities.forEach(city => {
        arr.push({
            country: country,
            city: city
        });
    });
}
