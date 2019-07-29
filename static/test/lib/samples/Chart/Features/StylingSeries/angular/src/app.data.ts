import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    getData() {
        // list of country GDP
        // https://en.wikipedia.org/wiki/List_of_IMF_ranked_countries_by_GDP
        return [
            { country: 'United States', '2014': 17348075, '2015': 18036650, '2016': 18624450 },
            { country: 'China', '2014': 10356508, '2015': 11181556, '2016': 11232110 },
            { country: 'Japan', '2014': 4602367, '2015': 4124211, '2016': 4936540 },
            { country: 'Germany', '2014': 3874437, '2015': 3365293, '2016': 3479230 },
            { country: 'United Kingdom', '2014': 2950039, '2015': 2858482, '2016': 2629190 },
            { country: 'France', '2014': 2833687, '2015': 2420163, '2016': 2466470 },
            { country: 'India', '2014': 2051228, '2015': 2073002, '2016': 2263790 },
            { country: 'Italy', '2014': 2147744, '2015': 1815759, '2016': 1850740 }
        ];
    }
}