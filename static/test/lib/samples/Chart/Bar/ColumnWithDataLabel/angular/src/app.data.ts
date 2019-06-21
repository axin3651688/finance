import { Injectable } from '@angular/core';
//
@Injectable()
export class DataService {
    // list of country GDP
    // https://en.wikipedia.org/wiki/List_of_IMF_ranked_countries_by_GDP
    getData() {
        return [
            { country: 'United States', '2014': 17348, '2015': 18036, '2016': 18624 },
            { country: 'China', '2014': 10356, '2015': 11181, '2016': 11232 },
            { country: 'Japan', '2014': 4602, '2015': 4124, '2016': 4936 },
            { country: 'Germany', '2014': 3874, '2015': 3365, '2016': 3479 },
            { country: 'United Kingdom', '2014': 2950, '2015': 2858, '2016': 2629 },
            { country: 'France', '2014': 2833, '2015': 2420, '2016': 2466 }
        ];
    }
}