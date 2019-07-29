import { CollectionView } from '@grapecity/wijmo';
import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    // some data for the list/combo
    getData() {
        let arr: any[] = [];
        //
        this._addCities(arr, 'US', ['New York', 'Los Angeles', 'Chicago', 'Houston']);
        this._addCities(arr, 'Japan', ['Tokyo', 'Osaka', 'Kyoto', 'Sendai']);
        this._addCities(arr, 'UK', ['London', 'Birmingham', 'Manchester', 'Liverpool']);
        this._addCities(arr, 'China', ['Shanghai', 'Beijing', 'Tianjin', 'Shenzhen']);
        this._addCities(arr, 'Germany', ['Berlin', 'Hamburg', 'Munich', 'Cologne']);
        this._addCities(arr, 'France', ['Paris', 'Marseille', 'Lyon', 'Toulouse']);
        this._addCities(arr, 'Canada', ['Toronto', 'Ottawa', 'Vancouver', 'Montreal']);
        this._addCities(arr, 'Russia', ['Moscow', 'St Petersburg', 'Novosibirsk', 'Yekaterinburg']);
        //
        return new CollectionView(arr, {
            sortDescriptions: ['country', 'city'],
            groupDescriptions: ['country'],
            currentItem: null
        });
    }
    //
    getCountryCode(country: string) {
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
    private _addCities(arr: any[], country: string, cities: string[]) {
        cities.forEach(city => {
            arr.push({
                country: country,
                city: city
            });
        });
    }
}