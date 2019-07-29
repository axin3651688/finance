import { CollectionView } from '@grapecity/wijmo';
export function getData() {
    let arr = [];
    //
    _addCities(arr, 'US', ['New York', 'Los Angeles', 'Chicago', 'Houston']);
    _addCities(arr, 'Japan', ['Tokyo', 'Osaka', 'Kyoto', 'Sendai']);
    _addCities(arr, 'UK', ['London', 'Birmingham', 'Manchester', 'Liverpool']);
    _addCities(arr, 'China', ['Shanghai', 'Beijing', 'Tianjin', 'Shenzhen']);
    _addCities(arr, 'Germany', ['Berlin', 'Hamburg', 'Munich', 'Cologne']);
    _addCities(arr, 'France', ['Paris', 'Marseille', 'Lyon', 'Toulouse']);
    _addCities(arr, 'Canada', ['Toronto', 'Ottawa', 'Vancouver', 'Montreal']);
    _addCities(arr, 'Russia', ['Moscow', 'St Petersburg', 'Novosibirsk', 'Yekaterinburg']);
    //
    return new CollectionView(arr, {
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
function _addCities(arr, country, cities) {
    cities.forEach(city => {
        arr.push({
            country: country,
            city: city
        });
    });
}
